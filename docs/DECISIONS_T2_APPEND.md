# T2 decision addendum

This temporary addendum records T2 architecture decisions before the next consolidation pass into `docs/DECISIONS.md`.

## D-012 — Planned intent is not claimed intent
Status: LOCKED  
Date: 2026-09-06

The auditor may request/prefer an evidence mode, but Skeptara records and reasons from the actual intent returned by Telegraph. Cross-intent claims are based only on observed returned intents.

## D-013 — Asymmetric stopping on blocking evidence
Status: LOCKED  
Date: 2026-09-06

Once material BLOCKING counter-evidence is found, the challenge may stop immediately and return BLOCK. A clean PASS candidate must still complete all mandatory risk-tier coverage.

## D-014 — Live capability discovery before paid planning
Status: LOCKED  
Date: 2026-09-06

T2 discovers current Telegraph intents before building the paid plan. If required paths cannot be formed from supported capabilities, the challenge ESCALATEs before spending.
