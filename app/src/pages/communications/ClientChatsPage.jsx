import { useEffect, useState } from "react";
import ChatListItem from '../../components/communications/ChatListItem.jsx';

// URL de tu API backend
const API_URL = 'http://localhost:3000/santos/chats';

function ClientChatsPage() {
  const [chats, setChats] = useState([]);
  const [filterChats, setFilterChats] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar chats de clientes desde MongoDB
  useEffect(() => {
    fetchClientChats();
  }, []);

  // Función para obtener chats de clientes
  const fetchClientChats = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/type/client`);
      
      if (!response.ok) {
        throw new Error('Error al cargar los chats de clientes');
      }
      
      const data = await response.json();
      // Filtrar solo los que tienen mensajes sin leer
      const unreadChats = data.filter(chat => chat.unreadCount > 0);
      setChats(unreadChats);
      setFilterChats(unreadChats);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Filtrar cuando cambie "name" o "chats"
  useEffect(() => {
    if (chats.length === 0) return;
    
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
  }, [name, chats]);

  // Renderizar estado de carga
  if (loading) {
    return (
      <div className="header-chats-clientes">
        <h1>💬 Chats con Clientes</h1>
        <p>Cargando chats...</p>
      </div>
    );
  }

  // Renderizar estado de error
  if (error) {
    return (
      <div className="header-chats-clientes">
        <h1>💬 Chats con Clientes</h1>
        <p className="error">Error: {error}</p>
        <button onClick={fetchClientChats}>Reintentar</button>
      </div>
    );
  }

  return (
    <>
      <div className="header-chats-clientes">
        <h1>💬 Chats con Clientes</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="name-input-c">Buscar</label>
          <input
            id="name-input-c"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)} 
          />
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
  );
}

export default ClientChatsPage;