# Skeptara T3 — local user validation

Status: **PASS**  
Date: 2026-09-07 UTC

## Scope

This evidence closes the local validation gate for `skeptara-merge-gate-v0.1`. No GitHub merge, Telegraph payment, private-key use, or protected write action occurred during this validation.

## User-machine full repository suite

Command:

```text
npm test
```

Observed result:

- tests: `41`
- pass: `41`
- fail: `0`
- cancelled: `0`
- skipped: `0`
- todo: `0`

The full suite includes policy, generic auditor, seeded-CVE auditor and merge-gate tests.

## Focused merge-gate suite

Command:

```text
npm run test:merge-gate
```

Observed result:

- tests: `12`
- pass: `12`
- fail: `0`
- cancelled: `0`
- skipped: `0`
- todo: `0`

Validated fail-closed behaviors include:

- fresh exact PASS + allow-list + human authorization can authorize;
- BLOCK and ESCALATE cannot authorize;
- changed live PR head denies;
- challenge head mismatch denies;
- expired/malformed expiry denies;
- non-allow-listed target denies;
- action fingerprint mismatch denies;
- human bounded authorization is mandatory;
- closed/already-merged PR denies;
- denied authorization never calls the merge adapter;
- authorized executor forwards exact `expected_head_sha` to the server-side adapter.

## Closure

`SKEPTARA_T3_FAIL_CLOSED_MERGE_GATE_PASS = CLOSED_PASS`.

This closes only the deterministic protected-execution gate. It does **not** authorize a real merge. T4 still requires fresh live Telegraph evidence on the real demo PRs; PR #2 can be merged only after a fresh unexpired exact-head PASS plus explicit human bounded authorization.
