'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import type { Project } from '@/app/types'

interface ProjectCardProps {
  project: Project
  index: number
  inView: boolean
}

export default function ProjectCard({ project, index, inView }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const rx = ((e.clientY - cy) / rect.height) * -12
    const ry = ((e.clientX - cx) / rect.width) * 12
    setRotation({ x: rx, y: ry })
  }

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 })
    setHovered(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: rotation.x,
          rotateY: rotation.y,
          z: hovered ? 20 : 0,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="relative glass-card rounded-2xl overflow-hidden cursor-pointer group"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Top accent bar */}
        <div
          className="absolute top-0 left-0 right-0 h-0.5 transition-all duration-500"
          style={{
            background: hovered
              ? `linear-gradient(90deg, ${project.color}, transparent)`
              : 'transparent',
          }}
        />

        {/* Glow on hover */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${project.color}15 0%, transparent 60%)`,
          }}
        />

        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <motion.div
              animate={{ scale: hovered ? 1.1 : 1, rotate: hovered ? 5 : 0 }}
              transition={{ type: 'spring', stiffness: 400 }}
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
              style={{
                background: `${project.color}20`,
                border: `1px solid ${project.color}30`,
              }}
            >
              <project.icon />
            </motion.div>

            {project.featured && (
              <span
                className="text-xs font-mono px-2 py-1 rounded-full"
                style={{
                  background: `${project.color}15`,
                  color: project.color,
                  border: `1px solid ${project.color}30`,
                }}
              >
                Featured
              </span>
            )}
          </div>

          {/* Title */}
          <h3
            className="text-lg font-bold dark:text-[#f0eeff] text-[#12101e] mb-2"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            {project.title}
          </h3>

          {/* Description */}
          <p className="dark:text-[#6b6480] text-[#8b80b0] text-sm leading-relaxed mb-5 line-clamp-3">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono px-2 py-0.5 rounded-full dark:bg-white/5 bg-black/5 dark:text-[#8b80b0] text-[#6b6480]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex items-center gap-3 pt-4 border-t dark:border-white/5 border-black/5">
            {project.github && (
              <motion.a
                href={project.github}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1.5 text-xs font-medium dark:text-[#8b80b0] text-[#6b6480] hover:text-[#6e50ff] transition-colors"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </motion.a>
            )}
            {project.demo && (
              <motion.a
                href={project.demo}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1.5 text-xs font-medium hover:text-[#22d3ee] transition-colors"
                style={{ color: project.color }}
              >
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Live Demo
              </motion.a>
            )}
            <motion.span
              animate={{ x: hovered ? 4 : 0, opacity: hovered ? 1 : 0 }}
              className="ml-auto text-sm"
              style={{ color: project.color }}
            >
              →
            </motion.span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}