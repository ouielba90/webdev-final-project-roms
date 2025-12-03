import { Link } from "react-router-dom"
function ServerCard({ id, name, location, os, status, hostedSoftware, connectedUsers }) {
  return (
    <>
      <div className="software-card">
        <div className="software-card-first-section">
          <div className="software-card-name">{name}</div>
          <div className={`software-status status-${status}`}>{status}</div>
        </div>
        <div>{location} · {os}</div>
        <div className="software-card-third-section">
          <div>Usuarios conectados: {connectedUsers}</div>
          <div>Software alojado: {hostedSoftware.length}</div>
        </div>
        <div className="software-card-second-section-for-servers">
          <div className="software-card-details-btn">
            <Link to={`/inventory/servers/${id}`} className="details-btn-link">
              Ver detalles
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default ServerCard
