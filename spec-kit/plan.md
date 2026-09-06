# Skeptara Implementation Plan

Status: DERIVED READY — PRD v0.1 human-locked; T0 and T1 passed; T2 active next.

## Phase 0 — Repository and product contract

- Bootstrap repository and README.
- Establish canonical state + handover.
- Draft living PRD.
- Derive Spec Kit constitution/spec/plan/tasks/convergence.
- Lock collaborator boundaries before frontend work.

Gate: `SKEPTARA_PRD_V0_1_HUMAN_LOCK` — **PASS**

## Phase 1 — T0 real Telegraph spike

Goal: prove the sponsor-native dependency before deep build.

Completed proof:
1. Live relevant Telegraph intents/miners discovered.
2. Local/server-only burner wallet secret handling proven and hardened.
3. Genuine paid challenge call succeeded on Base Sepolia x402.
4. Real returned miner/intent/cost/settlement/signal metadata captured.
5. Real `EvidenceItem` normalized and reviewed.
6. Payment/source failures proved fail-closed.
7. Durable sanitized evidence saved under `evidence/t0-real-telegraph/attempt-008/`.

Gate: `SKEPTARA_T0_REAL_TELEGRAPH_CHALLENGE` — **CLOSED_PASS**

Key proven path: target `lodash@4.17.20` → `CVE_LOOKUP` → miner `20260828` → `CVE-2020-28500` affecting `<4.17.21` → challenged-case `BLOCKING` evidence.

## Phase 2 — Deterministic policy core

Completed:
1. `ActionSnapshot` canonicalization.
2. Stable SHA-256 action fingerprint over canonical action facts.
3. Risk policy v0.1.
4. Risk → challenge contract mapping.
5. PASS/BLOCK/ESCALATE evaluator.
6. Fail-closed tests for coverage, budget/source failure, blocking evidence, critical ambiguity and cross-intent semantics.
7. T0-derived MVP caps: LOW `10000`, MEDIUM `20000`, HIGH `30000` atomic USDC on Base Sepolia.

Gate: `SKEPTARA_T1_DETERMINISTIC_POLICY_PASS` — **PASS**

Implementation: `src/policy.mjs`  
Tests: `tests/policy.test.mjs`  
Validation: **10/10 PASS**.

## Phase 3 — Independent auditor

Next exact work:
1. Build Telegraph adapter from the proven T0 path.
2. Keep proposer justification out of auditor context.
3. Execute required evidence paths by tier.
4. Track bounded spend and coverage.
5. Normalize findings.
6. Persist replayable challenge result/evidence references.

Gate: `SKEPTARA_T2_INDEPENDENT_AUDITOR_PASS` — **OPEN_NEXT**

## Phase 4 — Protected merge enforcement

1. Create explicit repo/PR allow-list.
2. Bind challenge result to repo + PR + head SHA/action fingerprint.
3. Enforce freshness/expiry.
4. Implement merge executor with server-side GitHub credential only.
5. Prove changed-head, expired, BLOCK, ESCALATE, and non-allow-listed paths cannot merge.

Gate: `SKEPTARA_T3_FAIL_CLOSED_MERGE_GATE_PASS`

## Phase 5 — Two-case proof

Prepare two controlled real PRs:
- clean dependency-change case expected to PASS;
- problematic/vulnerable case expected to BLOCK/ESCALATE using real Telegraph evidence.

Evidence must show:
- risk tier;
- challenge depth;
- live Telegraph activity;
- final gate;
- real merge for PASS case if still authorized;
- actual denied merge path for challenged case.

Gate: `SKEPTARA_T4_TWO_CASE_REAL_DEMO_PASS`

## Phase 6 — Collaborator frontend / judge path

Frontend data contract is now frozen at `docs/FRONTEND_DATA_CONTRACT.md` after T0 evidence review.

Benita scope:
- frontend/UX implementation;
- visual identity and product presentation;
- challenge progress and evidence legibility;
- PASS/BLOCK/ESCALATE state presentation;
- screenshots/demo narrative support.

Excluded from collaborator client scope:
- wallet/private keys;
- GitHub protected write token;
- Telegraph secret configuration;
- altering risk/gate semantics without product-source reconciliation.

Trigger TRACE once a functioning frontend path exists.

Gate: `SKEPTARA_TRACE_JUDGE_PATH_REVIEW`

## Phase 7 — Winner intelligence + Project Finisher

- Re-check rules/submission requirements.
- Whole-rubric coverage.
- Sponsor-native necessity.
- Judge 10-second legibility.
- README/architecture/evidence completeness.
- Demo replay on clean environment.
- Public deployment smoke.
- X/public activity proof as required.
- Project Finisher terminal assurance.

Gate: `SKEPTARA_BUILD_CANDIDATE_READY`

## Phase 8 — Protected final submission

Final submission remains human-protected. No automated submission without explicit authorization.

## Change-control rule

Any implementation discovery is classified before changes propagate:
- execution_detail → derived artifacts/code;
- product_clarification → living PRD clarification then reconcile;
- material_product_change → human approval + PRD revision first;
- post_build_evolution → backlog unless needed for hackathon viability.

## Reconciliation record

Reconciled after T0 Attempt 008 evidence review and T1 deterministic policy implementation on 2026-09-06. Both discoveries/implementation values remain `execution_detail`; approved PRD v0.1 product intent is unchanged. Exact next gate: `SKEPTARA_T2_INDEPENDENT_AUDITOR_PASS`.
