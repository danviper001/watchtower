import mongoose, { Schema, Document } from "mongoose";

export interface IIncident extends Document {
  title: string;
  description: string;
  category: string;
  severity: string;
  status: string;

  location: {
    latitude: number;
    longitude: number;
    address: string;
  };

  images: {
    url: string;
    publicId: string;
  }[];

  reportedBy: mongoose.Types.ObjectId;

  assignedResponder?: mongoose.Types.ObjectId;

  verifiedBy?: mongoose.Types.ObjectId;

  resolvedAt?: Date;

  timeline: {
    status: string;
    updatedAt: Date;
  }[];
}

const incidentSchema = new Schema<IIncident>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: [
        "Crime",
        "Fire",
        "Medical",
        "Road Accident",
        "Flood",
        "Electricity",
        "Building Collapse",
        "Missing Person",
        "Other",
      ],
      required: true,
    },

    severity: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
      default: "Medium",
    },

    status: {
      type: String,
      enum: [
  "Pending",
  "Verified",
  "Responder Assigned",
  "Accepted",
  "On The Way",
  "Arrived",
  "Resolved",
  "Rejected",
],
      default: "Pending",
    },

    location: {
      latitude: {
        type: Number,
        required: true,
      },
      longitude: {
        type: Number,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
    },

    images: [
      {
        url: {
          type: String,
        },
        publicId: {
          type: String,
        },
      },
    ],

    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    assignedResponder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    resolvedAt: {
      type: Date,
      default: null,
    },

    timeline: [
      {
        status: {
          type: String,
          required: true,
        },
        updatedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IIncident>("Incident", incidentSchema);