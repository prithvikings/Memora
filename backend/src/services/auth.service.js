// src/services/auth.service.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { env } from "../config/env.js";
import ApiError from "../utils/api-error.js";

export class AuthService {
  static async register(email, password) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError(409, "User with this email already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const user = await User.create({ email, password_hash });
    const token = this.generateToken(user._id);

    return {
      user: { id: user._id, email: user.email, plan: user.plan },
      token,
    };
  }

  static async login(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError(401, "Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      throw new ApiError(401, "Invalid email or password");
    }

    const token = this.generateToken(user._id);

    return {
      user: { id: user._id, email: user.email, plan: user.plan },
      token,
    };
  }

  static generateToken(userId) {
    return jwt.sign({ userId }, env.JWT_SECRET, { expiresIn: "7d" });
  }
}
