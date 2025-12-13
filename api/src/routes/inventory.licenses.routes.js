import express from 'express';
import licensesController from '../controllers/inventory.licenses.controller.js';

const router = express.Router();
router.get('/', licensesController.getLicenses)
router.get('/:id', licensesController.getALicense)
router.post('/', licensesController.createLicense)
router.delete('/:id', licensesController.deleteLicense)
router.put('/:id', licensesController.updateLicense)

export default router