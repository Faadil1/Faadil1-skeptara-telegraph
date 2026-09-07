export const MERGE_GATE_VERSION = "skeptara-merge-gate-v0.1";

function asIsoMs(value) {
  if (!value) return null;
  const ms = Date.parse(value);
  return Number.isFinite(ms) ? ms : null;
}

function normalizeAllowlist(entries = []) {
  return entries
    .filter((entry) => entry && typeof entry === "object")
    .map((entry) => ({
      repository: String(entry.repository || "").trim(),
      pr_number: Number(entry.pr_number),
    }))
    .filter((entry) => entry.repository.includes("/") && Number.isInteger(entry.pr_number) && entry.pr_number > 0);
}

function livePrState(livePr = {}) {
  return {
    repository: String(livePr.repository ?? livePr.repository_full_name ?? "").trim(),
    pr_number: Number(livePr.pr_number ?? livePr.number),
    head_sha: String(livePr.head_sha ?? "").trim().toLowerCase(),
    base_branch: String(livePr.base_branch ?? livePr.base ?? "").trim(),
    state: String(livePr.state ?? "").toLowerCase(),
    merged: Boolean(livePr.merged),
  };
}

export function authorizeMerge({
  actionSnapshot,
  challengeResult,
  livePr,
  allowlist = [],
  humanAuthorization = false,
  now = () => new Date(),
}) {
  if (!actionSnapshot?.action_fingerprint) throw new TypeError("canonical ActionSnapshot required");
  if (!challengeResult || typeof challengeResult !== "object") throw new TypeError("ChallengeResult required");

  const reasons = [];
  const target = livePrState(livePr);
  const allowed = normalizeAllowlist(allowlist).some(
    (entry) => entry.repository === actionSnapshot.repository && entry.pr_number === actionSnapshot.pr_number,
  );

  if (!allowed) reasons.push("TARGET_NOT_ALLOWLISTED");
  if (humanAuthorization !== true) reasons.push("HUMAN_AUTHORIZATION_REQUIRED");

  if (challengeResult.outcome !== "PASS") reasons.push("CHALLENGE_NOT_PASS");
  if (challengeResult.repository !== actionSnapshot.repository) reasons.push("CHALLENGE_REPOSITORY_MISMATCH");
  if (Number(challengeResult.pr_number) !== Number(actionSnapshot.pr_number)) reasons.push("CHALLENGE_PR_MISMATCH");
  if (String(challengeResult.head_sha || "").toLowerCase() !== actionSnapshot.head_sha) reasons.push("CHALLENGE_HEAD_SHA_MISMATCH");
  if (challengeResult.action_fingerprint !== actionSnapshot.action_fingerprint) reasons.push("CHALLENGE_ACTION_FINGERPRINT_MISMATCH");

  const expiresAtMs = asIsoMs(challengeResult.expires_at);
  const completedAtMs = asIsoMs(challengeResult.completed_at);
  const nowValue = now();
  const nowMs = nowValue instanceof Date ? nowValue.getTime() : new Date(nowValue).getTime();
  if (!Number.isFinite(nowMs)) throw new TypeError("valid now required");
  if (expiresAtMs == null) reasons.push("CHALLENGE_EXPIRY_MISSING_OR_INVALID");
  else if (nowMs >= expiresAtMs) reasons.push("CHALLENGE_EXPIRED");
  if (completedAtMs == null) reasons.push("CHALLENGE_COMPLETION_TIME_MISSING_OR_INVALID");
  else if (completedAtMs > nowMs + 60_000) reasons.push("CHALLENGE_COMPLETION_TIME_IN_FUTURE");

  if (target.repository && target.repository !== actionSnapshot.repository) reasons.push("LIVE_PR_REPOSITORY_MISMATCH");
  if (target.pr_number !== actionSnapshot.pr_number) reasons.push("LIVE_PR_NUMBER_MISMATCH");
  if (target.state !== "open") reasons.push("LIVE_PR_NOT_OPEN");
  if (target.merged) reasons.push("LIVE_PR_ALREADY_MERGED");
  if (target.head_sha !== actionSnapshot.head_sha) reasons.push("LIVE_PR_HEAD_SHA_CHANGED");
  if (target.base_branch && target.base_branch !== actionSnapshot.base_branch) reasons.push("LIVE_PR_BASE_BRANCH_MISMATCH");

  const uniqueReasons = [...new Set(reasons)];
  return {
    gate_version: MERGE_GATE_VERSION,
    authorized: uniqueReasons.length === 0,
    reason_codes: uniqueReasons.length === 0 ? ["FRESH_BOUND_PASS_AUTHORIZED"] : uniqueReasons,
    repository: actionSnapshot.repository,
    pr_number: actionSnapshot.pr_number,
    head_sha: actionSnapshot.head_sha,
    action_fingerprint: actionSnapshot.action_fingerprint,
    challenge_id: challengeResult.challenge_id ?? null,
    challenge_expires_at: challengeResult.expires_at ?? null,
  };
}

export async function executeProtectedMerge({ authorization, mergeAdapter, mergeMethod = "merge" }) {
  if (!authorization || authorization.gate_version !== MERGE_GATE_VERSION) {
    throw new TypeError("merge authorization from Skeptara merge gate required");
  }
  if (authorization.authorized !== true) {
    return {
      executed: false,
      merged: false,
      reason_codes: ["MERGE_AUTHORIZATION_DENIED", ...(authorization.reason_codes || [])],
    };
  }
  if (!mergeAdapter || typeof mergeAdapter.mergePullRequest !== "function") {
    throw new TypeError("server-side mergeAdapter.mergePullRequest required");
  }

  const result = await mergeAdapter.mergePullRequest({
    repository: authorization.repository,
    pr_number: authorization.pr_number,
    expected_head_sha: authorization.head_sha,
    merge_method: mergeMethod,
  });

  return {
    executed: true,
    merged: result?.merged === true,
    sha: result?.sha ?? null,
    message: result?.message ?? null,
    expected_head_sha: authorization.head_sha,
  };
}
