# Skeptara Decision Log

This log records material product/architecture decisions so future conversations do not reconstruct rationale from chat.

## D-001 — Kill generic pre-execution verification gate
Status: LOCKED  
Date: 2026-09-06

Reason: insufficient differentiation from existing verification/firewall patterns.

## D-002 — Kill generic execution-warrant framework
Status: LOCKED  
Date: 2026-09-06

Reason: crowded governance vocabulary/pattern; too infrastructure-heavy for Track 3 and remaining time.

## D-003 — Preserve risk-proportional verification depth
Status: LOCKED  
Date: 2026-09-06

Reason: survived independent red-team reviews as the strongest differentiated economic primitive.

## D-004 — Counter-evidence, not confirmation voting
Status: LOCKED  
Date: 2026-09-06

Reason: additional verification budget is used to search for material evidence against the proposed action rather than simply collecting more supportive votes.

## D-005 — Constructor cannot audit itself
Status: LOCKED  
Date: 2026-09-06

Reason: same-agent self-falsification is vulnerable to correlated blind spots and self-critique failure. Use constructor → independent auditor topology.

## D-006 — External deterministic risk scorer for MVP
Status: LOCKED  
Date: 2026-09-06

Reason: the reviewed agent cannot be trusted to shrink its own scrutiny by underestimating downside. A simple explicit rubric is more defensible and testable than pseudo-quantitative LLM risk pricing.

## D-007 — Dependency-change GitHub merge as hero vertical
Status: LOCKED FOR PRD V0.1 REVIEW  
Date: 2026-09-06

Reason: concrete, judge-legible, bounded, and capable of showing a real action allowed and a real action blocked within remaining hackathon time.

## D-008 — x402 is enabling evidence, not claimed invention
Status: LOCKED  
Date: 2026-09-06

Reason: x402 provides real economic usage/auditability but is not itself the differentiating product mechanism.

## D-009 — No fabricated receipt/provenance fields
Status: LOCKED  
Date: 2026-09-06

Reason: record only fields actually exposed by Telegraph/x402. Hackathon evidence integrity outranks visual completeness.

## D-010 — Living PRD + derived Spec Kit
Status: LOCKED  
Date: 2026-09-06

Reason: follow the existing orchestration policy: PRD is the evolving canonical product-intent source; Spec Kit is the derived execution layer; material discoveries route back to PRD first.

## D-011 — Skeptara public name
Status: PROVISIONAL_LOCK  
Date: 2026-09-06

Reason: selected after an exact-name collision screen found no obvious current AI/software product or GitHub repository collision. This is not legal trademark clearance and can be revisited only if a material collision appears.

## D-012 — Planned intent is not claimed intent
Status: LOCKED  
Date: 2026-09-06

Reason: the T2 auditor may prefer/request an evidence mode, but Skeptara records and reasons from the actual intent returned by Telegraph. Cross-intent claims use observed returned intents only.

## D-013 — Asymmetric stopping on blocking evidence
Status: LOCKED  
Date: 2026-09-06

Reason: once material BLOCKING counter-evidence is found, the challenge may stop immediately and return BLOCK. A clean PASS candidate must still complete all mandatory risk-tier coverage.

## D-014 — Live capability discovery before paid planning
Status: LOCKED  
Date: 2026-09-06

Reason: T2 discovers current Telegraph capabilities before building a paid plan. If required evidence paths cannot be formed from supported capabilities, the challenge ESCALATEs before spending.

## D-015 — Paid response is not automatically completed evidence coverage
Status: LOCKED  
Date: 2026-09-06

Reason: T2 live clean run 001 returned HTTP/payment success for a CVE path whose miner explicitly said the lookup could not be completed because the request lacked a required CVE identifier. A paid call counts toward spend, but it counts toward required coverage only when the evidence path itself completed meaningfully. Invalid/missing required input is fail-closed and cannot become clean evidence.

## D-016 — Generic dependency audits do not plan direct CVE_LOOKUP without an explicit CVE identifier
Status: LOCKED  
Date: 2026-09-06

Reason: live Telegraph evidence showed the selected `/cve` miner can require an explicit CVE identifier. Package/version-only actions therefore prefer package-compatible `FACT_CHECK`, `WEB_SEARCH`, `NEWS_SEARCH`, and `URL_SCAN` paths. Skeptara may still record an actual returned `CVE_LOOKUP` intent when Telegraph routes there; planned intent is not claimed intent.

## D-017 — Relevance is part of completed coverage
Status: LOCKED  
Date: 2026-09-06

Reason: retry 002 showed that an `unverified` fact-check with `evidence: null`, and a news-search response containing articles unrelated to the canonical dependency target, cannot count as meaningful required coverage. Request/query text echoing the target is not evidence relevance. Paid-but-unverified or substantively irrelevant evidence is fail-closed.

## D-018 — Preserve PR #1 as challenged history; move clean fixture to current Lodash 4.18.1
Status: LOCKED FOR DEMO  
Date: 2026-09-06

Reason: current advisory validation showed `lodash@4.17.21` is no longer a defensible clean target in 2026. PR #1 is preserved at its original head as a challenged candidate. Clean PR #2 targets `lodash@4.18.1`, preserving the evidence chain rather than rewriting history.

## D-019 — Controlled exact-CVE seeds for reliable T2 demo evidence
Status: LOCKED FOR T2/T4 DEMO  
Date: 2026-09-06

Reason: broad reassurance/search paths twice produced paid but inadequate evidence. For the bounded demo, deterministic external advisory identifiers seed exact `CVE_LOOKUP` paths. The reviewed coding agent does not choose these seeds. A seeded path counts only when Telegraph returns the exact CVE record and a machine-checkable affected-version range. This preserves real Telegraph paid intelligence while making evidence quality testable and fail-closed.
