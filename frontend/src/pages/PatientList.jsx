import { useEffect, useState } from "react";
import { fetchPatients } from "../api/patientApi";
import PatientCard from "../components/PatientCard";

export default function PatientList() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchPatients()
      .then(setPatients)
      .catch(() => setError("Could not load patients. Is the backend running?"))
      .finally(() => setLoading(false));
  }, []);

  const filtered = patients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.payer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Patient Dashboard</h1>
          <p className="page-subtitle">{patients.length} patients enrolled</p>
        </div>
        <input
          className="search-input"
          type="text"
          placeholder="Search by name or payer…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading && (
        <div className="state-message">
          <div className="spinner" />
          <p>Loading patients…</p>
        </div>
      )}

      {error && (
        <div className="state-message state-message--error">
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="state-message">
          <p>No patients match your search.</p>
        </div>
      )}

      <div className="patient-grid">
        {filtered.map((p) => (
          <PatientCard key={p.id} patient={p} />
        ))}
      </div>
    </div>
  );
}
