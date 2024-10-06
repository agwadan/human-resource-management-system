const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Log = sequelize.define('Log', {
  method: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  statusCode: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  success: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Log;
