# Skeptara Specification

Status: DERIVED DRAFT — requires PRD v0.1 human lock before build authority.

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
- cross_intent_required: bool
- spend_cap
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

### LOW
- docs/copy/cosmetic-only
- min evidence paths: 1
- cross-intent: no

### MEDIUM
- dependency/API/schema/build changes
- min evidence paths: 2
- prefer distinct intents

### HIGH
- auth/payments/secrets/infra/CI permissions/security-sensitive dependency surface
- min evidence paths: 3
- cross-intent required if live capability supports it
- critical ambiguity => ESCALATE

Exact spend caps are configuration values to be set after T0 observes live Telegraph pricing.

## T0 requirement

`SKEPTARA_T0_REAL_TELEGRAPH_CHALLENGE` must prove:
- live Telegraph endpoint/tool availability;
- discovery of relevant current miners/intents;
- at least one genuine paid inference/challenge call;
- capture of real returned miner/intent/cost/provenance fields without fabrication;
- a normalized EvidenceItem produced from the live result;
- negative behavior for unavailable/payment-failure path is fail-closed.

T0 does **not** require a full UI or real GitHub merge.

## Acceptance scenarios

### A. Clean dependency PR
Given an allow-listed PR with a dependency change and MEDIUM risk, when required evidence paths complete and no blocking evidence is found, then ChallengeResult may be PASS and the exact reviewed head SHA becomes merge-eligible.

### B. Vulnerable/problematic dependency PR
Given an allow-listed PR where real Telegraph evidence yields a material known vulnerability/advisory sufficient under policy, then ChallengeResult is BLOCK and merge execution is denied.

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
