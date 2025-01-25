import Comment from "../models/comment.model.js";
import Post from "../models/post.model.js";

/**
 * Add a comment to a post
 */
export const addComment = async (req, res) => {
  try {
    const { postId, content, image } = req.body;
    const userId = req.user._id; // Authenticated user's ID

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const newComment = new Comment({
      postId,
      userId,
      content,
      image,
    });

    const savedComment = await newComment.save();

    // Add the comment ID to the post's comments array
    post.comments.push(savedComment._id);
    await post.save();

    res.status(201).json({
      message: "Comment added successfully",
      comment: savedComment,
    });
  } catch (error) {
    console.error("Error adding comment:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Get all comments for a specific post
 */
export const getPostComments = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ postId })
      .populate("userId", "fullname profilePicture") // Populate user details
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Update a comment
 */
export const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { content, image } = req.body;
    const userId = req.user._id;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // Check if the user is the owner of the comment
    if (comment.userId.toString() !== userId.toString()) {
      return res.status(403).json({ error: "Unauthorized action" });
    }

    comment.content = content || comment.content;
    comment.image = image || comment.image;

    const updatedComment = await comment.save();

    res.status(200).json({
      message: "Comment updated successfully",
      comment: updatedComment,
    });
  } catch (error) {
    console.error("Error updating comment:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Delete a comment
 */
export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user._id;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // Check if the user is the owner of the comment
    if (comment.userId.toString() !== userId.toString()) {
      return res.status(403).json({ error: "Unauthorized action" });
    }

    // Remove the comment
    await Comment.findByIdAndDelete(commentId);

    // Remove the comment ID from the post's comments array
    await Post.findByIdAndUpdate(comment.postId, {
      $pull: { comments: commentId },
    });

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
