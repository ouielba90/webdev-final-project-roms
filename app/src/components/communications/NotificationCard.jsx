function NotificationCard({
  id,
  from,
  to,
  text,
  date,
  isAlert,
  onDeleteNotification,
}) {
  //formateo de fecha a hora local
  const fechaFormateada = new Date(date).toLocaleString("es-ES");

  return (
    <div className={`notification-card ${isAlert ? 'alert' : 'normal'}`}>
      <p className="notification-from">
        {" "}
        {/*muestra el remitente*/}
        👤 De: {from}
      </p>
      <p className="notification-to">
        {" "}
        {/*muestra el destinatario*/}
        📧 Para: {to}
      </p>
      <p className="notification-text">
        {" "}
        {/*muestra texto de mensaje*/}
        {text}
      </p>
      <p className="notification-date">
        {" "}
        {/*fecha formateada*/}
        🕒 {fechaFormateada}
      </p>

      {/* Contenedor de acciones con los botones */}
      <div className="notification-actions">
        <button onClick={() => onDeleteNotification(id)} className="btn-delete">
          🗑️ Borrar
        </button>
      </div>
    </div>
  );
}

export default NotificationCard;
