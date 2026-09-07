# Skeptara T4 — challenged PR #1 fresh BLOCK run 004

Status: **FRESH LIVE BLOCK OBSERVED — sanitized JSON review pending**  
Date: 2026-09-07 UTC

## Bound action

- Repository: `Faadil1/Faadil1-skeptara-telegraph`
- PR: `#1`
- Head: `73cf5bdd69163924228e3e21d67fa9f405d99904`
- Target: `lodash@4.17.21`
- Risk: `MEDIUM`
- Auditor: `skeptara-auditor-v0.4-seeded-cve`
- Mode: `SEEDED_CVE_COUNTER_EVIDENCE`
- Seeds: `CVE-2026-4800`, `CVE-2026-2950`
- Runtime directory: `evidence/t2-runtime/2026-09-07T01-11-00-634Z`

## Observed terminal result

- Live Telegraph capabilities included `CVE_LOOKUP`.
- Spend: `20000/20000` atomic USDC.
- Runtime meaningful coverage: `1/2`.
- `CVE-2026-4800`: actual `CVE_LOOKUP`, `AMBIGUOUS`, reason `KNOWN_VULNERABILITY_RANGE_NOT_MACHINE_VERIFIABLE`, cost `$0.01`.
- `CVE-2026-2950`: actual `CVE_LOOKUP`, `BLOCKING`, reason `KNOWN_VULNERABILITY_AFFECTS_TARGET_DEPENDENCY_VERSION`, cost `$0.01`.
- Runtime outcome: `BLOCK`.
- Runtime reason: `MATERIAL_COUNTER_EVIDENCE_FOUND`.

## Interpretation boundary

This is a valid fresh BLOCK candidate and demonstrates the intended asymmetric behavior: Skeptara may continue past a non-blocking/incomplete first path and stop once material blocking evidence is found. The full `20000` atomic spend occurred because the material BLOCKING evidence arrived on the second path rather than the first.

Do not yet mark the T4 challenged-case proof closed. Review the sanitized `02-audit-result.json` from this exact run to verify the returned CVE record/range, challenge binding, timestamps, and evidence integrity. Then prove the protected merge gate denies execution for this BLOCK result without calling the merge adapter.

No merge is authorized for PR #1 or PR #2.
