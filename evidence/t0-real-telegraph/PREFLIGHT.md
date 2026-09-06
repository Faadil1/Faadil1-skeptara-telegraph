# Skeptara T0 — Preflight

Date: 2026-09-06  
Gate: `SKEPTARA_T0_REAL_TELEGRAPH_CHALLENGE`  
Status: **OPEN — LOCAL RUNTIME PROOF REQUIRED**

## Official Telegraph route baseline

The current `telegraphprotocol/telegraph-mcp` README documents:

- Node: `http://13.237.89.59:7044`
- Engine: `http://13.237.89.59:8080`
- Daemon: `http://13.237.89.59:8081`
- free Engine discovery: `GET /v1/subnets`
- paid auto-routed inference: `POST /v1/ask`
- x402 payment handled with a local EVM/Solana private key by the MCP/payment client.

Source: `telegraphprotocol/telegraph-mcp/README.md` as inspected on 2026-09-06.

## Orchestrator-environment probe

A bounded connectivity probe from the ChatGPT execution environment attempted:

- `http://13.237.89.59:8080/v1/subnets`
- `http://13.237.89.59:7044/miner-dispatcher/integrations`

Both returned connection-refused errors from that environment.

This is **not** evidence that Telegraph is globally down. Hosted execution environments can have different network reachability, and T0 explicitly requires proof from the user's approved local/server runtime.

## T0 harness committed

Run `npm install` then `npm run t0` from a personal/approved machine.

The harness:

1. performs free live Engine discovery;
2. refuses to proceed to paid inference if discovery is unreachable;
3. requires `TELEGRAPH_EVM_PRIVATE_KEY` only from the local environment;
4. performs one real x402-paid `/v1/ask` call;
5. writes sanitized runtime evidence under `evidence/t0-real-telegraph/runtime/<timestamp>/`;
6. normalizes one `EvidenceItem` using only fields actually returned;
7. injects a deterministic source-unavailable failure and records `ESCALATE`, proving fail-closed negative semantics.

## Secret boundary

Never paste the burner-wallet private key into ChatGPT, GitHub, screenshots, frontend code, or public logs. `.env` files are gitignored.

## Pass condition still outstanding

T0 is **not PASS** until a local/approved runtime produces:

- reachable live Telegraph discovery;
- one genuine paid challenge response;
- sanitized returned metadata;
- normalized EvidenceItem;
- negative-path evidence;
- persisted evidence reviewed and referenced from canonical state.
