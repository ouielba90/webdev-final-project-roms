
import express from 'express';
import chatsController from '../controllers/communications.chats.controller.js';


const router = express.Router();

// Ruta para obtener todos los chats
router.get('/', chatsController.getAllChats);

// Ruta para obtener chats por tipo (internal o client)
router.get('/type/:type', chatsController.getChatsByType);

// Ruta para obtener un chat por chatId
router.get('/:chatId', chatsController.getChatById);

// Ruta para crear un nuevo chat
router.post('/', chatsController.createChat);

// Ruta para actualizar un chat completo
router.put('/:chatId', chatsController.updateChat);

// Ruta para añadir un mensaje a un chat
router.post('/:chatId/messages', chatsController.addMessageToChat);

// Ruta para editar un mensaje específico
router.put('/:chatId/messages/:messageId', chatsController.editMessageInChat);

// Ruta para eliminar un mensaje específico
router.delete('/:chatId/messages/:messageId', chatsController.deleteMessageFromChat);

// Ruta para eliminar un chat completo
router.delete('/:chatId', chatsController.deleteChat);

export default router;