function useSoftwareApi() {
  // No hace falta el .catch dentro del hook. De esta manera dejo que el error se propague
  // El catch solo lo manejo donde llamo al hook en el caso de hacer algo con el error.
  const apiUrl = import.meta.env.VITE_API_URL_INVENTORY_SOFTWARE;

  async function getSoftware() {
    return fetch(apiUrl).then((response) => {
      if (!response.ok) {
        throw new Error(`Error: status ${response.status}`);
      }
      response.ok && console.log(`Status: ${response.status}`);
      return response.json();
    });
  }

  return { getSoftware };
}

export default useSoftwareApi;
