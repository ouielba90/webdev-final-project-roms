import { useEffect, useState } from "react"
import ProjectItem from "./ProjectItem"
import listProjects from "./../../../data/projects"
import projectsUsers from "./../../../data/projectsUsers"
import ProjectCreate from "./ProjectCreate"
import ProjectDelete from "./ProjectDelete"
import ProjectEdit from "./ProjectEdit"

function ProjectList() {

  const [useprojects, setUseProjects] = useState(listProjects)
  const [activeId, setActiveId] = useState(null)
  const [createOpen, setCreateOpen] = useState(false)
  const [deleteProject, setDeleteProject] = useState(null)
  const [projectEdit, setProjectEdit] = useState(null)

  useEffect(() => {
    setUseProjects(listProjects)
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
    console.log("Updating project:", data.name)
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
