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
- [x] T2.10 Add deterministic auditor tests: **9/9 PASS**.
- [x] T2.11 Full repository isolated validation: **19/19 PASS**.
- [x] T2.12 Full repository user-machine validation: **19/19 PASS, 0 fail**.
- [x] T2.13 Bind live clean run to real GitHub PR #1, head `73cf5bdd69163924228e3e21d67fa9f405d99904`.
- [x] T2.14 Real clean dependency PR created: isolated `lodash 4.17.20 -> 4.17.21`; merge not authorized.
- [x] T2.15 Run first live clean MEDIUM audit through hardened launcher.
  - live capabilities discovered
  - coverage `2/2`
  - spend `20000/20000` atomic USDC
  - actual intent `CVE_LOOKUP` → `NONE`, `$0.01`
  - actual intent `FACT_CHECK` → `AMBIGUOUS`, `$0.01`
  - runtime outcome `PASS`
  - runtime reason `REQUIRED_COVERAGE_COMPLETE_NO_BLOCKING_EVIDENCE`
  - runtime directory `evidence/t2-runtime/2026-09-06T22-33-25-514Z`
- [ ] T2.16 Review sanitized `02-audit-result.json`, especially the `FACT_CHECK` `AMBIGUOUS` item and its criticality/materiality.
- [ ] T2.17 Persist final sanitized live T2 challenge record durably under `evidence/t2/`.
- [ ] T2.18 Promote `SKEPTARA_T2_INDEPENDENT_AUDITOR_PASS` only if review confirms the runtime PASS is policy-consistent and no material counter-evidence is hidden by normalization.

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
- [x] T4.3 first real Telegraph clean-case audit runtime completed; final T2 evidence review pending.
- [x] T4.4 real Telegraph challenged evidence anchor exists from T0 for `lodash@4.17.20`; dedicated challenged PR still required.
- [ ] T4.5 execute bounded real merge only for fresh PASS case if explicitly authorized.
- [ ] T4.6 prove challenged case cannot merge.
- [ ] T4.7 capture evidence/replay instructions.

## UX / Benita

- [x] UX.1 freeze frontend data contract after T0 evidence review.
- [x] UX.2 create `feat/frontend-benita`.
- [x] UX.2b synchronize `feat/frontend-benita` to current `main` before collaborator work.
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

The first live T2 clean MEDIUM audit completed full coverage within the exact spend ceiling and returned runtime `PASS`. The actual intents were `CVE_LOOKUP` and `FACT_CHECK`. `CVE_LOOKUP` normalized cleanly to `NONE`; `FACT_CHECK` normalized to `AMBIGUOUS`. Because evidence integrity outranks forcing gate completion, T2 remains open until the sanitized audit result is reviewed and the ambiguous item is confirmed non-material/non-critical under policy.

Exact next gate: `SKEPTARA_T2_LIVE_CLEAN_RUN_001_EVIDENCE_REVIEW`.
