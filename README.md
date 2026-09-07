# Skeptara — Telegraph Track 3

> **No autonomous merge without an independent challenge.**

Skeptara is a pre-execution safety layer for autonomous coding agents. Before a dependency-change pull request can become execution-eligible, Skeptara applies an **external deterministic risk classification** and obtains **Telegraph-routed counter-evidence** under a bounded spend contract.

The proposing agent does **not** score its own risk and does **not** audit itself. Missing coverage, critical ambiguity, stale bindings, or material counter-evidence fail closed.

## Proof, immediately

| | PR #1 — challenged | PR #2 — clean |
| --- | --- | --- |
| Target | `lodash@4.17.20 → 4.17.21` | `lodash@4.17.20 → 4.18.1` |
| Real PR | [#1](https://github.com/Faadil1/Faadil1-skeptara-telegraph/pull/1) | [#2](https://github.com/Faadil1/Faadil1-skeptara-telegraph/pull/2) |
| Findings | `CVE-2026-4800` (ambiguous), `CVE-2026-2950` (blocking) | `CVE-2026-4800`, `CVE-2026-2950` (both advisory, out of range) |
| Real settlement tx | [`0x07ef1d9a…`](https://sepolia.basescan.org/tx/0x07ef1d9a4d44409832c99a02c89b26f665fab7fe07040e7573ab2b81a1fa8b57), [`0x171e2fc6…`](https://sepolia.basescan.org/tx/0x171e2fc64a0d33b9726a31e3a45654aa47b2ce94b89f83d74d30fe3b327f5020) | [`0x66bd4189…`](https://sepolia.basescan.org/tx/0x66bd41892d411b9be502759fc4259d2bec8821fd818385cc5eabb950589ab2a2), [`0x95e44b46…`](https://sepolia.basescan.org/tx/0x95e44b463cb6cafd4b1c56a9889930c1180d084a5e709ccf410296ca465d1e1b) |
| Outcome | `BLOCK`, merge denied, **0** merge-adapter calls | `PASS`, real merge, commit [`c76c76e0`](https://github.com/Faadil1/Faadil1-skeptara-telegraph/commit/c76c76e0c02dab28275d8e53d70da3f6f132e648) |

Every transaction and commit above is verifiable on Base Sepolia or GitHub. Full evidence chain: `evidence/t4/`.

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

## How it works

```mermaid
flowchart LR
  A[Coding agent proposes<br/>dependency-change PR] --> B["policy.mjs<br/>deterministic risk rubric"]
  B -->|LOW / MEDIUM / HIGH| C["auditor.mjs / seeded-cve-auditor.mjs<br/>separate auditor"]
  C -->|paid CVE_LOOKUP call| D["telegraph-client.mjs<br/>Telegraph engine / x402"]
  D -->|signal + settlement tx| E[(Base Sepolia<br/>eip155:84532)]
  D --> F{Challenge result<br/>PASS / BLOCK / ESCALATE}
  F -->|fresh PASS only| G["merge-gate.mjs<br/>exact-head merge gate"]
  G --> H[Real GitHub merge]
  F -.->|BLOCK / ESCALATE| I[Merge denied<br/>0 merge-adapter calls]
```

Every node above maps to a real file in `src/`; the T4 proof exercises the core path shown here.

```text
agent proposes change
→ external deterministic risk classification
→ risk-proportional challenge
→ PASS / BLOCK / ESCALATE
→ exact-head revalidation
→ protected execution only if still eligible
```

Risk controls scrutiny:

| Tier | Required paths | Demo cap | Evidence status |
| --- | ---: | ---: | --- |
| LOW | 1 | 10,000 atomic USDC | deterministic policy/test-proven |
| MEDIUM | 2 | 20,000 atomic USDC | **live-proven in final T4 cases** |
| HIGH | 3 | 30,000 atomic USDC | deterministic policy/test-proven |

The caps above are Skeptara demo parameters derived from observed testnet pricing. They are **not** a claim that Telegraph pricing is fixed network-wide.

## What was proven live

### Challenged PR #1: BLOCK, no merge call

- target: `lodash@4.17.21`
- risk: `MEDIUM`
- both required Telegraph `CVE_LOOKUP` calls ran, spending the full `$0.02` cap:
  1. `CVE-2026-4800` → `AMBIGUOUS`, did not count toward coverage
  2. `CVE-2026-2950` → `BLOCKING`, affects `lodash <4.18.0`
- result: `BLOCK` (`completed_coverage: 1/2`; one path counted as coverage, both calls were paid)
- protected merge authorization: `DENIED`
- merge-adapter calls: `0`

Evidence:

- `evidence/t4/pr1-block-run-004/REVIEW.md`
- `evidence/t4/pr1-block-run-004/MERGE-DENIAL-REPLAY.md`
- `evidence/trace/FRONTEND-SETTLEMENT-MATRIX-CLARIFICATION.md`

### Clean PR #2: PASS, exact-head real merge

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

## Why Telegraph matters

Skeptara does not hardcode a single intelligence provider. It declares an evidence need and sends paid demand through Telegraph's engine. The final clean challenge observed two routed miners in one `CVE_LOOKUP` challenge. x402 keeps each evidence path economically bounded and observable.

The product-level innovation is the **risk-proportional objection policy + exact execution gate**, not x402 by itself.

## What I owned

- defined the product mechanism around challenge before protected autonomous execution;
- separated proposer behavior from deterministic risk authority;
- designed the risk-proportional scrutiny policy and fail-closed outcomes;
- integrated Telegraph-routed evidence and bounded x402 spend into the challenge path;
- bound execution eligibility to the exact reviewed PR head;
- built negative-path and clean-path evidence showing both denied and permitted execution;
- documented claim boundaries so the project does not overstate what the live proof demonstrates.

## Run the demo

Secret-free captured-live replay:

```bash
npm run demo
```

This command performs **no Telegraph payment and no GitHub write**. It replays persisted live evidence and explicitly labels it as historical.

Local static challenge-dossier UI:

```bash
npm run demo:web
```

Then open `http://127.0.0.1:4173`.

Full Vite + React + TypeScript judge UI:

```bash
cd web
npm ci
npm run dev
```

**Live:** https://skeptara.vercel.app

See `docs/DESIGN.md` for the visual system and `demo/JUDGE_WALKTHROUGH.md` for the judge-facing walkthrough.

## Testing

Deterministic policy/auditor/merge-gate suites run without any paid Telegraph call:

```bash
npm test
npm run test:policy
npm run test:auditor
npm run test:merge-gate
```

## Verified activity subset

The conservative final-proof ledger currently includes:

- 3 real paid challenge runs;
- 5 real paid Telegraph evidence calls;
- 2 observed routed miners;
- `$0.05` observed testnet USDC spend;
- 1 protected challenged action denied;
- 1 real exact-head merge.

See `evidence/activity/ACTIVITY-LEDGER-V0.1.md`.

The landing page's `$0.04 / 4 calls` statistic is scoped to the two final T4 cases only. The ledger above covers a broader verified proof subset.

## Real vs. replayed

The `web/` frontend renders data from two **real, closed** T4 challenge runs. It is not a live stream and does not perform fresh Telegraph calls during page load or replay.

- **PR [#1](https://github.com/Faadil1/Faadil1-skeptara-telegraph/pull/1)**: two real Telegraph `CVE_LOOKUP` calls in their actual order, with two distinct Base Sepolia settlement transactions. Merge denied with 0 merge-adapter calls.
- **PR [#2](https://github.com/Faadil1/Faadil1-skeptara-telegraph/pull/2)**: two real Telegraph calls, two distinct settlement transactions, two advisory findings, then a real exact-head merge under explicit human-bounded authorization.

All four final T4 evidence rows correspond to separate paid calls and separate x402 settlement transactions.

The case pages replay recorded evidence with paced states for legibility. They are labeled **CAPTURED LIVE / HISTORICAL REPLAY** and never presented as fresh execution authorization.

No submission intelligence is mocked. When a contract field is absent, the UI uses an explicit fallback rather than inventing a value.

Neither final T4 case resolved to `ESCALATE`. Earlier development runs did exercise `ESCALATE`, but they are not part of this two-case demo.

## Important claim boundaries

- The final hackathon proof uses **controlled exact CVE seeds** to obtain concrete advisory/range records. It proves challenge enforcement, not automatic discovery of unknown vulnerabilities.
- "Independent challenge" refers to proposer/auditor topology and deterministic external policy. It does **not** claim statistical independence between miners.
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
- Faadil official Discord join/activity: **VERIFIED**
- Faadil Discord organic engagement: **VERIFIED**
- Benita Discord join/activity: **human verification pending**
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
