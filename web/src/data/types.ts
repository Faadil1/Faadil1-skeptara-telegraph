// Shapes mirror docs/FRONTEND_DATA_CONTRACT.md exactly. Any field the contract
// does not guarantee is typed as optional/nullable — the UI must degrade
// gracefully rather than invent a value when a field is null or missing.

export type RiskTier = "LOW" | "MEDIUM" | "HIGH";
export type Outcome = "PASS" | "BLOCK" | "ESCALATE";
export type Materiality = "BLOCKING" | "ADVISORY" | "AMBIGUOUS";

export interface DependencyChange {
  name: string;
  from: string;
  to: string;
  type?: string;
  security_sensitive?: boolean;
}

export interface ActionSnapshot {
  repository: string;
  pr_number: number;
  head_sha: string;
  base_branch: string;
  changed_files: string[];
  dependency_changes: DependencyChange[];
  security_sensitive_surfaces: string[];
  action_fingerprint: string | null;
}

export interface RiskAssessment {
  risk_tier: RiskTier;
  reason_codes: string[];
  required_evidence_paths: number;
  cross_intent_policy: string | null;
  spend_cap_atomic: number;
  spend_asset: string;
  spend_network: string;
  policy_version: string | null;
}

export interface EvidenceItem {
  challenge_id: string | null;
  intent: string;
  miner_id: string | null;
  miner_name: string | null;
  signal_hash: string | null;
  cost_usd: number | null;
  duration_ms: number | null;
  materiality: Materiality;
  reason_code: string | null;
  coverage_complete: boolean;
  settlement_success: boolean | null;
  settlement_transaction: string | null;
  finding: {
    cve_id?: string | null;
    severity?: string | null;
    cvss_score?: number | null;
    affected_text?: string | null;
    fixed_versions?: string[] | null;
    target_version?: string | null;
    source?: string | null;
  } | null;
  note?: string | null;
}

export interface MergeOutcome {
  merge_authorized: boolean;
  merged: boolean;
  merged_at: string | null;
  merge_commit_sha: string | null;
  human_bounded_authorization: string | null;
  merge_adapter_calls: number | null;
}

export interface ChallengeResult {
  challenge_id: string;
  action_fingerprint: string | null;
  head_sha: string;
  risk_tier: RiskTier;
  required_coverage: number;
  completed_coverage: number;
  spend_cap_atomic: number;
  spend_observed_atomic: number | null;
  outcome: Outcome;
  reason_codes: string[];
  started_at: string | null;
  completed_at: string | null;
  expires_at: string | null;
}

export interface DemoCase {
  id: string;
  label: string;
  sourceEvidencePath: string;
  actionSnapshot: ActionSnapshot;
  riskAssessment: RiskAssessment;
  evidenceItems: EvidenceItem[];
  challengeResult: ChallengeResult;
  mergeOutcome: MergeOutcome;
}
