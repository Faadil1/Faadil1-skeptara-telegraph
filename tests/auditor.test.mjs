import test from "node:test";
import assert from "node:assert/strict";
import { canonicalizeAction, assessRisk } from "../src/policy.mjs";
import { buildAuditPlan, normalizeTelegraphEvidence, runIndependentAudit } from "../src/auditor.mjs";

const challenged = canonicalizeAction({
  repository: "Faadil1/skeptara-demo",
  pr_number: 2,
  head_sha: "b".repeat(40),
  base_branch: "main",
  changed_files: ["package.json", "package-lock.json"],
  dependency_changes: [{ name: "lodash", from: "4.17.21", to: "4.17.20" }],
  security_sensitive_surfaces: [],
  created_at: "2026-09-06T21:00:00Z",
});

const clean = canonicalizeAction({
  repository: "Faadil1/skeptara-demo",
  pr_number: 3,
  head_sha: "c".repeat(40),
  base_branch: "main",
  changed_files: ["package.json", "package-lock.json"],
  dependency_changes: [{ name: "lodash", from: "4.17.20", to: "4.17.21" }],
  security_sensitive_surfaces: [],
  created_at: "2026-09-06T21:00:00Z",
});

test("MEDIUM dependency audit plan chooses two generic package-compatible evidence paths deterministically", () => {
  const risk = assessRisk(challenged);
  const plan = buildAuditPlan({ actionSnapshot: challenged, riskAssessment: risk, availableIntents: ["WEB_SEARCH", "FACT_CHECK", "CVE_LOOKUP"] });
  assert.equal(plan.executable, true);
  assert.equal(plan.paths.length, 2);
  assert.deepEqual(plan.paths.map((p) => p.desired_intent), ["FACT_CHECK", "WEB_SEARCH"]);
  assert.equal(plan.paths[0].max_cost_atomic, 10000);
  assert.equal(plan.paths[1].max_cost_atomic, 10000);
});

test("auditor queries contain canonical facts but no constructor rationale input", () => {
  const risk = assessRisk(challenged);
  const plan = buildAuditPlan({ actionSnapshot: challenged, riskAssessment: risk, availableIntents: ["FACT_CHECK", "WEB_SEARCH"] });
  const joined = plan.paths.map((p) => p.query).join("\n");
  assert.match(joined, /lodash@4\.17\.20/);
  assert.match(joined, /Seek|Search|Fact-check/i);
  assert.doesNotMatch(joined, /constructor rationale|because the coding agent said/i);
});

test("known CVE range that contains target version normalizes to BLOCKING", () => {
  const item = normalizeTelegraphEvidence({
    path: { path_id: "path-1-cve_lookup", desired_intent: "CVE_LOOKUP" },
    actionSnapshot: challenged,
    challengeId: "challenge-1",
    paidCall: {
      started_at: "2026-09-06T21:42:55Z",
      completed_at: "2026-09-06T21:42:59Z",
      quote_amount_atomic: 10000,
      payment_response: { success: true, network: "eip155:84532" },
      response: {
        miner_id: "20260828",
        miner_name: "PREFLIGHT Infrastructure Signals",
        endpoint: "/cve",
        intent: "CVE_LOOKUP",
        cost_usd: 0.01,
        result: { found: true, verdict: "found", cve_id: "CVE-2020-28500", affected_versions: ["Lodash versions prior to 4.17.21"], severity: "MEDIUM", source: "CVE.org and NVD" },
      },
    },
  });
  assert.equal(item.materiality, "BLOCKING");
  assert.equal(item.reason_code, "KNOWN_VULNERABILITY_AFFECTS_TARGET_DEPENDENCY_VERSION");
  assert.equal(item.coverage_complete, true);
});

test("same CVE upper bound does not block target at fixed version", () => {
  const item = normalizeTelegraphEvidence({
    path: { path_id: "path-1-cve_lookup", desired_intent: "CVE_LOOKUP" },
    actionSnapshot: clean,
    challengeId: "challenge-2",
    paidCall: { response: { intent: "CVE_LOOKUP", result: { found: true, cve_id: "CVE-2020-28500", affected_versions: ["Lodash versions prior to 4.17.21"] } } },
  });
  assert.equal(item.materiality, "ADVISORY");
  assert.equal(item.reason_code, "KNOWN_VULNERABILITY_DOES_NOT_MATCH_TARGET_VERSION_RANGE");
  assert.equal(item.coverage_complete, true);
});

test("invalid evidence-path input is critical, incomplete, and cannot count as clean evidence", () => {
  const item = normalizeTelegraphEvidence({
    path: { path_id: "path-1-cve_lookup", desired_intent: "CVE_LOOKUP" },
    actionSnapshot: clean,
    challengeId: "challenge-invalid",
    paidCall: {
      response: {
        intent: "CVE_LOOKUP",
        result: {
          found: false,
          missing: "valid request input",
          verdict: "not_found",
          reason: "The CVE vulnerability lookup cannot be completed because the supplied request is invalid: a CVE lookup requires an identifier such as CVE-2021-44228.",
        },
      },
    },
  });
  assert.equal(item.materiality, "AMBIGUOUS");
  assert.equal(item.reason_code, "EVIDENCE_PATH_INPUT_INVALID");
  assert.equal(item.critical, true);
  assert.equal(item.coverage_complete, false);
});

test("BLOCKING evidence causes asymmetric early stop after first path", async () => {
  let calls = 0;
  const adapter = {
    async ask() {
      calls += 1;
      return {
        quote_amount_atomic: 10000,
        payment_response: { success: true, network: "eip155:84532" },
        response: { miner_id: "20260828", intent: "CVE_LOOKUP", cost_usd: 0.01, result: { found: true, cve_id: "CVE-2020-28500", affected_versions: ["Lodash versions prior to 4.17.21"] } },
      };
    },
  };
  const output = await runIndependentAudit({ actionInput: challenged, availableIntents: ["FACT_CHECK", "WEB_SEARCH"], adapter, now: () => new Date("2026-09-06T22:00:00Z"), challengeId: "challenge-block" });
  assert.equal(calls, 1);
  assert.equal(output.challenge_result.outcome, "BLOCK");
  assert.equal(output.challenge_result.completed_coverage, 1);
  assert.equal(output.challenge_result.spend_observed_atomic, 10000);
});

test("clean MEDIUM audit requires both paths and can PASS", async () => {
  const responses = [
    { quote_amount_atomic: 10000, payment_response: { success: true, network: "eip155:84532" }, response: { intent: "FACT_CHECK", cost_usd: 0.01, result: { verdict: "unverified", evidence: null } } },
    { quote_amount_atomic: 10000, payment_response: { success: true, network: "eip155:84532" }, response: { intent: "WEB_SEARCH", cost_usd: 0.01, result: { found: false, verdict: "not_found" } } },
  ];
  let index = 0;
  const adapter = { async ask() { return responses[index++]; } };
  const output = await runIndependentAudit({ actionInput: clean, availableIntents: ["FACT_CHECK", "WEB_SEARCH"], adapter, now: () => new Date("2026-09-06T22:00:00Z"), challengeId: "challenge-pass" });
  assert.equal(output.challenge_result.outcome, "PASS");
  assert.equal(output.challenge_result.completed_coverage, 2);
  assert.equal(output.challenge_result.spend_observed_atomic, 20000);
  assert.equal(output.challenge_result.evidence_items.length, 2);
});

test("paid but invalid required path does not count as coverage and escalates", async () => {
  const responses = [
    {
      quote_amount_atomic: 10000,
      payment_response: { success: true, network: "eip155:84532" },
      response: {
        intent: "CVE_LOOKUP",
        cost_usd: 0.01,
        result: {
          found: false,
          missing: "valid request input",
          verdict: "not_found",
          reason: "The CVE vulnerability lookup cannot be completed because the supplied request is invalid and requires an identifier.",
        },
      },
    },
    { quote_amount_atomic: 10000, payment_response: { success: true, network: "eip155:84532" }, response: { intent: "WEB_SEARCH", cost_usd: 0.01, result: { found: false, verdict: "not_found" } } },
  ];
  let index = 0;
  const adapter = { async ask() { return responses[index++]; } };
  const output = await runIndependentAudit({ actionInput: clean, availableIntents: ["FACT_CHECK", "WEB_SEARCH"], adapter, challengeId: "challenge-invalid-path" });
  assert.equal(output.challenge_result.outcome, "ESCALATE");
  assert.equal(output.challenge_result.completed_coverage, 1);
  assert.equal(output.challenge_result.spend_observed_atomic, 20000);
  assert.ok(output.challenge_result.reason_codes.includes("INCOMPLETE_REQUIRED_COVERAGE"));
  assert.ok(output.challenge_result.reason_codes.includes("BUDGET_EXHAUSTED_BEFORE_REQUIRED_COVERAGE"));
  assert.equal(output.challenge_result.runtime_errors[0].code, "EVIDENCE_PATH_INCOMPLETE");
});

test("insufficient supported paths fails closed without calling paid adapter", async () => {
  let called = false;
  const adapter = { async ask() { called = true; throw new Error("should not run"); } };
  const output = await runIndependentAudit({ actionInput: clean, availableIntents: ["CVE_LOOKUP"], adapter, challengeId: "challenge-no-capability" });
  assert.equal(called, false);
  assert.equal(output.challenge_result.outcome, "ESCALATE");
  assert.ok(output.challenge_result.reason_codes.includes("REQUIRED_TELEGRAPH_SOURCE_UNAVAILABLE"));
});

test("adapter failure fails closed with runtime evidence and incomplete coverage", async () => {
  const adapter = { async ask() { const err = new Error("HTTP 503"); err.code = "TELEGRAPH_HTTP_ERROR"; throw err; } };
  const output = await runIndependentAudit({ actionInput: clean, availableIntents: ["FACT_CHECK", "WEB_SEARCH"], adapter, challengeId: "challenge-error" });
  assert.equal(output.challenge_result.outcome, "ESCALATE");
  assert.equal(output.challenge_result.runtime_errors[0].code, "TELEGRAPH_HTTP_ERROR");
});

test("quote beyond per-path budget fails closed before accepting spend", async () => {
  const adapter = { async ask() { return { quote_amount_atomic: 15000, response: { intent: "FACT_CHECK", result: { found: false } } }; } };
  const output = await runIndependentAudit({ actionInput: clean, availableIntents: ["FACT_CHECK", "WEB_SEARCH"], adapter, challengeId: "challenge-budget" });
  assert.equal(output.challenge_result.outcome, "ESCALATE");
  assert.equal(output.challenge_result.spend_observed_atomic, 0);
  assert.equal(output.challenge_result.runtime_errors[0].code, "QUOTE_EXCEEDS_REMAINING_BUDGET");
});
