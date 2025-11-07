
import { useEffect, useState } from "react";  //hook para manejar estados
import { messages as messagesData } from "../../../data/messages"; //datos externos -  array datos sistema
import MessageCard from "../../components/communications/MessageCard"

//funcion principal

function MessagesPages() {
  const [messages, setMessages] = useState(messagesData); {/*nos muestra los cambios de estados*/ }

  useEffect(() => {
    setMessages(messagesData)
  }, [])  //el array vacio evita la re-renderizacion infinita

  const handleDeleteMessage = (id) => {
    // código de eliminación
    if (window.confirm('¿Mensaje de confirmación?')) {
      // Actualiza el estado eliminando el mensaje con el id dado
      setMessages(prev => prev.filter(message => message.id !== id));

    }
  }

  {/*Renderizacion de la estructura basica*/ }
  return (
    <>
      <div className="container-messages">
        <h1>Mensajes</h1>
        <div className=" messages-list">
          {/*usamos map para recorrer cada mensaje*/}
          {messages.map((message) => (
            <MessageCard
              //el componente MessageCard recibe las props desde el objeto message
              key={message.id}
              id={message.id}
              from={message.from}
              to={message.to}
              text={message.text}
              date={message.date}
              isAlert={message.isAlert}
              onDeleteMessage={handleDeleteMessage}

            />
          ))}


        </div>
      </div>
    </>
  )
}



export default MessagesPages;
