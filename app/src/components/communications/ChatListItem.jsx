import { useNavigate } from "react-router-dom";
import ChatMessage from "./ChatMessage";

// Formatear fecha del último mensaje
function ChatListItem({
    chat,
    editingMessageId,
    editText,
    onStartEdit,
    onSaveEdit,
    onCancelEdit,
    onDeleteMessage,
    onEditTextChange,
    currentUser
}) {
    const navigate = useNavigate();

    const fechaFormateada = new Date(chat.lastMessageDate).toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });

    // Si no estamos en la vista de detalle del chat, solo mostrar el item de lista
    const otherParticipant = chat.participants.join(" y ");
    if (!chat.isOpen) {
        return (
            <div
                className={`chat-list-item ${chat.unreadCount > 0 ? 'unread' : ''}`}
                onClick={() => navigate(`/communications/chat/${chat._id}`)}
            >
                <div className="chat-avatar">
                    {chat.type === 'internal' ? '👥' : '🏢'}
                </div>

                <div className="chat-info">
                    <h3 className="chat-participants">{otherParticipant}</h3>
                    <p className="chat-last-message">{chat.messages[chat.messages.length - 1]?.text}</p>
                </div>

                <div className="chat-meta">
                    <span className="chat-date">{fechaFormateada}</span>
                    {chat.unreadCount > 0 && (
                        <span className="chat-unread-badge">{chat.unreadCount}</span>
                    )}
                </div>
                <hr className="separador-chats-internos" />
            </div>
        );
    }

    // Si el chat está abierto, mostrar todos los mensajes con funcionalidad de edición
    return (
        <div className="chat-detail-container">
            <div className="chat-header">
                <h2>{otherParticipant}</h2>
                <button
                    className="btn-close-chat"
                    onClick={() => navigate('/communications/chats')}
                >
                    ✕ Cerrar
                </button>
            </div>

            <div className="chat-messages-container">
             
                {chat.messages.map((message) => (
                    <ChatMessage
                        key={message.id}
                        message={message}
                        currentUser={currentUser}
                        chatId={chat.chatId}
                        editingMessageId={editingMessageId}
                        editText={editText}
                        onStartEdit={onStartEdit}
                        onSaveEdit={onSaveEdit}
                        onCancelEdit={onCancelEdit}
                        onDeleteMessage={onDeleteMessage}
                        onEditTextChange={onEditTextChange}
                    />
                ))}
            </div>
        </div>
    );
}

export default ChatListItem;