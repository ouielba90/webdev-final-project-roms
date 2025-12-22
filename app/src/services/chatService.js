// Servicio para manejar las peticiones de chat con MongoDB

const API_URL = 'http://localhost:3000/santos/chats';

/**
 * Obtiene todos los chats desde la API
 * @returns {Promise} Promesa que resuelve con los datos de chats
 */
export function fetchAllChats() {
    return fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('✅ Chats obtenidos exitosamente:', data);
            return data;
        })
        .catch(error => {
            console.error('❌ Error al obtener chats:', error);
            throw error;
        });
}

/**
 * Obtiene chats por tipo (internal o client)
 * @param {string} type - Tipo de chat ('internal' o 'client')
 * @returns {Promise} Promesa que resuelve con los chats del tipo especificado
 */
export function fetchChatsByType(type) {
    return fetch(`${API_URL}/type/${type}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(`✅ Chats de tipo ${type} obtenidos exitosamente:`, data);
            return data;
        })
        .catch(error => {
            console.error(`❌ Error al obtener chats de tipo ${type}:`, error);
            throw error;
        });
}

/**
 * Obtiene un chat específico por chatId
 * @param {number} chatId - ID del chat
 * @returns {Promise} Promesa que resuelve con el chat específico
 */
export function fetchChatById(chatId) {
    return fetch(`${API_URL}/${chatId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(`✅ Chat ${chatId} obtenido exitosamente:`, data);
            return data;
        })
        .catch(error => {
            console.error(`❌ Error al obtener chat ${chatId}:`, error);
            throw error;
        });
}

/**
 * Crea un nuevo chat
 * @param {Object} chatData - Datos del chat a crear
 * @returns {Promise} Promesa que resuelve con el chat creado
 */
export function createChat(chatData) {
    return fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(chatData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('✅ Chat creado exitosamente:', data);
            return data;
        })
        .catch(error => {
            console.error('❌ Error al crear chat:', error);
            throw error;
        });
}

/**
 * Añade un mensaje a un chat existente
 * @param {number} chatId - ID del chat
 * @param {Object} messageData - Datos del mensaje (from, text)
 * @returns {Promise} Promesa que resuelve con el chat actualizado
 */
export function addMessageToChat(chatId, messageData) {
    return fetch(`${API_URL}/${chatId}/messages`, {
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
            console.log('✅ Mensaje añadido exitosamente:', data);
            return data;
        })
        .catch(error => {
            console.error('❌ Error al añadir mensaje:', error);
            throw error;
        });
}

/**
 * Edita un mensaje específico dentro de un chat
 * @param {number} chatId - ID del chat
 * @param {number} messageId - ID del mensaje
 * @param {string} newText - Nuevo texto del mensaje
 * @returns {Promise} Promesa que resuelve con el chat actualizado
 */
export function editMessageInChat(chatId, messageId, newText) {
    return fetch(`${API_URL}/${chatId}/messages/${messageId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newText })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('✅ Mensaje editado exitosamente:', data);
            return data;
        })
        .catch(error => {
            console.error('❌ Error al editar mensaje:', error);
            throw error;
        });
}

/**
 * Elimina un mensaje específico de un chat
 * @param {number} chatId - ID del chat
 * @param {number} messageId - ID del mensaje a eliminar
 * @returns {Promise} Promesa que resuelve cuando el mensaje es eliminado
 */
export function deleteMessageFromChat(chatId, messageId) {
    return fetch(`${API_URL}/${chatId}/messages/${messageId}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('✅ Mensaje eliminado exitosamente');
            return data;
        })
        .catch(error => {
            console.error('❌ Error al eliminar mensaje:', error);
            throw error;
        });
}

/**
 * Elimina un chat completo
 * @param {number} chatId - ID del chat a eliminar
 * @returns {Promise} Promesa que resuelve cuando el chat es eliminado
 */
export function deleteChat(chatId) {
    return fetch(`${API_URL}/${chatId}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('✅ Chat eliminado exitosamente');
            return data;
        })
        .catch(error => {
            console.error('❌ Error al eliminar chat:', error);
            throw error;
        });
}
