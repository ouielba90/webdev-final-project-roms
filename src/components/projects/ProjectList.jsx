import { useEffect, useState } from "react"
import ProjectItem from "./ProjectItem"
// las dos siguientes lineas son para usar datos locales
/*import listProjects from "./../../../data/projects"*/
/*import projectsUsers from "./../../../data/projectsUsers"*/
import ProjectCreate from "./ProjectCreate"
import ProjectDelete from "./ProjectDelete"
import ProjectEdit from "./ProjectEdit"
import FetchData from "./FetchData"

function ProjectList() {
  //URLs de las APIs
  const apiProjects = import.meta.env.VITE_API_URL_PROJECTS;
  const apiProjectsUsers = import.meta.env.VITE_API_URL_PROJECTS_USERS;
  //la siguiente linea es para usar datos locales
  /*const [useprojects, setUseProjects] = useState(listProjects)*/
  const [useprojects, setUseProjects] = useState([])

  const [activeId, setActiveId] = useState(null)
  const [createOpen, setCreateOpen] = useState(false)
  const [deleteProject, setDeleteProject] = useState(null)
  const [projectEdit, setProjectEdit] = useState(null)
  const [projectsUsers, setProjectsUsers] = useState([])

  useEffect(() => {
    async function loadProjects() {
      const data = await FetchData(apiProjects);
      if (Array.isArray(data)) {
        setUseProjects(data);
      } else {
        // Manejo de caso inesperado
        console.log("Formato inesperado:", data);
      }
    }
    loadProjects()

    async function loadProjectsUsers() {
      const dataUsers = await FetchData(apiProjectsUsers);
      if (Array.isArray(dataUsers)) {
        setProjectsUsers(dataUsers);
      } else {
        // Manejo de caso inesperado
        console.log("Formato inesperado:", dataUsers);
      }  
    }
    loadProjectsUsers()
  }, [])

  //funcion para crear un nuevo proyecto
  function handleCreate(data) {
    const newProject = {
      id: globalThis.crypto?.randomUUID?.() || `p_${Date.now().toString(36)}`,
      //valores del formulario
      name: data.name,
      client: data.client,
      description: data.description,
      //valores por defecto
      status: data.status || "Pendiente",
      task: data.task || [],
      users: data.users || [],
    }
    setUseProjects((prev) => [...prev, newProject])
    setCreateOpen(false)
  }

  //funcion para eliminar el proyecto
  function handleDelete(projectId) {
    setUseProjects((prev) => prev.filter((project) => project.id !== projectId))
    setDeleteProject(null)
  }

  //funcion para actualizar el proyecto editado
  function handleUpdate(data) {
    if (!projectEdit) return

    setUseProjects((prev) =>
      prev.map((project) =>
        project.id === projectEdit.id
          ? { ...project, ...data }
          : project
      )
    )
    setProjectEdit(null)
  }

  return (
    <>
      <h1>Project list</h1>
      <button className="btn-new-project" onClick={() => setCreateOpen(true)}>Crear projecto</button>
      {createOpen && (
        <ProjectCreate
          onClose={() => setCreateOpen(false)}
          onSumit={handleCreate}
        />
      )}

      {deleteProject && (
        <ProjectDelete
          project={deleteProject}
          onCancel={() => setDeleteProject(null)}
          onConfirm={handleDelete}
        />
      )}

      {projectEdit && (
        <ProjectEdit
          key={projectEdit.id}
          project={projectEdit}
          onClose={() => setProjectEdit(null)}
          onSubmit={handleUpdate}
        />
      )}

      <div className="list-projects">
        {useprojects.map((projects) => {
          return <ProjectItem
            key={projects.id}
            project={projects}
            projectUsers={projectsUsers}
            activeId={activeId}
            setActiveId={setActiveId}
            onDelete={(current) => setDeleteProject(current)}
            onEdit={(current) => setProjectEdit(current)}
          />
        })}
      </div>
    </>
  )
}

export default ProjectList
