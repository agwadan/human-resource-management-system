const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Staff = sequelize.define('Staff', {
    surname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    otherNames: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dateOfBirth: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    idPhoto: {
        type: DataTypes.TEXT,  //------Base64 encoded image
        allowNull: true,
    },
    employeeNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    authCode: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: false,
});

module.exports = Staff;
