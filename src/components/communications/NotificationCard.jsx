
function NotificationCard ({ id, from, to, text, date, isAlert, onDeleteNotification}) {
    
      //formateo de fecha a hora local
    const fechaFormateada = new Date(date).toLocaleString('es-ES');
    
    return (
        <div className={`notification-card ${isAlert ? 'sent' : 'received'}`}>
            <p className="notification-from"> {/*muestra el remitente*/}
                👤 De: {from}
            </p>
            <p className="notification-to">  {/*muestra el destinatario*/}
                📧 Para: {to}
            </p>
            <p className="notification-text">  {/*muestra texto de mensaje*/}
                {text}
            </p>
            <p className="notification-date">  {/*fecha formateada*/}
                🕒 {fechaFormateada}
            </p>
            <button onClick={() => onDeleteNotification(id)}>Borrar Notificacion</button>
        </div>
    )
}


export default NotificationCard