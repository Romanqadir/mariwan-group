import { motion } from 'motion/react'

export const ease = [0.22, 1, 0.36, 1]

export function Reveal({ children, delay = 0, y = 32, className = '', as = 'div' }) {
  const M = motion[as]
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </M>
  )
}

export function SectionHeading({ eyebrow, title, text, center = false }) {
  return (
    <div className={`mb-12 md:mb-16 ${center ? 'text-center mx-auto' : ''} max-w-2xl`}>
      <Reveal>
        <p
          dir="ltr"
          className={`font-display italic text-gold text-xl md:text-2xl mb-3 tracking-wide ${center ? '' : 'text-right'}`}
        >
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">{title}</h2>
      </Reveal>
      {text && (
        <Reveal delay={0.16}>
          <p className="mt-5 text-mute text-base md:text-lg leading-loose">{text}</p>
        </Reveal>
      )}
    </div>
  )
}

export function GoldButton({ href, children, onClick, className = '', external, type }) {
  const cls = `group relative inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 font-bold text-ink overflow-hidden transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98] ${className}`
  const inner = (
    <>
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-l from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <span className="relative flex items-center gap-2">{children}</span>
    </>
  )
  if (href)
    return (
      <a href={href} className={cls} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {inner}
      </a>
    )
  return (
    <button type={type || 'button'} onClick={onClick} className={cls}>
      {inner}
    </button>
  )
}

export function GhostButton({ href, children, className = '' }) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-ivory/30 px-7 py-3.5 font-medium text-ivory backdrop-blur-sm transition-colors duration-300 hover:border-gold hover:text-gold ${className}`}
    >
      {children}
    </a>
  )
}
