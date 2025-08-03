const express = require("express");
const router = express.Router();

const {
  getMyProfile,
  updateMyProfile,
  changeMyPassword,
} = require("../controllers/profileController");

const { checkAuth } = require("../middlewares/authMiddleware"); // centralized middleware

// GET /api/profile/me - Get own profile
router.get("/me", checkAuth, getMyProfile);

// PUT /api/profile/me - Update profile details
router.put("/me", checkAuth, updateMyProfile);

// PATCH /api/profile/me/password - Change password
router.patch("/me/password", checkAuth, changeMyPassword);

module.exports = router;
