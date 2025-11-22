import { Link } from "react-router-dom"

function LicenseCard({ id, softwareName, seats, vendor, expiryDate, status, handleRemove, handleEdit }) {
  return (
    <>
      <div className="software-card">
        <div className="software-card-first-section">
          <div className="software-card-name">{softwareName}</div>
          <div className={`software-status status-${status}`}>{status}</div>
        </div>
        <div>{vendor}</div>
        <div className="software-card-third-section">
          <div>Licencias: {seats}</div>
          <div>Expiry date: {expiryDate}</div>
        </div>
        <div className="software-card-second-section">
          <div className="software-card-details-btn">
            <Link to={`/inventory/licenses/${id}`} className="details-btn-link">
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

export default LicenseCard
