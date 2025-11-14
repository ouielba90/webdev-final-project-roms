import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; //para obtener el chat de la URL
import { allChats } from '../../../data/communications/chats';
import ChatMessage from "../../components/communications/ChatMessage";


//funcion principal
function ChatViewPage() {
  const { chatId } = useParams(); //obtine el Id del chat de la URL
  const [messages, setMessages] = useState([]);
  const [participants, setParticipants] = useState([])
  const [newMessageText, setNewMessageText] = useState('');
  const currentUser = "Carlos"; //simulamos que es el usuario actual

  //carga los mensajes del chat
  useEffect(() => {
    const chat = allChats.find(chat => chat.chatId == chatId) || [];
    setParticipants(chat.participants)
    setMessages(chat.messages);
  }, [chatId]);

  //funcion para enviar un nuevo mensaje
  const handleSendMessage = () => {
    if (newMessageText.trim() === '') return; //no enviar vacio

    const user = participants.find(user => user !== messages[messages.length - 1].from)

    //crea nuevo mensaje
    const newMessage = {
      id: messages.length + 1,
      from: user,
      text: newMessageText,
    };

    //agragar al estado
    setMessages([...messages, newMessage]);
    setNewMessageText(''); //limpia input
  };

  return (
    <div className="chat-view-container">
      {/* Área de mensajes */}
      <div className="chat-messages-area">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            currentUser={currentUser}
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
  )

}


export default ChatViewPage;