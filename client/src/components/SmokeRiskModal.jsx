import SmokeRisk from "./SmokeRisk.jsx";

export default function SmokeRiskModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <SmokeRisk onClose={onClose} />
      </div>
    </div>
  );
}
