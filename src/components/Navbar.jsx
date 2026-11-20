import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { nav, media } from '../data/site'
import { ease } from './ui'
import { ScrollProgress } from './Footer'

// Hidden control panel: loaded only when someone taps the logo 3 times.
const AdminPanel = lazy(() => import('../admin/AdminPanel'))

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [admin, setAdmin] = useState(false)
  const taps = useRef({ n: 0, t: 0 })

  const onLogoTap = () => {
    const now = Date.now()
    taps.current.n = now - taps.current.t < 600 ? taps.current.n + 1 : 1
    taps.current.t = now
    if (taps.current.n >= 3) {
      taps.current.n = 0
      setAdmin(true)
    }
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease, delay: 0.3 }}
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
        className={`fixed inset-x-0 top-0 z-50 m-0 transition-colors duration-500 ${
          scrolled
            ? 'bg-ink/95 backdrop-blur-xl border-b border-white/5 before:absolute before:inset-x-0 before:bottom-full before:h-[200px] before:bg-ink'
            : ''
        }`}
      >
        <ScrollProgress />
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between px-4 md:px-8 transition-[padding] duration-500 ${
            scrolled ? 'py-3' : 'py-5'
          }`}
        >
          <a href="#top" aria-label="Mariwan Group" className="shrink-0 select-none" onClick={onLogoTap}>
            <img src={media('brand/logo.webp')} alt="Mariwan Group" className="h-6 md:h-7 w-auto" />
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {nav.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className="relative text-sm text-ivory/80 hover:text-ivory transition-colors after:absolute after:-bottom-1 after:right-0 after:h-px after:w-0 after:bg-gold after:transition-all hover:after:w-full"
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#booking"
              className="hidden sm:inline-flex rounded-full bg-gold px-5 py-2 text-sm font-bold text-ink hover:bg-ivory transition-colors"
            >
              داواکاری ئاهەنگ
            </a>
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden grid h-10 w-10 place-items-center rounded-full border border-white/15"
              aria-label="مێنیو"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: 'circle(0% at 90% 5%)' }}
            animate={{ clipPath: 'circle(150% at 90% 5%)' }}
            exit={{ clipPath: 'circle(0% at 90% 5%)' }}
            transition={{ duration: 0.7, ease }}
            className="fixed inset-0 z-[70] bg-ink flex flex-col px-6 py-6"
          >
            <div className="flex items-center justify-between">
              <img src={media('brand/logo.webp')} alt="Mariwan Group" className="h-6 w-auto" />
              <button
                onClick={() => setOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15"
                aria-label="داخستن"
              >
                <X size={20} />
              </button>
            </div>
            <nav className="mt-14 flex flex-col gap-2">
              {[...nav, { id: 'booking', label: 'داواکاری ئاهەنگ' }].map((n, i) => (
                <motion.a
                  key={n.id}
                  href={`#${n.id}`}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + i * 0.06, duration: 0.6, ease }}
                  className="flex items-baseline gap-4 border-b border-white/5 py-4 text-3xl font-bold"
                >
                  <span dir="ltr" className="font-display italic text-gold text-lg">0{i + 1}</span>
                  {n.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {admin && (
        <Suspense fallback={null}>
          <AdminPanel open={admin} onClose={() => setAdmin(false)} />
        </Suspense>
      )}
    </>
  )
}
