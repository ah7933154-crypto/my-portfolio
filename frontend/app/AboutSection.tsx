'use client'

import { useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import dynamic from 'next/dynamic'
import { skills } from '@/app/Data'
import { FiMapPin, FiMail, FiPhone, FiUser } from 'react-icons/fi';
import { SiCplusplus } from "react-icons/si";
import { FaGithub } from "react-icons/fa";

const FloatingShape = dynamic(() => import('@/app/floatingShape'), { ssr: false })

const categoryColors: Record<string, string> = {
  language: 'rgba(110,80,255,0.15)',
  framework: 'rgba(34,211,238,0.12)',
  tool: 'rgba(74,222,128,0.12)',
}

const categoryBorder: Record<string, string> = {
  language: 'rgba(110,80,255,0.3)',
  framework: 'rgba(34,211,238,0.3)',
  tool: 'rgba(74,222,128,0.3)',
}

const categoryText: Record<string, string> = {
  language: '#a78bfa',
  framework: '#22d3ee',
  tool: '#4ade80',
}

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.08 },
    },
  }

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  }

  const iconColors: Record<string, string> = {
    Red: '#f87171',    // Tailwind red-400
    Blue: '#60a5fa',   // Tailwind blue-400
    Purple: '#a78bfa', // Tailwind purple-400
    Green: '#34d399',  // Tailwind emerald-400
  };

  return (
    <section id="about" className="relative py-10">
      {/* Background glow */}
      <div className="absolute top-1/2 -left-32 w-96 h-96 rounded-full bg-[#6e50ff]/5 blur-3xl" />
      <div className="absolute top-1/4 -right-32 w-80 h-80 rounded-full bg-[#22d3ee]/5 blur-3xl" />

      <div className="max-w-6xl mx-auto px-6 " ref={ref}>
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="text-xs font-mono text-[#6e50ff] tracking-widest uppercase">02 / About</span>
          <span className="flex-1 h-px dark:bg-white/5 bg-black/5" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left — Text */}
          <motion.div
            variants={container}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
          >
            <motion.h2
              variants={item}
              className="font-display text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              Crafting digital
              <br />
              <span className="gradient-text">experiences</span> with
              <br />
              passion &amp; code.
            </motion.h2>

            <motion.p variants={item} className="dark:text-[#8b80b0] text-[#6b6480] leading-relaxed mb-4">
              Engineering the next generation of smart software. I specialize in blending AI-driven insights with robust Full-Stack architecture to solve real-world complexities. Currently driving frontend innovation at {' '}
              <strong className="dark:text-[#f0eeff] text-[#12101e] font-semibold">
                DevelopersHub Corporation
              </strong>
              , while building tools that make the future a little more calculated{' '}.
            </motion.p>

            <motion.p variants={item} className="dark:text-[#8b80b0] text-[#6b6480] leading-relaxed mb-8">
              I design smart, scalable software, blending AI, Full-Stack, and algorithms to solve real-world problems.
            </motion.p>

            {/* Info cards */}
            <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-2 gap-3 mb-8">
              {[
                { label: 'Location', value: 'Rawalpindi, PK', icon: <FiMapPin />, color: 'Red' },
                { label: 'Status', value: 'Open to Opportunities', icon: <FiUser />, color: 'Blue' },
                { label: 'Email', value: 'ali.haider213f@gmail.com', icon: <FiMail />, color: 'Purple' },
                { label: 'Phone', value: '+92 334 5581535', icon: <FiPhone />, color: 'Green' },
              ].map(({ label, value, icon, color }) => ( // FIX 1: Added 'color' here
                <motion.div
                  variants={item} // FIX 2: Added variants so cards animate
                  key={label}
                  className="glass-card rounded-xl p-3 cursor-default border border-white/5 hover:border-white/10 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="text-sm"
                      style={{ color: iconColors[color] }} // FIX 3: Corrected object syntax
                    >
                      {icon}
                    </span>
                    <span className="text-xs font-mono dark:text-[#8b80b0] text-[#6b6480] uppercase tracking-wider">
                      {label}
                    </span>
                  </div>
                  <span className="text-sm dark:text-[#f0eeff] text-[#12101e] font-medium truncate block">
                    {value}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Skills */}
            <motion.div variants={item}>
              <p className="text-xs font-mono dark:text-[#4a4468] text-[#9896a8] uppercase tracking-widest mb-4">
                Technologies &amp; Tools
              </p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => {
                  // We assign the icon to a Capitalized variable so React recognizes it as a component
                  const Icon = skill.icon as React.ElementType;

                  return (
                    <motion.span
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.4 + i * 0.05, duration: 0.4 }}
                      whileHover={{ scale: 1.08, y: -2 }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium border cursor-default"
                      style={{
                        background: categoryColors[skill.category],
                        borderColor: categoryBorder[skill.category],
                        color: categoryText[skill.category],
                      }}
                    >
                      <span className="flex items-center justify-center">
                        {/* We render it as a tag <Icon /> instead of {skill.icon} */}
                        <Icon size={14} />
                      </span>
                      {skill.name}
                    </motion.span>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>

          {/* Right — 3D Shape */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[500px] lg:h-[600px] flex items-center justify-center"
          >
            {/* Glow behind */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-80 h-80 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(110,80,255,0.12) 0%, transparent 70%)',
                  animation: 'pulseGlow 3s ease-in-out infinite',
                }}
              />
            </div>
            <FloatingShape />

            {/* Floating labels */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-16 left-8 glass rounded-xl p-3 text-center"
            >
              <div className="text-2xl mb-1"><SiCplusplus /></div>
              <div className="text-xs font-mono dark:text-[#8b80b0] text-[#6b6480]"></div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute top-24 right-6 glass rounded-xl p-3 text-center"
            >
              <div className="text-2xl mb-1">⚛️</div>
              <div className="text-xs font-mono dark:text-[#8b80b0] text-[#6b6480]"></div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
              className="absolute bottom-24 right-10 glass rounded-xl p-3 text-center"
            >
              <div className="text-2xl mb-1">▲</div>
              <div className="text-xs font-mono dark:text-[#8b80b0] text-[#6b6480]"></div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute bottom-20 left-12 glass rounded-xl p-3 text-center"
            >
              <div className="text-2xl mb-1"><FaGithub /></div>
              <div className="text-xs font-mono dark:text-[#8b80b0] text-[#6b6480]"></div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}