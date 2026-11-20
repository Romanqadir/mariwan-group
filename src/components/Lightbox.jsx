import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

// Fullscreen image viewer: swipe on phones, arrow keys on desktop.
export default function Lightbox({ images, index, onClose, onChange }) {
  const [dir, setDir] = useState(0)
  const open = index !== null
  const go = useCallback(
    (d) => {
      setDir(d)
      onChange((index + d + images.length) % images.length)
    },
    [index, images.length, onChange],
  )

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      // RTL: left arrow = next, right arrow = previous
      if (e.key === 'ArrowLeft') go(1)
      if (e.key === 'ArrowRight') go(-1)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, go, onClose])

  // preload neighbours
  useEffect(() => {
    if (!open) return
    ;[1, -1].forEach((d) => {
      const img = new Image()
      img.src = images[(index + d + images.length) % images.length].src
    })
  }, [open, index, images])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] bg-ink/95 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <div className="absolute top-0 inset-x-0 z-10 flex items-center justify-between p-4 md:p-6">
            <span dir="ltr" className="font-display text-lg text-ivory/70">
              {index + 1} / {images.length}
            </span>
            <button
              onClick={onClose}
              className="grid h-11 w-11 place-items-center rounded-full bg-white/10 hover:bg-white/20 transition"
              aria-label="داخستن"
            >
              <X size={22} />
            </button>
          </div>

          <div className="absolute inset-0 flex items-center justify-center p-4 md:p-16" onClick={(e) => e.stopPropagation()}>
            <AnimatePresence initial={false} custom={dir} mode="popLayout">
              <motion.img
                key={index}
                src={images[index].src}
                alt=""
                custom={dir}
                initial={{ opacity: 0, x: dir * -80, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: dir * 80, scale: 0.96 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -80) go(-1)
                  else if (info.offset.x > 80) go(1)
                }}
                className="max-h-full max-w-full rounded-lg object-contain shadow-2xl cursor-grab active:cursor-grabbing select-none"
                draggable={false}
              />
            </AnimatePresence>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); go(-1) }}
            className="hidden md:grid absolute right-6 top-1/2 -translate-y-1/2 h-14 w-14 place-items-center rounded-full bg-white/10 hover:bg-gold hover:text-ink transition z-10"
            aria-label="پێشوو"
          >
            <ChevronRight size={26} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); go(1) }}
            className="hidden md:grid absolute left-6 top-1/2 -translate-y-1/2 h-14 w-14 place-items-center rounded-full bg-white/10 hover:bg-gold hover:text-ink transition z-10"
            aria-label="دواتر"
          >
            <ChevronLeft size={26} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
