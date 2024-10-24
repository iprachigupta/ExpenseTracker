const Joi = require("joi");
const User = require("../models/user");

const passwordSchema = Joi.object({
  currentPassword: Joi.string().required().messages({
    "string.empty": "Current password is required",
  }),
  newPassword: Joi.string().min(6).required().messages({
    "string.empty": "New password is required",
    "string.min": "New password must be at least 6 characters long",
  }),
});

const validatePassword = (passwordSchema) => {
  return (req, res, next) => {
    const { error } = passwordSchema.validate(req.body);
    if (error) {
      console.error("Validation Error:", error.details);

      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }
    next();
  };
};

const changePass = validatePassword(passwordSchema);

module.exports = { changePass };
