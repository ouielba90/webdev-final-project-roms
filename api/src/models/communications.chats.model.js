import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    text: { type: String, required: true },
    date: { type: Date, default: Date.now },
    read: { type: Boolean, default: false },
    chatId: { type: Number, required: true },
    
}
);
const Chat = mongoose.model('ChatPost', chatSchema, 'chat-messages');
export default Chat;