import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { wrapFetchWithPaymentFromConfig } from "@x402/fetch";
import { ExactEvmScheme, toClientEvmSigner } from "@x402/evm";
import { privateKeyToAccount } from "viem/accounts";

const baseUrl = (process.env.TELEGRAPH_BASE_URL || "https://devnode.telegraphprotocol.com").replace(/\/$/, "");
const engineUrl = (process.env.TELEGRAPH_ENGINE_URL || `${baseUrl}/engine`).replace(/\/$/, "");
const discoveryUrl = process.env.TELEGRAPH_DISCOVERY_URL || `${baseUrl}/api/miners`;
const evmNetwork = process.env.EVM_NETWORK || "eip155:84532";
const rawPrivateKey = process.env.TELEGRAPH_EVM_PRIVATE_KEY;
const maxPaymentAtomic = BigInt(process.env.SKEPTARA_T0_MAX_PAYMENT_ATOMIC || "100000"); // 0.10 USDC max per call.
const query = process.env.SKEPTARA_T0_QUERY ||
  "Find material security evidence that should block merging a dependency change to lodash@4.17.20. Return concrete vulnerabilities or advisories if supported by the available Telegraph intelligence.";

function normalizePrivateKey(value) {
  if (!value) return null;
  let normalized = value.trim();
  if (
    (normalized.startsWith('"') && normalized.endsWith('"')) ||
    (normalized.startsWith("'") && normalized.endsWith("'"))
  ) {
    normalized = normalized.slice(1, -1).trim();
  }
  if (/^[0-9a-fA-F]{64}$/.test(normalized)) {
    normalized = `0x${normalized}`;
  }
  return normalized;
}

const privateKey = normalizePrivateKey(rawPrivateKey);

if (evmNetwork !== "eip155:84532") {
  throw new Error("T0_NETWORK_GUARD: Skeptara T0 permits Base Sepolia only (eip155:84532).");
}
if (maxPaymentAtomic <= 0n || maxPaymentAtomic > 100000n) {
  throw new Error("T0_PAYMENT_CAP_GUARD: max payment must be between 1 and 100000 atomic USDC (<= $0.10).");
}

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
  const serialized = JSON.stringify(value);
  for (const candidate of [rawPrivateKey, privateKey]) {
    if (candidate && serialized.includes(candidate)) {
      throw new Error("SECRET_LEAK_GUARD: private key appeared in evidence payload");
    }
  }
}

async function parseResponseBody(res) {
  const text = await res.text();
  if (!text) return null;
  try { return JSON.parse(text); } catch { return { raw_text: text }; }
}

const preflight = {
  gate: "SKEPTARA_T0_REAL_TELEGRAPH_CHALLENGE",
  phase: "FREE_DISCOVERY",
  base_url: baseUrl,
  discovery_url: discoveryUrl,
  engine_url: engineUrl,
  payment_network: evmNetwork,
  payment_cap_atomic: maxPaymentAtomic.toString(),
  route_baseline: "CURRENT_DEVNODE_HTTPS",
  checked_at: new Date().toISOString(),
};

try {
  const res = await fetch(discoveryUrl, {
    headers: { accept: "application/json" },
    signal: AbortSignal.timeout(10000),
  });
  preflight.http_status = res.status;
  preflight.ok = res.ok;
  preflight.body = await parseResponseBody(res);
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
  console.error("T0 cannot proceed to paid inference until the current discovery route is reachable.");
  process.exitCode = 2;
} else if (!privateKey || !/^0x[0-9a-fA-F]{64}$/.test(privateKey)) {
  const rawLength = typeof rawPrivateKey === "string" ? rawPrivateKey.trim().length : 0;
  console.error(
    `TELEGRAPH_EVM_PRIVATE_KEY is present but not a valid EVM private key (observed trimmed length: ${rawLength}; expected 64 hex chars, optionally prefixed with 0x). ` +
    "Use the exported private key of the burner EVM account, not the wallet password, address, or recovery phrase. Never paste the key into chat or commit it.",
  );
  process.exitCode = 3;
} else {
  const account = privateKeyToAccount(privateKey);
  const paidFetch = wrapFetchWithPaymentFromConfig(fetch, {
    schemes: [
      {
        network: evmNetwork,
        client: new ExactEvmScheme(toClientEvmSigner(account)),
      },
    ],
    policies: [
      (_version, requirements) =>
        requirements.filter(
          (requirement) =>
            requirement.network === evmNetwork &&
            /^\d+$/.test(requirement.amount) &&
            BigInt(requirement.amount) <= maxPaymentAtomic,
        ),
    ],
  });

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
    const body = await parseResponseBody(res);

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
