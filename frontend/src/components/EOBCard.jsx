import { useNavigate } from "react-router-dom";
import StatusBadge from "./StatusBadge";

function formatDate(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export default function EOBCard({ eob, patientId }) {
  const navigate = useNavigate();
  const patientResp = eob.patient;
  const isHighResp = patientResp > 200;

  return (
    <div
      className="eob-card"
      onClick={() => navigate(`/patients/${patientId}/eobs/${eob.id}`)}
    >
      <div className="eob-card__header">
        <div>
          <p className="eob-card__date">{formatDate(eob.date)}</p>
          <h4 className="eob-card__procedure">{eob.procedure}</h4>
          <span className="eob-card__code">{eob.code}</span>
        </div>
        <StatusBadge status={eob.status} />
      </div>

      <div className="eob-card__financials">
        <div className="eob-fin">
          <span className="eob-fin__label">Billed</span>
          <span className="eob-fin__value">${eob.billed.toLocaleString()}</span>
        </div>
        <div className="eob-fin">
          <span className="eob-fin__label">Allowed</span>
          <span className="eob-fin__value">${eob.allowed.toLocaleString()}</span>
        </div>
        <div className="eob-fin">
          <span className="eob-fin__label">Insurance Paid</span>
          <span className="eob-fin__value green">${eob.paid.toLocaleString()}</span>
        </div>
        <div className={`eob-fin ${isHighResp ? "eob-fin--alert" : ""}`}>
          <span className="eob-fin__label">Patient Owes</span>
          <span className={`eob-fin__value ${isHighResp ? "red" : ""}`}>
            ${patientResp.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="eob-card__footer">
        <span className="eob-card__link">View Analysis →</span>
      </div>
    </div>
  );
}
