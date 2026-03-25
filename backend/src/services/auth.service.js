import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import { User } from "../models/user.model.js";
import { env } from "../config/env.js";
import ApiError from "../utils/api-error.js";

const googleClient = new OAuth2Client(env.GOOGLE_CLIENT_ID);

// Helper function to guarantee we always return the exact same data structure
const formatUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  avatar: user.avatar,
  plan: user.plan,
  auth_provider: user.auth_provider || "local",
  has_archive_pin: !!user.archive_pin,
});

export class AuthService {
  static async register(name, email, password) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError(409, "User with this email already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password_hash,
      auth_provider: "local",
    });

    const token = this.generateToken(user._id);

    return {
      user: formatUser(user), // Uses helper
      token,
    };
  }

  static async login(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError(401, "Invalid email or password");
    }

    // Block local login if they registered via Google and never set a password
    if (user.auth_provider === "google" && !user.password_hash) {
      throw new ApiError(400, "Please sign in with Google.");
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      throw new ApiError(401, "Invalid email or password");
    }

    const token = this.generateToken(user._id);

    return {
      user: formatUser(user), // Uses helper
      token,
    };
  }

  static async googleAuth(idToken) {
    try {
      const ticket = await googleClient.verifyIdToken({
        idToken,
        audience: env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      if (!payload) {
        throw new ApiError(401, "Invalid Google token payload");
      }

      const { email, name, sub: googleId } = payload;
      let user = await User.findOne({ email });

      if (user) {
        if (!user.google_id) {
          user.google_id = googleId;
          await user.save();
        }
      } else {
        user = await User.create({
          name,
          email,
          google_id: googleId,
          auth_provider: "google",
        });
      }

      const token = this.generateToken(user._id);

      return {
        user: formatUser(user), // Uses helper
        token,
      };
    } catch (error) {
      console.error("Google Auth Error:", error);
      throw new ApiError(401, "Google authentication failed");
    }
  }

  static generateToken(userId) {
    return jwt.sign({ userId }, env.JWT_SECRET, { expiresIn: "7d" });
  }
}
