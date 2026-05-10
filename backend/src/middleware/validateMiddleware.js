/* ============================================
   Validate Middleware — Request body validation
   placeholder for future use with Joi or Zod.
   ============================================ */

/**
 * Generic validation middleware factory.
 * Pass a validation schema and it validates req.body.
 * 
 * Usage (with Joi):
 *   router.post('/trips', validate(tripSchema), createTrip);
 *
 * TODO: Implement with Joi or Zod when needed.
 */
export const validate = (schema) => (req, res, next) => {
  // Placeholder — pass through for now
  // When schema library is added:
  // const { error } = schema.validate(req.body);
  // if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};
