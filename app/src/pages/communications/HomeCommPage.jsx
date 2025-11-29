import { Link, Outlet, useLocation } from "react-router-dom"
import './../../index.css'
import CompactMainMenu from './../../components/homepage/CompactMainMenu'
import { communicationSections } from "../../sections/communicationSections.js"; // Importa la configuración de secciones (title y subtext) que se mostrarán según la ruta

function HomeCommPage() {
  const currPath = useLocation() // Se obtiene la ruta actual
  function getSection(path) { // Determinar qué contenido se debe mostrar según la ruta
    const parts = path.split("/").filter(Boolean); // Divide la ruta por / y filter(Boolean) elimina cadenas vacías en el caso de tener slashes sueltos
    if (parts.length === 1) return "homeComm"; // Si solo hay un segmento en la ruta, se considera la sección principal (homeComm)
    if (parts.length === 2) { // Si hay dos segmentos toma el segundo como clave de sección, si existe en communicationSections, lo devuelve. Si no, devuelve "dashboard" (manejo de errores)
      const section = parts[1];
      return communicationSections[section] ? section : "homeComm";
    }
  }

  const currentSection = getSection(currPath.pathname); // Llama a getSection pasando la ruta actual y obtiene la sección correspondiente.
  const sectionData = communicationSections[currentSection]; // Busca los datos (title y subtext) de la sección seleccionada.
  return (
    <>
      <CompactMainMenu></CompactMainMenu>
      <h1 className="general-title">{sectionData.title}</h1>
      <h3 className="general-subtitle">{sectionData.subtext}</h3>
      <nav className="general-submenu">
        <Link to='/communications/messages'>Mensajes</Link>
        <Link to='/communications/notifications'>Notificaciones</Link>
        <Link to='/communications/internal-chats'>Chats Internos</Link>
        <Link to='/communications/client-chats'>Chats con Clientes</Link>
      </nav>
      <Outlet></Outlet>
    </>
  )
}

export default HomeCommPage
