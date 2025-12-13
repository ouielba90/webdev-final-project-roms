import { useContext } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { DataContext } from "./../../context/inventory/DataContext"
import OSImage from "../../components/inventory/OSImage"
import { isoToeuDate } from "./../../utils/inventory/date.js";

function HardwareDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { software, hardware } = useContext(DataContext)
  const hardwareItem = hardware.find(s => s._id === id);
  if (!hardwareItem) return <p>Hardware no encontrado.</p>;

  const softwareMap = Object.fromEntries(software.map(s => [s._id, s]));

  const softAssocList = hardwareItem.installedSoftware.map(id => softwareMap[id]);

  return (
    <>
      <div className="details-main">
        <div className="header-for-os">
          <div>
            <h2>{hardwareItem.model}</h2>
            <p className="info-line">{hardwareItem.type} · <OSImage osName={hardwareItem.os} /> {hardwareItem.os}</p>
            <p className={`status ${hardwareItem.status.replace(" ", "-").toLowerCase()}`}>
              {hardwareItem.status}
            </p>
          </div>
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
            <div>
              <p><strong>Último mantenimiento</strong></p>
              <p>{isoToeuDate(hardwareItem.lastMaintenance)}</p>
            </div>
          </div>
        </div>

        <div>
          <h3>Software asociado</h3>
          <div className="details-quick-stats-ii">
            {softAssocList.length ? (
              softAssocList.map((h, i) => (
                <Link key={i} to={`/inventory/software/${h._id}`} className="details-links">
                  <div className="assoc-card">
                    <p className="assoc-name">{h.name}</p>
                    <p className="assoc-type">{h.version}</p>
                  </div>
                </Link>
              ))
            ) : (
              <p>Ninguno</p>
            )}
          </div>
        </div>

        <button onClick={() => navigate("/inventory/hardware")}>
          Volver a la lista
        </button>
      </div>
    </>
  )
}

export default HardwareDetailsPage
