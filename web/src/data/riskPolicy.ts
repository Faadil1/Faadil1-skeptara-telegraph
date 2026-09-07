// Deterministic rubric parameters — not case data. Sourced from product/PRD.md §7
// (MVP risk rubric) and docs/FRONTEND_DATA_CONTRACT.md (observed T0 spend caps:
// LOW $0.01, MEDIUM $0.02, HIGH $0.03). These are policy constants the reviewed
// agent cannot edit at runtime, shown here for reference — not derived from either
// closed run (both closed runs happen to be MEDIUM).

import type { RiskTier } from "./types";

export interface RiskTierPolicy {
  tier: RiskTier;
  requiredPaths: number;
  spendCapUsd: number;
}

export const riskTierPolicy: RiskTierPolicy[] = [
  { tier: "LOW", requiredPaths: 1, spendCapUsd: 0.01 },
  { tier: "MEDIUM", requiredPaths: 2, spendCapUsd: 0.02 },
  { tier: "HIGH", requiredPaths: 3, spendCapUsd: 0.03 },
];
