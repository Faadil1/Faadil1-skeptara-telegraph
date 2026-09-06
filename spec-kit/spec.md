# Skeptara Specification

Status: DERIVED READY — reconciled to approved PRD v0.1 and T0 runtime proof.

## Scope

Build a bounded autonomous GitHub dependency-merge gate that scales independent Telegraph counter-evidence requirements with deterministic externally assigned risk.

## Actors

- **Constructor**: proposes PR merge; no authority over risk or gate.
- **Risk scorer**: deterministic policy over canonical PR facts.
- **Independent auditor**: acquires Telegraph counter-evidence.
- **Challenge gate**: deterministic PASS/BLOCK/ESCALATE evaluator.
- **Merge executor**: protected GitHub write component; only accepts fresh PASS bound to exact action.
- **Human project owner**: approves product intent/material changes/protected scope.

## Core entities

### ActionSnapshot
Required fields:
- repository
- pr_number
- head_sha
- base_branch
- changed_files
- dependency_changes
- security_sensitive_surfaces
- created_at
- action_fingerprint

### RiskAssessment
- risk_tier: LOW | MEDIUM | HIGH
- reason_codes[]
- required_evidence_paths
- cross_intent_policy
- spend_cap_atomic
- spend_asset
- spend_network
- policy_version

### EvidenceItem
- challenge_id
- intent
- miner/provider metadata actually exposed
- request_timestamp
- cost/spend metadata actually exposed
- source/provenance actually exposed
- normalized finding type
- materiality: NONE | ADVISORY | BLOCKING | AMBIGUOUS
- raw_result_ref

### ChallengeResult
- challenge_id
- action_fingerprint
- head_sha
- risk_tier
- required_coverage
- completed_coverage
- spend_observed
- outcome: PASS | BLOCK | ESCALATE
- reason_codes[]
- expires_at

## Policy invariants

1. Reviewed agent cannot assign final risk tier.
2. Reviewed agent cannot directly set challenge outcome.
3. `PASS` requires all mandatory coverage to complete.
4. Any `BLOCKING` evidence prevents PASS.
5. `AMBIGUOUS` critical evidence escalates for MEDIUM/HIGH.
6. Budget exhaustion before mandatory coverage => ESCALATE.
7. Telegraph source unavailable when mandatory => ESCALATE.
8. Head SHA mismatch => merge denied.
9. Expired challenge => merge denied.
10. Non-allow-listed repo/PR => merge denied.
11. No protected secret in client payload/logs.

## Risk policy v0.1

T0 observed a real Telegraph x402 price of `10000` atomic USDC (`$0.01`) on Base Sepolia. The initial hackathon spend caps are therefore implementation parameters aligned to one unit per required evidence path:

### LOW
- docs/copy/cosmetic-only
- min evidence paths: 1
- cross-intent: not required
- spend cap: `10000` atomic USDC (`$0.01`)

### MEDIUM
- dependency/API/schema/build changes
- min evidence paths: 2
- distinct intents preferred
- spend cap: `20000` atomic USDC (`$0.02`)

### HIGH
- auth/payments/secrets/infra/CI permissions/security-sensitive dependency surface
- min evidence paths: 3
- cross-intent required if live capability supports it
- critical ambiguity => ESCALATE
- spend cap: `30000` atomic USDC (`$0.03`)

Network: `eip155:84532` (Base Sepolia). Asset family: USDC.

These are bounded MVP implementation values derived after T0 and do not change the approved product intent.

## T0 result

`SKEPTARA_T0_REAL_TELEGRAPH_CHALLENGE = CLOSED_PASS`

Observed real runtime proof:
- live discovery succeeded;
- x402 paid call succeeded;
- miner `20260828` / `PREFLIGHT Infrastructure Signals`;
- intent `CVE_LOOKUP`;
- endpoint `/cve`;
- cost `$0.01`;
- settlement success `true` on Base Sepolia;
- signal hash present;
- real result found `CVE-2020-28500` affecting Lodash versions prior to `4.17.21`, including target `lodash@4.17.20`;
- negative source-unavailable behavior remained fail-closed => ESCALATE.

Durable evidence: `evidence/t0-real-telegraph/attempt-008/`.

## Acceptance scenarios

### A. Clean dependency PR
Given an allow-listed PR with a dependency change and MEDIUM risk, when required evidence paths complete and no blocking evidence is found, then ChallengeResult may be PASS and the exact reviewed head SHA becomes merge-eligible.

### B. Vulnerable/problematic dependency PR
Given an allow-listed PR where real Telegraph evidence yields a known vulnerability affecting the target dependency version, then the evidence may normalize to `BLOCKING`, ChallengeResult is BLOCK, and merge execution is denied.

For the hackathon challenged-case fixture, `lodash@4.17.20` + `CVE-2020-28500` is the proven real example. This is a demo policy classification, not a claim that every MEDIUM-severity CVE must universally block in production.

### C. Incomplete intelligence
Given required coverage cannot complete due to budget/source/payment/runtime failure, outcome is ESCALATE and merge is denied.

### D. PR changes after PASS
Given a PASS exists but head SHA changes, the previous PASS is invalid and merge is denied until a new challenge completes.

## Submission truth constraints

- No fixture may be shown as live Telegraph intelligence.
- No unverified claim of statistical miner independence.
- No claim that x402 itself is the product innovation.
- No claim of on-chain receipt fields unless actually exposed/captured.
- No production-readiness claim from a hackathon demo.

## Reconciliation record

Reconciled after `SKEPTARA_PRD_V0_1_HUMAN_LOCK` PASS and T0 Attempt 008 runtime/evidence review on 2026-09-06. T0 discoveries are classified as `execution_detail`; no product-intent change was introduced.
