function SoftwareCard({ id, name, version, category, description, status, licenseId, installedOnHardware, handleRemove, serverId }) {
  console.log("servers", serverId)
  return (
    <>
      <div className="software-card">
        <div>Nombre: {name}</div>
        <div>Versión: {version}</div>
        <div>Categoría: {category}</div>
        <div>Descripción: {description}</div>
        {installedOnHardware.length !== 0 ? (
          <div>Hardware: {installedOnHardware.join(", ")}</div>)
          : <div>Hardware: no se ha encontrado ningún hardware</div>
        }
        {serverId.length !== 0 ? (
          <div>Servers: {serverId.join(", ")} </div>)
          : <div>Servers: no se ha encontrado ningún servidor</div>
        }
        <div>Estado: {status}</div>
        {licenseId !== null ? <div>Licencia: {licenseId}</div> : undefined
        }
        <div><button onClick={() => handleRemove(id)}>Delete</button></div>
      </div>
    </>
  )
}

export default SoftwareCard
