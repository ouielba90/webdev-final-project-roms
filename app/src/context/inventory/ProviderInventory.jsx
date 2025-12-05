import { DataContext } from "./DataContext.js";
import useSoftwareApi from "./../../hooks/inventory/useSoftwareApi.js";
import useHardwareApi from "./../../hooks/inventory/useHardwareApi.js";
import useLicensesApi from "./../../hooks/inventory/useLicensesApi.js";
import useServersApi from "./../../hooks/inventory/useServersApi.js";
import { useEffect, useState } from "react";

function ProviderInventory({ children }) {
  const [software, setSoftware] = useState([]);
  const [hardware, setHardware] = useState([]);
  const [licenses, setLicenses] = useState([]);
  const [servers, setServers] = useState([]);
  const [error, setError] = useState([])

  const softwareApi = useSoftwareApi();
  const hardwareApi = useHardwareApi();
  const licensesApi = useLicensesApi();
  const serversApi = useServersApi();

  useEffect(() => {
    softwareApi.getSoftware()
      .then((incData) => { setSoftware(incData) })
      .catch((err) => setError(prev => [...prev, err]));
    hardwareApi.getHardware()
      .then((incData) => setHardware(incData))
      .catch((err) => setError(prev => [...prev, err]));
    licensesApi.getLicenses().
      then((incData) => setLicenses(incData))
      .catch((err) => setError(prev => [...prev, err]));
    serversApi.getServers().
      then((incData) => setServers(incData))
      .catch((err) => setError(prev => [...prev, err]));
  }, []);

  const dataToShare = {
    software, setSoftware,
    hardware, setHardware,
    licenses, setLicenses,
    servers, setServers,
    error,
    softwareApi,
    hardwareApi,
    licensesApi,
    serversApi,
  };
  return (
    <DataContext.Provider value={dataToShare}>{children}</DataContext.Provider>
  );
}

export default ProviderInventory;
