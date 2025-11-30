
// Aqui se guarda los mensajes de cada conversacion
// Se organizan segun el chatId con un array dentro

const chatMessages = {
  // Mensajes del chat 1 (Carlos y Ana)
  1: [
    {
      id: 1,
      from: "Carlos",
      
      text: "Hola Ana, ¿revisaste el firewall de TechNova?",
      date: "2025-11-08T10:00:00",
      read: true,
    },
    {
      id: 2,
      from: "Ana",
      
      text: "Sí, ya está configurado. ¿Necesitas algo más?",
      date: "2025-11-08T10:05:00",
      read: false,
    },
  ],

  // Mensajes del chat 2 (María y Pedro)
  2: [
    {
      id: 3,
      chatId: 2,
      from: "María",
      to: "Pedro",
      text: "La reunión de equipo es mañana a las 10:00",
      date: "2025-11-08T09:00:00",
      read: true,
    },
  ],

  // Mensajes del chat 3 (Carlos y Cliente)
  3: [
    {
      id: 4,
      chatId: 3,
      from: "Carlos",
      to: "Cliente: TechCorp",
      text: "Buenos días, ¿en qué puedo ayudarle?",
      date: "2025-11-08T14:00:00",
      read: true,
    },
    {
      id: 5,
      chatId: 3,
      from: "Cliente: TechCorp",
      to: "Carlos",
      text: "¿Cuándo estará listo el proyecto de seguridad?",
      date: "2025-11-08T14:30:00",
      read: false,
    },
  ],
};

export default chatMessages;