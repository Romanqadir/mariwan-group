import { useState } from 'react'
import { motion } from 'motion/react'
import { Crown, Check } from 'lucide-react'
import { packages, whatsappLink } from '../data/site'
import { SectionHeading, ease } from './ui'
import Lightbox from './Lightbox'
import { WhatsApp } from './icons'

export default function Packages() {
  const [active, setActive] = useState(null)
  const imgs = packages.map((p) => ({ src: p.image }))

  return (
    <section id="packages" className="relative py-24 md:py-36 bg-ink-2 overflow-hidden">
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-gold/10 blur-[140px]" />
      <div className="relative mx-auto max-w-6xl px-4 md:px-8">
        <SectionHeading
          center
          eyebrow="Packages"
          title={<>پاکێجەکانی <span className="gold-text">Mariwan Group</span></>}
          text="پاکێجێک هەڵبژێرە کە لەگەڵ ئاهەنگەکەت دەگونجێت. بۆ زانیاری زیاتر و نرخەکان، ڕاستەوخۆ لە واتسئەپ پەیوەندیمان پێوە بکە."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {packages.map((p, i) => (
            <motion.article
              key={p.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.9, ease, delay: i * 0.12 }}
              className={`group relative overflow-hidden rounded-[2rem] p-[1px] ${
                p.featured ? 'bg-gradient-to-br from-gold via-gold/20 to-gold/60' : 'bg-white/10'
              }`}
            >
              <div className="relative h-full rounded-[calc(2rem-1px)] bg-ink-2 p-4 md:p-5">
                {p.featured && (
                  <span className="absolute top-8 right-8 z-10 inline-flex items-center gap-1.5 rounded-full bg-gold px-3 py-1.5 text-xs font-bold text-ink shadow-lg">
                    <Crown size={14} /> VIP
                  </span>
                )}
                <button
                  onClick={() => setActive(i)}
                  className="block w-full overflow-hidden rounded-3xl bg-ink-3 aspect-[4/5]"
                  aria-label={p.title}
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                  />
                </button>
                <div className="px-2 pt-6 pb-2">
                  <p dir="ltr" className="text-right font-display italic text-gold text-lg">{p.name}</p>
                  <h3 className="text-2xl md:text-3xl font-extrabold mt-1">{p.title}</h3>
                  <p className="mt-3 text-mute leading-loose flex gap-2">
                    <Check size={18} className="text-gold mt-1.5 shrink-0" />
                    {p.text}
                  </p>
                  <a
                    href={whatsappLink(`سڵاو، دەمەوێت زانیاری زیاترم دەربارەی ${p.title} (${p.name}) هەبێت.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-6 flex w-full items-center justify-center gap-2 rounded-full py-4 font-bold transition ${
                      p.featured ? 'bg-gold text-ink hover:bg-ivory' : 'border border-white/20 hover:border-gold hover:text-gold'
                    }`}
                  >
                    <WhatsApp width={18} height={18} /> پرسیار لەسەر ئەم پاکێجە
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
      <Lightbox images={imgs} index={active} onClose={() => setActive(null)} onChange={setActive} />
    </section>
  )
}
