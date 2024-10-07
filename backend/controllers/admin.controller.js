const Log = require('../models/log.model');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const Admin = require('../models/admin.model');

const registerAdmin = async (req, res) => {
  try {
    const { employeeNumber } = req.body;

    // Check if the admin already exists using the employeeNumber
    const existingAdmin = await Admin.findOne({ where: { employeeNumber } });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin with this employee number already exists' });
    }

    // Generate a random password
    const generatedPassword = crypto.randomBytes(4).toString('hex'); // Generates an 8-character password

    // Hash the password before saving it to the database
    const hashedPassword = bcrypt.hashSync(generatedPassword, 10);

    // Create the new admin
    const newAdmin = await Admin.create({
      employeeNumber,
      password: hashedPassword,
    });

    // Return the generated password in the response
    res.status(201).json({
      message: 'Admin registered successfully',
      admin: {
        id: newAdmin.id,
        employeeNumber: newAdmin.employeeNumber,
        generatedPassword, // Send the generated password back to the client
      },
    });
  } catch (error) {
    console.error('Error registering admin:', error);
    res.status(500).json({ message: 'Failed to register admin', error });
  }
};
/* ===== Getting Metrics for api performance ===== */
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

module.exports = { registerAdmin, getMetrics };
