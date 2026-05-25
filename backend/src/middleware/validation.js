// src/middleware/validation.js
const { body } = require('express-validator')

const contactValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be 2–100 characters'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email address'),
    // ✅ REMOVED .normalizeEmail() — it was transforming emails like
    // "Ali.Haider@Gmail.com" into "ali.haider@gmail.com" BEFORE isEmail() ran,
    // sometimes causing valid emails to fail validation unexpectedly

  body('message')
    .trim()
    .notEmpty().withMessage('Message is required')
    .isLength({ min: 5, max: 2000 }).withMessage('Message must be 5–2000 characters'),
]

module.exports = { contactValidation }