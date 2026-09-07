# Skeptara — PR #3 local validation 001

Status: **PARTIAL PASS — one lint warning found and remediated; clean re-run pending**  
Date: 2026-09-07

## Candidate

- Branch: `integration/frontend-final-v2`
- Draft PR: #3
- Validated local branch before warning fix: owner integration candidate
- Current candidate head after warning remediation: `afffa7bb28b556192a25116a18924148b2314590`

## Human local validation supplied by project owner

### Root test suite

Command:

```text
npm test
```

Observed:

- tests: 41
- pass: 41
- fail: 0
- skipped: 0
- todo: 0

Result: **PASS**

### Frontend dependency install

Command:

```text
cd web
npm ci
```

Observed:

- 31 packages added
- 0 vulnerabilities

Result: **PASS**

### Production build

Command:

```text
npm run build
```

Observed:

- TypeScript build completed
- Vite v8.2.2 production build completed
- 48 modules transformed
- output generated successfully

Result: **PASS**

### Lint

Command:

```text
npm run lint
```

Observed:

- 0 errors
- 1 warning
- warning: `react(set-state-in-effect)` in `src/hooks/useCaseReplay.ts`
- warning pointed at synchronous state writes used to honor `prefers-reduced-motion`

Result: **HOLD_BOUNDED_WARNING**

### Local dev server

Command:

```text
npm run dev -- --host 127.0.0.1
```

Observed local URL:

```text
http://127.0.0.1:5173/
```

Result: **STARTUP PASS**

## Remediation

The warning was remediated on `integration/frontend-final-v2` in commit:

`afffa7bb28b556192a25116a18924148b2314590`

The replay hook now defers state transitions through scheduled callbacks rather than writing state synchronously inside the effect. The reduced-motion behavior remains: the historical replay resolves immediately to the completed state without creating Telegraph requests or GitHub writes.

## Required follow-up

Before TRACE can close:

1. pull the latest candidate head;
2. rerun `npm run lint` and require **0 warnings / 0 errors**;
3. rerun `npm run build` after the hook change;
4. visually inspect desktop/mobile and direct routes;
5. verify replay causes no Telegraph network traffic;
6. verify the four settlement links and the historical real-merge link;
7. reconcile PR #3 with the latest `main` if GitHub still reports a merge conflict;
8. persist final TRACE evidence before merge.

No fresh Telegraph calls are required or authorized for this validation.
