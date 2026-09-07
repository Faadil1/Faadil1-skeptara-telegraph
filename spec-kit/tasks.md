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

- [x] Challenged candidate PR #1: `lodash@4.17.21`.
- [x] Clean candidate PR #2: `lodash@4.18.1`.
- [x] Fresh real PR #1 Telegraph challenge => `BLOCK`.
- [x] `CVE-2026-2950` machine-verifiable as blocking for PR #1.
- [x] Zero-write merge replay => `DENIED`, `CHALLENGE_NOT_PASS`, merge-adapter calls `0`.
- [x] Reconcile clean PR #2 branch with current main without force.
- [x] Fresh real PR #2 Telegraph challenge => `PASS`, 2/2 meaningful non-blocking coverage, 20000/20000 atomic USDC.
- [x] Review and persist fresh PR #2 result.
- [x] Revalidate PR #2 live while challenge fresh: open, unmerged, exact-head match, mergeable clean.
- [x] Obtain explicit human bounded authorization for PR #2 exact head `528d730f9ebdcb433e01ba9c79dcc9a5f66ce1c7`.
- [x] Execute real GitHub merge with exact `expected_head_sha`.
  - merge commit `c76c76e0c02dab28275d8e53d70da3f6f132e648`.
  - merged at `2026-09-07T01:44:54Z`.
- [x] Persist real merge execution evidence.
- [x] `SKEPTARA_T4_TWO_CASE_REAL_DEMO_PASS = CLOSED_PASS`.

## Winning Intelligence preflight

- [x] Apply judge-winning / Winning Intelligence layer after T4 and before TRACE.
- [x] Persist `evidence/winning-intelligence/WI-TRACE-PREFLIGHT-001.md`.
- [x] Run bounded collision scan.
  - material collision pattern: generic `verified intelligence -> governed action` / confidence gating / x402 budget / auditability;
  - response: do **not** lead with generic governance, confidence gating, x402, or auditability.
- [x] Freeze winning distinction:
  - external downside scoring;
  - risk -> evidence depth + spend;
  - paid counter-evidence rather than confirmation;
  - asymmetric BLOCK + fail-closed ESCALATE;
  - exact repo/PR/head/fingerprint/freshness binding;
  - real PR1 BLOCK/deny vs PR2 PASS/merge proof.
- [x] Lock judge memory sentence and hero direction.
- [x] Identify priority weaknesses: users/activity, public runnable judge path, stale README, engagement/showcase.
- [x] `WINNING_INTELLIGENCE_PREFLIGHT = PASS_WITH_PRIORITY_RISKS`.

## TRACE / judge path

- [ ] Read Winning Intelligence packet before any visual changes.
- [ ] Make the split real outcome the primary judge moment:
  - PR #1 `BLOCK` + merge denied + 0 merge-adapter calls;
  - PR #2 `PASS` + exact-head revalidation + human-authorized real merge.
- [ ] Ensure 5-second comprehension: what is prevented, what is unique, why Telegraph is necessary, what was proven.
- [ ] Present proposed PR → external risk → required scrutiny → challenge progress → evidence → PASS/BLOCK/ESCALATE → execution consequence.
- [ ] Treat UI as challenge dossier, not generic SaaS analytics dashboard.
- [ ] Keep proof labels readable and limitations near evidence.
- [ ] Do not invent confidence fields, users, adoption, provenance, or independence claims.
- [ ] Human visual review.
- [ ] Persist TRACE findings and update CURRENT + HANDOVER.
- [ ] `SKEPTARA_TRACE_JUDGE_PATH_REVIEW = PASS`.

## UX / Benita

- [x] Frontend data contract frozen.
- [x] `feat/frontend-benita` created and synchronized while it had no unique remote commits.
- [ ] Send brief + PRD PDF if not already sent.
- [ ] Risk-tier presentation.
- [ ] Live challenge-progress presentation.
- [ ] Evidence/provenance presentation.
- [ ] PASS/BLOCK/ESCALATE states.
- [ ] Deployed frontend smoke.

## README / showcase / submission

- [ ] Replace stale early-T0 README framing only after TRACE judge-path lock.
- [ ] Put one-line promise + real two-case proof near top of README.
- [ ] Map every strong claim to real evidence paths.
- [ ] Prepare hero screenshot showing result + evidence state.
- [ ] Public demo smoke.
- [ ] Truthful users/activity/usage evidence; never fabricate counters.
- [ ] X update tagged for Telegraph judging with direct proof/demo links.
- [ ] Discord/community showcase.
- [ ] Re-check current rules/rubric.
- [ ] Sponsor-native necessity and real-miner proof review.
- [ ] Demo script/video.
- [ ] Clean-room replay.
- [ ] Project Finisher terminal assurance.
- [ ] Human-protected final submission.

## Operating rule

After every passed/failed major gate and every protected execution boundary:
1. persist evidence;
2. update `state/CURRENT.yaml` + exact next gate;
3. update `state/HANDOVER.yaml` so a new conversation can take the lead;
4. reconcile PRD/spec/plan/tasks only if discovery class requires it.

Exact next gate: `SKEPTARA_TRACE_JUDGE_PATH_REVIEW`.
