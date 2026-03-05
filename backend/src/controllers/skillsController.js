// src/controllers/skillsController.js
const { getDB } = require('../db/connection')   // ✅ correct path

exports.getAllSkills = (req, res) => {
  const db = getDB()
  const { category } = req.query
  let query = 'SELECT * FROM skills'
  const params = []

  if (category) {
    if (!['language', 'framework', 'tool'].includes(category)) {
      return res.status(400).json({ success: false, message: 'Invalid category' })
    }
    query += ' WHERE category = ?'
    params.push(category)
  }
  query += ' ORDER BY sort_order ASC'

  db.all(query, params, (err, rows) => {
    if (err) {
      console.error('getAllSkills error:', err.message)
      return res.status(500).json({ success: false, message: 'Server error' })
    }
    return res.json({ success: true, data: rows, total: rows.length })
  })
}