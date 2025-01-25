import Request from "../models/request.model.js";

/**
 * Create a new friend request
 */
export const sendFriendRequest = async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;

    if (!senderId || !receiverId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if a request already exists between these users
    const existingRequest = await Request.findOne({
      senderId,
      receiverId,
      status: "pending",
    });

    if (existingRequest) {
      return res.status(400).json({ error: "Friend request already sent" });
    }

    const newRequest = new Request({ senderId, receiverId });
    const savedRequest = await newRequest.save();

    res.status(201).json({
      message: "Friend request sent successfully",
      request: savedRequest,
    });
  } catch (error) {
    console.error("Error sending friend request:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Get all friend requests for a user
 */
export const getFriendRequests = async (req, res) => {
  try {
    const { userId } = req.params;

    const requests = await Request.find({ receiverId: userId, status: "pending" })
      .populate("senderId", "fullname profilePicture") // Populates sender details
      .sort({ createdAt: -1 });

    res.status(200).json(requests);
  } catch (error) {
    console.error("Error fetching friend requests:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Accept a friend request
 */
export const acceptFriendRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedRequest = await Request.findByIdAndUpdate(
      id,
      { status: "accepted" },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ error: "Friend request not found" });
    }

    res.status(200).json({
      message: "Friend request accepted",
      request: updatedRequest,
    });

    // You could also add logic to create a "friendship" record here
  } catch (error) {
    console.error("Error accepting friend request:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Decline a friend request
 */
export const declineFriendRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedRequest = await Request.findByIdAndUpdate(
      id,
      { status: "declined" },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ error: "Friend request not found" });
    }

    res.status(200).json({
      message: "Friend request declined",
      request: updatedRequest,
    });
  } catch (error) {
    console.error("Error declining friend request:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Delete a friend request
 */
export const deleteFriendRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRequest = await Request.findByIdAndDelete(id);

    if (!deletedRequest) {
      return res.status(404).json({ error: "Friend request not found" });
    }

    res.status(200).json({
      message: "Friend request deleted successfully",
      request: deletedRequest,
    });
  } catch (error) {
    console.error("Error deleting friend request:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
