import type { Outcome } from "../data/types";
import "./VerdictBadge.css";

type Props = {
  outcome: Outcome | "PENDING";
  size?: "sm" | "lg";
};

const LABEL: Record<Props["outcome"], string> = {
  PASS: "PASS",
  BLOCK: "BLOCK",
  ESCALATE: "ESCALATE",
  PENDING: "PENDING",
};

export function VerdictBadge({ outcome, size = "sm" }: Props) {
  return (
    <span className={`verdict-badge verdict-badge--${outcome.toLowerCase()} verdict-badge--${size}`}>
      <span className="verdict-badge__dot" aria-hidden="true" />
      {LABEL[outcome]}
    </span>
  );
}
