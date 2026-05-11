import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { asset } from '../lib/asset'

const SOCIALS = [
  { label: 'Facebook',  href: 'https://www.facebook.com/RCTCarPaintingTaguig' },
  { label: 'Instagram', href: '#' },
  { label: 'TikTok',    href: '#' },
]

const INFO = [
  { icon: '📞', label: 'Phone / Viber / WA', value: '+63 910 219 6374', href: 'tel:+639102196374' },
  { icon: '📍', label: 'Location',            value: '480-B Magsalin St, Palingon, Taguig City' },
  { icon: '🕐', label: 'Hours',               value: 'Mon – Sat: 8:00 AM – 6:00 PM' },
  { icon: '🔎', label: 'Waze / Google Maps',  value: 'RCT Car Painting Services', href: 'https://maps.google.com/?q=RCT+Car+Painting+Services+Taguig' },
]

export default function Contact() {
  const marqueeRef = useRef<HTMLDivElement>(null)
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending]     = useState(false)

  /* ── GSAP marquee ── */
  useEffect(() => {
    if (!marqueeRef.current) return
    const ctx = gsap.context(() => {
      gsap.to('.marquee-inner', {
        xPercent: -50,
        duration: 28,
        ease: 'none',
        repeat: -1,
      })
    }, marqueeRef)
    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setTimeout(() => { setSending(false); setSubmitted(true) }, 1600)
  }

  return (
    <section id="contact" className="relative bg-bg pt-16 md:pt-20 pb-0 overflow-hidden">

      {/* ── Background image ── */}
      <div className="absolute inset-0 z-0">
        <img src={asset('/img4.png')} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-transparent to-bg" />
      </div>

      <div className="relative z-10">

        {/* ── Marquee ── */}
        <div ref={marqueeRef} className="overflow-hidden mb-12 md:mb-20 border-y border-stroke/30 py-4">
          <div className="marquee-inner inline-flex whitespace-nowrap">
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i} className="text-3xl md:text-5xl font-display text-text-primary/10 uppercase tracking-[0.1em] px-8">
                RESTORE YOUR CAR •&nbsp;
              </span>
            ))}
          </div>
        </div>

        {/* ── Main CTA + Form ── */}
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-stroke" />
                <span className="text-xs text-muted uppercase tracking-[0.3em]">Book a service</span>
              </div>

              <h2 className="font-display text-[clamp(2.8rem,8vw,5.5rem)] leading-[0.95] tracking-tight text-text-primary mb-6">
                Get Your<br />
                Car <em className="italic accent-gradient-text">Restored.</em>
              </h2>

              <p className="text-sm text-muted leading-relaxed mb-10 max-w-sm">
                Fill the form or reach us directly. We'll get back to you within 24 hours with a free quote.
              </p>

              {/* Info cards */}
              <div className="flex flex-col gap-3">
                {INFO.map(item => (
                  <div
                    key={item.label}
                    className="flex items-center gap-4 p-4 rounded-2xl border border-stroke/50 bg-surface/20 hover:bg-surface/50 transition-colors"
                  >
                    <span className="text-xl flex-shrink-0">{item.icon}</span>
                    <div>
                      <p className="text-[10px] text-muted uppercase tracking-[0.2em] mb-0.5">{item.label}</p>
                      {item.href
                        ? <a href={item.href} className="text-sm text-text-primary hover:accent-gradient-text transition-colors">{item.value}</a>
                        : <p className="text-sm text-text-primary">{item.value}</p>
                      }
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* RIGHT: form */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.15 }}
            >
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full gap-6 py-20 text-center">
                  <div className="w-16 h-16 rounded-full accent-gradient flex items-center justify-center text-2xl">✓</div>
                  <h3 className="font-display text-3xl text-text-primary">Request Sent!</h3>
                  <p className="text-muted text-sm max-w-xs">We'll contact you within 24 hours to confirm your booking.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs text-muted underline underline-offset-4 mt-2"
                  >
                    Send another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 mb-2">
                    <img src={asset('/logo.png')} alt="RCT" className="w-10 h-10 rounded-full" />
                    <div>
                      <p className="text-sm font-medium text-text-primary">Free Quote Request</p>
                      <p className="text-xs text-muted">Reply within 24 hours</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] uppercase tracking-[0.2em] text-muted">Full Name *</label>
                      <input required placeholder="Juan dela Cruz"
                        className="bg-surface/50 border border-stroke rounded-xl px-4 py-3 text-sm text-text-primary placeholder-muted/50 outline-none focus:border-[#cc0000] transition-colors backdrop-blur-sm" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] uppercase tracking-[0.2em] text-muted">Phone / Viber *</label>
                      <input required type="tel" placeholder="+63 9XX XXX XXXX"
                        className="bg-surface/50 border border-stroke rounded-xl px-4 py-3 text-sm text-text-primary placeholder-muted/50 outline-none focus:border-[#cc0000] transition-colors backdrop-blur-sm" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-muted">Car Make &amp; Model</label>
                    <input placeholder="e.g. Toyota Vios 2020"
                      className="bg-surface/50 border border-stroke rounded-xl px-4 py-3 text-sm text-text-primary placeholder-muted/50 outline-none focus:border-[#cc0000] transition-colors backdrop-blur-sm" />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-muted">Service Needed *</label>
                    <select required
                      className="bg-surface/50 border border-stroke rounded-xl px-4 py-3 text-sm text-text-primary outline-none focus:border-[#cc0000] transition-colors backdrop-blur-sm appearance-none cursor-pointer"
                      defaultValue=""
                    >
                      <option value="" disabled>Select a service…</option>
                      <option>Dent &amp; Scratches Repair</option>
                      <option>Full Body Repaint</option>
                      <option>Chassis Undercoat</option>
                      <option>Change Color</option>
                      <option>Multiple / Not Sure</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-muted">Message / Description</label>
                    <textarea rows={4} placeholder="Describe the damage or what you need done…"
                      className="bg-surface/50 border border-stroke rounded-xl px-4 py-3 text-sm text-text-primary placeholder-muted/50 outline-none focus:border-[#cc0000] transition-colors backdrop-blur-sm resize-none" />
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="relative group rounded-full mt-2 overflow-hidden"
                  >
                    <span className="accent-gradient flex items-center justify-center gap-2 px-8 py-4 text-sm font-medium text-white rounded-full transition-opacity hover:opacity-90">
                      {sending ? (
                        <>
                          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4"/>
                          </svg>
                          Sending…
                        </>
                      ) : (
                        <>Send Request ↗</>
                      )}
                    </span>
                  </button>

                  <p className="text-center text-xs text-muted">
                    Or call/message us at{' '}
                    <a href="tel:+639102196374" className="text-text-primary hover:underline">+63 910 219 6374</a>
                  </p>
                </form>
              )}
            </motion.div>

          </div>
        </div>

        {/* ── Footer bar ── */}
        <div className="mt-16 md:mt-20 border-t border-stroke/40">
          <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 py-6 md:py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

            {/* brand */}
            <div className="flex items-center gap-4">
              <img src={asset('/logo.png')} alt="RCT Autopaint" className="w-10 h-10 rounded-full" />
              <div>
                <p className="text-sm font-medium text-text-primary">RCT Autopaint</p>
                <p className="text-xs text-muted">Car Painting Services</p>
              </div>
            </div>

            {/* social links */}
            <div className="flex items-center gap-6">
              {SOCIALS.map(s => (
                <a key={s.label} href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="text-xs text-muted hover:text-text-primary transition-colors uppercase tracking-[0.15em]">
                  {s.label}
                </a>
              ))}
            </div>

            {/* available */}
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-muted">Available for bookings</span>
            </div>
          </div>

          {/* copyright */}
          <div className="border-t border-stroke/20 max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 py-4">
            <p className="text-[10px] text-muted/50 text-center">
              © 2026 RCT Autopaint Car Painting Services · 480-B Magsalin St, Palingon, Taguig City · All rights reserved.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
