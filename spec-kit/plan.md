# Skeptara Implementation Plan

Status: DERIVED READY — PRD v0.1 human-locked; T0 open.

## Phase 0 — Repository and product contract

- Bootstrap repository and README.
- Establish canonical state + handover.
- Draft living PRD.
- Derive Spec Kit constitution/spec/plan/tasks/convergence.
- Lock collaborator boundaries before frontend work.

Gate: `SKEPTARA_PRD_V0_1_HUMAN_LOCK` — **PASS**

## Phase 1 — T0 real Telegraph spike

Goal: prove the sponsor-native dependency before deep build.

1. Discover live relevant Telegraph intents/miners.
2. Configure local/server-only burner wallet secret handling.
3. Execute one genuine paid challenge call.
4. Capture only metadata actually returned/exposed.
5. Normalize a real `EvidenceItem`.
6. Exercise payment/source failure and prove fail-closed behavior.
7. Save evidence under `evidence/t0-real-telegraph/`.

Gate: `SKEPTARA_T0_REAL_TELEGRAPH_CHALLENGE` — **OPEN**

Stop condition: if no viable live Telegraph evidence path can support the hero vertical quickly, classify the discovery. If material, revise PRD before proceeding; do not hide the failure with mocks.

## Phase 2 — Deterministic policy core

1. Implement `ActionSnapshot` canonicalization.
2. Implement risk policy v0.1.
3. Implement challenge contract generation.
4. Implement PASS/BLOCK/ESCALATE gate.
5. Unit-test all fail-closed invariants.

Gate: `SKEPTARA_T1_DETERMINISTIC_POLICY_PASS`

## Phase 3 — Independent auditor

1. Build Telegraph adapter from the proven T0 path.
2. Keep proposer justification out of auditor context.
3. Execute required evidence paths by tier.
4. Track bounded spend and coverage.
5. Normalize findings.
6. Persist replayable challenge result/evidence references.

Gate: `SKEPTARA_T2_INDEPENDENT_AUDITOR_PASS`

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
- problematic/vulnerable or otherwise materially challenged case expected to BLOCK/ESCALATE using real Telegraph evidence.

Evidence must show:
- risk tier;
- challenge depth;
- live Telegraph activity;
- final gate;
- real merge for PASS case if still authorized;
- actual denied merge path for challenged case.

Gate: `SKEPTARA_T4_TWO_CASE_REAL_DEMO_PASS`

## Phase 6 — Collaborator frontend / judge path

Benita scope after contract lock:
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

Reconciled after `SKEPTARA_PRD_V0_1_HUMAN_LOCK` PASS on 2026-09-06. No product-intent expansion introduced.
