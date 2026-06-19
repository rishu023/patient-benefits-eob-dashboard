import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchEOB } from "../api/patientApi";
import StatusBadge from "../components/StatusBadge";

function formatDate(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function AnalysisBlock({ icon, label, text, variant }) {
  return (
    <div className={`analysis-block analysis-block--${variant}`}>
      <div className="analysis-block__icon">{icon}</div>
      <div>
        <p className="analysis-block__label">{label}</p>
        <p className="analysis-block__text">{text}</p>
      </div>
    </div>
  );
}

export default function EOBAnalysis() {
  const { patientId, eobId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEOB(patientId, eobId)
      .then(setData)
      .catch(() => setError("EOB not found."))
      .finally(() => setLoading(false));
  }, [patientId, eobId]);

  if (loading) return (
    <div className="page">
      <div className="state-message"><div className="spinner" /><p>Loading EOB…</p></div>
    </div>
  );

  if (error) return (
    <div className="page">
      <div className="state-message state-message--error"><p>{error}</p></div>
    </div>
  );

  const { eob, patient } = data;
  const adjustment = eob.billed - eob.allowed;
  const isDenied = eob.status === "Denied";

  return (
    <div className="page">
      <button className="back-btn" onClick={() => navigate(`/patients/${patientId}`)}>
        ← Back to {patient.name}
      </button>

      {/* EOB Header */}
      <div className="eob-header-card">
        <div className="eob-header-card__left">
          <p className="eob-header-card__date">{formatDate(eob.date)}</p>
          <h2 className="eob-header-card__title">{eob.procedure}</h2>
          <span className="eob-header-card__code">{eob.code}</span>
        </div>
        <StatusBadge status={eob.status} />
      </div>

      {/* Financial Breakdown */}
      <div className="section-card">
        <h3 className="section-card__title">Financial Breakdown</h3>
        <div className="financial-grid">
          <div className="fin-row">
            <span className="fin-row__label">Billed Amount</span>
            <span className="fin-row__value">${eob.billed.toLocaleString()}</span>
          </div>
          <div className="fin-row fin-row--sub">
            <span className="fin-row__label">Contractual Adjustment</span>
            <span className="fin-row__value red">−${adjustment.toLocaleString()}</span>
          </div>
          <div className="fin-row fin-row--total">
            <span className="fin-row__label">Allowed Amount</span>
            <span className="fin-row__value">${eob.allowed.toLocaleString()}</span>
          </div>
          <div className="fin-divider" />
          <div className="fin-row">
            <span className="fin-row__label">Insurance Paid</span>
            <span className="fin-row__value green">${eob.paid.toLocaleString()}</span>
          </div>
          <div className={`fin-row ${isDenied || eob.patient > 200 ? "fin-row--alert" : ""}`}>
            <span className="fin-row__label">Patient Responsibility</span>
            <span className={`fin-row__value ${eob.patient > 0 ? "red" : "green"}`}>
              ${eob.patient.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Visual split bar */}
        {eob.billed > 0 && (
          <div className="split-bar-wrapper">
            <p className="split-bar__label">Payment Split</p>
            <div className="split-bar">
              {eob.paid > 0 && (
                <div
                  className="split-bar__segment split-bar__segment--paid"
                  style={{ width: `${(eob.paid / eob.billed) * 100}%` }}
                  title={`Insurance: $${eob.paid}`}
                />
              )}
              {eob.patient > 0 && (
                <div
                  className="split-bar__segment split-bar__segment--patient"
                  style={{ width: `${(eob.patient / eob.billed) * 100}%` }}
                  title={`Patient: $${eob.patient}`}
                />
              )}
              {adjustment > 0 && (
                <div
                  className="split-bar__segment split-bar__segment--adj"
                  style={{ width: `${(adjustment / eob.billed) * 100}%` }}
                  title={`Adjustment: $${adjustment}`}
                />
              )}
            </div>
            <div className="split-bar__legend">
              <span className="legend-item legend-item--paid">Insurance Paid</span>
              <span className="legend-item legend-item--patient">Patient Owes</span>
              <span className="legend-item legend-item--adj">Adjustment</span>
            </div>
          </div>
        )}
      </div>

      {/* Analysis */}
      <div className="section-card">
        <h3 className="section-card__title">Claim Analysis</h3>
        <div className="analysis-stack">
          <AnalysisBlock
            icon="📋"
            label="Reason for Payment / Adjustment"
            text={eob.analysis.reason}
            variant="neutral"
          />
          <AnalysisBlock
            icon="⚠️"
            label="Potential Issue"
            text={eob.analysis.issue}
            variant={isDenied ? "error" : "warning"}
          />
          <AnalysisBlock
            icon="✅"
            label="Suggested Next Step"
            text={eob.analysis.suggestion}
            variant="success"
          />
        </div>
      </div>
    </div>
  );
}
