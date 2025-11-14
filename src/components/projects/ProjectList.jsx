import { useState } from "react"
import ProjectItem from "./ProjectItem"
import projects from "./../../../data/projects"
import projectsUsers from "./../../../data/projectsUsers"

function ProjectList() {

  const [activeId, setActiveId] = useState(null);

  return (
    <>
      <h1>Project list</h1>
      <button className="btn-new-project">Crear projecto</button>
      <div className="list-projects">
        {projects.map((projects) => {
          return <ProjectItem key={projects.id} {...projects} projectUsers={projectsUsers} activeId={activeId} setActiveId={setActiveId}/>
        })}
      </div>
    </>
  )
}

export default ProjectList
