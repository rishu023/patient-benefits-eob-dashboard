export default function StatusBadge({ status }) {
  const map = {
    "EOB Available": { cls: "badge badge--eob", label: "EOB Available" },
    "Claim Denied": { cls: "badge badge--denied", label: "Claim Denied" },
    "Eligibility Active": { cls: "badge badge--active", label: "Eligibility Active" },
    Processed: { cls: "badge badge--eob", label: "Processed" },
    Denied: { cls: "badge badge--denied", label: "Denied" },
  };

  const config = map[status] || { cls: "badge badge--default", label: status };

  return <span className={config.cls}>{config.label}</span>;
}
