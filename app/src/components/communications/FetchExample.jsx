
//Este es el endpoint /santos/messages, que devuelve los mensajes de la API de Santos
//Este es el endpoint /santos/notifications, que devuelve las notificaciones de la API de Santos
//Este es el endpoint /santos/chat-messages, que devuelve los mensajes de chat de la API de Santos

// Componente de ejemplo que muestra cómo usar los servicios con fetch .then() y .catch()
import { useState, useEffect } from 'react';
import { fetchMessages } from '../../services/messagesService';
import { fetchNotifications } from '../../services/notificationsService';
import { fetchChatMessages } from '../../services/chatService';
import './FetchExample.css';

function FetchExample() {
    // ========== ESTADOS ==========
    
    // Estados para almacenar los datos de cada sección
    const [messages, setMessages] = useState([]); // Guarda los mensajes
    const [notifications, setNotifications] = useState([]); // Guarda las notificaciones
    const [chatMessages, setChatMessages] = useState([]); // Guarda los mensajes del chat

    // Estado para controlar si cada sección está cargando datos
    // Usamos un objeto para manejar múltiples estados de loading
    const [loading, setLoading] = useState({
        messages: false,
        notifications: false,
        chat: false
    });

    // Estado para almacenar errores de cada sección
    // null significa que no hay error
    const [errors, setErrors] = useState({
        messages: null,
        notifications: null,
        chat: null
    });

    // ========== FUNCIONES PARA CARGAR DATOS ==========
    
    // Función para cargar mensajes desde el servicio
    const loadMessages = () => {
        // Activamos el loading para mensajes (mostrará "Cargando...")
        setLoading(prev => ({ ...prev, messages: true }));
        
        // Limpiamos cualquier error previo
        setErrors(prev => ({ ...prev, messages: null }));

        // Llamamos al servicio para obtener los mensajes
        fetchMessages()
            .then(data => {
                // Si la petición es exitosa, guardamos los datos
                setMessages(data);
                // Desactivamos el loading
                setLoading(prev => ({ ...prev, messages: false }));
            })
            .catch(error => {
                // Si hay un error, lo guardamos en el estado de errores
                setErrors(prev => ({
                    ...prev,
                    messages: 'Error al cargar mensajes: ' + error.message
                }));
                // Desactivamos el loading aunque haya error
                setLoading(prev => ({ ...prev, messages: false }));
            });
    };

    // Función para cargar notificaciones desde el servicio
    const loadNotifications = () => {
        // Mismo patrón que loadMessages:
        // 1. Activar loading
        setLoading(prev => ({ ...prev, notifications: true }));
        
        // 2. Limpiar errores previos
        setErrors(prev => ({ ...prev, notifications: null }));

        // 3. Hacer la petición
        fetchNotifications()
            .then(data => {
                // Éxito: guardar datos y desactivar loading
                setNotifications(data);
                setLoading(prev => ({ ...prev, notifications: false }));
            })
            .catch(error => {
                // Error: guardar mensaje de error y desactivar loading
                setErrors(prev => ({
                    ...prev,
                    notifications: 'Error al cargar notificaciones: ' + error.message
                }));
                setLoading(prev => ({ ...prev, notifications: false }));
            });
    };

    // Función para cargar mensajes del chat desde el servicio
    const loadChatMessages = () => {
        // Mismo patrón: activar loading y limpiar errores
        setLoading(prev => ({ ...prev, chat: true }));
        setErrors(prev => ({ ...prev, chat: null }));

        // Hacer la petición al servicio de chat
        fetchChatMessages()
            .then(data => {
                // Éxito: guardar mensajes del chat
                setChatMessages(data);
                setLoading(prev => ({ ...prev, chat: false }));
            })
            .catch(error => {
                // Error: guardar mensaje de error
                setErrors(prev => ({
                    ...prev,
                    chat: 'Error al cargar chat: ' + error.message
                }));
                setLoading(prev => ({ ...prev, chat: false }));
            });
    };

    // ========== EFECTOS ==========
    
    // useEffect se ejecuta cuando el componente se monta (carga por primera vez)
    // El array vacío [] significa que solo se ejecuta una vez
    useEffect(() => {
        // Cargamos todos los datos al inicio
        loadMessages();
        loadNotifications();
        loadChatMessages();
    }, []); // Dependencias vacías = solo se ejecuta al montar el componente

    // ========== RENDERIZADO ==========
    
    return (
        <div className="fetch-example-container">
            <h1>Ejemplo de Fetch con .then() y .catch()</h1>

            {/* ===== SECCIÓN DE MENSAJES ===== */}
            <section className="data-section">
                <h2>📧 Mensajes</h2>
                
                {/* Botón para recargar mensajes manualmente */}
                {/* disabled={loading.messages} deshabilita el botón mientras carga */}
                <button onClick={loadMessages} disabled={loading.messages}>
                    {/* Texto condicional: si está cargando muestra "Cargando...", si no "Recargar" */}
                    {loading.messages ? '⏳ Cargando...' : '🔄 Recargar Mensajes'}
                </button>

                {/* Si hay un error, lo mostramos */}
                {errors.messages && (
                    <div className="error-message">
                        ❌ {errors.messages}
                    </div>
                )}

                {/* Renderizado condicional: si está cargando, muestra "Cargando...", si no, muestra los datos */}
                {loading.messages ? (
                    <p>Cargando mensajes...</p>
                ) : (
                    <div className="data-list">
                        {/* Mostramos el total de mensajes */}
                        <p>Total de mensajes: {messages.length}</p>
                        
                        {/* .slice(0, 3) toma solo los primeros 3 mensajes */}
                        {/* .map() recorre cada mensaje y crea un elemento visual */}
                        {messages.slice(0, 3).map((msg, index) => (
                            <div key={index} className="data-item">
                                {/* || 'Desconocido' es un valor por defecto si el campo está vacío */}
                                <strong>De:</strong> {msg.from || 'Desconocido'} <br />
                                <strong>Para:</strong> {msg.to || 'Desconocido'} <br />
                                <strong>Mensaje:</strong> {msg.text || 'Sin contenido'}
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* ===== SECCIÓN DE NOTIFICACIONES ===== */}
            <section className="data-section">
                <h2>🔔 Notificaciones</h2>
                
                {/* Mismo patrón que la sección de mensajes */}
                <button onClick={loadNotifications} disabled={loading.notifications}>
                    {loading.notifications ? '⏳ Cargando...' : '🔄 Recargar Notificaciones'}
                </button>

                {/* Mostrar error si existe */}
                {errors.notifications && (
                    <div className="error-message">
                        ❌ {errors.notifications}
                    </div>
                )}

                {/* Renderizado condicional según el estado de loading */}
                {loading.notifications ? (
                    <p>Cargando notificaciones...</p>
                ) : (
                    <div className="data-list">
                        <p>Total de notificaciones: {notifications.length}</p>
                        {/* Mostramos solo las primeras 3 notificaciones */}
                        {notifications.slice(0, 3).map((notif, index) => (
                            <div key={index} className="data-item">
                                <strong>De:</strong> {notif.from || 'Sistema'} <br />
                                <strong>Mensaje:</strong> {notif.text || 'Sin contenido'}
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* ===== SECCIÓN DE CHAT ===== */}
            <section className="data-section">
                <h2>💬 Chat</h2>
                
                {/* Mismo patrón que las secciones anteriores */}
                <button onClick={loadChatMessages} disabled={loading.chat}>
                    {loading.chat ? '⏳ Cargando...' : '🔄 Recargar Chat'}
                </button>

                {/* Mostrar error si existe */}
                {errors.chat && (
                    <div className="error-message">
                        ❌ {errors.chat}
                    </div>
                )}

                {/* Renderizado condicional según el estado de loading */}
                {loading.chat ? (
                    <p>Cargando mensajes de chat...</p>
                ) : (
                    <div className="data-list">
                        <p>Total de mensajes de chat: {chatMessages.length}</p>
                        {/* Mostramos solo los primeros 3 mensajes del chat */}
                        {chatMessages.slice(0, 3).map((chat, index) => (
                            <div key={index} className="data-item">
                                <strong>Usuario:</strong> {chat.sender || 'Anónimo'} <br />
                                <strong>Mensaje:</strong> {chat.message || 'Sin contenido'}
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}

export default FetchExample;