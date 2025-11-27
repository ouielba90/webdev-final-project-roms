import { Link, Outlet, useLocation } from 'react-router-dom'
import { DataContext } from "../../context/inventory/DataContext";
import { inventorySections } from "../../sections/inventorySections.js";
import "./../../indexOuissam.css"
import CompactMainMenu from '../../components/homepage/CompactMainMenu'
import { useContext } from 'react';
import LoadingAnimation from '../../components/inventory/LoadingAnimation.jsx';

function HomeInvPage() {
  const { software, hardware, servers } = useContext(DataContext);
  const currPath = useLocation()

  if (!software.length || !hardware.length || !servers.length) {
    return (
      <>
        <CompactMainMenu />
        <LoadingAnimation />
      </>)
  }

  function getSection(path) {
    const parts = path.split("/").filter(Boolean);
    if (parts.length === 1) return "dashboard";
    if (parts.length === 2) {
      const section = parts[1];
      return inventorySections[section] ? section : "dashboard";
    }
    if (parts.length === 3) {
      const section = parts[1];
      if (section === "software") {
        inventorySections[parts] = {
          title: `Software: ${software.find(s => s.id === Number(parts[2])).name}`,
          subtext: "Información detallada de este software"
        }
        return parts
      }
      if (section === "hardware") {
        inventorySections[parts] = {
          title: `Hardware: ${hardware.find(s => s.id === Number(parts[2])).model}`,
          subtext: "Información detallada de este hardware"
        }
        return parts
      }
      if (section === "licenses") {
        inventorySections[parts] = {
          title: `Licencia: ${parts[2]}`,
          subtext: "Información detallada de esta licencia"
        }
        return parts
      }
      if (section === "servers") {
        inventorySections[parts] = {
          title: `Servidor: ${servers.find(s => s.id === Number(parts[2])).name}`,
          subtext: "Información detallada de este servidor"
        }
        return parts
      }
      return inventorySections[section] ? section : "dashboard";
    }
  }

  const currentSection = getSection(currPath.pathname);
  const sectionData = inventorySections[currentSection];

  return (
    <>
      <CompactMainMenu></CompactMainMenu>
      <h1 className="dashboard-title">{sectionData.title}</h1>
      <h3 className="dashboard-subtitle">{sectionData.subtext}</h3>
      <nav className="inventory-submenu">
        <Link to="/inventory">Centro de inventario</Link>
        <Link to="/inventory/software">Software</Link>
        <Link to="/inventory/hardware">Hardware</Link>
        <Link to="/inventory/licenses">Licencias</Link>
        <Link to="/inventory/servers">Servidores</Link>
      </nav>
      <div className="inventory-content">
        <Outlet />
      </div>
    </>
  )
}

export default HomeInvPage
