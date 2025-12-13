
//lo que recibe la funcion
function MessageCard({ id, from, to, text, date, isAlert, edited, editedAt, onDeleteMessage, onStartEdit, onSaveEdit, onCancelEdit, isEditing, editText, onEditTextChange }) {

    //formateo de fecha a hora local
    const fechaFormateada = new Date(date).toLocaleString('es-ES');
    console.log('hora', date);

    //Operador ternario Evalúa una expresión booleana y devuelve un valor si es verdadera y otro si es falsa, todo en una sola línea.
    const mensajeTernario = isAlert ? `⚠️ ${text}` : text

    //Funcion obtiene el objeto del  mensaje para pasar a onStartEdit
    const handleEditClick = () => {
        onStartEdit({ id, from, to, text, date, isAlert })
    }

    //Funcion que maneja los datos editados
    const handleEdit = (e) => {
        e.preventDefault()
        // llama a la funcion onSaveEdit con el id del mensaje
        onSaveEdit(id)
    }

    //Renderizado
    return (
        <div className={`message-card ${isAlert ? 'alert' : 'normal'}`}>
            <p className="message-from"> {/*muestra el remitente*/}
                👤 De: {from}
            </p>
            <p className="message-to">  {/*muestra el destinatario*/}
                📧 Para: {to}
            </p>

            {/*renderizado condicional - mostrar input si esta editado*/}
            {isEditing ? (
                <form onSubmit={handleEdit}>
                    <textarea
                        value={editText}
                        onChange={(e) => onEditTextChange(e.target.value)}
                        className="message-text-edit"
                        name="mensaje-editado"
                        rows="4"
                    />
                    <button
                        type="submit"
                        className="btn-save-edit"
                    >
                        ✓ Guardar
                    </button>
                </form>
            ) : (
                <p className="message-text">
                    {mensajeTernario}
                </p>
            )}

            <p className="message-date">  {/*fecha formateada*/}
                🕒 {fechaFormateada}
                {edited && <span className="edited-indicator"> (Editado {editedAt})</span>}

                {/*renderizacion condicional - mostrar botones de guardar/cancelar*/}
                <div className="messasge-actions">
                    {isEditing ? (
                        <>

                            <button
                                onClick={onCancelEdit}
                                className="btn-cancel-edit"
                            >
                                ✕ Cancelar
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={handleEditClick}
                                className="btn-edit"
                            >
                                ✏️ Editar
                            </button>

                            <button
                                onClick={() => onDeleteMessage(id)}
                                className="btn-delete"
                            >
                                🗑️ Borrar
                            </button>
                        </>
                    )}
                </div>

            </p>

        </div>
    );

}


export default MessageCard




//En MessageCard.jsx para actualizar:
//El mensaje ahora muestra un textarea cuando está en modo edición
//Agrego un indicador (Editado...) si el mensaje fue editado
//Los botones cambian: muestra "Editar" y "Borrar" normalmente, "Guardar" y "Cancelar" en modo edición