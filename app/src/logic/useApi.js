const apiUrl = import.meta.env.VITE_API_URL;

function useApi(specificUrl) {
    const fullApiUrl = `${apiUrl}/${specificUrl}`
    async function getData() {
        return fetch(fullApiUrl).then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP_ERROR_${response.status}`);
            }
            console.log(`Status: ${response.status}. Data fetched correctly.`);
            return response.json();
        });
    }

    async function createData(postData) {
        return fetch(fullApiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(postData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP_ERROR_${response.status}`);
                }
                return response.json();
            })
    }

    async function updateData(id, updateData) {
        return fetch(`${fullApiUrl}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updateData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP_ERROR_${response.status}`);
                }
                return response.json();
            })
    }

    async function deleteData(id) {
        return fetch(`${fullApiUrl}/${id}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP_ERROR_${response.status}`);
                }
                return response.json();
            })
    }

    return { getData, createData, updateData, deleteData };
}

export default useApi;
