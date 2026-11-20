import { useState } from 'react'
import { motion } from 'motion/react'
import { Plus, Expand } from 'lucide-react'
import { photoList } from '../data/site'
import { SectionHeading } from './ui'
import Lightbox from './Lightbox'

const STEP = 12

export default function Gallery() {
  const [shown, setShown] = useState(STEP)
  const [active, setActive] = useState(null)

  return (
    <section id="gallery" className="py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading
          eyebrow="Photo Gallery"
          title={<>ئەلبوومی <span className="gold-text">وێنەکان</span></>}
          text="کۆمەڵێک لە جوانترین وێنەکانی بووک و زاوا کە تیمەکەمان گرتوونی. کلیک لەسەر هەر وێنەیەک بکە بۆ گەورەکردنەوە."
        />

        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4">
          {photoList.slice(0, shown).map((p, i) => (
            <motion.button
              key={p.src}
              onClick={() => setActive(i)}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: (i % 4) * 0.08 }}
              className="group relative mb-3 md:mb-4 block w-full overflow-hidden rounded-2xl bg-ink-3 break-inside-avoid"
              style={{ aspectRatio: `${p.w} / ${p.h}` }}
              aria-label={`وێنەی ${i + 1}`}
            >
              <img
                src={p.thumb}
                alt=""
                loading="lazy"
                decoding="async"
                width={p.w}
                height={p.h}
                className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="absolute bottom-3 left-3 grid h-10 w-10 place-items-center rounded-full bg-ivory/90 text-ink opacity-0 translate-y-3 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                <Expand size={16} />
              </span>
            </motion.button>
          ))}
        </div>

        {shown < photoList.length && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => setShown((s) => Math.min(s + STEP, photoList.length))}
              className="group inline-flex items-center gap-3 rounded-full border border-gold/40 px-8 py-4 text-gold transition hover:bg-gold hover:text-ink"
            >
              <Plus size={18} className="transition-transform duration-500 group-hover:rotate-90" />
              وێنەی زیاتر ببینە
              <span dir="ltr" className="text-sm opacity-70">({photoList.length - shown})</span>
            </button>
          </div>
        )}
      </div>

      <Lightbox images={photoList} index={active} onClose={() => setActive(null)} onChange={setActive} />
    </section>
  )
}
