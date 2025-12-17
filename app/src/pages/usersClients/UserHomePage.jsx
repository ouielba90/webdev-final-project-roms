import './stylesMarc.css'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import CompactMainMenu from '../../components/homepage/CompactMainMenu'
import { userSections } from '../../sections/userSections'
import { ApiDataContext } from '../../context/ApiDataContext.js' 

function UsersHomePage() {
  const navigate = useNavigate()
  const location = useLocation()

  const { setUsers, usersApi, setError } = useContext(ApiDataContext)
  const currPath = useLocation() // Se obtiene la ruta actual

  useEffect(() => { usersApi.getData().then(setUsers).catch(e => setError(p => [...p, e])); }, []);

  function getSection(path) { // Determinar qué contenido se debe mostrar según la ruta
    const parts = path.split("/").filter(Boolean); // Divide la ruta por / y filter(Boolean) elimina cadenas vacías en el caso de tener slashes sueltos

    if (parts.length === 1) return "homeUser"; // Si solo hay un segmento en la ruta, se considera la sección principal (homeComm)
    if (parts.length === 2) { // Si hay dos segmentos toma el segundo como clave de sección, si existe en communicationSections, lo devuelve. Si no, devuelve "dashboard" (manejo de errores)
      const section = parts[1];

      return userSections[section] ? section : "homeUser";
    }

    return "homeUser"; // Si hay más de dos segmentos, se devuelve "dashboard" (manejo de errores)
  }

  const currentSection = getSection(currPath.pathname); // Llama a getSection pasando la ruta actual y obtiene la sección correspondiente.
  const sectionData = userSections[currentSection]; // Busca los datos (title y subtext) de la sección seleccionada.

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
        <Link to='/users/clientsList'>Clientes</Link>
        <Link to='/users/usersList'>Lista de Usuarios</Link>
      </nav>
      <Outlet></Outlet>
    </>
  )
}

export default UsersHomePage
