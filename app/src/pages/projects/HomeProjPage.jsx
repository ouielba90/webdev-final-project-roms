<<<<<<< HEAD
import { useState } from 'react'
=======
<<<<<<< HEAD
import { useState } from 'react'
=======
import { projectSections } from '../../sections/projectSections.js'
import { useLocation } from 'react-router-dom'
import CompactMainMenu from './../../components/homepage/CompactMainMenu'
>>>>>>> a5f838f86d45b573f085550cc3e38001cefd6a15
>>>>>>> 545012a0c96339f27a3577867ecbab3140931746
import ProjectList from './../../components/projects/ProjectList'
import './StylesRicardo.css'

function HomeProjPage() {

<<<<<<< HEAD
  return (
    <>
=======
<<<<<<< HEAD
  return (
    <>
=======
  const currPath = useLocation() // Se obtiene la ruta actual
  function getSection(path) { // Determinar qué contenido se debe mostrar según la ruta
    console.log(path)
    const parts = path.split("/").filter(Boolean); // Divide la ruta por / y filter(Boolean) elimina cadenas vacías en el caso de tener slashes sueltos
    if (parts.length === 1) return "projects"; // Si solo hay un segmento en la ruta, se considera la sección principal (homeComm)
    if (parts.length === 2) { // Si hay dos segmentos toma el segundo como clave de sección, si existe en communicationSections, lo devuelve. Si no, devuelve "dashboard" (manejo de errores)
      const section = parts[1];
      return projectSections[section] ? section : "projects";
    }
  }

  const currentSection = getSection(currPath.pathname); // Llama a getSection pasando la ruta actual y obtiene la sección correspondiente.
  const sectionData = projectSections[currentSection]; // Busca los datos (title y subtext) de la sección seleccionada.

  return (
    <>
      <CompactMainMenu></CompactMainMenu>
      <h1 className="general-title">{sectionData.title}</h1>
      <h3 className="general-subtitle">{sectionData.subtext}</h3>
      <nav className="general-submenu">
      </nav>
>>>>>>> a5f838f86d45b573f085550cc3e38001cefd6a15
>>>>>>> 545012a0c96339f27a3577867ecbab3140931746
      <ProjectList />
    </>
  )
}

export default HomeProjPage
