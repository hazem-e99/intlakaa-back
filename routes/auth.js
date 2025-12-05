const express = require("express");
const router = express.Router();
const {
  login,
  getCurrentAdmin,
  sendInvite,
  verifyInvite,
  acceptInvite,
} = require("../controllers/adminController");
const { protect } = require("../middleware/auth");

// Public routes
router.post("/login", login);
router.post("/send-invite", sendInvite);
router.get("/verify-invite", verifyInvite);
router.post("/accept-invite", acceptInvite);

// Protected routes
router.get("/me", protect, getCurrentAdmin);

module.exports = router;
