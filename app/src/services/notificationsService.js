// Servicio para manejar las peticiones de notificaciones con fetch usando .then() y .catch()

const API_URL = `${import.meta.env.VITE_API_URL}/santos`;

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
};

/**
 * Obtiene todas las notificaciones desde la API
 * @returns {Promise} Promesa que resuelve con los datos de notificaciones
 */
export function fetchNotifications() {
    return fetch(`${API_URL}/notifications`, { headers: getAuthHeaders() })
        .then(response => {
            // Verificar si la respuesta es exitosa
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
            }
            // Convertir la respuesta a JSON
            return response.json();
        })
        .then(data => {
            console.log('✅ Notificaciones obtenidas exitosamente:', data);
            return data;
        })
        .catch(error => {
            console.error('❌ Error al obtener notificaciones:', error);
            // Lanzar el error para que pueda ser manejado por el componente
            throw error;
        });
}

/**
 * Marca una notificación como leída
 * @param {number} id - ID de la notificación
 * @returns {Promise} Promesa que resuelve con la notificación actualizada
 */
export function markNotificationAsRead(id) {
    return fetch(`${API_URL}/notifications/${id}/read`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders()
        },
        body: JSON.stringify({ read: true })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('✅ Notificación marcada como leída:', data);
            return data;
        })
        .catch(error => {
            console.error('❌ Error al marcar notificación como leída:', error);
            throw error;
        });
}

/**
 * Elimina una notificación
 * @param {number} id - ID de la notificación a eliminar
 * @returns {Promise} Promesa que resuelve cuando la notificación es eliminada
 */
export function deleteNotification(id) {
    return fetch(`${API_URL}/notifications/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
            }
            console.log('✅ Notificación eliminada exitosamente');
            return { success: true, id };
        })
        .catch(error => {
            console.error('❌ Error al eliminar notificación:', error);
            throw error;
        });
}

/**
 * Obtiene notificaciones no leídas
 * @returns {Promise} Promesa que resuelve con las notificaciones no leídas
 */
export function fetchUnreadNotifications() {
    return fetch(`${API_URL}/notifications?read=false`, { headers: getAuthHeaders() })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('✅ Notificaciones no leídas obtenidas:', data);
            return data;
        })
        .catch(error => {
            console.error('❌ Error al obtener notificaciones no leídas:', error);
            throw error;
        });
}
