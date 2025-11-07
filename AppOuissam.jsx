import { Link, Outlet } from 'react-router-dom'
import { DataContext } from './context/DataContext'
import { software } from './../data/inventory/software'
import { hardware } from './../data/inventory/hardware'
import { servers } from './../data/inventory/servers'
import { licenses } from './../data/inventory/licenses'

function AppOuissam() {
  const dataValue = { software, hardware, servers, licenses }

  return (
    <DataContext.Provider value={dataValue}>
      <br />
      <nav>
        <Link to='/inventory'>Dashboard</Link>
        <Link to='/inventory/software'>Software</Link>
        <Link to='/inventory/hardware'>Hardware</Link>
        <Link to='/inventory/licenses'>Licenses</Link>
        <Link to='/inventory/servers'>Servers</Link>
      </nav>

      <Outlet />
    </DataContext.Provider>
  )
}

export default AppOuissam
