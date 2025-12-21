const apiUrl = import.meta.env.VITE_API_URL;

function useApi(specificUrl) {
    const fullApiUrl = `${apiUrl}/${specificUrl}`
    async function getData() {
        const token = localStorage.getItem('token');
        const headers = {};
        if (token) headers['Authorization'] = `Bearer ${token}`;

        return fetch(fullApiUrl, { headers }).then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP_ERROR_${response.status}`);
            }
            console.log(`Status: ${response.status}. Data fetched correctly.`);
            return response.json();
        });
    }

    async function createData(postData) {
        const token = localStorage.getItem('token');
        const headers = { "Content-Type": "application/json" };
        if (token) headers['Authorization'] = `Bearer ${token}`;

        return fetch(fullApiUrl, {
            method: "POST",
            headers,
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
        const token = localStorage.getItem('token');
        const headers = { "Content-Type": "application/json" };
        if (token) headers['Authorization'] = `Bearer ${token}`;

        return fetch(`${fullApiUrl}/${id}`, {
            method: "PUT",
            headers,
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
        const token = localStorage.getItem('token');
        const headers = {};
        if (token) headers['Authorization'] = `Bearer ${token}`;

        return fetch(`${fullApiUrl}/${id}`, {
            method: "DELETE",
            headers,
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
