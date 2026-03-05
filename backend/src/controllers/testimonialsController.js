// src/controllers/testimonialsController.js
const { getDB } = require('../db/connection')   // ✅ correct path

exports.getAllTestimonials = (req, res) => {
  const db = getDB()
  db.all(
    'SELECT * FROM testimonials WHERE visible = 1 ORDER BY id ASC',
    [],
    (err, rows) => {
      if (err) {
        console.error('getAllTestimonials error:', err.message)
        return res.status(500).json({ success: false, message: 'Server error' })
      }
      return res.json({ success: true, data: rows, total: rows.length })
    }
  )
}