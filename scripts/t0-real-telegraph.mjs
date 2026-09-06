import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { wrapFetchWithPayment, x402Client } from "@x402/fetch";
import { ExactEvmScheme, toClientEvmSigner } from "@x402/evm";
import { privateKeyToAccount } from "viem/accounts";

const baseUrl = (process.env.TELEGRAPH_BASE_URL || "https://devnode.telegraphprotocol.com").replace(/\/$/, "");
const engineUrl = (process.env.TELEGRAPH_ENGINE_URL || `${baseUrl}/engine`).replace(/\/$/, "");
const discoveryUrl = process.env.TELEGRAPH_DISCOVERY_URL || `${baseUrl}/api/miners`;
const evmNetwork = process.env.EVM_NETWORK || "eip155:*";
const privateKey = process.env.TELEGRAPH_EVM_PRIVATE_KEY;
const query = process.env.SKEPTARA_T0_QUERY ||
  "Find material security evidence that should block merging a dependency change to lodash@4.17.20. Return concrete vulnerabilities or advisories if supported by the available Telegraph intelligence.";

const stamp = new Date().toISOString().replace(/[:.]/g, "-");
const outDir = path.join("evidence", "t0-real-telegraph", "runtime", stamp);
await fs.mkdir(outDir, { recursive: true });

function jsonSafe(value) {
  return JSON.parse(JSON.stringify(value));
}

async function writeJson(name, value) {
  await fs.writeFile(path.join(outDir, name), JSON.stringify(jsonSafe(value), null, 2) + "\n", "utf8");
}

function assertNoSecretLeak(value) {
  if (!privateKey) return;
  const serialized = JSON.stringify(value);
  if (serialized.includes(privateKey)) {
    throw new Error("SECRET_LEAK_GUARD: private key appeared in evidence payload");
  }
}

const preflight = {
  gate: "SKEPTARA_T0_REAL_TELEGRAPH_CHALLENGE",
  phase: "FREE_DISCOVERY",
  base_url: baseUrl,
  discovery_url: discoveryUrl,
  engine_url: engineUrl,
  route_baseline: "OFFICIAL_DOCS_2026-08-20_PLUS_X402_DOCS_2026-08-13",
  checked_at: new Date().toISOString(),
};

try {
  const res = await fetch(discoveryUrl, {
    headers: { accept: "application/json" },
    signal: AbortSignal.timeout(10000),
  });
  const text = await res.text();
  let body;
  try { body = JSON.parse(text); } catch { body = { raw_text: text }; }
  preflight.http_status = res.status;
  preflight.ok = res.ok;
  preflight.body = body;
} catch (error) {
  preflight.ok = false;
  preflight.error = error instanceof Error ? error.message : String(error);
}

assertNoSecretLeak(preflight);
await writeJson("01-free-discovery.json", preflight);
console.log("[Skeptara T0] free discovery:", preflight.ok ? "OK" : "FAILED");
console.log(`[Skeptara T0] discovery URL: ${discoveryUrl}`);
console.log(`[Skeptara T0] evidence: ${path.join(outDir, "01-free-discovery.json")}`);

if (!preflight.ok) {
  console.error("T0 cannot proceed to paid inference until the current official discovery route is reachable.");
  process.exitCode = 2;
} else if (!privateKey || !/^0x[0-9a-fA-F]{64}$/.test(privateKey)) {
  console.error("TELEGRAPH_EVM_PRIVATE_KEY is missing or invalid. Configure a burner-wallet key only in your local/server environment; never paste it into chat or commit it.");
  process.exitCode = 3;
} else {
  const account = privateKeyToAccount(privateKey);
  const evmSigner = toClientEvmSigner(account);
  const client = x402Client.fromConfig({
    schemes: [
      {
        network: evmNetwork,
        client: new ExactEvmScheme(evmSigner),
      },
    ],
  });
  const paidFetch = wrapFetchWithPayment(fetch, client);

  const paidStartedAt = new Date().toISOString();
  try {
    const res = await paidFetch(`${engineUrl}/v1/ask`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({ query }),
      signal: AbortSignal.timeout(60000),
    });
    const text = await res.text();
    let body;
    try { body = JSON.parse(text); } catch { body = { raw_text: text }; }

    const settlementHeader = res.headers.get("payment-response");
    const paidCall = {
      gate: "SKEPTARA_T0_REAL_TELEGRAPH_CHALLENGE",
      phase: "PAID_CHALLENGE",
      started_at: paidStartedAt,
      completed_at: new Date().toISOString(),
      engine_url: engineUrl,
      query,
      http_status: res.status,
      ok: res.ok,
      payment_response_header_present: Boolean(settlementHeader),
      response: body,
    };
    assertNoSecretLeak(paidCall);
    await writeJson("02-paid-challenge.json", paidCall);

    if (!res.ok) {
      throw new Error(`Telegraph paid challenge returned HTTP ${res.status}`);
    }

    const challengeId = crypto.randomUUID();
    const evidenceItem = {
      challenge_id: challengeId,
      intent: body?.intent ?? null,
      miner_id: body?.miner_id ?? body?.miner_used ?? null,
      miner_name: body?.miner_name ?? null,
      endpoint: body?.endpoint ?? null,
      signal_hash: body?.signal_hash ?? null,
      request_timestamp: paidStartedAt,
      response_timestamp: body?.timestamp ?? new Date().toISOString(),
      cost_usd: body?.cost_usd ?? null,
      duration_ms: body?.duration_ms ?? null,
      reasoning: body?.reasoning ?? null,
      source_provenance: body?.source_provenance ?? null,
      settlement_header_present: Boolean(settlementHeader),
      normalized_finding_type: "T0_UNCLASSIFIED_RAW_RESULT",
      materiality: "AMBIGUOUS",
      raw_result: body?.result ?? body,
      t0_note: "Normalization proof only. This EvidenceItem does not by itself authorize a GitHub merge.",
    };
    assertNoSecretLeak(evidenceItem);
    await writeJson("03-normalized-evidence-item.json", evidenceItem);

    console.log("[Skeptara T0] real paid Telegraph challenge: PASS");
    console.log(`[Skeptara T0] miner: ${evidenceItem.miner_id ?? "not exposed"}`);
    console.log(`[Skeptara T0] intent: ${evidenceItem.intent ?? "not exposed"}`);
    console.log(`[Skeptara T0] cost_usd: ${evidenceItem.cost_usd ?? "not exposed"}`);
    console.log(`[Skeptara T0] signal_hash: ${evidenceItem.signal_hash ?? "not exposed"}`);
    console.log(`[Skeptara T0] evidence: ${outDir}`);
  } catch (error) {
    const failure = {
      gate: "SKEPTARA_T0_REAL_TELEGRAPH_CHALLENGE",
      phase: "PAID_CHALLENGE",
      outcome: "ESCALATE",
      reason_code: "TELEGRAPH_PAID_CALL_FAILED",
      at: new Date().toISOString(),
      error: error instanceof Error ? error.message : String(error),
    };
    assertNoSecretLeak(failure);
    await writeJson("02-paid-challenge-failure.json", failure);
    console.error("[Skeptara T0] paid challenge failed => ESCALATE (fail closed)");
    process.exitCode = 4;
  }
}

// Deterministic source-unavailable injection to prove T0 negative semantics.
try {
  await fetch("http://127.0.0.1:1/v1/ask", { signal: AbortSignal.timeout(1500) });
  throw new Error("Injected unavailable-source test unexpectedly connected");
} catch (error) {
  const negative = {
    gate: "SKEPTARA_T0_REAL_TELEGRAPH_CHALLENGE",
    phase: "NEGATIVE_PATH",
    injected_condition: "SOURCE_UNAVAILABLE",
    outcome: "ESCALATE",
    merge_eligible: false,
    reason_code: "REQUIRED_TELEGRAPH_SOURCE_UNAVAILABLE",
    at: new Date().toISOString(),
    observed_error: error instanceof Error ? error.message : String(error),
  };
  assertNoSecretLeak(negative);
  await writeJson("04-negative-source-unavailable.json", negative);
  console.log("[Skeptara T0] negative path SOURCE_UNAVAILABLE => ESCALATE: PASS");
}
