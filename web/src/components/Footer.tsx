import { Link } from "react-router-dom";
import "./Footer.css";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__grid">
        <div className="site-footer__col">
          <div className="site-footer__heading mono">product</div>
          <Link to="/#how-it-works">How it works</Link>
          <Link to="/#why-skeptara">Why Skeptara</Link>
          <Link to="/#faq">FAQ</Link>
        </div>
        <div className="site-footer__col">
          <div className="site-footer__heading mono">telegraph</div>
          <a href="https://hackathon.telegraphprotocol.com" target="_blank" rel="noreferrer">
            Telegraph Protocol hackathon
          </a>
        </div>
        <div className="site-footer__col">
          <div className="site-footer__heading mono">resources</div>
          <a href="https://github.com/Faadil1/skeptara-telegraph" target="_blank" rel="noreferrer">
            GitHub repository
          </a>
          <a
            href="https://github.com/Faadil1/skeptara-telegraph#readme"
            target="_blank"
            rel="noreferrer"
          >
            Documentation
          </a>
        </div>
      </div>
      <div className="site-footer__bottom mono">
        Telegraph Protocol Track 3 &middot; Base Sepolia
      </div>
    </footer>
  );
}
