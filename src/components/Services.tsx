import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { asset } from '../lib/asset'

/* ── per-card cycling image hook ── */
function useCycle(imgs: string[], interval = 3000) {
  const [idx,  setIdx]  = useState(0)
  const [show, setShow] = useState(true)

  useEffect(() => {
    if (imgs.length < 2) return
    const id = setInterval(() => {
      setShow(false)
      setTimeout(() => { setIdx(i => (i + 1) % imgs.length); setShow(true) }, 550)
    }, interval)
    return () => clearInterval(id)
  }, [imgs, interval])

  return { src: imgs[idx], show }
}

function CycleImg({ imgs, alt }: { imgs: string[]; alt: string }) {
  const { src, show } = useCycle(imgs)
  return (
    <img
      src={src} alt={alt}
      className="w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-105"
      style={{ opacity: show ? 1 : 0 }}
    />
  )
}

/* ── service definitions ── */
const SERVICES = [
  {
    id: '01',
    title: 'Dent & Scratches Repair',
    subtitle: 'Precision Body Repair',
    desc: 'Expert removal of dents, dings and deep scratches with seamless colour-matched repainting. From minor door dings to major panel damage — restored to factory condition.',
    imgs: [
      asset('/dent-repair-ba.jpg'),
      asset('/puller.jpg'),
      asset('/dent-work.jpg'),
      asset('/body-damage.jpg'),
      asset('/stud-welder.jpg'),
      asset('/img2.jpg'),
    ],
    col: 'md:col-span-7',
    h: 'h-[300px] md:h-[380px]',
    tags: ['Paintless Dent Removal', 'OEM Colour Match', 'Same-day Repair'],
  },
  {
    id: '02',
    title: 'Full Body Repaint',
    subtitle: 'Complete Respray',
    desc: 'Strip, sand, prime and a flawless topcoat that lasts. Complete exterior respray from prep to final clear coat — showroom finish guaranteed.',
    imgs: [
      asset('/spray-red-booth.jpg'),
      asset('/spray-gun-kneeling.jpg'),
      asset('/custom-fullpaint.jpg'),
      asset('/spray-car.jpg'),
      asset('/img4.png'),
      asset('/paint-mixing.jpg'),
    ],
    col: 'md:col-span-5',
    h: 'h-[300px] md:h-[380px]',
    tags: ['Full Prep & Prime', 'Premium Topcoat', 'Clear Coat Polish'],
    featured: true,
  },
  {
    id: '03',
    title: 'Chassis Undercoat',
    subtitle: 'Underbody Protection',
    desc: 'Heavy-duty rubberized undercoating applied to your chassis — protecting against rust, corrosion, road noise and moisture damage from the ground up.',
    imgs: [
      asset('/undercoating.jpg'),
      asset('/undercoat.jpg'),
    ],
    col: 'md:col-span-5',
    h: 'h-[300px] md:h-[380px]',
    tags: ['Anti-rust Coating', 'Sound Deadening', 'Long-lasting'],
  },
  {
    id: '04',
    title: 'Change Color',
    subtitle: 'Full Color Transformation',
    desc: 'Complete identity change. Choose from 500+ OEM & custom shades — matte, gloss, satin or metallic. Your car, your color.',
    imgs: [
      asset('/change-color1.jpg'),
      asset('/change-color.jpg'),
      asset('/change-color2.jpg'),
      asset('/metalflake-paint.jpg'),
    ],
    col: 'md:col-span-7',
    h: 'h-[300px] md:h-[380px]',
    tags: ['500+ Shades', 'Matte & Gloss', 'Metallic Finishes'],
  },
]

const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const, delay: i * 0.1 },
  }),
}

export default function Services() {
  return (
    <section id="services" className="bg-bg py-16 md:py-24">
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
              <span className="text-xs text-muted uppercase tracking-[0.3em]">What We Do</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display tracking-tight leading-[1.0]">
              Our <em className="italic accent-gradient-text">Services</em>
            </h2>
            <p className="mt-4 text-sm text-muted max-w-xs leading-relaxed">
              Precision auto body work backed by years of expertise and OEM-grade materials.
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
              Book a service →
            </span>
          </a>
        </motion.div>

        {/* ── Bento grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
          {SERVICES.map((svc, i) => (
            <motion.div
              key={svc.id}
              className={`${svc.col} group relative overflow-hidden rounded-3xl bg-surface border border-stroke cursor-pointer`}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              <div className={`relative overflow-hidden ${svc.h}`}>

                {/* cycling images */}
                <CycleImg imgs={svc.imgs} alt={svc.title} />

                {/* cycling dots indicator */}
                {svc.imgs.length > 1 && (
                  <div className="absolute bottom-14 right-4 z-20 flex gap-1">
                    {svc.imgs.map((_, di) => (
                      <span key={di} className="w-1 h-1 rounded-full bg-white/25" />
                    ))}
                  </div>
                )}

                {/* overlays */}
                <div className="halftone absolute inset-0 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />

                {/* featured badge */}
                {svc.featured && (
                  <div className="absolute top-4 left-4 z-20">
                    <span className="text-[10px] uppercase tracking-[0.2em] accent-gradient text-white px-3 py-1 rounded-full font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* service number */}
                <div className="absolute top-4 right-5 z-20">
                  <span className="font-display text-5xl text-white/10 leading-none select-none">{svc.id}</span>
                </div>

                {/* hover overlay */}
                <div className="absolute inset-0 bg-bg/78 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm z-10" />

                {/* hover content */}
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 p-6 text-center">
                  <div className="relative mb-4">
                    <span className="absolute inset-[-2px] rounded-full accent-gradient" />
                    <span className="relative block bg-surface rounded-full px-5 py-2 text-sm font-medium text-text-primary z-10">
                      {svc.subtitle} ↗
                    </span>
                  </div>
                  <p className="text-sm text-muted leading-relaxed max-w-xs">{svc.desc}</p>
                  <div className="flex flex-wrap gap-2 justify-center mt-4">
                    {svc.tags.map(tag => (
                      <span key={tag} className="text-[10px] uppercase tracking-[0.12em] text-muted border border-stroke/80 rounded-full px-3 py-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href="https://m.me/RCTCarPaintingTaguig"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 text-xs accent-gradient-text font-semibold uppercase tracking-widest hover:opacity-80 transition-opacity"
                  >
                    Book This Service →
                  </a>
                </div>

                {/* always-visible bottom title */}
                <div className="absolute bottom-0 left-0 right-0 z-10 p-5 group-hover:opacity-0 transition-opacity duration-200">
                  <h3 className="font-display text-xl md:text-2xl text-text-primary leading-tight">{svc.title}</h3>
                  <p className="text-xs text-muted mt-1 uppercase tracking-[0.15em]">{svc.subtitle}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
