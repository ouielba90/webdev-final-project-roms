import { useContext } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { DataContext } from "./../../context/inventory/DataContext"
import OSImage from "../../components/inventory/OSImage"

function ServersDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { software, servers } = useContext(DataContext)
  const serverItem = servers.find(serv => serv.id === Number(id));
  if (!serverItem) return <p>Servidor no encontrado.</p>;

  const softwareMap = Object.fromEntries(software.map(s => [s.id, s]));

  const softAssocList = serverItem.hostedSoftware.map(id => softwareMap[id]);

  const servAvgPropNodes = getNodeAverages(serverItem.nodeSpecs)

  return (
    <>
      <div className="server-details">
        <div className="server-hero">
          <div>
            <div className="server-header-container">
              <h2>{serverItem.name}</h2>
              <p className="ip">{serverItem.ip}</p>
              <p className="small">{serverItem.location} · {serverItem.os}</p>
              <div className="connected-users">
                👥 {serverItem.connectedUsers} usuarios conectados
              </div>
            </div>
            <div className="subheader-status-os">
              <div className={`status-badge ${serverItem.status}`}>
                {serverItem.status}
              </div>
              <OSImage osName={serverItem.os} />
            </div>
          </div>
        </div>

        {/* MÉTRICAS GENERALES */}
        <div className="server-summary">
          <div>
            <h3>Nodos totales</h3>
            <p className="big">{serverItem.numberOfNodes}</p>
          </div>
          <div>
            <h3>Carga media CPU</h3>
            <p className="big">{servAvgPropNodes.cpuUsage.toFixed(0)}%</p>
            <div className="bar-specs"><div style={{ width: servAvgPropNodes.cpuUsage + "%" }} /></div>
          </div>
          <div>
            <h3>Carga media RAM</h3>
            <p className="big">{servAvgPropNodes.ramUsage.toFixed(0)}%</p>
            <div className="bar-specs"><div style={{ width: servAvgPropNodes.ramUsage + "%" }} /></div>
          </div>
          <div>
            <h3>Uso medio Disco</h3>
            <p className="big">{servAvgPropNodes.diskUsage.toFixed(0)}%</p>
            <div className="bar-specs"><div style={{ width: servAvgPropNodes.diskUsage + "%" }} /></div>
          </div>
        </div>

        {/* GRID DE NODOS */}
        <h3>Nodos del pool</h3>
        <div className="nodes-grid">
          {serverItem.nodeSpecs.map((n, i) => (
            <div key={i} className="node-card">
              <h4>{n.nodeId}</h4>

              <div className="node-spec-line">CPU: {n.cpu} cores</div>
              <div className="node-spec-line">RAM: {n.ram}</div>
              <div className="node-spec-line">Disco: {n.storage}</div>

              <div className="node-usage">
                <label>CPU {n.cpuUsage}%</label>
                <div className="bar-specs"><div style={{ width: n.cpuUsage + "%" }} /></div>

                <label>RAM {n.ramUsage}%</label>
                <div className="bar-specs"><div style={{ width: n.ramUsage + "%" }} /></div>

                <label>Disco {n.diskUsage}%</label>
                <div className="bar-specs"><div style={{ width: n.diskUsage + "%" }} /></div>
              </div>
            </div>
          ))}
        </div>

        {/* SOFTWARE */}
        <h3>Software instalado</h3>
        <div className="small-card-list">
          {softAssocList.map((soft, i) => (
            <Link to={`/inventory/software/${soft.id}`} className="details-links">
              <div key={i} className="mini-card">{soft.name}</div>
            </Link>
          ))}
        </div>

        {/* USUARIOS */}
        <h3>Usuarios con acceso</h3>
        <div className="small-card-list scrollable">
          {serverItem.usersWithAccess.map((u, i) => (
            <div key={i} className="mini-card">{u}</div>
          ))}
        </div>

        <button onClick={() => navigate("/inventory/servers")}>
          Volver a la lista
        </button>
      </div>

    </>
  )
}

function getNodeAverages(serverNodes) {
  const avgCpu = serverNodes.reduce((sum, n) => sum + n.cpuUsage, 0) / serverNodes.length;
  const avgRam = serverNodes.reduce((sum, n) => sum + n.ramUsage, 0) / serverNodes.length;
  const avgDisk = serverNodes.reduce((sum, n) => sum + n.diskUsage, 0) / serverNodes.length;

  return { cpuUsage: avgCpu, ramUsage: avgRam, diskUsage: avgDisk };
}

export default ServersDetailsPage
