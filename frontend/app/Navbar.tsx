'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/app/ThemeContext'
import { navLinks } from '@/app/Data'
import { FiSun, FiMoon } from 'react-icons/fi'
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [hoveredLink, setHoveredLink] = useState(null)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sections = ['about', 'projects', 'testimonials', 'contact']
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) })
      },
      { threshold: 0.3 }
    )
    sections.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-transparent ${
          scrolled
            ? 'py-3 bg-[#f8f7ff]/85'
            : 'py-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">

          {/* Logo */}
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="relative group"
          >
            <span
              className="font-bold text-xl tracking-tight mr-30"
              style={{
                fontFamily: 'Syne, sans-serif',
                background: 'linear-gradient(135deg, #6e50ff, #c084fc, #22d3ee)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              AH.
            </span>
            {/* Logo underline glow */}
            <motion.span
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              className="absolute -bottom-0.5 left-0 right-0 h-px origin-left rounded-full"
              style={{ background: 'linear-gradient(90deg, #6e50ff, #c084fc)' }}
            />
          </motion.a>

          {/* ── Desktop Nav Links  */}
          <ul
            className="hidden md:flex items-center gap-1 p-1 rounded-2xl dark:bg-white/3 bg-black/3 border dark:border-white/5 border-black/5"
          >
            {navLinks.map(({ href, label }) => {
              const isActive  = activeSection === href.slice(1)
              const isHovered = hoveredLink === href

              return (
                <li key={href} className="relative">
                  {/* Sliding background pill */}
                  <AnimatePresence>
                    {(isActive || isHovered) && (
                      <motion.span
                        layoutId="nav-pill"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        className="absolute inset-0 rounded-xl"
                        style={{
                          background: isActive
                            ? 'linear-gradient(135deg, rgba(110,80,255,0.2), rgba(192,132,252,0.15))'
                            : 'rgba(110,80,255,0.08)',
                          boxShadow: isActive ? '0 0 16px rgba(110,80,255,0.2)' : 'none',
                        }}
                      />
                    )}
                  </AnimatePresence>

                  <a
                    href={href}
                    onMouseEnter={() => setHoveredLink(null)}
                    onMouseLeave={() => setHoveredLink(null)}
                    className="relative z-10 flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium tracking-wide transition-colors duration-200"
                    style={{
                      color: isActive
                        ? '#a78bfa'
                        : isHovered
                        ? '#c4b5fd'
                        : theme === 'dark' ? '#8b80b0' : '#6b6480',
                    }}
                  >
                    {/* Active dot */}
                    {isActive && (
                      <motion.span
                        layoutId="active-dot"
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: '#6e50ff', boxShadow: '0 0 6px #6e50ff' }}
                      />
                    )}
                    {label}
                  </a>
                </li>
              )
            })}
          </ul>

          {/* ── Right Controls ─────────────────────────────────────── */}
          <div className="flex items-center gap-2">

            {/* Theme toggle */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.08, rotate: 15 }}
              whileTap={{ scale: 0.92 }}
              className="relative w-10 h-10 rounded-xl flex items-center justify-center dark:bg-white/5 bg-black/5 border dark:border-white/8 border-black/8 overflow-hidden group"
              aria-label="Toggle theme"
            >
              {/* Glow on hover */}
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
                style={{ background: 'radial-gradient(circle, rgba(110,80,255,0.15) 0%, transparent 70%)' }}
              />
              <AnimatePresence mode="wait">
                <motion.span
                  key={theme}
                  initial={{ rotate: -90, opacity: 0, y: 10 }}
                  animate={{ rotate: 0, opacity: 1, y: 0 }}
                  exit={{ rotate: 90, opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="relative z-10 text-base"
                >
                  {theme === 'dark' ? <FiSun /> : <FiMoon />}
                </motion.span>
              </AnimatePresence>
            </motion.button>

            {/* Hire Me CTA */}
            <motion.a
              href="mailto:ali.haider213f@gmail.com"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="hidden md:flex items-center gap-2 text-sm font-semibold text-white px-5 py-2.5 rounded-xl relative overflow-hidden group"
              style={{
                background: 'linear-gradient(135deg, #6e50ff, #c084fc)',
                boxShadow: '0 0 20px rgba(110,80,255,0.35)',
                fontFamily: 'Syne, sans-serif',
              }}
            >
              {/* Shimmer sweep on hover */}
              <motion.span
                initial={{ x: '-100%' }}
                whileHover={{ x: '200%' }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none"
              />
              <span className="relative z-10">Hire Me</span>
              <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10 text-xs"
              >
                →
              </motion.span>
            </motion.a>

            {/* Hamburger (mobile) */}
            <motion.button
              onClick={() => setMenuOpen(!menuOpen)}
              whileTap={{ scale: 0.9 }}
              className="md:hidden w-10 h-10 rounded-xl flex flex-col items-center justify-center gap-1.5 dark:bg-white/5 bg-black/5 border dark:border-white/8 border-black/8"
              aria-label="Menu"
            >
              <motion.span
                animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }}
                transition={{ duration: 0.25 }}
                className="block w-5 h-0.5 dark:bg-white bg-[#12101e] rounded-full"
              />
              <motion.span
                animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }}
                transition={{ duration: 0.2 }}
                className="block w-5 h-0.5 dark:bg-white bg-[#12101e] rounded-full"
              />
              <motion.span
                animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }}
                transition={{ duration: 0.25 }}
                className="block w-5 h-0.5 dark:bg-white bg-[#12101e] rounded-full"
              />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile Menu ───────────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-30 md:hidden"
              style={{ background: 'rgba(5,5,8,0.4)', backdropFilter: 'blur(4px)' }}
            />

            {/* Menu panel */}
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-[72px] left-4 right-4 z-40 md:hidden rounded-2xl p-5 border dark:border-white/8 border-black/8 overflow-hidden"
              style={{
                background: theme === 'dark'
                  ? 'rgba(13,13,20,0.95)'
                  : 'rgba(248,247,255,0.95)',
                backdropFilter: 'blur(24px)',
              }}
            >
              {/* Gradient top accent */}
              <div className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, #6e50ff, #c084fc, transparent)' }}
              />

              <ul className="flex flex-col gap-1">
                {navLinks.map(({ href, label }, i) => (
                  <motion.li
                    key={href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.3 }}
                  >
                    <a
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group"
                      style={{
                        color: activeSection === href.slice(1)
                          ? '#a78bfa'
                          : theme === 'dark' ? '#8b80b0' : '#6b6480',
                        background: activeSection === href.slice(1)
                          ? 'rgba(110,80,255,0.1)'
                          : 'transparent',
                      }}
                    >
                      {activeSection === href.slice(1) && (
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: '#6e50ff', boxShadow: '0 0 6px #6e50ff' }}
                        />
                      )}
                      {label}
                      <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-[#6e50ff]">→</span>
                    </a>
                  </motion.li>
                ))}

                {/* Divider */}
                <motion.li
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: navLinks.length * 0.06 }}
                  className="pt-2 mt-1 border-t dark:border-white/5 border-black/5"
                >
                  <a
                    href="https://mail.google.com/mail/u/0/#inbox?compose=CllgCJZdkGBXsrrQfqbGXDBQxHhTXpGxXBQPntzslBFvWnFlFcmqmQRbxhBStsZxHMqnKRxtVLV"
                    className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-white"
                    style={{
                      background: /*'linear-gradient(135deg, #6e50ff, #c084fc)'*/'transparent',
                      boxShadow: '0 4px 20px rgba(110,80,255,0.3)',
                      fontFamily: 'Syne, sans-serif',
                    }}
                  >
                    ✉️ Hire Me
                    <span className="ml-auto">→</span>
                  </a>
                </motion.li>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}