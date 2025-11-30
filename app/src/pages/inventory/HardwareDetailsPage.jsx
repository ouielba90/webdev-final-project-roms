import { useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { DataContext } from "./../../context/inventory/DataContext"

function HardwareDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { software, hardware } = useContext(DataContext)
  const hardwareItem = hardware.find(s => s.id === Number(id));
  const softAssocList = hardwareItem.installedSoftware.map((softId) => {
    let softwareInfo = software.find(h => h.id === softId)
    return { name: softwareInfo.name, version: softwareInfo.version }
  })
  //const serversAssocList = softwareItem.serverId.map((servId) => {
  //  let serverInfo = servers.find(h => h.id === servId)
  //  console.log(serverInfo)
  //  return { name: serverInfo.name, location: serverInfo.location, status: serverInfo.status }
  //})

  console.log("s", hardwareItem.purchaseDate)
  if (!hardwareItem) return <p>Hardware no encontrado.</p>;

  return (
    <>
      <div className="details-main">
        <div>
          <h2>{hardwareItem.model}</h2>
          <p>{hardwareItem.type}</p>
          <p className={`status ${hardwareItem.status.replace(" ", "-").toLowerCase()}`}>
            {hardwareItem.status}
          </p>
        </div>

        <div>
          <h3>Resumen rápido</h3>
          <div className="details-quick-stats">
            <div>
              <p><strong>Fecha de compra</strong></p>
              <p>{isoToeuDate(hardwareItem.purchaseDate)}</p>
            </div>
            <div>
              <p><strong>Especificaciones</strong></p>
              <p>CPU: {hardwareItem.specs.cpu}</p>
              <p>RAM: {hardwareItem.specs.ram}</p>
              <p>Disco: {hardwareItem.specs.storage}</p>
            </div>
            <div>
              <p><strong>Asignado a</strong></p>
              <p>{hardwareItem.assignedToUserId || "Ninguna"}</p>
            </div>
          </div>
        </div>

        <div>
          <h3>Software asociado</h3>
          <div className="details-quick-stats">
            {softAssocList.length ? (
              softAssocList.map((h, i) => (
                <div key={i} className="assoc-card">
                  <p className="assoc-name">{h.name}</p>
                  <p className="assoc-type">{h.version}</p>
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

function isoToeuDate(isoDateStr) {
  console.log('in1', isoDateStr)
  const [year, month, day] = isoDateStr.split("T")[0].split("-"); // Month index begin with 0
  console.log(`${day}-${month}-${year}`)
  return `${day}-${month}-${year}`;
}

export default HardwareDetailsPage
