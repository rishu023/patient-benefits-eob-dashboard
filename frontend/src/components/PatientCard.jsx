import { useNavigate } from "react-router-dom";
import StatusBadge from "./StatusBadge";

function formatDOB(dob) {
  const d = new Date(dob + "T00:00:00");
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function getInitials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

const payerColors = {
  "Delta Dental": "#2563eb",
  Cigna: "#7c3aed",
  Aetna: "#0891b2",
};

export default function PatientCard({ patient }) {
  const navigate = useNavigate();
  const color = payerColors[patient.payer] || "#374151";

  return (
    <div className="patient-card" onClick={() => navigate(`/patients/${patient.id}`)}>
      <div className="patient-card__header">
        <div className="patient-card__avatar" style={{ background: color }}>
          {getInitials(patient.name)}
        </div>
        <div className="patient-card__meta">
          <h3 className="patient-card__name">{patient.name}</h3>
          <p className="patient-card__dob">DOB: {formatDOB(patient.dob)}</p>
        </div>
        <StatusBadge status={patient.status} />
      </div>
      <div className="patient-card__footer">
        <span className="patient-card__payer">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          {patient.payer}
        </span>
        <span className="patient-card__link">
          View Details →
        </span>
      </div>
    </div>
  );
}
