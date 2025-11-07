import { useContext } from "react";
import { DataContext } from "../../context/DataContext";

function DashboardPage() {
  const { software, hardware, licenses, servers } = useContext(DataContext);
  const totalNumRes = software.length + hardware.length + servers.length;

  const availableSoft = software.filter(el => el.status === "available").length;
  const availableHard = hardware.filter(el => el.status === "operational").length;
  const activeServers = servers.filter(el => el.status === "active").length;
  const maintServers = servers.filter(el => el.status === "maintenance").length;
  const nextRenewal = licenses.filter(el => daysBetweenDates(el.expiryDate) > 0).length;

  return (
    <>
      <h1>Dashboard</h1>
      <div>
        <h2>Estado General</h2>
        <p>Total recursos: {totalNumRes}</p>
        <p>Software disponibles: {availableSoft}</p>
        <p>Hardware operativo: {availableHard} </p>
        <p>Servidores activos: {activeServers} </p>
        <p>Servidores en mantenimiento: {maintServers}</p>
        <p>Renovaciones próximas: {nextRenewal}</p>
      </div>
      <div>
        <h1>Inventario destacado</h1>
        <p>{software[24].name}</p>
        <p>{hardware[12].model}</p>
      </div>
      <div>
        <h1>Actividad reciente</h1>
      </div>
      <div>
        <h1>Alertas rápidas</h1>
      </div>
      <div>
        <h1>Responsables principales</h1>
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
