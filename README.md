# Skeptara — Telegraph Track 3

> **No autonomous merge without an independent challenge.**

Skeptara is a pre-execution safety layer for autonomous coding agents. Before a dependency-change pull request can become execution-eligible, Skeptara applies an **external deterministic risk classification** and buys **Telegraph-routed counter-evidence** under a bounded spend contract.

The reviewed coding agent does **not** score its own risk and does **not** audit itself. Missing coverage, critical ambiguity, stale bindings, or material counter-evidence fail closed.

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
