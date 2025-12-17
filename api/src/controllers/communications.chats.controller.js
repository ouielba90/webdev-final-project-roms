import Chat from './../models/communications.chats.model.js';

// Obtener todos los chats
const getAllChats = async (req, res) => {
    try {
        const chats = await Chat.find().sort({ lastMessageDate: -1 });
        res.status(200).json(chats);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error retrieving chats', 
            error: error.message 
        });
    }
};

// Obtener chats por tipo (internal o client)
const getChatsByType = async (req, res) => {
    try {
        const { type } = req.params;
        const chats = await Chat.find({ type: type }).sort({ lastMessageDate: -1 });
        res.status(200).json(chats);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error retrieving chats by type', 
            error: error.message 
        });
    }
};

// Obtener un chat por chatId
const getChatById = async (req, res) => {
    try {
        const { chatId } = req.params;
        const chat = await Chat.findOne({ chatId: parseInt(chatId) });
        
        if (!chat) {
            return res.status(404).json({ message: 'Chat not found' });
        }
        
        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error retrieving chat', 
            error: error.message 
        });
    }
};

// Crear un nuevo chat
const createChat = async (req, res) => {
    try {
        const newChat = new Chat(req.body);
        const savedChat = await newChat.save();
        res.status(201).json(savedChat);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error creating chat', 
            error: error.message 
        });
    }
};

// Actualizar un chat completo
const updateChat = async (req, res) => {
    try {
        const { chatId } = req.params;
        const updatedChat = await Chat.findOneAndUpdate(
            { chatId: parseInt(chatId) },
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!updatedChat) {
            return res.status(404).json({ message: 'Chat not found' });
        }
        
        res.status(200).json(updatedChat);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error updating chat', 
            error: error.message 
        });
    }
};

// Añadir un mensaje a un chat existente
const addMessageToChat = async (req, res) => {
    try {
        const { chatId } = req.params;
        const { from, text } = req.body;
        
        const chat = await Chat.findOne({ chatId: parseInt(chatId) });
        
        if (!chat) {
            return res.status(404).json({ message: 'Chat not found' });
        }
        
        // Crear el nuevo mensaje
        const newMessage = {
            id: chat.messages.length + 1,
            from: from,
            text: text,
            date: new Date(),
            edited: false,
            editedAt: null
        };
        
        // Añadir el mensaje al array de mensajes
        chat.messages.push(newMessage);
        chat.lastMessageDate = new Date();
        chat.unreadCount += 1;
        
        await chat.save();
        
        res.status(201).json(chat);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error adding message to chat', 
            error: error.message 
        });
    }
};

// Editar un mensaje específico dentro de un chat
const editMessageInChat = async (req, res) => {
    try {
        const { chatId, messageId } = req.params;
        const { text } = req.body;
        
        const chat = await Chat.findOne({ chatId: parseInt(chatId) });
        
        if (!chat) {
            return res.status(404).json({ message: 'Chat not found' });
        }
        
        // Buscar el mensaje por id
        const message = chat.messages.find(msg => msg.id === parseInt(messageId));
        
        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }
        
        // Actualizar el mensaje
        message.text = text;
        message.edited = true;
        message.editedAt = new Date();
        
        await chat.save();
        
        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error editing message', 
            error: error.message 
        });
    }
};

// Eliminar un mensaje específico dentro de un chat
const deleteMessageFromChat = async (req, res) => {
    try {
        const { chatId, messageId } = req.params;
        
        const chat = await Chat.findOne({ chatId: parseInt(chatId) });
        
        if (!chat) {
            return res.status(404).json({ message: 'Chat not found' });
        }
        
        // Filtrar los mensajes, eliminando el que coincida con messageId
        chat.messages = chat.messages.filter(msg => msg.id !== parseInt(messageId));
        
        await chat.save();
        
        res.status(200).json({ 
            message: 'Message deleted successfully',
            chat: chat
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Error deleting message', 
            error: error.message 
        });
    }
};

// Eliminar un chat completo
const deleteChat = async (req, res) => {
    try {
        const { chatId } = req.params;
        const deletedChat = await Chat.findOneAndDelete({ chatId: parseInt(chatId) });
        
        if (!deletedChat) {
            return res.status(404).json({ message: 'Chat not found' });
        }
        
        res.status(200).json({ 
            message: 'Chat deleted successfully',
            chatId: chatId
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Error deleting chat', 
            error: error.message 
        });
    }
};

export default {
    getAllChats,
    getChatsByType,
    getChatById,
    createChat,
    updateChat,
    addMessageToChat,
    editMessageInChat,
    deleteMessageFromChat,
    deleteChat
};