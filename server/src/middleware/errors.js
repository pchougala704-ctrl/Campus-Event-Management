export function notFound(req, res) { res.status(404).json({ message: `Route not found: ${req.originalUrl}` }); }
export function errorHandler(error, req, res, next) {
  const status = error.code === 11000 ? 409 : error.name === 'ValidationError' ? 400 : 500;
  res.status(status).json({ message: error.code === 11000 ? 'This record already exists.' : error.message || 'Server error.' });
}
