import { useNavigate } from "react-router-dom";


// Formatear fecha del último mensaje
function ChatListItem({ chat }) {
    const navigate = useNavigate();  //para navegar a otra pagina

    //new Date(chat.lastMenssageDate) Convierte el valor chat.lastMenssageDate, string, en un objeto Date de JavaScript.(manipula fechas)
    //.toLocaleString('es-ES', {...}) formato local de España 
    //El método toLocaleString devuelve una cadena de texto con la fecha y hora formateadas según las opciones que se le pasen.

    const fechaFormateada = new Date(chat.lastMessageDate).toLocaleString('es-Es', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });

    //Mostrar los participantes

    const otherParticipant = chat.participants.join(" y ");

    /*chat.participants, chat es un objeto que tiene una propiedad llamada participants, 
    la cual es un array (lista) que contiene los nombres de los participantes del chat. */
    /*El método .join() toma todos los elementos del array y los convierte en una sola cadena de texto, 
    separando cada elemento con el texto que se le pase como argumento.*/

    return (
        <div 
            className = {`chat-list-item ${chat.unreadCount > 0 ? 'unread' :''}`}
            onClick = {() => navigate(`/communications/chat/${chat.chatId}`) } >{/*abre el chat*/ }
    
                <div className = "chat-avatar"> {/*avatar o icono*/ }
                { chat.type === 'internal' ? '👥' : '🏢' } 
                </div >

                <div className="chat-info">
                 <h3 className="chat-participants">{otherParticipant}</h3>
                 <p className="chat-last-message">{chat.messages[chat.messages.length -1 ].text}</p>
                </div>

                <div className="chat-meta">
                    <span className="chat-date">{fechaFormateada}</span>
                    {chat.unreadCount > 0 && (
                        <span className="chat-unread-badge">{chat.unreadCount}</span>
                    )}
                </div>
                <hr className="separador-chats-internos" />
         </div>
            );
}

   
/*Este componente permite al usuario ver con quién está hablando, 
cuándo fue el último mensaje, y si tiene mensajes sin leer.
La función ChatListItem es un componente de React que se encarga 
de mostrar un elemento de la lista de chats en una interfaz de usuario*/


export default ChatListItem;