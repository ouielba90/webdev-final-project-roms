import { useState } from "react";
import { clientChats } from '../../../data/communications/clientChats.js';
import ChatListItem from '../../components/communications/ChatListItem.jsx';
import  { useNavigate } from 'react-router-dom';


function ClientChatsPage() {

    const [chats, setChats] = useState(clientChats);
    const navigate = useNavigate();  //para navegar a otra pagina

    //funcion para abri un chat especifico
    const handleOpenChat = (chatId) => {
        //navega a la pagina del chat
        navigate(`/communications/chat/${chatId}`);
    };

    return(
         
    <div className="container-chats">
      <h1>💬 Client Chats</h1>
      
      <div className="chat-list">
        {chats.length === 0 ? (
          <p>No hay chats disponibles</p>
        ) : (
          chats.map((chat) => (
            <ChatListItem 
              key={chat.chatId}
              chat={chat}
              onClick={() => handleOpenChat(chat.chatId)}
            />
          ))
        )}
      </div>
    </div>

    )
}



export default ClientChatsPage;