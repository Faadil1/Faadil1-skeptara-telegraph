# Skeptara — Telegraph Track 3

> **No autonomous merge without an independent challenge.**

Skeptara is a pre-execution safety layer for autonomous coding agents. Before a dependency-change pull request can become execution-eligible, Skeptara applies an **external deterministic risk classification** and obtains **Telegraph-routed counter-evidence** under a bounded spend contract.

The proposing agent does **not** score its own risk and does **not** audit itself. Missing coverage, critical ambiguity, stale bindings, or material counter-evidence fail closed.

## Portfolio snapshot

| | |
| --- | --- |
| **Problem** | An autonomous coding agent should not be allowed to propose a risky dependency change, assess its own risk, and then authorize its own merge. |
| **Mechanism** | External deterministic risk tier → risk-proportional paid challenge → PASS / BLOCK / ESCALATE → exact-head protected execution. |
| **Live proof** | One challenged dependency change was blocked with **0 merge-adapter calls**; one clean case passed with **2/2 Telegraph coverage** and completed a real exact-head merge. |
| **Economic boundary** | Challenge spend is bounded by policy; the verified activity subset records real testnet USDC challenge calls and observed spend. |
| **My role** | Product mechanism · risk policy · execution-gate architecture · Telegraph/x402 integration · negative-path testing · evidence/claim-boundary design. |
| **Themes** | AI-agent governance · independent challenge · fail-closed execution · software supply-chain risk · bounded paid evidence · GitHub automation. |

## Why this project matters

Autonomy becomes dangerous when the same agent can be **proposer, evaluator, and executor**.

Skeptara breaks that loop. It forces a meaningful external objection path before protected execution and binds any eventual merge to the exact reviewed head. Human authorization can add another safety boundary, but it cannot turn a `BLOCK` or `ESCALATE` into a `PASS`.

The core product pattern is:

```text
agent proposes change
→ external deterministic risk classification
→ risk-proportional independent challenge
→ PASS / BLOCK / ESCALATE
→ exact-head revalidation
→ protected execution only if still eligible
```

## What was proven live

### Challenged PR #1 — BLOCK → no merge call

- target: `lodash@4.17.21`
- risk: `MEDIUM`
- real Telegraph `CVE_LOOKUP`
- blocking evidence: `CVE-2026-2950`
- result: `BLOCK`
- protected merge authorization: `DENIED`
- merge-adapter calls: `0`

Evidence:

- `evidence/t4/pr1-block-run-004/REVIEW.md`
- `evidence/t4/pr1-block-run-004/MERGE-DENIAL-REPLAY.md`

### Clean PR #2 — PASS → exact-head real merge

- target: `lodash@4.18.1`
- risk: `MEDIUM`
- real Telegraph coverage: `2/2`
- routed miners observed: PREFLIGHT Infrastructure Signals (`20260828`) + SecWire CVE Lookup (`7336`)
- observed challenge spend: `$0.02` testnet USDC
- result: `PASS`
- exact head revalidated before execution
- explicit bounded human authorization used as an additional real-write safety boundary
- real merge commit: `c76c76e0c02dab28275d8e53d70da3f6f132e648`

Evidence:

- `evidence/t4/pr2-clean-run-005/REVIEW.md`
- `evidence/t4/pr2-clean-run-005/reviewed-challenge.sanitized.json`
- `evidence/t4/pr2-clean-run-005/REAL-MERGE-EXECUTION.md`

## What I owned

- defined the product mechanism around independent challenge before protected autonomous execution;
- separated proposer behavior from deterministic risk authority;
- designed the risk-proportional scrutiny policy and fail-closed outcomes;
- integrated Telegraph-routed evidence and bounded x402 spend into the challenge path;
- bound execution eligibility to the exact reviewed PR head;
- built negative-path and clean-path evidence showing both denied and permitted execution;
- documented claim boundaries so the project does not overstate what the live proof demonstrates.

## Core mechanism

`PR proposed → external deterministic risk → risk-proportional paid Telegraph challenge → PASS / BLOCK / ESCALATE → exact protected execution`

Risk controls scrutiny:

| Tier | Required paths | Demo cap | Evidence status |
| --- | ---: | ---: | --- |
| LOW | 1 | 10,000 atomic USDC | deterministic policy/test-proven |
| MEDIUM | 2 | 20,000 atomic USDC | **live-proven in final T4 cases** |
| HIGH | 3 | 30,000 atomic USDC | deterministic policy/test-proven |

The caps above are Skeptara demo parameters derived from observed testnet pricing. They are **not** a claim that Telegraph pricing is fixed network-wide.

## Why Telegraph matters

Skeptara does not hardcode a single intelligence provider. It declares an evidence need and sends paid demand through Telegraph's engine. The final clean challenge observed two different routed miners in one `CVE_LOOKUP` challenge. x402 keeps each evidence path economically bounded and observable.

The product-level innovation is the **risk-proportional objection policy + exact execution gate**, not x402 by itself.

## Judge replay

Secret-free captured-live replay:

```bash
npm run demo
```

This command performs **no Telegraph payment and no GitHub write**. It replays persisted live evidence and explicitly labels it as historical.

Local challenge-dossier UI:

```bash
npm run demo:web
```

Then open `http://127.0.0.1:4173`.

## Verified activity subset

The conservative final-proof ledger currently includes:

- 3 real paid challenge runs;
- 5 real paid Telegraph evidence calls;
- 2 observed routed miners;
- `$0.05` observed testnet USDC spend;
- 1 protected challenged action denied;
- 1 real exact-head merge.

See `evidence/activity/ACTIVITY-LEDGER-V0.1.md`.

## Important claim boundaries

- The final hackathon proof uses **controlled exact CVE seeds** to obtain concrete advisory/range records. It proves challenge enforcement, not automatic discovery of unknown vulnerabilities.
- “Independent challenge” refers to proposer/auditor topology and deterministic external policy. It does **not** claim statistical independence between miners.
- LOW/HIGH scaling is policy/test-proven; the final real paid two-case proof is MEDIUM.
- Historical replays do not create fresh execution authorization.
- T3 proves the protected merge contract and exact-head forwarding in code/tests; T4 proves a real exact-head merge under the same constraints. This repo does not claim a fully deployed production GitHub App/runtime adapter.
- Human authorization was an extra safety boundary for the real demo write. It could not convert `BLOCK` or `ESCALATE` into `PASS`.

See `docs/JUDGE-CLAIM-BOUNDARIES.md`.

## Project sources

- Living product source: `product/PRD.md`
- Canonical state: `state/CURRENT.yaml`
- Conversation/runtime handover: `state/HANDOVER.yaml`
- Derived execution artifacts: `spec-kit/`
- Architecture/decisions/contracts: `docs/`
- Evidence index: `evidence/README.md`
- Winning Intelligence: `evidence/winning-intelligence/`

## Administrative status

- Telegraph registration: **VERIFIED**
- Official Discord: **human join/activity verification still required**
- X showcase/update(s): **human publishing/verification still required**
- Final submission: **not yet submitted**

See `docs/SUBMISSION-COMPLIANCE.md`.

## Safety

- No private keys or payment secrets in browser code, commits, issues, or durable evidence.
- Telegraph/x402 wallet material stays local/server-side only.
- No protected GitHub write credential is exposed to the frontend.
- No artificial user, request, engagement, or adoption metrics.

## Current gate

See `state/CURRENT.yaml` for the exact authoritative next gate. Repository truth outranks chat memory.

## Full frontend (web/)

The judge replay above (`npm run demo:web`) serves the lightweight static dossier at `public/index.html`. There is also a full Vite + React + TypeScript app at `web/` rendering the same judge path (risk → challenge → verdict) as a richer, componentized UI. See `docs/DESIGN.md` for its visual system and `demo/JUDGE_WALKTHROUGH.md` for a judge-facing walkthrough with screenshots.

**Live:** https://skeptara.vercel.app

```
cd web && npm install && npm run dev
```

## Real vs. mock (web/ frontend)

Every field the `web/` frontend renders comes from `docs/FRONTEND_DATA_CONTRACT.md` and is sourced from the same two **real, closed** T4 challenge runs documented above — not a live stream, not simulated:

- **PR [#1](https://github.com/Faadil1/Faadil1-skeptara-telegraph/pull/1) (challenged, `BLOCK`)** — `evidence/t4/pr1-block-run-004/reviewed-challenge.sanitized.json`. Real Telegraph `CVE_LOOKUP` call, real miner (`SecWire CVE Lookup`), real signal hash, real $0.01 x402 settlement on Base Sepolia, real `CVE-2026-2950` finding. Merge denied, 0 merge-adapter calls made.
- **PR [#2](https://github.com/Faadil1/Faadil1-skeptara-telegraph/pull/2) (clean, `PASS`)** — `evidence/t4/pr2-clean-run-005/reviewed-challenge.sanitized.json`. Two real Telegraph calls, real settlements, real advisory (non-blocking) findings. Real merge executed under explicit human-bounded authorization, commit [`c76c76e`](https://github.com/Faadil1/Faadil1-skeptara-telegraph/commit/c76c76e0c02dab28275d8e53d70da3f6f132e648).

The `web/` frontend replays these two closed runs with paced loading states for legibility (each case page moves through `assessing risk → challenging → verdict` on load) — this is a **replay of recorded evidence**, labeled as such in the UI with a `replay` control, never presented as a live call in progress.

Per the PRD (`product/PRD.md` §"No placeholders"), no submission intelligence is mocked in `web/`: no fabricated hash, cost, miner, or finding appears anywhere in the UI. When a contract field is null or missing, the UI shows an explicit fallback (e.g. "not exposed", "none flagged") rather than inventing a value. The only synthetic case ever created — a null/edge-field stress fixture used during frontend quality testing — was local-only and removed before this build; the repository history and this README are the record of that.

Neither of the two final T4 cases resolved to `ESCALATE` — earlier development runs did exercise it, but they aren't part of this two-case demo. The `web/` landing page states this directly instead of fabricating a third ESCALATE case to look complete.
