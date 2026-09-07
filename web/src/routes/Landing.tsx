import { Link } from "react-router-dom";
import { challengedCase, cleanCase, demoCases, atomicToUsd } from "../data/cases";
import { VerdictBadge } from "../components/VerdictBadge";
import "./Landing.css";

const HERO_LINES = [
  { cmd: true, text: "skeptara check --pr 1 --repo Faadil1/Faadil1-skeptara-telegraph" },
  { cmd: false, text: "risk_tier: MEDIUM  required_evidence_paths: 2" },
  { cmd: false, text: "telegraph: CVE_LOOKUP → SecWire CVE Lookup ($0.01, settled)" },
  { cmd: false, text: "finding: CVE-2026-2950 · lodash <4.18.0 · BLOCKING" },
  { cmd: false, text: "verdict: BLOCK · merge denied · 0 write calls", verdict: "block" as const },
];

const totalSpendUsd = demoCases.reduce(
  (sum, c) => sum + (c.challengeResult.spend_observed_atomic != null ? atomicToUsd(c.challengeResult.spend_observed_atomic) : 0),
  0,
);
const totalEvidenceCalls = demoCases.reduce((sum, c) => sum + c.evidenceItems.length, 0);
const blockCount = demoCases.filter((c) => c.challengeResult.outcome === "BLOCK").length;
const passCount = demoCases.filter((c) => c.challengeResult.outcome === "PASS").length;

// Real identifiers pulled from the closed runs — miners, intents, policy/auditor
// versions actually used. Not a decorative filler list.
const marqueeItems = Array.from(
  new Set([
    ...demoCases.flatMap((c) => c.evidenceItems.map((e) => e.miner_name).filter(Boolean)),
    ...demoCases.flatMap((c) => c.evidenceItems.map((e) => e.intent)),
    challengedCase.riskAssessment.policy_version,
    "skeptara-auditor-v0.4-seeded-cve",
    "eip155:84532",
    "PR #1 · BLOCK",
    "PR #2 · PASS",
  ]),
) as string[];

function StatColumn({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="stat-col">
      <span className="stat-col__label mono">
        <span className="stat-col__dot" aria-hidden="true" />
        {label}
      </span>
      <span className="stat-col__value mono">{value}</span>
      {hint && <span className="stat-col__hint mono">{hint}</span>}
    </div>
  );
}

function CaseCard({
  to,
  eyebrow,
  title,
  target,
  outcome,
  summary,
}: {
  to: string;
  eyebrow: string;
  title: string;
  target: string;
  outcome: "PASS" | "BLOCK";
  summary: string;
}) {
  return (
    <Link to={to} className="case-card">
      <div className="case-card__top">
        <span className="case-card__eyebrow mono">{eyebrow}</span>
        <VerdictBadge outcome={outcome} />
      </div>
      <h3 className="case-card__title">{title}</h3>
      <p className="case-card__target mono">{target}</p>
      <p className="case-card__summary">{summary}</p>
    </Link>
  );
}

export function Landing() {
  return (
    <div className="landing">
      <div className="landing__hero">
        <div className="landing__glow" aria-hidden="true" />
        <p className="landing__eyebrow mono">telegraph protocol · track 3 · two real closed runs below</p>
        <h1 className="landing__wordmark">Skeptara</h1>
        <p className="landing__tagline">Independent Counter-Evidence, Before Merge</p>
        <p className="landing__thesis">
          Higher-risk autonomous changes must survive deeper, independently paid
          counter-evidence before a merge can execute.
        </p>

        <div className="terminal">
          <div className="terminal__bar">
            <span className="terminal__dot" />
            <span className="terminal__dot" />
            <span className="terminal__dot" />
            <span className="terminal__bar-title mono">skeptara — independent challenge</span>
          </div>
          <div className="terminal__body mono">
            {HERO_LINES.map((line, i) => (
              <div
                key={i}
                className={`terminal__line ${line.cmd ? "terminal__line--cmd" : ""} ${
                  line.verdict ? `terminal__line--${line.verdict}` : ""
                }`}
              >
                {line.cmd ? <span className="terminal__prompt">$ </span> : null}
                {line.text}
              </div>
            ))}
          </div>
        </div>

        <div className="stat-row-3">
          <StatColumn label="real spend observed" value={`$${totalSpendUsd.toFixed(2)}`} hint="USDC · base sepolia" />
          <StatColumn label="real telegraph calls" value={String(totalEvidenceCalls)} hint="CVE_LOOKUP" />
          <StatColumn label="closed runs" value={`${blockCount} block · ${passCount} pass`} hint="0 escalate (yet)" />
        </div>
      </div>

      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="marquee__item">
              {item}
            </span>
          ))}
        </div>
      </div>

      <section className="landing__cases">
        <h2 className="landing__section-title">Two real closed runs</h2>
        <p className="landing__section-note">
          Both cases below ran against real Telegraph miners on Base Sepolia. Nothing here is
          simulated to fit the story — the challenged case really blocked, the clean case really merged.
        </p>
        <div className="landing__case-grid">
          <CaseCard
            to="/case/pr1"
            eyebrow="PR #1 · challenged"
            title="lodash upgrade with a known vulnerability"
            target="4.17.20 → 4.17.21"
            outcome={challengedCase.challengeResult.outcome as "BLOCK"}
            summary="Independent challenge found blocking counter-evidence on the first completed path and stopped — merge stayed denied."
          />
          <CaseCard
            to="/case/pr2"
            eyebrow="PR #2 · clean"
            title="lodash upgrade past the vulnerable range"
            target="4.17.20 → 4.18.1"
            outcome={cleanCase.challengeResult.outcome as "PASS"}
            summary="Required coverage completed with no blocking evidence — merge was authorized and actually executed."
          />
        </div>
      </section>

      <section className="landing__escalate">
        <div className="landing__escalate-top">
          <VerdictBadge outcome="ESCALATE" />
          <h2 className="landing__section-title landing__escalate-title">A third outcome exists — it just hasn't fired yet</h2>
        </div>
        <p className="landing__section-note">
          <span className="mono">ESCALATE</span> fires when required coverage can't be completed — budget
          exhausted, a source unavailable, or a critical finding too ambiguous to resolve automatically.
          Both demo runs happened to resolve cleanly into a real <span className="mono">BLOCK</span> or{" "}
          <span className="mono">PASS</span>. No real Skeptara run has hit <span className="mono">ESCALATE</span>{" "}
          yet, so there is no case card for it here — showing one would mean inventing a run that never
          happened.
        </p>
      </section>
    </div>
  );
}
