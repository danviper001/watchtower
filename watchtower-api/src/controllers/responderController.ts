import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import Incident from "../models/Incident";
import Notification from "../models/Notification";
import { getIO } from "../socket";

// ===============================
// Get Assigned Incidents
// ===============================
export const getAssignedIncidents = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const incidents = await Incident.find({
      assignedResponder: req.user?.id,
    })
      .populate("reportedBy", "fullName email")
      .sort({ createdAt: -1 });

    res.json(incidents);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// ===============================
// Accept Incident
// ===============================
export const acceptIncident = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const incident = await Incident.findOne({
      _id: req.params.id,
      assignedResponder: req.user?.id,
    });

    if (!incident) {
      return res.status(404).json({
        message: "Incident not found",
      });
    }

    incident.status = "Accepted";

    incident.timeline.push({
      status: "Accepted",
      updatedAt: new Date(),
    });

    await incident.save();

    await Notification.create({
  title: "Incident Accepted",
  message: `A responder has accepted "${incident.title}".`,
  type: "accepted",
  recipient: incident.reportedBy,
  recipientRole: "citizen",
  incident: incident._id,
});

    getIO().emit("notificationCreated", {
      title: "Incident Accepted",
      message: incident.title,
      type: "accepted",
    });

    getIO().emit("incidentAccepted", incident);

    res.json({
      message: "Incident accepted successfully",
      incident,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// ===============================
// Mark On The Way
// ===============================
export const markOnTheWay = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const incident = await Incident.findOne({
      _id: req.params.id,
      assignedResponder: req.user?.id,
    });

    if (!incident) {
      return res.status(404).json({
        message: "Incident not found",
      });
    }

    incident.status = "On The Way";

    incident.timeline.push({
      status: "On The Way",
      updatedAt: new Date(),
    });

    await incident.save();

    await Notification.create({
  title: "Responder On The Way",
  message: `Responder is on the way to "${incident.title}".`,
  type: "progress",
  recipient: incident.reportedBy,
  recipientRole: "citizen",
  incident: incident._id,
});

    getIO().emit("notificationCreated", {
      title: "Responder En Route",
      message: incident.title,
      type: "progress",
    });

    getIO().emit("incidentOnTheWay", incident);

    res.json({
      message: "Responder is on the way",
      incident,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// ===============================
// Mark Arrived
// ===============================
export const markArrived = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const incident = await Incident.findOne({
      _id: req.params.id,
      assignedResponder: req.user?.id,
    });

    if (!incident) {
      return res.status(404).json({
        message: "Incident not found",
      });
    }

    incident.status = "Arrived";

    incident.timeline.push({
      status: "Arrived",
      updatedAt: new Date(),
    });

    await incident.save();

    await Notification.create({
  title: "Responder Arrived",
  message: `Responder has arrived at "${incident.title}".`,
  type: "progress",
  recipient: incident.reportedBy,
  recipientRole: "citizen",
  incident: incident._id,
});

    getIO().emit("notificationCreated", {
      title: "Responder Arrived",
      message: incident.title,
      type: "progress",
    });

    getIO().emit("incidentArrived", incident);

    res.json({
      message: "Responder arrived successfully",
      incident,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// ===============================
// Resolve Assigned Incident
// ===============================
export const resolveAssignedIncident = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const incident = await Incident.findOne({
      _id: req.params.id,
      assignedResponder: req.user?.id,
    });

    if (!incident) {
      return res.status(404).json({
        message: "Incident not found",
      });
    }

    incident.status = "Resolved";
    incident.resolvedAt = new Date();

    incident.timeline.push({
      status: "Resolved",
      updatedAt: new Date(),
    });

    await incident.save();

    await Notification.create({
  title: "Incident Resolved",
  message: `"${incident.title}" has been resolved.`,
  type: "resolved",
  recipient: incident.reportedBy,
  recipientRole: "citizen",
  incident: incident._id,
});

    // getIO().emit("newNotification");

    getIO().emit("notificationCreated", {
      title: "Incident Resolved",
      message: incident.title,
      type: "resolved",
    });

    getIO().emit("incidentResolved", incident);

    res.json({
      message: "Incident resolved successfully",
      incident,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};