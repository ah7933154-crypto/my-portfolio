// src/controllers/contactController.js
const { v4: uuidv4 }       = require('uuid')
const nodemailer            = require('nodemailer')
const { validationResult } = require('express-validator')
const { getDB }             = require('../db/connection')

// ── POST /api/contact ──────────────────────────────────────────────────────
exports.submitContact = (req, res) => {

  // Debug log — shows exactly what the backend received
  // Remove this console.log after everything works
  console.log('📥 Contact form received:', req.body)

  // Check validation errors
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    // Log exactly which fields failed and why
    console.log('❌ Validation errors:', errors.array())
    return res.status(422).json({
      success: false,
      message: 'Validation failed',
      errors:  errors.array().map(e => ({ field: e.path, message: e.msg })),
    })
  }

  const { name, email, message } = req.body

  // Guard against missing fields (extra safety beyond validation middleware)
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'Name, email, and message are all required.',
    })
  }

  const id         = uuidv4()
  const ip_address = req.ip || 'unknown'
  const db         = getDB()

  // Save to database
  db.run(
    `INSERT INTO contact_messages (id, name, email, message, ip_address)
     VALUES (?, ?, ?, ?, ?)`,
    [
      id,
      name.trim(),
      email.trim().toLowerCase(),   // normalise here instead of in middleware
      message.trim(),
      ip_address,
    ],
    function (dbErr) {
      if (dbErr) {
        console.error('❌ DB insert error:', dbErr.message)
        return res.status(500).json({
          success: false,
          message: 'Could not save your message. Please email me directly.',
        })
      }

      console.log(`✅ Message saved — ID: ${id}  from: ${name} <${email}>`)

      // Send email notification (fire and forget — never blocks the response)
      if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        const transporter = nodemailer.createTransport({
          host:   process.env.SMTP_HOST || 'smtp.gmail.com',
          port:   parseInt(process.env.SMTP_PORT || '587'),
          secure: false,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
          tls: { rejectUnauthorized: false },
        })

        transporter.sendMail({
          from:    `"Portfolio Contact" <${process.env.SMTP_USER}>`,
          to:      process.env.SMTP_TO || process.env.SMTP_USER,
          replyTo: email,
          subject: `📬 New Portfolio Message from ${name}`,
          html: `
            <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;
                        border-radius:12px;overflow:hidden;border:1px solid #e2dcff;">
              <div style="background:linear-gradient(135deg,#6e50ff,#c084fc);padding:28px 24px;">
                <h2 style="color:#fff;margin:0;">📬 New Contact Message</h2>
                <p style="color:rgba(255,255,255,0.8);margin:6px 0 0;font-size:14px;">
                  From your portfolio website
                </p>
              </div>
              <div style="background:#f8f7ff;padding:24px;">
                <table style="width:100%;border-collapse:collapse;font-size:14px;">
                  <tr style="border-bottom:1px solid #e2dcff;">
                    <td style="padding:12px 0;color:#6b6480;width:80px;font-weight:600;">Name</td>
                    <td style="padding:12px 0;color:#12101e;font-weight:700;">${name}</td>
                  </tr>
                  <tr style="border-bottom:1px solid #e2dcff;">
                    <td style="padding:12px 0;color:#6b6480;font-weight:600;">Email</td>
                    <td style="padding:12px 0;">
                      <a href="mailto:${email}" style="color:#6e50ff;">${email}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:12px 0;color:#6b6480;font-weight:600;vertical-align:top;">
                      Message
                    </td>
                    <td style="padding:12px 0;color:#12101e;line-height:1.7;">
                      ${message.trim().replace(/\n/g, '<br/>')}
                    </td>
                  </tr>
                </table>
                <div style="margin-top:20px;padding:12px 16px;background:#ede9fe;
                            border-radius:8px;font-size:12px;color:#6b6480;">
                  ID: ${id} &nbsp;·&nbsp; ${new Date().toLocaleString()}
                </div>
                <a href="mailto:${email}?subject=Re: Your message to Ali Haider"
                   style="display:inline-block;margin-top:16px;
                          background:linear-gradient(135deg,#6e50ff,#c084fc);
                          color:#fff;text-decoration:none;padding:12px 24px;
                          border-radius:50px;font-size:14px;font-weight:600;">
                  Reply to ${name} →
                </a>
              </div>
            </div>
          `,
        })
        .then(() => console.log(`📧 Email sent for message ${id}`))
        .catch(err => console.warn(`⚠️  Email failed (message still saved): ${err.message}`))
      } else {
        console.warn('⚠️  SMTP_USER or SMTP_PASS not set in .env — email skipped')
      }

      // Always respond success once DB save worked
      return res.status(201).json({
        success: true,
        message: 'Message received! I will get back to you soon.',
        id,
      })
    }
  )
}

// ── GET /api/contact/messages ──────────────────────────────────────────────
exports.getMessages = (req, res) => {
  const db = getDB()
  const { status, limit = 50, offset = 0 } = req.query

  let query    = 'SELECT * FROM contact_messages'
  const params = []

  if (status) {
    query += ' WHERE status = ?'
    params.push(status)
  }
  query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?'
  params.push(parseInt(limit), parseInt(offset))

  db.all(query, params, (err, rows) => {
    if (err) return res.status(500).json({ success: false, message: 'Server error' })

    const countSql   = status
      ? 'SELECT COUNT(*) as c FROM contact_messages WHERE status = ?'
      : 'SELECT COUNT(*) as c FROM contact_messages'
    const countParam = status ? [status] : []

    db.get(countSql, countParam, (err2, row) => {
      if (err2) return res.status(500).json({ success: false, message: 'Server error' })
      return res.json({ success: true, data: rows, total: row.c })
    })
  })
}

// ── PATCH /api/contact/messages/:id ───────────────────────────────────────
exports.updateMessageStatus = (req, res) => {
  const db     = getDB()
  const { id } = req.params
  const { status } = req.body

  if (!['unread', 'read', 'replied'].includes(status)) {
    return res.status(400).json({ success: false, message: 'Invalid status' })
  }

  db.run(
    `UPDATE contact_messages SET status = ?, updated_at = datetime('now') WHERE id = ?`,
    [status, id],
    function (err) {
      if (err) return res.status(500).json({ success: false, message: 'Server error' })
      if (this.changes === 0) return res.status(404).json({ success: false, message: 'Not found' })
      return res.json({ success: true, message: 'Status updated' })
    }
  )
}