import express from "express";
import chatsController from "../controllers/communications.chats.controller.js";

const router = express.Router();

// Ruta para obtener todos los chats
router.get("/", chatsController.getAllChats);

// Ruta para obtener un chat por ID    
router.get("/:id", chatsController.getChatById);

// Ruta para crear un nuevo chat
router.post("/", chatsController.createChat);

// Ruta para actualizar un chat por ID 
router.put("/:id", chatsController.updateChat);

// Ruta para eliminar un chat por ID
router.delete("/:id", chatsController.deleteChat);

export default router;