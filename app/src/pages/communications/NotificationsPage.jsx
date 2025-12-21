import { useEffect, useState } from "react"; //hook para manejar estados
import NotificationCard from "../../components/communications/NotificationCard";

// URL de tu API backend - ajustada según mi configuración
const API_URL = `${import.meta.env.VITE_API_URL}/santos/notifications`;

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

//funcion principal

function NotificationsPage() {
  const [notifications, setNotifications] = useState([]); //estado inicial vacio
  const [loading, setLoading] = useState(true); //estado de carga
  const [error, setError] = useState(null); //estado de error

  // Cargar notificaciones desde MongoDB al montar el componente

  useEffect(() => {
    fetchNotifications();
  }, []); //el array vacio evita la re-renderizacion infinita, solo se ejecuta una vez al montar el componente

  //funcion para obtener las notificaciones
  const fetchNotifications = async () => {
    try {
      setLoading(true); //inicia la carga
      const response = await fetch(API_URL, {
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error("Error al obtener las notificaciones");
      }

      const data = await response.json();
      setNotifications(data);
      // setError(null); // finaliza la carga correctamente
    } catch (error) {
      setError(error.message);
      console.error("Error:", error);
    } finally {
      setLoading(false); //finaliza la carga
    }
  };

  //funcion para eliminar notificaciones

  const handleDeleteNotification = async (id) => {
    // código de eliminación
    if (
      window.confirm("¿Estás seguro de que deseas eliminar esta notificación?")
    ) {
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: "DELETE",
          headers: getAuthHeaders()
        });

        if (!response.ok) {
          throw new Error("Error al eliminar la notificación");
        }

        // Actualizar el estado local para reflejar la eliminación en BBDD
        setNotifications((prev) =>
          prev.filter((notification) => notification.id !== id)
        );
      } catch (err) {
        console.error("Error al eliminar:", err);
        alert(
          "No se pudo eliminar la notificación. Inténtalo de nuevo más tarde."
        );
      }
    }
  };

  // Renderizar estado de carga
  if (loading) {
    return (
      <div className="container-notifications">
        <h1>Notificaciones</h1>
        <p>Cargando notificaciones...</p>
      </div>
    );
  }

  // Renderizar estado de error
  if (error) {
    return (
      <div className="container-notifications">
        <h1>Notificaciones</h1>
        <p className="error">Error: {error}</p>
        <button onClick={fetchNotifications}>Reintentar</button>
      </div>
    );
  }

  {/*Renderizacion de la estructura basica*/ }
  return (
    <>
      <div className="container-notifications">
        <h1>Notificaciones</h1>
        <div className="notifications-list">
          {notifications.length === 0 ? (
            <p>No hay notificaciones disponibles.</p>
          ) : (

            notifications.map((notification) => (
              <NotificationCard
                key={notification._id}
                id={notification._id}
                from={notification.from}
                to={notification.to}
                text={notification.text}
                date={notification.date}
                isAlert={notification.isAlert}
                onDeleteNotification={handleDeleteNotification}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}
export default NotificationsPage;



{/*componente NotificationCard recibe las props desde objeto notification
import notificationsRoutes from './routes/communications.notifications.routes.js';


// Nueva ruta para notificaciones
app.use('/santos/notifications', notificationsRoutes);


Resumen de archivos creados:

Frontend:
NotificationsPage.jsx- Página actualizada con conexión a MongoDB

Backend:
communications.notifications.model.js- Modelo de Mongoose para notificaciones
communications.notifications.controller.js - Controlador con todas las operaciones CRUD
communications.notifications.routes.js- Rutas de la API

Estructura de carpetas:

backend/
├── models/
│   ├── communications.messages.model.js
│   └── communications.notifications.model.js
├── controllers/
│   ├── communications.messages.controller.js
│   └── communications.notifications.controller.js
└── routes/
    ├── communications.messages.routes.js
    └── communications.notifications.routes.js */}