// src/controllers/projectsController.js
const { getDB } = require('../db/connection')   // ✅ correct path

function parseProject(p) {
  if (!p) return null
  return { ...p, tags: JSON.parse(p.tags || '[]'), featured: p.featured === 1 }
}

exports.getAllProjects = (req, res) => {
  const db = getDB()
  const { featured } = req.query
  let query = 'SELECT * FROM projects'
  const params = []

  if (featured === 'true') {
    query += ' WHERE featured = 1'
  }
  query += ' ORDER BY sort_order ASC, id ASC'

  db.all(query, params, (err, rows) => {
    if (err) {
      console.error('getAllProjects error:', err.message)
      return res.status(500).json({ success: false, message: 'Server error' })
    }
    return res.json({ success: true, data: rows.map(parseProject), total: rows.length })
  })
}

exports.getProjectById = (req, res) => {
  const db = getDB()
  db.get('SELECT * FROM projects WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ success: false, message: 'Server error' })
    if (!row) return res.status(404).json({ success: false, message: 'Project not found' })
    return res.json({ success: true, data: parseProject(row) })
  })
}