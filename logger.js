const winston = require('winston');

const logger = winston.createLogger({
    level: 'info', // Default logging level
    format: winston.format.combine(
      winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      winston.format.errors({ stack: true }), // Log the full stack
      winston.format.splat(),
      winston.format.json()
    ),
    transports: [
      // Write all logs with level `info` and below to `combined.log` 
      // Write all logs with level `error` and below to `error.log`
      new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
      new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
  });

exports.logger = logger;
  