function ProgressBar({ value, max }) {
  const pct = max > 0 ? Math.min(100, ((max - value) / max) * 100) : 0;
  return (
    <div className="progress-bar">
      <div className="progress-bar__fill" style={{ width: `${pct}%` }} />
    </div>
  );
}

function CoverageRow({ label, value }) {
  const isCovered = value !== "Not covered";
  return (
    <div className="coverage-row">
      <span className="coverage-row__label">{label}</span>
      <span className={`coverage-row__value ${isCovered ? "covered" : "not-covered"}`}>
        {value}
      </span>
    </div>
  );
}

export default function BenefitCard({ benefits }) {
  const usedMax = benefits.annualMax - benefits.remainingMax;
  const metDeductible = benefits.deductibleRemaining === 0;

  return (
    <div className="benefit-card">
      <h3 className="benefit-card__title">Benefits Summary</h3>

      <div className="benefit-card__financials">
        <div className="benefit-stat">
          <span className="benefit-stat__label">Annual Maximum</span>
          <span className="benefit-stat__value">${benefits.annualMax.toLocaleString()}</span>
        </div>
        <div className="benefit-stat benefit-stat--highlight">
          <span className="benefit-stat__label">Remaining</span>
          <span className="benefit-stat__value green">${benefits.remainingMax.toLocaleString()}</span>
        </div>
        <div className="benefit-stat">
          <span className="benefit-stat__label">Deductible</span>
          <span className="benefit-stat__value">${benefits.deductible}</span>
        </div>
        <div className={`benefit-stat ${metDeductible ? "benefit-stat--met" : ""}`}>
          <span className="benefit-stat__label">Deductible Remaining</span>
          <span className={`benefit-stat__value ${metDeductible ? "green" : "amber"}`}>
            {metDeductible ? "Met ✓" : `$${benefits.deductibleRemaining}`}
          </span>
        </div>
      </div>

      <div className="benefit-card__usage">
        <div className="usage-labels">
          <span>Used: ${usedMax.toLocaleString()}</span>
          <span>Remaining: ${benefits.remainingMax.toLocaleString()}</span>
        </div>
        <ProgressBar value={benefits.remainingMax} max={benefits.annualMax} />
      </div>

      <div className="benefit-card__coverage">
        <h4 className="coverage-title">Coverage Breakdown</h4>
        <CoverageRow label="Preventive" value={benefits.preventive} />
        <CoverageRow label="Basic" value={benefits.basic} />
        <CoverageRow label="Major" value={benefits.major} />
        <CoverageRow label="Orthodontics" value={benefits.ortho} />
      </div>
    </div>
  );
}
