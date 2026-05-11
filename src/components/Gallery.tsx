import { motion } from 'framer-motion'

const WORK = [
  {
    title: 'Full Front-End Collision Repair',
    type: 'Full Body Repair',
    desc: 'Complete structural and cosmetic restoration after major front impact. Panel beating, alignment and full respray.',
    img: '/img1.jpg',
    date: 'Apr 2026',
    time: '3 day job',
  },
  {
    title: 'Hood Dent — Before & After',
    type: 'Dent Repair',
    desc: 'Precision paintless dent removal on hood panel. Completely unnoticeable after repair — no repainting needed.',
    img: '/dent-repair-ba.jpg',
    date: 'Mar 2026',
    time: '½ day job',
  },
  {
    title: 'Side Panel Dent Removal',
    type: 'Dent & Repaint',
    desc: 'Large door panel dent removed and colour-matched respray on Toyota RAV4. Looks brand new.',
    img: '/img2.jpg',
    date: 'Mar 2026',
    time: '1 day job',
  },
  {
    title: 'Color Change — Silver to Blue',
    type: 'Change Color',
    desc: 'Porsche 911 full color transformation from silver to deep electric blue. Flawless gloss finish.',
    img: '/change-color1.jpg',
    date: 'Feb 2026',
    time: '4 day job',
  },
  {
    title: 'Color Change — White to Red',
    type: 'Change Color',
    desc: 'Complete exterior color change from pearl white to candy red. Every panel resprayed to match.',
    img: '/change-color.jpg',
    date: 'Jan 2026',
    time: '3 day job',
  },
  {
    title: 'Full Body Respray in Paint Booth',
    type: 'Full Body Repaint',
    desc: 'Complete exterior respray in professional spray booth. Prep, prime, colour coat and clear coat.',
    img: '/spray-red-booth.jpg',
    date: 'Jan 2026',
    time: '4 day job',
  },
]

export default function Gallery() {
  return (
    <section id="gallery" className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">

        {/* ── Header ── */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">Real Results</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display tracking-tight leading-[1.0]">
              Before &amp;{' '}
              <em className="italic accent-gradient-text">After</em>
            </h2>
            <p className="mt-4 text-sm text-muted max-w-xs leading-relaxed">
              Every car that comes in damaged leaves looking showroom-new.
            </p>
          </div>
          <a
            href="https://m.me/RCTCarPaintingTaguig"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex relative group rounded-full self-end"
          >
            <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 flex items-center gap-2 border border-stroke rounded-full px-5 py-2.5 text-sm text-muted group-hover:text-text-primary bg-bg transition-colors">
              Book your car →
            </span>
          </a>
        </motion.div>

        {/* ── Pill list ── */}
        <div className="flex flex-col gap-3 md:gap-3.5">
          {WORK.map((item, i) => (
            <motion.div
              key={item.title}
              className="
                group flex items-center gap-4 md:gap-6 p-3 md:p-4
                rounded-[28px] sm:rounded-full
                bg-surface/20 hover:bg-surface
                border border-stroke/60 hover:border-stroke
                cursor-pointer transition-all duration-300
              "
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.07 }}
            >
              {/* index */}
              <span className="hidden sm:flex w-8 text-xs font-display text-muted/40 tabular-nums flex-shrink-0 justify-end">
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* thumbnail */}
              <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-2xl overflow-hidden flex-shrink-0">
                <img
                  src={item.img} alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>

              {/* text */}
              <div className="flex-1 min-w-0">
                <p className="text-[10px] md:text-xs text-muted uppercase tracking-[0.2em] mb-0.5">{item.type}</p>
                <h3 className="text-sm md:text-base text-text-primary font-medium leading-tight truncate">
                  {item.title}
                </h3>
                <p className="hidden md:block text-xs text-muted mt-0.5 truncate">{item.desc}</p>
              </div>

              {/* meta */}
              <div className="hidden sm:flex flex-col items-end gap-1 flex-shrink-0 mr-2">
                <span className="text-xs text-muted">{item.time}</span>
                <span className="text-[10px] text-muted/50">{item.date}</span>
              </div>

              {/* arrow */}
              <div className="relative group/arrow rounded-full flex-shrink-0">
                <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center justify-center w-9 h-9 rounded-full border border-stroke bg-surface text-muted group-hover:text-text-primary transition-colors text-sm">
                  →
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
