import StatusAnimation from "./StatusAnimation.jsx"

function DashboardInsightsII({ uniqueElements }) {
  return (
    <>
      <div className="insights-card insights-server-risk server-risk-structure">
        <h2 className="section-title">Estado de los servidores</h2>

        <table className="table-server-risk-1">
          <thead>
            <tr>
              <th>Servidor</th>
              <th className="th-state">Estado</th>
              <th>Comentarios</th>
            </tr>
          </thead>
          <tbody>
            {uniqueElements.map((item, index) => {
              const issues = [];
              //item.cpuUsage > 90 && issues.push(`CPU: ${item.cpuUsage}%`);
              item.ramUsage > 90 && issues.push(`RAM: ${item.ramUsage}%`);
              item.diskUsage > 80 && issues.push(`Disco: ${item.diskUsage}%`);

              const isAlert = issues.length > 0;
              const color = isAlert ?
                <StatusAnimation color={"red"} />
                : item.status === "activo" ?
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
              <th className="th-state">Estado</th>
              <th>Comentarios</th>
            </tr>
          </thead>
          <tbody>
            {uniqueElements.map((item, index) => {
              const issues = [];
              //item.cpuUsage > 90 && issues.push(`CPU: ${item.cpuUsage}%`);
              item.ramUsage > 90 && issues.push(`RAM: ${item.ramUsage}%`);
              item.diskUsage > 80 && issues.push(`Disk: ${item.diskUsage}%`);

              const isAlert = issues.length > 0;
              const color = isAlert ?
                <StatusAnimation color={"red"} />
                : item.status === "activo" ?
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
          <span>
            <svg width="14" height="14" viewBox="0 0 20 20">
              <circle cx="10" cy="10" r="10" fill="#00C400" />
            </svg> Normal</span>
          <span>
            <svg width="14" height="14" viewBox="0 0 20 20">
              <circle cx="10" cy="10" r="10" fill="#FFA500" />
            </svg> Mantenmiento</span>
          <span>
            <svg width="14" height="14" viewBox="0 0 20 20">
              <circle cx="10" cy="10" r="10" fill="#FF0000" />
            </svg> En riesgo</span>

        </div>
      </div>
    </>
  )
}

export default DashboardInsightsII
