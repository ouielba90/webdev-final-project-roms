import { Link, Outlet } from 'react-router-dom'
import { DataContext } from './../../context/DataContext'
//import { software } from './../../../data/inventory/software'
//import { hardware } from './../../../data/inventory/hardware'
//import { servers } from './../../../data/inventory/servers'
//import { licenses } from './../../../data/inventory/licenses'
import "./../../indexOuissam.css"
import { useEffect, useState } from 'react'

function HomeInvPage() {
  const softApiUrl = import.meta.env.VITE_API_URL_INVENTORY_SOFTWARE
  const hardApiUrl = import.meta.env.VITE_API_URL_INVENTORY_HARDWARE
  const licApiUrl = import.meta.env.VITE_API_URL_INVENTORY_LICENSES
  const servApiUrl = import.meta.env.VITE_API_URL_INVENTORY_SERVERS
  const [software, setSoftware] = useState([])
  const [hardware, setHardware] = useState([])
  const [licenses, setLicenses] = useState([])
  const [servers, setServers] = useState([])

  function getData(apiUrl, stateFn) {
    fetch(apiUrl)
      .then(response => {
        if (response.ok) { console.log(`Status: ${response.status}`) }
        return response.json()
      })
      .then(incomingData => stateFn(incomingData))
      .catch(error => console.log(error))
  }

  useEffect(() => {
    getData(softApiUrl, setSoftware)
    getData(hardApiUrl, setHardware)
    getData(licApiUrl, setLicenses)
    getData(servApiUrl, setServers)
  }, [])

  const dataValue = { software, hardware, servers, licenses }

  return (
    <DataContext.Provider value={dataValue}>
      <br />
      <h3>Menú del inventario</h3>
      <nav>
        <Link to='/inventory'>Dashboard</Link> |
        <Link to='/inventory/software'>Software</Link> |
        <Link to='/inventory/hardware'>Hardware</Link> |
        <Link to='/inventory/licenses'>Licenses</Link> |
        <Link to='/inventory/servers'>Servers</Link>
      </nav>

      <Outlet />
    </DataContext.Provider>
  )
}

export default HomeInvPage
