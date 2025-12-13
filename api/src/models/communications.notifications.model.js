import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema({
    from: { type: String, required: true },
    to: { type: String, required: true },
    text: { type: String, required: true },
    date: { type: Date, required: true },
    isAlert: { type: Boolean, required: true }
}, {
    timestamps: true //mantiene la fecha de creación y actualización automáticamente
});

const Notification = mongoose.model('NotificationPost', NotificationSchema, 'notifications');

export default Notification;