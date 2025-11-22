import { useEffect, useState } from "react";
import { allChats } from '../../../data/communications/chats.js';
import ChatListItem from '../../components/communications/ChatListItem.jsx';

function ClientChatsPage() {
  const [chats, setChats] = useState(allChats);
  const [filterChats, setFilterChats] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    //chat de tipo interno y con al menos un mensaje sin leer
    const chatsFilter = allChats.filter(chat => chat.type === "client" && chat.unreadCount > 0)
    setChats(chatsFilter);
    setFilterChats(chatsFilter)
  }, []);

  // Filtar cuando cambie "name o  "chats"
  useEffect(() => {
    if (chats.length === 0) return; //Espera a que chats este cargado
    
    if (name === "") {
      setFilterChats(chats);
      return;
    }

    const filtered = chats.filter(chat => {
      //verifica que paricipants exista y tenga elementos
      if (!chat.participants || chat.participants.length === 0) {
        return false;
      }
      //Buscar en todos los participantes
      return chat.participants.some(participant =>
        participant.toLowerCase().includes(name.toLowerCase())
      );
    });
    setFilterChats(filtered);
  }, [name, chats]); //agregamos chats como dependencia


  return (
    <>
      <div className="header-chats-clientes">
        <h1>💬 Chats con Clientes</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="name-input-c">name</label>
          <input
            id="name-input-c"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)} />
        </form>
      </div>

      <div className="container-chats">
        <div className="chat-list-grid">
          {filterChats.length === 0 ? (
            <p className="no-chats-message">
              {name
                ? `No se encontraron chats con "${name}"`
                : "No hay chats disponibles"}
            </p>
          ) : (
            filterChats.map((chat) => (
              <ChatListItem
                key={chat.chatId}
                chat={chat}
              />
            ))
          )}
        </div>
      </div>
    </>
  )
}

export default ClientChatsPage;