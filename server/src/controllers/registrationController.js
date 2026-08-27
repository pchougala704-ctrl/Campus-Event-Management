import Registration from '../models/Registration.js';
import Event from '../models/Event.js';
export async function register(req, res) { if (req.user.role !== 'student') return res.status(403).json({ message: 'Only student accounts can register for events.' }); const event = await Event.findById(req.params.eventId); if (!event) return res.status(404).json({ message: 'Event not found.' }); const count = await Registration.countDocuments({ event: event._id }); if (count >= event.capacity) return res.status(400).json({ message: 'This event is full.' }); res.status(201).json(await Registration.create({ event: event._id, student: req.user._id })); }
export async function myRegistrations(req, res) { res.json(await Registration.find({ student: req.user._id }).populate('event')); }
export async function cancel(req, res) { await Registration.findOneAndDelete({ _id: req.params.id, student: req.user._id }); res.json({ message: 'Registration cancelled.' }); }
export async function eventRegistrations(req, res) { res.json(await Registration.find({ event: req.params.eventId }).populate('student', 'name email')); }
