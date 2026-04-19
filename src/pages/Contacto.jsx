import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const C = { gold: '#C4A35A', cream: '#F2EBD9', dark: '#1A1A18', darker: '#111110', card: '#232320', verde: '#2D4A3E', terracota: '#B5533C', muted: 'rgba(242,235,217,0.55)' }

function FadeUp({ children, delay = 0, style = {} }) {
  const ref = useRef(null); const [v, setV] = useState(false)
  useEffect(() => { const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect() } }, { threshold: 0.1 }); if (ref.current) obs.observe(ref.current); return () => obs.disconnect() }, [])
  return <motion.div ref={ref} initial={{ opacity: 0, y: 36 }} animate={v ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay, ease: 'easeOut' }} style={style}>{children}</motion.div>
}

function FadeIn({ children, delay = 0, dir = 'up', style = {} }) {
  const ref = useRef(null); const [v, setV] = useState(false)
  useEffect(() => { const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect() } }, { threshold: 0.1 }); if (ref.current) obs.observe(ref.current); return () => obs.disconnect() }, [])
  const from = { opacity: 0, x: dir === 'left' ? -50 : dir === 'right' ? 50 : 0, y: dir === 'up' ? 36 : 0 }
  return <motion.div ref={ref} initial={from} animate={v ? { opacity: 1, x: 0, y: 0 } : {}} transition={{ duration: 0.75, delay, ease: 'easeOut' }} style={style}>{children}</motion.div>
}

const infoItems = [
  { title: 'Dirección', lines: ['Balcarce 749', 'San Telmo, CABA', 'Buenos Aires, Argentina'], cta: { label: 'Ver en Maps', href: 'https://maps.google.com/?q=Balcarce+749+San+Telmo+Buenos+Aires' } },
  { title: 'Teléfono', lines: ['11 3123-1586'], cta: { label: 'Llamar ahora', href: 'tel:+541131231586' } },
  { title: 'Horarios', lines: ['Martes a Domingo', '10:00 — 23:45', 'Lunes: cerrado'] },
  { title: 'WhatsApp', lines: ['Reservas y pedidos', 'Respondemos al toque'], cta: { label: 'Abrir WhatsApp', href: 'https://wa.me/541131231586', green: true } },
]

const transport = [
  { icon: '🚇', title: 'Subte', desc: 'Línea C — Estación San Juan (5 min). Línea E — Estación San José (8 min).' },
  { icon: '🚌', title: 'Colectivos', desc: 'Líneas 24, 29, 33, 64, 86 y 168 por Balcarce y avenidas cercanas.' },
  { icon: '🚗', title: 'Auto', desc: 'Estacionamiento en calle o en Chacabuco 360, a 200m.' },
  { icon: '🚴', title: 'EcoBici', desc: 'Estación a 100m en Humberto Primo y Balcarce. Ciclovía disponible.' },
]

export default function Contacto() {
  return (
    <main>
      {/* HERO */}
      <section style={{ position: 'relative', minHeight: '42vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', paddingTop: 72, overflow: 'hidden', background: C.darker }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src="https://images.unsplash.com/photo-1601933513793-9b0a13c4bb28?w=1400&q=75" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(17,17,16,0.8)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 1, padding: '80px 24px 60px' }}>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: '0.4em', color: C.gold, textTransform: 'uppercase', marginBottom: 16 }}>
            Balcarce 749 · San Telmo
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(52px, 8vw, 96px)', color: C.cream, lineHeight: 0.95, fontWeight: 600, letterSpacing: '0.05em', marginBottom: 14 }}>
            Contacto
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
            style={{ fontFamily: "'EB Garamond', serif", fontSize: 20, color: C.gold, fontStyle: 'italic' }}>
            Vení, escribinos o llamanos.
          </motion.p>
        </div>
      </section>

      {/* INFO BLOCKS */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
          {infoItems.map(({ title, lines, cta }, i) => (
            <FadeUp key={title} delay={i * 0.1}>
              <div style={{ padding: '36px 28px', background: C.card, border: '1px solid rgba(196,163,90,0.12)', height: '100%' }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, letterSpacing: '0.28em', color: C.gold, textTransform: 'uppercase', marginBottom: 16 }}>{title}</p>
                <div style={{ marginBottom: cta ? 24 : 0 }}>
                  {lines.map((l, j) => (
                    <p key={j} style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: j === 1 ? C.cream : C.muted, lineHeight: 1.9, fontWeight: j === 1 ? 500 : 400 }}>{l}</p>
                  ))}
                </div>
                {cta && (
                  <a href={cta.href} target={cta.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                    style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: C.cream, background: cta.green ? '#25D366' : C.verde, padding: '9px 18px', textDecoration: 'none', display: 'inline-block', transition: 'background 0.22s' }}
                    onMouseEnter={e => e.currentTarget.style.background = cta.green ? '#1da851' : '#1e3329'}
                    onMouseLeave={e => e.currentTarget.style.background = cta.green ? '#25D366' : C.verde}>
                    {cta.label}
                  </a>
                )}
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* MAP */}
      <section style={{ padding: '0 24px 80px', maxWidth: 1280, margin: '0 auto' }}>
        <FadeIn dir="up">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
            <div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: '0.28em', color: C.gold, textTransform: 'uppercase', marginBottom: 8 }}>Cómo llegar</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(26px, 3vw, 36px)', color: C.cream, fontWeight: 500 }}>Balcarce 749, San Telmo</h2>
            </div>
            <a href="https://maps.google.com/?q=Balcarce+749+San+Telmo+Buenos+Aires" target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: C.cream, background: C.verde, padding: '11px 22px', textDecoration: 'none', transition: 'background 0.22s' }}
              onMouseEnter={e => e.currentTarget.style.background = '#1e3329'}
              onMouseLeave={e => e.currentTarget.style.background = C.verde}>
              Abrir en Maps
            </a>
          </div>
          <div style={{ border: `1px solid rgba(196,163,90,0.2)`, overflow: 'hidden' }}>
            <iframe
              title="Mapa Je Suis Lacan"
              width="100%" height="420"
              style={{ border: 0, display: 'block', filter: 'grayscale(15%) contrast(1.05)' }}
              loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.7!2d-58.3704!3d-34.6199!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccab2def07e57%3A0x0!2sBalcarce%20749%2C%20San%20Telmo%2C%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1"
            />
          </div>
        </FadeIn>
      </section>

      {/* TRANSPORT */}
      <section style={{ background: C.darker, padding: '80px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <FadeUp style={{ marginBottom: 48 }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: '0.28em', color: C.gold, textTransform: 'uppercase', marginBottom: 10 }}>Transporte</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(28px, 3vw, 38px)', color: C.cream, fontWeight: 500 }}>Cómo llegar al bar</h2>
          </FadeUp>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            {transport.map(({ icon, title, desc }, i) => (
              <FadeUp key={title} delay={i * 0.09}>
                <div style={{ display: 'flex', gap: 18, padding: '28px 24px', background: C.card, border: '1px solid rgba(196,163,90,0.1)' }}>
                  <span style={{ fontSize: 28, flexShrink: 0, lineHeight: 1 }}>{icon}</span>
                  <div>
                    <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: C.cream, fontWeight: 500, marginBottom: 6 }}>{title}</h4>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>{desc}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* REDES */}
      <section style={{ padding: '80px 24px', textAlign: 'center' }}>
        <FadeUp>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(28px, 3.5vw, 42px)', color: C.cream, fontWeight: 500, marginBottom: 10 }}>
            Seguinos
          </h3>
          <p style={{ fontFamily: "'EB Garamond', serif", fontSize: 20, color: C.gold, fontStyle: 'italic', marginBottom: 32 }}>
            Música en vivo, menú del día, novedades.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://instagram.com/jesuislacan" target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: C.cream, background: C.terracota, padding: '13px 30px', textDecoration: 'none', transition: 'background 0.22s' }}
              onMouseEnter={e => e.currentTarget.style.background = '#9a4532'}
              onMouseLeave={e => e.currentTarget.style.background = C.terracota}>
              Instagram @jesuislacan
            </a>
            <a href="https://wa.me/541131231586" target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#fff', background: '#25D366', padding: '13px 30px', textDecoration: 'none', transition: 'background 0.22s' }}
              onMouseEnter={e => e.currentTarget.style.background = '#1da851'}
              onMouseLeave={e => e.currentTarget.style.background = '#25D366'}>
              WhatsApp
            </a>
          </div>
        </FadeUp>
      </section>
    </main>
  )
}
