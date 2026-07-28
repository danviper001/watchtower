import { Request, Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import Incident from "../models/Incident";
import User from "../models/User";
import Notification from "../models/Notification";
import { getIO } from "../socket";

// Dashboard Statistics
export const getDashboard = async (
  req: Request,
  res: Response
) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalIncidents = await Incident.countDocuments();

    const pending = await Incident.countDocuments({
      status: "Pending",
    });

    const verified = await Incident.countDocuments({
      status: "Verified",
    });

    const resolved = await Incident.countDocuments({
      status: "Resolved",
    });

    const rejected = await Incident.countDocuments({
      status: "Rejected",
    });

    const categoryStats = await Incident.aggregate([
  {
    $group: {
      _id: "$category",
      value: { $sum: 1 },
    },
  },
]);

const incidents = await Incident.find()
  .populate("reportedBy", "fullName email")
  .select(
    `
    title
    description
    category
    severity
    status
    location
    images
    reportedBy
    createdAt
    `
  );

const monthlyStats = await Incident.aggregate([
  {
    $group: {
      _id: {
        year: { $year: "$createdAt" },
        month: { $month: "$createdAt" },
      },
      reports: {
        $sum: 1,
      },
    },
  },
  {
    $sort: {
      "_id.year": 1,
      "_id.month": 1,
    },
  },
]);

res.json({
  totalUsers,
  totalIncidents,
  pending,
  verified,
  resolved,
  rejected,
  categoryStats,
  monthlyStats,
  incidents,
});
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Get All Incidents
export const getAllIncidentsAdmin = async (
  req: Request,
  res: Response
) => {
  try {
    const incidents = await Incident.find()
      .populate("reportedBy", "fullName email")
      .populate("assignedResponder", "fullName email")
      .populate("verifiedBy", "fullName email")
      .sort({ createdAt: -1 });

    res.json({
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

// Verify Incident
export const verifyIncident = async (
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

    incident.status = "Verified";

    incident.verifiedBy = req.user?.id as any;

    incident.timeline.push({
      status: "Verified",
      updatedAt: new Date(),
    });

    await incident.save();

await Notification.create({
  title: "Incident Verified",
  message: `"${incident.title}" has been verified.`,
  type: "verified",
  recipient: incident.reportedBy,
  recipientRole: "citizen",
  incident: incident._id,
});

getIO().emit("notificationCreated", {
  title: "Incident Verified",
  message: incident.title,
  type: "verified",
});

    getIO().emit("incidentVerified", incident);

    res.json({
      message: "Incident verified successfully",
      incident,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Assign Responder
export const assignResponder = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { responderId } = req.body;

    const incident = await Incident.findById(req.params.id);

    if (!incident) {
      return res.status(404).json({
        message: "Incident not found",
      });
    }

    const responder = await User.findById(responderId);

    if (!responder) {
      return res.status(404).json({
        message: "Responder not found",
      });
    }

    if (responder.role !== "responder") {
      return res.status(400).json({
        message: "Selected user is not a responder",
      });
    }

    incident.assignedResponder = responder._id as any;

    incident.status = "Responder Assigned";

    incident.timeline.push({
      status: "Responder Assigned",
      updatedAt: new Date(),
    });

    await incident.save();

    getIO().emit("incidentAssigned", incident);

    await Notification.create({
  title: "New Incident Assigned",
  message: `You have been assigned to "${incident.title}".`,
  type: "assigned",
  recipient: responder._id,
  recipientRole: "responder",
  incident: incident._id,
});

    getIO().emit("newNotification");

    getIO().emit("notificationCreated", {
      title: "Responder Assigned",
      message: `${responder.fullName} assigned to "${incident.title}"`,
    });

    res.json({
      message: "Responder assigned successfully",
      incident,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Resolve Incident
export const resolveIncident = async (
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

// Get All Users
export const getAllUsers = async (
  req: Request,
  res: Response
) => {
  try {
    const role = req.query.role as string;

    const filter = role ? { role } : {};

    const users = await User.find(filter).select("-password");

    res.json(users);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getIncidentMap = async (
  req: Request,
  res: Response
) => {
  try {
    const incidents = await Incident.find()
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