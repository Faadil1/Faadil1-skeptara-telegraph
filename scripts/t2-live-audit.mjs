import fs from "node:fs/promises";
import path from "node:path";
import { canonicalizeAction } from "../src/policy.mjs";
import { runIndependentAudit, sanitizeAuditOutput } from "../src/auditor.mjs";
import { createTelegraphAdapter, discoverTelegraphCapabilities } from "../src/telegraph-client.mjs";

const privateKey = process.env.TELEGRAPH_EVM_PRIVATE_KEY;
const actionFile = process.env.SKEPTARA_T2_ACTION_FILE || "demo/actions/clean-pr.json";
const stamp = new Date().toISOString().replace(/[:.]/g, "-");
const outDir = path.join("evidence", "t2-runtime", stamp);
await fs.mkdir(outDir, { recursive: true });

if (!privateKey) {
  console.error("TELEGRAPH_EVM_PRIVATE_KEY is required locally. Use scripts/t2-from-clipboard.ps1; never paste the key into chat or commit it.");
  process.exit(3);
}

let actionInput;
try {
  actionInput = JSON.parse(await fs.readFile(actionFile, "utf8"));
} catch (error) {
  console.error(`Could not read T2 action file ${actionFile}: ${error instanceof Error ? error.message : String(error)}`);
  process.exit(3);
}

const actionSnapshot = canonicalizeAction(actionInput);
const capabilities = await discoverTelegraphCapabilities();
await fs.writeFile(
  path.join(outDir, "01-capabilities.json"),
  JSON.stringify({
    checked_at: capabilities.checked_at,
    base_url: capabilities.base_url,
    intents: capabilities.intents,
    observations: capabilities.observations.map((item) => ({ url: item.url, http_status: item.http_status, ok: item.ok, error: item.error ?? null })),
  }, null, 2) + "\n",
  "utf8",
);

console.log(`[Skeptara T2] action: ${actionSnapshot.repository}#${actionSnapshot.pr_number} @ ${actionSnapshot.head_sha.slice(0, 12)}`);
console.log(`[Skeptara T2] live intents discovered: ${capabilities.intents.join(", ") || "none"}`);

const adapter = createTelegraphAdapter({ privateKey });
const output = await runIndependentAudit({ actionInput: actionSnapshot, availableIntents: capabilities.intents, adapter });
const sanitized = sanitizeAuditOutput(output);
await fs.writeFile(path.join(outDir, "02-audit-result.json"), JSON.stringify(sanitized, null, 2) + "\n", "utf8");

const result = output.challenge_result;
console.log(`[Skeptara T2] risk: ${result.risk_tier}`);
console.log(`[Skeptara T2] coverage: ${result.completed_coverage}/${result.required_coverage}`);
console.log(`[Skeptara T2] spend: ${result.spend_observed_atomic}/${result.spend_cap_atomic} atomic USDC`);
for (const item of result.evidence_items) {
  console.log(`[Skeptara T2] evidence: ${item.intent ?? item.desired_intent} | ${item.materiality} | ${item.reason_code} | cost=${item.cost_usd ?? "n/a"}`);
}
console.log(`[Skeptara T2] outcome: ${result.outcome}`);
console.log(`[Skeptara T2] reasons: ${result.reason_codes.join(", ")}`);
console.log(`[Skeptara T2] evidence dir: ${outDir}`);

if (result.outcome === "ESCALATE") process.exitCode = 4;
