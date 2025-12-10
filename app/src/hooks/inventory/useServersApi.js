function useServersApi() {
  const apiUrl = import.meta.env.VITE_API_URL_INVENTORY_SERVERS;

  async function getServers() {
    return fetch(apiUrl)
      .then((response) => {
        response.ok &&
          console.log(
            `Status: ${response.status}. Servers data fetched correctly.`,
          );
        return response.json();
      })
      .catch((error) => console.log(`Error while fetching the data: ${error}`));
  }
  async function updateServer(id, updateData) {
    return fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error updating server post:", error);
      });
  }

  return { getServers, updateServer };
}

export default useServersApi;
