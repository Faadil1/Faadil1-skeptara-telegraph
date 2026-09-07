# Skeptara T2 v0.3 — User-machine validation

Date: 2026-09-06
Machine context: user local Windows clone

## Result

Full repository suite executed after the seeded exact-CVE auditor v0.3 addition:

- total tests: **26**
- pass: **26**
- fail: **0**
- cancelled: **0**
- skipped: **0**
- todo: **0**
- observed duration: **505.5536 ms**

The green suite includes the prior generic-auditor and policy regressions plus the new seeded-CVE cases:

- exact seeded CVE plan respects the MEDIUM 20000 atomic USDC cap;
- a returned CVE whose affected range ends below the clean target normalizes to meaningful non-blocking `ADVISORY`;
- two meaningful non-blocking seeded CVE paths can produce deterministic PASS;
- the same seeded CVE blocks the challenged `4.17.21` target and stops asymmetrically after the first blocking path;
- a wrong routed intent cannot count as seeded-CVE coverage.

This is deterministic/local validation only. It does not close T2. The next proof is the bounded real Telegraph/x402 audit against clean PR #2, exact head `d2aa0ea25daf1f84b6cfdd98861d3f05df584b7a`.
