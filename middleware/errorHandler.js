const { logger } = require('../logger');

const errorHandler = (error, req, res, next) => {
  const status = error.status || 500
  const message = error.message || 'Internal Server Error';

  logger.error(`Error: ${message} at ${req.path}`, { status, errorStack: error.stack });

  res.status(status).json({ error: message });
  next();
};

module.exports = errorHandler;
