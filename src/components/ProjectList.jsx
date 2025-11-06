import { useState } from "react"
import ProjectItem from "./ProjectItem"
import projects from "../../data/projects"

function ProjectList() {

    return (
        <>
            <h1>Project list</h1>
            {projects.map((projects) => {
                return <ProjectItem key={projects.id} {...projects} />
            })}
        </>
    )
}

export default ProjectList