import ChatPost from '../models/communications.chats.model.js';

const getAllChats = async (req, res) => {
    try {
        const chats = await ChatPost.find();
        res.status(200).json(chats);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving chats', error });
    }
};

const getChatById = async (req, res) => {
    const { id } = req.params;
    try {
        const chat = await ChatPost.findOne({ id: id });
        if (chat) {
            res.status(200).json(chat);
        } else {
            res.status(404).json({ message: 'Chat not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving chat', error });
    }   
};

const createChat = async (req, res) => {
    const chatData = req.body;
    try {
        const newChat = new ChatPost(chatData);
        await newChat.save();
        res.status(201).json(newChat);
    } catch (error) {
        res.status(500).json({ message: 'Error creating chat', error });
    }
};

const updateChat = async (req, res) => {
    const { id } = req.params;
    const chatData = req.body;
    try {
        const updatedChat = await ChatPost.findOneAndUpdate({ id: id }, chatData, { new: true });
        if (updatedChat) {
            res.status(200).json(updatedChat);
        } else {
            res.status(404).json({ message: 'Chat not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating chat', error });
    }
};

const deleteChat = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedChat = await ChatPost.findOneAndDelete({ id: id });
        if (deletedChat) {
            res.status(200).json({ message: 'Chat deleted successfully' });
        } else {
            res.status(404).json({ message: 'Chat not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting chat', error });
    }
};

export { getAllChats, getChatById, createChat, updateChat, deleteChat };