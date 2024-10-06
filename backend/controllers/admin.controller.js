const Log = require('../models/log.model');

const getMetrics = async (req, res) => {
  try {
    const totalRequests = await Log.count();
    const successfulRequests = await Log.count({ where: { success: true } });
    const failedRequests = totalRequests - successfulRequests;

    res.status(200).json({
      totalRequests,
      successfulRequests,
      failedRequests,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve metrics', error });
  }
};

module.exports = { getMetrics };
