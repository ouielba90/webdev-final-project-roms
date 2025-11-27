function DashboardInsightsII({ uniqueElements }) {
  return (
    <>
      <div className="insights-card insights-server-risk server-risk-structure">
        <h2 className="section-title">Servidores en Riesgo</h2>

        <table className="table-server-risk-1">
          <thead>
            <tr>
              <th className="th-server">Server</th>
              <th className="th-users">Alertas</th>
              <th className="th-server"></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {uniqueElements.map((item, index) => {
              const issues = [];
              item.cpuUsage > 90 && issues.push(`CPU: ${item.cpuUsage}%`);
              item.ramUsage > 90 && issues.push(`RAM: ${item.ramUsage}%`);
              item.diskUsage > 80 && issues.push(`Disk: ${item.diskUsage}%`);

              if (issues.length !== 0) {
                return (<tr key={index}><td>{item.name}</td><td>{issues.join(" | ")}</td><td>🔴</td></tr>)
              } else {
                if (item.status === "active") {
                  return (<tr key={index}><td>{item.name}</td><td>Todo normal</td><td>🟢</td></tr>)
                }
                else {
                  return (<tr key={index}><td>{item.name}</td><td>El mantenimiento</td>🟠</tr>)
                }
              }
            }).slice(0, 6)}
          </tbody>
        </table>

        <table className="table-server-risk-2">
          <thead>
            <tr>
              <th className="th-server">Server</th>
              <th className="th-users">Alertas</th>
              <th className="th-server"></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {uniqueElements.map((item, index) => {
              const issues = [];
              item.cpuUsage > 90 && issues.push(`CPU: ${item.cpuUsage}%`);
              item.ramUsage > 90 && issues.push(`RAM: ${item.ramUsage}%`);
              item.diskUsage > 80 && issues.push(`Disk: ${item.diskUsage}%`);

              if (issues.length !== 0) {
                return (<tr key={index}><td>{item.name}</td><td>{issues.join(" | ")}</td><td>🔴</td></tr>)
              } else {
                if (item.status === "active") {
                  return (<tr key={index}><td>{item.name}</td><td>Todo normal</td><td>   🟢</td></tr>)
                }
                else {
                  return (<tr key={index}><td>{item.name}</td><td>El mantenimiento</td><td>   🟠</td></tr>)
                }
              }
            }).slice(6, 13)}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default DashboardInsightsII
