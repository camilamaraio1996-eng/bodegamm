import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSite } from '../context/SiteContext'

const C = { gold: '#C4A35A', cream: '#F2EBD9', dark: '#1A1A18', darker: '#111110', card: '#232320', verde: '#2D4A3E', muted: 'rgba(242,235,217,0.55)' }

function FadeUp({ children, delay = 0, style = {} }) {
  const ref = useRef(null); const [v, setV] = useState(false)
  useEffect(() => { const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect() } }, { threshold: 0.08 }); if (ref.current) obs.observe(ref.current); return () => obs.disconnect() }, [])
  return <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={v ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: 'easeOut' }} style={style}>{children}</motion.div>
}

function MenuItem({ item, delay }) {
  const [hov, setHov] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay, ease: 'easeOut' }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        padding: '24px 28px', background: C.card,
        border: `1px solid ${hov ? C.gold : 'rgba(196,163,90,0.1)'}`,
        transition: 'border-color 0.25s',
      }}
    >
      {item.badge && (
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', background: C.verde, color: C.cream, padding: '3px 10px', marginBottom: 10, display: 'inline-block' }}>
          {item.badge}
        </span>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
        <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 21, color: C.cream, fontWeight: 500, lineHeight: 1.2, flex: 1 }}>{item.name}</h4>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: C.gold, fontWeight: 700, flexShrink: 0 }}>${item.price}</span>
      </div>
      {item.description && (
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: C.muted, lineHeight: 1.7, marginTop: 8 }}>{item.description}</p>
      )}
    </motion.div>
  )
}

export default function Menu() {
  const { data } = useSite()
  const menuData = data.menu
  const categories = Object.entries(menuData).map(([key, val]) => ({ key, label: val.label }))
  const [active, setActive] = useState('takeaway')
  const filterRef = useRef(null)
  const sectionRefs = useRef({})

  const scrollTo = (key) => {
    setActive(key)
    const el = sectionRefs.current[key]
    if (el) {
      const offset = (filterRef.current?.offsetHeight ?? 52) + 80
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const fn = () => {
      const offset = (filterRef.current?.offsetHeight ?? 52) + 90
      for (const key of Object.keys(sectionRefs.current).reverse()) {
        const el = sectionRefs.current[key]
        if (el && el.getBoundingClientRect().top <= offset + 10) { setActive(key); break }
      }
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <main>
      {/* HERO */}
      <section style={{ background: C.darker, paddingTop: 72, paddingBottom: 0, minHeight: '40vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse at 50% 0%, rgba(196,163,90,0.07) 0%, transparent 70%)' }} />
        <div style={{ position: 'relative', zIndex: 1, padding: '80px 24px 60px' }}>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: '0.38em', color: C.gold, textTransform: 'uppercase', marginBottom: 16 }}>
            Je Suis Lacan
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(54px, 9vw, 108px)', color: C.cream, lineHeight: 0.9, fontWeight: 600, letterSpacing: '0.05em', marginBottom: 16 }}>
            La Carta
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
            style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, letterSpacing: '0.28em', textTransform: 'uppercase', color: C.muted }}>
            Bar · Bistró · Café · Almacén
          </motion.p>
        </div>
      </section>

      {/* FILTER BAR */}
      <div ref={filterRef} style={{
        position: 'sticky', top: 72, zIndex: 40,
        background: 'rgba(17,17,16,0.95)', backdropFilter: 'blur(16px)',
        borderBottom: `2px solid ${C.gold}`,
        overflowX: 'auto',
      }}>
        <div style={{ display: 'flex', minWidth: 'max-content', maxWidth: 1280, margin: '0 auto' }}>
          {categories.map(({ key, label }) => (
            <button key={key} onClick={() => scrollTo(key)}
              style={{
                fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600,
                letterSpacing: '0.16em', textTransform: 'uppercase',
                color: active === key ? C.cream : C.muted,
                background: active === key ? C.verde : 'transparent',
                border: 'none', padding: '14px 22px', cursor: 'pointer',
                transition: 'all 0.22s', whiteSpace: 'nowrap',
                borderBottom: active === key ? `2px solid ${C.verde}` : '2px solid transparent',
                marginBottom: -2,
              }}
              onMouseEnter={e => { if (active !== key) e.currentTarget.style.color = C.gold }}
              onMouseLeave={e => { if (active !== key) e.currentTarget.style.color = C.muted }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* SECTIONS */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px 100px' }}>
        {categories.map(({ key, label }) => (
          <section key={key} ref={el => sectionRefs.current[key] = el} style={{ paddingTop: 72 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 8 }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(28px, 3vw, 38px)', color: C.cream, fontWeight: 500, flexShrink: 0 }}>{label}</h2>
              <div style={{ flex: 1, height: 1, background: 'rgba(196,163,90,0.2)' }} />
            </div>
            {key === 'especial' && (
              <p style={{ fontFamily: "'EB Garamond', serif", fontSize: 18, color: C.gold, fontStyle: 'italic', marginBottom: 4 }}>
                Los favoritos de la casa — platos con identidad.
              </p>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16, marginTop: 20 }}>
              {menuData[key].items.filter(i => i.visible !== false).map((item, i) => <MenuItem key={item.id || item.name} item={item} delay={i * 0.06} />)}
            </div>
          </section>
        ))}
      </div>

      {/* CTA */}
      <section style={{ background: C.verde, padding: '72px 24px', textAlign: 'center' }}>
        <FadeUp>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(28px, 3.5vw, 42px)', color: C.cream, fontWeight: 500, marginBottom: 12 }}>
            ¿Pedís por WhatsApp?
          </h3>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: 'rgba(242,235,217,0.7)', marginBottom: 28 }}>
            Take away y delivery disponible. Respondemos al toque.
          </p>
          <a href="https://wa.me/541131231586" target="_blank" rel="noopener noreferrer"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#fff', background: '#25D366', padding: '14px 40px', textDecoration: 'none', display: 'inline-block', transition: 'background 0.25s' }}
            onMouseEnter={e => e.currentTarget.style.background = '#1da851'}
            onMouseLeave={e => e.currentTarget.style.background = '#25D366'}>
            Pedir por WhatsApp
          </a>
        </FadeUp>
      </section>
    </main>
  )
}
