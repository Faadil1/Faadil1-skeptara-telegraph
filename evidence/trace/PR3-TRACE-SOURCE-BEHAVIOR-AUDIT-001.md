# Skeptara PR #3 — TRACE source / behavior audit 001

Date: 2026-09-07 UTC
Candidate branch: `integration/frontend-final-v2`
Candidate source head reviewed: `4687cf37a8dd284b5079e709de326de9b01ef182`
Prior exact web validation head: `1244294ee96c747c7220a7159de0652d9b04e019`

## Verdict

**SOURCE / CLAIM / BEHAVIOR TRACE = PASS**

**CURRENT-CANDIDATE BROWSER VISUAL + NETWORK CAPTURE = STILL REQUIRED BEFORE MERGE**

The head change from `1244294...` to `4687cf3...` changes only `demo/JUDGE_WALKTHROUGH.md`; no `web/` file changed after the user's clean lint/build validation.

## Checks completed

### 1. Five-second judge comprehension — source PASS

The landing page now presents:

- a direct product promise: `Challenge the action before it can merge.`
- an explicit captured T4 terminal replay;
- an above-the-fold split showing PR #1 `BLOCK` versus PR #2 `PASS`;
- the challenged path as `2 paid calls · 1 qualifying path · 0 merge calls`;
- the clean path as `2 of 2 qualifying paths · exact-head merge executed`.

This is materially clearer than a generic terminal-only hero.

### 2. T4 truth / claim correctness — PASS

The candidate preserves the actual final T4 chronology and boundaries:

- PR #1 call 01: `CVE-2026-4800` → `AMBIGUOUS`, does not count toward coverage;
- PR #1 call 02: `CVE-2026-2950` → `BLOCKING`;
- PR #1 paid both calls and spent the full `$0.02` cap;
- PR #1 final outcome `BLOCK`; merge-adapter calls `0`;
- PR #2 coverage `2/2`, final outcome `PASS`, historical real exact-head merge;
- MEDIUM is labeled live-proven for the final T4 cases; LOW/HIGH remain policy/test-proven;
- exact CVE seeded mode is disclosed as a controlled hackathon proof, not automatic unknown-vulnerability discovery;
- independence language is bounded to proposer / policy / auditor / merge-gate separation, not statistical miner independence;
- earlier development `ESCALATE` runs are acknowledged; neither final T4 case is falsely presented as ESCALATE.

### 3. Settlement semantics — PASS

`web/src/data/cases.ts` contains four distinct verified T4 settlement transaction hashes for four distinct paid evidence calls.

`EvidenceLog` numbers calls explicitly and displays payment/settlement separately from whether a path counts toward coverage.

### 4. Historical replay boundary — PASS

Each case page contains a persistent banner:

`CAPTURED LIVE · HISTORICAL REPLAY · NO NEW TELEGRAPH CALL OR GITHUB WRITE`

The Replay control invokes `useCaseReplay`, which uses browser timers and React state only. No Telegraph client, wallet, GitHub write adapter, private key, or protected credential is imported into the web replay path.

### 5. Reduced motion / interaction safety — source PASS

- replay immediately resolves to the captured final state under `prefers-reduced-motion`;
- smooth hash scrolling becomes `auto` under reduced motion;
- skeleton and verdict-dot animations disable under reduced motion;
- cursor glow is skipped for reduced motion and non-fine pointers.

### 6. Routing / invalid route — source PASS

`App.tsx` includes:

- `/`
- `/case/:caseId`
- catch-all `*` → safe 404

A missing case ID also fails safely to `Case not found` with a return link.

### 7. Responsive source review — PASS_PENDING_BROWSER

Responsive rules exist for:

- proof split → one column at <=640px;
- stat rows → one column;
- risk-tier diagram → one column;
- header/nav wrapping;
- footer collapse;
- case header wrapping.

No source-level horizontal-scroll dependency was identified. Exact rendered mobile/desktop composition still requires current-candidate browser evidence.

### 8. Social / release metadata — PASS

`web/index.html` includes:

- title;
- description;
- canonical URL;
- Open Graph title/description/url/type;
- X/Twitter summary-card title/description.

No OG image is currently defined. This is a polish opportunity, not a submission blocker.

### 9. Copy / AI-slop review — PASS

Public UI copy was tightened away from repetitive em-dash contrast formulas and generic marketing symmetry. Technical hyphens remain where semantically useful (`exact-head`, `fail-closed`, CVE identifiers, etc.).

The judge walkthrough was additionally tightened at candidate head `4687cf3...` to remove ambiguous `independent evidence paths` language and to distinguish captured replay from fresh network activity.

### 10. Build / lint / dependency validation — PASS

User-machine evidence on the unchanged web tree:

- root tests: `41/41 PASS`, `0 fail`;
- `web npm ci`: PASS, `0 vulnerabilities` at the time observed;
- `web npm run lint`: `0 warnings`, `0 errors`;
- `web npm run build`: PASS;
- Vite dev startup: PASS on `http://127.0.0.1:5173/`.

## Remaining browser evidence gate

Before PR #3 can be merged, capture current-candidate evidence for:

1. desktop landing;
2. mobile/narrow landing;
3. `/case/pr1` after replay completes;
4. `/case/pr2` after replay completes;
5. invalid route / 404;
6. DevTools Network on page load + Replay, confirming no Telegraph request and no GitHub write request;
7. manual click-through of all four settlement links and the historical real-merge commit link.

## Collaboration / finish plan

- Benita does not need another implementation round unless browser TRACE finds a concrete regression.
- Benita can focus on final demo narrative, pitch, X/public communication, and any required community/admin participation.
- Faadil owns the final submission-site action and technical evidence/governance checks.
- Do not force-move Benita's branch.
- `integration/frontend-final-v2` remains the only current integration candidate; `integration/frontend-final` is stale.
