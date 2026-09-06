import crypto from "node:crypto";
import { assessRisk, canonicalizeAction, evaluateChallenge } from "./policy.mjs";

export const AUDITOR_VERSION = "skeptara-auditor-v0.2";
export const DEFAULT_CHALLENGE_TTL_MS = 15 * 60 * 1000;

// Live T2 review showed that Telegraph's CVE_LOOKUP miner may require an explicit
// CVE identifier. Generic dependency actions therefore prefer evidence modes
// that accept package/version facts directly. CVE_LOOKUP remains supported when
// Telegraph actually routes a call there, but it is not planned as a generic
// package-version path.
const DEPENDENCY_INTENT_ORDER = Object.freeze(["FACT_CHECK", "WEB_SEARCH", "NEWS_SEARCH", "URL_SCAN"]);
const GENERAL_INTENT_ORDER = Object.freeze(["FACT_CHECK", "WEB_SEARCH", "NEWS_SEARCH", "URL_SCAN", "CVE_LOOKUP"]);

function uniqueStrings(values = []) {
  return [...new Set(values.map((value) => String(value).trim()).filter(Boolean))];
}

function stableStringify(value) {
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`).join(",")}}`;
  }
  return JSON.stringify(value);
}

function hash(value) {
  return `sha256:${crypto.createHash("sha256").update(stableStringify(value)).digest("hex")}`;
}

function assertCanonicalAction(actionSnapshot) {
  if (!actionSnapshot?.action_fingerprint || !actionSnapshot?.repository || !actionSnapshot?.head_sha) {
    throw new TypeError("canonical ActionSnapshot required");
  }
}

function targetDescription(actionSnapshot) {
  if (actionSnapshot.dependency_changes.length > 0) {
    return actionSnapshot.dependency_changes
      .map((change) => `${change.name}@${change.to ?? "unknown"}${change.from ? ` (from ${change.from})` : ""}`)
      .join(", ");
  }
  return `${actionSnapshot.repository} PR #${actionSnapshot.pr_number} at ${actionSnapshot.head_sha.slice(0, 12)}`;
}

function queryForIntent(intent, actionSnapshot) {
  const target = targetDescription(actionSnapshot);
  const files = actionSnapshot.changed_files.slice(0, 12).join(", ") || "none listed";
  const surfaces = actionSnapshot.security_sensitive_surfaces.join(", ") || "none declared";
  const common = `Canonical action facts only: target=${target}; changed_files=${files}; security_sensitive_surfaces=${surfaces}. `;

  switch (intent) {
    case "CVE_LOOKUP":
      return `${common}Search for known CVEs or vulnerability advisories that affect the target dependency version. Return concrete identifiers, affected version ranges, severity, and source labels. The audit objective is to find material evidence that should block this merge; do not assume the merge is safe.`;
    case "FACT_CHECK":
      return `${common}Fact-check whether the proposed dependency/change is safe to merge with respect to known security advisories, regressions, or materially false safety assumptions. Seek counter-evidence and cite concrete external facts when available.`;
    case "WEB_SEARCH":
      return `${common}Search the web for recent or authoritative counter-evidence against merging this exact change, prioritizing security advisories, release regressions, breaking changes, and supply-chain concerns. Return concrete sources or findings.`;
    case "NEWS_SEARCH":
      return `${common}Search recent security or ecosystem news for material issues affecting this exact dependency/change. Seek evidence that should delay or block merge, and return concrete findings.`;
    case "URL_SCAN":
      return `${common}Inspect relevant package/project URLs or artifacts if available for security signals that would make the proposed merge unsafe. Return only concrete findings supported by the scanner.`;
    default:
      return `${common}Seek independent external counter-evidence that could invalidate or block the proposed merge. Return concrete findings, not reassurance.`;
  }
}

function intentOrderFor(actionSnapshot) {
  return actionSnapshot.dependency_changes.length > 0 ? DEPENDENCY_INTENT_ORDER : GENERAL_INTENT_ORDER;
}

export function buildAuditPlan({ actionSnapshot, riskAssessment, availableIntents = [] }) {
  assertCanonicalAction(actionSnapshot);
  if (!riskAssessment?.required_evidence_paths) throw new TypeError("riskAssessment required");

  const supported = uniqueStrings(availableIntents.map((intent) => intent.toUpperCase()));
  const preference = intentOrderFor(actionSnapshot);
  const preferredSupported = preference.filter((intent) => supported.includes(intent));
  const otherSupported = supported.filter((intent) => !preferredSupported.includes(intent) && intent !== "CVE_LOOKUP");
  const ordered = [...preferredSupported, ...otherSupported];

  const requiredCount = Number(riskAssessment.required_evidence_paths);
  const chosen = ordered.slice(0, requiredCount);
  const pathBudget = requiredCount > 0 ? Math.floor(Number(riskAssessment.spend_cap_atomic) / requiredCount) : 0;

  const paths = chosen.map((intent, index) => ({
    path_id: `path-${index + 1}-${intent.toLowerCase()}`,
    desired_intent: intent,
    objective: "SEEK_MATERIAL_COUNTER_EVIDENCE",
    query: queryForIntent(intent, actionSnapshot),
    max_cost_atomic: pathBudget,
    required: true,
  }));

  const crossIntentSupported = new Set(preferredSupported).size >= 2;
  const missingRequiredPaths = Math.max(0, requiredCount - paths.length);
  const planCore = {
    auditor_version: AUDITOR_VERSION,
    action_fingerprint: actionSnapshot.action_fingerprint,
    risk_tier: riskAssessment.risk_tier,
    required_evidence_paths: requiredCount,
    spend_cap_atomic: Number(riskAssessment.spend_cap_atomic),
    available_intents: supported.sort(),
    paths,
  };

  return {
    ...planCore,
    plan_fingerprint: hash(planCore),
    cross_intent_supported: crossIntentSupported,
    missing_required_paths: missingRequiredPaths,
    executable: missingRequiredPaths === 0,
  };
}

function parseSemver(value) {
  const match = String(value ?? "").trim().match(/^(\d+)\.(\d+)\.(\d+)(?:[-+].*)?$/);
  if (!match) return null;
  return match.slice(1, 4).map(Number);
}

function compareSemver(a, b) {
  const left = parseSemver(a);
  const right = parseSemver(b);
  if (!left || !right) return null;
  for (let index = 0; index < 3; index += 1) {
    if (left[index] < right[index]) return -1;
    if (left[index] > right[index]) return 1;
  }
  return 0;
}

function extractUpperBound(result) {
  const corpus = [
    ...(Array.isArray(result?.affected_versions) ? result.affected_versions : []),
    result?.reason,
  ].filter(Boolean).join(" ");
  const match = corpus.match(/(?:prior to|before|<)\s*v?(\d+\.\d+\.\d+)/i);
  return match?.[1] ?? null;
}

function dependencyTargetVersion(actionSnapshot) {
  return actionSnapshot.dependency_changes.find((change) => change.to)?.to ?? null;
}

function evidencePathInputInvalid(result) {
  if (!result || typeof result !== "object") return false;
  if (result.missing) return true;
  const text = `${result.reason ?? ""} ${result.error ?? ""}`.toLowerCase();
  return /cannot be completed|supplied request is invalid|invalid request|requires an identifier|missing or malformed input/.test(text);
}

export function normalizeTelegraphEvidence({ path, paidCall, actionSnapshot, challengeId }) {
  assertCanonicalAction(actionSnapshot);
  if (!path?.path_id) throw new TypeError("audit path required");
  if (!paidCall || typeof paidCall !== "object") throw new TypeError("paidCall required");

  const response = paidCall.response ?? {};
  const result = response.result ?? null;
  const actualIntent = response.intent ?? path.desired_intent ?? null;
  const targetVersion = dependencyTargetVersion(actionSnapshot);

  let materiality = "AMBIGUOUS";
  let reasonCode = "UNCLASSIFIED_EXTERNAL_EVIDENCE";
  let findingType = "EXTERNAL_COUNTER_EVIDENCE";
  let critical = false;
  let coverageComplete = true;

  if (evidencePathInputInvalid(result)) {
    materiality = "AMBIGUOUS";
    reasonCode = "EVIDENCE_PATH_INPUT_INVALID";
    findingType = "INCOMPLETE_EVIDENCE_PATH";
    critical = true;
    coverageComplete = false;
  } else if (result && typeof result === "object") {
    const found = result.found === true || String(result.verdict ?? "").toLowerCase() === "found";
    const notFound = result.found === false || ["not_found", "none", "clean"].includes(String(result.verdict ?? "").toLowerCase());

    if (found && result.cve_id && targetVersion) {
      const upperBound = extractUpperBound(result);
      const compare = upperBound ? compareSemver(targetVersion, upperBound) : null;
      if (compare === -1) {
        materiality = "BLOCKING";
        reasonCode = "KNOWN_VULNERABILITY_AFFECTS_TARGET_DEPENDENCY_VERSION";
        findingType = "KNOWN_DEPENDENCY_VULNERABILITY";
      } else if (compare !== null) {
        materiality = "ADVISORY";
        reasonCode = "KNOWN_VULNERABILITY_DOES_NOT_MATCH_TARGET_VERSION_RANGE";
        findingType = "KNOWN_DEPENDENCY_VULNERABILITY";
      } else {
        materiality = "AMBIGUOUS";
        reasonCode = "KNOWN_VULNERABILITY_RANGE_NOT_MACHINE_VERIFIABLE";
        findingType = "KNOWN_DEPENDENCY_VULNERABILITY";
        critical = true;
      }
    } else if (notFound) {
      materiality = "NONE";
      reasonCode = "NO_MATERIAL_COUNTER_EVIDENCE_REPORTED";
    } else if (result.verdict && ["safe", "pass", "verified"].includes(String(result.verdict).toLowerCase())) {
      materiality = "NONE";
      reasonCode = "NO_MATERIAL_COUNTER_EVIDENCE_REPORTED";
    }
  }

  return {
    challenge_id: challengeId,
    path_id: path.path_id,
    desired_intent: path.desired_intent,
    intent: actualIntent,
    miner_id: response.miner_id ?? response.miner_used ?? null,
    miner_name: response.miner_name ?? null,
    endpoint: response.endpoint ?? null,
    signal_hash: response.signal_hash ?? null,
    request_timestamp: paidCall.started_at ?? null,
    response_timestamp: response.timestamp ?? paidCall.completed_at ?? null,
    cost_usd: response.cost_usd ?? null,
    duration_ms: response.duration_ms ?? null,
    settlement: paidCall.payment_response ?? null,
    source_provenance: response.source_provenance ?? null,
    miner_reported_source: result?.source ?? null,
    normalized_finding_type: findingType,
    materiality,
    reason_code: reasonCode,
    critical,
    coverage_complete: coverageComplete,
    raw_result: result,
  };
}

export function buildChallengeResult({
  challengeId,
  actionSnapshot,
  riskAssessment,
  plan,
  evidenceItems,
  completedEvidencePaths,
  spendObservedAtomic,
  budgetExhausted = false,
  requiredSourceUnavailable = false,
  runtimeErrors = [],
  startedAt,
  completedAt,
  ttlMs = DEFAULT_CHALLENGE_TTL_MS,
}) {
  const evaluation = evaluateChallenge({
    riskAssessment,
    evidenceItems,
    completedEvidencePaths,
    spendObservedAtomic,
    budgetExhausted,
    requiredSourceUnavailable,
    crossIntentSupported: Boolean(plan.cross_intent_supported),
  });

  const completed = new Date(completedAt ?? Date.now());
  const expiresAt = new Date(completed.getTime() + ttlMs).toISOString();

  return {
    challenge_id: challengeId,
    auditor_version: AUDITOR_VERSION,
    action_fingerprint: actionSnapshot.action_fingerprint,
    repository: actionSnapshot.repository,
    pr_number: actionSnapshot.pr_number,
    head_sha: actionSnapshot.head_sha,
    risk_tier: riskAssessment.risk_tier,
    policy_version: riskAssessment.policy_version,
    plan_fingerprint: plan.plan_fingerprint,
    required_coverage: riskAssessment.required_evidence_paths,
    completed_coverage: completedEvidencePaths,
    spend_cap_atomic: riskAssessment.spend_cap_atomic,
    spend_observed_atomic: spendObservedAtomic,
    spend_asset: riskAssessment.spend_asset,
    spend_network: riskAssessment.spend_network,
    outcome: evaluation.outcome,
    reason_codes: evaluation.reason_codes,
    evidence_items: evidenceItems,
    runtime_errors: runtimeErrors,
    started_at: new Date(startedAt ?? completed).toISOString(),
    completed_at: completed.toISOString(),
    expires_at: expiresAt,
  };
}

export async function runIndependentAudit({
  actionInput,
  availableIntents,
  adapter,
  now = () => new Date(),
  challengeId = crypto.randomUUID(),
}) {
  if (!adapter || typeof adapter.ask !== "function") throw new TypeError("adapter.ask required");

  const actionSnapshot = actionInput?.action_fingerprint ? actionInput : canonicalizeAction(actionInput);
  const riskAssessment = assessRisk(actionSnapshot);
  const plan = buildAuditPlan({ actionSnapshot, riskAssessment, availableIntents });
  const startedAt = now();

  if (!plan.executable) {
    return {
      action_snapshot: actionSnapshot,
      risk_assessment: riskAssessment,
      audit_plan: plan,
      challenge_result: buildChallengeResult({
        challengeId,
        actionSnapshot,
        riskAssessment,
        plan,
        evidenceItems: [],
        completedEvidencePaths: 0,
        spendObservedAtomic: 0,
        requiredSourceUnavailable: true,
        runtimeErrors: [{ code: "INSUFFICIENT_SUPPORTED_EVIDENCE_PATHS", missing: plan.missing_required_paths }],
        startedAt,
        completedAt: now(),
      }),
    };
  }

  const evidenceItems = [];
  const runtimeErrors = [];
  let spendObservedAtomic = 0;
  let completedEvidencePaths = 0;
  let budgetExhausted = false;
  let requiredSourceUnavailable = false;

  for (const path of plan.paths) {
    const remaining = Number(riskAssessment.spend_cap_atomic) - spendObservedAtomic;
    if (remaining <= 0) {
      budgetExhausted = true;
      break;
    }

    try {
      const paidCall = await adapter.ask({
        query: path.query,
        desiredIntent: path.desired_intent,
        maxPaymentAtomic: Math.min(path.max_cost_atomic, remaining),
        challengeId,
        pathId: path.path_id,
      });

      const quotedAtomic = Number(paidCall.quote_amount_atomic ?? 0);
      if (!Number.isFinite(quotedAtomic) || quotedAtomic <= 0) {
        runtimeErrors.push({ code: "MISSING_OR_INVALID_QUOTE_AMOUNT", path_id: path.path_id });
        requiredSourceUnavailable = true;
        break;
      }
      if (quotedAtomic > remaining || quotedAtomic > path.max_cost_atomic) {
        runtimeErrors.push({ code: "QUOTE_EXCEEDS_REMAINING_BUDGET", path_id: path.path_id, quote_amount_atomic: quotedAtomic });
        budgetExhausted = true;
        break;
      }

      spendObservedAtomic += quotedAtomic;
      const item = normalizeTelegraphEvidence({ path, paidCall, actionSnapshot, challengeId });
      evidenceItems.push(item);

      if (item.coverage_complete) {
        completedEvidencePaths += 1;
      } else {
        runtimeErrors.push({
          code: "EVIDENCE_PATH_INCOMPLETE",
          path_id: path.path_id,
          reason_code: item.reason_code,
        });
      }

      if (item.materiality === "BLOCKING") break;
    } catch (error) {
      runtimeErrors.push({
        code: error?.code || "TELEGRAPH_ADAPTER_FAILURE",
        path_id: path.path_id,
        message: error instanceof Error ? error.message : String(error),
      });
      requiredSourceUnavailable = true;
      break;
    }
  }

  if (completedEvidencePaths < riskAssessment.required_evidence_paths && spendObservedAtomic >= riskAssessment.spend_cap_atomic) {
    budgetExhausted = true;
  }

  const challengeResult = buildChallengeResult({
    challengeId,
    actionSnapshot,
    riskAssessment,
    plan,
    evidenceItems,
    completedEvidencePaths,
    spendObservedAtomic,
    budgetExhausted,
    requiredSourceUnavailable,
    runtimeErrors,
    startedAt,
    completedAt: now(),
  });

  return {
    action_snapshot: actionSnapshot,
    risk_assessment: riskAssessment,
    audit_plan: plan,
    challenge_result: challengeResult,
  };
}

function sanitizeValue(value) {
  if (Array.isArray(value)) return value.map(sanitizeValue);
  if (!value || typeof value !== "object") return value;
  const out = {};
  for (const [key, nested] of Object.entries(value)) {
    if (["payer", "private_key", "privateKey", "secret", "authorization"].includes(key)) continue;
    out[key] = sanitizeValue(nested);
  }
  return out;
}

export function sanitizeAuditOutput(output) {
  return sanitizeValue(output);
}
