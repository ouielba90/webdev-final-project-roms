
 // chat con clientes
export const clientChats = [
 
  {
    chatId: 3,
    participants: ["Carlos", "Cliente: TechCorp"], // Trabajador y cliente
    lastMessage: "¿Cuándo estará listo el proyecto?",
    lastMessageDate: "2025-11-08T15:00:00",
    unreadCount: 1,
    type: "client",
  },
  {
    chatId: 3,
    participants: ["Antonio", "Cliente: Javier"], // Chat con cliente
    lastMessage: "Gracias por la documentación, la revisaré hoy.",
    lastMessageDate: "2025-11-07T17:45:00",
    unreadCount: 1,
    type: "client"
  },
  {
    chatId: 4,
    participants: ["Antonio", "Cliente: Marta"], // Chat con cliente
    lastMessage: "¿Podemos agendar la reunión para el lunes?",
    lastMessageDate: "2025-11-06T11:20:00",
    unreadCount: 3,
    type: "client"
  },
  {
    chatId: 5,
    participants: ["Antonio", "Cliente: Sergio"], // Chat con cliente
    lastMessage: "El acceso remoto ya está funcionando.",
    lastMessageDate: "2025-11-05T08:50:00",
    unreadCount: 0,
    type: "client"
  }
];