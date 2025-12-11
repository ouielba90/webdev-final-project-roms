import mongoose from 'mongoose';

const { Schema } = mongoose; 
const CommunicationsMessagesSchema = new Schema({
    from: { type: String, required: true },
    to: { type: String, required: true },
    text: { type: String, required: true },
    date: { type: Date, required: true },
    edited: { type: Boolean, default: false },
    editedAt: { type: Date, default: null },
});
const CommunicationsMessages = mongoose.model('CommunicationsMessagesPost', CommunicationsMessagesSchema, "messages");
export default CommunicationsMessages;