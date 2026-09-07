# Skeptara T4 — PR #1 BLOCK merge-denial replay

Status: **PASS — zero-write denial proven**  
Date: 2026-09-07 UTC

## Source challenge

- Challenge: `113cc2c4-94ff-4c47-bf48-66fabc7c9329`
- Repository: `Faadil1/Faadil1-skeptara-telegraph`
- PR: `#1`
- Head: `73cf5bdd69163924228e3e21d67fa9f405d99904`
- Reviewed outcome: `BLOCK`
- Blocking evidence: `CVE-2026-2950`
- Review: `evidence/t4/pr1-block-run-004/REVIEW.md`

## User-machine replay

Command:

```text
npm run t4:replay:block
```

Observed:

```text
challenge outcome: BLOCK
authorization: DENIED
reasons: CHALLENGE_NOT_PASS
merge adapter calls: 0
execution: executed=false merged=false
PASS: fresh captured BLOCK deterministically denies execution with zero merge-adapter calls
```

## Meaning

The replay deliberately satisfies the allow-list, exact action binding and humanAuthorization test fixture while evaluating inside the original challenge freshness window. The only execution-disqualifying condition is therefore the challenge outcome itself.

Skeptara correctly returns `DENIED` because a `BLOCK` challenge can never authorize execution. The merge adapter invocation count remains exactly `0`, proving the protected executor is not reached on the denied path.

No Telegraph call, x402 payment, GitHub write, or real merge occurred during this replay.

## T4 challenged-case conclusion

The challenged half of the two-case proof is now complete:

1. real paid Telegraph counter-evidence found a material vulnerability affecting `lodash@4.17.21`;
2. deterministic audit outcome was `BLOCK`;
3. the protected merge gate denied authorization;
4. the merge adapter was never called.

Next: obtain a fresh clean PR #2 challenge. A real merge of PR #2 remains separately protected and requires a fresh exact-head PASS plus explicit bounded human authorization.
