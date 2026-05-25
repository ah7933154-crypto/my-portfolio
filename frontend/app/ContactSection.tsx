'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { FiGithub, FiLinkedin, FiInstagram } from 'react-icons/fi';

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [focused, setFocused] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const configuredBackend = (process.env.NEXT_PUBLIC_BACKEND_URL || '').trim().replace(/\/$/, '')
      const contactEndpoint =
        configuredBackend
          ? `${configuredBackend}/api/contact`
          : process.env.NODE_ENV === 'development'
            ? 'http://localhost:5000/api/contact'
            : '/api/contact'

      const response = await fetch(contactEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      })

      const data = await response.json()

      if (response.ok) {
        setSent(true)
        setFormState({ name: '', email: '', message: '' })
        setTimeout(() => setSent(false), 3000)
      } else {
        const validationDetails = Array.isArray(data?.errors)
          ? data.errors.map((e: { message?: string }) => e.message).filter(Boolean).join('\n')
          : ''
        alert(validationDetails || data.message || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Could not reach the server. Please email me directly at ali.haider213f@gmail.com')
    } finally {
      setLoading(false)
    }
  }

  const contactItems = [
    { icon: <FiMail size={18} />, label: 'Email',    value: 'ali.haider213f@gmail.com', href: 'mailto:ali.haider213f@gmail.com', color: '#6e50ff' },
    { icon: <FiPhone size={18} />, label: 'Phone',   value: '+92 334 5581535',          href: 'tel:+923345581535',               color: '#22d3ee' },
    { icon: <FiMapPin size={18} />, label: 'Location', value: 'Rawalpindi, Pakistan',  href: 'https://maps.google.com/?q=Rawalpindi,Pakistan', color: '#4ade80' },
  ]

  const inputBase = `w-full glass rounded-xl px-4 py-3.5 text-sm dark:text-[#f0eeff] text-[#12101e] 
    placeholder:dark:text-[#4a4468] placeholder:text-[#9896a8] outline-none 
    border transition-all duration-300 font-body`
  const inputDefault = `dark:border-white/5 border-black/5`
  const inputFocused = `border-[#6e50ff]/40`

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-[#6e50ff]/5 blur-3xl" />

      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="text-xs font-mono text-[#6e50ff] tracking-widest uppercase">05 / Contact</span>
          <span className="flex-1 h-px dark:bg-white/5 bg-black/5" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>
              Let&apos;s build<br />something<br /><span className="gradient-text">amazing</span> together.
            </h2>

            <p className="dark:text-[#6b6480] text-[#8b80b0] leading-relaxed mb-12 max-w-sm">
              Whether it&apos;s a new project, freelance opportunity, or just a chat — my inbox is always open.
            </p>

            <div className="space-y-4">
              {contactItems.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.label === 'Location' ? '_blank' : undefined}
                  rel="noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  whileHover={{ x: 6 }}
                  className="flex items-center gap-4 group"
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                    style={{ background: `${item.color}15`, border: `1px solid ${item.color}25`, color: item.color }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs font-mono dark:text-[#4a4468] text-[#9896a8] uppercase tracking-wider mb-0.5">{item.label}</div>
                    <div className="text-sm font-medium transition-colors duration-300" style={{ color: item.color }}>{item.value}</div>
                  </div>
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7 }}
              className="flex items-center gap-3 mt-10 pt-8 border-t dark:border-white/5 border-black/5"
            >
              {[
                { icon: <FiGithub size={20} />,   label: 'GitHub',    href: 'https://github.com/ah7933154-crypto', brandColor: '#ffffff' },
                { icon: <FiLinkedin size={20} />, label: 'LinkedIn',  href: 'https://www.linkedin.com/in/ali-haider-a05b7b334', brandColor: '#0077b5' },
                { icon: <FiInstagram size={20} />, label: 'Instagram', href: 'https://instagram.com', brandColor: '#e4405f' },
              ].map(s => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.1, y: -4, borderColor: `${s.brandColor}60`, boxShadow: `0 10px 20px ${s.brandColor}20`, color: s.brandColor }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ color: '#9896a8' }}
                  className="glass rounded-xl w-10 h-10 flex items-center justify-center text-base transition-all duration-300"
                  style={{ border: '1px solid rgba(255,255,255,0.05)' }}
                  title={s.label}
                >
                  {s.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono dark:text-[#4a4468] text-[#9896a8] uppercase tracking-wider mb-2">Your Name</label>
                <input
                  type="text" required placeholder="Ali Khan"
                  value={formState.name}
                  onChange={e => setFormState(s => ({ ...s, name: e.target.value }))}
                  onFocus={() => setFocused('name')} onBlur={() => setFocused(null)}
                  className={`${inputBase} ${focused === 'name' ? inputFocused : inputDefault}`}
                  style={{ background: focused === 'name' ? 'rgba(110,80,255,0.06)' : undefined }}
                />
              </div>

              <div>
                <label className="block text-xs font-mono dark:text-[#4a4468] text-[#9896a8] uppercase tracking-wider mb-2">Email Address</label>
                <input
                  type="email" required placeholder="you@example.com"
                  value={formState.email}
                  onChange={e => setFormState(s => ({ ...s, email: e.target.value }))}
                  onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
                  className={`${inputBase} ${focused === 'email' ? inputFocused : inputDefault}`}
                  style={{ background: focused === 'email' ? 'rgba(110,80,255,0.06)' : undefined }}
                />
              </div>

              <div>
                <label className="block text-xs font-mono dark:text-[#4a4468] text-[#9896a8] uppercase tracking-wider mb-2">Message</label>
                <textarea
                  required rows={5} placeholder="Tell me about your project..."
                  value={formState.message}
                  onChange={e => setFormState(s => ({ ...s, message: e.target.value }))}
                  onFocus={() => setFocused('message')} onBlur={() => setFocused(null)}
                  className={`${inputBase} resize-none ${focused === 'message' ? inputFocused : inputDefault}`}
                  style={{ background: focused === 'message' ? 'rgba(110,80,255,0.06)' : undefined }}
                />
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={!loading ? { scale: 1.02, boxShadow: '0 0 40px rgba(110,80,255,0.4)' } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
                className="w-full py-4 rounded-xl text-white font-semibold text-sm tracking-wide transition-all duration-300 relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                style={{
                  background: sent ? 'linear-gradient(135deg, #4ade80, #22d3ee)' : 'linear-gradient(135deg, #6e50ff, #c084fc)',
                  boxShadow: '0 0 30px rgba(110,80,255,0.25)',
                }}
              >
                <motion.span
                  key={sent ? 'sent' : loading ? 'loading' : 'send'}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {sent ? '✓ Message Sent!' : loading ? 'Sending...' : 'Send Message →'}
                </motion.span>
              </motion.button>

              <p className="text-xs dark:text-[#4a4468] text-[#9896a8] text-center">
                Or email me directly at ali.haider213f@gmail.com
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}