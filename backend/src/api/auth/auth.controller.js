// src/api/auth/auth.controller.js
import { AuthService } from "../../services/auth.service.js";
import { User } from "../../models/user.model.js";

// Helper function to set the cookie
const setTokenCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "none", // CRITICAL: Allows the Chrome Extension to use the cookie
    secure: true, // CRITICAL: Chrome requires this when sameSite is "none"
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days (or whatever your expiry is)
  });
};

export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await AuthService.register(email, password);

    setTokenCookie(res, token);

    res.status(201).json({ success: true, data: { user } }); // Removed token from JSON body
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await AuthService.login(email, password);

    setTokenCookie(res, token);

    res.status(200).json({ success: true, data: { user } }); // Removed token from JSON body
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.cookie("token", "none", {
      expires: new Date(Date.now() + 10 * 1000), // Expire instantly
      httpOnly: true,
    });
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    // req.user.id is already injected by the requireAuth middleware
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: { user } });
  } catch (error) {
    next(error);
  }
};
