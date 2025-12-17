import { ApiDataContext } from "./ApiDataContext.js";
import { useState } from 'react'
import useApi from "../logic/useApi.js";

function ProviderDataApi({ children }) {

    const softwareApi = useApi("ouissam/software");
    const hardwareApi = useApi("ouissam/hardware");
    const licensesApi = useApi("ouissam/licenses");
    const serversApi = useApi("ouissam/servers");
    const usersApi = useApi("marc/users")
    const useProjectsApi = useApi("ricardo/projects")
    const userProjectsUsersApi = useApi("projectsUsers")

    const [software, setSoftware] = useState([]);
    const [hardware, setHardware] = useState([]);
    const [licenses, setLicenses] = useState([]);
    const [servers, setServers] = useState([]);
    const [users, setUsers] = useState([])
    const [useprojects, setUseProjects] = useState([])
    const [projectsUsers, setProjectsUsers] = useState([])

    const [error, setError] = useState([])

    return (
        <ApiDataContext.Provider
            value={{
                error,
                software, setSoftware, softwareApi,
                hardware, setHardware, hardwareApi,
                licenses, setLicenses, licensesApi,
                servers, setServers, serversApi,
                users, setUsers, usersApi,
                useprojects, setUseProjects, useProjectsApi,
                projectsUsers, setProjectsUsers, userProjectsUsersApi
            }}
        >{children}
        </ApiDataContext.Provider>
    );
}

export default ProviderDataApi;