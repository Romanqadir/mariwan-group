import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Camera, Sparkles, Music, CalendarHeart, Send, Check } from 'lucide-react'
import { whatsappLink, weekDays, media } from '../data/site'
import { SectionHeading, ease } from './ui'
import { addBooking } from '../admin/store'

const serviceOptions = [
  { value: '📸 فۆتۆگرافی و ڤیدیۆ', label: 'فۆتۆگرافی و ڤیدیۆ', icon: Camera },
  { value: '✨ دیکۆر و ڕازاندنەوە', label: 'دیکۆر و ڕازاندنەوە', icon: Sparkles },
  { value: '🎧 دیجەی (DJ)', label: 'دیجەی (DJ)', icon: Music },
]

const field =
  'w-full rounded-2xl border border-white/10 bg-ink/60 px-5 py-4 text-ivory placeholder:text-mute/60 outline-none transition focus:border-gold focus:ring-4 focus:ring-gold/10'

// No database needed: the form builds a ready-made WhatsApp message.
export default function Booking() {
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [notes, setNotes] = useState('')
  const [selected, setSelected] = useState([])
  const [error, setError] = useState('')

  const dayName = date ? weekDays[new Date(date + 'T12:00:00').getDay()] : ''
  const today = new Date().toISOString().split('T')[0]

  const toggle = (v) => setSelected((s) => (s.includes(v) ? s.filter((x) => x !== v) : [...s, v]))

  const submit = (e) => {
    e.preventDefault()
    if (selected.length === 0) return setError('تکایە لانیکەم یەک خزمەتگوزاری هەڵبژێرە')
    setError('')
    const msg = [
      '💍 داواکاری نوێ لە ماڵپەڕ:',
      `👤 ناوی بووک و زاوا: ${name}`,
      `📋 خزمەتگوزارییەکان: ${selected.join('، ')}`,
      `📅 بەروار: ${date} (${dayName})`,
      `📝 تێبینی: ${notes || 'هیچ'}`,
    ].join('\n')
    addBooking({ name, services: selected, date, dayName, notes: notes || 'هیچ' })
    window.open(whatsappLink(msg), '_blank', 'noopener')
  }

  return (
    <section id="booking" className="relative py-24 md:py-36 overflow-hidden">
      <div className="absolute inset-0">
        <img src={media('photos/31.webp')} alt="" loading="lazy" className="h-full w-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/85 to-ink" />
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 md:px-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <div>
          <SectionHeading
            eyebrow="Book your date"
            title={<>ڕۆژی ئاهەنگەکەت <span className="gold-text">دیاری بکە</span></>}
            text="فۆرمەکە پڕ بکەرەوە، پەیامێکی ئامادەکراو لە واتسئەپ دەکرێتەوە و ڕاستەوخۆ دەگاتە ئێمە. بە زووترین کات وەڵامت دەدەینەوە."
          />
          <div className="hidden lg:flex items-center gap-4 text-mute">
            <CalendarHeart className="text-gold" size={40} strokeWidth={1.2} />
            <p className="leading-loose">ڕۆژەکان زوو پڕ دەبنەوە، بۆیە پێشوەختە بەروارەکەت تۆمار بکە.</p>
          </div>
        </div>

        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease }}
          className="rounded-[2rem] border border-white/10 bg-ink-2/80 backdrop-blur-xl p-6 md:p-10 shadow-2xl"
        >
          <label className="block">
            <span className="mb-2 block text-sm text-mute">ناوی بووک و زاوا</span>
            <input required value={name} onChange={(e) => setName(e.target.value)} className={field} placeholder="ناوی تەواو بنووسە" />
          </label>

          <fieldset className="mt-6">
            <legend className="mb-3 text-sm text-mute">خزمەتگوزارییەکان</legend>
            <div className="grid gap-3 sm:grid-cols-3">
              {serviceOptions.map(({ value, label, icon: Icon }) => {
                const on = selected.includes(value)
                return (
                  <button
                    type="button"
                    key={value}
                    onClick={() => toggle(value)}
                    aria-pressed={on}
                    className={`relative flex flex-col items-center gap-2 rounded-2xl border px-3 py-5 text-sm transition-all duration-300 ${
                      on ? 'border-gold bg-gold/10 text-ivory' : 'border-white/10 text-mute hover:border-white/30'
                    }`}
                  >
                    <AnimatePresence>
                      {on && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="absolute top-2 left-2 grid h-5 w-5 place-items-center rounded-full bg-gold text-ink"
                        >
                          <Check size={12} strokeWidth={3} />
                        </motion.span>
                      )}
                    </AnimatePresence>
                    <Icon size={24} strokeWidth={1.5} className={on ? 'text-gold' : ''} />
                    {label}
                  </button>
                )
              })}
            </div>
          </fieldset>

          <label className="mt-6 block">
            <span className="mb-2 flex items-center justify-between text-sm text-mute">
              ڕۆژی ئاهەنگ
              <AnimatePresence mode="wait">
                {dayName && (
                  <motion.span
                    key={dayName}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="rounded-full bg-gold/15 px-3 py-0.5 text-gold"
                  >
                    {dayName}
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
            <input
              required
              type="date"
              min={today}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={`${field} [color-scheme:dark]`}
            />
          </label>

          <label className="mt-6 block">
            <span className="mb-2 block text-sm text-mute">تێبینی و داواکاری تایبەت</span>
            <textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} className={`${field} resize-none`} placeholder="هەر تێبینییەکت هەیە لێرە بنووسە..." />
          </label>

          <AnimatePresence>
            {error && (
              <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-4 text-sm text-red-400">
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <button
            type="submit"
            className="group mt-8 flex w-full items-center justify-center gap-3 rounded-full bg-gold py-4 text-lg font-bold text-ink transition hover:bg-ivory"
          >
            ناردن لە ڕێگەی واتسئەپ
            <Send size={18} className="transition-transform duration-300 group-hover:-translate-x-1 -scale-x-100" />
          </button>
        </motion.form>
      </div>
    </section>
  )
}
