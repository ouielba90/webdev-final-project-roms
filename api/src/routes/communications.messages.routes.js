import express from 'express';
import messagesController  from '../controllers/communications.messages.controller.js';

const router = express.Router();

// ruta para obtener todos los mensajes
router.get('/', messagesController.getAllMessages);

// ruta para obtener un mensaje por ID
router.get('/:id', messagesController.getIdMessage);

// ruta para crear un nuevo mensaje
router.post('/', messagesController.createMessage);

// ruta para actualizar un mensaje por ID
router.put('/:id', messagesController.updateMessage);

// ruta para eliminar un mensaje por ID
router.delete('/:id', messagesController.deleteMessage);

export default router;



//messagesController =  todas las funciones que exporte el controlador