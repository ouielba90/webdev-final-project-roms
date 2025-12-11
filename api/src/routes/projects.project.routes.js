import express from 'express';
import projectsController from './../controllers/projects.project.controller.js';

const router = express.Router();
router.get('/', projectsController.getProjects);
router.get('/:id', projectsController.getAProjects);
router.post('/', projectsController.createProject);
router.delete('/:id', projectsController.deleteProject);
router.put('/:id', projectsController.updateProject);

export default router;