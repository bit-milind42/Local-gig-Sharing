const express = require("express");
const router = express.Router();
const Gig = require("../models/Gig");
const {
  createGig,
  getAllGigs,
  getGigById,
  updateGig,
  deleteGig,
  searchGigs,
  updateGigStatus,
} = require("../controllers/gigController");

// Search route (placed before :id to avoid conflicts)
router.get("/search", searchGigs);

router.patch("/:id/status", updateGigStatus);


// CRUD routes
router.post("/", createGig);
router.get("/", getAllGigs);
router.get("/:id", getGigById);
router.put("/:id", updateGig);
router.delete("/:id", deleteGig);
ter.patch("/:id/status", updateGigStatus);

// Ensure this GET request always returns an array
router.get("/", async (req, res) => {
  try {
    const gigs = await Gig.find().populate("createdBy", "name email");

    if (!Array.isArray(gigs)) {
      return res.status(500).json({ error: "Unexpected server response format" });
    }

    res.json(gigs); // Always return an array
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post("/", async (req, res) => {
  try {
    console.log("Received gig creation request:", req.body); // Debugging log

    const { title, description, price, location, createdBy, gigType, status } = req.body;

    // Validate all fields
    if (!title || !description || !price || !location || !createdBy || !gigType || !status) {
      console.error("Validation failed: Missing required fields");
      return res.status(400).json({ error: "All fields are required" });
    }

    const newGig = new Gig({ title, description, price, location, createdBy, gigType, status });

    await newGig.save();

    console.log("Gig created successfully:", newGig);
    res.status(201).json(newGig);
  } catch (error) {
    console.error("Error creating gig:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

module.exports = router;
