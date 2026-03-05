// src/db/init.js  →  run with: npm run init-db
require('dotenv').config()
const sqlite3 = require('sqlite3').verbose()
const path    = require('path')

const DB_PATH = process.env.DB_PATH || './portfolio.db'
const db = new sqlite3.Database(path.resolve(DB_PATH), (err) => {
  if (err) { console.error('❌ Cannot open DB:', err.message); process.exit(1) }
  console.log('✅ Opened:', path.resolve(DB_PATH))
})

db.serialize(() => {
  db.run('PRAGMA foreign_keys = ON')

  // ── contact_messages (NOT "messages" — must match controller queries) ────
  db.run(`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id         TEXT    PRIMARY KEY,
      name       TEXT    NOT NULL,
      email      TEXT    NOT NULL,
      message    TEXT    NOT NULL,
      ip_address TEXT,
      status     TEXT    DEFAULT 'unread' CHECK(status IN ('unread','read','replied')),
      created_at TEXT    DEFAULT (datetime('now')),
      updated_at TEXT    DEFAULT (datetime('now'))
    )
  `, err => err ? console.error('contact_messages:', err.message) : console.log('✅ contact_messages ready'))

  // ── projects ─────────────────────────────────────────────────────────────
  db.run(`
    CREATE TABLE IF NOT EXISTS projects (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      title       TEXT    NOT NULL,
      description TEXT    NOT NULL,
      tags        TEXT    NOT NULL DEFAULT '[]',
      color       TEXT    NOT NULL DEFAULT '#6e50ff',
      icon        TEXT    NOT NULL DEFAULT '💻',
      github_url  TEXT,
      demo_url    TEXT,
      featured    INTEGER DEFAULT 0 CHECK(featured IN (0,1)),
      sort_order  INTEGER DEFAULT 0,
      created_at  TEXT    DEFAULT (datetime('now'))
    )
  `, err => err ? console.error('projects:', err.message) : console.log('✅ projects ready'))

  // ── testimonials ─────────────────────────────────────────────────────────
  db.run(`
    CREATE TABLE IF NOT EXISTS testimonials (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      name       TEXT    NOT NULL,
      role       TEXT    NOT NULL,
      company    TEXT    NOT NULL,
      text       TEXT    NOT NULL,
      avatar     TEXT    NOT NULL,
      rating     INTEGER DEFAULT 5 CHECK(rating BETWEEN 1 AND 5),
      visible    INTEGER DEFAULT 1 CHECK(visible IN (0,1)),
      created_at TEXT    DEFAULT (datetime('now'))
    )
  `, err => err ? console.error('testimonials:', err.message) : console.log('✅ testimonials ready'))

  // ── skills ───────────────────────────────────────────────────────────────
  db.run(`
    CREATE TABLE IF NOT EXISTS skills (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      name       TEXT    NOT NULL UNIQUE,
      icon       TEXT    NOT NULL,
      category   TEXT    NOT NULL CHECK(category IN ('language','framework','tool')),
      sort_order INTEGER DEFAULT 0
    )
  `, err => err ? console.error('skills:', err.message) : console.log('✅ skills ready'))

  // ── page_views ────────────────────────────────────────────────────────────
  db.run(`
    CREATE TABLE IF NOT EXISTS page_views (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      path       TEXT    NOT NULL DEFAULT '/',
      referrer   TEXT,
      user_agent TEXT,
      ip_address TEXT,
      created_at TEXT    DEFAULT (datetime('now'))
    )
  `, err => err ? console.error('page_views:', err.message) : console.log('✅ page_views ready'))

  // ── Seed Projects ─────────────────────────────────────────────────────────
  const projects = [
    ['Flight Reservation System', 'A fully functional airline ticket booking system with seat management, passenger records, and real-time availability tracking. Built in C++ with efficient data structures.',
      JSON.stringify(['C++','OOP','Data Structures','File I/O']), '#6e50ff', '✈️', '#', null, 1, 1],
    ['XploreMath', 'An interactive mathematics learning platform with dynamic visualizations, equation solvers, and concept explanations.',
      JSON.stringify(['React','JavaScript','CSS','Math.js']), '#22d3ee', '∑', '#', '#', 1, 2],
    ['Finance Tracker', 'Personal finance management app with expense tracking, budget planning, visual charts, and monthly reports.',
      JSON.stringify(['React','JavaScript','Chart.js','LocalStorage']), '#4ade80', '💰', '#', '#', 0, 3],
    ['Islamabad City Map', "C++ console-based city navigation using Dijkstra's algorithm to find shortest paths between Islamabad landmarks.",
      JSON.stringify(['C++','Graphs','Dijkstra','DSA']), '#f472b6', '🗺️', '#', null, 0, 4],
    ['Ecommerce Frontend', 'Professional e-commerce frontend built during internship at DevelopersHub Corporation. Features product listings, cart, and checkout.',
      JSON.stringify(['React','JavaScript','Tailwind','API']), '#fb923c', '🛒', '#', '#', 1, 5],
    ['This Portfolio', 'Built with Next.js, Three.js, Framer Motion, and Tailwind CSS. Features 3D particle animations and dark/light mode.',
      JSON.stringify(['Next.js','Three.js','Framer Motion','TypeScript']), '#a78bfa', '🎨', '#', '#', 0, 6],
  ]
  const pStmt = db.prepare(
    'INSERT OR IGNORE INTO projects (title,description,tags,color,icon,github_url,demo_url,featured,sort_order) VALUES (?,?,?,?,?,?,?,?,?)'
  )
  projects.forEach(p => pStmt.run(p, err => { if (err) console.error('project seed:', err.message) }))
  pStmt.finalize(() => console.log('✅ Projects seeded'))

  // ── Seed Testimonials ─────────────────────────────────────────────────────
  const testimonials = [
    ['John Smith',  'Senior Developer', 'TechCorp USA',              'Ali is one of the most dedicated developers I have worked with. His attention to detail and clean code is remarkable for his experience level.', 'JS', 5],
    ['Sarah Khan',  'Project Manager',  'DevelopersHub Corporation', 'During his internship, Ali consistently exceeded expectations. His React skills are exceptional and he brought creative ideas to every project.', 'SK', 5],
    ['Ahmed Raza',  'CS Professor',     'University',                "Ali demonstrates exceptional grasp of CS concepts. His DSA Islamabad city map project was one of the most creative implementations I have seen.", 'AR', 5],
    ['Maryam Ali',  'UI/UX Designer',   'Creative Studio',           "I was blown away by Ali's design sensibility. He understood design intent and translated it to pixel-perfect code.", 'MA', 5],
    ['Michael Lee', 'Startup Founder',  'NextWave',                  "We hired Ali for a React project and he delivered exceptional results. Code quality and communication were truly impressive.", 'ML', 5],
  ]
  const tStmt = db.prepare(
    'INSERT OR IGNORE INTO testimonials (name,role,company,text,avatar,rating) VALUES (?,?,?,?,?,?)'
  )
  testimonials.forEach(t => tStmt.run(t, err => { if (err) console.error('testimonial seed:', err.message) }))
  tStmt.finalize(() => console.log('✅ Testimonials seeded'))

  // ── Seed Skills ───────────────────────────────────────────────────────────
  const skills = [
    ['C++','⚡','language',1], ['Python','🐍','language',2], ['Java','☕','language',3],
    ['JavaScript','🌟','language',4], ['HTML','🏗️','language',5], ['CSS','🎨','language',6],
    ['SQL','🗄️','language',7], ['React','⚛️','framework',8], ['Next.js','▲','framework',9],
    ['Three.js','🌐','framework',10], ['VS Code','💻','tool',11], ['GitHub','🐙','tool',12],
  ]
  const sStmt = db.prepare(
    'INSERT OR IGNORE INTO skills (name,icon,category,sort_order) VALUES (?,?,?,?)'
  )
  skills.forEach(s => sStmt.run(s, err => { if (err) console.error('skill seed:', err.message) }))
  sStmt.finalize(() => console.log('✅ Skills seeded'))
})

// Close after everything finishes
setTimeout(() => {
  db.close()
  console.log('\n🎉 Database ready! Now run: npm run dev\n')
}, 2000)