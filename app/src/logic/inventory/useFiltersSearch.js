import { useState } from "react";

function useFiltersSearch(data, currFilter) {
  const [search, setSearch] = useState("");
  const [az, setAZ] = useState(false);
  const [za, setZA] = useState(false);
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const [os, setOs] = useState("");

  const handleSearch = (e) => setSearch(e.target.value);
  const handleStatus = (e) => setStatus(e.target.value);
  const handleType = (e) => setType(e.target.value);
  const handleOs = (e) => setOs(e.target.value);

  // Configuración dinámica: mapea el tipo de recurso (software, hardware, etc.) 
  // a sus campos específicos en la base de datos para permitir una búsqueda genérica

  const filterConfig = {
    software: { searchFields: ["name", "description"], statusField: "status" },
    hardware: {
      searchFields: ["model"],
      statusField: "status",
      typeField: "type",
    },
    licenses: { searchFields: ["softwareName"], statusField: "status" },
    servers: {
      searchFields: ["name"], //, "ip"],
      statusField: "status",
      osField: "os",
    },
  };

  const config = filterConfig[currFilter];

  // Lógica de filtrado combinada: aplica simultáneamente búsqueda por texto (en múltiples campos),
  // estado, tipo y sistema operativo. Si un filtro está vacío, se ignora.
  const filtered = data
    .filter((item) => {
      const matchesSearch = config.searchFields.some(
        (field) => item[field]?.toLowerCase().includes(search.toLowerCase()), // Cuando se haya modificado licenses en el useEffect se pueda usar
      );
      const matchesStatus =
        status === "" ||
        status === "Todos" ||
        item[config.statusField] === status;

      const matchesType =
        !config.typeField ||
        type === "" ||
        type === "Todos" ||
        item[config.typeField] === type;

      const matchesOs =
        !config.osField ||
        os === "" ||
        os === "Todos" ||
        item[config.osField].includes(os);

      return matchesSearch && matchesStatus && matchesType && matchesOs;
    })
    .sort((a, b) => {
      const nameA = a[config.searchFields[0]].toString().toLowerCase();
      const nameB = b[config.searchFields[0]].toString().toLowerCase();
      if (az) return nameA.localeCompare(nameB);
      if (za) return nameB.localeCompare(nameA);
      return 0;
    });

  return {
    filtered,
    search,
    status,
    os,
    az,
    za,
    setAZ,
    setZA,
    handleSearch,
    handleStatus,
    handleType,
    handleOs,
  };
}

export default useFiltersSearch;
