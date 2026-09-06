# Skeptara Task Ledger

Status: DERIVED DRAFT — subordinate to living PRD.

## P0 — Product/source setup

- [x] P0.1 Create public repository.
- [x] P0.2 Replace placeholder README with operating model.
- [x] P0.3 Create canonical state.
- [x] P0.4 Draft living PRD v0.1.
- [x] P0.5 Derive Spec Kit constitution/spec/plan.
- [ ] P0.6 Human-lock PRD v0.1.
- [ ] P0.7 Reconcile canonical state after PRD lock.
- [ ] P0.8 Finalize collaborator/frontend contract and send Benita message.

## T0 — Real Telegraph challenge

- [ ] T0.1 Discover live relevant intents/miners.
- [ ] T0.2 Confirm current Telegraph Engine/MCP route.
- [ ] T0.3 Configure burner wallet secret locally/server-side only.
- [ ] T0.4 Execute first real paid Telegraph challenge.
- [ ] T0.5 Capture actual returned miner/intent/cost/provenance fields.
- [ ] T0.6 Normalize one real EvidenceItem.
- [ ] T0.7 Prove payment/source failure => ESCALATE/BLOCK.
- [ ] T0.8 Persist T0 evidence and update CURRENT/HANDOVER.

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

- [ ] UX.1 freeze frontend data contract.
- [ ] UX.2 create Benita branch after contract lock.
- [ ] UX.3 send concise product brief + repo/branch.
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
3. update `state/HANDOVER.yaml` so a new conversation can resume without reconstructing state from chat;
4. reconcile PRD/spec/plan/tasks if the discovery class requires it.
