// src/controllers/analyticsController.js
const { getDB } = require('../db/connection')   // ✅ correct path

exports.trackPageView = (req, res) => {
  const db = getDB()
  const { path = '/' } = req.body
  const referrer   = req.headers['referer'] || null
  const user_agent = req.headers['user-agent'] || null
  const ip         = req.ip || 'unknown'

  db.run(
    'INSERT INTO page_views (path, referrer, user_agent, ip_address) VALUES (?, ?, ?, ?)',
    [path, referrer, user_agent, ip],
    (err) => {
      if (err) {
        console.error('trackPageView error:', err.message)
        return res.status(500).json({ success: false })
      }
      return res.status(201).json({ success: true })
    }
  )
}

exports.getStats = (req, res) => {
  const db = getDB()
  db.get('SELECT COUNT(*) as total FROM page_views', [], (err, totalRow) => {
    if (err) return res.status(500).json({ success: false })
    db.all('SELECT path, COUNT(*) as views FROM page_views GROUP BY path ORDER BY views DESC', [], (err2, byPath) => {
      if (err2) return res.status(500).json({ success: false })
      db.get("SELECT COUNT(*) as unread FROM contact_messages WHERE status='unread'", [], (err3, msgRow) => {
        if (err3) return res.status(500).json({ success: false })
        return res.json({ success: true, data: { totalViews: totalRow.total, viewsByPath: byPath, unreadMessages: msgRow.unread } })
      })
    })
  })
}