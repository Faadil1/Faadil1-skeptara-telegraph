# Skeptara — Winning Intelligence Blind-Spot Audit 002

Status: **COMPLETE — material hidden spots found, no product pivot required**  
Date: 2026-09-07 UTC

## Purpose

Pressure-test Skeptara after T4 closure and after the first Winning Intelligence preflight. This audit looks specifically for hidden weaknesses that could hurt judge interpretation, sponsor fit, technical credibility, reproducibility, or submission compliance even though the core mechanism is already proven.

## Executive verdict

The core product mechanism remains strong. The hidden spots are **mostly proof/presentation/runtime-boundary gaps rather than product-design failures**.

The highest-risk hidden spots are:

1. no actual frontend/public judge surface is currently present in the repository;
2. the live merge proof used the same exact-head semantics as the protected gate, but the repository does not yet expose a production GitHub adapter/runtime that visibly invokes `executeProtectedMerge` end-to-end;
3. the hackathon proof uses controlled exact-CVE seeds, so the public narrative must not imply autonomous vulnerability discovery;
4. the thesis says risk controls evidence depth/spend, but the real two-case T4 proof exercises only MEDIUM risk;
5. submission-facing administrative compliance (registration, official Discord participation, public X updates/tagging, final submission fields) is not verifiable from the repository;
6. Telegraph's own stated quality-flywheel/routing story is not yet visible enough in the judge path;
7. truthful aggregate activity/usage evidence is not yet packaged despite multiple real paid runs;
8. README and evidence index are stale relative to T4 closure;
9. captured-live replay versus currently-fresh executable state needs explicit UI labeling;
10. wording must avoid unproven miner/statistical independence and avoid overselling the deterministic risk rubric as a quantitative downside estimator.

## P0 — Must address before submission

### BS-01 — No real frontend / public judge surface in repo

**Finding**

The current repository is a Node evidence/runtime project. `package.json` contains live audit/replay/test scripts but no frontend framework or public app script. The synchronized `feat/frontend-benita` branch had no unique collaborator commits at the last comparison.

**Why it matters**

The application track rewards shipped products, users/activity, usage/adoption and usefulness. A judge should not need to reconstruct the product from YAML, JSON and terminal output.

**Required remediation**

TRACE must produce a concrete visual contract, then a public judge surface must be implemented and smoke-tested. Minimum surface: one challenge dossier with the real split PR1 BLOCK/deny versus PR2 PASS/merge proof.

**Do not** turn this into a generic dashboard build.

---

### BS-02 — End-to-end protected merge runtime boundary is not fully productized

**Finding**

`src/merge-gate.mjs` correctly implements `authorizeMerge` and `executeProtectedMerge`, and tests prove that an authorized executor forwards the exact `expected_head_sha`. The real PR #2 merge was also executed with the exact authorized SHA and verified on GitHub. However, there is no repository runtime adapter/script that visibly wires a live GitHub client into `executeProtectedMerge` and performs the real merge from that same process.

**Why it matters**

A skeptical judge could distinguish:

- gate logic proven in code/tests;
- real exact-head merge proven through the GitHub execution adapter used by the orchestration environment;
- versus a single repository process demonstrably invoking both together.

The current evidence is strong but the public claim must be precise.

**Required remediation options**

Preferred under deadline: **do not rebuild auth infrastructure.** State precisely that T3 proves the protected execution contract and T4 proves a real bounded merge under the same exact-head/human/freshness constraints. If a safe server-side adapter can be wired without credential sprawl, add it; otherwise keep this as a documented boundary, not a hidden overclaim.

---

### BS-03 — Controlled CVE seeds can look cherry-picked

**Finding**

The final T2/T4 auditor uses exact CVE seeds (`CVE-2026-4800`, `CVE-2026-2950`) so Telegraph is asked to return concrete advisory records and machine-checkable ranges. This was an evidence-quality remediation after broad generic searches produced low-quality/irrelevant paths.

**Why it matters**

A judge could incorrectly conclude that Skeptara automatically discovers unknown vulnerabilities from a dependency change. The current MVP proves **challenge enforcement against externally returned exact evidence**, not open-ended vulnerability discovery.

**Required remediation**

Make exact-CVE seeded mode visible and honest in the demo. Suggested language:

> “For this controlled hackathon proof, Skeptara challenges the action against exact advisory candidates and asks Telegraph-routed miners for the authoritative record/range. Production discovery of candidate advisories is a separate upstream step.”

Do not hide the seeds.

---

### BS-04 — Risk-proportional thesis is stronger than the live T4 evidence

**Finding**

The policy implements LOW/MEDIUM/HIGH with increasing evidence depth and spend ceilings. T1 tests prove that deterministically. But both real final T4 cases are MEDIUM dependency changes.

**Why it matters**

The central thesis is “higher risk -> deeper paid challenge.” A judge may ask to see a LOW/HIGH contrast.

**Required remediation**

Do not spend time on another paid full workflow unless needed. In the UI/demo show a truthful policy matrix:

- LOW -> 1 path / demo cap 10000 atomic;
- MEDIUM -> 2 paths / 20000;
- HIGH -> 3 paths / 30000 and stronger ambiguity/cross-intent requirements where supported.

Label **MEDIUM as live-proven** and LOW/HIGH as deterministic policy/test-proven unless separate live evidence is created.

---

### BS-05 — Submission compliance is not repo-verifiable

**Finding**

Official rules require real miners, public X updates properly tagged, and official Discord participation. The public site confirms Track 3 closes Sep 7, 2026 23:59 UTC and judges applications on users/activity, usage/adoption, creativity/usefulness, real miner use and engagement.

The repository cannot prove:

- participant registration status;
- official Discord membership/activity;
- X update history/tagging;
- final submission form requirements/status.

**Required remediation**

Before final submission, human owner must verify these administrative gates explicitly. Treat them as potential disqualification risks, not marketing tasks.

---

## P1 — High leverage for winning

### BS-06 — Telegraph quality-flywheel story is underused

**Finding**

Telegraph's rules say the hackathon exists to prove ranking + probabilistic routing + real economic incentives under real demand. Skeptara currently emphasizes safety and evidence quality, which is good, but it can make Telegraph look like a paid CVE API if the routing/flywheel is not shown.

**Observed proof available**

The fresh clean PR #2 run was auto-routed through `/engine/v1/ask` and produced two real `CVE_LOOKUP` responses from two different miners:

- `20260828` — PREFLIGHT Infrastructure Signals;
- `7336` — SecWire CVE Lookup.

**Required remediation**

Show that Skeptara declares an evidence need and Telegraph routes paid demand to miners. The judge should see that Skeptara creates recurring application demand for the intelligence network, not that it hardcodes one provider.

Do not claim statistical independence of miners.

---

### BS-07 — Real activity exists but is not aggregated

**Finding**

Multiple real x402-paid runs, different miners, signal hashes, costs, outcomes and latencies are already persisted, but there is no judge-facing activity ledger.

**Why it matters**

Application judging includes activity/usage. We should not fabricate users, but we can package truthful real usage.

**Required remediation**

Create a generated activity ledger before submission with only verifiable counts, for example:

- paid Telegraph challenge calls;
- unique observed miners;
- challenge outcomes by run;
- total observed testnet USDC spend;
- median/observed latency;
- real merged/denied actions.

Separate failed setup probes, evidence-quality experiments, and final demo runs so totals cannot be misread.

---

### BS-08 — README and evidence index are stale

**Finding**

The README still describes T0 as the first/current technical gate. `evidence/README.md` still labels several now-completed directories as planned.

**Why it matters**

A judge entering through GitHub gets an obsolete state before reaching the real T4 proof.

**Required remediation**

After TRACE locks the narrative, update README and evidence index in one pass. Top of README should show:

- one-line promise;
- real two-case proof;
- one-command captured-live replay if available;
- public demo link;
- evidence index;
- claim boundaries.

---

### BS-09 — Captured-live replay can be mistaken for a fresh executable challenge

**Finding**

The product correctly enforces challenge expiry. Historical sanitized evidence is useful for repeatable demos after the live challenge expires, but a replay must not visually imply that a stale PASS is currently merge-authorizing.

**Required remediation**

UI must visibly distinguish:

- `LIVE / FRESH` challenge;
- `CAPTURED LIVE EVIDENCE — REPLAY`;
- `EXPIRED / HISTORICAL`;
- `EXECUTED` historical action.

For PR #2, the honest state is now **historical PASS -> executed merge**, not “merge currently unlocked.”

---

### BS-10 — Human authorization can confuse the autonomy story

**Finding**

The product is about autonomous execution gating, but the hackathon demo required explicit human bounded authorization before the real write.

**Why it matters**

A judge may ask: “If a human had to approve the merge, what is autonomous?”

**Required remediation**

Make the layers explicit:

- Skeptara's machine gate decides whether execution is **eligible**;
- human authorization was an extra demo safety boundary for the real external write;
- BLOCK/ESCALATE cannot be overridden into PASS by the human in the demonstrated gate;
- the eventual production policy could delegate bounded execution authority after PASS, but that is outside this MVP.

---

## P2 — Claim precision / polish

### BS-11 — “Independent miners” is too strong as a public phrase

**Finding**

The architecture only proves constructor/auditor separation, context separation, deterministic external risk policy, and observed miner/source diversity. It explicitly does not prove statistical miner independence.

**Action already taken**

Winning Intelligence wording was tightened from “independent Telegraph miners” to **Telegraph-routed external evidence** / **Telegraph-routed counter-evidence**.

Keep “independent challenge” as the product concept, but explain that independence refers to action-review topology, not a statistical guarantee about miners.

---

### BS-12 — “Downside scoring” can overstate the MVP rubric

**Finding**

The current risk tier is a deterministic rule-based classification of changed surfaces. It is not an expected-loss model and does not quantify monetary downside.

**Action already taken**

Winning Intelligence wording was tightened to **external deterministic risk classification**.

---

### BS-13 — Observed price should not be presented as a network invariant

**Finding**

The MVP uses 10000 atomic USDC per observed path and maps demo caps from that behavior. Miner prices are dynamic.

**Required remediation**

Label pricing as **observed demo spend/cap**, not a universal Telegraph price.

---

### BS-14 — The product lacks a single judge-run command

**Finding**

There are separate commands for tests, T2 replay and T4 BLOCK replay. There is not yet one `npm run demo` that reproduces the captured-live two-case narrative in a deterministic, secret-free way.

**Why it matters**

Reproducibility is a judge multiplier and protects against live network instability during review.

**Required remediation**

After TRACE defines the exact presentation contract, add a captured-live replay harness that clearly labels its source artifacts and never presents fixture data as new live intelligence.

---

## What not to do in response

Do not react to this audit by expanding the product. Specifically:

- no new generalized governance framework;
- no new sponsor integration;
- no rushed HIGH-risk paid case unless clearly necessary;
- no fake “users” or request-volume inflation;
- no private-key/GitHub-token browser flow;
- no claim that exact-CVE seeded mode is automatic vulnerability discovery;
- no claim that the real merge proves a fully deployed server-side GitHub integration if that adapter is not actually present in the repo.

## Revised priority order

1. TRACE judge-path review with these claim boundaries embedded.
2. Build minimum public challenge-dossier frontend.
3. Add truthful activity ledger + one-command captured-live demo replay.
4. Update README/evidence index after TRACE lock.
5. Verify registration/Discord/X/final-submission administrative gates.
6. Public deployment smoke + legitimate external human demo interactions.
7. Project Finisher / clean-room replay / final submission.

## Final blind-spot decision

`WINNING_INTELLIGENCE_BLIND_SPOT_AUDIT_002 = COMPLETE`

`PRODUCT_PIVOT = NO`

`MATERIAL_HIDDEN_SPOTS_FOUND = YES`

The hidden spots are actionable without changing the locked product mechanism.
