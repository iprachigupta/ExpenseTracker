const Joi = require("joi");

const transactionSchema = Joi.object({
  title: Joi.string().min(3).max(50).required().messages({
    "string.base": "Title must be a string.",
    "string.empty": "Title cannot be empty.",
    "any.required": "Title is required.",
    "string.min": "Title should have at least 3 characters.",
    "string.max": "Title should have at most 50 characters.",
  }),
  amount: Joi.number().positive().required().messages({
    "number.base": "Amount must be a number.",
    "number.positive": "Amount must be a positive number.",
    "any.required": "Amount is required.",
  }),
  category: Joi.string().required().messages({
    "string.base": "Category must be a string.",
    "any.required": "Category is required.",
  }),
  description: Joi.string().max(255).required().messages({
    "string.base": "Description must be a string.",
    "string.empty": "Description cannot be empty.",
    "string.max": "Description should have at most 255 characters.",
    "any.required": "Description is required.",
  }),
  transactionType: Joi.string()
    .valid("income", "expense")
    .required()
    .messages({
      "any.only": "Transaction type must be 'income' or 'expense'.",
      "any.required": "Transaction type is required.",
    }),
  date: Joi.date().iso().required().messages({
    "date.base": "Date must be a valid ISO date string.",
    "any.required": "Date is required.",
  }),
});

const validateTransaction = (transactionSchema) => {
  return (req, res, next) => {
    const { error } = transactionSchema.validate(req.body);
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

const transaction = validateTransaction(transactionSchema);
module.exports = { transaction };
