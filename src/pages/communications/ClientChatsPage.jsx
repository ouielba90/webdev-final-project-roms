import { useState } from "react";
import { allChats } from '../../../data/communications/chats.js';
import ChatListItem from '../../components/communications/ChatListItem.jsx';

function ClientChatsPage() {

  const [chats, setChats] = useState(allChats);

  return (

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

            />
          ))
        )}
      </div>
    </div>

  )
}



export default ClientChatsPage;