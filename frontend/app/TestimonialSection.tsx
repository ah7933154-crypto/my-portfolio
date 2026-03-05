'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { testimonials } from '@/app/Data'

const avatarColors = ['#6e50ff', '#22d3ee', '#4ade80', '#f472b6', '#fb923c']

export default function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(1)

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setActive(prev => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const goTo = (idx: number) => {
    setDirection(idx > active ? 1 : -1)
    setActive(idx)
  }

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
      scale: 0.95,
    }),
  }

  const t = testimonials[active]

  return (
    <section id="testimonials" className="relative py-10 overflow-hidden">
      {/* BG */}
      <div className="absolute inset-0 bg-dot-pattern bg-dot opacity-30" />
      <div className="absolute top-1/2 right-0 w-80 h-80 rounded-full bg-[#c084fc]/4 blur-3xl" />

      <div className="max-w-4xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="text-xs font-mono text-[#6e50ff] tracking-widest uppercase">04 / Testimonials</span>
          <span className="flex-1 h-px dark:bg-white/5 bg-black/5" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-16"
          style={{ fontFamily: 'Syne, sans-serif' }}
        >
          What people
          <br />
          <span className="gradient-text">say about me</span>
        </motion.h2>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {/* Quote mark */}
          <div className="text-8xl leading-none gradient-text font-display mb-6 opacity-30"
            style={{ fontFamily: 'Syne, sans-serif' }}>
            &ldquo;
          </div>

          {/* Card */}
          <div className="relative min-h-[200px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={active}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <p className="text-lg md:text-xl dark:text-[#c4b5fd] text-[#5b21b6] leading-relaxed mb-8 font-light">
                  {t.text}
                </p>

                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${avatarColors[active]}, ${avatarColors[(active + 1) % avatarColors.length]})` }}
                  >
                    {t.avatar}
                  </motion.div>
                  <div>
                    <div className="font-semibold dark:text-[#f0eeff] text-[#12101e] font-display"
                      style={{ fontFamily: 'Syne, sans-serif' }}>
                      {t.name}
                    </div>
                    <div className="text-sm dark:text-[#6b6480] text-[#8b80b0]">
                      {t.role} · <span style={{ color: avatarColors[active] }}>{t.company}</span>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="ml-auto flex gap-1">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.08 }}
                        className="text-yellow-400 text-sm"
                      >
                        ★
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-12">
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width: i === active ? '24px' : '6px',
                    height: '6px',
                    background: i === active ? '#6e50ff' : 'rgba(110,80,255,0.2)',
                  }}
                />
              ))}
            </div>

            {/* Arrows */}
            {/* Arrows */}
            <div className="flex gap-2">
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  setDirection(-1);
                  setActive(prev => (prev - 1 + testimonials.length) % testimonials.length);
                }}
                whileHover={{ scale: 1.1, x: -2 }}
                whileTap={{ scale: 0.9 }}
                className="glass rounded-full w-10 h-10 flex items-center justify-center dark:text-[#8b80b0] text-[#6b6480] hover:text-[#6e50ff] hover:border-[#6e50ff]/30 transition-all relative z-50 pointer-events-auto"
              >
                ←
              </motion.button>
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  setDirection(1);
                  setActive(prev => (prev + 1) % testimonials.length);
                }}
                whileHover={{ scale: 1.1, x: 2 }}
                whileTap={{ scale: 0.9 }}
                className="glass rounded-full w-10 h-10 flex items-center justify-center dark:text-[#8b80b0] text-[#6b6480] hover:text-[#6e50ff] hover:border-[#6e50ff]/30 transition-all relative z-50 pointer-events-auto"
              >
                →
              </motion.button>
            </div>
          </div>

          {/* Mini avatars */}
          <div className="flex items-center gap-3 mt-8 pt-8 border-t dark:border-white/5 border-black/5">
            <span className="text-xs font-mono dark:text-[#4a4468] text-[#9896a8] uppercase tracking-wider">All reviewers</span>
            <div className="flex -space-x-2">
              {testimonials.map((t, i) => (
                <motion.button
                  key={t.id}
                  onClick={() => goTo(i)}
                  whileHover={{ scale: 1.15, zIndex: 10 }}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 dark:border-[#050508] border-[#f8f7ff] transition-all ${i === active ? 'ring-2 ring-[#6e50ff]' : ''}`}
                  style={{ background: `linear-gradient(135deg, ${avatarColors[i]}, ${avatarColors[(i + 1) % avatarColors.length]})` }}
                >
                  {t.avatar[0]}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}