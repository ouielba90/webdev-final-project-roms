
import { Link, Outlet } from 'react-router-dom';



function App() {
  /*const notificacion = { from: "Sistema", to: "Antonio", text: "Tu sesión está por expirar", date: "2025-11-04T13:45:00", isAlert: true };
  const message = { from: "Carlos", to: "Ana", text: "¿Revisaste el firewall de TechNova?", date: "2025-11-04T10:30:00Z" };*/

  return (
    <>

      {/*barra de navegacion enlaces*/}
      <main>
        <nav>
          <Link to="/messages">Mensajes</Link>  {/*LInk crea enlace que no recarga pagina, ideal para SPA (Single Page Applications)*/}
          <Link to="/notification">Notificaciones</Link> {/*se pueden poner mas enlaces*/}
        </nav>

        <Outlet/>

       {/* <div style={{ padding: "2rem" }}>
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
        </div> */}
      </main>
    </ >


  );
}


export default App
