const express = require('express');
const { loginAdmin } = require('../controllers/adminController');
const router = express.Router();

// Login Admin
router.post('/login', loginAdmin);

module.exports = router;
