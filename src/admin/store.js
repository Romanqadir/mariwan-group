// Private bookkeeping data for the hidden control panel.
// Saved only in THIS browser (localStorage) — use Backup / Restore to move it between devices.
const KEY = 'mariwanAdminData'
export const AUTH_KEY = 'mariwanAdminLoggedIn'
export const ADMIN_PASSWORD = '7777'

const empty = () => ({ active: [], pending: [], completed: [], rejected: [] })

export function load() {
  try {
    const d = JSON.parse(localStorage.getItem(KEY))
    if (d && Array.isArray(d.active)) return { ...empty(), ...d }
  } catch {}
  return empty()
}

export function save(data) {
  try {
    localStorage.setItem(KEY, JSON.stringify(data))
  } catch {}
}

// Called by the public booking form so a booking made on this device also appears in the panel.
export function addBooking(order) {
  const d = load()
  d.active.push({ id: Date.now(), createdAt: new Date().toISOString(), ...order })
  save(d)
}

export const total = (o) => (o.prices ? (o.prices.photo || 0) + (o.prices.decor || 0) + (o.prices.dj || 0) : 0)
