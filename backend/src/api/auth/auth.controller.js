// backend/src/api/auth/auth.controller.js
import { AuthService } from "../../services/auth.service.js";
import { User } from "../../models/user.model.js";
import bcrypt from "bcrypt";

const setTokenCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    // Passed name to the service
    const { user, token } = await AuthService.register(name, email, password);

    setTokenCookie(res, token);

    res.status(201).json({ success: true, data: { user } });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await AuthService.login(email, password);

    setTokenCookie(res, token);

    res.status(200).json({ success: true, data: { user } });
  } catch (error) {
    next(error);
  }
};

export const googleLogin = async (req, res, next) => {
  try {
    const { idToken } = req.body;
    const { user, token } = await AuthService.googleAuth(idToken);

    setTokenCookie(res, token);

    res.status(200).json({ success: true, data: { user } });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.cookie("token", "none", {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    });
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password_hash");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Explicitly format the user object to match what the frontend expects
    const formattedUser = {
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      plan: user.plan,
      auth_provider: user.auth_provider,
      has_archive_pin: !!user.archive_pin, // Converts the hash string/null to a clean boolean
    };

    res.status(200).json({ success: true, data: { user: formattedUser } });
  } catch (error) {
    next(error);
  }
};
export const updateProfile = async (req, res, next) => {
  try {
    const { name, avatar } = req.body;

    // Only update fields that were actually provided
    const updateData = {};
    if (name) updateData.name = name;
    if (avatar !== undefined) updateData.avatar = avatar;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updateData },
      { new: true, runValidators: true },
    ).select("-password_hash");

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

export const updatePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // We need the password_hash here, so we don't exclude it yet
    const user = await User.findById(req.user.id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (user.auth_provider === "google") {
      return res.status(400).json({
        success: false,
        message:
          "Your account is linked to Google. You cannot set a local password.",
      });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password_hash);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect current password" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password_hash = await bcrypt.hash(newPassword, salt);
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    next(error);
  }
};

export const setupArchivePin = async (req, res, next) => {
  try {
    const { pin } = req.body;
    const user = await User.findById(req.user.id);

    if (user.archive_pin) {
      return res.status(400).json({
        success: false,
        message: "PIN is already set. Use the settings page to change it.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    user.archive_pin = await bcrypt.hash(pin, salt);
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Archive PIN set successfully" });
  } catch (error) {
    next(error);
  }
};

export const verifyArchivePin = async (req, res, next) => {
  try {
    const { pin } = req.body;
    const user = await User.findById(req.user.id);

    if (!user.archive_pin) {
      return res
        .status(400)
        .json({ success: false, message: "No PIN setup yet" });
    }

    const isMatch = await bcrypt.compare(pin, user.archive_pin);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Incorrect PIN" });
    }

    // Return a short-lived success token or just a 200 OK for the frontend to unlock state
    res.status(200).json({ success: true, message: "PIN verified" });
  } catch (error) {
    next(error);
  }
};

// Add this to the bottom
export const updateArchivePin = async (req, res, next) => {
  try {
    const { currentPin, newPin } = req.body;
    const user = await User.findById(req.user.id);

    if (!user.archive_pin) {
      return res
        .status(400)
        .json({ success: false, message: "No Archive PIN is set." });
    }

    const isMatch = await bcrypt.compare(currentPin, user.archive_pin);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect current PIN." });
    }

    const salt = await bcrypt.genSalt(10);
    user.archive_pin = await bcrypt.hash(newPin, salt);
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Archive PIN updated successfully." });
  } catch (error) {
    next(error);
  }
};
