//import InternalChatsPage from './pages/communications/InternalChatsPage';
//import ClientChatsPage from './pages/communications/ClientChatsPage';
//import ChatViewPage from './pages/communications/ChatViewPage';
import MainHomeMenu from './components/homepage/MainHomeMenu';
import { Outlet, useLocation } from 'react-router-dom';

function App() {
  const currPath = useLocation()
  return (
    <>
      {currPath.pathname === '/' &&
        <MainHomeMenu></MainHomeMenu>
      }
      <Outlet></Outlet>

      <footer className='main-footer'>
        <p>© 2025 CyberProject. Todos los derechos reservados.</p>
      </footer>
    </>
  )
}

export default App
