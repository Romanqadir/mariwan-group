import { motion } from 'motion/react'
import { Phone, MapPin, ArrowUpLeft } from 'lucide-react'
import { contacts, socials, MAPS_URL, media } from '../data/site'
import { SectionHeading, ease } from './ui'
import { WhatsApp, Viber, Telegram, Instagram, TikTok, Snapchat } from './icons'

const contactIcons = { whatsapp: WhatsApp, viber: Viber, telegram: Telegram, phone: (p) => <Phone {...p} /> }
const socialIcons = { instagram: Instagram, tiktok: TikTok, snapchat: Snapchat }

export default function Contact() {
  return (
    <section id="contact" className="py-24 md:py-36 bg-ink-2">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading
          eyebrow="Get in touch"
          title={<>پەیوەندیمان <span className="gold-text">پێوە بکە</span></>}
          text="بە هەر ڕێگایەک کە بۆت ئاسانترە پەیوەندیمان پێوە بکە، ئێمە ئامادەین."
        />

        <div className="grid gap-4 lg:grid-cols-3">
          {/* contact methods */}
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
            {contacts.map((c, i) => {
              const Icon = contactIcons[c.key]
              return (
                <motion.a
                  key={c.key}
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease, delay: i * 0.08 }}
                  className="group relative flex items-center gap-5 overflow-hidden rounded-3xl border border-white/8 bg-ink p-6 transition-colors hover:border-white/20"
                >
                  <span
                    className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl transition-transform duration-500 group-hover:scale-110"
                    style={{ background: `${c.color}1f`, color: c.color }}
                  >
                    <Icon width={26} height={26} size={26} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold">{c.label}</h3>
                    <p dir="ltr" className="text-right text-mute text-sm">{c.en}</p>
                  </div>
                  <ArrowUpLeft className="mr-auto text-mute transition-all duration-500 group-hover:text-ivory group-hover:-translate-x-1 group-hover:-translate-y-1" size={20} />
                </motion.a>
              )
            })}

            {/* socials */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease, delay: 0.3 }}
              className="sm:col-span-2 rounded-3xl border border-white/8 bg-ink p-6"
            >
              <p className="mb-4 text-sm text-mute">سۆشیال میدیا — دوایین کارەکانمان ببینە</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {socials.map((s) => {
                  const Icon = socialIcons[s.key]
                  return (
                    <a
                      key={s.href}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col items-center gap-2 rounded-2xl border border-white/8 px-3 py-5 text-center transition hover:border-gold/50 hover:bg-gold/5"
                    >
                      <Icon width={24} height={24} className="text-ivory/80 group-hover:text-gold transition" />
                      <span className="text-sm font-medium">{s.label}</span>
                      <span dir="ltr" className="text-xs text-mute">{s.handle}</span>
                    </a>
                  )
                })}
              </div>
            </motion.div>
          </div>

          {/* location card */}
          <motion.a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
            className="group relative min-h-[320px] overflow-hidden rounded-3xl border border-white/8"
          >
            <img src={media('decor/1.webp')} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/10" />
            <div className="relative flex h-full flex-col justify-end p-7">
              <span className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-gold text-ink">
                <MapPin size={26} />
              </span>
              <h3 className="text-2xl font-bold">ناونیشانی ستۆدیۆ</h3>
              <p className="mt-2 text-mute">شوێن و لۆکەیشن لەسەر گووگڵ ماپس</p>
              <span className="mt-5 inline-flex items-center gap-2 text-gold font-medium">
                کردنەوەی نەخشە <ArrowUpLeft size={18} />
              </span>
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  )
}
