import crypto from "node:crypto";

export const POLICY_VERSION = "skeptara-risk-v0.1";

export const RISK_CONTRACTS = Object.freeze({
  LOW: Object.freeze({
    required_evidence_paths: 1,
    spend_cap_atomic: 10000,
    cross_intent_policy: "NOT_REQUIRED",
  }),
  MEDIUM: Object.freeze({
    required_evidence_paths: 2,
    spend_cap_atomic: 20000,
    cross_intent_policy: "PREFERRED",
  }),
  HIGH: Object.freeze({
    required_evidence_paths: 3,
    spend_cap_atomic: 30000,
    cross_intent_policy: "REQUIRED_IF_SUPPORTED",
  }),
});

function sortedUniqueStrings(values = []) {
  return [...new Set(values.map((v) => String(v).trim()).filter(Boolean))].sort();
}

function normalizeDependencyChange(change) {
  if (!change || typeof change !== "object") {
    throw new TypeError("dependency_changes entries must be objects");
  }
  const name = String(change.name || "").trim();
  if (!name) throw new TypeError("dependency change requires name");
  return {
    name,
    from: change.from == null ? null : String(change.from),
    to: change.to == null ? null : String(change.to),
    type: change.type == null ? "runtime" : String(change.type),
    security_sensitive: Boolean(change.security_sensitive),
  };
}

function stableStringify(value) {
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(",")}]`;
  if (value && typeof value === "object") {
    const keys = Object.keys(value).sort();
    return `{${keys.map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`).join(",")}}`;
  }
  return JSON.stringify(value);
}

export function canonicalizeAction(input) {
  if (!input || typeof input !== "object") throw new TypeError("action input required");
  const repository = String(input.repository || "").trim();
  const prNumber = Number(input.pr_number);
  const headSha = String(input.head_sha || "").trim().toLowerCase();
  const baseBranch = String(input.base_branch || "").trim();
  if (!repository.includes("/")) throw new TypeError("repository must be owner/name");
  if (!Number.isInteger(prNumber) || prNumber <= 0) throw new TypeError("pr_number must be a positive integer");
  if (!/^[0-9a-f]{7,64}$/.test(headSha)) throw new TypeError("head_sha must be hexadecimal");
  if (!baseBranch) throw new TypeError("base_branch required");

  const changedFiles = sortedUniqueStrings(input.changed_files || []);
  const dependencyChanges = (input.dependency_changes || [])
    .map(normalizeDependencyChange)
    .sort((a, b) => a.name.localeCompare(b.name) || String(a.to).localeCompare(String(b.to)));
  const securitySensitiveSurfaces = sortedUniqueStrings(input.security_sensitive_surfaces || []);

  const fingerprintPayload = {
    repository,
    pr_number: prNumber,
    head_sha: headSha,
    base_branch: baseBranch,
    changed_files: changedFiles,
    dependency_changes: dependencyChanges,
    security_sensitive_surfaces: securitySensitiveSurfaces,
  };
  const actionFingerprint = `sha256:${crypto.createHash("sha256").update(stableStringify(fingerprintPayload)).digest("hex")}`;

  return {
    ...fingerprintPayload,
    created_at: input.created_at ? new Date(input.created_at).toISOString() : new Date().toISOString(),
    action_fingerprint: actionFingerprint,
  };
}

const LOW_FILE = /(^|\/)(docs?|readme|changelog)(\/|\.|$)|\.(md|mdx|txt)$/i;
const COSMETIC_FILE = /\.(css|scss|sass|less)$/i;
const MEDIUM_FILE = /(^|\/)(package(-lock)?\.json|pnpm-lock\.yaml|yarn\.lock|.*schema.*|.*migration.*|.*api.*|vite\.config\.|webpack\.config\.|tsconfig\.|Dockerfile|docker-compose|build\.)/i;

export function assessRisk(actionSnapshot) {
  if (!actionSnapshot?.action_fingerprint) throw new TypeError("canonical ActionSnapshot required");

  const reasons = [];
  let riskTier;

  if (
    actionSnapshot.security_sensitive_surfaces.length > 0 ||
    actionSnapshot.dependency_changes.some((change) => change.security_sensitive)
  ) {
    riskTier = "HIGH";
    reasons.push("SECURITY_SENSITIVE_SURFACE");
  } else if (actionSnapshot.dependency_changes.length > 0) {
    riskTier = "MEDIUM";
    reasons.push("DEPENDENCY_CHANGE");
  } else if (actionSnapshot.changed_files.some((file) => MEDIUM_FILE.test(file))) {
    riskTier = "MEDIUM";
    reasons.push("API_SCHEMA_BUILD_OR_CONFIG_CHANGE");
  } else if (
    actionSnapshot.changed_files.length > 0 &&
    actionSnapshot.changed_files.every((file) => LOW_FILE.test(file) || COSMETIC_FILE.test(file))
  ) {
    riskTier = "LOW";
    reasons.push("DOCS_COPY_OR_COSMETIC_ONLY");
  } else {
    riskTier = "MEDIUM";
    reasons.push("CONSERVATIVE_DEFAULT_UNCLASSIFIED_FUNCTIONAL_CHANGE");
  }

  const contract = RISK_CONTRACTS[riskTier];
  return {
    risk_tier: riskTier,
    reason_codes: reasons,
    required_evidence_paths: contract.required_evidence_paths,
    cross_intent_policy: contract.cross_intent_policy,
    spend_cap_atomic: contract.spend_cap_atomic,
    spend_asset: "USDC",
    spend_network: "eip155:84532",
    policy_version: POLICY_VERSION,
  };
}

export function evaluateChallenge({
  riskAssessment,
  evidenceItems = [],
  completedEvidencePaths = 0,
  spendObservedAtomic = 0,
  budgetExhausted = false,
  requiredSourceUnavailable = false,
  crossIntentSupported = false,
}) {
  if (!riskAssessment || !RISK_CONTRACTS[riskAssessment.risk_tier]) {
    throw new TypeError("valid riskAssessment required");
  }

  const blocking = evidenceItems.some((item) => item?.materiality === "BLOCKING");
  if (blocking) {
    return { outcome: "BLOCK", reason_codes: ["MATERIAL_COUNTER_EVIDENCE_FOUND"] };
  }

  const reasons = [];
  if (requiredSourceUnavailable) reasons.push("REQUIRED_TELEGRAPH_SOURCE_UNAVAILABLE");
  if (Number(spendObservedAtomic) > Number(riskAssessment.spend_cap_atomic)) reasons.push("SPEND_CAP_EXCEEDED");
  if (budgetExhausted && completedEvidencePaths < riskAssessment.required_evidence_paths) {
    reasons.push("BUDGET_EXHAUSTED_BEFORE_REQUIRED_COVERAGE");
  }
  if (completedEvidencePaths < riskAssessment.required_evidence_paths) reasons.push("INCOMPLETE_REQUIRED_COVERAGE");

  const criticalAmbiguity = evidenceItems.some((item) => item?.materiality === "AMBIGUOUS" && item?.critical === true);
  if (criticalAmbiguity && riskAssessment.risk_tier !== "LOW") reasons.push("CRITICAL_AMBIGUITY");

  if (riskAssessment.cross_intent_policy === "REQUIRED_IF_SUPPORTED" && crossIntentSupported) {
    const uniqueIntents = new Set(evidenceItems.map((item) => item?.intent).filter(Boolean));
    if (uniqueIntents.size < 2) reasons.push("CROSS_INTENT_COVERAGE_INCOMPLETE");
  }

  if (reasons.length > 0) {
    return { outcome: "ESCALATE", reason_codes: [...new Set(reasons)] };
  }

  return { outcome: "PASS", reason_codes: ["REQUIRED_COVERAGE_COMPLETE_NO_BLOCKING_EVIDENCE"] };
}
