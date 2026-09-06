import test from "node:test";
import assert from "node:assert/strict";
import { canonicalizeAction, assessRisk, evaluateChallenge } from "../src/policy.mjs";

const base = {
  repository: "Faadil1/demo",
  pr_number: 7,
  head_sha: "a".repeat(40),
  base_branch: "main",
};

test("canonicalization is order-stable", () => {
  const a = canonicalizeAction({ ...base, changed_files: ["b.md", "a.md"] });
  const b = canonicalizeAction({ ...base, changed_files: ["a.md", "b.md"] });
  assert.equal(a.action_fingerprint, b.action_fingerprint);
});

test("docs-only is LOW with one 0.01 USDC path", () => {
  const risk = assessRisk(canonicalizeAction({ ...base, changed_files: ["README.md"] }));
  assert.equal(risk.risk_tier, "LOW");
  assert.equal(risk.required_evidence_paths, 1);
  assert.equal(risk.spend_cap_atomic, 10000);
});

test("dependency change is MEDIUM with two paths", () => {
  const risk = assessRisk(canonicalizeAction({
    ...base,
    changed_files: ["package.json"],
    dependency_changes: [{ name: "lodash", from: "4.17.21", to: "4.17.20" }],
  }));
  assert.equal(risk.risk_tier, "MEDIUM");
  assert.equal(risk.required_evidence_paths, 2);
  assert.equal(risk.spend_cap_atomic, 20000);
});

test("security-sensitive surface is HIGH with three paths", () => {
  const risk = assessRisk(canonicalizeAction({
    ...base,
    changed_files: ["src/auth.ts"],
    security_sensitive_surfaces: ["auth"],
  }));
  assert.equal(risk.risk_tier, "HIGH");
  assert.equal(risk.required_evidence_paths, 3);
  assert.equal(risk.spend_cap_atomic, 30000);
});

test("unknown functional change defaults to MEDIUM", () => {
  const risk = assessRisk(canonicalizeAction({ ...base, changed_files: ["src/app.ts"] }));
  assert.equal(risk.risk_tier, "MEDIUM");
});

test("blocking evidence always BLOCKS", () => {
  const risk = assessRisk(canonicalizeAction({ ...base, changed_files: ["README.md"] }));
  const result = evaluateChallenge({
    riskAssessment: risk,
    completedEvidencePaths: 1,
    spendObservedAtomic: 10000,
    evidenceItems: [{ intent: "CVE_LOOKUP", materiality: "BLOCKING" }],
  });
  assert.equal(result.outcome, "BLOCK");
});

test("incomplete coverage escalates", () => {
  const risk = assessRisk(canonicalizeAction({
    ...base,
    changed_files: ["package.json"],
    dependency_changes: [{ name: "lodash", to: "4.17.20" }],
  }));
  const result = evaluateChallenge({ riskAssessment: risk, completedEvidencePaths: 1, spendObservedAtomic: 10000 });
  assert.equal(result.outcome, "ESCALATE");
  assert.ok(result.reason_codes.includes("INCOMPLETE_REQUIRED_COVERAGE"));
});

test("critical ambiguity escalates for MEDIUM/HIGH", () => {
  const risk = assessRisk(canonicalizeAction({ ...base, changed_files: ["package.json"] }));
  const result = evaluateChallenge({
    riskAssessment: risk,
    completedEvidencePaths: 2,
    spendObservedAtomic: 20000,
    evidenceItems: [{ intent: "FACT_CHECK", materiality: "AMBIGUOUS", critical: true }],
  });
  assert.equal(result.outcome, "ESCALATE");
});

test("HIGH requires cross-intent when support exists", () => {
  const risk = assessRisk(canonicalizeAction({
    ...base,
    changed_files: ["src/auth.ts"],
    security_sensitive_surfaces: ["auth"],
  }));
  const result = evaluateChallenge({
    riskAssessment: risk,
    completedEvidencePaths: 3,
    spendObservedAtomic: 30000,
    crossIntentSupported: true,
    evidenceItems: [
      { intent: "CVE_LOOKUP", materiality: "NONE" },
      { intent: "CVE_LOOKUP", materiality: "NONE" },
      { intent: "CVE_LOOKUP", materiality: "NONE" },
    ],
  });
  assert.equal(result.outcome, "ESCALATE");
  assert.ok(result.reason_codes.includes("CROSS_INTENT_COVERAGE_INCOMPLETE"));
});

test("clean MEDIUM challenge can PASS", () => {
  const risk = assessRisk(canonicalizeAction({
    ...base,
    changed_files: ["package.json"],
    dependency_changes: [{ name: "lodash", from: "4.17.20", to: "4.17.21" }],
  }));
  const result = evaluateChallenge({
    riskAssessment: risk,
    completedEvidencePaths: 2,
    spendObservedAtomic: 20000,
    evidenceItems: [
      { intent: "CVE_LOOKUP", materiality: "NONE" },
      { intent: "FACT_CHECK", materiality: "NONE" },
    ],
  });
  assert.equal(result.outcome, "PASS");
});
