import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Play, X } from 'lucide-react'
import { films } from '../data/site'
import { SectionHeading, ease } from './ui'

function Player({ film, onClose }) {
  useEffect(() => {
    if (!film) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [film, onClose])

  return (
    <AnimatePresence>
      {film && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/95 backdrop-blur-md p-3 md:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <button
            onClick={onClose}
            className="absolute top-4 left-4 md:top-6 md:left-6 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/10 hover:bg-white/20"
            aria-label="داخستن"
          >
            <X size={22} />
          </button>
          <motion.video
            key={film.src}
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ duration: 0.5, ease }}
            onClick={(e) => e.stopPropagation()}
            src={film.src}
            poster={film.poster}
            controls
            autoPlay
            playsInline
            className="max-h-full w-full max-w-6xl rounded-xl bg-black shadow-2xl"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Films() {
  const [active, setActive] = useState(null)
  const [main, ...rest] = films

  const Card = ({ f, big, i }) => (
    <motion.button
      onClick={() => setActive(f)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.9, ease, delay: (i % 3) * 0.1 }}
      className={`group relative block w-full overflow-hidden rounded-3xl bg-ink-3 text-right ${big ? 'aspect-video lg:aspect-[21/9]' : 'aspect-video'}`}
    >
      <img
        src={f.poster}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
      <div className="absolute inset-0 grid place-items-center">
        <span className={`relative grid place-items-center rounded-full bg-ivory/15 backdrop-blur-md border border-ivory/30 transition-all duration-500 group-hover:bg-gold group-hover:border-gold group-hover:scale-110 ${big ? 'h-20 w-20 md:h-24 md:w-24' : 'h-14 w-14'}`}>
          <span className="absolute inset-0 rounded-full border border-ivory/40 animate-ping opacity-30" />
          <Play className="fill-ivory text-ivory group-hover:fill-ink group-hover:text-ink translate-x-[-2px]" size={big ? 30 : 20} />
        </span>
      </div>
      <div className={`absolute bottom-0 inset-x-0 flex items-end justify-between ${big ? 'p-5 md:p-7' : 'p-3 md:p-4'}`}>
        <div>
          {big && <p dir="ltr" className="font-display italic text-gold text-sm md:text-base">Cinematic Film</p>}
          <h3 className={`font-bold ${big ? 'text-2xl md:text-4xl' : 'text-sm md:text-base'}`}>
            {big ? `کلیپی سینەمایی ${f.n}` : `کلیپ ${f.n}`}
          </h3>
        </div>
        <span dir="ltr" className="rounded-full bg-ink/60 backdrop-blur px-3 py-1 text-xs text-ivory/80">{f.duration}</span>
      </div>
    </motion.button>
  )

  return (
    <section id="films" className="relative py-24 md:py-36 bg-ink-2">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading
          eyebrow="Cinematic Films"
          title={<>کلیپە <span className="gold-text">سینەماییەکان</span></>}
          text="هەر چیرۆکێکی خۆشەویستی شایەنی ئەوەیە وەک فیلمێک بگێڕدرێتەوە. سەیری کلیپە سینەماییەکانمان بکە."
        />
        <Card f={main} big i={0} />
        <div className="mt-3 md:mt-4 grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-5">
          {rest.map((f, i) => (
            <div key={f.n} className={i === rest.length - 1 ? 'col-span-2 lg:col-span-1' : ''}>
              <Card f={f} i={i} />
            </div>
          ))}
        </div>
      </div>
      <Player film={active} onClose={() => setActive(null)} />
    </section>
  )
}
