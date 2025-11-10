import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; //para obtener el chat de la URL
import { chatMessages } from '../../../data/communications/chatMessages';
import ChatMessage from "../../components/communications/ChatMessage";


//funcion principal
function ChatViewPage()  {
    const { chatId } = useParams(); //obtine el Id del chat de la URL
    const [messages, setMessages] = useState([]);
    const [newMessageText, setNewMessageText] = useState('');
    const currentUser = "Carlos"; //simulamos que es el usuario actual

    //carga los mensajes del chat
    useEffect(() => {
        const messagesForChat = chatMessages[chatId] || [];
        setMessages(messagesForChat);
    }, [chatId]);

    //funcion para enviar un nuevo mensaje
    const handleSendMessage = () => {
        if (newMessageText.trim() === '') return; //no enviar vacio

        //crea nuevo mensaje
        const newMessage = {
            id: messages.length +1,
            chatId: parseInt(chatId),
            from: currentUser,
            to: "Otro usuario",  //aqui se obtiene el destinatario real
            text: newMessageText,
            date: new Date().toISOString(),
            read: false
        };

        //agragar al estado
        setMessages([...messages, newMessage]);
        setNewMessageText(''); //limpia input
    };

    return(
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