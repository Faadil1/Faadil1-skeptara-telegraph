import type { ReactNode } from "react";
import "./Stat.css";

type Props = {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
};

export function Stat({ label, value, hint }: Props) {
  return (
    <div className="stat">
      <div className="stat__label">{label}</div>
      <div className="stat__value mono">{value}</div>
      {hint && <div className="stat__hint">{hint}</div>}
    </div>
  );
}

export function StatRow({ children }: { children: ReactNode }) {
  return <div className="stat-row">{children}</div>;
}
