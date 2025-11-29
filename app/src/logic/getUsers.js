async function getUsers() {
    return fetch("[http://localhost:${PORT}](http://localhost:${PORT})")
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
    })
    .catch((error) => {
        console.error("Error al obtener los usuarios: ", error);
    })
}

export default getUsers