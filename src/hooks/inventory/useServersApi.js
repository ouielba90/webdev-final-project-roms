function useServersApi() {
  const apiUrl = import.meta.env.VITE_API_URL_INVENTORY_SERVERS;

  async function getServers() {
    return fetch(apiUrl)
      .then((response) => {
        response.ok && console.log(`Status: ${response.status}`);
        return response.json();
      })
      .catch((error) => console.log(`Error while fetching the data: ${error}`));
  }

  return { getServers };
}

export default useServersApi;
