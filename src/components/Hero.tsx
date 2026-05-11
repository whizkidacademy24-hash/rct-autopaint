import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const VIDEOS = ['/hero-bg.mp4', '/hero-2.mp4']
const ROLES  = ['Restore', 'Repaint', 'Revive', 'Renew']

export default function Hero() {
  const sectionRef  = useRef<HTMLElement>(null)
  const videoRef    = useRef<HTMLVideoElement>(null)
  const canvasRef   = useRef<HTMLCanvasElement>(null)
  const framesRef   = useRef<ImageBitmap[]>([])
  const rafRef      = useRef<number>(0)

  const [roleIdx,   setRoleIdx]   = useState(0)
  const [vidIdx,    setVidIdx]    = useState(0)
  const [reversed,  setReversed]  = useState(false)
  const [capturing, setCapturing] = useState(false)

  /* ── role cycling every 2s ── */
  useEffect(() => {
    const id = setInterval(() => setRoleIdx(i => (i + 1) % ROLES.length), 2000)
    return () => clearInterval(id)
  }, [])

  /* ── GSAP entrance ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ ease: 'power3.out', delay: 0.2 })
      tl.fromTo('.hero-name',
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1.2 })
      tl.fromTo('.blur-in',
        { opacity: 0, filter: 'blur(12px)', y: 20 },
        { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1, stagger: 0.12 },
        '<0.25')
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  /* ── capture frames then play in reverse on canvas ── */
  useEffect(() => {
    const video  = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return

    const ctx = canvas.getContext('2d')!
    framesRef.current = []
    setReversed(false)
    setCapturing(false)
    cancelAnimationFrame(rafRef.current)

    const onMeta = () => {
      canvas.width  = video.videoWidth  || 1920
      canvas.height = video.videoHeight || 1080
    }

    /* Capture every frame into ImageBitmaps while playing */
    let lastTime = -1
    const captureLoop = () => {
      if (!video.paused && !video.ended) {
        if (video.currentTime !== lastTime) {
          lastTime = video.currentTime
          createImageBitmap(video).then(bm => {
            framesRef.current.push(bm)
            /* also draw live to canvas while capturing */
            ctx.drawImage(bm, 0, 0, canvas.width, canvas.height)
          })
        }
        rafRef.current = requestAnimationFrame(captureLoop)
      }
    }

    const onPlay = () => {
      setCapturing(true)
      rafRef.current = requestAnimationFrame(captureLoop)
    }

    const onEnded = () => {
      cancelAnimationFrame(rafRef.current)
      setCapturing(false)

      /* hide <video>, show canvas for reverse playback */
      video.style.opacity = '0'
      setReversed(true)

      const frames = framesRef.current
      if (frames.length === 0) {
        /* fallback: just advance to next video */
        advanceVideo()
        return
      }

      let fi = frames.length - 1
      const FPS = 30
      const MS  = 1000 / FPS
      let last  = performance.now()

      const reverseLoop = (now: number) => {
        if (now - last >= MS) {
          last = now
          ctx.drawImage(frames[fi], 0, 0, canvas.width, canvas.height)
          fi--
        }
        if (fi >= 0) {
          rafRef.current = requestAnimationFrame(reverseLoop)
        } else {
          /* reverse done → advance to next video */
          advanceVideo()
        }
      }
      rafRef.current = requestAnimationFrame(reverseLoop)
    }

    const advanceVideo = () => {
      framesRef.current.forEach(bm => bm.close())
      framesRef.current = []
      setVidIdx(i => (i + 1) % VIDEOS.length)
    }

    video.addEventListener('loadedmetadata', onMeta)
    video.addEventListener('play', onPlay)
    video.addEventListener('ended', onEnded)
    video.style.opacity = '1'
    video.load()
    video.play().catch(() => {/* autoplay blocked — silent */})

    return () => {
      cancelAnimationFrame(rafRef.current)
      video.removeEventListener('loadedmetadata', onMeta)
      video.removeEventListener('play', onPlay)
      video.removeEventListener('ended', onEnded)
      framesRef.current.forEach(bm => bm.close())
      framesRef.current = []
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vidIdx])

  return (
    <section ref={sectionRef} id="home" className="relative h-screen overflow-hidden flex items-center justify-center">

      {/* ── Background video ── */}
      <video
        ref={videoRef}
        key={vidIdx}
        src={VIDEOS[vidIdx]}
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
        style={{ zIndex: 0 }}
      />

      {/* ── Canvas for reverse playback ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0, opacity: reversed || capturing ? 1 : 0, pointerEvents: 'none' }}
      />

      {/* ── Overlays ── */}
      <div className="absolute inset-0 bg-black/55 z-[1]" />
      <div className="absolute inset-0 z-[2]"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(204,0,0,0.08) 0%, transparent 70%)' }}
      />
      {/* bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent z-[3]" />

      {/* ── Content ── */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">

        {/* eyebrow */}
        <p className="blur-in text-xs text-muted uppercase tracking-[0.35em] mb-8">
          Car Painting Services · Taguig City
        </p>

        {/* main heading */}
        <h1 className="hero-name font-display text-[clamp(3.5rem,12vw,8rem)] leading-[0.92] tracking-tight text-text-primary mb-4">
          RCT<br />
          <em className="not-italic accent-gradient-text">Autopaint</em>
        </h1>

        {/* role line */}
        <p className="blur-in text-base md:text-lg text-muted mb-4">
          We{' '}
          <span
            key={roleIdx}
            className="inline-block font-display italic text-text-primary animate-role-fade-in"
          >
            {ROLES[roleIdx]}
          </span>
          {' '}your car.
        </p>

        {/* description */}
        <p className="blur-in text-sm md:text-base text-muted max-w-md mx-auto mb-10 leading-relaxed">
          Professional auto body repair &amp; painting in Palingon, Taguig.<br />
          <span className="text-text-primary/70 font-medium">Mabilis · Maayos · Gumawa.</span>
        </p>

        {/* CTAs */}
        <div className="blur-in flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="#services"
            onClick={e => { e.preventDefault(); document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="
              relative group rounded-full text-sm font-medium px-7 py-3.5
              bg-text-primary text-bg hover:scale-105 transition-transform duration-200
              overflow-hidden
            "
          >
            <span className="relative z-10">See Services</span>
          </a>
          <a
            href="https://m.me/RCTCarPaintingTaguig"
            target="_blank"
            rel="noopener noreferrer"
            className="
              relative group rounded-full text-sm font-medium px-7 py-3.5
              border-2 border-stroke bg-transparent text-text-primary
              hover:scale-105 transition-transform duration-200
            "
          >
            <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 bg-bg rounded-full px-7 py-3.5 -m-[2px] flex">
              Book Free Quote
            </span>
          </a>
        </div>

      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3">
        <span className="text-[10px] text-muted uppercase tracking-[0.25em]">Scroll</span>
        <div className="relative w-px h-10 overflow-hidden bg-stroke/50">
          <span className="absolute inset-0 accent-gradient animate-scroll-down" />
        </div>
      </div>

    </section>
  )
}
