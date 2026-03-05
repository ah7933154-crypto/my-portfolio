'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let dotX = 0, dotY = 0
    let ringX = 0, ringY = 0
    let animId: number

    const moveCursor = (e: MouseEvent) => {
      dotX = e.clientX
      dotY = e.clientY
    }

    const addHover = () => ring.classList.add('hovering')
    const removeHover = () => ring.classList.remove('hovering')

    window.addEventListener('mousemove', moveCursor)

    const interactables = document.querySelectorAll('a, button, [data-cursor-hover]')
    interactables.forEach(el => {
      el.addEventListener('mouseenter', addHover)
      el.addEventListener('mouseleave', removeHover)
    })

    const animate = () => {
      animId = requestAnimationFrame(animate)
      ringX += (dotX - ringX) * 0.12
      ringY += (dotY - ringY) * 0.12

      dot.style.transform = `translate(${dotX - 3}px, ${dotY - 3}px)`
      ring.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`
    }
    animate()

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      interactables.forEach(el => {
        el.removeEventListener('mouseenter', addHover)
        el.removeEventListener('mouseleave', removeHover)
      })
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden md:block" />
      <div ref={ringRef} className="cursor-ring hidden md:block" />
    </>
  )
}