import StatusAnimation from "./StatusAnimation.jsx"
function DashboardInsightsI({ riskLicenses, highPopServer, software }) {
  return (
    <>

      <div className="insights-card insights-licenses">
        <h2 className="section-title">Licencias en riesgo</h2>

        <table className="table-licenses">
          <thead>
            <tr>
              <th>Software</th>
              <th></th>
              <th>Estado</th>
            </tr>
          </thead>

          <tbody>
            {riskLicenses.map((item) => {
              const isAlert = item.daysLeft < 0;
              const color = isAlert ?
                <StatusAnimation color={"red"} />
                : item.daysLeft > 0 && item.daysLeft < 30 ?
                  <StatusAnimation color={"orange"} />
                  : undefined
              return (
                <tr key={item.softwareId}>
                  <td>{software.filter(s => s.id === item.softwareId).map(s => s.name)}</td>
                  <td></td>
                  <td className="issues">{color}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="legend">
          <span>🟡 &lt; 30 días</span>
          <span>🔴 Expirada</span>
        </div>

      </div>

      <div className="insights-card insights-top-resources">
        <h2 className="section-title">Servidores activos</h2>

        <table className="table-top-resources">
          <thead>
            <tr>
              <th className="th-server">Servidor</th>
              <th className="th-users">Usuarios</th>
              <th></th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {highPopServer.map((item) => (
              <tr key={item.serverId}>
                <td>{item.name}</td>
                <td className="th-users">{item.connectedUsers}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="legend">
          <span>* Usuarios conectados actualmente</span>
        </div>
      </div>

    </>
  )
}

export default DashboardInsightsI
