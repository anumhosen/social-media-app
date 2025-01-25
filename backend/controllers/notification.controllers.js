import Notification from "../models/notification.model.js";

/**
 * Create a new notification
 */
export const createNotification = async (req, res) => {
  const { userId, creatorId, postId, commentId, type } = req.body;

  try {
    if (!userId || !creatorId || !type) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newNotification = new Notification({
      userId,
      creatorId,
      postId,
      commentId,
      type,
    });

    const savedNotification = await newNotification.save();
    res.status(201).json({
      message: "Notification created successfully",
      notification: savedNotification,
    });
  } catch (error) {
    console.error("Error creating notification:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Get notifications for a specific user
 */
export const getUserNotifications = async (req, res) => {
  const { userId } = req.params;

  try {
    const notifications = await Notification.find({ userId })
      .populate("creatorId", "fullname profilePicture") // Populates creator details
      .populate("postId", "content image") // Populates post details
      .populate("commentId", "content") // Populates comment details
      .sort({ createdAt: -1 });

    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Mark a notification as seen
 */
export const markNotificationAsSeen = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedNotification = await Notification.findByIdAndUpdate(
      id,
      { seen: true },
      { new: true }
    );

    if (!updatedNotification) {
      return res.status(404).json({ error: "Notification not found" });
    }

    res.status(200).json({
      message: "Notification marked as seen",
      notification: updatedNotification,
    });
  } catch (error) {
    console.error("Error marking notification as seen:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Delete a notification
 */
export const deleteNotification = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedNotification = await Notification.findByIdAndDelete(id);

    if (!deletedNotification) {
      return res.status(404).json({ error: "Notification not found" });
    }

    res.status(200).json({
      message: "Notification deleted successfully",
      notification: deletedNotification,
    });
  } catch (error) {
    console.error("Error deleting notification:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
