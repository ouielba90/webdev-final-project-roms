import { Link, Outlet, Route, Routes} from 'react-router-dom'
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

      
        <Routes>
          <Route path="/communications/internal-chats" element={<InternalChatsPage />} />
          <Route path="/communications/client-chats" element={<ClientChatsPage />} />
          <Route path="/communications/chat/:chatId" element={<ChatViewPage />} />
        </Routes>
      

      <nav>
        <ul>
          <li><Link to="/communications/internal-chats">Chats Internos</Link></li>
          <li><Link to="/communications/client-chats">Chats con Clientes</Link></li>
        </ul>
      </nav>

      <Outlet></Outlet>

    </>
  )



}

export default App
