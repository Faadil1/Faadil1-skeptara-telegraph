import { Link, Outlet } from "react-router-dom";
import "./Layout.css";

export function Layout() {
  return (
    <div className="layout">
      <header className="layout__header">
        <Link to="/" className="layout__brand">
          <span className="layout__brand-badge" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2 L14.2 9.2 L21.5 9.5 L15.6 14 L17.8 21.2 L12 17 L6.2 21.2 L8.4 14 L2.5 9.5 L9.8 9.2 Z"
                fill="currentColor"
              />
            </svg>
          </span>
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
        <a
          href="https://github.com/Faadil1/Faadil1-skeptara-telegraph"
          target="_blank"
          rel="noreferrer"
          className="layout__cta"
        >
          view real runs →
        </a>
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
