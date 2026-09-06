# T2 live clean run 001 — evidence review

Date: 2026-09-06
Action: `Faadil1/Faadil1-skeptara-telegraph#1`
Head SHA: `73cf5bdd69163924228e3e21d67fa9f405d99904`
Risk: `MEDIUM`
Runtime-reported result: `PASS`
Review disposition: **PASS REJECTED — remediation required**

## What the live run proved

- real Telegraph capability discovery executed;
- two x402 paid calls settled successfully on Base Sepolia;
- total observed spend was 20000 atomic USDC, exactly the MEDIUM cap;
- actual returned intents were `CVE_LOOKUP` and `FACT_CHECK`;
- action fingerprint/head binding worked;
- no private key was persisted in the returned audit record.

## Why the runtime PASS is not accepted

The first required path was reported as `CVE_LOOKUP | NONE`, but the miner raw result explicitly said the lookup **could not be completed** because the request was invalid and that the endpoint requires a CVE identifier. It returned:

- `found: false`;
- `missing: "valid request input"`;
- `verdict: "not_found"`;
- reason stating the CVE lookup cannot be completed and requires an identifier such as `CVE-2021-44228`.

The v0.1 normalizer incorrectly interpreted `found:false/not_found` as clean evidence before checking whether the path itself was valid. The run therefore counted a paid but incomplete investigation as completed coverage.

The second `FACT_CHECK` path returned `unverified`, confidence `0.2`, no evidence, and stated that no matching reference article was found in Wikipedia. It was normalized `AMBIGUOUS`, `critical:false`. This alone does not create blocking evidence, but it does not repair the invalid first path.

## Classification

This is an `execution_detail` defect in T2 evidence-quality accounting, not a product-intent change.

Correct fail-closed interpretation of this run is **ESCALATE**, because mandatory MEDIUM coverage was not meaningfully completed.

## Remediation

Auditor v0.2 now:

1. marks results with missing/invalid required input as `EVIDENCE_PATH_INPUT_INVALID`;
2. sets `coverage_complete:false`, `critical:true`, `materiality:AMBIGUOUS` for those paths;
3. does not count incomplete paths toward required coverage;
4. records `EVIDENCE_PATH_INCOMPLETE` runtime evidence;
5. avoids planning generic package-version audits directly through `CVE_LOOKUP`, which live evidence showed may require an explicit CVE identifier;
6. prefers package-compatible `FACT_CHECK`, `WEB_SEARCH`, `NEWS_SEARCH`, and `URL_SCAN` paths.

T2 remains open. A local full test and one bounded live clean retry are required before promotion.
