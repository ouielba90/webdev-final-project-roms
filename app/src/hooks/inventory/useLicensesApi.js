function useLicensesApi() {
  const apiUrl = import.meta.env.VITE_API_URL_INVENTORY_LICENSES;

  async function getLicenses() {
    return fetch(apiUrl)
      .then((response) => {
        response.ok &&
          console.log(
            `Status: ${response.status}. Licenses data fetched correctly.`,
          );
        return response.json();
      })
      .catch((error) => console.log(`Error while fetching the data: ${error}`));
  }

  return { getLicenses };
}
export default useLicensesApi;
