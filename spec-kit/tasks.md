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

- [x] Generic auditor + Telegraph adapter + secure launcher.
- [x] Evidence-quality hardening through v0.4 semantic exact-CVE normalization.
- [x] User-machine v0.4 suite: **29/29 PASS, 0 fail**.
- [x] Zero-spend run003 replay: **2/2**, `[ADVISORY, ADVISORY]`, **PASS**.
- [x] Closure evidence persisted.
- [x] `SKEPTARA_T2_INDEPENDENT_AUDITOR_PASS = CLOSED_PASS`.

## T3 — Protected merge gate

- [x] Allow-list contract.
- [x] Server-side injected merge adapter boundary.
- [x] Exact repository + PR + head SHA + action fingerprint binding.
- [x] Freshness/expiry enforcement.
- [x] BLOCK/ESCALATE deny.
- [x] Changed head deny.
- [x] Explicit human bounded authorization required.
- [x] Denied authorization never invokes merge adapter.
- [x] Authorized executor forwards exact `expected_head_sha`.
- [x] Full repository suite: **41/41 PASS, 0 fail**.
- [x] Focused merge-gate suite: **12/12 PASS, 0 fail**.
- [x] `SKEPTARA_T3_FAIL_CLOSED_MERGE_GATE_PASS = CLOSED_PASS`.

## T4 — Real two-case proof

- [x] Challenged candidate exists: PR #1 (`lodash@4.17.21`).
- [x] Clean candidate exists: PR #2 (`lodash@4.18.1`).
- [x] T4.1 Execute fresh live challenged PR #1 run with real Telegraph/x402.
  - runtime directory: `evidence/t2-runtime/2026-09-07T01-11-00-634Z`;
  - risk `MEDIUM`;
  - spend `20000/20000` atomic USDC;
  - first path `CVE-2026-4800` => `AMBIGUOUS`, range not machine-verifiable;
  - second path `CVE-2026-2950` => `BLOCKING`;
  - final runtime outcome `BLOCK`, reason `MATERIAL_COUNTER_EVIDENCE_FOUND`.
- [x] T4.2 Review challenged run 004 sanitized JSON and persist exact binding/evidence.
  - challenge `113cc2c4-94ff-4c47-bf48-66fabc7c9329` is bound to PR #1 exact head `73cf5bdd69163924228e3e21d67fa9f405d99904` and action fingerprint `sha256:0260dfd07c6e070bb92c341472834052e72923528d9b53c5c72ed333d9a95867`;
  - spend stays within MEDIUM cap `20000` atomic USDC;
  - `CVE-2026-2950` says Lodash `4.17.23 and earlier` affected, fixed `4.18.0`; target `4.17.21` therefore normalizes `BLOCKING`;
  - settlement succeeded on `eip155:84532`;
  - review: `evidence/t4/pr1-block-run-004/REVIEW.md`;
  - fixture: `evidence/t4/pr1-block-run-004/reviewed-challenge.sanitized.json`.
- [ ] T4.3 Run zero-write `npm run t4:replay:block`.
  - allow-list satisfied;
  - humanAuthorization deliberately true to isolate challenge outcome;
  - replay time inside original freshness window;
  - expected authorization `DENIED` with `CHALLENGE_NOT_PASS`;
  - expected merge-adapter calls `0`;
  - expected execution `executed=false`, `merged=false`;
  - no private key, no Telegraph spend, no GitHub write.
- [ ] T4.4 Obtain fresh live PASS for clean PR #2 using `demo/actions/clean-pr.json`.
  - require exact current head;
  - require 2/2 meaningful non-blocking coverage;
  - max spend `20000` atomic USDC.
- [ ] T4.5 Immediately revalidate PR #2 live state/head while PASS is fresh.
- [ ] T4.6 Ask human for explicit bounded authorization to merge exactly PR #2 at the challenged head.
- [ ] T4.7 If authorized, execute real merge with exact `expected_head_sha`; otherwise preserve PASS evidence without merge.
- [ ] T4.8 Capture durable two-case replay/demo evidence.
- [ ] `SKEPTARA_T4_TWO_CASE_REAL_DEMO_PASS`.

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

T0–T3 are closed. T4 challenged PR #1 now has reviewed real Telegraph BLOCK evidence: the second exact CVE path establishes that target `lodash@4.17.21` lies inside an affected range ending before the `4.18.0` fix. The first path remained ambiguous and safely forced continuation; full MEDIUM spend remained within cap.

The next step is not another paid call. It is a deterministic zero-write replay of the captured BLOCK through the already-closed T3 gate, with allow-list and human authorization satisfied and replay time inside the original freshness window. This isolates `CHALLENGE_NOT_PASS` and must prove the merge adapter is called zero times. Only then does T4 move to PR #2 fresh PASS.

Exact next gate: `SKEPTARA_T4_PR1_ZERO_WRITE_MERGE_DENIAL_REPLAY`.
