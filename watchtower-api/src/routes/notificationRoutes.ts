import { Router } from "express";
import { protect } from "../middleware/authMiddleware";

import {
  getNotifications,
  markNotificationRead,
  markAllRead,
  deleteNotification,
} from "../controllers/notificationController";

const router = Router();

router.get(
  "/",
  protect,
  getNotifications
);

router.put(
  "/read-all",
  protect,
  markAllRead
);

router.put(
  "/:id/read",
  protect,
  markNotificationRead
);

router.delete(
  "/:id",
  protect,
  deleteNotification
);

export default router;