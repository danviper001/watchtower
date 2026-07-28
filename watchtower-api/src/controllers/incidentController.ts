import { Response } from "express";
import Incident from "../models/Incident";
import { AuthRequest } from "../middleware/authMiddleware";
import { incidentSchema } from "../validations/incidentValidation";
import uploadToCloudinary from "../utils/uploadToCloudinary";
import { getIO } from "../socket";
import Notification from "../models/Notification";

export const createIncident = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const data = incidentSchema.parse(req.body);

    const uploadedImages = [];

const files = Array.isArray(req.files) ? req.files : [];

if (files.length > 0) {
  for (const file of files) {
    const result: any = await uploadToCloudinary(file.buffer);

    uploadedImages.push({
      url: result.secure_url,
      publicId: result.public_id,
    });
  }
}

    const incident = await Incident.create({
      title: data.title,
      description: data.description,
      category: data.category,
      severity: data.severity,
      
      location: {
        latitude: data.latitude,
        longitude: data.longitude,
        address: data.address,
      },

      images: uploadedImages,

      reportedBy: req.user?.id,
    });

   await Notification.create({
    title: "New Incident",
    message: incident.title,
    type: "incident",
    recipientRole: "admin",
    incident: incident._id,
});

getIO().emit("newNotification");

getIO().emit("notificationCreated", {
  title: "New Incident Reported",
  message: incident.title,
  type: "incident",
});

    getIO().emit("incidentCreated", incident);

    res.status(201).json({
      message: "Incident reported successfully",
      incident,
    });

  } catch (error: any) {

  console.error("Create Incident Error:", error);

  if (error.name === "ZodError") {
    return res.status(400).json({
      errors: error.issues,
    });
  }

  res.status(500).json({
    message: "Internal Server Error",
  });
}
};

export const getAllIncidents = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const incidents = await Incident.find()
      .populate("reportedBy", "fullName email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: incidents.length,
      incidents,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getMyIncidents = async (
  req: AuthRequest,
  res: Response
) => {
  try {

    const incidents = await Incident.find({
      reportedBy: req.user?.id,
    }).sort({
      createdAt: -1,
    });

    res.json({
      count: incidents.length,
      incidents,
    });

  } catch (error) {

    res.status(500).json({
      message: "Internal Server Error",
    });

  }
};

export const getIncidentById = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const incident = await Incident.findById(req.params.id)
      .populate("reportedBy", "fullName email");

    if (!incident) {
      return res.status(404).json({
        message: "Incident not found",
      });
    }

    res.status(200).json(incident);

  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const updateIncident = async (
  req: AuthRequest,
  res: Response
) => {
  try {

    const incident = await Incident.findById(req.params.id);

    if (!incident) {
      return res.status(404).json({
        message: "Incident not found",
      });
    }

    // Only the owner can edit
    if (String(incident.reportedBy) !== req.user?.id) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    Object.assign(incident, req.body);

    await incident.save();

    res.json({
      message: "Incident updated successfully",
      incident,
    });

  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const deleteIncident = async (
  req: AuthRequest,
  res: Response
) => {
  try {

    const incident = await Incident.findById(req.params.id);

    if (!incident) {
      return res.status(404).json({
        message: "Incident not found",
      });
    }

    if (String(incident.reportedBy) !== req.user?.id) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    await incident.deleteOne();

    res.json({
      message: "Incident deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};