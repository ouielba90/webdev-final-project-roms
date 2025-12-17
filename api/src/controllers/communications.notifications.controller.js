import CommunicationsNotifications from "./../models/communications.notifications.model.js";

//obtner todas las notificaciones
const getAllNotifications = async (req, res) => {
    try {
        const notifications = await CommunicationsNotifications.find();
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({
             message: 'Error retrieving notifications', 
             error: error.message });
    }
};

//obtener notificaciones por usuario ID
const getIdNotifications = async (req, res) => {
    try {
    const { Id } = req.params;
    const notification = await CommunicationsNotifications.findById(id);
    
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json({
             message: 'Error retrieving notification for user',
              error: error.message 
            });
    }
};

//crear nueva notificación
const createNotification = async (req, res) => {
    try {
        const newNotification = new CommunicationsNotifications(req.body);
        const savedNotification = newNotification.save();
        res.status(201).json(savedNotification);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error creating notification', 
            error: error.message 
        });
    }
};

//actualizar notificación por ID
const updateNotification = async (req, res) => {
    
    try {
        const { id } = req.params;
        const updatedNotification = await CommunicationsNotifications.findByIdAndUpdate(id, req.body, 
            { new: true, runValidators: true });
        
            if (!updatedNotification) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        res.status(200).json(updatedNotification);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error updating notification', 
            error: error.message});
    }
};

//eliminar notificación por ID
const deleteNotification = async (req, res) => {
    try {       
        const { id } = req.params;
        const deletedNotification = await CommunicationsNotifications.findByIdAndDelete(id);
        
        if (!deletedNotification) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        res.status(200).json({ message: 'Notification deleted successfully', 
        id: id })
    } catch (error) {
        res.status(500).json({ 
            message: 'Error deleting notification', 
            error: error.message});
    }
}

export default {
    getAllNotifications,
    getIdNotifications,
    createNotification,
    updateNotification,
    deleteNotification
}; 
