// Servicio para manejar las peticiones de mensajes con fetch usando .then() y .catch()

const API_URL = `${import.meta.env.VITE_API_URL}/santos`;

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
};

/**
 * Obtiene todos los mensajes desde la API
 * @returns {Promise} Promesa que resuelve con los datos de mensajes
 */
export function fetchMessages() {
    return fetch(`${API_URL}/messages`, { headers: getAuthHeaders() })
        .then(response => {
            // Verificar si la respuesta es exitosa
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
            }
            // Convertir la respuesta a JSON
            return response.json();
        })
        .then(data => {
            console.log('✅ Mensajes obtenidos exitosamente:', data);
            return data;
        })
        .catch(error => {
            console.error('❌ Error al obtener mensajes:', error);
            // Lanzar el error para que pueda ser manejado por el componente
            throw error;
        });
}

/**
 * Crea un nuevo mensaje (ejemplo de POST)
 * @param {Object} messageData - Datos del mensaje a crear
 * @returns {Promise} Promesa que resuelve con el mensaje creado
 */
export function createMessage(messageData) {
    return fetch(`${API_URL}/messages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders()
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
            console.log('✅ Mensaje creado exitosamente:', data);
            return data;
        })
        .catch(error => {
            console.error('❌ Error al crear mensaje:', error);
            throw error;
        });
}

/**
 * Actualiza un mensaje existente (ejemplo de PUT)
 * @param {number} id - ID del mensaje a actualizar
 * @param {Object} messageData - Nuevos datos del mensaje
 * @returns {Promise} Promesa que resuelve con el mensaje actualizado
 */
export function updateMessage(id, messageData) {
    return fetch(`${API_URL}/messages/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders()
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
            console.log('✅ Mensaje actualizado exitosamente:', data);
            return data;
        })
        .catch(error => {
            console.error('❌ Error al actualizar mensaje:', error);
            throw error;
        });
}

/**
 * Elimina un mensaje (ejemplo de DELETE)
 * @param {number} id - ID del mensaje a eliminar
 * @returns {Promise} Promesa que resuelve cuando el mensaje es eliminado
 */
export function deleteMessage(id) {
    return fetch(`${API_URL}/messages/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
            }
            console.log('✅ Mensaje eliminado exitosamente');
            return { success: true, id };
        })
        .catch(error => {
            console.error('❌ Error al eliminar mensaje:', error);
            throw error;
        });
}
