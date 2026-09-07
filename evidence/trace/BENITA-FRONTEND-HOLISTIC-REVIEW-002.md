# Skeptara — Benita Frontend Holistic Review 002

Status: **HOLD — bounded correctness + copy + release fixes before final TRACE**  
Date: 2026-09-07 UTC

## Scope

This review extends `BENITA-FRONTEND-SOURCE-REVIEW-001.md` beyond UI/UX. It covers public copy, claim accuracy, evidence/data semantics, replay behavior, accessibility, security/trust boundaries, social/share readiness, routing, release validation and anti-AI-slop style.

Reviewed branch head at time of this pass: `feat/frontend-benita` @ `b9981d74cfd2e5f7581ab1a72df5e6b3bde0691a`.

This does not reopen T0-T4. It is a judge-facing frontend/release quality gate.

## A. Copy / anti-AI-slop rules

The current copy is generally strong, but it overuses em dashes and contrast constructions in places. That can read as generated prose even when the content is correct.

### Style rule

Use punctuation normally rather than as a signature pattern.

Keep hyphens where they are part of real technical language or identifiers, for example:
- `risk-proportional`
- `exact-head`
- `fail-closed`
- `dependency-change`
- `CVE-2026-2950`
- `x402`

Avoid repeated prose patterns such as:
- `X — not Y`
- `X — the agent cannot...`
- `not X, not Y, but Z`
- sentence fragments separated by multiple em dashes
- repeated slogan-like triples
- defensive copy that sounds like it is arguing with an imagined critic

Preferred style: shorter declarative sentences, ordinary commas/periods, specific nouns, direct proof language.

### Copy that should be rewritten

Current examples include:
- `The agent proposing the change never runs the challenge against itself.` This is fine and should remain.
- `repo, SHA, dependency diff — not a persuasive case for why the change is fine.` Rewrite with a period or semicolon.
- `PASS/BLOCK/ESCALATE is deterministic ... — not a vote, not a second opinion from the same model.` Rewrite more plainly.
- `That's a deliberate difference from a team whose check runs fresh per request, not a shortcut we're hiding.` Remove. It is defensive, competitor-referential and unnecessary.
- `Nothing here is simulated to fit the story — the challenged case really blocked, the clean case really merged.` Rewrite as two factual sentences.

### Recommended voice

Use the voice of an evidence dossier:
- what happened;
- what was paid for;
- what counted;
- what did not count;
- why the verdict followed;
- what execution consequence followed.

Avoid language that sounds like marketing filler, synthetic certainty, or AI-generated contrast prose.

## B. Data / claim correctness

The P0 findings from source review 001 remain mandatory:

1. PR #1 real chronology is:
   - paid call 1: `CVE-2026-4800` -> `AMBIGUOUS`, not qualifying coverage;
   - paid call 2: `CVE-2026-2950` -> `BLOCKING`;
   - spend: full `$0.02` MEDIUM cap;
   - completed meaningful coverage: `1/2`;
   - final outcome: `BLOCK` because material counter-evidence was found.

2. All four final T4 evidence items were separate paid calls with four distinct successful x402 transactions. Use `FRONTEND-SETTLEMENT-MATRIX-CLARIFICATION.md`.

3. Do not say no real Skeptara run ever produced `ESCALATE`. Correct boundary: neither final T4 case resolved to ESCALATE; earlier development runs exercised fail-closed ESCALATE behavior.

4. Independence wording must mean component/topology separation, not statistical/model/miner independence.

5. `$0.04 / 4 calls` must be labeled as the **final T4 two-case proof** scope. The conservative broader proof ledger records 3 paid challenge runs, 5 paid evidence calls and `$0.05` observed testnet spend.

6. Historical proof records may keep the old repository name `Faadil1/Faadil1-skeptara-telegraph`; current navigation should use `Faadil1/skeptara-telegraph`. Make the distinction explicit where a judge could otherwise think the repo link is stale.

## C. Functional behavior

### Good

- Case replay is local recorded-data playback. No Telegraph payment or GitHub write is performed by the judge UI.
- External settlement links are allow-listed only for observed Base Sepolia (`eip155:84532`).
- Unknown networks do not get guessed explorer URLs.
- React Router has a Vercel SPA rewrite so direct case routes can resolve through `index.html`.

### Fix / verify

1. `useCaseReplay.ts` contains confusing timer arithmetic on the first transition:
   `t += schedule(..., (t += ACTION_DELAY_MS))`.
   This double-mutates `t` and makes the intended timing difficult to reason about. Replace with simple sequential additions and one schedule call per phase.

2. Replay pacing should honor `prefers-reduced-motion`. Cursor glow and marquee already do, but the case replay timers still animate state transitions for reduced-motion users.

3. Hash navigation currently always uses `scrollIntoView({ behavior: "smooth" })`. Use non-smooth behavior when reduced motion is requested.

4. Add a simple catch-all/not-found route or equivalent safe fallback so malformed public URLs do not become an empty route surface.

5. Keep a persistent `CAPTURED LIVE / HISTORICAL REPLAY` marker during the whole case animation, not only at the page bottom.

## D. Security / trust boundaries

### Good

- No wallet private key is present in reviewed frontend data.
- No protected GitHub write credential is present in reviewed frontend code.
- Public proof links use fixed GitHub/BaseScan destinations rather than arbitrary user-supplied URLs.
- External links inspected use `target="_blank"` with `rel="noreferrer"`.
- Route input is used only to select a known local case; unknown case IDs degrade to a not-found panel.

### Keep this invariant

The public page must remain proof/replay only. Do not add automatic Telegraph requests on page load, refresh, polling, timers or background activity. Do not add a live merge button with credentials in the browser.

## E. Accessibility / interaction quality

Before final TRACE:

- reduced motion must cover marquee, cursor glow, status-dot animation, case replay pacing and smooth scrolling;
- verdict meaning must remain text + color, never color-only;
- keyboard focus states should be visible on links/buttons;
- mobile at ~375-390 px must have no horizontal scroll;
- hashes/transaction links must wrap or truncate without breaking layout;
- replay button must remain keyboard accessible and clearly describe historical replay.

## F. Social / submission readiness

`web/index.html` currently has only a title, viewport and font/favicons. Before X/demo sharing add:

- meta description;
- canonical URL `https://skeptara.vercel.app/`;
- Open Graph title/description/url/image;
- Twitter/X card metadata;
- a stable social preview image using the strongest BLOCK-vs-PASS proof moment.

This is high leverage because Benita is intended to be the primary X project voice and the public link should unfurl correctly.

## G. Release validation

Do not call the frontend final merely because the Vercel URL loads.

After Benita pushes the bounded fixes and normal reconciliation is complete, require:

1. frontend install/build/lint on the reconciled commit;
2. root `npm test` remains green;
3. root historical `npm run demo` remains zero-payment / zero-write PASS;
4. desktop visual TRACE screenshot;
5. narrow/mobile visual TRACE screenshot;
6. direct-route smoke for `/`, `/case/pr1`, `/case/pr2`;
7. settlement links open the intended BaseScan transactions;
8. GitHub merge proof link opens the real merge commit;
9. DevTools/network check confirms no Telegraph request on load/replay;
10. X/Discord public copy uses only approved claim boundaries.

At the time of this review, GitHub exposes **no CI status checks** for Benita branch head `b9981d74...`; therefore a commit-message statement that production build is clean is useful collaborator evidence but not independent CI proof.

## H. Visual refinement boundary

After correctness is fixed, only bounded judge-impact polish is justified:

- move the BLOCK-vs-PASS contrast nearer above the fold;
- represent each evidence path as a numbered paid-call timeline;
- add a persistent historical replay strip;
- make the exact execution consequence visually dominant;
- reduce generic terminal/security-hackathon motifs where they do not communicate Skeptara-specific semantics.

Do not redesign the whole product before submission.

## Gate result

`BENITA_FRONTEND_HOLISTIC_REVIEW_002 = HOLD_BOUNDED_FIXES`

The remaining work is bounded. The frontend is directionally strong, but it is not yet correct enough to call final across copy, evidence chronology, settlement data, replay behavior, reduced motion, social metadata and release validation.
