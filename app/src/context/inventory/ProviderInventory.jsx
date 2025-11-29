import { DataContext } from "./DataContext.js";
import useSoftwareApi from "../../../app-old/src/hooks/inventory/useSoftwareApi.js";
import useHardwareApi from "../../../app-old/src/hooks/inventory/useHardwareApi.js";
import useLicensesApi from "../../../app-old/src/hooks/inventory/useLicensesApi.js";
import useServersApi from "../../../app-old/src/hooks/inventory/useServersApi.js";
import { useEffect, useState } from "react";

function ProviderInventory({ children }) {
  const [software, setSoftware] = useState([]);
  const [hardware, setHardware] = useState([]);
  const [licenses, setLicenses] = useState([]);
  const [servers, setServers] = useState([]);

  const softwareApi = useSoftwareApi();
  const hardwareApi = useHardwareApi();
  const licensesApi = useLicensesApi();
  const serversApi = useServersApi();

  useEffect(() => {
    softwareApi.getSoftware().then((incData) => setSoftware(incData));
    hardwareApi.getHardware().then((incData) => setHardware(incData));
    licensesApi.getLicenses().then((incData) => setLicenses(incData));
    serversApi.getServers().then((incData) => setServers(incData));
  }, []);

  const dataToShare = {
    software,
    hardware,
    licenses,
    servers,
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
