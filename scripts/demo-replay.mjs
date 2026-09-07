import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const readJson = (p) => JSON.parse(fs.readFileSync(path.join(root, p), 'utf8'));

const blocked = readJson('evidence/t4/pr1-block-run-004/reviewed-challenge.sanitized.json');
const clean = readJson('evidence/t4/pr2-clean-run-005/reviewed-challenge.sanitized.json');

const line = (label, value) => console.log(`${label.padEnd(26)} ${value}`);

console.log('\nSKEPTARA — CAPTURED LIVE EVIDENCE / HISTORICAL JUDGE REPLAY');
console.log('This command performs NO Telegraph payment and NO GitHub write.');
console.log('Historical PASS records shown here are not fresh execution authorizations.\n');

console.log('CASE A — CHALLENGED PR');
line('PR', `#${blocked.action_snapshot.pr_number}`);
line('Target', `${blocked.action_snapshot.dependency_changes[0].name}@${blocked.action_snapshot.dependency_changes[0].to}`);
line('Risk', blocked.challenge_result.risk_tier);
line('Evidence mode', blocked.challenge_result.mode);
line('Blocking CVE', blocked.blocking_evidence.seed_cve_id);
line('Routed miner', `${blocked.blocking_evidence.miner_name} (${blocked.blocking_evidence.miner_id})`);
line('Outcome', blocked.challenge_result.outcome);
line('Execution', 'DENIED — merge adapter calls 0');

console.log('\nCASE B — CLEAN PR');
line('PR', `#${clean.pr_number}`);
line('Target', 'lodash@4.18.1');
line('Risk', clean.risk_tier);
line('Coverage', `${clean.completed_coverage}/${clean.required_coverage}`);
line('Routed miners', clean.evidence_items.map((e) => `${e.miner_name} (${e.miner_id})`).join(' + '));
line('Outcome', clean.outcome);
line('Historical expiry', clean.expires_at);
line('Execution', 'REAL MERGE previously executed after exact-head revalidation + explicit bounded authorization');
line('Merge commit', 'c76c76e0c02dab28275d8e53d70da3f6f132e648');

console.log('\nRISK SCALING CLAIM BOUNDARY');
line('LOW', '1 path / 10000 atomic — deterministic policy/test-proven');
line('MEDIUM', '2 paths / 20000 atomic — live-proven in final T4 cases');
line('HIGH', '3 paths / 30000 atomic — deterministic policy/test-proven');

console.log('\nSEED DISCLOSURE');
console.log('The hackathon proof uses controlled exact CVE seeds to obtain concrete advisory/range records.');
console.log('It proves challenge enforcement and evidence normalization, not automatic discovery of unknown vulnerabilities.');

console.log('\nPASS: captured-live two-case narrative reproduced with no payment and no external write.\n');
