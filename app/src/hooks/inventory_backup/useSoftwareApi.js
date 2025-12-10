function useSoftwareApi() {
  // No hace falta el .catch dentro del hook. De esta manera dejo que el error se propague
  // El catch solo lo manejo donde llamo al hook en el caso de hacer algo con el error.
  const apiUrl = import.meta.env.VITE_API_URL_INVENTORY_SOFTWARE;

  async function getSoftware() {
    return fetch(apiUrl).then((response) => {
      response.ok &&
        console.log(
          `Status: ${response.status}. Software data fetched correctly.`,
        );
      return response.json();
    });
  }

  async function createSoftware(postData) {
    return fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error creating software post:", error);
      });
  }
  async function updateSoftware(id, updateData) {
    return fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error updating software post:", error);
      });
  }
  async function deleteSoftware(id) {
    return fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error deleting software post:", error);
      });
  }

  return { getSoftware, createSoftware, updateSoftware, deleteSoftware };
}

export default useSoftwareApi;
