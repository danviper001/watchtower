import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { loginSchema } from "../validations/authValidation";

import User from "../models/User";
import generateToken from "../utils/generateToken";
import { registerSchema } from "../validations/authValidation";

export const register = async (req: Request, res: Response) => {
  try {
    const validatedData = registerSchema.parse(req.body);

    const { fullName, email, password } = validatedData;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    const token = generateToken(
  String(user._id),
  user.role
);
    res.status(201).json({
      message: "Registration successful",
      token,
      user: {
  id: String(user._id),
  fullName: user.fullName,
  email: user.email,
  role: user.role,
  avatar: user.avatar,
},
    });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return res.status(400).json({
        errors: error.issues,
      });
    }

    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = generateToken(
    String(user._id),
    user.role
    );
    
    res.json({
      message: "Login successful",
      token,
      user: {
  id: String(user._id),
  fullName: user.fullName,
  email: user.email,
  role: user.role,
  avatar: user.avatar,
},
    });

  } catch (error: any) {
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