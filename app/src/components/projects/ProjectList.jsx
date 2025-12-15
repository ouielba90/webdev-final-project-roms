import { useEffect, useState, useContext } from "react"
import ProjectItem from "./ProjectItem"
import ProjectCreate from "./ProjectCreate"
import ProjectDelete from "./ProjectDelete"
import ProjectEdit from "./ProjectEdit"
import fetchData from "./fetchData.js"
import { ApiDataContext } from "../../context/ApiDataContext";

// funcion para renderizar la lista de proyectos
function ProjectList() {
  //URLs de las APIs
  const apiProjectsLocalData = import.meta.env.VITE_API_URL_PROJECTS_LOCAL_DATA
  const apiProjectsUsersLocalData = import.meta.env.VITE_API_URL_PROJECTSUSERS_LOCAL_DATA
  //  const [useprojects, setUseProjects] = useState([])
  const [activeId, setActiveId] = useState(null)
  const [createOpen, setCreateOpen] = useState(false)
  const [deleteProject, setDeleteProject] = useState(null)
  const [projectEdit, setProjectEdit] = useState(null)
  //  const [projectsUsers, setProjectsUsers] = useState([])

  const { useprojects, setUseProjects, useProjectsApi, projectsUsers, setProjectsUsers, userProjectsUsersApi
  } = useContext(ApiDataContext)

  // useEffect(() => {
  //   //funcion para conectar con la API y extraer la informacion de los projectos
  //   const data = fetchData()
  //   data.getProjects(apiProjectsLocalData)
  //     .then((projectsData) => setUseProjects(projectsData))
  //     .catch((error) => console.log("Error al cargar los datos de proyectos:", error));

  //   //funcion para conectar con la API y extraer la informacion de usuarios asignados a proyectos
  //   data.getProjects(apiProjectsUsersLocalData)
  //     .then((projectsUsersData) => setProjectsUsers(projectsUsersData))
  //     .catch((error) => console.log("Error al cargar los datos de usuarios de proyectos:", error));
  // }, [])

  //funcion para crear un nuevo proyecto
  async function handleCreate(data) {
    const dataFetchData = fetchData()
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
    await useProjectsApi.createData(newProject)
    //dataFetchData.createProject(apiProjectsLocalData, newProject);
  }

  //funcion para eliminar el proyecto
  async function handleDelete(projectId) {
    const data = fetchData()
    setUseProjects((prev) => prev.filter((project) => project._id !== projectId))
    setDeleteProject(null)
    await data.deleteProject(projectId, apiProjectsLocalData);
  }

  //funcion para actualizar el proyecto editado
  async function handleUpdate(data) {
    const dataFetchData = fetchData()
    if (!projectEdit) return

    setUseProjects((prev) =>
      prev.map((project) =>
        project._id === projectEdit._id
          ? { ...project, ...data }
          : project
      )
    )
    setProjectEdit(null)
    await dataFetchData.updateProject(apiProjectsLocalData, projectEdit._id, data);
  }

  return (
    <>
      <div className="div-buttons-list-projects">
        <button className="btn-new-project" onClick={() => setCreateOpen(true)}>Crear projecto</button>
      </div>

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
