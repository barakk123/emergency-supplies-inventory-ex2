const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ServerError = require('../errors/ServerError');
const ConflictError = require('../errors/ConflictError');

const errorHandler = (error, req, res, next) => {
  let status = error.status || 500;
  let message = error.message || 'Something went wrong';

  // Log the error internally
  //console.error(error);

  // Respond to the client
  res.status(status).json({ error: message });
};

module.exports = errorHandler;
