import { ApiDataContext } from "./ApiDataContext.js";
import { useState, useEffect } from 'react'
import useApi from "../logic/useApi.js";

function ProviderDataApi({ children }) {

    const softwareApi = useApi("ouissam/software");
    const hardwareApi = useApi("ouissam/hardware");
    const licensesApi = useApi("ouissam/licenses");
    const serversApi = useApi("ouissam/servers");
    const useProjectsApi = useApi("ricardo/projects")
    const userProjectsUsersApi = useApi("projectsUsers")

    const [software, setSoftware] = useState([]);
    const [hardware, setHardware] = useState([]);
    const [licenses, setLicenses] = useState([]);
    const [servers, setServers] = useState([]);
    const [useprojects, setUseProjects] = useState([])
    const [projectsUsers, setProjectsUsers] = useState([])

    const [error, setError] = useState([])

    // Carga inicial de datos (Fetching):
    // Se ejecutan todas las peticiones en paralelo al montar la aplicación
    // Los errores se acumulan en un array para mostrar feedback global si falla alguna API
    useEffect(() => {
        softwareApi.getData().then(setSoftware).catch(e => setError(p => [...p, e.message]));
        hardwareApi.getData().then(setHardware).catch(e => setError(p => [...p, e.message]));
        licensesApi.getData().then(setLicenses).catch(e => setError(p => [...p, e.message]));
        serversApi.getData().then(setServers).catch(e => setError(p => [...p, e.message]));
        /*useProjectsApi.getData().then(setUseProjects).catch(e => setError(p => [...p, e.message]));
        userProjectsUsersApi.getData().then(setProjectsUsers).catch(e => setError(p => [...p, e.message]));*/
    }, []);

    return (
        <ApiDataContext.Provider
            value={{
                error,
                software, setSoftware, softwareApi,
                hardware, setHardware, hardwareApi,
                licenses, setLicenses, licensesApi,
                servers, setServers, serversApi,
                useprojects, setUseProjects, useProjectsApi,
                projectsUsers, setProjectsUsers, userProjectsUsersApi
            }}
        >{children}
        </ApiDataContext.Provider>
    );
}

export default ProviderDataApi;