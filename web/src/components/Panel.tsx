import type { ReactNode } from "react";
import "./Panel.css";

type Props = {
  eyebrow?: string;
  title: string;
  children: ReactNode;
  right?: ReactNode;
};

export function Panel({ eyebrow, title, children, right }: Props) {
  return (
    <section className="panel">
      <div className="panel__header">
        <div>
          {eyebrow && <div className="panel__eyebrow">{eyebrow}</div>}
          <h2 className="panel__title">{title}</h2>
        </div>
        {right && <div className="panel__right">{right}</div>}
      </div>
      <div className="panel__body">{children}</div>
    </section>
  );
}
