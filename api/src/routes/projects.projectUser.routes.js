import express from 'express';
import projectsUserController from './../controllers/projects.projectUser.controller.js';

const router = express.Router();
router.get('/', projectsUserController.getProjectsUsers);
router.get('/:id', projectsUserController.getAProjectsUsers);

export default router;