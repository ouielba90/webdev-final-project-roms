
//Componente para un mensaje dentro del chat

function ChatMessage ({ message, currentUser }) {

    //¿de quien es el mensaje ? const isMine =(true o false)
    //message.from: es el remitente || currentUser: representa al usuario 
    const isMine = message.from === currentUser;


    //new Date(message.date) Convierte el valor message.date, string, en un objeto Date de JavaScript.(manipula fechas)
    //.toLocaleString('es-ES', {...}) formato local de España 
    //El método toLocaleString devuelve una cadena de texto con la fecha y hora formateadas según las opciones que se le pasen.

    

  {/*representa un mensaje individual en una conversación de chat*/}
  return ( 
    <div className={`chat-message ${isMine ? 'mine' : 'theirs'}`}>
      <div className="message-bubble">
        <p>Author: {message.from}</p>
        <p className="message-text">{message.text}</p>
      </div>
    </div>
  )
}

/*Necesitamos saber si es isMine, Para ponerlo a la derecha (míos) 
o izquierda (de otros), como WhatsApp.*/

export default ChatMessage