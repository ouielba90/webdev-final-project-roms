// Servicio para manejar las peticiones de chat con fetch usando .then() y .catch()

const API_URL = 'http://localhost:3000/santos';

/**
 * Obtiene todos los mensajes de chat desde la API
 * @returns {Promise} Promesa que resuelve con los datos de mensajes de chat
 */
export function fetchChatMessages() {
    return fetch(`${API_URL}/chat-messages`)
        .then(response => {
            // Verificar si la respuesta es exitosa
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
            }
            // Convertir la respuesta a JSON
            return response.json();
        })
        .then(data => {
            console.log('✅ Mensajes de chat obtenidos exitosamente:', data);
            return data;
        })
        .catch(error => {
            console.error('❌ Error al obtener mensajes de chat:', error);
            // Lanzar el error para que pueda ser manejado por el componente
            throw error;
        });
}

/**
 * Obtiene mensajes de chat de una conversación específica
 * @param {number} chatId - ID de la conversación
 * @returns {Promise} Promesa que resuelve con los mensajes de la conversación
 */
export function fetchChatMessagesByConversation(chatId) {
    return fetch(`${API_URL}/chat-messages/${chatId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(`✅ Mensajes de chat ${chatId} obtenidos exitosamente:`, data);
            return data;
        })
        .catch(error => {
            console.error(`❌ Error al obtener mensajes de chat ${chatId}:`, error);
            throw error;
        });
}

/**
 * Envía un nuevo mensaje de chat
 * @param {Object} messageData - Datos del mensaje a enviar
 * @returns {Promise} Promesa que resuelve con el mensaje enviado
 */
export function sendChatMessage(messageData) {
    return fetch(`${API_URL}/chat-messages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('✅ Mensaje de chat enviado exitosamente:', data);
            return data;
        })
        .catch(error => {
            console.error('❌ Error al enviar mensaje de chat:', error);
            throw error;
        });
}

/**
 * Elimina un mensaje de chat
 * @param {number} id - ID del mensaje a eliminar
 * @returns {Promise} Promesa que resuelve cuando el mensaje es eliminado
 */
export function deleteChatMessage(id) {
    return fetch(`${API_URL}/chat-messages/${id}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
            }
            console.log('✅ Mensaje de chat eliminado exitosamente');
            return { success: true, id };
        })
        .catch(error => {
            console.error('❌ Error al eliminar mensaje de chat:', error);
            throw error;
        });
}

