# Skeptara T3 Protected Merge Gate Contract

Status: **CLOSED PASS v0.1 — real execution deferred to T4**  
Date: 2026-09-07

## Purpose

T3 converts a reviewed Skeptara `ChallengeResult` into a bounded execution authorization. It is deliberately separate from T2: the auditor decides whether the action survived counter-evidence; T3 decides whether that exact, still-current action is allowed to execute now.

## Inputs

The gate consumes only:

- canonical `ActionSnapshot`;
- reviewed `ChallengeResult`;
- live GitHub PR facts fetched immediately before execution;
- explicit allow-list entries;
- explicit human bounded authorization;
- trusted current time.

It does not accept proposer persuasion and it does not accept browser-held GitHub write credentials.

## Required conditions for authorization

All conditions must be true:

1. target repository + PR are allow-listed;
2. a human has explicitly authorized this bounded external action;
3. challenge outcome is exactly `PASS`;
4. challenge repository matches the action snapshot;
5. challenge PR number matches the action snapshot;
6. challenge head SHA matches the action snapshot;
7. challenge action fingerprint matches the action snapshot;
8. challenge has a valid completion timestamp;
9. challenge has a valid future `expires_at` and is not expired;
10. live PR is still open and unmerged;
11. live PR number/repository still match;
12. live PR head SHA still equals the challenged head;
13. live base branch still matches when supplied.

Any failed condition => **DENY**.

## Freshness boundary

Historical/replayed evidence may close T2 but cannot authorize execution.

T3 requires the `ChallengeResult` used for execution to be fresh and unexpired at authorization time. If the challenge expires before the merge call, authorization must be recomputed from a new fresh challenge.

## Head binding

The merge executor passes the exact challenged head SHA to the server-side GitHub adapter as `expected_head_sha`.

This provides two independent protections:

- Skeptara denies if its immediately fetched live PR head differs from the challenged head;
- GitHub itself must reject the merge if the head changes between authorization and execution.

## Human authorization boundary

A fresh PASS is necessary but not sufficient for the hackathon demo. The real merge remains a protected external action and requires explicit bounded human authorization.

This prevents tests, replays, frontend actions, or stale automation from silently converting a valid challenge into an irreversible repository write.

## Credential boundary

`src/merge-gate.mjs` accepts an injected `mergeAdapter` only at the execution boundary. It accepts no token/private credential fields.

The protected GitHub write credential therefore remains server-side / connector-side and outside:

- browser/frontend;
- `ActionSnapshot`;
- `ChallengeResult`;
- persisted public evidence;
- collaborator frontend branch.

## Fail-closed denial reasons

Current reason codes include:

- `TARGET_NOT_ALLOWLISTED`
- `HUMAN_AUTHORIZATION_REQUIRED`
- `CHALLENGE_NOT_PASS`
- `CHALLENGE_REPOSITORY_MISMATCH`
- `CHALLENGE_PR_MISMATCH`
- `CHALLENGE_HEAD_SHA_MISMATCH`
- `CHALLENGE_ACTION_FINGERPRINT_MISMATCH`
- `CHALLENGE_EXPIRY_MISSING_OR_INVALID`
- `CHALLENGE_EXPIRED`
- `CHALLENGE_COMPLETION_TIME_MISSING_OR_INVALID`
- `CHALLENGE_COMPLETION_TIME_IN_FUTURE`
- `LIVE_PR_REPOSITORY_MISMATCH`
- `LIVE_PR_NUMBER_MISMATCH`
- `LIVE_PR_NOT_OPEN`
- `LIVE_PR_ALREADY_MERGED`
- `LIVE_PR_HEAD_SHA_CHANGED`
- `LIVE_PR_BASE_BRANCH_MISMATCH`

## Executor contract

`executeProtectedMerge` receives only a successful authorization object plus a server-side adapter. On denial it never calls the adapter.

On authorization it calls:

```text
mergePullRequest({
  repository,
  pr_number,
  expected_head_sha,
  merge_method
})
```

No real merge was performed during T3 implementation/local validation.

## T3 closure evidence

User-machine validation on 2026-09-07:

- full repository `npm test`: **41/41 PASS, 0 fail**;
- focused `npm run test:merge-gate`: **12/12 PASS, 0 fail**.

Durable evidence: `evidence/t3/LOCAL-USER-VALIDATION-V0.1-41-OF-41-AND-12-OF-12.md`.

Therefore:

`SKEPTARA_T3_FAIL_CLOSED_MERGE_GATE_PASS = CLOSED_PASS`.

## T4 boundary

T3 closure is not merge authorization. T4 must now perform the real two-case proof:

- PR #2 clean candidate: obtain a **fresh live PASS** on the exact current head, revalidate live GitHub facts, then only with explicit human authorization execute the bounded real merge;
- PR #1 challenged candidate: obtain a **fresh live BLOCK** and prove the Skeptara gate refuses execution.

Any stale challenge, changed head, missing human authorization, BLOCK, or ESCALATE remains denied.
