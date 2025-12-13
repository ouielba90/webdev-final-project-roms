import express from 'express';
import notificationsController from '../controllers/communications.notifications.controller.js';

const router = express.Router();

// Ruta para obtener todas las notificaciones
router.get('/', notificationsController.getAllNotifications);

// Ruta para obtener una notificación por ID    
router.get('/:id', notificationsController.getNotifications);

// Ruta para crear una nueva notificación
router.post('/', notificationsController.createNotification);

// Ruta para actualizar una notificación por ID 
router.put('/:id', notificationsController.updateNotification);

// Ruta para eliminar una notificación por ID
router.delete('/:id', notificationsController.deleteNotification);

export default router;