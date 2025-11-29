const apiUrl = import.meta.env.VITE_API_URL_USERS

async function getUsers() {
    return fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
    })
    .catch((error) => {
        console.error("Error al obtener los usuarios: ", error);
    })
}

export default getUsers