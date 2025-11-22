import { Link, Outlet } from 'react-router-dom'
import "./../../indexOuissam.css"

function HomeInvPage() {
  return (
    <>
      <h3>Menú del inventario</h3>
      <nav>
        <Link to='/inventory'>Dashboard</Link> |
        <Link to='/inventory/software'>Software</Link> |
        <Link to='/inventory/hardware'>Hardware</Link> |
        <Link to='/inventory/licenses'>Licenses</Link> |
        <Link to='/inventory/servers'>Servers</Link>
      </nav>
      <Outlet />
    </>
  )
}

export default HomeInvPage
