// ─────────────────────────────────────────────────────────────
//  All text, links and numbers of the website live here.
//  Edit this file to change phone numbers, links, packages, etc.
// ─────────────────────────────────────────────────────────────
import photos from './photos.json'
import decor from './decor.json'

export const media = (p) => `${import.meta.env.BASE_URL}media/${p}`

export const PHONE_INTL = '9647507895508' // used for WhatsApp / Viber / Telegram
export const PHONE_LOCAL = '07507895508'
export const PHONE_DISPLAY = '0750 789 5508'

export const whatsappLink = (text) =>
  `https://wa.me/${PHONE_INTL}${text ? `?text=${encodeURIComponent(text)}` : ''}`

export const MAPS_URL = 'https://maps.app.goo.gl/BGts1qzC9qzv46hW8'

export const nav = [
  { id: 'services', label: 'خزمەتگوزارییەکان' },
  { id: 'gallery', label: 'وێنەکان' },
  { id: 'films', label: 'کلیپەکان' },
  { id: 'decor', label: 'دیکۆر' },
  { id: 'packages', label: 'پاکێجەکان' },
  { id: 'contact', label: 'پەیوەندی' },
]

export const services = [
  {
    key: 'photo',
    icon: 'camera',
    title: 'فۆتۆگرافی',
    en: 'Photography',
    text: 'وێنەگرتنی بووک و زاوا و ئاهەنگەکان بە ستایلی سینەمایی و ڕووناکی سروشتی.',
  },
  {
    key: 'video',
    icon: 'film',
    title: 'ڤیدیۆگرافی',
    en: 'Cinematic Films',
    text: 'کلیپی سینەمایی بە کامێرای پێشکەوتوو، درۆن و دەستکاریی پرۆفیشناڵ.',
  },
  {
    key: 'decor',
    icon: 'sparkles',
    title: 'دیکۆر و ڕازاندنەوە',
    en: 'Decor & Design',
    text: 'دیزاین و ڕازاندنەوەی شوێنی ئاهەنگ، گوڵ و ڕووناکی بە شێوەیەکی شاهانە.',
  },
  {
    key: 'dj',
    icon: 'music',
    title: 'دیجەی',
    en: 'DJ & Sound',
    text: 'سیستەمی دەنگ و ڕووناکی و دیجەی پرۆفیشناڵ بۆ ئاهەنگێکی بیرنەکراو.',
  },
]

export const photoList = photos.map((p) => ({
  src: media(`photos/${p.id}.webp`),
  thumb: media(`photos/${p.id}-sm.webp`),
  w: p.w,
  h: p.h,
}))

export const decorList = decor.map((p) => ({
  src: media(`decor/${p.id}.webp`),
  thumb: media(`decor/${p.id}-sm.webp`),
  w: p.w,
  h: p.h,
}))

export const reels = [1, 2, 3, 4, 5].map((i) => ({
  src: media(`decor/reel${i}.mp4`),
  poster: media(`decor/reel${i}.jpg`),
}))

export const films = [
  { n: 1, duration: '1:51' },
  { n: 2, duration: '2:23' },
  { n: 3, duration: '2:13' },
  { n: 4, duration: '2:13' },
  { n: 5, duration: '3:07' },
  { n: 6, duration: '2:01' },
].map((f) => ({
  ...f,
  src: media(`clips/clip${f.n}.mp4`),
  poster: media(`clips/clip${f.n}.jpg`),
}))

export const packages = [
  {
    name: 'Normal Package',
    title: 'پاکێجی ئاسایی',
    text: 'پاکێجی ئاسایی وێنەگرتنی بووک و زاوا بە بەرزترین کوالێتی.',
    image: media('packages/normal.webp'),
    featured: false,
  },
  {
    name: 'Golden Package',
    title: 'پاکێجی گۆڵدن',
    text: 'پاکێجی تایبەت بە وێنەگرتن، کلیپ و ئەلبوومی شاهانە (VIP).',
    image: media('packages/golden.webp'),
    featured: true,
  },
]

export const contacts = [
  { key: 'whatsapp', label: 'واتسئەپ', en: 'WhatsApp', href: whatsappLink(), color: '#25D366' },
  { key: 'viber', label: 'ڤایبەر', en: 'Viber', href: `viber://chat?number=%2B${PHONE_INTL}`, color: '#7360F2' },
  { key: 'telegram', label: 'تیلیگرام', en: 'Telegram', href: `https://t.me/+${PHONE_INTL}`, color: '#29A9EB' },
  { key: 'phone', label: 'پەیوەندی ڕاستەوخۆ', en: PHONE_DISPLAY, href: `tel:${PHONE_LOCAL}`, color: '#d4b483' },
]

export const socials = [
  { key: 'instagram', label: 'ئینستاگرامی فۆتۆگرافی', handle: '@mariwan_group', href: 'https://www.instagram.com/mariwan_group' },
  { key: 'instagram', label: 'ئینستاگرامی دیکۆر', handle: '@mariwan_design1', href: 'https://www.instagram.com/mariwan_design1' },
  { key: 'snapchat', label: 'سناپچات', handle: 'Snapchat', href: 'https://snapchat.com/t/4BubFY4K' },
  { key: 'tiktok', label: 'تیکتۆک', handle: '@mariwan_ehsan', href: 'https://www.tiktok.com/@mariwan_ehsan' },
]

export const weekDays = ['یەکشەممە', 'دووشەممە', 'سێشەممە', 'چوارشەممە', 'پێنجشەممە', 'هەینی', 'شەممە']
