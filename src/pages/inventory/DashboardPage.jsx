import { useContext } from "react";
import { DataContext } from "../../context/inventory/DataContext";

function DashboardPage() {
  const { software, hardware, licenses, servers } = useContext(DataContext);
  const totalNumRes = software.length + hardware.length + servers.length + licenses.length;

  const availableSoft = software.filter(el => el.status === "available").length;
  const inUseSoft = software.filter(el => el.status === "in-use").length;
  const operatHard = hardware.filter(el => el.status === "operational").length;
  const maintHard = hardware.filter(el => el.status === "maintenance").length;
  const activeServers = servers.filter(el => el.status === "active").length;
  const maintServers = servers.filter(el => el.status === "maintenance").length;
  const activeLic = licenses.filter(el => daysBetweenDates(el.expiryDate) > 0).length;
  const expiredLic = licenses.filter(el => daysBetweenDates(el.expiryDate) < 0).length;
  const sumActives = availableSoft + operatHard + activeServers + activeLic

  let riskLicenses = licenses
    .map(item => ({ softwareId: item.softwareId, daysLeft: daysBetweenDates(item.expiryDate) }))
    .sort((a, b) => a.daysLeft - b.daysLeft)
    .slice(0, 6);

  let highPopServer = servers
    .map(item => ({ serverId: item.id, connectedUsers: item.connectedUsers, name: item.name }))
    .sort((a, b) => b.connectedUsers - a.connectedUsers)
    .slice(0, 6)

  //console.log(riskLicenses)

  //  let usedSoft = software.map(item => ({ name: item.name, used: item.installedOnHardware.length }))
  //    .sort((a, b) => b.used - a.used)
  //    .slice(0, 3);

  //  let usedHard = hardware.map(item => ({ name: item.type + ' - ' + item.model, used: software.filter(s => s.installedOnHardware.find(el => el === item.id)).length }))
  //    .sort((a, b) => b.used - a.used)
  //    .slice(0, 5);

  const aggregated = getServerAverages(servers);
  let ramUse = aggregated.sort((a, b) => b.ramUsage - a.ramUsage)//.slice(0, 4);
  let diskUse = aggregated.sort((a, b) => b.diskUsage - a.diskUsage)//.slice(0, 4);
  let cpuUse = aggregated.sort((a, b) => b.cpuUsage - a.cpuUsage)//.slice(0, 4);

  let combined = [...cpuUse, ...ramUse, ...diskUse]
  const uniqueElements = Array.from(
    new Map(combined.map(item => [item.name, item])).values());

  //console.log(combined)
  return (
    <>
      <h1 className="dashboard-title">Dashboard</h1>
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
          <h3>Software</h3>
          <p>Activos {availableSoft}</p>
          <div className="bar-container">
            <div
              className="bar bar-active"
              style={{ width: `${(availableSoft / software.length) * 100}%` }}
            ></div>
          </div>

          <p>En uso {inUseSoft}</p>
          <div className="bar-container">
            <div
              className="bar bar-inuse"
              style={{ width: `${(inUseSoft / software.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="status-block hardware">
          <h3>Hardware</h3>
          <p>Operativos: {operatHard}</p>

          <div className="bar-container">
            <div
              className="bar bar-active"
              style={{ width: `${(operatHard / hardware.length) * 100}%` }}
            ></div>
          </div>

          <p>En mantenimiento: {maintHard}</p>
          <div className="bar-container">
            <div
              className="bar bar-maintenance"
              style={{ width: `${(maintHard / hardware.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="status-block licenses">
          <h3>Licencias</h3>
          <p>Activas: {activeLic}</p>

          <div className="bar-container">
            <div
              className="bar bar-active"
              style={{ width: `${(activeLic / licenses.length) * 100}%` }}
            ></div>
          </div>

          <p>Expiradas: {expiredLic}</p>
          <div className="bar-container">
            <div
              className="bar bar-expired"
              style={{ width: `${(expiredLic / licenses.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="status-block servers">
          <h3>Servidores</h3>
          <p>Activos: {activeServers}</p>

          <div className="bar-container">
            <div
              className="bar bar-active"
              style={{ width: `${(activeServers / servers.length) * 100}%` }}
            ></div>
          </div>

          <p>En mantenimiento: {maintServers}</p>
          <div className="bar-container">
            <div
              className="bar bar-maintenance"
              style={{ width: `${(maintServers / servers.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
      <div className="insights-container">

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
                    return (<tr key={index}><td>{item.name}</td><td>Todo normal</td><td>🟡</td></tr>)
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
                    return (<tr key={index}><td>{item.name}</td><td>Todo normal</td><td>🟡</td></tr>)
                  }
                  else {
                    return (<tr key={index}><td>{item.name}</td><td>El mantenimiento</td><td>🟠</td></tr>)
                  }
                }
              }).slice(6, 13)}
            </tbody>
          </table>
        </div>

      </div>
    </>

  )
}

function daysBetweenDates(euDateStr) {
  const [day, month, year] = euDateStr.split("/");
  const formattedDate = `${year}-${month}-${day}`;
  const givenDate = new Date(formattedDate);
  const today = new Date();
  const diffDays = Math.floor((today - givenDate) / (1000 * 60 * 60 * 24));
  return diffDays;
}

function getServerAverages(servers) {
  return servers.map(server => {
    const nodes = server.nodeSpecs;
    const avgCpu = nodes.reduce((sum, n) => sum + n.cpuUsage, 0) / nodes.length;
    const avgRam = nodes.reduce((sum, n) => sum + n.ramUsage, 0) / nodes.length;
    const avgDisk = nodes.reduce((sum, n) => sum + n.diskUsage, 0) / nodes.length;

    return {
      name: server.name,
      cpuUsage: avgCpu,
      ramUsage: avgRam,
      diskUsage: avgDisk,
      status: server.status
    };
  })//.filter(s => s.cpuUsage > 90 || s.ramUsage > 90 || s.diskUsage > 85);
}

export default DashboardPage
