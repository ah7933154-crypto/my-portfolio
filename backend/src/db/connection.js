// src/db/connection.js
const sqlite3 = require('sqlite3').verbose()
const path    = require('path')
require('dotenv').config()

const DB_PATH = process.env.DB_PATH || './portfolio.db'
let db = null

function getDB() {
  if (!db) {
    db = new sqlite3.Database(path.resolve(DB_PATH), (err) => {
      if (err) {
        console.error('❌ Cannot open database:', err.message)
        process.exit(1)
      } else {
        console.log('✅ SQLite connected:', path.resolve(DB_PATH))
        db.run('PRAGMA journal_mode = WAL')
        db.run('PRAGMA foreign_keys = ON')
      }
    })
  }
  return db
}

module.exports = { getDB }