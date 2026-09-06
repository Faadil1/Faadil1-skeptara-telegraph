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
- [ ] P0.9 Send Benita final-product-only brief with branch/repo details.

## T0 — Real Telegraph challenge

- [x] T0.1 Discover live relevant intents/miners.
- [x] T0.2 Confirm current Telegraph route.
- [x] T0.3 Configure a valid exported burner EVM key locally only.
- [x] T0.4 Execute first successful real paid Telegraph challenge. *(Attempt 008 PASS.)*
- [x] T0.5 Capture returned miner/intent/cost/signal metadata.
- [x] T0.6 Produce and review one normalized real EvidenceItem.
- [x] T0.7 Prove source-unavailable failure => ESCALATE/BLOCK.
- [x] T0.8 Persist Attempts 001–004 and canonical updates.
- [x] T0.9 Reach paid-call stage with valid local EVM key.
- [x] T0.10 Classify Attempt 005 to x402 settlement layer.
- [x] T0.11 Add unsigned x402 quote preflight and decoded `PAYMENT-REQUIRED` evidence.
- [x] T0.12 Enforce exact Base Sepolia + <=100000 atomic USDC safety boundary.
- [x] T0.13 Align paid client construction with Telegraph official MCP.
- [x] T0.14 Decode/persist final `PAYMENT-RESPONSE` settlement result/error reason.
- [x] T0.15 Run retry 006 and classify insufficient balance.
- [x] T0.16 Prove payment blocker was insufficient Base Sepolia USDC balance.
- [x] T0.17 Record burner credential exposure incident and rotate.
- [x] T0.18 Harden Windows launcher with clipboard-only auto-detection.
- [x] T0.19 Create fresh dedicated burner.
- [x] T0.20 Diagnose wrong-chain Arc Testnet faucet funding in Attempt 007.
- [x] T0.21 Fund fresh burner on required Base Sepolia test USDC network.
- [x] T0.22 Run retry 008 with fresh funded burner and hardened launcher.
- [x] T0.23 Obtain genuine x402-paid Telegraph inference success.
- [x] T0.24 Confirm settlement success `true` and retain fail-closed negative path.
- [x] T0.25 Review Attempt 008 paid result/provenance.
- [x] T0.26 Review/normalize materiality: `lodash@4.17.20` is inside the miner-reported and independently NVD-confirmed affected range for `CVE-2020-28500`; challenged-case materiality = `BLOCKING`.
- [x] T0.27 Persist sanitized successful runtime evidence durably in `evidence/t0-real-telegraph/attempt-008/`.
- [x] T0.28 Promote `SKEPTARA_T0_REAL_TELEGRAPH_CHALLENGE` to `CLOSED_PASS`.

## T1 — Deterministic policy core

- [x] T1.1 ActionSnapshot schema/canonicalization. *(`src/policy.mjs`)*
- [x] T1.2 action_fingerprint binding via stable SHA-256 over canonical action facts.
- [x] T1.3 deterministic risk rubric v0.1: LOW/MEDIUM/HIGH with conservative default.
- [x] T1.4 risk → challenge contract mapping with T0-derived Base Sepolia USDC caps: 10000/20000/30000 atomic.
- [x] T1.5 deterministic PASS/BLOCK/ESCALATE evaluator.
- [x] T1.6 test LOW/MEDIUM/HIGH classification.
- [x] T1.7 test incomplete coverage/budget/source failure cannot PASS.
- [x] T1.8 test critical ambiguity and required-if-supported cross-intent semantics.
- [x] T1.9 test material `BLOCKING` counter-evidence always BLOCKS.
- [x] T1.10 test clean MEDIUM completed challenge can PASS.

Test command: `npm test` / `npm run test:policy`.

Local pre-commit-equivalent validation of the exact policy/test code: **10/10 Node tests PASS**.

## T2 — Independent auditor

- [ ] T2.1 Telegraph adapter from T0 proven path.
- [ ] T2.2 independent auditor input contract.
- [ ] T2.3 exclude constructor persuasive rationale.
- [ ] T2.4 evidence-path planner constrained by risk contract.
- [ ] T2.5 bounded spend tracker.
- [ ] T2.6 finding normalization.
- [ ] T2.7 persist challenge record/evidence refs.

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

- [ ] T4.1 create/select clean dependency PR.
- [ ] T4.2 create/select challengeable dependency PR.
- [ ] T4.3 run real Telegraph evidence on clean case.
- [ ] T4.4 run real Telegraph evidence on challenged case.
- [ ] T4.5 execute bounded real merge only for PASS case if authorized.
- [ ] T4.6 prove challenged case cannot merge.
- [ ] T4.7 capture evidence/replay instructions.

## UX / Benita

- [x] UX.1 freeze frontend data contract after T0 evidence review.
- [x] UX.2 create Benita branch after contract lock. *(`feat/frontend-benita`)*
- [ ] UX.3 send concise locked Skeptara product brief + repo/branch.
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

Attempt 008 closed T0 with a genuine Base Sepolia x402 paid Telegraph call routed to `CVE_LOOKUP` / miner `20260828`, settlement success, cost `$0.01`, signal hash, and real vulnerability evidence for `lodash@4.17.20`. Evidence review confirmed direct hero-vertical relevance and normalized the challenged-case finding to `BLOCKING`. T0 is `CLOSED_PASS`.

T1 deterministic policy is implemented and locally validated 10/10: stable action fingerprinting, deterministic LOW/MEDIUM/HIGH risk, T0-derived spend caps, and fail-closed PASS/BLOCK/ESCALATE semantics. Frontend contract is frozen and `feat/frontend-benita` has been created. Exact next gate: `SKEPTARA_T2_INDEPENDENT_AUDITOR_PASS`.
