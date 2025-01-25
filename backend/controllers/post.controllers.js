import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import Comment from "../models/comment.model.js";

/**
 * Get all posts
 */
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("authorId", "username email")
      .populate("likes", "userId")
      .populate({
        path: "comments",
        populate: {
          path: "authorId",
          select: "username",
        },
      })
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error });
  }
};

/**
 * Create a new post
 */
export const createPost = async (req, res) => {
  const { authorId, content, image } = req.body;

  try {
    const newPost = new Post({ authorId, content, image });
    const savedPost = await newPost.save();

    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ message: "Error creating post", error });
  }
};

/**
 * Get a single post by ID
 */
export const getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id)
      .populate("authorId", "username email")
      .populate("likes", "userId")
      .populate({
        path: "comments",
        populate: {
          path: "authorId",
          select: "username",
        },
      });

    if (!post) return res.status(404).json({ message: "Post not found" });

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error fetching post", error });
  }
};

/**
 * Like or unlike a post
 */
export const toggleLikePost = async (req, res) => {
  const { id } = req.params; // Post ID
  const { userId } = req.body;

  try {
    const post = await Post.findById(id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.likes.includes(userId)) {
      // Unlike the post
      post.likes = post.likes.filter((like) => like.toString() !== userId);
    } else {
      // Like the post
      post.likes.push(userId);
    }

    await post.save();
    res.status(200).json({ message: "Like status updated", post });
  } catch (error) {
    res.status(500).json({ message: "Error toggling like", error });
  }
};

/**
 * Delete a post
 */
export const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    // Optional: Clean up associated comments, likes, etc.
    await Comment.deleteMany({ _id: { $in: post.comments } });

    await Post.findByIdAndDelete(id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting post", error });
  }
};
