import { BrowserRouter, Routes, Route } from "react-router-dom";
import PatientList from "./pages/PatientList";
import PatientDetail from "./pages/PatientDetail";
import EOBAnalysis from "./pages/EOBAnalysis";
import "./styles/app.css";

function Header() {
  return (
    <header className="app-header">
      <div className="app-header__inner">
        <div className="app-header__brand">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect width="28" height="28" rx="8" fill="#2563eb" />
            <path d="M7 14h14M14 7v14" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          <span className="app-header__name">EOB Dashboard</span>
        </div>
        <span className="app-header__tag">Patient Benefits Portal</span>
      </div>
    </header>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<PatientList />} />
          <Route path="/patients/:id" element={<PatientDetail />} />
          <Route path="/patients/:patientId/eobs/:eobId" element={<EOBAnalysis />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
