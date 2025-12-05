const express = require('express');
const {
  createRequest,
  getRequests,
  getRequest,
  deleteRequest,
} = require('../controllers/requestController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Public route
router.post('/', createRequest);

// Protected routes (admin only)
router.get('/', protect, getRequests);
router.get('/:id', protect, getRequest);
router.delete('/:id', protect, deleteRequest);

module.exports = router;
