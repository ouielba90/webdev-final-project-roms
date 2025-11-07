import { useEffect, useState } from "react";  //hook para manejar estados
import notificationData from "../../../data/notifications"; //datos externos -  array datos sistema

import NotificationCard from "../../components/communications/NotificationCard"


function NotificationsPage() {
  //notificationData para no confundir notificatios
  const [notifications, setNotifications] = useState(notificationData); //muestra los cambios
  useEffect(() => {
    setNotifications(notificationData)
  }, []) //el array vacio evita la re-renderizacion infinita

  return (
    <>
      <div className="container-notifications">
        <h1>Notificaciones</h1>
        <div className="notification-list">
          {/*recorremos todas las notificaciones*/}
          {notifications.map((notification) => (
            <NotificationCard   //componente NotificationCard recibe las props desde objeto notification
              key={notification.id}
              from={notification.from}
              to={notification.to}
              text={notification.text}
              date={notification.date}
              isAlert={notification.isAlert}
            />
          ))}

        </div>
      </div>
    </>
  )
}

export default NotificationsPage 
