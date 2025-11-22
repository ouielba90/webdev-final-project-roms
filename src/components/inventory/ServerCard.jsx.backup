function ServerCard({ name, ip, location, os, status, numberOfNodes, nodeSpecs, hostedSoftware, usersWithAccess, connectedUsers }) {
  return (
    <div>
      <div>Nombre: {name}</div>
      <div>IP: {ip}</div>
      <div>Ubicación: {location}</div>
      <div>OS: {os}</div>
      <div>Nodes ({numberOfNodes}):</div>
      {nodeSpecs.map((node) => {
        return (
          <div key={node.nodeId}>
            <div>{node.nodeId} - CPU: {node.cpu} RAM: {node.ram} Storage: {node.storage} </div>
          </div>
        )
      })}
      <div>Software hosteado: {hostedSoftware?.join(", ")}</div>
      <div>Usuarios con acceso: {usersWithAccess?.join(", ")}</div>
      <div>Estado: {status}</div>
      {status !== "maintenance" ? <div>Connected users: {connectedUsers}</div> : undefined
      }
      <hr />
    </div>
  )
}

export default ServerCard
