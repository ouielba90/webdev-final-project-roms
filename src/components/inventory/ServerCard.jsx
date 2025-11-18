function ServerCard({ name, ip, location, os, status, numberOfNodes, nodeSpecs, hostedSoftware, usersWithAccess, connectedUsers }) {
  return (
    <>
      <div className="software-card">
        <div className="software-card-first-section">
          <div className="software-card-name">{name}</div>
          <div className="software-card-status">{status}</div>
        </div>
        <div>{ip} · {os} · {location}</div>
        <div className="software-card-third-section">
          <div>Nodos: {numberOfNodes}</div>
          <div>Usuarios conectados: {connectedUsers}</div>
          <div>Software alojado: {hostedSoftware.length}</div>
        </div>
        <div className="software-card-second-section">
          <div className="software-card-details-btn"><button>Ver detalles</button></div>
        </div>
      </div>
    </>
  )
}

export default ServerCard
