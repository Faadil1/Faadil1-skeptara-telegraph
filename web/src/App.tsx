import { Link, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Landing } from "./routes/Landing";
import { CasePage } from "./routes/CasePage";

function NotFound() {
  return (
    <section style={{ padding: "4rem 0" }}>
      <p className="mono" style={{ color: "var(--text-muted)" }}>404</p>
      <h1>Page not found</h1>
      <p style={{ color: "var(--text-secondary)" }}>This route is not part of the Skeptara judge surface.</p>
      <Link to="/">Return to the two-case proof</Link>
    </section>
  );
}

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path="case/:caseId" element={<CasePage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
