# Skeptara Task Ledger

Status: DERIVED READY — subordinate to living PRD v0.1.

## P0 — Product/source setup

- [x] P0.1 Create public repository.
- [x] P0.2 Replace placeholder README with operating model.
- [x] P0.3 Create canonical state.
- [x] P0.4 Draft living PRD v0.1.
- [x] P0.5 Derive Spec Kit constitution/spec/plan.
- [x] P0.6 Human-lock PRD v0.1.
- [x] P0.7 Reconcile canonical state after PRD lock.
- [ ] P0.8 Finalize collaborator/frontend contract and send Benita message.

## T0 — Real Telegraph challenge

- [x] T0.1 Discover live relevant intents/miners.
- [x] T0.2 Confirm current Telegraph route.
- [x] T0.3 Configure a valid exported burner EVM key locally only.
- [ ] T0.4 Execute first successful real paid Telegraph challenge.
- [ ] T0.5 Capture actual returned miner/intent/cost/provenance/signal fields.
- [ ] T0.6 Normalize one real EvidenceItem.
- [x] T0.7 Prove source-unavailable failure => ESCALATE/BLOCK.
- [x] T0.8 Persist Attempts 001–004 and canonical updates.
- [x] T0.9 Reach paid-call stage with valid local EVM key. *(Attempt 005.)*
- [x] T0.10 Classify Attempt 005 to x402 settlement layer.
- [x] T0.11 Add unsigned x402 quote preflight and decoded `PAYMENT-REQUIRED` evidence.
- [x] T0.12 Enforce exact Base Sepolia + <=100000 atomic USDC safety boundary.
- [x] T0.13 Align paid client construction with Telegraph official MCP.
- [x] T0.14 Decode/persist final `PAYMENT-RESPONSE` settlement result/error reason.
- [x] T0.15 Run retry 006 and classify decoded result: `10000` atomic USDC on `eip155:84532`; settlement `invalid_exact_evm_insufficient_balance`.
- [x] T0.16 Prove the payment blocker is insufficient Base Sepolia USDC balance, not route/key-format/product failure.
- [x] T0.17 Record burner credential exposure incident and require rotation.
- [x] T0.18 Harden Windows launcher so no terminal input is requested; valid clipboard key is auto-detected and clipboard is cleared.
- [x] T0.19 Create a fresh dedicated burner EVM account/wallet with a new private key.
- [ ] T0.20 Fund the fresh PUBLIC address with Base Sepolia test USDC. *(Attempt 007 funded 20 test USDC on Arc Testnet instead; wrong chain.)*
- [x] T0.21 Run retry 007 with hardened clipboard-only launcher and fresh burner. *(Fail-closed: Arc Testnet funding did not satisfy Base Sepolia balance.)*
- [x] T0.22 Classify Attempt 007 root cause as wrong-testnet faucet selection: Arc Testnet vs required Base Sepolia.
- [ ] T0.23 Fund the same fresh burner PUBLIC address with Circle faucet `USDC` on `Base Sepolia` explicitly.
- [ ] T0.24 Run retry 008 with same fresh burner through hardened clipboard-only launcher.
- [ ] T0.25 Obtain one successful genuine x402-paid Telegraph inference.
- [ ] T0.26 Persist successful T0 evidence + normalized EvidenceItem + CURRENT/HANDOVER update.

## T1 — Deterministic policy core

- [ ] T1.1 ActionSnapshot schema/canonicalization.
- [ ] T1.2 action_fingerprint binding.
- [ ] T1.3 deterministic risk rubric v0.1.
- [ ] T1.4 risk → challenge contract mapping.
- [ ] T1.5 deterministic PASS/BLOCK/ESCALATE evaluator.
- [ ] T1.6 test LOW/MEDIUM/HIGH classification.
- [ ] T1.7 test incomplete coverage cannot PASS.
- [ ] T1.8 test critical ambiguity cannot PASS where policy requires escalation.

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

- [ ] UX.1 freeze frontend data contract after T0 real metadata discovery.
- [ ] UX.2 create Benita branch after contract lock.
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

Attempt 007 used a fresh burner and the hardened clipboard-only launcher correctly. Circle faucet funding succeeded for 20 test USDC, but the transaction was on Arc Testnet. Telegraph's live x402 quote requires `10000` atomic USDC (`0.01 USDC`) on Base Sepolia (`eip155:84532`), so settlement correctly remained `invalid_exact_evm_insufficient_balance`. No product change is required. Exact next gate: `SKEPTARA_T0_FUND_FRESH_BURNER_BASE_SEPOLIA_AND_RETRY_008`.
