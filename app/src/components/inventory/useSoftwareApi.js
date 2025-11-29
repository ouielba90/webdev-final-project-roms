function useSoftwareApi() {
  const apiUrl = import.meta.env.VITE_API_URL_INVENTORY_SOFTWARE;

  async function getSoftware() {
    return fetch(apiUrl)
      .then((response) => {
        response.ok && console.log(`Status: ${response.status}`);
        return response.json();
      })
      .catch((error) => console.log(`Error while fetching the data: ${error}`));
  }

  return { getSoftware };
}

export default useSoftwareApi;
