const nodemailer = require('nodemailer')
const { validationResult } = require('express-validator')

exports.submitContact = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
    })
  }

  const { name, email, message } = req.body
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'Name, email, and message are all required.',
    })
  }

  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return res.status(500).json({
      success: false,
      message: 'Email service is not configured on server.',
    })
  }

  try {
    const senderName = name.trim()
    const senderEmail = email.trim().toLowerCase()
    const senderMessage = message.trim()
    const ipAddress = req.ip || 'unknown'

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: { rejectUnauthorized: false },
    })

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_TO || process.env.SMTP_USER,
      replyTo: senderEmail,
      subject: `New Portfolio Message from ${senderName}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${senderName}</p>
        <p><strong>Email:</strong> ${senderEmail}</p>
        <p><strong>IP:</strong> ${ipAddress}</p>
        <p><strong>Message:</strong></p>
        <p>${senderMessage.replace(/\n/g, '<br/>')}</p>
      `,
    })

    return res.status(201).json({
      success: true,
      message: 'Message received! I will get back to you soon.',
    })
  } catch (err) {
    console.error('Contact email send failed:', err.message)
    return res.status(500).json({
      success: false,
      message: 'Could not send your message right now. Please try again.',
    })
  }
}