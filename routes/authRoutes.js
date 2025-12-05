const express = require('express');
const { login, getCurrentAdmin, sendInvite, acceptInvite, verifyInvite } = require('../controllers/adminController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Auth routes
router.post('/login', login);
router.get('/me', protect, getCurrentAdmin);
router.post('/send-invite', sendInvite);
router.get('/verify-invite', verifyInvite);
router.post('/accept-invite', acceptInvite);

module.exports = router;
