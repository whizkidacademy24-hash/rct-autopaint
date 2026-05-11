import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const FB_PAGE = 'https://www.facebook.com/RCTCarPaintingTaguig'
const FB_REVIEWS_URL = 'https://www.facebook.com/RCTCarPaintingTaguig/reviews'

/* Real reviews from Facebook page */
const REVIEWS = [
  {
    name: 'Karen Galvez',
    initials: 'KG',
    date: 'October 26, 2023',
    rating: 5,
    text: 'Ambilis at pulido ng pagawa. Mababait den mga nag-gagawa. Half day lang na naayos yun gasgas sa gilid ng pintuan. Parang ndi nasagi at bago ulit. Thank you po sa inyo. We just found a good auto paint service! 😊',
    service: 'Scratch Repair',
  },
  {
    name: 'Kirk Patrick',
    initials: 'KP',
    date: 'October 18, 2021',
    rating: 5,
    text: 'Highly recommended. Satisfied ako sa ginawa sa sasakyan ko and super accomodating nung staff and ni sir Roly. Thank you!',
    service: 'Car Paint',
  },
  {
    name: 'Wayne Engracia',
    initials: 'WE',
    date: 'August 30, 2020',
    rating: 5,
    text: 'Thumbs up po kia Kuya na very friendly at accommodating ng extra mile. Maganda po and unnoticeable yung naging damage after the repaint. Very recommendable!',
    service: 'Full Repaint',
  },
  {
    name: 'Clarisse Clarin',
    initials: 'CC',
    date: 'March 3, 2021',
    rating: 5,
    text: 'Super bait po nila and nagawa agad! Thank you!!',
    service: 'Car Painting',
  },
  {
    name: 'Donnie Tamayo',
    initials: 'DT',
    date: 'September 25, 2020',
    rating: 5,
    text: 'Kung alam kaayo kaulas, mas maayus pa gumawa! Sobrang accomodating and consistent ang updates! Satisfied Customer here!',
    service: 'Auto Paint',
  },
]

/* Facebook icon */
function FbIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  )
}

/* Star row */
function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24"
          fill={i < n ? '#cc0000' : 'none'} stroke={i < n ? '#cc0000' : 'rgba(255,255,255,0.2)'} strokeWidth="1.5">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </div>
  )
}

export default function Reviews() {
  const [active, setActive] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)

  const prev = () => setActive(i => Math.max(0, i - 1))
  const next = () => setActive(i => Math.min(REVIEWS.length - 1, i + 1))

  return (
    <section className="bg-bg py-16 md:py-24 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">

        {/* ── Header ── */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 md:mb-16 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">Customer Reviews</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display tracking-tight leading-[1.0]">
              What Clients{' '}
              <em className="italic accent-gradient-text">Say</em>
            </h2>
            <p className="mt-4 text-sm text-muted max-w-xs leading-relaxed">
              Real reviews from our Facebook page — 4.5K+ happy customers.
            </p>
          </div>

          {/* FB page link button */}
          <a
            href={FB_PAGE}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex relative group rounded-full self-start md:self-end"
          >
            <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 flex items-center gap-2.5 border border-stroke rounded-full px-5 py-2.5 text-sm text-muted group-hover:text-text-primary bg-bg transition-colors">
              <FbIcon size={16} />
              See all reviews on Facebook
            </span>
          </a>
        </motion.div>

        {/* ── FB page banner screenshot ── */}
        <motion.div
          className="relative rounded-3xl overflow-hidden mb-10 md:mb-14 border border-stroke/50 group"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <img
            src="/rct-flyer.png"
            alt="RCT CAR Painting Services"
            className="w-full object-cover object-center max-h-[260px] md:max-h-[340px] transition-transform duration-700 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent" />
          <div className="absolute bottom-5 left-6 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full accent-gradient flex items-center justify-center">
              <FbIcon size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold text-text-primary">RCT CAR Painting Services</p>
              <p className="text-xs text-muted">4.5K followers · Taguig City · ⭐ Recommended</p>
            </div>
            <a
              href={FB_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 text-xs px-4 py-1.5 accent-gradient rounded-full text-white font-medium hidden sm:block"
            >
              Visit Page →
            </a>
          </div>
        </motion.div>

        {/* ── Review cards grid (desktop) ── */}
        <div className="hidden md:grid grid-cols-3 gap-4 mb-6">
          {REVIEWS.slice(0, 3).map((rev, i) => (
            <motion.div
              key={rev.name}
              className="relative p-6 rounded-2xl bg-surface border border-stroke hover:border-[#cc0000]/40 transition-all duration-300 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
            >
              <Stars n={rev.rating} />
              <p className="mt-4 text-sm text-muted leading-relaxed italic">"{rev.text}"</p>
              <div className="mt-5 pt-4 border-t border-stroke/40 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full accent-gradient flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {rev.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">{rev.name}</p>
                  <p className="text-[10px] text-muted">{rev.date}</p>
                </div>
                <span className="ml-auto text-[10px] uppercase tracking-[0.15em] text-muted border border-stroke rounded-full px-2 py-0.5">
                  {rev.service}
                </span>
              </div>
              {/* FB icon */}
              <div className="absolute top-4 right-4 text-[#1877F2] opacity-40 group-hover:opacity-70 transition-opacity">
                <FbIcon size={14} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* second row — 2 cards centered */}
        <div className="hidden md:flex justify-center gap-4 mb-10">
          {REVIEWS.slice(3).map((rev, i) => (
            <motion.div
              key={rev.name}
              className="relative p-6 rounded-2xl bg-surface border border-stroke hover:border-[#cc0000]/40 transition-all duration-300 group w-full max-w-[380px]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 + 0.3 }}
            >
              <Stars n={rev.rating} />
              <p className="mt-4 text-sm text-muted leading-relaxed italic">"{rev.text}"</p>
              <div className="mt-5 pt-4 border-t border-stroke/40 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full accent-gradient flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {rev.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">{rev.name}</p>
                  <p className="text-[10px] text-muted">{rev.date}</p>
                </div>
                <span className="ml-auto text-[10px] uppercase tracking-[0.15em] text-muted border border-stroke rounded-full px-2 py-0.5">
                  {rev.service}
                </span>
              </div>
              <div className="absolute top-4 right-4 text-[#1877F2] opacity-40 group-hover:opacity-70 transition-opacity">
                <FbIcon size={14} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Mobile: swipeable carousel ── */}
        <div className="md:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="p-6 rounded-2xl bg-surface border border-stroke"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35 }}
            >
              <Stars n={REVIEWS[active].rating} />
              <p className="mt-4 text-sm text-muted leading-relaxed italic">"{REVIEWS[active].text}"</p>
              <div className="mt-5 pt-4 border-t border-stroke/40 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full accent-gradient flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {REVIEWS[active].initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">{REVIEWS[active].name}</p>
                  <p className="text-[10px] text-muted">{REVIEWS[active].date}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* dots + arrows */}
          <div className="flex items-center justify-between mt-5">
            <button
              onClick={prev}
              disabled={active === 0}
              className="w-9 h-9 rounded-full border border-stroke flex items-center justify-center text-muted disabled:opacity-30 hover:border-[#cc0000] hover:text-text-primary transition-all"
            >
              ←
            </button>
            <div className="flex gap-1.5">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`rounded-full transition-all duration-300 ${i === active ? 'w-5 h-1.5 accent-gradient' : 'w-1.5 h-1.5 bg-stroke'}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              disabled={active === REVIEWS.length - 1}
              className="w-9 h-9 rounded-full border border-stroke flex items-center justify-center text-muted disabled:opacity-30 hover:border-[#cc0000] hover:text-text-primary transition-all"
            >
              →
            </button>
          </div>
        </div>

        {/* ── CTA to FB reviews ── */}
        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 border-t border-stroke/30"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-sm text-muted text-center">
            ⭐⭐⭐⭐⭐ &nbsp;Rated <strong className="text-text-primary">5.0</strong> on Facebook by our clients
          </p>
          <a
            href={FB_PAGE}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group rounded-full"
          >
            <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 flex items-center gap-2 accent-gradient text-white rounded-full px-6 py-2.5 text-sm font-medium">
              <FbIcon size={15} />
              Follow us on Facebook
            </span>
          </a>
        </motion.div>

      </div>
    </section>
  )
}
