import { useState } from "react"
import ProjectItem from "./ProjectItem"
import projects from "./../../../data/projects"

function ProjectList() {

  return (
    <>
      <h1>Project list</h1>
      <div className="list-projects">
        {projects.map((projects) => {
          return <ProjectItem key={projects.id} {...projects} />
        })}
      </div>
    </>
  )
}

export default ProjectList
