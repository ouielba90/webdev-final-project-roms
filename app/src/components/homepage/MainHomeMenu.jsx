import { Link } from 'react-router-dom'
import UnlockerPopup from './../../components/homepage/UnLockerPopup.jsx'
import { useAuth } from '../../context/AuthContext'

function MainHomeMenu() {
  const { logout, username } = useAuth();

  return (
    <>
      <div className='main-home-page'>
        <div className="user-bar-main-menu">
          <span>Logueado como: <strong>{username}</strong></span>
          <button onClick={logout} className="simple-logout-btn">
            Cerrar Sesión
          </button>
        </div>
        <div className='main-home-page-header'>
          <h1>CyberProject</h1>
          <h3>Consultoría Ciberseguridad</h3>
          <p className='welcome-message'>
            Bienvenido a CyberProject. Gestiona tu inventario, comunicaciones, usuarios y proyectos de manera segura y eficiente.
          </p>
        </div>
        <div className='main-nav-menu'>
          <div className='card-menu'>
            <Link to='/inventory' className="card-inner-link">
              <div className="card-inner">
                <span>Inventario</span>
                <p>Todo tu hardware, ordenado y seguro</p>
                <img src="/icons/inventory.png" alt="" />
              </div>
            </Link>
          </div>
          <div className='card-menu'>
            <Link to='/communications' className='card-inner-link'>
              <div className="card-inner">
                <span>Comunicaciones</span>
                <p>Habla seguro, siempre y en cualquier lugar</p>
                <img src="/icons/communication.png" alt="" />
              </div>
            </Link>
          </div>
          <div className='card-menu'>
            <Link to='/users' className='card-inner-link'>
              <div className="card-inner">
                <span>Usuarios</span>
                <p>Identidades siempre bajo control</p>
                <img src="/icons/users.png" alt="" />
              </div>
            </Link>
          </div>
          <div className='card-menu'>
            <Link to='/projects' className='card-inner-link'>
              <div className="card-inner">
                <span>Proyectos</span>
                <p>Proyectos que avanzan sin riesgos</p>
                <img src="/icons/projects.png" alt="" />
              </div>
            </Link>
          </div>
          <UnlockerPopup />
        </div>
      </div>
    </>
  )

}

export default MainHomeMenu
