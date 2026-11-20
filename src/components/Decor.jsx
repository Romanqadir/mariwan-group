import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { Volume2, VolumeX } from 'lucide-react'
import { decorList, reels, socials } from '../data/site'
import { SectionHeading, ease } from './ui'
import { Instagram } from './icons'
import Lightbox from './Lightbox'

// Vertical video that plays only while visible on screen (saves data on phones)
function Reel({ r, i }) {
  const ref = useRef(null)
  const [muted, setMuted] = useState(true)
  useEffect(() => {
    const v = ref.current
    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()),
      { threshold: 0.4 },
    )
    io.observe(v)
    return () => io.disconnect()
  }, [])
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.9, ease, delay: i * 0.08 }}
      className="relative aspect-[9/16] w-[62vw] sm:w-[260px] shrink-0 snap-center overflow-hidden rounded-3xl bg-ink-3 border border-white/5"
    >
      <video
        ref={ref}
        src={r.src}
        poster={r.poster}
        muted={muted}
        loop
        playsInline
        preload="none"
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent pointer-events-none" />
      <button
        onClick={() => setMuted((m) => !m)}
        className="absolute bottom-4 left-4 grid h-10 w-10 place-items-center rounded-full bg-ink/50 backdrop-blur border border-white/20"
        aria-label={muted ? 'دەنگ' : 'بێدەنگ'}
      >
        {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>
    </motion.div>
  )
}

export default function Decor() {
  const [active, setActive] = useState(null)
  const insta = socials[1]
  return (
    <section id="decor" className="py-24 md:py-36 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <SectionHeading
            eyebrow="Decor & Design"
            title={<>دیزاین و <span className="gold-text">دیکۆری</span> ئاهەنگ</>}
            text="لە گوڵ و ڕووناکییەوە بۆ کۆشک و تەختی بووک و زاوا — هەموو وردەکارییەک بە دەستی تیمەکەمان دیزاین دەکرێت."
          />
          <a
            href={insta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-12 md:mb-16 inline-flex items-center gap-2 self-start md:self-auto rounded-full border border-white/15 px-5 py-3 text-sm hover:border-gold hover:text-gold transition"
          >
            <Instagram width={18} height={18} /> <span dir="ltr">{insta.handle}</span>
          </a>
        </div>
      </div>

      {/* Reels row */}
      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-4 md:px-8 pb-4 [scrollbar-width:none] max-w-7xl mx-auto">
        {reels.map((r, i) => (
          <Reel key={r.src} r={r} i={i} />
        ))}
      </div>

      {/* Photo grid */}
      <div className="mx-auto max-w-7xl px-4 md:px-8 mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {decorList.map((p, i) => (
          <motion.button
            key={p.src}
            onClick={() => setActive(i)}
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.8, ease, delay: (i % 4) * 0.08 }}
            className={`group relative overflow-hidden rounded-2xl bg-ink-3 ${i === 0 || i === 5 ? 'md:row-span-2 aspect-[3/4] md:aspect-auto' : 'aspect-[3/4]'}`}
            aria-label={`دیکۆر ${i + 1}`}
          >
            <img
              src={p.thumb}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
            />
            <span className="absolute inset-0 ring-1 ring-inset ring-white/5 rounded-2xl" />
          </motion.button>
        ))}
      </div>

      <Lightbox images={decorList} index={active} onClose={() => setActive(null)} onChange={setActive} />
    </section>
  )
}
