import { AuthService } from "../../services/auth.service.js";
import { registerSchema, loginSchema } from "./auth.validation.js";

export const register = async (req, res, next) => {
  try {
    // Validate request body
    const validatedData = registerSchema.parse({ body: req.body });
    const { email, password } = validatedData.body;

    // Call business logic
    const result = await AuthService.register(email, password);

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    // If it's a Zod validation error, format it
    if (error.name === "ZodError") {
      return res.status(400).json({ success: false, errors: error.errors });
    }
    next(error); // Pass to global error handler in app.js
  }
};

export const login = async (req, res, next) => {
  try {
    const validatedData = loginSchema.parse({ body: req.body });
    const { email, password } = validatedData.body;

    const result = await AuthService.login(email, password);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({ success: false, errors: error.errors });
    }
    next(error);
  }
};
