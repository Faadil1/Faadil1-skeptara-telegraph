import test from "node:test";
import assert from "node:assert/strict";
import { canonicalizeAction } from "../src/policy.mjs";
import { authorizeMerge, executeProtectedMerge, MERGE_GATE_VERSION } from "../src/merge-gate.mjs";

const action = canonicalizeAction({
  repository: "Faadil1/Faadil1-skeptara-telegraph",
  pr_number: 2,
  head_sha: "d2aa0ea25daf1f84b6cfdd98861d3f05df584b7a",
  base_branch: "main",
  changed_files: ["demo/controlled-clean/package.json"],
  dependency_changes: [{ name: "lodash", from: "4.17.20", to: "4.18.1" }],
  security_sensitive_surfaces: [],
  created_at: "2026-09-07T01:00:00Z",
});

const allowlist = [{ repository: action.repository, pr_number: action.pr_number }];
const livePr = {
  repository: action.repository,
  pr_number: action.pr_number,
  head_sha: action.head_sha,
  base_branch: action.base_branch,
  state: "open",
  merged: false,
};

function challenge(overrides = {}) {
  return {
    challenge_id: "fresh-clean-pass",
    repository: action.repository,
    pr_number: action.pr_number,
    head_sha: action.head_sha,
    action_fingerprint: action.action_fingerprint,
    outcome: "PASS",
    completed_at: "2026-09-07T01:00:00Z",
    expires_at: "2026-09-07T01:15:00Z",
    ...overrides,
  };
}

const now = () => new Date("2026-09-07T01:05:00Z");

test("fresh exact PASS + allowlist + human authorization authorizes merge", () => {
  const result = authorizeMerge({ actionSnapshot: action, challengeResult: challenge(), livePr, allowlist, humanAuthorization: true, now });
  assert.equal(result.gate_version, MERGE_GATE_VERSION);
  assert.equal(result.authorized, true);
  assert.deepEqual(result.reason_codes, ["FRESH_BOUND_PASS_AUTHORIZED"]);
});

test("BLOCK or ESCALATE cannot authorize merge", () => {
  for (const outcome of ["BLOCK", "ESCALATE"]) {
    const result = authorizeMerge({ actionSnapshot: action, challengeResult: challenge({ outcome }), livePr, allowlist, humanAuthorization: true, now });
    assert.equal(result.authorized, false);
    assert.ok(result.reason_codes.includes("CHALLENGE_NOT_PASS"));
  }
});

test("changed live PR head denies authorization", () => {
  const result = authorizeMerge({
    actionSnapshot: action,
    challengeResult: challenge(),
    livePr: { ...livePr, head_sha: "a".repeat(40) },
    allowlist,
    humanAuthorization: true,
    now,
  });
  assert.equal(result.authorized, false);
  assert.ok(result.reason_codes.includes("LIVE_PR_HEAD_SHA_CHANGED"));
});

test("challenge head mismatch denies authorization even if live PR matches action", () => {
  const result = authorizeMerge({
    actionSnapshot: action,
    challengeResult: challenge({ head_sha: "b".repeat(40) }),
    livePr,
    allowlist,
    humanAuthorization: true,
    now,
  });
  assert.equal(result.authorized, false);
  assert.ok(result.reason_codes.includes("CHALLENGE_HEAD_SHA_MISMATCH"));
});

test("expired challenge denies authorization", () => {
  const result = authorizeMerge({
    actionSnapshot: action,
    challengeResult: challenge({ expires_at: "2026-09-07T01:04:59Z" }),
    livePr,
    allowlist,
    humanAuthorization: true,
    now,
  });
  assert.equal(result.authorized, false);
  assert.ok(result.reason_codes.includes("CHALLENGE_EXPIRED"));
});

test("missing or invalid challenge expiry fails closed", () => {
  for (const expires_at of [null, "not-a-date"]) {
    const result = authorizeMerge({
      actionSnapshot: action,
      challengeResult: challenge({ expires_at }),
      livePr,
      allowlist,
      humanAuthorization: true,
      now,
    });
    assert.equal(result.authorized, false);
    assert.ok(result.reason_codes.includes("CHALLENGE_EXPIRY_MISSING_OR_INVALID"));
  }
});

test("non-allow-listed target denies authorization", () => {
  const result = authorizeMerge({ actionSnapshot: action, challengeResult: challenge(), livePr, allowlist: [], humanAuthorization: true, now });
  assert.equal(result.authorized, false);
  assert.ok(result.reason_codes.includes("TARGET_NOT_ALLOWLISTED"));
});

test("action fingerprint mismatch denies authorization", () => {
  const result = authorizeMerge({
    actionSnapshot: action,
    challengeResult: challenge({ action_fingerprint: "sha256:" + "0".repeat(64) }),
    livePr,
    allowlist,
    humanAuthorization: true,
    now,
  });
  assert.equal(result.authorized, false);
  assert.ok(result.reason_codes.includes("CHALLENGE_ACTION_FINGERPRINT_MISMATCH"));
});

test("human bounded authorization is mandatory", () => {
  const result = authorizeMerge({ actionSnapshot: action, challengeResult: challenge(), livePr, allowlist, humanAuthorization: false, now });
  assert.equal(result.authorized, false);
  assert.ok(result.reason_codes.includes("HUMAN_AUTHORIZATION_REQUIRED"));
});

test("closed or already merged live PR fails closed", () => {
  const closed = authorizeMerge({
    actionSnapshot: action,
    challengeResult: challenge(),
    livePr: { ...livePr, state: "closed" },
    allowlist,
    humanAuthorization: true,
    now,
  });
  assert.equal(closed.authorized, false);
  assert.ok(closed.reason_codes.includes("LIVE_PR_NOT_OPEN"));

  const merged = authorizeMerge({
    actionSnapshot: action,
    challengeResult: challenge(),
    livePr: { ...livePr, merged: true },
    allowlist,
    humanAuthorization: true,
    now,
  });
  assert.equal(merged.authorized, false);
  assert.ok(merged.reason_codes.includes("LIVE_PR_ALREADY_MERGED"));
});

test("denied authorization never calls merge adapter", async () => {
  let calls = 0;
  const denied = authorizeMerge({ actionSnapshot: action, challengeResult: challenge({ outcome: "BLOCK" }), livePr, allowlist, humanAuthorization: true, now });
  const result = await executeProtectedMerge({ authorization: denied, mergeAdapter: { async mergePullRequest() { calls += 1; return { merged: true }; } } });
  assert.equal(calls, 0);
  assert.equal(result.executed, false);
  assert.equal(result.merged, false);
});

test("authorized executor passes exact expected head SHA to server-side adapter", async () => {
  let received = null;
  const authorization = authorizeMerge({ actionSnapshot: action, challengeResult: challenge(), livePr, allowlist, humanAuthorization: true, now });
  const result = await executeProtectedMerge({
    authorization,
    mergeAdapter: {
      async mergePullRequest(input) {
        received = input;
        return { merged: true, sha: "merge-sha", message: "Pull Request successfully merged" };
      },
    },
  });

  assert.equal(result.executed, true);
  assert.equal(result.merged, true);
  assert.equal(received.repository, action.repository);
  assert.equal(received.pr_number, action.pr_number);
  assert.equal(received.expected_head_sha, action.head_sha);
});
