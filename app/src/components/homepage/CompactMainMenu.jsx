import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function CompactMainMenu() {
  const { logout, username } = useAuth();
  return (
    <header className="compact-main-menu">
      <div className="logo">
        <Link to="/">
          <h1>CyberProject</h1>
          <h3>Consultoría de ciberseguridad</h3>
        </Link>
      </div>
      <nav className="main-nav">
        <Link to="/">HOME</Link>
        <Link to="/projects">PROYECTOS</Link>
        <Link to="/inventory">INVENTARIO</Link>
        <Link to="/users">USUARIOS</Link>
        <Link to="/communications">COMUNICACIONES</Link>
      </nav>
      <div className="user-info-compact">
        <span>{username}</span>
        <button onClick={logout} className="simple-logout-btn-compact">
          Salir
        </button>
      </div>
    </header>
  );
}

export default CompactMainMenu;

