import mongoose, { Schema, Document } from "mongoose";

export interface INotification extends Document {
  title: string;
  message: string;
  type: string;
  isRead: boolean;

  recipient?: mongoose.Types.ObjectId;
  recipientRole?: string;

  incident?: mongoose.Types.ObjectId;
}

const notificationSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: [
        "incident",
        "verified",
        "assigned",
        "accepted",
        "progress",
        "resolved",
        "rejected",
      ],
      default: "incident",
    },

    isRead: {
      type: Boolean,
      default: false,
    },

    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    recipientRole: {
      type: String,
      enum: ["admin", "responder", "citizen"],
      default: null,
    },

    incident: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Incident",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<INotification>(
  "Notification",
  notificationSchema
);