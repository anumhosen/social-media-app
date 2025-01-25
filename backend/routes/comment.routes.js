import express from "express";
import {
  addComment,
  getPostComments,
  updateComment,
  deleteComment,
} from "../controllers/comment.controllers.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

// Add a comment to a post
router.post("/", protectRoute, addComment);

// Get all comments for a specific post
router.get("/:postId", protectRoute, getPostComments);

// Update a specific comment
router.put("/:commentId", protectRoute, updateComment);

// Delete a specific comment
router.delete("/:commentId", protectRoute, deleteComment);

export default router;
