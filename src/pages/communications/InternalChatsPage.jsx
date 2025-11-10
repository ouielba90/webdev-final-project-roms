
import { useState } from 'react';
import { internalChats } from '../../../data/communications/internalChats.js';
import ChatListItem from '../../components/communications/ChatListItem';
import { useNavigate } from 'react-router-dom';

function InternalChatPage() {

    const [chats, setChats] = useState(internalChats);
    const navigate = useNavigate(); //para navegar a otras paginas

    //Función para abrir un chat específico y Navega a la página del chat
    const handleOpenChat = (chatId) => {
        //navega a la pagina del chat
        navigate(`/comunications/chat/${chatId}`);
    };

    return (
        <div className='container-chats'>
            <h1>💬 Chats Internos</h1>
            <div className='chat-list'>
                {chats.length === 0 ? (
                    <p>No hay chats disponibles</p>
                ) : (
                    chats.map((chat) => (
                        <ChatListItem
                            key={chat.chatId}
                            chat={chat}
                            onClick={() => handleOpenChat(chat.chatId)}
                        />
                    ))
                )}
            </div>
        </div>
    );

}


export default InternalChatPage