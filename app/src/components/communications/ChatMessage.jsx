
//Componente para un mensaje dentro del chat

// Componente para un mensaje dentro del chat

function ChatMessage({
  message,
  currentUser,
  chatId,
  editingMessageId,
  editText,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onDeleteMessage,
  onEditTextChange
}) {

  const isMine = message.from === currentUser;

  const handleEditClick = () => {
    onStartEdit(message.id, message.text);
  };

  const handleSaveClick = () => {
    onSaveEdit(message.id);
  };

  return (
    <div className={`chat-message ${isMine ? 'mine' : 'theirs'}`}>
      <div className="message-bubble">
        <p className="message-author">
          Author: {message.from}
          {message.edited && (
            <span className="edited-badge"> (Editado {message.editedAt})</span>
          )}
        </p>

        {/* Renderizado condicional - mostrar textarea si está editando */}
        {editingMessageId === message.id ? (
          <textarea
            value={editText}
            onChange={(e) => onEditTextChange(e.target.value)}
            className="message-text-edit"
            rows="3"
          />
        ) : (
          <p className="message-text">{message.text}</p>
        )}

        {/* Botones de acción - solo mostrar si es mi mensaje */}
        {isMine && (
          <div className="message-actions">
            {editingMessageId === message.id ? (
              <>
                <button
                  onClick={handleSaveClick}
                  className="btn-save-edit-msg"
                >
                  ✓ Guardar
                </button>
                <button
                  onClick={onCancelEdit}
                  className="btn-cancel-edit-msg"
                >
                  ✕ Cancelar
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleEditClick}
                  className="btn-edit-msg"
                >
                  ✏️ Editar
                </button>
                <button
                  onClick={() => onDeleteMessage(message.id)}
                  className="btn-delete-msg"
                >
                  🗑️ Eliminar
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatMessage;