

function projectFetchData() {
    const apiProjects = import.meta.env.VITE_API_URL_PROJECTS;
    const apiProjectsUsers = import.meta.env.VITE_API_URL_PROJECTS_USERS;

    return fetch(apiProjects)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Error HTTP! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            // aseguramos que devuelva array
            return Array.isArray(data) ? data : [];
        })
        .catch((error) => {
            console.log("Error al cargar los datos:", error);
            return [];
        });
}

export default projectFetchData;