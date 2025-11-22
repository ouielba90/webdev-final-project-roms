import { Link } from "react-router-dom";

function SoftwareCard({ id, name, version, category, status, handleRemove, handleEdit }) {
  return (
    <>
      <div className="software-card">
        <div className="software-card-first-section">
          <div className="software-card-name">{name}</div>
          <div className={`software-status status-${status}`}>{status}</div>
        </div>
        <div>{category} · {version}</div>
        <div className="software-card-second-section">
          <div className="software-card-details-btn">
            <Link to={`/inventory/software/${id}`} className="details-btn-link">
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
    </>
  )
}

export default SoftwareCard
