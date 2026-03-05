'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useTheme } from '@/app/ThemeContext'

export default function ParticleField() {
  const mountRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const sceneRef = useRef<{
    scene: THREE.Scene
    camera: THREE.PerspectiveCamera
    renderer: THREE.WebGLRenderer
    particles: THREE.Points
    lines: THREE.LineSegments
    mouse: { x: number; y: number }
    targetMouse: { x: number; y: number }
  } | null>(null)

  useEffect(() => {
    if (!mountRef.current) return
    const el = mountRef.current
    const W = el.clientWidth
    const H = el.clientHeight

    // ─ Scene setup ────────────────────────────
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, W / H, 0.1, 1000)
    camera.position.z = 50

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    el.appendChild(renderer.domElement)

    // ─ Particles ──────────────────────────────
    const COUNT = 180
    const positions = new Float32Array(COUNT * 3)
    const velocities: { x: number; y: number; z: number }[] = []

    for (let i = 0; i < COUNT; i++) {
      const x = (Math.random() - 0.5) * 120
      const y = (Math.random() - 0.5) * 80
      const z = (Math.random() - 0.5) * 50
      positions[i * 3]     = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z
      velocities.push({
        x: (Math.random() - 0.5) * 0.04,
        y: (Math.random() - 0.5) * 0.04,
        z: (Math.random() - 0.5) * 0.02,
      })
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime:   { value: 0 },
        uColor1: { value: new THREE.Color('#6e50ff') },
        uColor2: { value: new THREE.Color('#22d3ee') },
        uColor3: { value: new THREE.Color('#c084fc') },
      },
      vertexShader: `
        uniform float uTime;
        varying vec3 vPosition;
        void main() {
          vPosition = position;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          float size = 2.5 + sin(uTime * 0.5 + position.x * 0.1) * 1.0;
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;
        varying vec3 vPosition;
        void main() {
          vec2 uv = gl_PointCoord - vec2(0.5);
          float dist = length(uv);
          if (dist > 0.5) discard;
          float glow = pow(1.0 - dist * 2.0, 2.0);
          float t  = sin(uTime * 0.3 + vPosition.x * 0.05 + vPosition.y * 0.03) * 0.5 + 0.5;
          float t2 = cos(uTime * 0.2 + vPosition.z * 0.08) * 0.5 + 0.5;
          vec3 col = mix(uColor1, uColor2, t);
          col = mix(col, uColor3, t2 * 0.4);
          gl_FragColor = vec4(col, glow * 0.85);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    const particles = new THREE.Points(geo, mat)
    scene.add(particles)

    // ─ Connection Lines ───────────────────────
    const lineGeo = new THREE.BufferGeometry()
    const linePositions: number[] = []
    const THRESHOLD = 22

    for (let i = 0; i < COUNT; i++) {
      for (let j = i + 1; j < COUNT; j++) {
        const dx = positions[i * 3]     - positions[j * 3]
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1]
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2]
        if (Math.sqrt(dx * dx + dy * dy + dz * dz) < THRESHOLD) {
          linePositions.push(
            positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
            positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2],
          )
        }
      }
    }

    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3))
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x6e50ff,
      transparent: true,
      opacity: 0.08,
      blending: THREE.AdditiveBlending,
    })
    const lines = new THREE.LineSegments(lineGeo, lineMat)
    scene.add(lines)

    // ─ Floating Rings ─────────────────────────
    const ringDefs = [
      { r: 20, tube: 0.04,  color: '#6e50ff', speed:  0.003 },
      { r: 30, tube: 0.025, color: '#22d3ee', speed: -0.002 },
      { r: 14, tube: 0.05,  color: '#c084fc', speed:  0.005 },
    ]
    ringDefs.forEach(({ r, tube, color, speed }) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(r, tube, 16, 100),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.15, blending: THREE.AdditiveBlending }),
      )
      ring.rotation.x = Math.random() * Math.PI
      ring.rotation.y = Math.random() * Math.PI
      ring.userData = { speed }
      scene.add(ring)
    })

    // ─ Mouse tracking ─────────────────────────
    const mouse       = { x: 0, y: 0 }
    const targetMouse = { x: 0, y: 0 }

    const handleMouse = (e: MouseEvent) => {
      targetMouse.x =  (e.clientX / window.innerWidth  - 0.5) * 2
      targetMouse.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', handleMouse)

    // ─ Resize ─────────────────────────────────
    const handleResize = () => {
      const w = el.clientWidth
      const h = el.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)

    // ─ Assign ref BEFORE starting the loop ────
    // This is the key fix: sceneRef must be populated before animate() runs
    sceneRef.current = { scene, camera, renderer, particles, lines, mouse, targetMouse }

    // ─ Animation loop ─────────────────────────
    let time = 0
    let animId = 0        // plain local variable — no ref needed
    let isMounted = true  // guards against running after unmount

    const animate = () => {
      if (!isMounted) return
      animId = requestAnimationFrame(animate)

      time += 0.01
      mat.uniforms.uTime.value = time

      // Smooth mouse follow
      mouse.x += (targetMouse.x - mouse.x) * 0.04
      mouse.y += (targetMouse.y - mouse.y) * 0.04

      // Camera parallax
      camera.position.x += (mouse.x * 8  - camera.position.x) * 0.02
      camera.position.y += (mouse.y * 5  - camera.position.y) * 0.02
      camera.lookAt(0, 0, 0)

      // Update particle positions
      const pos = particles.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < COUNT; i++) {
        pos[i * 3]     += velocities[i].x
        pos[i * 3 + 1] += velocities[i].y
        pos[i * 3 + 2] += velocities[i].z

        if (Math.abs(pos[i * 3])     > 65) velocities[i].x *= -1
        if (Math.abs(pos[i * 3 + 1]) > 45) velocities[i].y *= -1
        if (Math.abs(pos[i * 3 + 2]) > 30) velocities[i].z *= -1

        // Mouse repulsion
        const dx   = pos[i * 3]     - mouse.x * 40
        const dy   = pos[i * 3 + 1] - mouse.y * 28
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 15) {
          pos[i * 3]     += dx * 0.008
          pos[i * 3 + 1] += dy * 0.008
        }
      }
      particles.geometry.attributes.position.needsUpdate = true

      // Rotate rings
      scene.children.forEach(child => {
        if (child instanceof THREE.Mesh && child.geometry instanceof THREE.TorusGeometry) {
          child.rotation.x += child.userData.speed
          child.rotation.y += child.userData.speed * 0.7
        }
      })

      particles.rotation.y = time * 0.02
      particles.rotation.x = time * 0.008

      renderer.render(scene, camera)
    }

    animate()

    // ─ Cleanup ────────────────────────────────
    return () => {
      isMounted = false
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', handleMouse)
      window.removeEventListener('resize', handleResize)
      geo.dispose()
      mat.dispose()
      lineGeo.dispose()
      lineMat.dispose()
      renderer.dispose()
      if (el.contains(renderer.domElement)) {
        el.removeChild(renderer.domElement)
      }
      sceneRef.current = null
    }
  }, [])

  // Update line opacity on theme change
  useEffect(() => {
    if (!sceneRef.current) return
    sceneRef.current.scene.children.forEach(child => {
      if (child instanceof THREE.LineSegments) {
        const m = child.material as THREE.LineBasicMaterial
        m.opacity = theme === 'light' ? 0.12 : 0.08
      }
    })
  }, [theme])

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  )
}