
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import MessageCard from './components/MessageCard';
import NotificationCard from './components/NotificationCard';
import MessagesPage from './pages/MessagesPage';  
import NotificationPage from './pages/NotificationsPage'; 


function App() {
  const notificacion = { from: "Sistema", to: "Antonio", text: "Tu sesión está por expirar", date: "2025-11-04T13:45:00", isAlert: true };
  const message = { from: "Carlos", to: "Ana", text: "¿Revisaste el firewall de TechNova?", date: "2025-11-04T10:30:00Z" };

  return (
    
    <BrowserRouter>  {/*envuelve toda la aplicacion y habilita el uso de rutas*/}
      {/*barra de navegacion enlaces*/}
      <nav>
        <Link to="/messages">Mensajes</Link>  {/*LInk crea enlace que no recarga pagina, ideal para SPA (Single Page Applications)*/}
        <Link to="/notification">Notificaciones</Link> {/*se pueden poner mas enlaces*/}
      </nav>
      <Routes>
        <Route path="/" element={<MessagesPage />} /> {/*ruta por defecto*/}
        <Route path="/messages" element={<MessagesPage />} />  {/* Cada Route define un camino y qué componente se muestra */}
        <Route path="/notification" element={<NotificationPage />} />  {/*se pueden poner mas rutas, segun necesidad de App*/}
      </Routes>

      <div style={{ padding: "2rem" }}>
        <h1>Notificación</h1>
        <NotificationCard
          from={notificacion.from}
          to={notificacion.to}
          text={notificacion.text}
          date={notificacion.date}
          isAlert={notificacion.isAlert}
        />
        <h1>Prueba MessageCard</h1>
        <MessageCard
          from={message.from}
          to={message.to}
          text={message.text}
          date={message.date}
        />
      </div>
    </BrowserRouter>

  );
}


export default App;
