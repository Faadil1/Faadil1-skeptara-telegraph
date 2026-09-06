import { wrapFetchWithPayment, x402Client } from "@x402/fetch";
import { ExactEvmScheme, toClientEvmSigner } from "@x402/evm";
import { privateKeyToAccount } from "viem/accounts";

export const DEFAULT_TELEGRAPH_BASE_URL = "https://devnode.telegraphprotocol.com";
export const DEFAULT_EVM_NETWORK = "eip155:84532";

function normalizePrivateKey(value) {
  if (!value) return null;
  let normalized = String(value).trim();
  if (
    (normalized.startsWith('"') && normalized.endsWith('"')) ||
    (normalized.startsWith("'") && normalized.endsWith("'"))
  ) {
    normalized = normalized.slice(1, -1).trim();
  }
  if (/^[0-9a-fA-F]{64}$/.test(normalized)) normalized = `0x${normalized}`;
  return normalized;
}

function decodeBase64JsonHeader(value) {
  if (!value) return null;
  try {
    return JSON.parse(Buffer.from(value, "base64").toString("utf8"));
  } catch (error) {
    return {
      decode_error: error instanceof Error ? error.message : String(error),
      encoded_length: value.length,
    };
  }
}

async function parseResponseBody(res) {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return { raw_text: text };
  }
}

function requestInit(query, desiredIntent) {
  const intentPrefix = desiredIntent ? `Requested evidence mode: ${desiredIntent}. ` : "";
  return {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({ query: `${intentPrefix}${query}` }),
    signal: AbortSignal.timeout(60000),
  };
}

function collectIntentNames(value, out = new Set()) {
  if (Array.isArray(value)) {
    for (const item of value) collectIntentNames(item, out);
    return out;
  }
  if (!value || typeof value !== "object") return out;

  for (const key of ["intent", "intent_name", "intentName"]) {
    if (typeof value[key] === "string" && /^[A-Z][A-Z0-9_]+$/.test(value[key])) out.add(value[key]);
  }
  for (const key of ["intents", "supported_intents", "supportedIntents"]) {
    if (Array.isArray(value[key])) {
      for (const item of value[key]) {
        if (typeof item === "string" && /^[A-Z][A-Z0-9_]+$/.test(item)) out.add(item);
        else collectIntentNames(item, out);
      }
    }
  }

  for (const nested of Object.values(value)) {
    if (nested && typeof nested === "object") collectIntentNames(nested, out);
  }
  return out;
}

export async function discoverTelegraphCapabilities({
  baseUrl = DEFAULT_TELEGRAPH_BASE_URL,
  fetchImpl = fetch,
} = {}) {
  const cleanBase = baseUrl.replace(/\/$/, "");
  const endpoints = [
    `${cleanBase}/engine/v1/intents`,
    `${cleanBase}/api/miners`,
  ];
  const observations = [];
  const intentSet = new Set();

  for (const url of endpoints) {
    try {
      const res = await fetchImpl(url, {
        headers: { accept: "application/json" },
        signal: AbortSignal.timeout(10000),
      });
      const body = await parseResponseBody(res);
      observations.push({ url, http_status: res.status, ok: res.ok, body });
      if (res.ok) collectIntentNames(body, intentSet);
    } catch (error) {
      observations.push({
        url,
        http_status: null,
        ok: false,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  return {
    checked_at: new Date().toISOString(),
    base_url: cleanBase,
    intents: [...intentSet].sort(),
    observations,
  };
}

export function createTelegraphAdapter({
  privateKey,
  baseUrl = DEFAULT_TELEGRAPH_BASE_URL,
  evmNetwork = DEFAULT_EVM_NETWORK,
  fetchImpl = fetch,
} = {}) {
  const normalizedKey = normalizePrivateKey(privateKey);
  if (!normalizedKey || !/^0x[0-9a-fA-F]{64}$/.test(normalizedKey)) {
    throw new TypeError("valid burner EVM private key required locally");
  }
  if (evmNetwork !== DEFAULT_EVM_NETWORK) {
    throw new Error(`TELEGRAPH_NETWORK_GUARD: expected ${DEFAULT_EVM_NETWORK}`);
  }

  const cleanBase = baseUrl.replace(/\/$/, "");
  const engineAskUrl = `${cleanBase}/engine/v1/ask`;
  const account = privateKeyToAccount(normalizedKey);
  const client = x402Client.fromConfig({
    schemes: [
      {
        network: evmNetwork,
        client: new ExactEvmScheme(toClientEvmSigner(account)),
      },
    ],
  });
  const paidFetch = wrapFetchWithPayment(fetchImpl, client);

  return {
    network: evmNetwork,
    async ask({ query, desiredIntent, maxPaymentAtomic }) {
      if (!query) throw new TypeError("query required");
      const cap = Number(maxPaymentAtomic);
      if (!Number.isInteger(cap) || cap <= 0 || cap > 100000) {
        const err = new Error("invalid per-path payment cap");
        err.code = "PAYMENT_CAP_INVALID";
        throw err;
      }

      const quoteRes = await fetchImpl(engineAskUrl, requestInit(query, desiredIntent));
      const quoteBody = await parseResponseBody(quoteRes);
      const requiredHeader = quoteRes.headers.get("payment-required");
      const paymentRequired = decodeBase64JsonHeader(requiredHeader);

      if (quoteRes.status !== 402 || !paymentRequired || !Array.isArray(paymentRequired.accepts)) {
        const err = new Error(`expected x402 quote, received HTTP ${quoteRes.status}`);
        err.code = "X402_QUOTE_INVALID";
        err.http_status = quoteRes.status;
        err.response = quoteBody;
        throw err;
      }

      const requirement = paymentRequired.accepts.find((candidate) =>
        candidate &&
        candidate.scheme === "exact" &&
        candidate.network === evmNetwork &&
        typeof candidate.amount === "string" &&
        /^\d+$/.test(candidate.amount) &&
        Number(candidate.amount) <= cap
      );

      if (!requirement) {
        const err = new Error(`no bounded ${evmNetwork} x402 requirement at or below ${cap} atomic USDC`);
        err.code = "NO_ELIGIBLE_BOUNDED_PAYMENT_REQUIREMENT";
        err.payment_required = paymentRequired;
        throw err;
      }

      const startedAt = new Date().toISOString();
      const res = await paidFetch(engineAskUrl, requestInit(query, desiredIntent));
      const body = await parseResponseBody(res);
      const settlementHeader = res.headers.get("payment-response");
      const decodedSettlement = decodeBase64JsonHeader(settlementHeader);

      if (!res.ok) {
        const reason = decodedSettlement?.errorReason || decodedSettlement?.errorMessage || `HTTP_${res.status}`;
        const err = new Error(`Telegraph paid challenge failed: ${reason}`);
        err.code = "TELEGRAPH_PAID_CALL_FAILED";
        err.http_status = res.status;
        err.payment_response = decodedSettlement;
        err.response = body;
        throw err;
      }

      return {
        started_at: startedAt,
        completed_at: new Date().toISOString(),
        quote_amount_atomic: Number(requirement.amount),
        payment_required: paymentRequired,
        payment_response: decodedSettlement,
        response: body,
      };
    },
  };
}
