# Skeptara T2 — PR #2 seeded-CVE live run 003 review

Status: **RUNTIME ESCALATE EXPLAINED — v0.4 NORMALIZER REMEDIATION IMPLEMENTED, LOCAL REPLAY REQUIRED**  
Date: 2026-09-07 UTC

## Bound live action

- Repository: `Faadil1/Faadil1-skeptara-telegraph`
- PR: `#2`
- Head: `d2aa0ea25daf1f84b6cfdd98861d3f05df584b7a`
- Target: `lodash@4.18.1`
- Risk: `MEDIUM`
- Paid live spend: `20000/20000` atomic USDC
- Live mode: `SEEDED_CVE_COUNTER_EVIDENCE`
- Seeds: `CVE-2026-4800`, `CVE-2026-2950`

## What the live run actually returned

### CVE-2026-4800

Telegraph returned actual `CVE_LOOKUP`, exact `CVE-2026-4800`, `found:true`, source label `CVE.org and NVD`, and affected-version text ending before `4.18.0`. For target `4.18.1`, v0.3 correctly normalized this as:

- `ADVISORY`
- `coverage_complete:true`
- `KNOWN_VULNERABILITY_DOES_NOT_MATCH_TARGET_VERSION_RANGE`

### CVE-2026-2950

Telegraph also returned actual `CVE_LOOKUP` and exact `CVE-2026-2950`. The raw record was substantive and included:

- product `lodash`;
- severity `MEDIUM` / CVSS `5.3`;
- description: versions `4.17.23 and earlier` are vulnerable;
- `fixed_versions: ["4.18.0"]`;
- `fix_available:true`;
- source labels `CIRCL` and `NVD`;
- a concrete Lodash security-advisory reference.

However, this miner shape omitted the boolean `found` field and `verdict:"found"`. Auditor v0.3 treated that omission as `SEEDED_CVE_RECORD_NOT_RETURNED` even though the exact CVE record was present. It also did not use `fixed_versions` as a machine-checkable exclusive upper bound.

## Corrected evidence interpretation

The live data itself supports meaningful coverage for both paths:

1. `CVE-2026-4800`: affected before `4.18.0` → target `4.18.1` is outside range → `ADVISORY`.
2. `CVE-2026-2950`: patched/fixed in `4.18.0`, with vulnerable versions described through `4.17.23` and earlier → target `4.18.1` is outside range → `ADVISORY`.

Thus the raw live evidence is **2/2 meaningful non-blocking coverage**. The runtime `ESCALATE` was caused by a normalizer shape assumption, not by missing Telegraph evidence.

## v0.4 remediation

`src/seeded-cve-auditor.mjs` is now `skeptara-auditor-v0.4-seeded-cve` and:

- accepts an exact matching CVE record without requiring a particular miner-specific `found`/`verdict` field when substantive advisory fields are present;
- still rejects an exact CVE id with no substantive advisory content;
- uses the lowest `fixed_versions` value as an exclusive affected-range boundary;
- additionally parses `X.Y.Z and earlier` and patched/fixed/unaffected version wording;
- preserves exact-CVE-id and actual-`CVE_LOOKUP` requirements.

Regression tests cover the exact live `CVE-2026-2950` response shape and the empty-record negative case.

## Replay boundary

The sanitized paid responses from run 003 are persisted in:

`evidence/t2/live-pr2-seeded-run-003/replay-input.sanitized.json`

They can be deterministically replayed without another x402 payment via:

`npm run t2:replay:003`

T2 must not close until the user-machine full test suite and this exact replay both pass. A successful replay proves the corrected normalizer interprets the already-paid live evidence consistently; it does **not** create a fresh merge authorization. T3 must still require a fresh, unexpired challenge bound to the exact PR head before any real merge.

No merge is authorized for PR #1 or PR #2.
