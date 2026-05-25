'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

const ParticleField = dynamic(() => import('@/app/particleField'), { ssr: false })

const roles = [
  'Full-Stack Developer',
  'MERN Stack Engineer',
  'React.js Developer',
  'Database Specialist',
  'UI/UX Developer'
];

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)
  const timeoutRef = useRef(null)

  useEffect(() => {
    const current = roles[roleIndex]

    if (!deleting) {
      if (displayed.length < current.length) {
        timeoutRef.current = window.setTimeout(() => {
          setDisplayed(current.slice(0, displayed.length + 1))
        }, 70)
      } else {
        timeoutRef.current = window.setTimeout(() => setDeleting(true), 1800)
      }
    } else {
      if (displayed.length > 0) {
        timeoutRef.current = window.setTimeout(() => {
          setDisplayed(current.slice(0, displayed.length - 1))
        }, 40)
      } else {
        setDeleting(false)
        setRoleIndex((prev) => (prev + 1) % roles.length)
      }
    }

    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current)
      }
    }
  }, [displayed, deleting, roleIndex])

  return (
    <section id="hero" className="relative h-screen flex flex-col items-center justify-center">
      {/* Three.js Background */}
      <div className="absolute inset-0">
        <ParticleField />
      </div>

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 dark:bg-gradient-to-b dark:from-transparent dark:via-[#050508]/20 dark:to-[#050508] bg-gradient-to-b from-transparent via-[#f8f7ff]/20 to-[#f8f7ff]" />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-100" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
        {/* Badge */}
        

        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-mono text-[#6e50ff] text-sm tracking-widest uppercase mb-4"
        >
          Hi, I&apos;m
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[clamp(3rem,10vw,7rem)] font-extrabold tracking-tight leading-none mb-6"
          style={{ fontFamily: 'Syne, sans-serif' }}
        >
          <span className="dark:text-[#f0eeff] text-[#12101e]">Ali </span>
          <span className="gradient-text">Haider</span>
        </motion.h1>

        {/* Typewriter role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-center gap-2 mb-8"
        >
          <span className="dark:text-[#8b80b0] text-[#6b6480] text-lg md:text-xl font-light">
            Computer Scientist &nbsp;·&nbsp;
          </span>
          <span
            className="gradient-text text-lg md:text-xl font-semibold"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            {displayed}
            <span className="dark:text-white text-black" style={{ animation: 'blink 1s step-end infinite' }}>|</span>
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-lg mx-auto dark:text-[#8b80b0] text-[#6b6480] text-base md:text-lg leading-relaxed mb-12 font-light"
        >
          Building beautiful, performant web experiences with modern tech.
          Turning complex ideas into clean, interactive interfaces.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(110,80,255,0.4)' }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3.5 rounded-full text-white font-semibold text-sm tracking-wide"
            style={{
              background: 'linear-gradient(135deg, #6e50ff, #c084fc)',
              boxShadow: '0 0 30px rgba(110,80,255,0.3)',
            }}
          >
            View My Work
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3.5 rounded-full font-semibold text-sm tracking-wide glass dark:text-[#f0eeff] text-[#12101e] border dark:border-white/10 border-black/10 hover:border-[#6e50ff]/40 transition-all"
          >
            Get In Touch
          </motion.a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex items-center justify-center gap-10 mt-16"
        >
          {[
            { num: '6+', label: 'Projects' },
            { num: '8+', label: 'Technologies' },
            { num: '1+', label: 'Year Coding' },
          ].map(({ num, label }) => (
            <div key={label} className="text-center">
              <div
                className="font-display text-2xl font-bold gradient-text"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                {num}
              </div>
              <div className="text-xs dark:text-[#6b6480] text-[#8b80b0] uppercase tracking-widest mt-1 font-mono">
                {label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 "
      >
        <span className="text-xs font-mono dark:text-[#4a4468] text-[#9896a8] tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-12 bg-gradient-to-b from-[#6e50ff] to-transparent"
        />
      </motion.div>
    </section>
  )
}