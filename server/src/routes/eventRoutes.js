import { Router } from 'express';
import { createEvent, deleteEvent, getEvent, listEvents, stats, updateEvent } from '../controllers/eventController.js';
import { adminOnly, protect } from '../middleware/auth.js';
const router = Router();
router.get('/', listEvents); router.get('/stats', protect, adminOnly, stats); router.get('/:id', getEvent);
router.post('/', protect, adminOnly, createEvent); router.put('/:id', protect, adminOnly, updateEvent); router.delete('/:id', protect, adminOnly, deleteEvent);
export default router;
