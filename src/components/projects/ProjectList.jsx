import { useEffect, useState } from "react"
import ProjectItem from "./ProjectItem"
import listProjects from "./../../../data/projects"
import projectsUsers from "./../../../data/projectsUsers"
import ProjectCreate from "./ProjectCreate"

function ProjectList() {

  const [useprojects, setUseProjects] = useState(listProjects)
  const [activeId, setActiveId] = useState(null)
  const [createOpen, setCreateOpen] = useState(false)

  useEffect(() => {
    setUseProjects(listProjects)
  }, [])

  function handleCeate(data) {
    const newProject = {
      id: listProjects.length + 1,
      name: "Nuevo Proyecto",
      client: "Cliente X",
      status: "Pendiente",
      description: "Descripción del nuevo proyecto",
      tasks: [],
    }
    setUseProjects((prev) => [...prev, newProject])
    setCreateOpen(false)
  }

  return (
    <>
      <h1>Project list</h1>
      <button className="btn-new-project" onClick={() => setCreateOpen(true)}>Crear projecto</button>
      {createOpen && (
        <ProjectCreate
          onClose={() => setCreateOpen(false)}
          onSumit={handleCeate}
        />
      )}

      <div className="list-projects">
        {listProjects.map((projects) => {
          return <ProjectItem key={projects.id} {...projects} projectUsers={projectsUsers} activeId={activeId} setActiveId={setActiveId} />
        })}
      </div>
    </>
  )
}

export default ProjectList
