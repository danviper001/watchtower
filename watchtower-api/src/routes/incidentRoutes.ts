import { Router } from "express";
import upload from "../middleware/upload";
import {
  createIncident,
  getAllIncidents,
  getMyIncidents,
  getIncidentById,
  updateIncident,
  deleteIncident,
} from "../controllers/incidentController";

import { protect } from "../middleware/authMiddleware";

const router = Router();

router.post(
  "/",
  protect,
  upload.array("images", 5),
  createIncident
);

router.get("/", protect, getAllIncidents);

router.get("/my", protect, getMyIncidents);

router.get("/:id", protect, getIncidentById);

router.put("/:id", protect, updateIncident);

router.delete("/:id", protect, deleteIncident);


export default router;