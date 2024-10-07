const express = require('express');
const { getMetrics } = require('../controllers/admin.controller');  
const { registerAdmin } = require('../controllers/admin.controller');
const router = express.Router();

/* ===== Route to register a new admin ===== */
router.post('/register', registerAdmin);

/* ===== Routes to fetch metrics===== */
router.get('/metrics', getMetrics);

module.exports = router;
