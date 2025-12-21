import { useEffect, useState } from 'react';
import ChatListItem from '../../components/communications/ChatListItem';

// URL base de mi API backend
const API_BASE_URL = `${import.meta.env.VITE_API_URL}/santos/chats`;

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
};

function InternalChatPage() {
    const [chats, setChats] = useState([]);
    const [filterChats, setFilterChats] = useState([]);
    const [name, setName] = useState("");
    const [editingMessageId, setEditingMessageId] = useState(null);
    const [editText, setEditText] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchInternalChats();
    }, []);

    const fetchInternalChats = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE_URL}/type/internal`, {
                headers: getAuthHeaders()
            });

            if (!response.ok) {
                throw new Error('Error al cargar los chats internos');
            }

            const data = await response.json();
            setChats(data);
            setFilterChats(data);
            setError(null);
        } catch (err) {
            setError(err.message);
            console.error('Error al cargar los chats internos:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (chats.length === 0) return;

        if (name === "") {
            setFilterChats(chats);
            return;
        }

        const filtered = chats.filter(chat =>
            chat.participants?.some(participant =>
                participant.toLowerCase().includes(name.toLowerCase())
            )
        );

        setFilterChats(filtered);
    }, [name, chats]);

    const handleStartEdit = (messageId, messageText) => {
        setEditingMessageId(messageId);
        setEditText(messageText);
    };

    const handleSaveEdit = async (chatId, messageId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/${chatId}/messages/${messageId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    ...getAuthHeaders()
                },
                body: JSON.stringify({ text: editText }),
            });

            if (!response.ok) {
                throw new Error('Error al editar el mensaje');
            }

            const updatedChat = await response.json();
            setChats(prev => prev.map(chat => chat.chatId === chatId ? updatedChat : chat));
            setFilterChats(prev => prev.map(chat => chat.chatId === chatId ? updatedChat : chat));
            setEditingMessageId(null);
            setEditText('');
        } catch (err) {
            console.error('Error al guardar edición:', err);
            alert('No se pudo guardar la edición. Por favor, intenta de nuevo.');
        }
    };

    const handleCancelEdit = () => {
        setEditingMessageId(null);
        setEditText('');
    };

    const handleDeleteMessage = async (chatId, messageId) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este mensaje?')) {
            try {
                const response = await fetch(`${API_BASE_URL}/${chatId}/messages/${messageId}`, {
                    method: 'DELETE',
                    headers: getAuthHeaders()
                });

                if (!response.ok) {
                    throw new Error('Error al eliminar el mensaje');
                }

                const result = await response.json();
                setChats(prev => prev.map(chat => chat.chatId === chatId ? result.chat : chat));
                setFilterChats(prev => prev.map(chat => chat.chatId === chatId ? result.chat : chat));
            } catch (err) {
                console.error('Error al eliminar:', err);
                alert('No se pudo eliminar el mensaje. Por favor, intenta de nuevo.');
            }
        }
    };

    if (loading) {
        return (
            <div className="header-chats-internos">
                <h1>💬 Chats Internos</h1>
                <p>Cargando chats...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="header-chats-internos">
                <h1>💬 Chats Internos</h1>
                <p className="error">Error: {error}</p>
                <button onClick={fetchInternalChats}>Reintentar</button>
            </div>
        );
    }

    return (
        <>
            <div className="header-chats-internos">
                <h1>💬 Chats Internos</h1>
                <form onSubmit={(e) => e.preventDefault()}>
                    <label htmlFor="name-input-c">Buscar</label>
                    <input
                        id="name-input-c"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                        filterChats.map(chat => (
                            <ChatListItem
                                key={chat._id}
                                chat={chat}
                                editingMessageId={editingMessageId}
                                editText={editText}
                                onStartEdit={handleStartEdit}
                                onSaveEdit={handleSaveEdit}
                                onCancelEdit={handleCancelEdit}
                                onDeleteMessage={handleDeleteMessage}
                                onEditTextChange={setEditText}
                            />
                        ))
                    )}
                </div>
            </div>
        </>
    );
}

export default InternalChatPage;
