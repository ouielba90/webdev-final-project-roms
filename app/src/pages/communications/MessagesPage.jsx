
import { useEffect, useState } from "react";  //hook para manejar estados
import MessageCard from "../../components/communications/MessageCard"

// URL de mi API backend - ajusta según mi configuración
const API_URL = `${import.meta.env.VITE_API_URL}/santos/messages`;

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

//funcion principal

function MessagesPages() {
  const [messages, setMessages] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //useEffect para cargar los mensajes desde la API al montar el componente

  useEffect(() => {
    fetchMessages();
  }, []);

  //Funcion para obtener todos los mensajes desde la API

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL, {
        headers: getAuthHeaders()
      });
      if (!response.ok) {
        throw new Error('Error al obtener los mensajes');
      }
      const data = await response.json();
      setMessages(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  //Funcion para eliminar mensaje
  const handleDeleteMessage = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este mensaje?')) {
      try {
        // Esperar a que fetch resuelva la promesa no devuelve objeto por eso necesitamos await
        const response = await fetch(`${API_URL}/${id}`, {
          method: 'DELETE',
          headers: getAuthHeaders()
        });

        if (!response.ok) {
          throw new Error('Error al eliminar el mensaje');
        }

        // Actualizar el estado local para reflejar la eliminación en la BD
        setMessages(prevMessages =>
          prevMessages.filter(message => message.id !== id)
        );
      } catch (err) {
        console.error('Error al eliminar el mensaje:', err);
        alert('No se pudo eliminar el mensaje. Inténtalo de nuevo más tarde.');
      }
    }
  };



  //Funcion para iniciar la edicion
  const handleStartEdit = (message) => {
    setEditingId(message.id);
    setEditText(message.text);
  }

  //Funcion para guardar edicion
  const handleSaveEdit = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        },
        body: JSON.stringify({
          text: editText,
          edited: true,
          editedAt: new Date().toISOString()
        }),
      });
      if (!response.ok) {
        throw new Error('Error al actualizar el mensaje');
      }
      const updatedMessage = await response.json();

      // Actualizar el estado local para reflejar la actualización en la BD

      setMessages(prev => prev.map(message =>
        message.id === id ? updatedMessage : message
      ));

      // Limpiar estado de edición

      setEditingId(null);
      setEditText('');
    } catch (err) {
      console.error('Error al actualizar el mensaje:', err);
      alert('No se pudo actualizar el mensaje. Inténtalo de nuevo más tarde.');
    }
  };

  //Funcion para cancelar Edicion

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText('');
  }

  console.log(messages);



  //Renderizar estado de error
  if (error) {
    return (
      <div className="container-messages">
        <h1>Mensajes</h1>
        <p className="error-message">Error: {error}</p>
        <button onClick={fetchMessages}>Reintentar</button>
      </div>
    );
  }


  {/*Renderizacion de la estructura basica*/ }

  return (
    <>
      <div className="container-messages">
        <h1>Mensajes</h1>
        <div className=" messages-list">
          {messages.length === 0 ? (
            <p>No hay mensajes disponibles.</p>
          ) : (

            messages.map((message) => (
              <MessageCard
                key={message._id}
                id={message._id}
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
                isEditing={editingId === message._id}
                editText={editText}
                onEditTextChange={(newText) => setEditText(newText)}

              />
            ))
          )}
        </div>
      </div>
    </>
  );
}



export default MessagesPages;


//Cambios en MessagesPage.jsx para actualizacion:
//Agregué editingId y editText para manejar qué mensaje se está editando y su contenido
//Creé 3 funciones nuevas: handleStartEdit, handleSaveEdit y handleCancelEdit
//Paso todas estas props al componente MessageCard

//Cambios realizados en MessagesPage.jsx para integrar con backend:

//Eliminado localStorage - Ya no guarda datos localmente
// Añadida comunicación con tu API - Usa fetch para todas las operaciones CRUD  
// Cambiado message.id por message._id - MongoDB usa _id automáticamente
// Estados de loading y error - Mejor experiencia de usuario
// Operaciones asíncronas - Todas las funciones ahora son async/await