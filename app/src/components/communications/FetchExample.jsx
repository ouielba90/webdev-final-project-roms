// Componente de ejemplo que muestra cómo usar los servicios con fetch .then() y .catch()
import { useState, useEffect } from 'react';
import { fetchMessages } from '../../services/messagesService';
import { fetchNotifications } from '../../services/notificationsService';
import { fetchChatMessages } from '../../services/chatService';
import './FetchExample.css';

function FetchExample() {
    // Estados para cada tipo de dato
    const [messages, setMessages] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [chatMessages, setChatMessages] = useState([]);

    // Estados para manejar loading y errores
    const [loading, setLoading] = useState({
        messages: false,
        notifications: false,
        chat: false
    });

    const [errors, setErrors] = useState({
        messages: null,
        notifications: null,
        chat: null
    });

    // Función para cargar mensajes
    const loadMessages = () => {
        setLoading(prev => ({ ...prev, messages: true }));
        setErrors(prev => ({ ...prev, messages: null }));

        fetchMessages()
            .then(data => {
                setMessages(data);
                setLoading(prev => ({ ...prev, messages: false }));
            })
            .catch(error => {
                setErrors(prev => ({
                    ...prev,
                    messages: 'Error al cargar mensajes: ' + error.message
                }));
                setLoading(prev => ({ ...prev, messages: false }));
            });
    };

    // Función para cargar notificaciones
    const loadNotifications = () => {
        setLoading(prev => ({ ...prev, notifications: true }));
        setErrors(prev => ({ ...prev, notifications: null }));

        fetchNotifications()
            .then(data => {
                setNotifications(data);
                setLoading(prev => ({ ...prev, notifications: false }));
            })
            .catch(error => {
                setErrors(prev => ({
                    ...prev,
                    notifications: 'Error al cargar notificaciones: ' + error.message
                }));
                setLoading(prev => ({ ...prev, notifications: false }));
            });
    };

    // Función para cargar mensajes de chat
    const loadChatMessages = () => {
        setLoading(prev => ({ ...prev, chat: true }));
        setErrors(prev => ({ ...prev, chat: null }));

        fetchChatMessages()
            .then(data => {
                setChatMessages(data);
                setLoading(prev => ({ ...prev, chat: false }));
            })
            .catch(error => {
                setErrors(prev => ({
                    ...prev,
                    chat: 'Error al cargar chat: ' + error.message
                }));
                setLoading(prev => ({ ...prev, chat: false }));
            });
    };

    // Cargar todos los datos al montar el componente
    useEffect(() => {
        loadMessages();
        loadNotifications();
        loadChatMessages();
    }, []);

    return (
        <div className="fetch-example-container">
            <h1>Ejemplo de Fetch con .then() y .catch()</h1>

            {/* Sección de Mensajes */}
            <section className="data-section">
                <h2>📧 Mensajes</h2>
                <button onClick={loadMessages} disabled={loading.messages}>
                    {loading.messages ? '⏳ Cargando...' : '🔄 Recargar Mensajes'}
                </button>

                {errors.messages && (
                    <div className="error-message">
                        ❌ {errors.messages}
                    </div>
                )}

                {loading.messages ? (
                    <p>Cargando mensajes...</p>
                ) : (
                    <div className="data-list">
                        <p>Total de mensajes: {messages.length}</p>
                        {messages.slice(0, 3).map((msg, index) => (
                            <div key={index} className="data-item">
                                <strong>De:</strong> {msg.from || 'Desconocido'} <br />
                                <strong>Para:</strong> {msg.to || 'Desconocido'} <br />
                                <strong>Mensaje:</strong> {msg.text || 'Sin contenido'}
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Sección de Notificaciones */}
            <section className="data-section">
                <h2>🔔 Notificaciones</h2>
                <button onClick={loadNotifications} disabled={loading.notifications}>
                    {loading.notifications ? '⏳ Cargando...' : '🔄 Recargar Notificaciones'}
                </button>

                {errors.notifications && (
                    <div className="error-message">
                        ❌ {errors.notifications}
                    </div>
                )}

                {loading.notifications ? (
                    <p>Cargando notificaciones...</p>
                ) : (
                    <div className="data-list">
                        <p>Total de notificaciones: {notifications.length}</p>
                        {notifications.slice(0, 3).map((notif, index) => (
                            <div key={index} className="data-item">
                                <strong>De:</strong> {notif.from || 'Sistema'} <br />
                                <strong>Mensaje:</strong> {notif.text || 'Sin contenido'}
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Sección de Chat */}
            <section className="data-section">
                <h2>💬 Chat</h2>
                <button onClick={loadChatMessages} disabled={loading.chat}>
                    {loading.chat ? '⏳ Cargando...' : '🔄 Recargar Chat'}
                </button>

                {errors.chat && (
                    <div className="error-message">
                        ❌ {errors.chat}
                    </div>
                )}

                {loading.chat ? (
                    <p>Cargando mensajes de chat...</p>
                ) : (
                    <div className="data-list">
                        <p>Total de mensajes de chat: {chatMessages.length}</p>
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
