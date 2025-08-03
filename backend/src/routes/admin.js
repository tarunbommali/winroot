const express = require("express");
const adminRouter = express.Router();

const { createUser } = require("../controllers/adminController");
const { checkAuth, checkAdmin } = require("../middleware/authMiddleware");

// Route: Admin creates any user role
adminRouter.post("/admin/create-user", checkAuth, checkAdmin, createUser);

module.exports = adminRouter;
