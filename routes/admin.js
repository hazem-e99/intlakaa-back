const express = require("express");
const router = express.Router();
const {
  inviteAdmin,
  getAdmins,
  deleteAdmin,
  updateAdmin,
} = require("../controllers/adminController");
const { protect, authorize } = require("../middleware/auth");

// All routes are protected and require owner role
router.use(protect);

// Admin management routes
router.post("/invite", authorize("owner"), inviteAdmin);
router.get("/", getAdmins);
router.delete("/:id", authorize("owner"), deleteAdmin);
router.put("/:id", authorize("owner"), updateAdmin);

module.exports = router;
