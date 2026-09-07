import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Landing } from "./routes/Landing";
import { CasePage } from "./routes/CasePage";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path="case/:caseId" element={<CasePage />} />
      </Route>
    </Routes>
  );
}

export default App;
