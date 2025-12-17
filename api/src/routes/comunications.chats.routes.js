
import express from 'express';
import chatsController from '../controllers/communications.chats.controller.js';


const router = express.Router();

// Ruta para obtener todos los chats
router.get('/', chatsController.getAllChats);

// Ruta para obtener chats por tipo (internal o client)
router.get('/type/:type', chatsController.getChatsByType);

// Ruta para crear un nuevo chat
router.post('/', chatsController.createChat);

// Ruta para añadir un mensaje a un chat
router.post('/:id/messages', chatsController.addMessageToChat);

// Ruta para editar un mensaje específico
router.put('/:id/messages/:messageId', chatsController.editMessageInChat);

// Ruta para eliminar un mensaje específico
router.delete('/:id/messages/:messageId', chatsController.deleteMessageFromChat);

// Ruta para obtener un chat por chatId
router.get('/:id', chatsController.getChatById);

// Ruta para actualizar un chat completo
router.put('/:id', chatsController.updateChat);

// Ruta para eliminar un chat completo
router.delete('/:id', chatsController.deleteChat);

export default router;