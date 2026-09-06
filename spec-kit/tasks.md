# Skeptara Task Ledger

Status: DERIVED READY — subordinate to living PRD v0.1.

## P0 — Product/source setup

- [x] P0.1 Create public repository.
- [x] P0.2 Replace placeholder README with operating model.
- [x] P0.3 Create canonical state.
- [x] P0.4 Draft living PRD v0.1.
- [x] P0.5 Derive Spec Kit constitution/spec/plan/tasks/convergence.
- [x] P0.6 Human-lock PRD v0.1.
- [x] P0.7 Reconcile canonical state after PRD lock.
- [x] P0.8 Freeze frontend data contract after T0 evidence review. *(`docs/FRONTEND_DATA_CONTRACT.md`)*
- [ ] P0.9 Send Benita final-product-only brief + PRD PDF + repo/branch details.

## T0 — Real Telegraph challenge

- [x] T0.1–T0.28 Complete real Telegraph/x402 spike, evidence review and durable persistence.
- [x] `SKEPTARA_T0_REAL_TELEGRAPH_CHALLENGE = CLOSED_PASS`.
- [x] Real challenged anchor: `lodash@4.17.20` → `CVE-2020-28500` → `BLOCKING`.

## T1 — Deterministic policy core

- [x] T1.1 ActionSnapshot canonicalization + stable SHA-256 fingerprint.
- [x] T1.2 Deterministic LOW/MEDIUM/HIGH rubric.
- [x] T1.3 Risk → evidence-depth/spend contract.
- [x] T1.4 Deterministic PASS/BLOCK/ESCALATE evaluator.
- [x] T1.5 Fail-closed tests.
- [x] Local policy validation: **10/10 PASS**.

## T2 — Independent auditor

- [x] T2.1 Implement Telegraph adapter from proven T0 path. *(`src/telegraph-client.mjs`)*
- [x] T2.2 Define canonical-facts-only auditor input contract. *(`src/auditor.mjs`)*
- [x] T2.3 Exclude constructor persuasive rationale.
- [x] T2.4 Implement capability-aware evidence-path planner.
- [x] T2.5 Implement bounded per-path/total spend tracking.
- [x] T2.6 Implement evidence normalization including CVE affected-range checks.
- [x] T2.7 Implement replayable ChallengeResult with coverage/spend/evidence/expiry.
- [x] T2.8 Implement asymmetric `BLOCKING` early stop; PASS still needs full coverage.
- [x] T2.9 Add secure live launcher. *(`scripts/t2-from-clipboard.ps1`, `scripts/t2-live-audit.mjs`)*
- [x] T2.10 Initial deterministic auditor tests: **9/9 PASS**.
- [x] T2.11 Full repository initial validation: **19/19 PASS**.
- [x] T2.12 Full repository user-machine validation: **19/19 PASS, 0 fail**.
- [x] T2.13 Bind live clean run to real GitHub PR #1, head `73cf5bdd69163924228e3e21d67fa9f405d99904`.
- [x] T2.14 Real clean dependency PR created: isolated `lodash 4.17.20 -> 4.17.21`; merge not authorized.
- [x] T2.15 Run first live clean MEDIUM audit through hardened launcher.
  - paid calls: 2
  - spend: `20000/20000` atomic USDC
  - runtime-reported coverage: `2/2`
  - runtime-reported outcome: `PASS`
- [x] T2.16 Review live run 001 evidence. **Runtime PASS rejected.**
  - `CVE_LOOKUP` miner explicitly reported that the lookup could not be completed because the request was invalid and lacked a CVE identifier.
  - v0.1 incorrectly converted `found:false/not_found` into `NONE` before checking path validity.
  - correct fail-closed interpretation: mandatory coverage incomplete → `ESCALATE`.
  - evidence: `evidence/t2/live-clean-run-001/REVIEW.md`.
- [x] T2.17 Implement auditor v0.2 remediation.
  - paid response is not automatically completed coverage;
  - invalid/missing required input → `EVIDENCE_PATH_INPUT_INVALID`, `critical:true`, `coverage_complete:false`;
  - incomplete paths do not increment coverage;
  - generic dependency planning no longer selects direct `CVE_LOOKUP` without an explicit CVE identifier;
  - dependency preference: `FACT_CHECK`, `WEB_SEARCH`, `NEWS_SEARCH`, `URL_SCAN`.
- [x] T2.18 Add regression tests for invalid paid evidence path and revised planning.
- [ ] T2.19 Pull auditor v0.2 and run full repository `npm test` on user machine. Expected total: **21 tests** (11 auditor + 10 policy) if no other test count changes.
- [ ] T2.20 Run bounded live clean MEDIUM retry 002 against unchanged PR #1 head if it remains exact.
- [ ] T2.21 Review actual retry evidence/coverage/spend/outcome and persist sanitized final record.
- [ ] T2.22 Promote `SKEPTARA_T2_INDEPENDENT_AUDITOR_PASS` only if retry completes meaningful required coverage and the real evidence justifies PASS.

## T3 — Protected merge gate

- [ ] T3.1 define allow-listed demo repo/PR scope.
- [ ] T3.2 server-side GitHub write credential boundary.
- [ ] T3.3 bind PASS to repo + PR + head SHA + fingerprint.
- [ ] T3.4 challenge freshness/expiry.
- [ ] T3.5 implement merge executor.
- [ ] T3.6 changed head => deny.
- [ ] T3.7 expired challenge => deny.
- [ ] T3.8 BLOCK/ESCALATE => deny.
- [ ] T3.9 non-allow-listed target => deny.

## T4 — Real two-case proof

- [x] T4.1 create/select clean dependency PR. *(PR #1)*
- [ ] T4.2 create/select challengeable dependency PR.
- [ ] T4.3 real clean-case proof remains pending because live run 001 PASS was rejected on evidence review.
- [x] T4.4 real Telegraph challenged evidence anchor exists from T0 for `lodash@4.17.20`; dedicated challenged PR still required.
- [ ] T4.5 execute bounded real merge only for fresh PASS case if explicitly authorized.
- [ ] T4.6 prove challenged case cannot merge.
- [ ] T4.7 capture evidence/replay instructions.

## UX / Benita

- [x] UX.1 freeze frontend data contract after T0 evidence review.
- [x] UX.2 create `feat/frontend-benita`.
- [x] UX.2b synchronize `feat/frontend-benita` to `main` before collaborator work.
- [ ] UX.3 send concise locked Skeptara brief + PRD PDF + repo/branch.
- [ ] UX.4 risk-tier presentation.
- [ ] UX.5 live challenge-progress presentation.
- [ ] UX.6 counter-evidence/provenance presentation.
- [ ] UX.7 PASS/BLOCK/ESCALATE presentation.
- [ ] UX.8 deployed frontend smoke.
- [ ] UX.9 TRACE judge-path review.

## Submission / finishing

- [ ] F.1 current rules re-check.
- [ ] F.2 sponsor-native necessity check.
- [ ] F.3 whole-rubric coverage check.
- [ ] F.4 activity/usage evidence.
- [ ] F.5 demo script/video.
- [ ] F.6 README architecture/evidence links.
- [ ] F.7 clean-room replay.
- [ ] F.8 public deployment smoke.
- [ ] F.9 Project Finisher terminal assurance.
- [ ] F.10 human-protected final submission.

## Operating rule

After every passed/failed major gate:
1. persist evidence;
2. update `state/CURRENT.yaml` milestone history + exact next gate;
3. update `state/HANDOVER.yaml`;
4. reconcile PRD/spec/plan/tasks if required.

## Reconciliation record

Live run 001 was valuable precisely because evidence review caught a false-positive PASS in auditor v0.1. The paid CVE path did not perform a valid investigation; therefore it cannot count toward mandatory coverage. This is an `execution_detail` defect, not a product-intent change. Auditor v0.2 now fails closed on incomplete paid evidence paths and avoids generic direct CVE_LOOKUP planning without an explicit CVE identifier.

Exact next gate: `SKEPTARA_T2_V0_2_LOCAL_TEST_AND_LIVE_RETRY_002`.
