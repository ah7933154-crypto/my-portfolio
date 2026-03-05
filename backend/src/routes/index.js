// src/routes/index.js
const express = require('express')
const router  = express.Router()

const { contactValidation }  = require('../middleware/validation')
const { contactLimiter }     = require('../middleware/rateLimiter')

const { submitContact, getMessages, updateMessageStatus } = require('../controllers/contactController')
const { getAllProjects, getProjectById }                  = require('../controllers/projectsController')
const { getAllTestimonials }                              = require('../controllers/testimonialsController')
const { getAllSkills }                                    = require('../controllers/skillsController')
const { trackPageView, getStats }                        = require('../controllers/analyticsController')

// Health check
router.get('/health', (req, res) => {
  res.json({ success: true, message: '✅ Portfolio API running', time: new Date().toISOString() })
})

// Contact
router.post('/contact',               contactLimiter, ...contactValidation, submitContact)
router.get('/contact/messages',       getMessages)
router.patch('/contact/messages/:id', updateMessageStatus)

// Data
router.get('/projects',     getAllProjects)
router.get('/projects/:id', getProjectById)
router.get('/testimonials', getAllTestimonials)
router.get('/skills',       getAllSkills)

// Analytics
router.post('/analytics/view', trackPageView)
router.get('/analytics/stats', getStats)

module.exports = router