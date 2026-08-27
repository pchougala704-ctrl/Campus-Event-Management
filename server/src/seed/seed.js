import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { connectDB } from '../config/db.js';
import User from '../models/User.js';
import Event from '../models/Event.js';
import Registration from '../models/Registration.js';

await connectDB();
await Promise.all([User.deleteMany(), Event.deleteMany(), Registration.deleteMany()]);
const admin = await User.create({ name: 'Campus Admin', email: 'admin@campus.test', password: await bcrypt.hash('admin123', 10), role: 'admin' });
await Event.insertMany([
  { title: 'Design Thinking Sprint', description: 'A hands-on workshop for turning everyday problems into thoughtful solutions.', category: 'Workshop', date: new Date('2026-09-12T10:00:00'), location: 'Innovation Lab', capacity: 40, organizer: admin._id },
  { title: 'Inter-college Hackathon', description: 'Build, learn and ship a useful idea with a team in one energetic weekend.', category: 'Technology', date: new Date('2026-09-20T09:00:00'), location: 'Main Auditorium', capacity: 100, organizer: admin._id },
  { title: 'Open Mic Evening', description: 'An easygoing evening for music, poetry and stories from our campus community.', category: 'Cultural', date: new Date('2026-09-26T17:30:00'), location: 'Amphitheatre', capacity: 80, organizer: admin._id }
]);
console.log('Seed complete. Admin: admin@campus.test / admin123'); process.exit();
