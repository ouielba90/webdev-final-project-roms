import { Link, Outlet } from "react-router-dom"
import './../../index.css'
import CompactMainMenu from './../../components/homepage/CompactMainMenu'

function HomeCommPage() {
  return (
    <>
    <CompactMainMenu></CompactMainMenu>
      <h1>Comunicaciones</h1>
<h3>Lista</h3>
      <nav className="nav-section">
        <h3>📨 Mensajería</h3>
        <div className="nav-links">
        <Link to='/communications/messages'>Mensajes</Link>
        <Link to='/communications/notifications'>Notificaciones</Link>
        </div>
      </nav>
      <hr className="separador-msgs-chats" />
       <nav className="nav-section">
        <h3>💬 Chats</h3>
        <div className="nav-links">
          <Link to='/communications/internal-chats'>Chats Internos</Link>
          <Link to='/communications/client-chats'>Chats con Clientes</Link>
        </div>
      </nav>
      <hr className="separador-msgs-chats" />
      <Outlet></Outlet>
    </>
  )
}

export default HomeCommPage
