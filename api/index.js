import cors from "cors"
import express from "express"

const api = express();
const PORT = 3000

api.use(cors())

api.get("/", (req, res) => {
    res.send("Hello World!")
})

api.listen(PORT, () => {
    console.log(`API server running at http:localhost:${PORT}`)
})

import projects from "./data/projects.data.js"
import projectsUsers from "./data/projectsUsers.data.js"

console.log("Datos de posts cargados", projects)
console.log("Datos de projectsUsers cargados", projectsUsers)

api.get("/projects", (req, res) => {
    console.log("Extrayendo los datos de proyectos")
    res.json(projects)
})

api.get("/projectsUsers", (req, res) => {
    console.log("Extrayendo los datos de usuarios asignados a proyectos")
    res.json(projectsUsers)
})