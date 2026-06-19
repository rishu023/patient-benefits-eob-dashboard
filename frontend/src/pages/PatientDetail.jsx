import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPatient } from "../api/patientApi";
import BenefitCard from "../components/BenefitCard";
import EOBCard from "../components/EOBCard";
import StatusBadge from "../components/StatusBadge";

function formatDOB(dob) {
  const d = new Date(dob + "T00:00:00");
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function getInitials(name) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase();
}

export default function PatientDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPatient(id)
      .then(setPatient)
      .catch(() => setError("Patient not found."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="page">
      <div className="state-message"><div className="spinner" /><p>Loading patient…</p></div>
    </div>
  );

  if (error) return (
    <div className="page">
      <div className="state-message state-message--error"><p>{error}</p></div>
    </div>
  );

  return (
    <div className="page">
      <button className="back-btn" onClick={() => navigate("/")}>
        ← Back to Patients
      </button>

      {/* Patient Info Card */}
      <div className="info-card">
        <div className="info-card__left">
          <div className="info-card__avatar">
            {getInitials(patient.name)}
          </div>
          <div>
            <h2 className="info-card__name">{patient.name}</h2>
            <p className="info-card__dob">Date of Birth: {formatDOB(patient.dob)}</p>
            <p className="info-card__payer">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
              {patient.payer}
            </p>
          </div>
        </div>
        <StatusBadge status={patient.status} />
      </div>

      {/* Two-column layout */}
      <div className="detail-grid">
        <BenefitCard benefits={patient.benefits} />

        <div className="eob-section">
          <h3 className="section-title">
            Explanation of Benefits
            <span className="section-count">{patient.eobs.length}</span>
          </h3>
          {patient.eobs.length === 0 ? (
            <div className="empty-eob">
              <p>No EOBs on file. Claims will appear here once processed.</p>
            </div>
          ) : (
            <div className="eob-list">
              {patient.eobs.map((eob) => (
                <EOBCard key={eob.id} eob={eob} patientId={patient.id} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
