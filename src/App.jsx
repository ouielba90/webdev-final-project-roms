import { Link, Outlet, Route, Routes } from 'react-router-dom'
import InternalChatsPage from './pages/communications/InternalChatsPage';
import ClientChatsPage from './pages/communications/ClientChatsPage';
import ChatViewPage from './pages/communications/ChatViewPage';

function App() {
  return (
    <>
      <h3>Menú principal</h3>
      <Link to='/'>Home</Link> |
      <Link to='/inventory'>Inventory</Link> |
      <Link to='/projects'>Projects</Link> |
      <Link to='/users'>Users</Link> |
      <Link to='/communications'>Comunicaciones</Link>
      <hr />
      <Outlet></Outlet>
    </>
  )
}

export default App


