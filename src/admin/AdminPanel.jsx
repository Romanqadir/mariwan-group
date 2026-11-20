import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  Lock, LogOut, X, Plus, Check, Ban, Undo2, Trash2, Wallet, Download, Upload,
  Camera, Sparkles, Music, AlertTriangle, CalendarDays, Search, Phone,
} from 'lucide-react'
import { load, save, total, AUTH_KEY, ADMIN_PASSWORD } from './store'
import { weekDays } from '../data/site'

const SERVICES = [
  { key: 'photo', value: '📸 فۆتۆگرافی و ڤیدیۆ', label: 'فۆتۆگرافی و ڤیدیۆ', match: 'فۆتۆگرافی', icon: Camera },
  { key: 'decor', value: '✨ دیکۆر و ڕازاندنەوە', label: 'دیکۆر و ڕازاندنەوە', match: 'دیکۆر', icon: Sparkles },
  { key: 'dj', value: '🎧 دیجەی (DJ)', label: 'دیجەی (DJ)', match: 'دیجەی', icon: Music },
]

const TABS = [
  { key: 'active', label: 'چالاک (داهاتوو)', color: 'text-sky-300' },
  { key: 'pending', label: 'قەرز (پارە نەدراوە)', color: 'text-amber-300' },
  { key: 'completed', label: 'تەواوبوو (پارە وەرگیراو)', color: 'text-emerald-300' },
  { key: 'rejected', label: 'ڕەتکراوە', color: 'text-red-300' },
]

const iqd = (n) => `${(n || 0).toLocaleString('en-US')} IQD`
const dayOf = (date) => (date ? weekDays[new Date(date + 'T12:00:00').getDay()] : '')
const input =
  'w-full rounded-xl border border-white/10 bg-ink px-4 py-3 text-ivory placeholder:text-mute/60 outline-none focus:border-gold'

function Modal({ open, onClose, title, children }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[110] grid place-items-center bg-black/70 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: 10 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 10 }}
            onMouseDown={(e) => e.stopPropagation()}
            className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-ink-2 p-6"
          >
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-lg font-bold">{title}</h3>
              <button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full bg-white/5" aria-label="داخستن">
                <X size={18} />
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Login({ onClose, onSuccess }) {
  const [pw, setPw] = useState('')
  const [err, setErr] = useState(false)
  const submit = (e) => {
    e.preventDefault()
    if (pw === ADMIN_PASSWORD) onSuccess()
    else {
      setErr(true)
      setPw('')
    }
  }
  return (
    <motion.div className="fixed inset-0 z-[100] grid place-items-center bg-black/80 backdrop-blur p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.form
        onSubmit={submit}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1, x: err ? [0, -10, 10, -6, 6, 0] : 0 }}
        className="w-full max-w-sm rounded-3xl border border-gold/30 bg-ink-2 p-7 text-center"
      >
        <span className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-gold/10 text-gold">
          <Lock size={24} />
        </span>
        <h3 className="text-lg font-bold">بەشی شاراوەی بەڕێوەبەر</h3>
        <input
          autoFocus
          type="password"
          inputMode="numeric"
          value={pw}
          onChange={(e) => { setPw(e.target.value); setErr(false) }}
          placeholder="پاسۆرد"
          className={`${input} mt-5 text-center tracking-[0.5em]`}
        />
        {err && <p className="mt-2 text-sm text-red-400">پاسۆرد هەڵەیە!</p>}
        <button type="submit" className="mt-5 w-full rounded-full bg-gold py-3 font-bold text-ink">چوونەژوورەوە</button>
        <button type="button" onClick={onClose} className="mt-3 text-sm text-mute">داخستن</button>
      </motion.form>
    </motion.div>
  )
}

function Stat({ icon: Icon, label, value, accent }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-ink p-4">
      <p className="flex items-center gap-2 text-xs text-mute">
        <Icon size={14} className={accent} /> {label}
      </p>
      <p dir="ltr" className={`mt-2 text-right text-lg md:text-xl font-extrabold ${accent}`}>{value}</p>
    </div>
  )
}

export default function AdminPanel({ open, onClose }) {
  const [authed, setAuthed] = useState(() => {
    try { return localStorage.getItem(AUTH_KEY) === 'true' } catch { return false }
  })
  const [data, setData] = useState(load)
  const [tab, setTab] = useState('active')
  const [q, setQ] = useState('')
  const [dialog, setDialog] = useState(null) // {type, order}
  const fileRef = useRef(null)

  useEffect(() => { if (open) setData(load()) }, [open])
  useEffect(() => {
    if (!open || !authed) return
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [open, authed])

  const update = (fn) =>
    setData((d) => {
      const next = fn(structuredClone(d))
      save(next)
      return next
    })

  const move = (id, from, to, patch = {}) =>
    update((d) => {
      const o = d[from].find((x) => x.id === id)
      if (!o) return d
      d[from] = d[from].filter((x) => x.id !== id)
      d[to].push({ ...o, ...patch })
      return d
    })

  const remove = (id, from) => {
    if (!confirm('دڵنیایت لە سڕینەوە؟')) return
    update((d) => ({ ...d, [from]: d[from].filter((x) => x.id !== id) }))
  }

  const stats = useMemo(() => {
    const sum = (list, k) => list.reduce((s, o) => s + ((o.prices && o.prices[k]) || 0), 0)
    return {
      photo: sum(data.completed, 'photo'),
      decor: sum(data.completed, 'decor'),
      dj: sum(data.completed, 'dj'),
      debt: data.pending.reduce((s, o) => s + total(o), 0),
      revenue: data.completed.reduce((s, o) => s + total(o), 0),
    }
  }, [data])

  const list = useMemo(() => {
    const items = [...data[tab]].sort((a, b) => (a.date || '').localeCompare(b.date || ''))
    if (!q.trim()) return items
    const s = q.trim().toLowerCase()
    return items.filter((o) => `${o.name} ${o.phone || ''} ${o.notes || ''}`.toLowerCase().includes(s))
  }, [data, tab, q])

  const backup = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `mariwan-backup-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(a.href)
  }

  const restore = (file) => {
    const r = new FileReader()
    r.onload = () => {
      try {
        const d = JSON.parse(r.result)
        if (!Array.isArray(d.active)) throw new Error()
        if (!confirm('هەموو داتای ئێستا بە فایلی باکئەپ دەگۆڕدرێت. بەردەوام بیت؟')) return
        save(d)
        setData(load())
      } catch {
        alert('فایلەکە دروست نییە')
      }
    }
    r.readAsText(file)
  }

  const logout = () => {
    try { localStorage.removeItem(AUTH_KEY) } catch {}
    setAuthed(false)
    onClose()
  }

  if (!open) return null
  if (!authed)
    return (
      <AnimatePresence>
        <Login
          onClose={onClose}
          onSuccess={() => {
            try { localStorage.setItem(AUTH_KEY, 'true') } catch {}
            setAuthed(true)
          }}
        />
      </AnimatePresence>
    )

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed inset-0 z-[100] overflow-y-auto bg-ink"
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <div className="mx-auto max-w-6xl px-4 py-6 md:px-8 md:py-10">
        {/* header */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl md:text-2xl font-extrabold">
            📋 کۆنترۆڵ پانێڵی <span className="gold-text" dir="ltr">Mariwan Group</span>
          </h2>
          <div className="flex gap-2">
            <button onClick={onClose} className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-sm">
              <X size={16} /> داخستن
            </button>
            <button onClick={logout} className="inline-flex items-center gap-1.5 rounded-full bg-red-500/90 px-4 py-2 text-sm font-bold">
              <LogOut size={16} /> لۆگ ئاوت
            </button>
          </div>
        </div>

        {/* stats */}
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-5">
          <Stat icon={Camera} label="فۆتۆگرافی و ڤیدیۆ" value={iqd(stats.photo)} accent="text-sky-300" />
          <Stat icon={Sparkles} label="دیکۆر و ڕازاندنەوە" value={iqd(stats.decor)} accent="text-sky-300" />
          <Stat icon={Music} label="دیجەی (DJ)" value={iqd(stats.dj)} accent="text-sky-300" />
          <Stat icon={AlertTriangle} label="کۆی قەرزەکان" value={iqd(stats.debt)} accent="text-amber-300" />
          <div className="col-span-2 md:col-span-1">
            <Stat icon={Wallet} label="کۆی گشتی داهات" value={iqd(stats.revenue)} accent="text-gold" />
          </div>
        </div>

        {/* toolbar */}
        <div className="mt-6 flex flex-wrap gap-2">
          <button onClick={() => setDialog({ type: 'add' })} className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 font-bold text-ink">
            <Plus size={18} /> داواکاری نوێ
          </button>
          <button onClick={backup} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-sm">
            <Download size={16} /> باکئەپ
          </button>
          <button onClick={() => fileRef.current?.click()} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-sm">
            <Upload size={16} /> گەڕاندنەوەی باکئەپ
          </button>
          <input ref={fileRef} type="file" accept="application/json" hidden onChange={(e) => { e.target.files[0] && restore(e.target.files[0]); e.target.value = '' }} />
          <label className="relative mr-auto w-full sm:w-64">
            <Search size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-mute" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="گەڕان بە ناو یان ژمارە..." className={`${input} pr-10 py-2.5 rounded-full`} />
          </label>
        </div>

        {/* tabs */}
        <div className="mt-6 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm transition ${tab === t.key ? 'bg-white/10 ' + t.color : 'text-mute hover:text-ivory'}`}
            >
              {t.label} <span dir="ltr" className="opacity-70">({data[t.key].length})</span>
            </button>
          ))}
        </div>

        {/* list */}
        <div className="mt-4 grid gap-3">
          {list.length === 0 && (
            <p className="rounded-2xl border border-dashed border-white/10 p-10 text-center text-mute">هیچ شتێک لێرە نییە.</p>
          )}
          {list.map((o) => (
            <div key={o.id} className="rounded-2xl border border-white/8 bg-ink-2 p-4 md:p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <h4 className="text-lg font-bold">{o.name}</h4>
                  <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-mute">
                    <span className="inline-flex items-center gap-1"><CalendarDays size={14} /> <span dir="ltr">{o.date}</span> ({o.dayName || dayOf(o.date)})</span>
                    {o.phone && (
                      <a href={`tel:${o.phone}`} className="inline-flex items-center gap-1 text-sky-300"><Phone size={14} /> <span dir="ltr">{o.phone}</span></a>
                    )}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tab === 'active' && (
                    <>
                      <button onClick={() => setDialog({ type: 'complete', order: o })} className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-3 py-1.5 text-sm text-emerald-300"><Check size={15} /> تەواوکردن</button>
                      <button onClick={() => setDialog({ type: 'reject', order: o })} className="inline-flex items-center gap-1 rounded-full bg-red-500/15 px-3 py-1.5 text-sm text-red-300"><Ban size={15} /> ڕەتکردنەوە</button>
                    </>
                  )}
                  {tab === 'pending' && (
                    <>
                      <button onClick={() => move(o.id, 'pending', 'completed', { paidAt: new Date().toISOString() })} className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-3 py-1.5 text-sm text-emerald-300"><Wallet size={15} /> پارە درا</button>
                      <button onClick={() => move(o.id, 'pending', 'active')} className="inline-flex items-center gap-1 rounded-full bg-white/5 px-3 py-1.5 text-sm"><Undo2 size={15} /> گەڕانەوە</button>
                    </>
                  )}
                  {tab === 'completed' && (
                    <button onClick={() => move(o.id, 'completed', 'pending')} className="inline-flex items-center gap-1 rounded-full bg-white/5 px-3 py-1.5 text-sm"><Undo2 size={15} /> گەڕانەوە</button>
                  )}
                  {tab === 'rejected' && (
                    <button onClick={() => move(o.id, 'rejected', 'active')} className="inline-flex items-center gap-1 rounded-full bg-white/5 px-3 py-1.5 text-sm"><Undo2 size={15} /> گەڕانەوە</button>
                  )}
                  <button onClick={() => remove(o.id, tab)} className="grid h-8 w-8 place-items-center rounded-full bg-white/5 text-mute hover:text-red-300" aria-label="سڕینەوە"><Trash2 size={15} /></button>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {(o.services || []).map((s) => (
                  <span key={s} className="rounded-full bg-white/5 px-3 py-1 text-xs">{s}</span>
                ))}
              </div>
              {o.notes && o.notes !== 'هیچ' && <p className="mt-3 text-sm text-mute">📝 {o.notes}</p>}
              {o.reason && <p className="mt-3 text-sm text-red-300">هۆکار: {o.reason}</p>}
              {o.prices && (
                <p dir="ltr" className="mt-3 flex flex-wrap justify-end gap-x-4 gap-y-1 text-sm text-mute">
                  {o.prices.photo > 0 && <span>📸 {iqd(o.prices.photo)}</span>}
                  {o.prices.decor > 0 && <span>✨ {iqd(o.prices.decor)}</span>}
                  {o.prices.dj > 0 && <span>🎧 {iqd(o.prices.dj)}</span>}
                  <span className={`font-bold ${tab === 'pending' ? 'text-amber-300' : 'text-ivory'}`}>= {iqd(total(o))}</span>
                </p>
              )}
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-mute leading-loose">
          ئەم داتایانە تەنها لەسەر ئەم ئامێرە پاشەکەوت دەکرێن. بۆ پاراستن، هەندێک جار «باکئەپ» دابگرە.
        </p>
      </div>

      <AddDialog open={dialog?.type === 'add'} onClose={() => setDialog(null)} onSave={(o) => { update((d) => { d.active.push(o); return d }); setDialog(null); setTab('active') }} />
      <CompleteDialog order={dialog?.type === 'complete' ? dialog.order : null} onClose={() => setDialog(null)} onSave={(prices) => { move(dialog.order.id, 'active', 'pending', { prices, doneAt: new Date().toISOString() }); setDialog(null) }} />
      <RejectDialog order={dialog?.type === 'reject' ? dialog.order : null} onClose={() => setDialog(null)} onSave={(reason) => { move(dialog.order.id, 'active', 'rejected', { reason }); setDialog(null) }} />
    </motion.div>
  )
}

function AddDialog({ open, onClose, onSave }) {
  const [f, setF] = useState({ name: '', phone: '', date: '', notes: '', services: [] })
  useEffect(() => { if (open) setF({ name: '', phone: '', date: '', notes: '', services: [] }) }, [open])
  const toggle = (v) => setF((x) => ({ ...x, services: x.services.includes(v) ? x.services.filter((s) => s !== v) : [...x.services, v] }))
  const submit = (e) => {
    e.preventDefault()
    if (!f.services.length) return alert('لانیکەم یەک خزمەتگوزاری هەڵبژێرە')
    onSave({ id: Date.now(), createdAt: new Date().toISOString(), ...f, dayName: dayOf(f.date) })
  }
  return (
    <Modal open={open} onClose={onClose} title="داواکاری نوێ">
      <form onSubmit={submit} className="grid gap-4">
        <input required value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} placeholder="ناوی بووک و زاوا" className={input} />
        <input value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} placeholder="ژمارەی مۆبایل" type="tel" dir="ltr" className={`${input} text-right`} />
        <div className="grid grid-cols-3 gap-2">
          {SERVICES.map(({ value, label, icon: Icon }) => (
            <button type="button" key={value} onClick={() => toggle(value)} className={`flex flex-col items-center gap-1 rounded-xl border p-3 text-xs ${f.services.includes(value) ? 'border-gold bg-gold/10' : 'border-white/10 text-mute'}`}>
              <Icon size={18} /> {label}
            </button>
          ))}
        </div>
        <label className="text-sm text-mute">
          <span className="mb-1 flex justify-between">ڕۆژی ئاهەنگ <span className="text-gold">{dayOf(f.date)}</span></span>
          <input required type="date" value={f.date} onChange={(e) => setF({ ...f, date: e.target.value })} className={`${input} [color-scheme:dark]`} />
        </label>
        <textarea rows={2} value={f.notes} onChange={(e) => setF({ ...f, notes: e.target.value })} placeholder="تێبینی" className={`${input} resize-none`} />
        <button type="submit" className="rounded-full bg-gold py-3 font-bold text-ink">پاشەکەوتکردن</button>
      </form>
    </Modal>
  )
}

function CompleteDialog({ order, onClose, onSave }) {
  const [p, setP] = useState({ photo: '', decor: '', dj: '' })
  useEffect(() => { if (order) setP({ photo: '', decor: '', dj: '' }) }, [order])
  const needed = order ? SERVICES.filter((s) => (order.services || []).some((x) => x.includes(s.match))) : []
  const shown = needed.length ? needed : SERVICES
  const num = (v) => Number(String(v).replace(/[^\d]/g, '')) || 0
  const sum = shown.reduce((s, x) => s + num(p[x.key]), 0)
  return (
    <Modal open={!!order} onClose={onClose} title={`تەواوکردن — ${order?.name || ''}`}>
      <form
        onSubmit={(e) => { e.preventDefault(); onSave({ photo: num(p.photo), decor: num(p.decor), dj: num(p.dj) }) }}
        className="grid gap-4"
      >
        <p className="text-sm text-mute">نرخی هەر خزمەتگوزارییەک بە دینار بنووسە. دوای پاشەکەوت دەچێتە بەشی قەرز تا پارەکە دەدرێت.</p>
        {shown.map(({ key, label, icon: Icon }) => (
          <label key={key} className="text-sm text-mute">
            <span className="mb-1 flex items-center gap-1.5"><Icon size={14} /> {label}</span>
            <input inputMode="numeric" dir="ltr" value={p[key]} onChange={(e) => setP({ ...p, [key]: e.target.value })} placeholder="0" className={`${input} text-right`} />
          </label>
        ))}
        <p dir="ltr" className="text-right font-bold text-gold">= {iqd(sum)}</p>
        <button type="submit" className="rounded-full bg-emerald-500 py-3 font-bold text-ink">پاشەکەوت و گواستنەوە بۆ قەرز</button>
      </form>
    </Modal>
  )
}

function RejectDialog({ order, onClose, onSave }) {
  const [r, setR] = useState('بەروارەکە گیراوە / ناگونجێت')
  useEffect(() => { if (order) setR('بەروارەکە گیراوە / ناگونجێت') }, [order])
  return (
    <Modal open={!!order} onClose={onClose} title={`ڕەتکردنەوە — ${order?.name || ''}`}>
      <form onSubmit={(e) => { e.preventDefault(); onSave(r) }} className="grid gap-4">
        <textarea rows={3} value={r} onChange={(e) => setR(e.target.value)} className={`${input} resize-none`} />
        <button type="submit" className="rounded-full bg-red-500 py-3 font-bold">ڕەتکردنەوە</button>
      </form>
    </Modal>
  )
}
