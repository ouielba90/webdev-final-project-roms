import NotificationsPost from "./../models/communications.notifications.model.js";

const getAllNotifications = async (req, res) => {
    try {
        const notifications = await NotificationsPost.find();
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving notifications', error });
    }
};

const getNotifications = async (req, res) => {
    const { userId } = req.params;
    try {
        const notifications = await NotificationsPost.find({ userId });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving notifications for user', error });
    }
};

const createNotification = async (req, res) => {
    const notificationData = req.body;
    try {
        const newNotification = new NotificationsPost(notificationData);
        await newNotification.save();
        res.status(201).json(newNotification);
    } catch (error) {
        res.status(500).json({ message: 'Error creating notification', error });
    }
};

const updateNotification = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const updatedNotification = await NotificationsPost.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedNotification) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        res.status(200).json(updatedNotification);
    } catch (error) {
        res.status(500).json({ message: 'Error updating notification', error });
    }
};

const deleteNotification = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedNotification = await NotificationsPost.findByIdAndDelete(id);
        if (!deletedNotification) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        res.status(200).json({ message: 'Notification deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting notification', error });
    }
}

export default {
    getAllNotifications,
    getNotifications,
    createNotification,
    updateNotification,
    deleteNotification
}; 