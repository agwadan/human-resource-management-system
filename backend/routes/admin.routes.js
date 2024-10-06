const express = require('express');
const { getMetrics } = require('../controllers/admin.controller');  
const router = express.Router();

/* ==== Routes to fetch metrics===== */
router.get('/metrics', getMetrics);

module.exports = router;
