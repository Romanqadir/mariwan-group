import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowDown, Play } from 'lucide-react'
import { media } from '../data/site'
import { ease, GoldButton, GhostButton } from './ui'

const words = ['ساتە', 'جوانەکانی', 'ژیانتان', 'بە', 'شێوەیەکی', 'سینەمایی', 'تۆمار', 'دەکەین']

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section id="top" ref={ref} className="relative h-[100svh] min-h-[600px] overflow-hidden">
      <motion.div style={{ scale, y }} className="absolute inset-0">
        <video
          className="h-full w-full object-cover"
          src={media('hero.mp4')}
          poster={media('hero-poster.jpg')}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      </motion.div>

      {/* overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/30 to-ink" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(11,10,9,0.75)_100%)]" />

      <motion.div
        style={{ opacity: fade }}
        className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-4 text-center"
      >
        <motion.img
          src={media('brand/logo.webp')}
          alt="Mariwan Group Photography"
          initial={{ opacity: 0, scale: 1.08, filter: 'blur(12px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.6, ease, delay: 0.2 }}
          className="w-[78vw] max-w-[560px] h-auto drop-shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
        />

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease, delay: 1 }}
          className="my-8 h-px w-32 bg-gradient-to-l from-transparent via-gold to-transparent"
        />

        <h1 className="max-w-3xl text-2xl font-bold leading-[1.8] sm:text-3xl md:text-5xl md:leading-[1.6]">
          {words.map((w, i) => (
            <span key={i} className="inline-block overflow-hidden align-bottom">
              <motion.span
                className={`inline-block ${w === 'سینەمایی' ? 'gold-text' : ''}`}
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease, delay: 1.1 + i * 0.07 }}
              >
                {w}
              </motion.span>
              {i < words.length - 1 && ' '}
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 1.9 }}
          className="mt-6 text-ivory/70 text-sm md:text-lg"
        >
          فۆتۆگرافی · ڤیدیۆگرافی · دیکۆر · دیجەی
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 2.1 }}
          className="mt-10 flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
        >
          <GoldButton href="#booking">دیاریکردنی ڕۆژی ئاهەنگ</GoldButton>
          <GhostButton href="#films">
            <Play size={16} className="fill-current" /> سەیری کارەکانمان بکە
          </GhostButton>
        </motion.div>
      </motion.div>

      <motion.a
        href="#services"
        aria-label="خوارەوە"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2 text-ivory/60"
      >
        <span dir="ltr" className="text-[10px] tracking-[0.4em] uppercase">Scroll</span>
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <ArrowDown size={18} />
        </motion.span>
      </motion.a>
    </section>
  )
}
