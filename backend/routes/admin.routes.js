const express = require('express');
const { registerAdmin , adminLogin, getMetrics } = require('../controllers/admin.controller');
const router = express.Router();

/* ===== Route to register a new admin ===== */
router.post('/register', registerAdmin);

/* ===== Route to Login admin ===== */
router.post('/login', adminLogin);

/* ===== Routes to fetch metrics===== */
router.get('/metrics', getMetrics);

module.exports = router;
