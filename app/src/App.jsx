import { Outlet, useLocation } from 'react-router-dom';
import MainHomeMenu from './components/homepage/MainHomeMenu';
import ScrollToTop from './components/homepage/ScrollToTop';

function App() {
  const currPath = useLocation()

  return (
    <>
      <ScrollToTop />
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