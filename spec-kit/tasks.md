# Skeptara Task Ledger

Status: DERIVED READY — subordinate to living PRD v0.1.

## P0 — Product/source setup

- [x] P0.1 Create public repository.
- [x] P0.2 Establish canonical state + living PRD + Spec Kit derivation.
- [x] P0.3 Human-lock PRD v0.1.
- [x] P0.4 Freeze frontend data contract.
- [x] P0.5 Create `feat/frontend-benita`.
- [ ] P0.6 Send Benita final-product-only brief + PRD PDF + repo/branch details.

## T0 — Real Telegraph challenge

- [x] Real x402/Telegraph path proven on Base Sepolia.
- [x] Real challenged anchor: `lodash@4.17.20` → `CVE-2020-28500` → `BLOCKING`.
- [x] `SKEPTARA_T0_REAL_TELEGRAPH_CHALLENGE = CLOSED_PASS`.

## T1 — Deterministic policy core

- [x] ActionSnapshot canonicalization + SHA-256 fingerprint.
- [x] LOW/MEDIUM/HIGH deterministic rubric.
- [x] Risk → required evidence depth/spend caps.
- [x] PASS/BLOCK/ESCALATE deterministic evaluator.
- [x] Policy tests green.

## T2 — Independent auditor

### Evidence-quality hardening

- [x] Generic auditor + Telegraph adapter + secure launcher.
- [x] v0.1 user-machine suite: **19/19 PASS**.
- [x] Live run 001 reviewed: runtime PASS rejected; invalid CVE path => corrected `ESCALATE`.
- [x] v0.2 remediation: paid response != automatic meaningful coverage.
- [x] v0.2 user-machine suite: **21/21 PASS**.
- [x] Live retry 002 reviewed: runtime PASS rejected; unverified FACT_CHECK + irrelevant NEWS_SEARCH => corrected `0/2`, `ESCALATE`.

### Real demo fixtures

- [x] PR #1 challenged candidate: `lodash 4.17.20 -> 4.17.21`, head `73cf5bdd69163924228e3e21d67fa9f405d99904`.
- [x] PR #2 clean candidate: `lodash 4.17.20 -> 4.18.1`, head `d2aa0ea25daf1f84b6cfdd98861d3f05df584b7a`.
- [x] Persist clean/challenged action snapshots.

### Seeded exact-CVE auditor

- [x] v0.3 exact-CVE mode implemented.
- [x] Clean PR #2 seeded with `CVE-2026-4800` and `CVE-2026-2950`.
- [x] v0.3 user-machine full suite: **26/26 PASS, 0 fail**.
- [x] Run live PR #2 seeded-CVE audit; spend `20000/20000` atomic USDC.
- [x] Review run 003 raw evidence and persist sanitized replay fixture.
  - `CVE-2026-4800` => concrete non-blocking `ADVISORY`;
  - `CVE-2026-2950` => concrete exact CVE record with `fixed_versions:["4.18.0"]` but miner shape omitted `found/verdict`;
  - v0.3 runtime ESCALATE traced to normalizer-shape assumption;
  - corrected semantic evidence: **2/2 meaningful non-blocking ADVISORY paths**.
- [x] Implement `skeptara-auditor-v0.4-seeded-cve`.
  - substantive exact CVE may count without miner-specific `found/verdict`;
  - exact id with no substantive advisory fields still fails closed;
  - `fixed_versions` used as exclusive affected-range boundary;
  - `X.Y.Z and earlier` parsing supported.
- [x] Persist exact sanitized run 003 replay input.
- [x] Add zero-spend deterministic replay command: `npm run t2:replay:003`.
- [x] T2.28 Full user-machine `npm test` after v0.4: **29/29 PASS, 0 fail**.
- [x] T2.29 Zero-spend `npm run t2:replay:003`: **2/2**, `[ADVISORY, ADVISORY]`, **PASS**.
- [x] T2.30 Persist closure evidence: `evidence/t2/LOCAL-USER-VALIDATION-V0.4-29-OF-29-AND-RUN003-REPLAY-PASS.md`.
- [x] `SKEPTARA_T2_INDEPENDENT_AUDITOR_PASS = CLOSED_PASS`.

## T3 — Protected merge gate

### Implementation

- [x] T3.1 Define explicit repository + PR allow-list contract.
- [x] T3.2 Keep GitHub write credential outside domain objects; executor accepts only injected server-side adapter.
- [x] T3.3 Bind authorization to repository + PR + exact head SHA + action fingerprint.
- [x] T3.4 Enforce challenge `completed_at` / `expires_at` freshness.
- [x] T3.5 Implement bounded `executeProtectedMerge` adapter boundary.
- [x] T3.6 Changed live PR head => deny.
- [x] T3.7 Expired/malformed freshness => deny.
- [x] T3.8 BLOCK/ESCALATE => deny.
- [x] T3.9 Non-allow-listed target => deny.
- [x] T3.10 Explicit human bounded authorization required even after fresh PASS.
- [x] T3.11 Denied authorization never calls merge adapter; authorized adapter receives exact `expected_head_sha`.
- [x] T3 contract: `docs/T3_MERGE_GATE_CONTRACT.md`.
- [x] T3 implementation: `src/merge-gate.mjs`.
- [x] T3 deterministic tests: `tests/merge-gate.test.mjs`.

### Validation remaining

- [ ] T3.12 Pull latest main and run full repository `npm test`; expected total **41 tests** if no unrelated count change.
- [ ] T3.13 Run focused `npm run test:merge-gate`.
- [ ] T3.14 Promote `SKEPTARA_T3_FAIL_CLOSED_MERGE_GATE_PASS` only after user-machine tests are green.
- [x] T3.15 No real merge during T3 local validation.

## T4 — Real two-case proof

- [x] Challenged candidate exists: PR #1 (`4.17.21`).
- [x] Clean candidate exists: PR #2 (`4.18.1`).
- [ ] T4.1 Obtain a **fresh live PASS** for PR #2 after T3 closes.
- [ ] T4.2 Obtain a **fresh live BLOCK** for PR #1 after T3 closes.
- [ ] T4.3 Execute bounded real merge for PR #2 only after explicit human authorization and exact-head revalidation.
- [ ] T4.4 Prove challenged PR #1 cannot merge through Skeptara gate.
- [ ] T4.5 Capture replay/demo evidence.

## UX / Benita

- [x] Frontend data contract frozen.
- [x] `feat/frontend-benita` created and synchronized while it had no unique remote commits.
- [ ] Send brief + PRD PDF if not already sent.
- [ ] Risk-tier presentation.
- [ ] Live challenge-progress presentation.
- [ ] Evidence/provenance presentation.
- [ ] PASS/BLOCK/ESCALATE states.
- [ ] Deployed frontend smoke.
- [ ] TRACE judge-path review.

## Submission / finishing

- [ ] Re-check current rules/rubric.
- [ ] Sponsor-native necessity and real-miner proof review.
- [ ] Activity/usage evidence.
- [ ] Demo script/video.
- [ ] README architecture/evidence links.
- [ ] Clean-room replay.
- [ ] Public deployment smoke.
- [ ] Project Finisher terminal assurance.
- [ ] Human-protected final submission.

## Operating rule

After every passed/failed major gate:
1. persist evidence;
2. update `state/CURRENT.yaml` + exact next gate;
3. update `state/HANDOVER.yaml`;
4. reconcile PRD/spec/plan/tasks only if discovery class requires it.

## Reconciliation record

T2 is closed on reviewed real Telegraph evidence plus a deterministic zero-spend replay under v0.4: user-machine suite **29/29**, run 003 replay **2/2**, two non-blocking ADVISORY items, outcome PASS. The replay closes the auditor gate but is explicitly not merge authorization.

T3 v0.1 is now implemented as a pure fail-closed authorization layer plus injected server-side merge adapter. It requires allow-listing, explicit human bounded authorization, fresh PASS, exact repository/PR/head/fingerprint binding and immediate live PR consistency. The next gate is local validation only; no real GitHub merge is authorized yet.

Exact next gate: `SKEPTARA_T3_V0_1_LOCAL_VALIDATION`.
