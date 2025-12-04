import { useContext } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { DataContext } from "./../../context/inventory/DataContext"

function SoftwareDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { software, hardware, servers } = useContext(DataContext)
  const softwareItem = software.find(s => s.id === Number(id));
  if (!softwareItem) return <p>Software no encontrado.</p>;

  const hardwareMap = Object.fromEntries(hardware.map(h => [h.id, h]));
  const serverMap = Object.fromEntries(servers.map(s => [s.id, s]));

  const hardAssocList = softwareItem.installedOnHardware.map(id => hardwareMap[id]);
  const serversAssocList = softwareItem.serverId.map(id => serverMap[id]);

  return (
    <>
      <div className="details-main">
        <div>
          <h2>{softwareItem.name}</h2>
          <p>{softwareItem.description}</p>
          <p className={`status ${softwareItem.status.toLowerCase()}`}>
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
          <div className="details-quick-stats-ii">
            {hardAssocList.length ? (
              hardAssocList.map((h, i) => (
                <Link key={i} to={`/inventory/hardware/${h.id}`} className="details-links">
                  <div className="assoc-card">
                    <p className="assoc-name">{h.model}</p>
                    <p className="assoc-type">{h.type}</p>
                    <p className={`assoc-status ${h.status.replace(" ", "-").toLowerCase()}`}>
                      {h.status.charAt(0).toUpperCase() + h.status.slice(1)}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="assoc-card">
                <p>Ninguno</p>
              </div>
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
