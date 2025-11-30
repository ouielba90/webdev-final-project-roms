<<<<<<< HEAD

const allChats = [
  {
    chatId: 2,
    participants: ["Carlos", "Ana"],
    messages: [
      { id: 1, from: "Carlos", text: "¿Revisaste el firewall?" },
      { id: 2, from: "Ana", text: "Si, pesado" },
      { id: 3, from: "Carlos", text: "Vale, graciosa" },
    ],
    lastMessageDate: "2025-11-08T14:30:00",
    unreadCount: 2,
    type: "internal",
  },
  {
    chatId: 6,
    participants: ["María", "Pedro"],
    messages: [
      { id: 1, from: "Pedro", text: "¿A qué hora es la reunión de mañana?" },
      { id: 2, from: "María", text: "La reunión es a las 10" },
      { id: 3, from: "Pedro", text: "Perfecto, ahí estaré" },
      { id: 4, from: "María", text: "Trae los informes del proyecto" },
    ],
    lastMessageDate: "2025-11-08T13:15:00",
    unreadCount: 1,
    type: "internal",
  },
  {
    chatId: 7,
    participants: ["Carlos", "Ana"],
    messages: [
      { id: 1, from: "Ana", text: "Oye, necesito que revises algo" },
      { id: 2, from: "Carlos", text: "¿Revisaste el firewall?" },
      { id: 3, from: "Ana", text: "Todavía no, ahora lo hago" },
      { id: 4, from: "Carlos", text: "Es urgente, por favor" },
    ],
    lastMessageDate: "2025-11-08T14:30:00",
    unreadCount: 2,
    type: "internal",
  },
  {
    chatId: 8,
    participants: ["Manuel", "Lucía"],
    messages: [
      { id: 1, from: "Lucía", text: "¿Cómo va el tema del proxy?" },
      { id: 2, from: "Manuel", text: "Ya está configurado el proxy." },
      { id: 3, from: "Lucía", text: "Genial, ¿funcionan todas las conexiones?" },
      { id: 4, from: "Manuel", text: "Sí, todo operativo. Lo he probado esta mañana" },
      { id: 5, from: "Lucía", text: "Excelente trabajo, gracias" },
    ],
    lastMessageDate: "2025-11-08T09:15:00",
    unreadCount: 7,
    type: "internal",
  },

  {
  chatId: 1,
  participants: ["Carlos", "Cliente: TechCorp"],
  messages: [
    { id: 1, from: "Carlos", text: "Hola, ¿cómo va todo?" },
    { id: 2, from: "Cliente: TechCorp", text: "Bien, gracias. ¿Cuándo estará listo el proyecto?" }
  ],
  lastMessageDate: "2025-11-08T15:00:00",
  unreadCount: 1,
  type: "client"
},
{
  chatId: 3,
  participants: ["Antonio", "Cliente: Javier"],
  messages: [
    { id: 1, from: "Antonio", text: "Te envío la documentación." },
    { id: 2, from: "Cliente: Javier", text: "Gracias por la documentación, la revisaré hoy." }
  ],
  lastMessageDate: "2025-11-07T17:45:00",
  unreadCount: 1,
  type: "client"
},
{
  chatId: 4,
  participants: ["Antonio", "Cliente: Marta"],
  messages: [
    { id: 1, from: "Antonio", text: "¿Cuándo prefieres la reunión?" },
    { id: 2, from: "Cliente: Marta", text: "¿Podemos agendar la reunión para el lunes?" }
  ],
  lastMessageDate: "2025-11-06T11:20:00",
  unreadCount: 3,
  type: "client"
},
{
  chatId: 5,
  participants: ["Antonio", "Cliente: Sergio"],
  messages: [
    { id: 1, from: "Antonio", text: "He configurado el acceso remoto." },
    { id: 2, from: "Cliente: Sergio", text: "El acceso remoto ya está funcionando." }
  ],
  lastMessageDate: "2025-11-05T08:50:00",
  unreadCount: 2,
  type: "client"
}

];

export default allChats;
=======
export const posts = [
  {
    id: "p1",
    user: "Ada Lovelace",
    imageUrl: "https://picsum.photos/seed/ada/600/400",
    description:
      "Explorando interfaces simples: menos fricción, más foco en el flujo.",
    createdAt: "2025-10-01T10:00:00.000Z",
  },
  {
    id: "p2",
    user: "Grace Hopper",
    imageUrl: "https://picsum.photos/seed/grace/600/400",
    description:
      "Pequeños pasos, grandes resultados. Empezando por un CRUD básico.",
    createdAt: "2025-10-02T12:30:00.000Z",
  },
  {
    id: "p3",
    user: "Linus Torvalds",
    imageUrl: "https://picsum.photos/seed/linus/600/400",
    description: "Iterar, medir, simplificar. El orden será el del array.",
    createdAt: "2025-10-03T09:15:00.000Z",
  },
];

export default posts;
>>>>>>> 545012a0c96339f27a3577867ecbab3140931746
