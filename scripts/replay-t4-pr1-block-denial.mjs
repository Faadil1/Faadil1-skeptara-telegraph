import fs from "node:fs/promises";
import { authorizeMerge, executeProtectedMerge } from "../src/merge-gate.mjs";

const fixturePath = "evidence/t4/pr1-block-run-004/reviewed-challenge.sanitized.json";
const fixture = JSON.parse(await fs.readFile(fixturePath, "utf8"));

const actionSnapshot = fixture.action_snapshot;
const challengeResult = fixture.challenge_result;
const livePr = fixture.live_pr_revalidation;
let mergeAdapterCalls = 0;

const authorization = authorizeMerge({
  actionSnapshot,
  challengeResult,
  livePr,
  allowlist: [{ repository: actionSnapshot.repository, pr_number: actionSnapshot.pr_number }],
  humanAuthorization: true,
  // Deliberately replay inside the original freshness window so BLOCK is the isolated denial cause.
  now: () => new Date("2026-09-07T01:20:00.000Z"),
});

const execution = await executeProtectedMerge({
  authorization,
  mergeAdapter: {
    async mergePullRequest() {
      mergeAdapterCalls += 1;
      throw new Error("merge adapter must never be called for BLOCK");
    },
  },
});

console.log(`[Skeptara T4 BLOCK replay] challenge: ${challengeResult.challenge_id}`);
console.log(`[Skeptara T4 BLOCK replay] action: ${actionSnapshot.repository}#${actionSnapshot.pr_number} @ ${actionSnapshot.head_sha.slice(0, 12)}`);
console.log(`[Skeptara T4 BLOCK replay] challenge outcome: ${challengeResult.outcome}`);
console.log(`[Skeptara T4 BLOCK replay] authorization: ${authorization.authorized ? "AUTHORIZED" : "DENIED"}`);
console.log(`[Skeptara T4 BLOCK replay] reasons: ${authorization.reason_codes.join(", ")}`);
console.log(`[Skeptara T4 BLOCK replay] merge adapter calls: ${mergeAdapterCalls}`);
console.log(`[Skeptara T4 BLOCK replay] execution: executed=${execution.executed} merged=${execution.merged}`);

if (authorization.authorized !== false) {
  throw new Error("BLOCK challenge unexpectedly authorized merge");
}
if (!authorization.reason_codes.includes("CHALLENGE_NOT_PASS")) {
  throw new Error(`Expected CHALLENGE_NOT_PASS, got ${authorization.reason_codes.join(", ")}`);
}
if (mergeAdapterCalls !== 0) {
  throw new Error(`Merge adapter was called ${mergeAdapterCalls} time(s) for denied BLOCK challenge`);
}
if (execution.executed !== false || execution.merged !== false) {
  throw new Error("Denied BLOCK challenge reported merge execution");
}

console.log("[Skeptara T4 BLOCK replay] PASS: fresh captured BLOCK deterministically denies execution with zero merge-adapter calls");
