import { Link, Outlet } from "react-router-dom"
import './../../index.css'

function HomeCommPage() {
  return (
    <>
      <h1>Home Comunicaciones</h1>

      <nav className="nav-section">
        <h3>📨 Mensajería</h3>
        <div className="nav-links">
        <Link to='/communications/messages'>Mensajes</Link>
        <Link to='/communications/notifications'>Notificaciones</Link>
        </div>
      </nav>
      <hr /> {/*separador visual*/}
       <nav className="nav-section">
        <h3>💬 Chats</h3>
        <div className="nav-links">
          <Link to='/communications/internal-chats'>Chats Internos</Link>
          <Link to='/communications/client-chats'>Chats con Clientes</Link>
        </div>
      </nav>
      <hr />
      <Outlet></Outlet>
    </>
  )
}

export default HomeCommPage
