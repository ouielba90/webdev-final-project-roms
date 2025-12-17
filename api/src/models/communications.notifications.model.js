import mongoose from 'mongoose';

const { Schema } = mongoose;
const CommunicationsNotificationSchema = new Schema({
    from: { type: String, required: true },
    to: { type: String, required: true },
    text: { type: String, required: true },
    date: { type: Date, required: true },
    isAlert: { type: Boolean, required: true }
}, {
    timestamps: true //mantiene la fecha de creación y actualización automáticamente
});

const CommunicationsNotifications = mongoose.model(
    'CommunicationsNotifications', 
    CommunicationsNotificationSchema, 
    'notifications'); //nombre de la colección en la base de datos mongodb


export default CommunicationsNotifications;