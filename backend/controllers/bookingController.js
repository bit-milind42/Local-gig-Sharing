
const Booking = require('../models/Booking');
const Gig = require('../models/Gig');

// Book a Gig
const bookGig = async (req, res) => {
    try {
        const { gigId } = req.body;
        
        // Check if the gig exists
        const gig = await Gig.findById(gigId);
        if (!gig) {
            return res.status(404).json({ error: 'Gig not found' });
        }

        // Prevent users from booking their own gig
        if (gig.createdBy.toString() === req.user._id.toString()) {
            return res.status(403).json({ error: "You can't book your own gig" });
        }

        // Check if the user already booked the gig
        const existingBooking = await Booking.findOne({ 
            gig: gigId, 
            user: req.user._id,
            status: { $ne: 'rejected' } // Ignore rejected bookings
        });
        
        if (existingBooking) {
            return res.status(400).json({ error: 'You have already booked this gig' });
        }

        // Create a new booking
        const booking = new Booking({
            gig: gigId,
            user: req.user._id,
            status: 'pending'
        });
        await booking.save();

        // Populate the gig details in the response
        const populatedBooking = await Booking.findById(booking._id)
            .populate('gig')
            .populate('user', 'name email');

        res.status(201).json({
            message: 'Gig booked successfully',
            booking: populatedBooking
        });
    } catch (error) {
        console.error('Book Gig Error:', error);
        res.status(500).json({ error: error.message });
    }
};

// Get User Bookings
const getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user._id })
            .populate('gig')
            .populate('user', 'name email')
            .sort({ createdAt: -1 });

        res.status(200).json(bookings);
    } catch (error) {
        console.error('Get Bookings Error:', error);
        res.status(500).json({ error: error.message });
    }
};

// Get Provider's Received Bookings
const getProviderBookings = async (req, res) => {
    try {
        const userGigs = await Gig.find({ createdBy: req.user._id });
        const gigIds = userGigs.map(gig => gig._id);
        
        const bookings = await Booking.find({ gig: { $in: gigIds } })
            .populate('gig')
            .populate('user', 'name email')
            .sort({ createdAt: -1 });

        res.status(200).json(bookings);
    } catch (error) {
        console.error('Get Provider Bookings Error:', error);
        res.status(500).json({ error: error.message });
    }
};

// Cancel a Booking
const cancelBooking = async (req, res) => {
    try {
        const { id } = req.params;

        const booking = await Booking.findById(id).populate('gig');
        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        // Ensure the logged-in user owns the booking
        if (booking.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'Not authorized to cancel this booking' });
        }

        // Only allow cancellation of pending bookings
        if (booking.status !== 'pending') {
            return res.status(400).json({ error: `Cannot cancel a ${booking.status} booking` });
        }

        await booking.deleteOne();
        res.status(200).json({ message: 'Booking cancelled successfully' });
    } catch (error) {
        console.error('Cancel Booking Error:', error);
        res.status(500).json({ error: error.message });
    }
};

// Update Booking Status
const updateBookingStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!['accepted', 'rejected'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status value' });
        }

        const booking = await Booking.findById(id).populate('gig');
        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        if (booking.status !== 'pending') {
            return res.status(400).json({ error: `Cannot update a ${booking.status} booking` });
        }

        // Check if the logged-in user is the gig owner
        if (booking.gig.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'Not authorized to update this booking' });
        }

        booking.status = status;
        await booking.save();

        const updatedBooking = await Booking.findById(id)
            .populate('gig')
            .populate('user', 'name email');

        res.status(200).json({
            message: `Booking ${status} successfully`,
            booking: updatedBooking
        });
    } catch (error) {
        console.error('Update Booking Status Error:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    bookGig,
    getUserBookings,
    getProviderBookings,
    cancelBooking,
    updateBookingStatus
};