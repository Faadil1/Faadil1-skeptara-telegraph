# Skeptara — Living Product Requirements Document

Version: **0.1**  
Status: **DRAFT — HUMAN LOCK REQUIRED**  
Date: **2026-09-06**  
Hackathon: **Telegraph Protocol 2026 — Track 3 Application**

## 1. Product intent

Skeptara prevents a bounded autonomous GitHub merge from executing until an independent evidence challenge has completed. The amount and breadth of counter-evidence required scales with an externally assigned risk tier.

The product does not ask an agent to merely critique itself. The proposed action, risk classification, evidence acquisition, challenge evaluation, and final execution gate are separated so that the reviewed agent cannot lower its own scrutiny or silently bypass the challenge.

### Product thesis

> The greater the downside of being wrong, the more independent paid counter-evidence an autonomous action must survive before execution is possible.

## 2. Why this exists

Autonomous agents are increasingly capable of taking irreversible or high-impact actions. A common pattern is to ask the same model for more confidence, self-critique, or majority confirmation. That can preserve correlated blind spots and turns verification into compliance theater.

Skeptara makes the presumption run against execution:

- the reviewed agent cannot assign its own risk tier;
- the reviewed agent cannot serve as its own auditor;
- required challenge coverage increases with risk;
- evidence is acquired through real Telegraph intelligence calls;
- incomplete coverage or budget exhaustion before required coverage is fail-closed;
- only a passed challenge can unlock the bounded real action.

## 3. Hackathon-native advantage

Skeptara uses Telegraph as an economic intelligence network, not as a decorative API wrapper. Risk tier changes the required evidence depth and therefore the amount and diversity of Telegraph intelligence consumed.

For the MVP, Telegraph/x402 must be visible through real paid challenge activity and recorded provenance. No mocked miner intelligence may be used to claim the submission path works.

## 4. Hero vertical

### Autonomous dependency-change merge

A coding agent proposes a GitHub pull request that changes one or more dependencies. Skeptara independently assesses the change category, assigns a deterministic risk tier, acquires counter-evidence, and decides whether merge execution is unlocked.

The demo must contain at least two real cases:

1. **Clean case** — required challenge coverage completes with no material blocking evidence; the allow-listed PR can be merged.
2. **Challenged case** — material external counter-evidence is found or required coverage cannot be completed; merge remains technically blocked.

## 5. Users

### Primary
- builder/operator supervising autonomous coding agents;
- hackathon judge evaluating whether an autonomous action was genuinely gated by Telegraph intelligence.

### Secondary
- teams experimenting with bounded autonomous code maintenance.

## 6. Core workflow

1. A PR is proposed in an allow-listed demo repository.
2. Skeptara canonicalizes the proposed action (`repo`, `pr_number`, `head_sha`, `base_branch`, material file/dependency changes).
3. A deterministic external rubric assigns `LOW`, `MEDIUM`, or `HIGH` risk.
4. The risk tier maps to a challenge contract: minimum evidence paths, preferred intent diversity, and spend ceiling.
5. An independent auditor acquires Telegraph counter-evidence with the explicit objective of finding material reasons not to merge.
6. Each evidence acquisition is recorded with the real metadata actually exposed by Telegraph/x402 (never fabricated receipts or hashes).
7. A deterministic challenge gate evaluates coverage and material findings.
8. Outcomes:
   - `PASS`: challenge contract completed and no material blocking evidence found.
   - `BLOCK`: material counter-evidence found.
   - `ESCALATE`: required coverage could not be completed, budget exhausted early, source unavailable, ambiguous critical finding, or runtime safety condition triggered.
9. Only `PASS` can unlock the bounded GitHub merge executor.

## 7. MVP risk rubric

The reviewed coding agent cannot edit this rubric at runtime.

### LOW
Typical examples:
- documentation-only edits;
- copy/text changes;
- non-functional cosmetic UI edits.

Minimum challenge:
- 1 external evidence path;
- minimal spend ceiling.

### MEDIUM
Typical examples:
- dependency version changes;
- API surface changes;
- schema/data-model changes;
- build configuration changes.

Minimum challenge:
- at least 2 evidence paths;
- prefer distinct Telegraph intents where supported;
- larger spend ceiling than LOW.

### HIGH
Typical examples:
- authentication/authorization;
- payment logic;
- secrets handling;
- deployment/infra permissions;
- CI/CD workflow permissions;
- security-sensitive dependencies.

Minimum challenge:
- at least 3 evidence paths;
- cross-intent coverage required where live Telegraph support permits;
- highest MVP spend ceiling;
- critical ambiguity escalates rather than passes.

Exact monetary caps remain implementation parameters until T0 establishes live Telegraph cost behavior.

## 8. Counter-evidence contract

The independent challenge is not "ask another model to disagree." It must seek externally sourced evidence relevant to the proposed change.

Candidate Telegraph intents include, subject to live availability during T0:
- `CVE_LOOKUP`
- `WEB_SEARCH`
- `NEWS_SEARCH`
- `FACT_CHECK`
- `URL_SCAN`
- other live intents shown to be materially relevant to dependency or supply-chain risk.

The implementation must discover and record what is actually available rather than hard-code unsupported claims.

## 9. Independence requirements

For MVP:
- the constructor/proposer and auditor are separate components;
- the auditor does not receive persuasive chain-of-thought or self-justification from the constructor;
- the auditor receives the canonical action facts needed to investigate the change;
- risk tier is assigned by deterministic rubric outside the reviewed agent;
- final PASS/BLOCK/ESCALATE rules are deterministic around required coverage and critical findings.

Model-provider diversity may strengthen independence later, but access to a different model is not treated as the product moat.

## 10. Execution enforcement

The merge gate must be enforceable in code, not merely displayed in the UI.

A merge request is eligible only when:
- repository and PR are allow-listed;
- challenge result is `PASS`;
- result binds to the exact `head_sha` / action snapshot reviewed;
- result is fresh within the configured validity period;
- the PR has not materially changed since challenge;
- protected GitHub credentials stay server-side;
- no safety override condition is present.

Any mismatch is fail-closed.

## 11. Evidence record

Each challenge run should record:
- challenge ID;
- canonical action hash or stable action fingerprint;
- repo / PR / head SHA;
- assigned risk tier and rubric reasons;
- required evidence coverage;
- Telegraph intent/miner/provider metadata actually exposed;
- query timestamp;
- real call cost/spend metadata actually exposed;
- normalized finding category;
- source/provenance fields actually exposed;
- outcome: PASS / BLOCK / ESCALATE;
- reason codes;
- expiry/freshness window.

No fabricated transaction hash, miner score, settlement receipt, independence claim, or source provenance is permitted.

## 12. Functional requirements

### FR-1 Action intake
Given an allow-listed GitHub PR, Skeptara can retrieve or receive the canonical facts required for review.

### FR-2 Deterministic risk tier
Given the canonical change facts, Skeptara assigns a reproducible risk tier from the external rubric.

### FR-3 Challenge contract
Each risk tier produces deterministic minimum evidence requirements and a bounded spend ceiling.

### FR-4 Real Telegraph evidence
The auditor can execute at least one real Telegraph challenge call during T0 and later acquire the required evidence paths for the demo.

### FR-5 Fail-closed semantics
Missing required coverage, unavailable required intelligence, exhausted budget before coverage, stale action binding, or critical ambiguity cannot produce PASS.

### FR-6 Independent audit topology
The constructor cannot directly set risk, challenge completion, or final gate outcome.

### FR-7 Merge enforcement
The merge executor cannot execute an allow-listed PR unless the exact reviewed action has a fresh PASS.

### FR-8 Two-case demo
The project can replay one PASS case and one BLOCK/ESCALATE case with real evidence.

### FR-9 Observable economic behavior
The demo shows that higher risk produces a deeper challenge requirement and correspondingly greater real Telegraph usage, subject to live capability and cost constraints.

## 13. Non-functional requirements

- Secrets server-side/local only.
- No production-user repository access required for demo.
- Deterministic policy tests must run without paid Telegraph calls.
- Live evidence paths must be clearly distinguished from fixtures used solely for local UI/test development.
- Every protected external write must be bounded and replay-safe where practical.
- UI must communicate risk, challenge progress, evidence, and PASS/BLOCK/ESCALATE within a judge-readable path.

## 14. Explicit non-goals for hackathon MVP

- generalized governance framework for every agent action;
- insurance/surety pool;
- formal Bayesian/EVSI optimization;
- proof that Telegraph miners are statistically independent;
- automatic estimation of monetary cost-of-being-wrong by the reviewed LLM;
- production-grade enterprise GitHub App permission model;
- mainnet/user-capital actions;
- universal execution-warrant standard.

## 15. Success criteria

### Technical
- T0 proves real Telegraph paid challenge path.
- Deterministic risk rubric tests pass.
- Challenge gate fails closed under negative paths.
- PASS is bound to exact PR head SHA/action snapshot.
- Real allow-listed PASS merge works.
- Real allow-listed challenged PR remains blocked.

### Product/judge path
Within approximately 10 seconds the demo should make legible:

> Higher-risk autonomous code changes must spend more effort trying to find evidence against themselves before they can merge.

### Hackathon
- real Telegraph miner usage;
- no mocked submission intelligence;
- visible challenge activity/provenance;
- functioning autonomous workflow;
- concise public narrative and demo.

## 16. Metrics

MVP metrics:
- challenge runs;
- Telegraph calls per risk tier;
- visible Telegraph spend per risk tier where exposed;
- challenge completion rate;
- BLOCK/ESCALATE rate;
- action-pass rate;
- false-PASS regressions found by fixed test cases;
- median challenge latency.

Experimental metrics after MVP:
- Dissent Spend Ratio;
- Challenge Survival Rate;
- evidence-path diversity;
- incremental counter-evidence yield by additional spend.

## 17. Product risks

1. Telegraph live intents needed for dependency-security evidence may be unavailable or weak.
   - Mitigation: T0 capability discovery before UI/deep build; vertical may narrow based on live miners without changing the core product intent.
2. x402 settlement metadata exposed to the client may be insufficient for rich receipts.
   - Mitigation: record only verifiable fields actually exposed.
3. "Independent auditor" may still rely on correlated sources.
   - Mitigation: claim component/context separation and source diversity only when evidenced; do not claim statistical independence.
4. Risk rubric can misclassify changes.
   - Mitigation: deterministic explicit rules, HIGH on security-sensitive surfaces, fail-closed ambiguity.
5. Time remaining is short.
   - Mitigation: one vertical, two demo cases, no generic framework, no over-engineered cryptographic warrant.

## 18. Living PRD policy

This PRD is the canonical product-intent source while present.

Discoveries are classified as:
- `execution_detail` — update derived implementation artifacts only;
- `product_clarification` — clarify PRD without changing core intent;
- `material_product_change` — requires human/product-source approval before Spec Kit reconciliation;
- `post_build_evolution` — record for later unless required for hackathon viability.

After an approved material change, propagation order is:
1. update this PRD and preserve revision history;
2. reconcile product reality/canonical state;
3. reconcile `spec-kit/spec.md`;
4. reconcile plan/tasks/checklists/convergence;
5. continue implementation.

Code must never silently override this document.

## 19. Decisions already rejected

- Generic SignalLatch-style pre-execution verification gate: insufficient differentiation.
- Generic DecisionWarrant/execution-warrant framework: crowded pattern and infrastructure trap.
- Treasury/DeFi guard vertical: crowded and too ambitious for remaining time.
- Same-agent self-falsification: rejected because the reviewed agent must not be its own adversary.
- Majority-vote-as-core: rejected; the challenge seeks material counter-evidence and required coverage, not simple consensus.

## 20. Open questions gated by T0

- Which relevant Telegraph intents/miners are live and reliable now?
- What exact cost/settlement metadata is returned to our integration?
- Can live Telegraph evidence support dependency/security challenge strongly enough for the hero vertical?
- What bounded spend caps are practical for LOW/MEDIUM/HIGH during the hackathon?

These are implementation-discovery questions unless they force a material change to the hero vertical or product mechanism.

## 21. Next approval

Human project owner review of PRD v0.1.

Approval promotes state to `PRD_READY` and opens reconciliation of derived Spec Kit artifacts followed by `SKEPTARA_T0_REAL_TELEGRAPH_CHALLENGE`.
