// src/server.js
require('dotenv').config()

const express        = require('express')
const cors           = require('cors')
const helmet         = require('helmet')
const { apiLimiter } = require('./src/middleware/rateLimiter')
const routes         = require('./src/routes/index')

const app  = express()
const PORT = process.env.PORT || 5000

app.use(helmet())

// ✅ FIX: Allow all Vercel preview URLs + your production frontend
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (Postman, curl, server-to-server)
    if (!origin) return callback(null, true)

    const allowed = [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://my-portfolio-i3ukqvaa3-ali-haiders-projects-0a3722ca.vercel.app/',
      // ✅ Your frontend production URL — set this in Vercel env vars
      process.env.CLIENT_URL,
    ].filter(Boolean)

    // Also allow ANY *.vercel.app subdomain (covers all preview deployments)
    const isVercel = /^https:\/\/.*\.vercel\.app$/.test(origin)

    if (isVercel || allowed.includes(origin)) {
      callback(null, true)
    } else {
      console.warn(`⚠️  CORS blocked origin: ${origin}`)
      callback(new Error(`CORS: origin ${origin} not allowed`))
    }
  },
  methods:        ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials:    true,
}))

// ✅ Needed on Vercel — it sits behind a proxy
app.set('trust proxy', 1)

app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true, limit: '10kb' }))
app.use('/api', apiLimiter)
app.use('/api', routes)

app.get('/', (req, res) => {
  res.json({ name: 'Ali Haider Portfolio API', status: 'running', test: 'GET /api/health' })
})

app.use((req, res) => {
  res.status(404).json({ success: false, message: `${req.method} ${req.path} not found` })
})

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.message)
  res.status(500).json({ success: false, message: err.message })
})

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`\n🚀 Server: http://localhost:${PORT}`)
    console.log(`🔍 Test:   http://localhost:${PORT}/api/health\n`)
  })
}

module.exports = app