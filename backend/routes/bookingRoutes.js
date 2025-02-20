
const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/authMiddleware');
const {
    bookGig,
    getUserBookings,
    getProviderBookings,
    cancelBooking,
    updateBookingStatus
} = require('../controllers/bookingController');

// All routes require authentication
router.use(authenticateUser);

// Booking routes
router.post('/', bookGig);
router.get('/user', getUserBookings);
router.get('/provider', getProviderBookings);
router.delete('/:id', cancelBooking);
router.patch('/:id/status', updateBookingStatus);

module.exports = router;