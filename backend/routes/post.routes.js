import express from "express";
import {
  getAllPosts,
  createPost,
  getPostById,
  toggleLikePost,
  deletePost,
} from "../controllers/post.controllers.js";

const router = express.Router();

router.get("/", getAllPosts); // Get all posts
router.post("/", createPost); // Create a post
router.get("/:id", getPostById); // Get a single post
router.patch("/:id/like", toggleLikePost); // Like or unlike a post
router.delete("/:id", deletePost); // Delete a post

export default router;
