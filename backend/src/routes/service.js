const express = require("express");
const router = express.Router();

const {
  createService,
  getAllServices,
  updateService,
  deleteService,
  getServiceById
} = require("../controllers/serviceController");

const { checkAuth } = require("../middlewares/authMiddleware");


router.post("/", checkAuth, createService);
router.get("/", checkAuth, getAllServices);
router.put("/:id", checkAuth, updateService);
router.delete("/:id", checkAuth, deleteService);
router.get("/:id", checkAuth, getServiceById);


module.exports = router;
