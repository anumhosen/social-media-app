import express from "express";
import {
  sendFriendRequest,
  getFriendRequests,
  acceptFriendRequest,
  declineFriendRequest,
  deleteFriendRequest,
} from "../controllers/request.controllers.js";

import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

// Send a friend request
router.post("/", protectRoute, sendFriendRequest);

// Get all friend requests for a specific user
router.get("/:userId", protectRoute, getFriendRequests);

// Accept a friend request
router.put("/:id/accept", protectRoute, acceptFriendRequest);

// Decline a friend request
router.put("/:id/decline", protectRoute, declineFriendRequest);

// Delete a friend request
router.delete("/:id", protectRoute, deleteFriendRequest);

export default router;
