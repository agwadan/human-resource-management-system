const Log = require('../models/log.model'); 

const logRequest = async (req, res, next) => {
  res.on('finish', async () => {
    try {
      const log = {
        method: req.method,
        url: req.originalUrl,
        statusCode: res.statusCode,
        success: res.statusCode >= 200 && res.statusCode < 300,
        timestamp: new Date(),
      };

      await Log.create(log); 
    } catch (error) {
      console.error('Failed to log request:', error);
    }
  });

  next();
};

module.exports = logRequest;
