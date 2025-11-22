import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { allChats } from '../../../data/communications/chats';
import ChatMessage from "../../components/communications/ChatMessage";

function ChatViewPage() {
  const { chatId } = useParams();
  const [messages, setMessages] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [newMessageText, setNewMessageText] = useState('');
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [editText, setEditText] = useState('');
  
  // Obtener el usuario actual desde localStorage o usar valor por defecto
  const currentUser = localStorage.getItem('currentUser') || "Carlos";

  // Cargar los mensajes del chat
  useEffect(() => {
    const chat = allChats.find(chat => chat.chatId == chatId) || [];
    setParticipants(chat.participants);
    setMessages(chat.messages);
  }, [chatId]);

  // Función para enviar un nuevo mensaje
  const handleSendMessage = () => {
    if (newMessageText.trim() === '') return;

    const user = participants.find(user => user !== messages[messages.length - 1].from);

    const newMessage = {
      id: messages.length + 1,
      from: user,
      text: newMessageText,
      edited: false,
      editedAt: null,
    };

    setMessages([...messages, newMessage]);
    setNewMessageText('');
  };

  // Nueva función para iniciar edición
  const handleStartEdit = (messageId, messageText) => {
    setEditingMessageId(messageId);
    setEditText(messageText);
  };

  // Nueva función para guardar edición
  const handleSaveEdit = (messageId) => {
    setMessages(prev => prev.map(msg =>
      msg.id === messageId
        ? {
            ...msg,
            text: editText,
            edited: true,
            editedAt: new Date().toLocaleString('es-ES')
          }
        : msg
    ));
    setEditingMessageId(null);
    setEditText('');
  };

  // Nueva función para cancelar edición
  const handleCancelEdit = () => {
    setEditingMessageId(null);
    setEditText('');
  };

  // Nueva función para eliminar mensaje
  const handleDeleteMessage = (messageId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este mensaje?')) {
      setMessages(prev => prev.filter(msg => msg.id !== messageId));
    }
  };

  return (
    <div className="chat-view-container">
      {/* Mostrar usuario actual */}
      <div className="chat-header-info">
        <p>Conectado como: <strong>{currentUser}</strong></p>
      </div>
      {/* Área de mensajes */}
      <div className="chat-messages-area">
        {messages.map((message) => (
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
        ))}
      </div>

      {/* Input para escribir */}
      <div className="chat-input-area">
        <input
          type="text"
          value={newMessageText}
          onChange={(e) => setNewMessageText(e.target.value)}
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