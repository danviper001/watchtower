import { Router } from "express";
import { protect } from "../middleware/authMiddleware";
import { authorize } from "../middleware/authorize";

import {
  getAssignedIncidents,
  acceptIncident,
  markOnTheWay,
  markArrived,
  resolveAssignedIncident,
} from "../controllers/responderController";

const router = Router();

router.get(
  "/incidents",
  protect,
  authorize("responder"),
  getAssignedIncidents
);

router.put(
  "/incidents/:id/accept",
  protect,
  authorize("responder"),
  acceptIncident
);

router.put(
  "/incidents/:id/on-the-way",
  protect,
  authorize("responder"),
  markOnTheWay
);

router.put(
  "/incidents/:id/arrived",
  protect,
  authorize("responder"),
  markArrived
);

router.put(
  "/incidents/:id/resolve",
  protect,
  authorize("responder"),
  resolveAssignedIncident
);

export default router;