import { useContext } from "react";
import { DataContext } from "../../context/DataContext";

function DashboardPage() {
  const { software, hardware, licenses, servers } = useContext(DataContext);
  const totalNumRes = software.length + hardware.length + servers.length;

  const availableSoft = software.filter(el => el.status === "available").length;
  const inUseSoft = software.filter(el => el.status === "in-use").length;
  const maintSoft = software.filter(el => el.status === "maintenance").length;
  const operatHard = hardware.filter(el => el.status === "operational").length;
  const maintHard = hardware.filter(el => el.status === "maintenance").length;
  const activeServers = servers.filter(el => el.status === "active").length;
  const maintServers = servers.filter(el => el.status === "maintenance").length;
  const activeLic = licenses.filter(el => daysBetweenDates(el.expiryDate) > 0).length;
  const expiredLic = licenses.filter(el => daysBetweenDates(el.expiryDate) < 0).length;
  const sumActives = 100 * (availableSoft + operatHard + activeServers + activeLic) / 200

  let riskLicenses = licenses.filter(item => item.status === "expiring" || item.status === "expired")
    .map(item => ({ softwareIds: item.softwareIds, daysLeft: daysBetweenDates(item.expiryDate) }))
    .sort((a, b) => a.daysLeft - b.daysLeft)
    .slice(0, 5);

  let usedSoft = software.map(item => ({ name: item.name, used: item.installedOnHardware.length }))
    .sort((a, b) => b.used - a.used)
    .slice(0, 5);

  let usedHard = hardware.map(item => ({ name: item.type + ' - ' + item.model, used: item.installedSoftware.length }))
    .sort((a, b) => b.used - a.used)
    .slice(0, 5);

  let ramUse = servers.map(item => ({ name: item.name, cpuUsage: item.cpuUsage, ramUsage: item.ramUsage, diskUsage: item.diskUsage }))
    .sort((a, b) => b.ramUsage - a.ramUsage)
    .slice(0, 4);

  let diskUse = servers.map(item => ({ name: item.name, cpuUsage: item.cpuUsage, ramUsage: item.ramUsage, diskUsage: item.diskUsage }))
    .sort((a, b) => b.diskUsage - a.diskUsage)
    .slice(0, 4);

  let cpuUse = servers.map(item => ({ name: item.name, cpuUsage: item.cpuUsage, ramUsage: item.ramUsage, diskUsage: item.diskUsage }))
    .sort((a, b) => b.cpuUsage - a.cpuUsage)
    .slice(0, 4);

  let combined = [...cpuUse, ...ramUse, ...diskUse]
  const uniqueElements = Array.from(
    new Map(combined.map(item => [item.name, item])).values());

  return (
    <>
      <h1>Dashboard</h1>
      <div>
        <h2>Estado General</h2>
        <p>Total recursos: {totalNumRes}</p>
        <p>Software: {availableSoft} disponibles / {inUseSoft} en uso / {maintSoft} en mantenimiento</p>
        <p>Hardware: {operatHard} operativos / {maintHard} en mantenimiento</p>
        <p>Licencias: {activeLic} activas / {expiredLic} expiradas </p>
        <p>Servidores: {activeServers} activos / {maintServers} en mantenimiento</p>
        <p>Proporción general de activos: {sumActives}%</p>
      </div>
      <div>
        <h2>Recursos con riesgo o atención prioritaria</h2>
        {riskLicenses.map((item) => {
          if (item.daysLeft < 0) {
            return (<p>{software.filter(s => s.id === item.softwareIds[0]).map(s => s.name)} - expirada</p>)
          } else {
            return (<p>{software.filter(s => s.id === item.softwareIds[0]).map(s => s.name)} expira en {item.daysLeft} dias</p>)
          }
        })}
      </div>
      <div>
        <h2>Recursos más utilizados</h2>
        {usedSoft.map((item) => <p>{item.name} - {item.used} instalaciones</p>)}
        {usedHard.map((item) => <p>{item.name} - {item.used} softwares activos</p>)}
      </div>
      <div>
        <h2>Servidores que requieren atención</h2>
        {uniqueElements.map((item) => <p>{item.name} - CPU: {item.cpuUsage}%, RAM: {item.ramUsage}%, Disco: {item.diskUsage}%</p>)}
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

export default DashboardPage 
