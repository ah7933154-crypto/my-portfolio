'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useTheme } from '@/app/ThemeContext'

export default function FloatingShape() {
  const mountRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const animIdRef = useRef<number>(0)

  useEffect(() => {
    if (!mountRef.current) return
    const el = mountRef.current
    const W = el.clientWidth
    const H = el.clientHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100)
    camera.position.z = 4

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    el.appendChild(renderer.domElement)

    // Icosahedron with wireframe overlay
    const geo = new THREE.IcosahedronGeometry(1.3, 1)
    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color('#6e50ff') },
        uColor2: { value: new THREE.Color('#22d3ee') },
      },
      vertexShader: `
        uniform float uTime;
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normal;
          vPosition = position;
          vec3 pos = position;
          pos += normal * sin(uTime * 0.8 + position.y * 3.0) * 0.05;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          float t = sin(uTime * 0.5 + vPosition.x + vPosition.y) * 0.5 + 0.5;
          vec3 col = mix(uColor1, uColor2, t);
          float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.5);
          col = mix(col, vec3(1.0), fresnel * 0.3);
          gl_FragColor = vec4(col, 0.7 + fresnel * 0.3);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    })

    const mesh = new THREE.Mesh(geo, mat)
    scene.add(mesh)

    // Wireframe
    const wireGeo = new THREE.IcosahedronGeometry(1.31, 1)
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x6e50ff,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    })
    const wire = new THREE.Mesh(wireGeo, wireMat)
    scene.add(wire)

    // Outer glow ring
    const ringGeo = new THREE.TorusGeometry(1.8, 0.02, 16, 100)
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      transparent: true,
      opacity: 0.3,
    })
    const ring = new THREE.Mesh(ringGeo, ringMat)
    ring.rotation.x = Math.PI / 3
    scene.add(ring)

    // Orbiting particles
    const orbitCount = 30
    const orbitGeo = new THREE.BufferGeometry()
    const orbitPos = new Float32Array(orbitCount * 3)
    for (let i = 0; i < orbitCount; i++) {
      const angle = (i / orbitCount) * Math.PI * 2
      const r = 1.9 + Math.random() * 0.3
      orbitPos[i * 3] = Math.cos(angle) * r
      orbitPos[i * 3 + 1] = (Math.random() - 0.5) * 0.5
      orbitPos[i * 3 + 2] = Math.sin(angle) * r
    }
    orbitGeo.setAttribute('position', new THREE.BufferAttribute(orbitPos, 3))
    const orbitMat = new THREE.PointsMaterial({
      color: 0xc084fc,
      size: 0.04,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    })
    const orbitPoints = new THREE.Points(orbitGeo, orbitMat)
    scene.add(orbitPoints)

    // Mouse interaction
    const mouse = { x: 0, y: 0 }
    const targetMouse = { x: 0, y: 0 }
    const handleMouse = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      targetMouse.x = ((e.clientX - rect.left) / W - 0.5) * 2
      targetMouse.y = -((e.clientY - rect.top) / H - 0.5) * 2
    }
    window.addEventListener('mousemove', handleMouse)

    let time = 0
    const animate = () => {
      animIdRef.current = requestAnimationFrame(animate)
      time += 0.01

      mouse.x += (targetMouse.x - mouse.x) * 0.05
      mouse.y += (targetMouse.y - mouse.y) * 0.05

      mat.uniforms.uTime.value = time

      mesh.rotation.x = time * 0.3 + mouse.y * 0.5
      mesh.rotation.y = time * 0.4 + mouse.x * 0.5
      wire.rotation.copy(mesh.rotation)

      ring.rotation.z = time * 0.2
      orbitPoints.rotation.y = -time * 0.5

      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      const w = el.clientWidth
      const h = el.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animIdRef.current)
      window.removeEventListener('mousemove', handleMouse)
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className="w-full h-full" />
}