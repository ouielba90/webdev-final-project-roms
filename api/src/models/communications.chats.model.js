import mongoose from 'mongoose';

const { Schema } = mongoose;

const messageSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    text: { type: String, required: true },
    date: { type: Date, default: Date.now },
    read: { type: Boolean, default: false }
   
});
// Esquema principal del chat
const ChatSchema = new Schema({
    
    type: { 
        type: String, 
        required: true,
        enum: ['internal', 'client'], // Solo puede ser 'internal' o 'client'
    },
    participants: [{ 
        type: String, 
        required: true 
    }],
    messages: [messageSchema], // Array de mensajes
    unreadCount: { 
        type: Number, 
        default: 0 
    },
    lastMessageDate: { 
        type: Date, 
        default: Date.now 
    }
}, { timestamps: true }); //añade createdAt y updatedAt automáticamente

const Chat = mongoose.model('Chat', ChatSchema, 'chats');

export default Chat;