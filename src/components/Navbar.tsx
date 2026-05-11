import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { asset } from '../lib/asset'

const LINKS = [
  { label: 'Home',     href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Gallery',  href: '#gallery' },
  { label: 'Contact',  href: '#contact' },
]

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [active,    setActive]    = useState('Home')
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [logoHover, setLogoHover] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* smooth-scroll + close mobile menu */
  const handleNav = (href: string, label: string) => {
    setActive(label)
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4 pointer-events-none">
      <motion.nav
        className={`
          pointer-events-auto inline-flex items-center rounded-full
          backdrop-blur-md border border-white/10 bg-surface/80 px-2 py-2
          transition-shadow duration-300
          ${scrolled ? 'shadow-lg shadow-black/40' : ''}
        `}
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
      >
        {/* ── Logo ── */}
        <motion.button
          onClick={() => handleNav('#home', 'Home')}
          onHoverStart={() => setLogoHover(true)}
          onHoverEnd={() => setLogoHover(false)}
          whileHover={{ scale: 1.1 }}
          className="relative w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
        >
          {/* gradient ring */}
          <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-80" />
          {/* inner */}
          <span className="relative w-full h-full rounded-full bg-bg flex items-center justify-center z-10">
            <img src={asset('/logo.png')} alt="RCT" className="w-7 h-7 rounded-full object-cover" />
          </span>
        </motion.button>

        {/* ── Divider ── */}
        <span className="hidden sm:block w-px h-5 bg-stroke mx-2 opacity-60" />

        {/* ── Nav links (desktop) ── */}
        <div className="hidden sm:flex items-center gap-1">
          {LINKS.map(({ label, href }) => (
            <button
              key={label}
              onClick={() => handleNav(href, label)}
              className={`
                text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-all duration-200
                ${active === label
                  ? 'text-text-primary bg-stroke/60'
                  : 'text-muted hover:text-text-primary hover:bg-stroke/40'}
              `}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ── Divider ── */}
        <span className="hidden sm:block w-px h-5 bg-stroke mx-2 opacity-60" />

        {/* ── CTA ── */}
        <a
          href="tel:+639102196374"
          className="relative group rounded-full flex-shrink-0"
        >
          {/* gradient border on hover */}
          <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="relative flex items-center gap-1.5 bg-surface rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-text-primary z-10">
            Call Us ↗
          </span>
        </a>

        {/* ── Hamburger (mobile) ── */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          className="sm:hidden ml-2 flex flex-col gap-[5px] px-2 py-1"
          aria-label="Menu"
        >
          <span className={`block w-5 h-[1.5px] bg-text-primary transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
          <span className={`block w-5 h-[1.5px] bg-text-primary transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-[1.5px] bg-text-primary transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
        </button>
      </motion.nav>

      {/* ── Mobile menu ── */}
      {menuOpen && (
        <motion.div
          className="pointer-events-auto absolute top-20 left-4 right-4 rounded-2xl bg-surface/95 backdrop-blur-md border border-stroke/60 p-4 flex flex-col gap-1"
          initial={{ opacity: 0, y: -10, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.97 }}
          transition={{ duration: 0.2 }}
        >
          {LINKS.map(({ label, href }) => (
            <button
              key={label}
              onClick={() => handleNav(href, label)}
              className={`
                text-sm rounded-xl px-4 py-3 text-left transition-all duration-200
                ${active === label
                  ? 'text-text-primary bg-stroke/60'
                  : 'text-muted hover:text-text-primary hover:bg-stroke/30'}
              `}
            >
              {label}
            </button>
          ))}
          <a
            href="tel:+639102196374"
            className="mt-2 text-sm font-medium text-center rounded-xl px-4 py-3 accent-gradient text-white"
          >
            +63 910 219 6374
          </a>
        </motion.div>
      )}
    </header>
  )
}
