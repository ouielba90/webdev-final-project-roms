const apiUrl = import.meta.env.VITE_API_URL;

function useApi(specificUrl) {
    const fullApiUrl = `${apiUrl}/${specificUrl}`
    async function getData() {
        return fetch(fullApiUrl).then((response) => {
            response.ok &&
                console.log(
                    `Status: ${response.status}. Data fetched correctly.`,
                );
            return response.json();
        });
    }

    async function createData(postData) {
        return fetch(fullApiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(postData),
        })
            .then((response) => response.json())
            .catch((error) => {
                console.error("Error creating post:", error);
            });
    }
    async function updateData(id, updateData) {
        return fetch(`${fullApiUrl}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updateData),
        })
            .then((response) => response.json())
            .catch((error) => {
                console.error("Error updating post:", error);
            });
    }
    async function deleteData(id) {
        return fetch(`${fullApiUrl}/${id}`, {
            method: "DELETE",
        })
            .then((response) => response.json())
            .catch((error) => {
                console.error("Error deleting post:", error);
            });
    }

    return { getData, createData, updateData, deleteData };
}

export default useApi;
