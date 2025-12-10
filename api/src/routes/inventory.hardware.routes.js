import express from 'express';
import hardwareController from './../controllers/inventory.hardware.controller.js';

const router = express.Router();
router.get('/', hardwareController.getHardware)
router.get('/:id', hardwareController.getAHardware)
router.post('/', hardwareController.createHardware)
router.delete('/:id', hardwareController.deleteHardware)
router.put('/:id', hardwareController.updateHardware)

export default router