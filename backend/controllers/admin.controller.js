const Log = require('../models/log.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const Admin = require('../models/admin.model');
const secretKey = 'your-secret-key';

/* ===== Register Admin ===== */
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

/* ===== Login Admin ===== */
const adminLogin = async (req, res) => {
  const { employeeNumber, password } = req.body;

  try {
    // Find the admin by employee number
    const admin = await Admin.findOne({ where: { employeeNumber } });

    if (!admin) {
      return res.status(401).json({ message: 'Invalid employee number or password' });
    }

    // Check the password
    const passwordIsValid = bcrypt.compareSync(password, admin.password);
    if (!passwordIsValid) {
      return res.status(401).json({ message: 'Invalid employee number or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ employeeNumber: admin.employeeNumber }, secretKey, { expiresIn: '1h' });

    res.status(200).json({
      message: 'Login successful',
      token, // Send the token to the frontend
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Failed to log in', error });
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

module.exports = { registerAdmin, adminLogin, getMetrics };
