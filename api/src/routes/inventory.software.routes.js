import express from 'express';
import softwareController from '../controllers/inventory.software.controller.js';

const router = express.Router();

router.get('/', softwareController.getSoftware);
router.get('/:id', softwareController.getASoftware);
router.post('/', softwareController.createSoftware);
router.delete('/:id', softwareController.deleteSoftware);
router.put('/:id', softwareController.updateSoftware);

export default router;