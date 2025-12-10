import express from 'express';
import serversController from '../controllers/inventory.servers.controller.js';

const router = express.Router();
router.get('/', serversController.getServers)
router.get('/:id', serversController.getAServer)
router.post('/', serversController.createServer)
router.delete('/:id', serversController.deleteServer)
router.put('/:id', serversController.updateServer)

export default router