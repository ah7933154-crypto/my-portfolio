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

app.use(cors({
  origin:         [process.env.CLIENT_URL || 'http://localhost:3000', 'http://localhost:3000', 'http://localhost:3001'],
  methods:        ['GET','POST','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
  credentials:    true,
}))

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

app.listen(PORT, () => {
  console.log(`\n🚀 Server: http://localhost:${PORT}`)
  console.log(`🔍 Test:   http://localhost:${PORT}/api/health\n`)
})

module.exports = app