import { useEffect, useState } from "react"
import ProjectItem from "./ProjectItem"
import listProjects from "./../../../data/projects"
import projectsUsers from "./../../../data/projectsUsers"
import ProjectCreate from "./ProjectCreate"
import ProjectDelete from "./ProjectDelete"

function ProjectList() {

  const [useprojects, setUseProjects] = useState(listProjects)
  const [activeId, setActiveId] = useState(null)
  const [createOpen, setCreateOpen] = useState(false)
  const [deleteProject, setDeleteProject] = useState(null)

  useEffect(() => {
    setUseProjects(listProjects)
  }, [])

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

  function handleDelete(projectId) {
    setUseProjects((prev) => prev.filter((project) => project.id !== projectId))
    setDeleteProject(null)
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


      <div className="list-projects">
        {useprojects.map((projects) => {
          return <ProjectItem
            key={projects.id}
            project={projects}
            projectUsers={projectsUsers}
            activeId={activeId}
            setActiveId={setActiveId}
            onDelete={(current) => setDeleteProject(current)}
          />
        })}
      </div>
    </>
  )
}

export default ProjectList
