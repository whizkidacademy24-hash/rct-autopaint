import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { asset } from '../lib/asset'

interface StatItem { value: number; suffix: string; label: string; sub: string }

const STATS: StatItem[] = [
  { value: 500, suffix: '+', label: 'Cars Restored',    sub: 'And counting — every job done right.' },
  { value: 10,  suffix: '+', label: 'Years Experience', sub: 'Trusted craft, proven results.' },
  { value: 100, suffix: '%', label: 'Quality Guarantee',sub: 'We don\'t stop until it\'s perfect.' },
]

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [display, setDisplay] = useState(0)
  const ref     = useRef<HTMLSpanElement>(null)
  const inView  = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    if (!inView) return
    const duration = 1800
    const start    = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3) // ease-out cubic
      setDisplay(Math.floor(eased * value))
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, value])

  return (
    <span ref={ref} className="tabular-nums">
      {display}{suffix}
    </span>
  )
}

export default function Stats() {
  return (
    <section className="relative bg-bg py-16 md:py-28 overflow-hidden">

      {/* subtle red glow bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(204,0,0,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">

        {/* header */}
        <motion.div
          className="flex items-center gap-3 mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-8 h-px bg-stroke" />
          <span className="text-xs text-muted uppercase tracking-[0.3em]">By the numbers</span>
        </motion.div>

        {/* grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="relative group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.15 }}
            >
              {/* separator line (desktop) */}
              {i > 0 && (
                <div className="hidden md:block absolute -left-3 top-1/4 bottom-1/4 w-px bg-stroke" />
              )}

              {/* number */}
              <div className="font-display text-[clamp(4rem,10vw,7rem)] leading-none tracking-tight mb-4">
                <span className="text-text-primary/10 select-none absolute text-[clamp(5rem,14vw,10rem)] -top-4 -left-2 pointer-events-none font-display leading-none">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="relative accent-gradient-text">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </span>
              </div>

              {/* label */}
              <h3 className="text-xl md:text-2xl font-display text-text-primary mb-2 leading-tight">
                {stat.label}
              </h3>

              {/* sub */}
              <p className="text-sm text-muted leading-relaxed">{stat.sub}</p>

              {/* bottom line accent */}
              <div className="mt-6 w-12 h-[2px] accent-gradient rounded-full opacity-60 group-hover:w-24 transition-all duration-500" />
            </motion.div>
          ))}
        </div>

        {/* bottom tagline */}
        <motion.div
          className="mt-20 md:mt-28 pt-10 border-t border-stroke/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <p className="text-2xl md:text-3xl font-display italic text-text-primary/60 leading-tight max-w-sm">
            "Hindi Presyong Casa.<br />
            <span className="text-text-primary">Mabilis. Maayos. Gumawa."</span>
          </p>
          <div className="flex items-center gap-4">
            <img src={asset('/logo.png')} alt="RCT Autopaint" className="w-14 h-14 rounded-full" />
            <div>
              <p className="text-sm font-medium text-text-primary">RCT Autopaint</p>
              <p className="text-xs text-muted">480-B Magsalin St, Taguig City</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
