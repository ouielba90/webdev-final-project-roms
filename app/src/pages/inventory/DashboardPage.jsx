import { useContext } from "react";
import { DataContext } from "../../context/inventory/DataContext";
import LoadingAnimation from "../../components/inventory/LoadingAnimation.jsx"
import DashboardGeneralStatus from "../../components/inventory/DashboardGeneralStatus.jsx"
import DashboardInsightsI from "../../components/inventory/DashboardInsightsI";
import DashboardInsightsII from "../../components/inventory/DashboardInsightsII.jsx";

function DashboardPage() {
  const { software, hardware, licenses, servers } = useContext(DataContext);
  const totalNumRes = software.length + hardware.length + servers.length + licenses.length;
  //const [subTotalRes, setSubTotalRes] = useState({
  //  software: software.length,
  //  hardware: hardware.length,
  //  licenses: licenses.length,
  //  servers: servers.length,
  //})
  let subTotalRes = {
    software: software.length,
    hardware: hardware.length,
    licenses: licenses.length,
    servers: servers.length,
  }
  const availableSoft = software.filter(el => el.status === "disponible").length;
  const inUseSoft = software.filter(el => el.status === "en-uso").length;
  const operatHard = hardware.filter(el => el.status === "operativo").length;
  const maintHard = hardware.filter(el => el.status === "mantenimiento").length;
  const activeServers = servers.filter(el => el.status === "activo").length;
  const maintServers = servers.filter(el => el.status === "mantenimiento").length;
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
      {Object.values(subTotalRes).reduce((sum, value) => sum + value, 0) > 0 ?
        <>
          <DashboardGeneralStatus
            totalNumRes={totalNumRes}
            sumActives={sumActives}
            availableSoft={availableSoft}
            inUseSoft={inUseSoft}
            operatHard={operatHard}
            maintHard={maintHard}
            activeLic={activeLic}
            expiredLic={expiredLic}
            activeServers={activeServers}
            maintServers={maintServers}
            subTotalRes={subTotalRes}
          />
          <div className="insights-container">
            <DashboardInsightsI
              riskLicenses={riskLicenses}
              highPopServer={highPopServer}
              software={software}
            />
            <DashboardInsightsII
              uniqueElements={uniqueElements}
            />
          </div>
        </>
        : <LoadingAnimation />
      }
    </>
  )
}

function daysBetweenDates(isoDateStr) {
  const givenDate = new Date(isoDateStr);
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
