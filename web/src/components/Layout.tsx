import { Link, Outlet } from "react-router-dom";
import "./Layout.css";

export function Layout() {
  return (
    <div className="layout">
      <header className="layout__header">
        <Link to="/" className="layout__brand">
          <span className="layout__brand-mark">&gt;_</span>
          skeptara
        </Link>
        <nav className="layout__nav">
          <Link to="/case/pr1">challenged case</Link>
          <Link to="/case/pr2">clean case</Link>
          <a
            href="https://github.com/Faadil1/Faadil1-skeptara-telegraph"
            target="_blank"
            rel="noreferrer"
          >
            repository
          </a>
        </nav>
      </header>
      <main className="layout__main">
        <Outlet />
      </main>
      <footer className="layout__footer">
        Telegraph Protocol Track 3 &middot; Base Sepolia &middot; real closed T0&ndash;T4 runs, no mocked verdicts
      </footer>
    </div>
  );
}
