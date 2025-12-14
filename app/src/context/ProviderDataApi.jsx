import { ApiDataContext } from "./ApiDataContext.js";
import { useState, useEffect } from 'react'
import useApi from "../logic/useApi.js";

function ProviderDataApi({ children }) {

    const softwareApi = useApi("ouissam/software");
    const hardwareApi = useApi("ouissam/hardware");
    const licensesApi = useApi("ouissam/licenses");
    const serversApi = useApi("ouissam/servers");

    const [software, setSoftware] = useState([]);
    const [hardware, setHardware] = useState([]);
    const [licenses, setLicenses] = useState([]);
    const [servers, setServers] = useState([]);
    const [error, setError] = useState([])

    // Carga inicial de datos (Fetching):
    // Se ejecutan todas las peticiones en paralelo al montar la aplicación
    // Los errores se acumulan en un array para mostrar feedback global si falla alguna API
    useEffect(() => {
        softwareApi.getData().then(setSoftware).catch(e => setError(p => [...p, e]));
        hardwareApi.getData().then(setHardware).catch(e => setError(p => [...p, e]));
        licensesApi.getData().then(setLicenses).catch(e => setError(p => [...p, e]));
        serversApi.getData().then(setServers).catch(e => setError(p => [...p, e]));
    }, []);

    return (
        <ApiDataContext.Provider
            value={{
                error,
                software, setSoftware, softwareApi,
                hardware, setHardware, hardwareApi,
                licenses, setLicenses, licensesApi,
                servers, setServers, serversApi
            }}
        >{children}
        </ApiDataContext.Provider>
    );
}

export default ProviderDataApi;