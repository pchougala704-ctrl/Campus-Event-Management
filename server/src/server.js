import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import registrationRoutes from './routes/registrationRoutes.js';
import { errorHandler, notFound } from './middleware/errors.js';

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json());
app.get('/api/health', (req, res) => res.json({ status: 'ok', service: 'campus-events-api' }));
app.use('/api/auth', authRoutes); app.use('/api/events', eventRoutes); app.use('/api/registrations', registrationRoutes);
app.use(notFound); app.use(errorHandler);
const port = process.env.PORT || 5000;
connectDB().then(() => app.listen(port, () => console.log(`API running on http://localhost:${port}`))).catch(error => { console.error('Database connection failed:', error.message); process.exit(1); });
