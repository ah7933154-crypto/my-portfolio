'use client'

import { color, motion } from 'framer-motion'
import { useTheme } from '@/app/ThemeContext'
import { FiGithub, FiLinkedin, FiInstagram, FiTwitter, FiMail, FiSun, FiMoon } from 'react-icons/fi';
import { FaTwitter, FaHeart } from 'react-icons/fa';
export default function Footer() {
  const { theme, toggleTheme } = useTheme()
  const year = new Date().getFullYear()

  return (
    <footer className="relative py-12 border-t dark:border-white/5 border-black/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <span
              className="font-display text-2xl font-bold gradient-text"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              AH.
            </span>
            <p className="text-xs dark:text-[#4a4468] text-[#9896a8] font-mono">
              © {year} Ali Haider · Built with Next.js & Three.js
            </p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-3">
            {[
              { label: 'GitHub', icon: <FiGithub size={18} />, href: 'https://github.com/ah7933154-crypto', color: '#ffffff' }, // Fixed hex
              { label: 'LinkedIn', icon: <FiLinkedin size={18} />, href: 'https://www.linkedin.com/in/ali-haider-a05b7b334?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', color: '#0077b5' },
              { label: 'Twitter', icon: <FaTwitter size={18} />, href: 'https://twitter.com', color: '#1da1f2' },
              { label: 'Email', icon: <FiMail size={18} />, href: 'mailto:ali.haider213f@gmail.com', color: '#e4405f' },
            ].map(s => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                // Animate everything through Framer Motion for a smooth transition
                whileHover={{
                  scale: 1.15,
                  y: -4,
                  borderColor: `${s.color}60`,
                  color: s.color, // Animates the icon color itself
                  boxShadow: `0 10px 20px ${s.color}15`
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ color: '#9896a8' }} // Default muted color
                className="glass rounded-xl w-10 h-10 flex items-center justify-center transition-colors duration-300 border border-transparent"
                title={s.label}
              >
                {s.icon}
              </motion.a>
            ))}
          </div>

          {/* Theme toggle */}
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 glass rounded-full px-4 py-2 text-xs font-mono dark:text-[#6b6480] text-[#8b80b0] hover:text-[#6e50ff] hover:border-[#6e50ff]/30 transition-all"
          >
            <span>{theme === 'dark' ? <FiSun className="text-amber-400" size={20} /> : <FiMoon className="text-slate-700" size={20} />}</span>
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </motion.button>
        </div>

        {/* Bottom tagline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-12 pt-8 border-t dark:border-white/5 border-black/5"
        >
          <p className="text-[10px] md:text-xs dark:text-[#4a4468] text-[#9896a8] font-mono tracking-widest uppercase flex items-center justify-center gap-2">
            Designed & developed with
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="text-red-500/80" // Soft red to match your glass theme
            >
              <FaHeart size={12} />
            </motion.span>
            from Rawalpindi, Pakistan
          </p>
        </motion.div>
      </div>
    </footer>
  )
}