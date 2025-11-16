import { useEffect, useState } from "react";
import { allChats } from '../../../data/communications/chats.js';
import ChatListItem from '../../components/communications/ChatListItem.jsx';

function ClientChatsPage() {
const [chats, setChats] = useState(allChats);

useEffect(() => {
        //chat de tipo interno y con al menos un mensaje sin leer
        const chat = allChats.filter(chat => chat.type === "client" && chat.unreadCount > 0)
            setChats(chat);
        }, []);

  return (

    <div className="container-chats">
      <h1>💬 Chats con Clientes</h1>
      <div className="chat-list">
        {chats.length === 0 ? (
          <p>No hay chats disponibles</p>
        ) : (
          chats.map((chat) => (
            <ChatListItem
              key={chat.chatId}
              chat={chat}

            />
          ))
        )}
      </div>
    </div>

  )
}



export default ClientChatsPage;