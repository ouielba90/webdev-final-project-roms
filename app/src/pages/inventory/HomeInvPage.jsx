import { Link, Outlet, useLocation } from 'react-router-dom'
import { DataContext } from "../../context/inventory/DataContext";
import { inventorySections } from "../../sections/inventorySections.js";
import "./../../indexOuissam.css"
import CompactMainMenu from '../../components/homepage/CompactMainMenu'
import { useContext } from 'react';
import LoadingAnimation from '../../components/inventory/LoadingAnimation.jsx';
import ErrorAnimation from '../../components/inventory/ErrorAnimation.jsx';

function HomeInvPage() {
  const { software, hardware, licenses, servers, error } = useContext(DataContext);
  const currPath = useLocation()

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
        const sw = software.find(s => s._id === parts[2]);
        inventorySections[parts] = {
          title: `Software: ${sw?.name || "cargando información"}`,
          subtext: "Información detallada de este software"
        }
        return parts;
      }
      if (section === "hardware") {
        const hw = hardware.find(h => h._id === parts[2]);
        inventorySections[parts] = {
          title: `Hardware: ${hw?.model || "cargando información..."}`,
          subtext: "Información detallada de este hardware"
        }
        return parts;
      }
      if (section === "licenses") {
        const sw = software.find(s => s.licenseId === parts[2]);
        inventorySections[parts] = {
          title: `Licencia: ${sw?.name || "cargando información..."}`,
          subtext: "Información detallada de esta licencia"
        }
        return parts
      }
      if (section === "servers") {
        const serv = servers.find(s => s._id === parts[2]);
        inventorySections[parts] = {
          title: `Servidor: ${serv?.name || "cargando información..."}`,
          subtext: "Información detallada de este servidor"
        }
        return parts;
      }
      return inventorySections[section] ? section : "dashboard";
    }
  }

  const currentSection = getSection(currPath.pathname);
  const sectionData = inventorySections[currentSection];

  return (
    <>
      <CompactMainMenu></CompactMainMenu>
      <div className="spacing-top">
        <div className="general-header">
          <h1 className="general-title">{sectionData.title}</h1>
          <h3 className="general-subtitle">{sectionData.subtext}</h3>
        </div>
      </div>
      <nav className="general-submenu">
        <Link to="/inventory">Centro de inventario</Link>
        <Link to="/inventory/software">Software</Link>
        <Link to="/inventory/hardware">Hardware</Link>
        <Link to="/inventory/licenses">Licencias</Link>
        <Link to="/inventory/servers">Servidores</Link>
      </nav>
      {error.length > 0 ?
        <ErrorAnimation />
        : [software, hardware, licenses, servers].some(arr => arr.length === 0) ?
          <LoadingAnimation />
          : <Outlet />
      }
    </>
  )
}

export default HomeInvPage
