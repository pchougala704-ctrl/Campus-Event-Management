import Event from '../models/Event.js';
import Registration from '../models/Registration.js';

export async function listEvents(req, res) {
  const filter = {};
  if (req.query.search) filter.$or = [{ title: new RegExp(req.query.search, 'i') }, { description: new RegExp(req.query.search, 'i') }, { location: new RegExp(req.query.search, 'i') }];
  if (req.query.category && req.query.category !== 'All events') filter.category = req.query.category;
  const events = await Event.find(filter).sort({ date: 1 }).populate('organizer', 'name');
  const counts = await Registration.aggregate([{ $group: { _id: '$event', count: { $sum: 1 } } }]);
  res.json(events.map(event => ({ ...event.toObject(), registered: counts.find(item => item._id.equals(event._id))?.count || 0 })));
}
export async function getEvent(req, res) { const event = await Event.findById(req.params.id).populate('organizer', 'name'); if (!event) return res.status(404).json({ message: 'Event not found.' }); res.json(event); }
export async function createEvent(req, res) { res.status(201).json(await Event.create({ ...req.body, organizer: req.user._id })); }
export async function updateEvent(req, res) { const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }); if (!event) return res.status(404).json({ message: 'Event not found.' }); res.json(event); }
export async function deleteEvent(req, res) { await Event.findByIdAndDelete(req.params.id); await Registration.deleteMany({ event: req.params.id }); res.json({ message: 'Event deleted.' }); }
export async function stats(req, res) { const [totalEvents, totalRegistrations, byCategory] = await Promise.all([Event.countDocuments(), Registration.countDocuments(), Event.aggregate([{ $group: { _id: '$category', count: { $sum: 1 } }, }, { $sort: { count: -1 } }])]); res.json({ totalEvents, totalRegistrations, byCategory }); }
