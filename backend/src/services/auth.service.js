import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { env } from "../config/env.js";

export class AuthService {
  static async register(email, password) {
    // 1. Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error("User with this email already exists");
      error.status = 409; // Conflict
      throw error;
    }

    // 2. Hash password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // 3. Create user
    const user = await User.create({
      email,
      password_hash,
    });

    // 4. Generate Token
    const token = this.generateToken(user._id);

    return {
      user: { id: user._id, email: user.email, plan: user.plan },
      token,
    };
  }

  static async login(email, password) {
    // 1. Find user
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("Invalid email or password");
      error.status = 401; // Unauthorized
      throw error;
    }

    // 2. Verify password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      const error = new Error("Invalid email or password");
      error.status = 401;
      throw error;
    }

    // 3. Generate Token
    const token = this.generateToken(user._id);

    return {
      user: { id: user._id, email: user.email, plan: user.plan },
      token,
    };
  }

  static generateToken(userId) {
    return jwt.sign({ userId }, env.JWT_SECRET, {
      expiresIn: "7d", // Token expires in 7 days
    });
  }
}
