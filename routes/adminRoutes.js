const express = require('express');
const {
  inviteAdmin,
  verifyInvite,
  acceptInvite,
  getAdmins,
  updateAdmin,
  deleteAdmin,
} = require('../controllers/adminController');
const { protect, ownerOnly } = require('../middleware/auth');

const router = express.Router();

// Invite routes (public for verification and acceptance)
router.get('/verify-invite', verifyInvite);
router.post('/accept-invite', acceptInvite);

// Admin management routes (protected)
router.post('/invite', protect, ownerOnly, inviteAdmin);
router.get('/', protect, ownerOnly, getAdmins);
router.put('/:id', protect, ownerOnly, updateAdmin);
router.put('/:id/role', protect, ownerOnly, updateAdmin); // Handle /role endpoint
router.delete('/:id', protect, ownerOnly, deleteAdmin);

module.exports = router;
