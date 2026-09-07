import fs from "node:fs/promises";
import { runSeededCveAudit } from "../src/seeded-cve-auditor.mjs";

const fixturePath = "evidence/t2/live-pr2-seeded-run-003/replay-input.sanitized.json";
const fixture = JSON.parse(await fs.readFile(fixturePath, "utf8"));
let index = 0;

const output = await runSeededCveAudit({
  actionInput: fixture.action_input,
  availableIntents: fixture.available_intents,
  cveSeeds: fixture.cve_seeds,
  adapter: {
    async ask() {
      const paidCall = fixture.paid_calls[index];
      index += 1;
      if (!paidCall) throw new Error("Replay fixture exhausted before audit completed");
      return paidCall;
    },
  },
  now: () => new Date("2026-09-07T00:44:02.825Z"),
  challengeId: `${fixture.challenge_id}-v0.4-replay`,
});

const result = output.challenge_result;
console.log(`[Skeptara T2 replay] auditor: ${result.auditor_version}`);
console.log(`[Skeptara T2 replay] source run: ${fixture.source_run}`);
console.log(`[Skeptara T2 replay] coverage: ${result.completed_coverage}/${result.required_coverage}`);
console.log(`[Skeptara T2 replay] spend: ${result.spend_observed_atomic}/${result.spend_cap_atomic} atomic USDC`);
for (const item of result.evidence_items) {
  console.log(`[Skeptara T2 replay] evidence: ${item.seed_cve_id} | ${item.materiality} | ${item.reason_code} | complete=${item.coverage_complete}`);
}
console.log(`[Skeptara T2 replay] outcome: ${result.outcome}`);
console.log(`[Skeptara T2 replay] reasons: ${result.reason_codes.join(", ")}`);

const expected =
  result.outcome === "PASS" &&
  result.completed_coverage === 2 &&
  result.spend_observed_atomic === 20000 &&
  result.evidence_items.length === 2 &&
  result.evidence_items.every((item) => item.materiality === "ADVISORY" && item.coverage_complete === true);

if (!expected) {
  console.error("[Skeptara T2 replay] FAIL: live run 003 evidence does not satisfy v0.4 expected replay contract");
  process.exitCode = 1;
} else {
  console.log("[Skeptara T2 replay] PASS: captured live evidence deterministically replays as two non-blocking advisory paths");
}
