// src/routes/index.js
const express = require('express')
const router  = express.Router()

const { contactValidation }  = require('../middleware/validation')
const { contactLimiter }     = require('../middleware/rateLimiter')

const { submitContact } = require('../controllers/contactController')

// Health check
router.get('/health', (req, res) => {
  res.json({ success: true, message: '✅ Portfolio API running', time: new Date().toISOString() })
})

// Contact
router.post('/contact', contactLimiter, ...contactValidation, submitContact)

module.exports = router