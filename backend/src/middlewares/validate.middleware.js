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

    // req.body is set by body-parser, so it can usually be reassigned
    if (validated.body) req.body = validated.body;

    // In Express 5, req.query and req.params are getters.
    // We must mutate the existing object instead of reassigning it.
    if (validated.query) Object.assign(req.query, validated.query);
    if (validated.params) Object.assign(req.params, validated.params);

    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessage = error.errors
        .map((e) => {
          const field = e.path[e.path.length - 1] || "input";
          return `${field}: ${e.message}`;
        })
        .join(", ");

      return next(new ApiError(400, errorMessage, true));
    }

    next(error);
  }
};

export default validate;
