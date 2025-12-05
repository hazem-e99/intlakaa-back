const express = require("express");
const router = express.Router();
const {
  createRequest,
  getRequests,
  getRequest,
  deleteRequest,
} = require("../controllers/requestController");
const { protect } = require("../middleware/auth");

// Public route - create request
router.post("/", createRequest);

// Protected routes - admin only
router.get("/", protect, getRequests);
router.get("/:id", protect, getRequest);
router.delete("/:id", protect, deleteRequest);

module.exports = router;
