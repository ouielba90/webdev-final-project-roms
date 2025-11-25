import { useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { DataContext } from "./../../context/inventory/DataContext"

function SoftwareDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { software, hardware, servers } = useContext(DataContext)
  const softwareItem = software.find(s => s.id === Number(id));
  console.log(softwareItem.installedOnHardware)
  const hardAssocList = softwareItem.installedOnHardware.map((hardId) => {
    let hardwareInfo = hardware.find(h => h.id === hardId)
    console.log(hardwareInfo)
    return { model: hardwareInfo.model, type: hardwareInfo.type, status: hardwareInfo.status }
  })
  const serversAssocList = softwareItem.serverId.map((servId) => {
    let serverInfo = servers.find(h => h.id === servId)
    console.log(serverInfo)
    return { name: serverInfo.name, location: serverInfo.location, status: serverInfo.status }
  })

  if (!softwareItem) return <p>Software no encontrado.</p>;

  return (
    <>
      <div className="details-main">
        <div>
          <h3>{softwareItem.name}</h3>
          <p>{softwareItem.description}</p>
          <p className={`status ${softwareItem.status.replace(" ", "-").toLowerCase()}`}>
            {softwareItem.status}
          </p>
        </div>

        <div>
          <h3>Resumen rápido</h3>
          <div className="details-quick-stats">
            <div>
              <p><strong>Versión</strong></p>
              <p>{softwareItem.version}</p>
            </div>
            <div>
              <p><strong>Categoría</strong></p>
              <p>{softwareItem.category}</p>
            </div>
            <div>
              <p><strong>Licencia</strong></p>
              <p>{softwareItem.licenseId || "Ninguna"}</p>
            </div>
          </div>
        </div>

        <div>
          <h3>Hardware asociado</h3>
          <div className="details-quick-stats">
            {hardAssocList.length ? (
              hardAssocList.map((h, i) => (
                <div key={i} className="assoc-card">
                  <p className="assoc-name">{h.model}</p>
                  <p className="assoc-type">{h.type}</p>
                  <p className={`assoc-status ${h.status.replace(" ", "-").toLowerCase()}`}>
                    {h.status}
                  </p>
                </div>
              ))
            ) : (
              <p>Ninguno</p>
            )}
          </div>
        </div>

        <div>
          <h3>Servidores donde está instalado</h3>
          <div className="details-quick-stats">
            {serversAssocList.length ? (
              serversAssocList.map((s, i) => (
                <div key={i} className="assoc-card">
                  <p className="assoc-name">{s.name}</p>
                  <p className="assoc-type">{s.location}</p>
                  <p className={`assoc-status ${s.status.replace(" ", "-").toLowerCase()}`}>
                    {s.status}
                  </p>
                </div>
              ))
            ) : (
              <p>Ninguno</p>
            )}
          </div>
        </div>

        <button onClick={() => navigate("/inventory/software")}>
          Volver a la lista
        </button>
      </div>
    </>
  )
}

export default SoftwareDetailsPage
