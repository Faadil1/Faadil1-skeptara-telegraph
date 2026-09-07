import { Link } from "react-router-dom";
import { challengedCase, cleanCase } from "../data/cases";
import { VerdictBadge } from "../components/VerdictBadge";
import "./Landing.css";

const HERO_LINES = [
  { cmd: true, text: "skeptara check --pr 1 --repo Faadil1/Faadil1-skeptara-telegraph" },
  { cmd: false, text: "risk_tier: MEDIUM  required_evidence_paths: 2" },
  { cmd: false, text: "telegraph: CVE_LOOKUP → SecWire CVE Lookup ($0.01, settled)" },
  { cmd: false, text: "finding: CVE-2026-2950 · lodash <4.18.0 · BLOCKING" },
  { cmd: false, text: "verdict: BLOCK · merge denied · 0 write calls", verdict: "block" as const },
];

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
        <p className="landing__thesis">
          Higher-risk autonomous code changes must survive deeper, independently paid counter-evidence
          before a merge can execute.
        </p>
        <div className="terminal">
          <div className="terminal__bar">
            <span className="terminal__dot" />
            <span className="terminal__dot" />
            <span className="terminal__dot" />
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
