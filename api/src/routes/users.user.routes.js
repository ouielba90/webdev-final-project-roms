import express from 'express';
import usersController from './../controllers/users.user.controller.js';

const router = express.Router();
router.get('/', usersController.getUsers);
router.get('/:id', usersController.getAUsers)
router.post('/', usersController.createUser);
router.delete('/:id', usersController.deleteUser);
router.put('/:id', usersController.updateUser);

export default router;