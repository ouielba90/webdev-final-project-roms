function useHardwareApi() {
  const apiUrl = import.meta.env.VITE_API_URL_INVENTORY_HARDWARE;

  async function getHardware() {
    return fetch(apiUrl)
      .then((response) => {
        response.ok &&
          console.log(
            `Status: ${response.status}. Hardware data fetched correctly.`,
          );
        return response.json();
      })
      .catch((error) => console.log(`Error while fetching the data: ${error}`));
  }
  async function createHardware(postData) {
    return fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error creating hardware post:", error);
      });
  }
  async function updateHardware(id, updateData) {
    return fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error updating hardware post:", error);
      });
  }
  async function deleteHardware(id) {
    return fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error deleting hardware post:", error);
      });
  }

  return { getHardware, createHardware, updateHardware, deleteHardware };
}

export default useHardwareApi;
