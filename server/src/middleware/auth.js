import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export async function protect(req, res, next) {
  try {
    const token = req.headers.authorization?.startsWith('Bearer ') ? req.headers.authorization.split(' ')[1] : null;
    if (!token) return res.status(401).json({ message: 'Please log in to continue.' });
    req.user = await User.findById(jwt.verify(token, process.env.JWT_SECRET).id).select('-password');
    if (!req.user) return res.status(401).json({ message: 'User no longer exists.' });
    next();
  } catch { res.status(401).json({ message: 'Invalid or expired token.' }); }
}
export const adminOnly = (req, res, next) => req.user?.role === 'admin' ? next() : res.status(403).json({ message: 'Admin access required.' });
