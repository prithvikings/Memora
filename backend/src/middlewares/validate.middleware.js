// src/middlewares/validate.middleware.js
import { ZodError } from "zod";
import ApiError from "../utils/api-error.js";

const validate = (schema) => (req, res, next) => {
  try {
    const validated = schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    if (validated.body) req.body = validated.body;
    if (validated.query) req.query = validated.query;
    if (validated.params) req.params = validated.params;

    next();
  } catch (error) {
    // Check if it's a validation error from Zod
    if (error instanceof ZodError) {
      // Grab the last part of the path (e.g., 'email' or 'password') and the message
      const errorMessage = error.errors
        .map((e) => {
          const field = e.path[e.path.length - 1] || "input";
          return `${field}: ${e.message}`;
        })
        .join(", ");

      return next(new ApiError(400, errorMessage, true));
    }

    // If it's a different kind of error, pass it to the global handler
    next(error);
  }
};

export default validate;
