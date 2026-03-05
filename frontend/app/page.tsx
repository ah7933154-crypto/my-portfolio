'use client'

import CustomCursor from '@/app/CustomCursor'
import Navbar from '@/app/Navbar'
import HeroSection from '@/app/HeroSection'
import AboutSection from '@/app/AboutSection'
import ProjectsSection from '@/app/ProjectSection'
import TestimonialsSection from '@/app/TestimonialSection'
import ContactSection from '@/app/ContactSection'
import Footer from '@/app/Footer'
import { motion, useScroll, useSpring } from 'framer-motion'

export default function Page() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  return (
    <main className="relative">
      {/* Scroll progress bar */}
      <motion.div
        style={{
          scaleX,
          position: 'fixed',
          top: 0, left: 0, right: 0,
          height: '2px',
          zIndex: 200,
          originX: 0,
          background: 'linear-gradient(90deg, #6e50ff, #c084fc, #22d3ee)',
        }}
      />

      {/* Custom cursor (desktop only) */}
      <CustomCursor />

      {/* Navigation */}
      <Navbar />

      {/* Page sections */}
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}