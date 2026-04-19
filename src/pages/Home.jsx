import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useSite } from '../context/SiteContext'

const C = {
  gold:      '#C4A35A',
  cream:     '#F2EBD9',
  dark:      '#1A1A18',
  darker:    '#111110',
  card:      '#232320',
  verde:     '#2D4A3E',
  terracota: '#B5533C',
  muted:     'rgba(242,235,217,0.55)',
  subtle:    'rgba(242,235,217,0.08)',
}

/* ── Animation helpers ─────────────────────────────────── */
function FadeUp({ children, delay = 0, style = {} }) {
  const ref = useRef(null)
  const [v, setV] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect() } }, { threshold: 0.12 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={v ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: 'easeOut' }} style={style}>
      {children}
    </motion.div>
  )
}

function FadeIn({ children, delay = 0, dir = 'up', style = {} }) {
  const ref = useRef(null)
  const [v, setV] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect() } }, { threshold: 0.12 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  const from = { opacity: 0, x: dir === 'left' ? -60 : dir === 'right' ? 60 : 0, y: dir === 'up' ? 40 : 0 }
  return (
    <motion.div ref={ref} initial={from} animate={v ? { opacity: 1, x: 0, y: 0 } : {}} transition={{ duration: 0.8, delay, ease: 'easeOut' }} style={style}>
      {children}
    </motion.div>
  )
}

/* ── Data ───────────────────────────────────────────────── */
const featuredDishes = [
  {
    title: 'Picada Lacan',
    desc: 'Queso dambo, muzzarelitas, surimis, jamón crudo y aceitunas. Para dos que pican tres.',
    price: '$7.800',
    img: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=700&q=80',
  },
  {
    title: "Soupe à l'Oignon",
    desc: 'La clásica sopa de cebolla francesa gratinada con gruyère. El toque Lacan.',
    price: '$3.600',
    img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=700&q=80',
  },
  {
    title: 'Milanesa para Compartir',
    desc: 'Dos milanesas a caballo con papas fritas. El plato de la casa.',
    price: '$7.800',
    img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=700&q=80',
  },
]

const promos = [
  { label: 'Café Doble + 2 Medialunas', price: '$1.850' },
  { label: 'Jugo + Tostado', price: '$3.250' },
  { label: 'Licuado + Tostadas con dips', price: '$3.500' },
  { label: '3 Empanadas + Copa de Vino', price: '$3.600' },
]

/* ── Dish card ──────────────────────────────────────────── */
function DishCard({ dish, delay }) {
  const [hov, setHov] = useState(false)
  const ref = useRef(null)
  const [v, setV] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect() } }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 50 }} animate={v ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer', border: `1px solid ${hov ? C.gold : 'rgba(196,163,90,0.12)'}`, transition: 'border-color 0.3s' }}>
      <div style={{ height: 300, overflow: 'hidden' }}>
        <motion.img src={dish.img} alt={dish.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          animate={{ scale: hov ? 1.06 : 1 }} transition={{ duration: 0.5 }} />
      </div>
      <motion.div
        initial={{ y: '100%' }} animate={{ y: hov ? '0%' : '100%' }} transition={{ duration: 0.32, ease: 'easeOut' }}
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(17,17,16,0.97))', padding: '52px 24px 24px' }}>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#9ca3af', lineHeight: 1.75 }}>{dish.desc}</p>
      </motion.div>
      <div style={{ padding: '20px 24px', background: C.card }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: C.cream, fontWeight: 500 }}>{dish.title}</h3>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: C.gold, fontWeight: 600 }}>{dish.price}</span>
        </div>
      </div>
    </motion.div>
  )
}

/* ── Main component ─────────────────────────────────────── */
export default function Home() {
  const { data } = useSite()
  const promos = data.promos.filter(p => p.visible !== false)
  const heroRef = useRef(null)
  const { scrollY } = useScroll()
  const imgY = useTransform(scrollY, [0, 700], [0, 160])

  return (
    <main>
      {/* ══ HERO ══════════════════════════════════════════ */}
      <section ref={heroRef} style={{ position: 'relative', height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div style={{ position: 'absolute', inset: '-20%', y: imgY }}>
          <img src="https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=1800&q=85" alt="Je Suis Lacan"
            style={{ width: '100%', height: '140%', objectFit: 'cover' }} />
        </motion.div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(26,26,24,0.45) 0%, rgba(26,26,24,0.65) 55%, rgba(26,26,24,0.97) 100%)' }} />

        <div style={{ position: 'relative', textAlign: 'center', padding: '0 24px', maxWidth: 900, zIndex: 2 }}>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, letterSpacing: '0.45em', color: C.gold, textTransform: 'uppercase', marginBottom: 22 }}>
            — San Telmo, Buenos Aires —
          </motion.p>

          <motion.h1 initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.4 }}
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(58px, 10vw, 120px)', color: C.cream, lineHeight: 0.95, marginBottom: 26, fontWeight: 600, letterSpacing: '0.05em' }}>
            Je Suis Lacan
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.62 }}
            style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: C.cream, opacity: 0.7, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 10 }}>
            Bar · Bistró · Café · Almacén
          </motion.p>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.78 }}
            style={{ fontFamily: "'EB Garamond', serif", fontSize: 22, color: C.gold, fontStyle: 'italic', marginBottom: 44 }}>
            "Lo real, lo imaginario, lo simbólico."
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.95 }}
            style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/menu">
              <button style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.cream, background: C.verde, border: `2px solid ${C.verde}`, padding: '14px 38px', cursor: 'pointer', transition: 'all 0.25s' }}
                onMouseEnter={e => { e.target.style.background = '#1e3329'; e.target.style.borderColor = '#1e3329' }}
                onMouseLeave={e => { e.target.style.background = C.verde; e.target.style.borderColor = C.verde }}>
                Ver la Carta
              </button>
            </Link>
            <Link to="/contacto">
              <button style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.gold, background: 'transparent', border: `2px solid ${C.gold}`, padding: '14px 38px', cursor: 'pointer', transition: 'all 0.25s' }}
                onMouseEnter={e => { e.target.style.background = C.gold; e.target.style.color = C.dark }}
                onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = C.gold }}>
                Cómo Llegar
              </button>
            </Link>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
          style={{ position: 'absolute', bottom: 38, left: '50%', zIndex: 2 }}
          className="bounce-arrow">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="1.8"><polyline points="6 9 12 15 18 9"/></svg>
        </motion.div>
      </section>

      {/* ══ MARQUEE ═══════════════════════════════════════ */}
      <div style={{ background: C.darker, borderTop: `1px solid ${C.gold}`, borderBottom: `1px solid ${C.gold}`, padding: '16px 0', overflow: 'hidden' }}>
        <div className="marquee-track">
          {[1, 2].map(k => (
            <span key={k} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, fontWeight: 600, letterSpacing: '0.3em', color: C.gold, textTransform: 'uppercase' }}>
              &nbsp;&nbsp;CAFÉ&nbsp;&nbsp;·&nbsp;&nbsp;MEDIALUNAS&nbsp;&nbsp;·&nbsp;&nbsp;PICADA LACAN&nbsp;&nbsp;·&nbsp;&nbsp;SOUPE À L'OIGNON&nbsp;&nbsp;·&nbsp;&nbsp;MALBEC&nbsp;&nbsp;·&nbsp;&nbsp;EMPANADAS FRITAS&nbsp;&nbsp;·&nbsp;&nbsp;CHOCOTORTA&nbsp;&nbsp;·&nbsp;&nbsp;SAN TELMO&nbsp;&nbsp;·&nbsp;&nbsp;TOSTADOS&nbsp;&nbsp;·&nbsp;&nbsp;LIVE MUSIC&nbsp;&nbsp;·&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ══ ABOUT ═════════════════════════════════════════ */}
      <section style={{ padding: '110px 24px', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 72, alignItems: 'center' }}>
          <FadeIn dir="left">
            <div style={{ position: 'relative' }}>
              <img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=900&q=80" alt="Interior"
                style={{ width: '100%', height: 520, objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: -20, right: -20, background: C.gold, padding: '20px 28px', zIndex: 2 }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 34, color: C.dark, lineHeight: 1, fontWeight: 700 }}>1786</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: C.dark, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 2 }}>Pasaje San Lorenzo</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn dir="right" delay={0.1}>
            <div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: '0.32em', color: C.gold, textTransform: 'uppercase', marginBottom: 16 }}>Balcarce 749 · San Telmo</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(34px, 4vw, 50px)', color: C.cream, lineHeight: 1.15, marginBottom: 24, fontWeight: 500 }}>
                Una esquina declarada<br /><em style={{ color: C.gold, fontStyle: 'italic' }}>de interés cultural</em>
              </h2>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: C.muted, lineHeight: 1.9, marginBottom: 32 }}>
                Sobre el Pasaje San Lorenzo — el más antiguo de Buenos Aires, trazado en 1786 — funciona este espacio que no termina de decidir si es un bar, un café, una galería o un estado de ánimo. Y eso está bien.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 36 }}>
                {['Café, desayunos y meriendas artesanales', 'Música en vivo — noches de semana', 'Bar con vinos Mendoza, cervezas y tragos', 'Pastelería propia elaborada en casa', 'Take away y delivery disponible'].map(t => (
                  <div key={t} style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                    <span style={{ fontSize: 18, color: C.gold }}>·</span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: C.cream }}>{t}</span>
                  </div>
                ))}
              </div>
              <Link to="/nosotros">
                <button style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.gold, background: 'transparent', border: `1.5px solid ${C.gold}`, padding: '12px 28px', cursor: 'pointer', transition: 'all 0.25s' }}
                  onMouseEnter={e => { e.target.style.background = C.gold; e.target.style.color = C.dark }}
                  onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = C.gold }}>
                  Nuestra Historia
                </button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══ FEATURED DISHES ═══════════════════════════════ */}
      <section style={{ background: C.darker, padding: '100px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <FadeUp style={{ textAlign: 'center', marginBottom: 64 }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: '0.32em', color: C.gold, textTransform: 'uppercase', marginBottom: 12 }}>Lo que no podés perderte</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(34px, 4vw, 50px)', color: C.cream, fontWeight: 500 }}>Platos Destacados</h2>
          </FadeUp>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: 28 }}>
            {featuredDishes.map((d, i) => <DishCard key={d.title} dish={d} delay={i * 0.12} />)}
          </div>
          <FadeUp style={{ textAlign: 'center', marginTop: 52 }}>
            <Link to="/menu">
              <button style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.gold, background: 'transparent', border: `1.5px solid ${C.gold}`, padding: '14px 40px', cursor: 'pointer', transition: 'all 0.25s' }}
                onMouseEnter={e => { e.target.style.background = C.gold; e.target.style.color = C.dark }}
                onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = C.gold }}>
                Ver Carta Completa
              </button>
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* ══ RSI EXPERIENCIA ═══════════════════════════════ */}
      <section style={{ position: 'relative', padding: '100px 24px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src="https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=1600&q=75" alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(17,17,16,0.9)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1100, margin: '0 auto' }}>
          <FadeUp style={{ textAlign: 'center', marginBottom: 64 }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: '0.32em', color: C.gold, textTransform: 'uppercase', marginBottom: 12 }}>La triada</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(34px, 4vw, 50px)', color: C.cream, fontWeight: 500 }}>RSI — La Experiencia Lacan</h2>
          </FadeUp>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 48 }}>
            {[
              { label: 'Lo Real', sub: 'La comida, el barrio, la gente' },
              { label: 'Lo Imaginario', sub: 'La atmósfera, la música, la tarde' },
              { label: 'Lo Simbólico', sub: 'El nombre, la cultura, la identidad' },
              { label: '1786', sub: 'Pasaje San Lorenzo' },
            ].map(({ label, sub }) => (
              <FadeUp key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: label.length <= 4 ? 56 : 38, color: C.gold, lineHeight: 1, marginBottom: 10, fontWeight: 600 }}>{label}</div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: C.cream, letterSpacing: '0.14em', textTransform: 'uppercase', opacity: 0.65 }}>{sub}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══ MÚSICA EN VIVO ════════════════════════════════ */}
      <section style={{ background: `linear-gradient(135deg, #1a0a08 0%, #6b2d1f 50%, #1a0a08 100%)`, padding: '100px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'url(https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=1200&q=70) center/cover', opacity: 0.12 }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 700, margin: '0 auto' }}>
          <FadeUp>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: '0.4em', color: 'rgba(196,163,90,0.8)', textTransform: 'uppercase', marginBottom: 16 }}>En vivo</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(42px, 7vw, 78px)', color: C.cream, lineHeight: 1.05, marginBottom: 20, fontWeight: 600 }}>
              MÚSICA<br /><em style={{ color: C.gold, fontStyle: 'italic' }}>en Vivo</em>
            </h2>
            <div style={{ width: 56, height: 1.5, background: C.gold, margin: '0 auto 28px' }} />
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 17, color: 'rgba(242,235,217,0.8)', lineHeight: 1.85, marginBottom: 40 }}>
              Noches con shows que no pertenecen al bar.<br />
              Eso es exactamente lo que los hace únicos.
            </p>
            <a href="https://instagram.com/jesuislacan" target="_blank" rel="noopener noreferrer">
              <button style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.dark, background: C.gold, border: 'none', padding: '16px 44px', cursor: 'pointer', transition: 'background 0.25s' }}
                onMouseEnter={e => e.target.style.background = '#d4b36a'}
                onMouseLeave={e => e.target.style.background = C.gold}>
                Seguinos en Instagram
              </button>
            </a>
          </FadeUp>
        </div>
      </section>

      {/* ══ PROMOS ════════════════════════════════════════ */}
      <section style={{ background: C.dark, padding: '100px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <FadeUp style={{ textAlign: 'center', marginBottom: 60 }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: '0.32em', color: C.gold, textTransform: 'uppercase', marginBottom: 12 }}>Del día</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(34px, 4vw, 50px)', color: C.cream, fontWeight: 500 }}>Promos de la Casa</h2>
          </FadeUp>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            {promos.map(({ label, price, id }, i) => (
              <FadeUp key={id || label} delay={i * 0.08}>
                <div style={{ background: C.card, padding: '32px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 150, border: '1px solid rgba(196,163,90,0.1)' }}>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: C.cream, fontWeight: 500, lineHeight: 1.35 }}>{label}</p>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 30, color: C.gold, fontWeight: 700, marginTop: 16 }}>{price}</span>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA WHATSAPP ══════════════════════════════════ */}
      <section style={{ position: 'relative', padding: '120px 24px', textAlign: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1400&q=75" alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(17,17,16,0.85)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 640, margin: '0 auto' }}>
          <FadeUp>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: '0.3em', color: C.gold, textTransform: 'uppercase', marginBottom: 16 }}>Reservas & consultas</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(34px, 5vw, 58px)', color: C.cream, lineHeight: 1.15, marginBottom: 24, fontWeight: 500 }}>
              ¿Querés hacer<br /><em style={{ color: C.gold, fontStyle: 'italic' }}>una reserva?</em>
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: C.muted, lineHeight: 1.8, marginBottom: 40 }}>
              Escribinos por WhatsApp y te respondemos al toque.<br />
              Take away y delivery disponible.
            </p>
            <a href="https://wa.me/541131231586" target="_blank" rel="noopener noreferrer">
              <button style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#fff', background: '#25D366', border: 'none', padding: '16px 48px', cursor: 'pointer', transition: 'background 0.25s' }}
                onMouseEnter={e => e.target.style.background = '#1da851'}
                onMouseLeave={e => e.target.style.background = '#25D366'}>
                Escribir por WhatsApp
              </button>
            </a>
          </FadeUp>
        </div>
      </section>
    </main>
  )
}
