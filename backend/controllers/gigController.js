const Gig = require("../models/Gig");
const { io } = require("../server");

// Create a gig
const createGig = async (req, res) => {
  try {
    const newGig = new Gig(req.body);
    await newGig.save();
    io.emit("newGig", newGig);
    res.status(201).json({ success: true, gig: newGig });
  } catch (error) {
    console.error("Error creating gig:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get all gigs
const getAllGigs = async (req, res) => {
  try {
    const gigs = await Gig.find();
    res.status(200).json({ success: true, gigs });
  } catch (error) {
    console.error("Error fetching gigs:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get a gig by ID
const getGigById = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) {
      return res.status(404).json({ success: false, message: "Gig not found" });
    }
    res.status(200).json({ success: true, gig });
  } catch (error) {
    console.error("Error fetching gig by ID:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update a gig
const updateGig = async (req, res) => {
  try {
    const gig = await Gig.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!gig) {
      return res.status(404).json({ success: false, message: "Gig not found" });
    }
    io.emit("updateGig", gig);
    res.status(200).json({ success: true, gig });
  } catch (error) {
    console.error("Error updating gig:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete a gig
const deleteGig = async (req, res) => {
  try {
    const gig = await Gig.findByIdAndDelete(req.params.id);
    if (!gig) {
      return res.status(404).json({ success: false, message: "Gig not found" });
    }
    io.emit("deleteGig", req.params.id);
    res.status(200).json({ success: true, message: "Gig deleted" });
  } catch (error) {
    console.error("Error deleting gig:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Search gigs (New function added)
const searchGigs = async (req, res) => {
  try {
    const { title, location } = req.query;
    const query = {};
    if (title) query.title = new RegExp(title, "i");
    if (location) query.location = new RegExp(location, "i");

    const gigs = await Gig.find(query);
    res.status(200).json({ success: true, gigs });
  } catch (error) {
    console.error("Error searching gigs:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  createGig,
  getAllGigs,
  getGigById,
  updateGig,
  deleteGig,
  searchGigs,
};
