import { Router } from 'express';
import { cancel, eventRegistrations, myRegistrations, register } from '../controllers/registrationController.js';
import { adminOnly, protect } from '../middleware/auth.js';
const router = Router();
router.get('/mine', protect, myRegistrations); router.post('/:eventId', protect, register); router.delete('/:id', protect, cancel); router.get('/event/:eventId', protect, adminOnly, eventRegistrations);
export default router;
