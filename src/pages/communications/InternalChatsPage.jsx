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
    const [editingMessageId, setEditingMessageId] = useState(null);
    const [editText, setEditText] = useState('');

    console.log(filterChats)

    // Cargar chats internos con mensajes sin leer
    useEffect(() => {
        const chatsFilter = allChats.filter(chat => chat.type === "internal" && chat.unreadCount > 0);
        setChats(chatsFilter);
        setFilterChats(chatsFilter)
    }, []);

    // Filtrar cuando cambie 'name' O 'chats'
    useEffect(() => {
        if (chats.length === 0) return;
        
        if (name === "") {
            setFilterChats(chats);
            return;
        }
        const filtered = chats.filter(chat => {
            if (!chat.participants || chat.participants.length === 0) {
                return false;
            }
            
            return chat.participants.some(participant => 
                participant.toLowerCase().includes(name.toLowerCase())
            );
        });

        setFilterChats(filtered);
    }, [name, chats]);

    // Nueva función para iniciar edición
    const handleStartEdit = (messageId, messageText) => {
        setEditingMessageId(messageId);
        setEditText(messageText);
    }

    // Nueva función para guardar edición
    const handleSaveEdit = (chatId, messageId) => {
        setChats(prev => prev.map(chat =>
            chat.chatId === chatId
                ? {
                    ...chat,
                    messages: chat.messages.map(msg =>
                        msg.id === messageId
                            ? {
                                ...msg,
                                text: editText,
                                edited: true,
                                editedAt: new Date().toLocaleString('es-ES')
                              }
                            : msg
                    )
                  }
                : chat
        ));
        setEditingMessageId(null);
        setEditText('');
    }

    // Nueva función para cancelar edición
    const handleCancelEdit = () => {
        setEditingMessageId(null);
        setEditText('');
    }

    // Nueva función para eliminar mensaje
    const handleDeleteMessage = (chatId, messageId) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este mensaje?')) {
            setChats(prev => prev.map(chat =>
                chat.chatId === chatId
                    ? {
                        ...chat,
                        messages: chat.messages.filter(msg => msg.id !== messageId)
                      }
                    : chat
            ));
        }
    }

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
                                editingMessageId={editingMessageId}
                                editText={editText}
                                onStartEdit={handleStartEdit}
                                onSaveEdit={handleSaveEdit}
                                onCancelEdit={handleCancelEdit}
                                onDeleteMessage={handleDeleteMessage}
                                onEditTextChange={(newText) => setEditText(newText)}
                            />
                        ))
                    )}
                </div>
            </div>
        </>
    )
}
export default InternalChatPage;


