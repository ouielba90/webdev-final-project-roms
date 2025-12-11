import express from 'express';
import messagesController  from '../controllers/communications.messages.controllers.js';

const router = express.Router();

// ruta para obtener todos los mensajes
router.get('/messages', messagesController.getAllMessages);

// ruta para obtener un mensaje por ID
router.get('/messages/:id', messagesController.getMessageById);

// ruta para crear un nuevo mensaje
router.post('/messages', messagesController.createMessage);

// ruta para actualizar un mensaje por ID
router.put('/messages/:id', messagesController.updateMessageById);

// ruta para eliminar un mensaje por ID
router.delete('/messages/:id', messagesController.deleteMessageById);

export default router;



//messagesController =  todas las funciones que exporte el controlador