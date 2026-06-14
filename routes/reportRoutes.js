const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const { getDashboardStats } = require('../controllers/reportController');

router.get('/dashboard', verifyToken, getDashboardStats);

module.exports = router;