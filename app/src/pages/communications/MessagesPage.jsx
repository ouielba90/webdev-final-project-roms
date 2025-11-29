
import { useEffect, useState } from "react";  //hook para manejar estados
import { messages as messagesData } from "../../../data/communications/messages"; //datos externos -  array datos sistema
import MessageCard from "../../components/communications/MessageCard"

//funcion principal

function MessagesPages() {
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem('messages');
    return savedMessages ? JSON.parse(savedMessages) : messagesData;
  });
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
  }, [messages])

  const handleDeleteMessage = (id) => {
    // código de eliminación
    if (window.confirm('¿Estás seguro de que quieres eliminar este mensaje?')) {
      // Actualiza el estado eliminando el mensaje con el id dado
      setMessages(prev => prev.filter(message => message.id !== id));
    }
  }
  //Funcion para iniciar la edicion
  const handleStartEdit = (message) => {
    setEditingId(message.id);
    setEditText(message.text);
  }

  //Funcion para guardar edicion
  const handleSaveEdit = (id) => {
    setMessages(prev => prev.map(message =>
      message.id === id
        ? {
          ...message,
          text: editText,
          edited: true,
          editedAt: new Date().toLocaleString('es-Es')
        }
        : message
    ));
    setEditingId(null);
    setEditText('');
  }

  //Funcion para cancelar Edicion
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText('');
  }


  console.log(messages)


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
              edited={message.edited}
              editedAt={message.editedAt}
              onDeleteMessage={handleDeleteMessage}
              onStartEdit={handleStartEdit}
              onSaveEdit={handleSaveEdit}
              onCancelEdit={handleCancelEdit}
              isEditing={editingId === message.id}
              editText={editText}
              onEditTextChange={(newText) => setEditText(newText)}

            />
          ))}


        </div>
      </div>
    </>
  )
}



export default MessagesPages;


//Cambios en MessagesPage.jsx para actualizacion:
//Agregué editingId y editText para manejar qué mensaje se está editando y su contenido
//Creé 3 funciones nuevas: handleStartEdit, handleSaveEdit y handleCancelEdit
//Paso todas estas props al componente MessageCard
