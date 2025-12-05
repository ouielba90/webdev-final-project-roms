function DashboardGeneralStatus({ totalNumRes, subTotalRes, sumActives, availableSoft, inUseSoft, operatHard, maintHard, activeLic, expiredLic, activeServers, maintServers }) {
  return (
    <>
      <div className="status-grid">
        <h2 className="section-title">Estado General</h2>
        <div className="status-block-main">
          <h3>Total recursos</h3>
          <p className="total-num-res">{totalNumRes}</p>
          <p>Activos {sumActives}</p>
          <div className="bar-container">
            <div
              className="bar bar-active"
              style={{ width: `${(sumActives / totalNumRes) * 100}%` }}
            ></div>
          </div>

          <p>Inactivos {totalNumRes - sumActives}</p>

          <div className="bar-container">
            <div
              className="bar bar-inactive"
              style={{ width: `${((totalNumRes - sumActives) / totalNumRes) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="status-block software">
          <h3>📦 Software</h3>
          <p>Activos {availableSoft}</p>
          <div className="bar-container">
            <div
              className="bar bar-active"
              style={{ width: `${(availableSoft / subTotalRes.software) * 100}%` }}
            ></div>
          </div>

          <p>En uso {inUseSoft}</p>
          <div className="bar-container">
            <div
              className="bar bar-inuse"
              style={{ width: `${(inUseSoft / subTotalRes.software) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="status-block hardware">
          <h3>💻 Hardware</h3>
          <p>Operativos: {operatHard}</p>

          <div className="bar-container">
            <div
              className="bar bar-active"
              style={{ width: `${(operatHard / subTotalRes.hardware) * 100}%` }}
            ></div>
          </div>

          <p>En mantenimiento: {maintHard}</p>
          <div className="bar-container">
            <div
              className="bar bar-maintenance"
              style={{ width: `${(maintHard / subTotalRes.hardware) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="status-block licenses">
          <h3>🔑 Licencias</h3>
          <p>Activas: {activeLic}</p>

          <div className="bar-container">
            <div
              className="bar bar-active"
              style={{ width: `${(activeLic / subTotalRes.licenses) * 100}%` }}
            ></div>
          </div>

          <p>Expiradas: {expiredLic}</p>
          <div className="bar-container">
            <div
              className="bar bar-expired"
              style={{ width: `${(expiredLic / subTotalRes.licenses) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="status-block servers">
          <h3>🗄️ Servidores</h3>
          <p>Activos: {activeServers}</p>

          <div className="bar-container">
            <div
              className="bar bar-active"
              style={{ width: `${(activeServers / subTotalRes.servers) * 100}%` }}
            ></div>
          </div>

          <p>En mantenimiento: {maintServers}</p>
          <div className="bar-container">
            <div
              className="bar bar-maintenance"
              style={{ width: `${(maintServers / subTotalRes.servers) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardGeneralStatus
