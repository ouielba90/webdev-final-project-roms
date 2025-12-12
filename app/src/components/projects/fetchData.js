
// Función para obtener datos de proyectos desde una API
function fetchData() {
    
    async function getProjects(apiUrl) {
        console.log("Cargando proyectos desde la API...");
        return fetch(apiUrl)
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

    async function createProject(apiUrl, postData) {
        return fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(postData),
        })
            .then((response) => response.json())
            .catch((error) => {
                console.error("Error al crear projecto:", error);
            });
    }

    async function deleteProject(id, apiUrl) {
        return fetch(`${apiUrl}/${id}`, {
            method: "DELETE",
        })
            .then((response) => response.json())
            .catch((error) => {
                console.error("Error al eliminar projecto:", error);
            });
    }

    async function updateProject(apiUrl, id, updateData) {
        return fetch(`${apiUrl}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },    
            body: JSON.stringify(updateData),
        })
            .then((response) => response.json())
            .catch((error) => {
                console.error("Error al actualizar projecto:", error);
            });
    }

    return { getProjects, createProject, deleteProject, updateProject };
}

export default fetchData;

