

const express = require("express");
const router = express.Router();
const {
  createGig,
  getAllGigs,
  getGigById,
  updateGig,
  deleteGig,
  searchGigs,
} = require("../controllers/gigController");

// Search route (placed before :id to avoid conflicts)
router.get("/search", searchGigs);

// CRUD routes
router.post("/", createGig);
router.get("/", getAllGigs);
router.get("/:id", getGigById);
router.put("/:id", updateGig);
router.delete("/:id", deleteGig);

module.exports = router;
