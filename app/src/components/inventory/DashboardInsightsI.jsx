import StatusAnimation from "./StatusAnimation.jsx"
function DashboardInsightsI({ riskLicenses, lastMaintHard, software }) {
  return (
    <>

      <div className="insights-card insights-licenses">
        <h2 className="section-title">Licencias en riesgo</h2>

        <table className="table-licenses">
          <thead>
            <tr>
              <th>Software</th>
              <th className="th-state">Estado</th>
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
                  <td>{software.filter(s => s._id === item.softwareId).map(s => s.name)}</td>
                  <td className="issues">{color}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="legend">
          <span>
            <svg width="14" height="14" viewBox="0 0 20 20">
              <circle cx="10" cy="10" r="10" fill="#FFA500" />
            </svg>
            &lt;30 días para expirar</span>
          <span>
            <svg width="14" height="14" viewBox="0 0 20 20">
              <circle cx="10" cy="10" r="10" fill="#FF0000" />
            </svg> Expirada</span>
        </div>

      </div>

      <div className="insights-card insights-top-resources">
        <h2 className="section-title">Estado del hardware</h2>

        <table className="table-top-resources">
          <thead>
            <tr>
              <th>Hardware</th>
              <th className="th-state">Estado</th>
            </tr>
          </thead>

          <tbody>
            {lastMaintHard.map((item) => {
              const isAlert = item.daysLastMaintenance < -365;
              const color = isAlert ?
                <StatusAnimation color={"red"} />
                : item.daysLastMaintenance >= -365 && item.daysLastMaintenance < -305 ?
                  <StatusAnimation color={"orange"} />
                  : undefined
              return (
                <tr key={item.id}>
                  <td>{item.model}</td>
                  <td className="th-state">{color}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div className="legend">
          <span>
            <svg width="14" height="14" viewBox="0 0 20 20">
              <circle cx="10" cy="10" r="10" fill="#FFA500" />
            </svg>
            &lt;60 días para revisión
            <span>
              <svg width="14" height="14" viewBox="0 0 20 20">
                <circle cx="10" cy="10" r="10" fill="#FF0000" />
              </svg>
              &gt;1 año sin mantenimiento </span>
          </span>
        </div>
      </div>

    </>
  )
}

export default DashboardInsightsI
