import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const WORDS = ['Restore.', 'Repaint.', 'Revive.']
const DURATION = 2700

interface Props { onComplete: () => void }

export default function LoadingScreen({ onComplete }: Props) {
  const [count, setCount]       = useState(0)
  const [wordIdx, setWordIdx]   = useState(0)
  const rafRef  = useRef<number>(0)
  const startRef = useRef<number>(0)

  /* ── counter via rAF ── */
  useEffect(() => {
    const tick = (ts: number) => {
      if (!startRef.current) startRef.current = ts
      const progress = Math.min((ts - startRef.current) / DURATION, 1)
      setCount(Math.floor(progress * 100))
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setTimeout(onComplete, 400)
      }
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [onComplete])

  /* ── cycle words ── */
  useEffect(() => {
    const id = setInterval(() => setWordIdx(i => (i + 1) % WORDS.length), 900)
    return () => clearInterval(id)
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-bg flex flex-col items-center justify-center overflow-hidden"
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* background grid lines */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(204,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(204,0,0,1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* top-left label */}
      <motion.div
        className="absolute top-8 left-8 md:top-10 md:left-10 text-xs text-muted uppercase tracking-[0.3em]"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        RCT Autopaint
      </motion.div>

      {/* top-right service tag */}
      <motion.div
        className="absolute top-8 right-8 md:top-10 md:right-10 text-xs text-muted uppercase tracking-[0.3em]"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Car Painting Services
      </motion.div>

      {/* center word */}
      <AnimatePresence mode="wait">
        <motion.p
          key={wordIdx}
          className="text-5xl md:text-7xl lg:text-8xl font-display italic text-text-primary/80 select-none"
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -24, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {WORDS[wordIdx]}
        </motion.p>
      </AnimatePresence>

      {/* small location line */}
      <motion.p
        className="mt-6 text-xs text-muted tracking-[0.2em] uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        Palingon, Taguig City
      </motion.p>

      {/* bottom-right counter */}
      <div className="absolute bottom-10 right-10 overflow-hidden">
        <span className="text-7xl md:text-9xl font-display text-text-primary tabular-nums leading-none">
          {String(count).padStart(3, '0')}
        </span>
      </div>

      {/* bottom-left percent */}
      <div className="absolute bottom-10 left-10">
        <span className="text-xs text-muted uppercase tracking-[0.25em]">Loading</span>
      </div>

      {/* progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-stroke/40">
        <div
          className="h-full accent-gradient"
          style={{
            width: `${count}%`,
            transformOrigin: 'left center',
            boxShadow: '0 0 10px rgba(204,0,0,0.5)',
            transition: 'width 0.05s linear',
          }}
        />
      </div>
    </motion.div>
  )
}
