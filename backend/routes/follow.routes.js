import express from "express";
import {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
} from "../controllers/follow.controllers.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

// Follow a user
router.post("/:userIdToFollow/follow", protectRoute, followUser);

// Unfollow a user
router.post("/:userIdToUnfollow/unfollow", protectRoute, unfollowUser);

// Get a user's followers
router.get("/:userId/followers", protectRoute, getFollowers);

// Get a user's following list
router.get("/:userId/following", protectRoute, getFollowing);

export default router;
