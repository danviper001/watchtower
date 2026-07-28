import { Router } from "express";

import { protect } from "../middleware/authMiddleware";
import { authorize } from "../middleware/authorize";

import {
  getDashboard,
  getAllIncidentsAdmin,
  verifyIncident,
  resolveIncident,
  getAllUsers,
  getIncidentMap,
  assignResponder,
} from "../controllers/adminController";

const router = Router();

router.get(
  "/dashboard",
  protect,
  authorize("admin"),
  getDashboard
);

router.get(
  "/incidents",
  protect,
  authorize("admin"),
  getAllIncidentsAdmin
);

router.put(
  "/incidents/:id/verify",
  protect,
  authorize("admin"),
  verifyIncident
);

router.put(
  "/incidents/:id/assign",
  protect,
  authorize("admin"),
  assignResponder
);

router.put(
  "/incidents/:id/resolve",
  protect,
  authorize("admin"),
  resolveIncident
);

router.get(
  "/users",
  protect,
  authorize("admin"),
  getAllUsers
);

router.get(
  "/map",
  protect,
  authorize("admin"),
  getIncidentMap
);

export default router;