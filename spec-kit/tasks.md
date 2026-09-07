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

### Core + evidence-quality hardening

- [x] Generic auditor + Telegraph adapter + secure launcher.
- [x] v0.1 user-machine suite: **19/19 PASS**.
- [x] Live run 001 reviewed: runtime PASS rejected; invalid CVE path => corrected `ESCALATE`.
- [x] v0.2 remediation: paid response != automatic meaningful coverage.
- [x] v0.2 user-machine suite: **21/21 PASS**.
- [x] Live retry 002 reviewed: runtime PASS rejected; unverified FACT_CHECK + irrelevant NEWS_SEARCH => corrected `0/2`, `ESCALATE`.

### Real demo fixtures

- [x] PR #1 reclassified as challenged candidate: `lodash 4.17.20 -> 4.17.21`, head `73cf5bdd69163924228e3e21d67fa9f405d99904`.
- [x] PR #2 clean candidate: `lodash 4.17.20 -> 4.18.1`, head `d2aa0ea25daf1f84b6cfdd98861d3f05df584b7a`.
- [x] Persist clean/challenged action snapshots.

### Seeded exact-CVE auditor

- [x] v0.3 exact-CVE mode implemented.
- [x] Clean PR #2 seeded with `CVE-2026-4800` and `CVE-2026-2950`.
- [x] v0.3 user-machine full suite: **26/26 PASS, 0 fail**.
- [x] T2.26 Run bounded live PR #2 seeded-CVE audit; spend `20000/20000` atomic USDC.
  - runtime coverage `1/2`;
  - `CVE-2026-4800` => `ADVISORY`, meaningful coverage;
  - `CVE-2026-2950` => runtime `AMBIGUOUS`, `SEEDED_CVE_RECORD_NOT_RETURNED`;
  - runtime outcome `ESCALATE`.
- [x] T2.27 Review live run 003 raw evidence and persist sanitized replay fixture.
  - Telegraph actually returned exact `CVE-2026-2950` with substantive Lodash advisory data;
  - record included `fixed_versions:["4.18.0"]`, description `4.17.23 and earlier`, severity/CVSS/source/reference;
  - runtime ESCALATE traced to v0.3 normalizer assuming miner-specific `found/verdict` fields and ignoring `fixed_versions` as a range boundary;
  - corrected evidence interpretation: **2/2 meaningful non-blocking ADVISORY paths**;
  - evidence: `evidence/t2/live-pr2-seeded-run-003/REVIEW.md`.
- [x] Implement `skeptara-auditor-v0.4-seeded-cve` remediation.
  - substantive exact CVE record may count without miner-specific `found/verdict`;
  - exact CVE id with no substantive fields still fails closed;
  - lowest `fixed_versions` value becomes exclusive affected-range boundary;
  - `X.Y.Z and earlier` parsing added;
  - two regression tests added from live run 003.
- [x] Persist exact sanitized run 003 replay input.
- [x] Add zero-spend deterministic replay command: `npm run t2:replay:003`.
- [ ] T2.28 Pull latest main and run full `npm test` after v0.4. Expected total: **28 tests** if no unrelated count change.
- [ ] T2.29 Run `npm run t2:replay:003` with zero new x402 spend.
  - required replay coverage: `2/2`;
  - required materialities: `[ADVISORY, ADVISORY]`;
  - required outcome: `PASS`.
- [ ] T2.30 Promote `SKEPTARA_T2_INDEPENDENT_AUDITOR_PASS` only after both user-machine gates are green and evidence is persisted.

## T3 — Protected merge gate

- [ ] T3.1 Define allow-listed demo repo/PR scope.
- [ ] T3.2 Keep GitHub write credential server-side.
- [ ] T3.3 Bind PASS to repo + PR + exact head SHA + action fingerprint.
- [ ] T3.4 Enforce freshness/expiry.
- [ ] T3.5 Implement bounded merge executor.
- [ ] T3.6 Changed head => deny.
- [ ] T3.7 Expired challenge => deny.
- [ ] T3.8 BLOCK/ESCALATE => deny.
- [ ] T3.9 Non-allow-listed target => deny.
- [ ] T3.10 Require a **fresh unexpired live challenge** before any real merge; the run 003 replay can close T2 but is not merge authorization.

## T4 — Real two-case proof

- [x] Challenged candidate exists: PR #1 (`4.17.21`).
- [x] Clean candidate exists: PR #2 (`4.18.1`).
- [ ] T4.1 Fresh live PASS execution proof for PR #2 after T3.
- [ ] T4.2 Fresh live BLOCK proof for PR #1 after T3.
- [ ] T4.3 Execute bounded real merge only for fresh PASS case if explicitly authorized.
- [ ] T4.4 Prove challenged case cannot merge.
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

Run 003 proves the live Telegraph records themselves were sufficient: both exact CVEs were returned and both place `lodash@4.18.1` outside the affected range. The runtime `ESCALATE` exposed a normalizer-shape assumption rather than missing evidence. v0.4 fixes that assumption while retaining fail-closed behavior for empty or mismatched records. T2 now needs only local full tests plus deterministic replay of the already-paid run 003 evidence; no additional x402 spend is required for this gate. A fresh challenge remains mandatory later for T3 merge authorization.

Exact next gate: `SKEPTARA_T2_V0_4_LOCAL_TEST_AND_RUN003_REPLAY`.
