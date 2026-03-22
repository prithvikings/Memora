const ApiError = require('../utils/api-error');

const validate = (schema) => (req, res, next) => {
  try {
    const validated = schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    req.body = validated.body;
    req.query = validated.query;
    req.params = validated.params;
    next();
  } catch (error) {
    next(new ApiError(400, 'Validation failed', true, error.stack));
  }
};

module.exports = validate;
