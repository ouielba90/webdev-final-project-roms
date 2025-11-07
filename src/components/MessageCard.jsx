
//lo que recibe la funcion
function MessageCard({id, from, to, text, date, isAlert, onDeleteMessage }) {

    //formateo de fecha a hora local
    const fechaFormateada = new Date(date).toLocaleString('es-ES');

    //Operador ternario
    const mensajeTernario = isAlert ? `⚠️ ${text}` : text

    /*function handleDeleteMessage(id) {
        onDeleteMessage(id)
    }*/


    //Renderizado
    return (
        <div className={`message-card ${isAlert ? 'alert' : 'normal'}`}>
            <p className="message-from"> {/*muestra el remitente*/}
                👤 De: {from}
            </p>
            <p className="message-to">  {/*muestra el destinatario*/}
                📧 Para: {to}
            </p>
            <p className="message-text">  {/*muestra texto de mensaje*/}
                {mensajeTernario}
            </p>
            <p className="message-date">  {/*fecha formateada*/}
                🕒 {fechaFormateada}
            </p>
            <button onClick={() => onDeleteMessage(id)}>Borrar Mensaje</button>
        </div>
    );

}


export default MessageCard