const Gig = require('../models/Gig');

// Create a Gig
const createGig = async (req, res) => {
    console.log("Incoming Request Body:", req.body);
    try {
      const { title, description, price, location } = req.body;
      const gig = new Gig({ title, description, price, location,createdBy: req.user._id });
      await gig.save();
      res.status(201).json(gig);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

// Get All Gigs
const getAllGigs = async (req, res) => {
  try {
    const gigs = await Gig.find().populate('createdBy', 'name email');
    res.status(200).json(gigs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a Gig by ID
const getGigById = async (req, res) => {
  try {
    const { id } = req.params;
    const gig = await Gig.findById(id).populate('createdBy', 'name email');
    if (!gig) {
      return res.status(404).json({ error: 'Gig not found' });
    }
    res.status(200).json(gig);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const updateGig = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Update Gig - ID:', id);
        console.log('Update Gig - Body:', req.body);
        
        // First check if gig exists
        const existingGig = await Gig.findById(id);
        if (!existingGig) {
            return res.status(404).json({ error: 'Gig not found' });
        }

        // Check if user owns the gig
        if (existingGig.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'Not authorized to update this gig' });
        }

        const gig = await Gig.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        console.log('Updated Gig:', gig);
        res.status(200).json(gig);
    } catch (error) {
        console.error('Update Gig Error:', error);
        res.status(500).json({ error: error.message });
    }
};

// Delete a Gig
const deleteGig = async (req, res) => {
  try {
    const { id } = req.params;

    const gig = await Gig.findByIdAndDelete(id);

    if (!gig) {
      return res.status(404).json({ error: 'Gig not found' });
    }

    res.status(200).json({ message: 'Gig deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Gigs for Logged-In User
const getUserGigs = async (req, res) => {
    try {
      const gigs = await Gig.find({ createdBy: req.user._id });
      res.status(200).json(gigs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

module.exports = {
  createGig,
  getAllGigs,
  getGigById,
  updateGig,
  deleteGig,
  getUserGigs,
};
