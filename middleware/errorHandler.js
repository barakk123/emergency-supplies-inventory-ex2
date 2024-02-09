const ServerError = require('../errors/ServerError');

const { logger } = require('../logger');

const errorHandler = (error, req, res, next) => {
    const status = error.status || ServerError.status;
    const message = error.message || ServerError.message;

    logger.error(`Error: ${message} at ${req.path}`, { status, errorStack: error.stack });

    res.status(status).json({ error: message });
    next();
};

module.exports = errorHandler;
