const joi = require("joi");

const validateRequest = (schema) => {
  return (req, res, next) => {
    const {  error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message , error: error.details[0].message });
    }
    next();
  };
};


const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


//signup schema
const signupSchema = joi.object({
  name: joi.string().min(3).max(50).required().messages({
    "string.empty": "Name is required.",
    "string.min": "Name should have at least 3 characters.",
    "string.max": "Name should have at most 50 characters.",
  }),
  email: joi.string().email(emailPattern).required().messages({
    "string.email": "Please enter a valid email address.",
    "string.empty": "Email is required.",
  }),
  password: joi.string().pattern(passwordPattern).required().messages({
    "string.pattern.base":
      "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character.",
    "string.empty": "Password is required.",
  }),
  confirmPassword: joi.string().valid(joi.ref("password")).required().messages({
    "any.only": "Passwords must match.",
    "string.empty": "Confirm password is required.",
  }),
  role: joi.string().valid("user", "admin").required().messages({
    "string.empty": "Role is required.",
    "any.only": "Role must be either 'user' or 'admin'.",
  }),

  secretKey: joi.string().when("role", {
    is: "admin",
    then: joi.required().messages({
      "string.empty": "Secret key is required for admin.",
    }),
    otherwise: joi.forbidden(), 
  }),
});

//login schema
const loginSchema = joi.object({
  email: joi.string().email(emailPattern).required().messages({
    "string.email": "Please enter a valid email address.",
    "string.empty": "Email is required.",
  }),
  password: joi.string().pattern(passwordPattern).required().messages({
    "string.pattern.base":
      "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character.",
    "string.empty": "Password is required.",
  }),
});

const signupValidation = validateRequest(signupSchema);
const loginValidation = validateRequest(loginSchema);

module.exports = { signupValidation, loginValidation };
