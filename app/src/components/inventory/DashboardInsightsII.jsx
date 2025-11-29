import StatusAnimation from "./StatusAnimation.jsx"

function DashboardInsightsII({ uniqueElements }) {
  return (
    <>
      <div className="insights-card insights-server-risk server-risk-structure">
        <h2 className="section-title">Estado de los servidores</h2>

        <table className="table-server-risk-1">
          <thead>
            <tr>
              <th className="th-server">Servidor</th>
              <th className="th-users">Estado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {uniqueElements.map((item, index) => {
              const issues = [];
              item.cpuUsage > 90 && issues.push(`CPU: ${item.cpuUsage}%`);
              item.ramUsage > 90 && issues.push(`RAM: ${item.ramUsage}%`);
              item.diskUsage > 80 && issues.push(`Disk: ${item.diskUsage}%`);

              const isAlert = issues.length > 0;
              const color = isAlert ?
                <StatusAnimation color={"red"} />
                : item.status === "active" ?
                  <StatusAnimation color={"green"} />
                  : <StatusAnimation color={"orange"} />;
              return (
                <tr key={index}>
                  <td>
                    {item.name}
                  </td>
                  <td className="issues">{color}</td>
                  <td>{isAlert ? (
                    <span className="issue-text">{issues.join(" | ")}</span>
                  ) :
                    (<span className="issue-text">Sin alertas</span>)
                  }
                  </td>
                </tr>
              );
            }).slice(0, 6)}
          </tbody>
        </table>

        <table className="table-server-risk-2">
          <thead>
            <tr>
              <th className="th-server">Servidor</th>
              <th className="th-users">Estado</th>
            </tr>
          </thead>
          <tbody>
            {uniqueElements.map((item, index) => {
              const issues = [];
              item.cpuUsage > 90 && issues.push(`CPU: ${item.cpuUsage}%`);
              item.ramUsage > 90 && issues.push(`RAM: ${item.ramUsage}%`);
              item.diskUsage > 80 && issues.push(`Disk: ${item.diskUsage}%`);

              const isAlert = issues.length > 0;
              const color = isAlert ?
                <StatusAnimation color={"red"} />
                : item.status === "active" ?
                  <StatusAnimation color={"green"} />
                  : <StatusAnimation color={"orange"} />;
              return (
                <tr key={index}>
                  <td>
                    {item.name}
                  </td>
                  <td className="issues">{color}</td>
                  <td>{isAlert ? (
                    <span className="issue-text">{issues.join(" | ")}</span>
                  ) :
                    (<span className="issue-text">Sin alertas</span>)
                  }
                  </td>
                </tr>
              );
            }).slice(6, 13)}
          </tbody>
        </table>
        <div className="legend">
          <span>🟢 Normal</span>
          <span> 🟠 Mantenimiento</span>
          <span> 🔴 Problema</span>

        </div>
      </div>
    </>
  )
}

export default DashboardInsightsII
