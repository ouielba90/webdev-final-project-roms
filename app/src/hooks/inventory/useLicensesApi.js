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
  async function createLicense(postData) {
    return fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error creating license post:", error);
      });
  }
  async function updateLicense(id, updateData) {
    return fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error updating license post:", error);
      });
  }
  async function deleteLicense(id) {
    return fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error deleting license post:", error);
      });
  }


  return { getLicenses, createLicense, updateLicense, deleteLicense };
}

export default useLicensesApi;
