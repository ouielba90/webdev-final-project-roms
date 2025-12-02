import { useState } from "react";

function useFiltersSearch(data, currFilter) {
  const [search, setSearch] = useState("");
  const [az, setAZ] = useState(false);
  const [za, setZA] = useState(false);
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");

  const handleSearch = (e) => setSearch(e.target.value);
  const handleStatus = (e) => setStatus(e.target.value);
  const handleType = (e) => setType(e.target.value);

  // Configuración por tipo
  const filterConfig = {
    software: { searchFields: ["name", "description"], statusField: "status" },
    hardware: {
      searchFields: ["model"],
      statusField: "status",
      typeField: "type",
    },
    licenses: { searchFields: ["softwareName"], statusField: "status" },
    servers: { searchFields: ["name", "ip"], statusField: "status" },
  };

  const config = filterConfig[currFilter];

  const filtered = data
    .filter((item) => {
      const matchesSearch = config.searchFields.some((field) =>
        item[field].toString().toLowerCase().includes(search.toLowerCase()),
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
      return matchesSearch && matchesStatus && matchesType;
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
    az,
    za,
    setAZ,
    setZA,
    handleSearch,
    handleStatus,
    handleType,
  };
}

export default useFiltersSearch;
