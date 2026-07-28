import { Response } from "express";
import User from "../models/User";
import Incident from "../models/Incident";
import { AuthRequest } from "../middleware/authMiddleware";
import cloudinary from "../config/cloudinary";
import { Readable } from "stream";
import bcrypt from "bcrypt";

export const getProfile = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const user = await User.findById(req.user?.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const updateProfile = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const user = await User.findById(req.user?.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.fullName =
      req.body.fullName || user.fullName;

    user.email =
      req.body.email || user.email;

    user.phone =
      req.body.phone || user.phone;

    user.address =
      req.body.address || user.address;

    user.bio =
      req.body.bio || user.bio;

    await user.save();

    res.json(user);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getUserStats = async (
  req: AuthRequest,
  res: Response
) => {
  try {

    const totalReports = await Incident.countDocuments({
      reportedBy: req.user?.id,
    });

    const resolvedReports = await Incident.countDocuments({
      reportedBy: req.user?.id,
      status: "Resolved",
    });

    const pendingReports = await Incident.countDocuments({
      reportedBy: req.user?.id,
      status: "Pending",
    });

    res.json({
      totalReports,
      resolvedReports,
      pendingReports,
    });

  } catch (error) {

    res.status(500).json({
      message: "Internal Server Error",
    });

  }
};

export const changePassword = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const user = await User.findById(req.user?.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Current password is incorrect",
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);

    await user.save();

    res.json({
      message: "Password changed successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const uploadAvatar = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No image uploaded",
      });
    }

    const file = req.file;

    const streamUpload = () =>
      new Promise<any>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "watchtower/avatars",
          },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );

        Readable.from(file.buffer).pipe(stream);
      });

    const result = await streamUpload();

    const user = await User.findByIdAndUpdate(
      req.user?.id,
      {
        avatar: result.secure_url,
      },
      {
        new: true,
      }
    ).select("-password");

    res.json(user);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};