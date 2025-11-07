import { Link, Outlet } from "react-router-dom"
import './../../index.css'

function HomeCommPage() {
  return (
    <>
      <h1>Home Comunicaciones</h1>
      <nav>
        <Link to='/communications/messages'>Mensajes</Link>
        <Link to='/communications/notifications'>Notificaciones</Link>
      </nav>
      <Outlet></Outlet>
    </>
  )
}

export default HomeCommPage
