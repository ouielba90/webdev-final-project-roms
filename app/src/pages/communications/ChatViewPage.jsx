import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ChatMessage from "../../components/communications/ChatMessage";

// URL de tu API backend
const API_URL = 'http://localhost:3000/api/chats';

function ChatViewPage() {
  const { chatId } = useParams();
  const [messages, setMessages] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [newMessageText, setNewMessageText] = useState('');
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [editText, setEditText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener el usuario actual desde el almacenamiento local
  const currentUser = localStorage.getItem('currentUser') || "Carlos";

  // Cargar los mensajes del chat desde MongoDB
  useEffect(() => {
    fetchChatData();
  }, [chatId]);

  // Función para obtener los datos del chat
  const fetchChatData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/${chatId}`);
      
      if (!response.ok) {
        throw new Error('Error al cargar el chat');
      }
      
      const data = await response.json();
      setParticipants(data.participants || []);
      setMessages(data.messages || []);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Función para enviar un nuevo mensaje
  const handleSendMessage = async () => {
    if (newMessageText.trim() === '') return;

    try {
      // Determinar quién envía el mensaje
      const lastMessage = messages[messages.length - 1];
      const sender = lastMessage 
        ? participants.find(user => user !== lastMessage.from) || currentUser
        : currentUser;

      const response = await fetch(`${API_URL}/${chatId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: sender,
          text: newMessageText
        }),
      });

      if (!response.ok) {
        throw new Error('Error al enviar el mensaje');
      }

      const updatedChat = await response.json();
      setMessages(updatedChat.messages);
      setNewMessageText('');
    } catch (err) {
      console.error('Error al enviar mensaje:', err);
      alert('No se pudo enviar el mensaje. Por favor, intenta de nuevo.');
    }
  };

  // Función para iniciar edición
  const handleStartEdit = (messageId, messageText) => {
    setEditingMessageId(messageId);
    setEditText(messageText);
  };

  // Función para guardar edición
  const handleSaveEdit = async (messageId) => {
    try {
      const response = await fetch(`${API_URL}/${chatId}/messages/${messageId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: editText }),
      });

      if (!response.ok) {
        throw new Error('Error al editar el mensaje');
      }

      const updatedChat = await response.json();
      setMessages(updatedChat.messages);
      setEditingMessageId(null);
      setEditText('');
    } catch (err) {
      console.error('Error al guardar edición:', err);
      alert('No se pudo guardar la edición. Por favor, intenta de nuevo.');
    }
  };

  // Función para cancelar edición
  const handleCancelEdit = () => {
    setEditingMessageId(null);
    setEditText('');
  };

  // Función para eliminar mensaje
  const handleDeleteMessage = async (messageId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este mensaje?')) {
      try {
        const response = await fetch(`${API_URL}/${chatId}/messages/${messageId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Error al eliminar el mensaje');
        }

        const result = await response.json();
        setMessages(result.chat.messages);
      } catch (err) {
        console.error('Error al eliminar:', err);
        alert('No se pudo eliminar el mensaje. Por favor, intenta de nuevo.');
      }
    }
  };

  // Renderizar estado de carga
  if (loading) {
    return (
      <div className="chat-view-container">
        <div className="chat-header-info">
          <p>Cargando chat...</p>
        </div>
      </div>
    );
  }

  // Renderizar estado de error
  if (error) {
    return (
      <div className="chat-view-container">
        <div className="chat-header-info">
          <p className="error">Error: {error}</p>
          <button onClick={fetchChatData}>Reintentar</button>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-view-container">
      {/* Mostrar usuario actual */}
      <div className="chat-header-info">
        <p>Conectado como: <strong>{currentUser}</strong></p>
      </div>

      {/* Área de mensajes */}
      <div className="chat-messages-area">
        {messages.length === 0 ? (
          <p>No hay mensajes en este chat</p>
        ) : (
          messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              currentUser={currentUser}
              chatId={chatId}
              editingMessageId={editingMessageId}
              editText={editText}
              onStartEdit={handleStartEdit}
              onSaveEdit={handleSaveEdit}
              onCancelEdit={handleCancelEdit}
              onDeleteMessage={handleDeleteMessage}
              onEditTextChange={(newText) => setEditText(newText)}
            />
          ))
        )}
      </div>

      {/* Input para escribir */}
      <div className="chat-input-area">
        <input
          type="text"
          value={newMessageText}
          onChange={(e) => setNewMessageText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Escribe un mensaje..."
          className="chat-input"
        />
        <button onClick={handleSendMessage} className="btn-send-message">
          Enviar 📤
        </button>
      </div>
    </div>
  );
}

export default ChatViewPage;


{/*Backend creado/actualizado:
communications.chats.model.js - Modelo con estructura completa (chat con array de mensajes)
communications.chats.controller.js - Controlador con todas las operaciones CRUD + operaciones de mensajes
communications.chats.routes.js - Rutas completas para chats y mensajes
Frontend actualizado:
InternalChatsPage.jsx - Conectado a MongoDB con filtros
ClientChatsPage.jsx - Conectado a MongoDB con filtros
ChatViewPage.jsx - Vista de chat individual con todas las operaciones
chatService.js - Servicio actualizado para todas las operaciones*/}