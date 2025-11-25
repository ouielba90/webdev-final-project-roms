function DashboardInsightsI({ riskLicenses, highPopServer, software }) {
  return (
    <>

      <div className="insights-card insights-licenses">
        <h2 className="section-title">Licencias en riesgo</h2>

        <table className="table-licenses">
          <thead>
            <tr>
              <th>Software</th>
              <th>Estado</th>
              <th></th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {riskLicenses.map((item) => {
              if (item.daysLeft < 0) {
                return (
                  <tr key={item.softwareId}>
                    <td>{software.filter(s => s.id === item.softwareId).map(s => s.name)}</td>
                    <td>Expirada</td>
                    <td>🔴</td>
                  </tr>
                );
              } else if (item.daysLeft > 0 && item.daysLeft < 30) {
                return (
                  <tr key={item.softwareId}>
                    <td>{software.filter(s => s.id === item.softwareId).map(s => s.name)}</td>
                    <td>Expira en {item.daysLeft}</td>
                    <td>🟡</td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>

      <div className="insights-card insights-top-resources">
        <h2 className="section-title">Recursos más utilizados</h2>

        <table className="table-top-resources">
          <thead>
            <tr>
              <th className="th-server">Server</th>
              <th className="th-users">Usuarios conectados</th>
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
      </div>

    </>
  )
}

export default DashboardInsightsI
