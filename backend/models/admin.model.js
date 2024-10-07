const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config'); 

const Admin = sequelize.define('Admin', {
  employeeNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, 
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Admin;
