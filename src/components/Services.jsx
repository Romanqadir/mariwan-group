import { motion } from 'motion/react'
import { Camera, Film, Sparkles, Music } from 'lucide-react'
import { services } from '../data/site'
import { SectionHeading, ease } from './ui'

const icons = { camera: Camera, film: Film, sparkles: Sparkles, music: Music }

function Marquee() {
  const items = ['Wedding', 'Engagement', 'Cinematic Films', 'Decor', 'DJ', 'Photography', 'Henna Night', 'Love Story']
  const row = [...items, ...items]
  return (
    <div dir="ltr" className="relative overflow-hidden border-y border-white/5 py-6 md:py-8 select-none">
      <div className="marquee-track flex w-max gap-10 whitespace-nowrap" style={{ marginLeft: '-50%' }}>
        {[...row, ...row].map((t, i) => (
          <span key={i} className="flex items-center gap-10 font-display italic text-3xl md:text-5xl text-ivory/25">
            {t}
            <span className="text-gold text-xl not-italic">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Services() {
  return (
    <section id="services" className="relative pt-24 md:pt-36">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading
          eyebrow="What we do"
          title={<>هەموو شتێک بۆ ئاهەنگەکەت، <span className="gold-text">لە یەک شوێن</span></>}
          text="Mariwan Group تیمێکی تایبەتمەندە لە تۆمارکردنی جوانترین ساتەکانی ژیانتان. بە نوێترین کامێرا و ئامێری پێشکەوتوو، خزمەتگوزاریی بەرزترین کوالێتی پێشکەش دەکەین."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => {
            const Icon = icons[s.icon]
            return (
              <motion.div
                key={s.key}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.8, ease, delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-3xl border border-white/8 bg-ink-2 p-7 md:p-8 transition-colors duration-500 hover:border-gold/40"
              >
                <div className="absolute -top-24 -left-24 h-48 w-48 rounded-full bg-gold/10 blur-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                <div className="relative">
                  <div className="mb-8 flex items-center justify-between">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gold/10 text-gold transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                      <Icon size={26} strokeWidth={1.5} />
                    </span>
                    <span dir="ltr" className="font-display italic text-5xl text-white/10">0{i + 1}</span>
                  </div>
                  <p dir="ltr" className="text-right font-display italic text-gold text-lg">{s.en}</p>
                  <h3 className="mt-1 text-2xl font-bold">{s.title}</h3>
                  <p className="mt-3 text-mute leading-loose text-[15px]">{s.text}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
      <div className="mt-24 md:mt-32">
        <Marquee />
      </div>
    </section>
  )
}
