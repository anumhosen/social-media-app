import express from "express";
import {
  createNotification,
  getUserNotifications,
  markNotificationAsSeen,
  deleteNotification,
} from "../controllers/notification.controllers.js";

import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

// Create a new notification
router.post("/", protectRoute, createNotification);

// Get all notifications for a specific user
router.get("/:userId", protectRoute, getUserNotifications);

// Mark a specific notification as seen
router.put("/:id/seen", protectRoute, markNotificationAsSeen);

// Delete a specific notification
router.delete("/:id", protectRoute, deleteNotification);

export default router;
