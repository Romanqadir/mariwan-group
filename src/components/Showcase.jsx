import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { photoList } from '../data/site'

// Two rows of photos that slide in opposite directions while you scroll.
const rowA = [29, 2, 17, 33, 9, 39, 21].map((i) => photoList[i % photoList.length])
const rowB = [31, 5, 13, 37, 24, 0, 11].map((i) => photoList[i % photoList.length])

export default function Showcase() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x1 = useTransform(scrollYProgress, [0, 1], ['-25%', '5%'])
  const x2 = useTransform(scrollYProgress, [0, 1], ['5%', '-25%'])

  return (
    <section ref={ref} className="relative overflow-hidden py-8 md:py-12" aria-hidden="true">
      <div dir="ltr" className="flex flex-col gap-3 md:gap-5">
        {[{ row: rowA, x: x1 }, { row: rowB, x: x2 }].map(({ row, x }, r) => (
          <motion.div key={r} style={{ x }} className="flex gap-3 md:gap-5 w-max">
            {row.map((p, i) => (
              <div key={i} className="h-44 w-36 md:h-80 md:w-64 shrink-0 overflow-hidden rounded-2xl bg-ink-3">
                <img src={p.thumb} alt="" loading="lazy" className="h-full w-full object-cover" />
              </div>
            ))}
          </motion.div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-40 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-40 bg-gradient-to-l from-ink to-transparent" />
    </section>
  )
}
