import mongoose, { Schema, Document } from "mongoose";

export interface IUser {
  fullName: string;
  email: string;
  password: string;
  role: string;

  avatar?: string;

  phone?: string;

  address?: string;

  bio?: string;
}

const userSchema = new Schema<IUser>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["citizen", "admin","responder"],
      default: "citizen",
    },

    avatar: {
      type: String,
      default: "",
    },

    phone: {
    type: String,
    default: "",
},

address: {
    type: String,
    default: "",
},

bio: {
    type: String,
    default: "",
},
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>("User", userSchema);