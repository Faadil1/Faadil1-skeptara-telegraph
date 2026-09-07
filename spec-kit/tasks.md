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

### Core + first remediation

- [x] Implement generic auditor + Telegraph adapter + secure launcher.
- [x] Implement bounded spend/coverage tracking and fail-closed negative paths.
- [x] Full user-machine suite v0.1: **19/19 PASS**.
- [x] Live run 001 against PR #1.
- [x] Reject runtime PASS after review: paid CVE path was invalid and could not count as coverage.
- [x] Implement auditor v0.2: paid response != automatic coverage; invalid path is incomplete/critical.
- [x] Full user-machine suite v0.2: **21/21 PASS, 0 fail**.

### Retry 002 evidence review

- [x] Run live retry 002 against PR #1 at head `73cf5bdd69163924228e3e21d67fa9f405d99904`.
  - spend `20000/20000` atomic USDC;
  - actual intents `FACT_CHECK`, `NEWS_SEARCH`;
  - runtime reported `PASS`.
- [x] Review retry 002 and **reject runtime PASS**.
  - FACT_CHECK returned `unverified`, confidence `0.2`, `evidence:null`;
  - requested WEB_SEARCH routed to NEWS_SEARCH and returned articles unrelated to Lodash/package security;
  - corrected meaningful coverage `0/2`;
  - corrected fail-closed outcome `ESCALATE`;
  - evidence: `evidence/t2/live-clean-retry-002/REVIEW.md`.

### Demo-fixture correction

- [x] Reclassify PR #1 (`lodash 4.17.20 -> 4.17.21`) as challenged candidate; preserve original head/history.
- [x] Create clean PR #2: `lodash 4.17.20 -> 4.18.1` on `demo/clean-lodash-4.18.1`.
- [x] Rebase controlled PR #2 branch onto current `main` before live evidence and bind clean action file to exact head `d2aa0ea25daf1f84b6cfdd98861d3f05df584b7a`.
- [x] Persist `demo/actions/challenged-pr.json` for PR #1.

### Auditor v0.3 seeded exact-CVE mode

- [x] Add `src/seeded-cve-auditor.mjs`.
- [x] Seed clean PR #2 with exact advisory IDs `CVE-2026-4800` and `CVE-2026-2950`.
- [x] Require exact `CVE_LOOKUP` return, exact CVE ID match, found record, and machine-checkable affected-version range before coverage counts.
- [x] Target inside returned affected range => BLOCKING; target outside range => ADVISORY.
- [x] Add deterministic seeded-CVE tests including clean PASS, challenged BLOCK, and wrong-route ESCALATE.
- [x] Update live runner to select seeded-CVE mode when action file contains `evidence_seeds.cve_ids`.
- [x] T2.24 Full user-machine `npm test` after v0.3 addition: **26/26 PASS, 0 fail**. *(`evidence/t2/LOCAL-USER-VALIDATION-V0.3-26-OF-26.md`)*
- [x] T2.25 Re-verify PR #2 after local tests: open, unmerged, mergeable, exact head `d2aa0ea25daf1f84b6cfdd98861d3f05df584b7a`.
- [ ] T2.26 Run one bounded live PR #2 MEDIUM seeded-CVE audit through hardened launcher; max `20000` atomic USDC.
- [ ] T2.27 Review exact returned CVE records/ranges/spend/outcome and persist sanitized evidence.
- [ ] T2.28 Promote `SKEPTARA_T2_INDEPENDENT_AUDITOR_PASS` only if the reviewed live evidence truly satisfies the gate.

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

## T4 — Real two-case proof

- [x] Challenged candidate exists: PR #1 (`4.17.21`).
- [x] Clean candidate exists: PR #2 (`4.18.1`).
- [ ] T4.1 Obtain reviewed live PASS evidence for PR #2.
- [ ] T4.2 Obtain reviewed live BLOCK evidence for PR #1 using controlled seeded CVE path.
- [ ] T4.3 Execute bounded real merge only for fresh PASS case if explicitly authorized.
- [ ] T4.4 Prove challenged case cannot merge.
- [ ] T4.5 Capture replay/demo evidence.

## UX / Benita

- [x] Frontend data contract frozen.
- [x] `feat/frontend-benita` created and synchronized to current main while it still had no unique remote commits.
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

Retry 002 was another useful fail-closed discovery: paid responses can still be evidentially empty or irrelevant even when the transport succeeds. PR #1 is no longer treated as clean. The clean fixture is PR #2 at Lodash `4.18.1`; v0.3 now uses exact external CVE identifiers to demand concrete, machine-checkable Telegraph records. The full v0.3 suite is now green **26/26** on the user's machine and PR #2 has been reverified unchanged. Product intent remains unchanged; this is execution/demo-fixture remediation.

Exact next gate: `SKEPTARA_T2_V0_3_PR2_LIVE_SEEDED_CVE_AUDIT`.
