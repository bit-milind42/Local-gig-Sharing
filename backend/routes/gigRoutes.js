


// const express = require("express");
// const router = express.Router();
// const {
//   createGig,
//   getAllGigs,
//   getGigById,
//   updateGig,
//   deleteGig,
// } = require("../controllers/gigController");
// const { verifyToken, authorizeRoles } = require("../controllers/authController");

// // Public Routes
// router.get("/", getAllGigs);      // Fetch all gigs
// router.get("/:id", getGigById);   // Fetch gig by ID

// // Admin-Only Routes
// router.post("/", verifyToken, authorizeRoles("admin"), createGig);   // ✅ FIXED
// router.put("/:id", verifyToken, authorizeRoles("admin"), updateGig); // ✅ FIXED
// router.delete("/:id", verifyToken, authorizeRoles("admin"), deleteGig); // ✅ FIXED

// module.exports = router;








// const express = require("express");
// const router = express.Router();
// const {
//   createGig,
//   getAllGigs,
//   getGigById,
//   updateGig,
//   deleteGig,
//   getUserGigs,
// } = require("../controllers/gigController");
// const { verifyToken, authorizeRoles } = require("../controllers/authController");

// //  Public Routes (No Authentication Needed)
// router.get("/", getAllGigs);      // Fetch all gigs
// router.get("/:id", getGigById);   // Fetch gig by ID
// // User Dashboard - Get User's Gigs
// router.get("/my-gigs", verifyToken, getUserGigs);
// router.get("/:id", getGigById); // Fetch gig by ID  

// //  Authenticated Users (Any logged-in user can create a gig)
// router.post("/", verifyToken, createGig);

// //  Admin-Only Routes (Restrict updating and deleting gigs to admin users)
// router.put("/:id", verifyToken, authorizeRoles("admin"), updateGig);
// router.delete("/:id", verifyToken, authorizeRoles("admin"), deleteGig);

// module.exports = router;



const express = require("express");
const router = express.Router();
const {
  createGig,
  getAllGigs,
  getGigById,
  updateGig,
  deleteGig,
  getUserGigs,
} = require("../controllers/gigController");
const { verifyToken, authorizeRoles } = require("../controllers/authController");

//  Public Routes (No Authentication Needed)
router.get("/", getAllGigs);      // Fetch all gigs

// User Dashboard - Get User's Gigs (Ensure this is before "/:id")
router.get("/my-gigs", verifyToken, getUserGigs); // ✅ Fixed route ordering

router.get("/:id", getGigById);   // Fetch gig by ID  

//  Authenticated Users (Any logged-in user can create a gig)
router.post("/", verifyToken, createGig);

//  Admin-Only Routes (Restrict updating and deleting gigs to admin users)
router.put("/:id", verifyToken, authorizeRoles("admin"), updateGig);
router.delete("/:id", verifyToken, authorizeRoles("admin"), deleteGig);

module.exports = router;
