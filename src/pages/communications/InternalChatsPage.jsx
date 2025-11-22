// ==========================================
// InternalChatsPage.jsx -con Buscador-Filtro
// ==========================================

import { useEffect, useState } from 'react';
import { allChats } from '../../../data/communications/chats.js';
import ChatListItem from '../../components/communications/ChatListItem';

function InternalChatPage() {
    const [chats, setChats] = useState([]);
    const [filterChats, setFilterChats] = useState([]);
    const [name, setName] = useState("");

    console.log(filterChats)


    // Cargar chats internos con mensajes sin leer
    useEffect(() => {
        const chatsFilter = allChats.filter(chat => chat.type === "internal" && chat.unreadCount > 0);
        setChats(chatsFilter);
        setFilterChats(chatsFilter)
    }, []);

   
   
    // Filtrar cuando cambie 'name' O 'chats'
    useEffect(() => {
        if (chats.length === 0) return; // Esperar a que chats esté cargado
        
        if (name === "") {
            setFilterChats(chats);
            return;
        }
        const filtered = chats.filter(chat => {
            // Verificar que participants exista y tenga elementos
            if (!chat.participants || chat.participants.length === 0) {
                return false;
            }
            
            // Buscar en todos los participantes
            return chat.participants.some(participant => 
                participant.toLowerCase().includes(name.toLowerCase())
            );
        });

        setFilterChats(filtered);
    }, [name, chats]); // Agregar 'chats' como dependencia

    return (
    <>
      <div className="header-chats-internos">
        <h1>💬 Chats Internos</h1>
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
export default InternalChatPage;