import { Link } from "react-router-dom";

function HardwareCard({ id, type, model, os, status, specs, handleRemove, handleEdit }) {
  return (
    <div className="software-card">
      <div className="software-card-first-section">
        <span className="software-card-name">{model}</span>
        <span className={`software-status status-${status}`}>{status}</span>
      </div>

      <div>{type} · {os}</div>
      <div className="software-card-third-section">
        <div>{specs.cpu} - {specs.ram} - {specs.storage}</div>
      </div>

      <div className="software-card-second-section">
        <div className="software-card-details-btn">
          <Link to={`/inventory/hardware/${id}`} className="details-btn-link">
            Ver detalles
          </Link>
        </div>
        <div className="software-card-edit-btn">
          <button onClick={() => handleEdit(id)}>Modificar</button>
        </div>
        <div className="software-card-delete-btn">
          <button onClick={() => handleRemove(id)}>Eliminar</button>
        </div>
      </div>
    </div>
  );
}

export default HardwareCard
