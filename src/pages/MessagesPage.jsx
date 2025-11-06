
import { useEffect, useState } from "react";  //hook para manejar estados
import { messages as messagesData } from "../../data/messages"; //datos externos -  array datos sistema
import MessageCard from "../components/MessageCard"

//funcion principal

function MessagesPages() {
    const [messages, setMessages] = useState(messagesData); {/*nos muestra los cambios de estados*/ }

    useEffect(() => {
        setMessages(messagesData)
    },[])  //el array vacio evita la re-renderizacion infinita
    
    {/*Renderizacion de la estructura basica*/ }
    return (
        <>
            <div className="container-messages">
                <h1>Mensajes</h1>
                <div className=" messages-list">
                    {/*usamos map para recorrer cada mensaje*/}
                    {messages.map((message) => (
                        <MessageCard
                            //el componente MessageCard recibe las props desde el objeto message
                            key={message.id}
                            from={message.from}
                            to={message.to}
                            text={message.text}
                            date={message.date}
                            isAlert={message.isAlert}
                        />
                    ))}


                </div>
            </div>
        </>
    )
}



export default MessagesPages;
