async function getProjects() {
    return fetch("http://localhost:3000/projects")
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        return data
    })
    .catch((error) =>{
        console.error("Error al obtener los proyectos: ",error)
    })
}

export default getProjects