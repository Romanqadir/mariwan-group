import { motion, useScroll, useSpring } from 'motion/react'
import { ArrowUp } from 'lucide-react'
import { media, nav, socials, whatsappLink } from '../data/site'
import { Instagram, TikTok, Snapchat, WhatsApp } from './icons'

const socialIcons = { instagram: Instagram, tiktok: TikTok, snapchat: Snapchat }

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  return <motion.div style={{ scaleX }} className="fixed top-0 inset-x-0 z-[55] h-[2px] origin-right bg-gold" />
}

export function FloatingWhatsApp() {
  return (
    <motion.a
      href={whatsappLink('سڵاو Mariwan Group 👋')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 3, type: 'spring', stiffness: 200, damping: 15 }}
      className="fixed bottom-5 left-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />
      <WhatsApp width={28} height={28} className="relative" />
    </motion.a>
  )
}

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 pt-20 pb-10 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex flex-col items-center text-center">
          <img src={media('brand/logo.webp')} alt="Mariwan Group" className="h-8 md:h-10 w-auto" loading="lazy" />
          <p className="mt-6 max-w-md text-mute leading-loose">
            تایبەتمەند لە فۆتۆگرافی، ڤیدیۆگرافی، دیکۆر و دیجەی ئاهەنگەکان.
          </p>
          <div className="mt-8 flex gap-3">
            {socials.map((s) => {
              const Icon = socialIcons[s.key]
              return (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-12 w-12 place-items-center rounded-full border border-white/10 text-ivory/70 transition hover:border-gold hover:text-gold"
                >
                  <Icon width={20} height={20} />
                </a>
              )
            })}
          </div>
          <nav className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-mute">
            {nav.map((n) => (
              <a key={n.id} href={`#${n.id}`} className="hover:text-ivory transition">
                {n.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col-reverse items-center justify-between gap-4 border-t border-white/5 pt-8 text-xs text-mute md:flex-row">
          <p dir="ltr">© {new Date().getFullYear()} Mariwan Group — All rights reserved.</p>
          <p dir="ltr">
            Designed by <span className="text-ivory/80">Mohammed Qaraman</span>
          </p>
          <a href="#top" className="inline-flex items-center gap-2 hover:text-gold transition">
            گەڕانەوە بۆ سەرەوە <ArrowUp size={14} />
          </a>
        </div>
      </div>
      <p
        dir="ltr"
        aria-hidden="true"
        className="pointer-events-none select-none text-center font-display italic text-[18vw] leading-none text-white/[0.03] mt-6 whitespace-nowrap"
      >
        Mariwan Group
      </p>
    </footer>
  )
}
