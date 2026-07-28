import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import Notification from "../models/Notification";
import { getIO } from "../socket";

// ======================================
// Get Notifications
// ======================================
export const getNotifications = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const notifications = await Notification.find({
      $or: [
        { recipient: req.user?.id },
        { recipientRole: req.user?.role },
      ],
    }).sort({
      createdAt: -1,
    });

    res.json(notifications);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// ======================================
// Mark Notification Read
// ======================================
export const markNotificationRead = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found",
      });
    }

    notification.isRead = true;

    await notification.save();

    getIO().emit("notificationUpdated");

    res.json({
      message: "Notification marked as read",
      notification,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// ======================================
// Mark All Notifications Read
// ======================================
export const markAllRead = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    await Notification.updateMany(
      {
        $or: [
          { recipient: req.user?.id },
          { recipientRole: req.user?.role },
        ],
      },
      {
        isRead: true,
      }
    );

    getIO().emit("notificationUpdated");

    res.json({
      message: "All notifications marked as read",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// ======================================
// Delete Notification
// ======================================
export const deleteNotification = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found",
      });
    }

    await notification.deleteOne();

    getIO().emit("notificationUpdated");

    res.json({
      message: "Notification deleted",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};