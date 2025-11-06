
function NotificationCard ({ from, to, text, date, isSent}) {
    
      //formateo de fecha a hora local
    const fechaFormateada = new Date(date).toLocaleString('es-ES');
    
    return (
        <div className={`notification-card ${isSent ? 'sent' : 'received'}`}>
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
        </div>
    )
}


export default NotificationCard