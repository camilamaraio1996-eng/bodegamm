import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

const C = {
  dark:      '#0B0B0B',
  bordo:     '#4A0E1A',
  wine:      '#6B1D2C',
  champagne: '#D7C3A1',
  sand:      '#E6D8C3',
  gold:      '#C9A66B',
  cream:     '#F5F1EA',
  muted:     'rgba(245,241,234,0.6)',
}

function useInView(threshold = 0.1) {
  const ref = useRef(null)
  const [v, setV] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect() } }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, v]
}

function FadeUp({ children, delay = 0, style = {} }) {
  const [ref, v] = useInView(0.1)
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 48 }} animate={v ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }} style={style}>
      {children}
    </motion.div>
  )
}

function FadeIn({ children, delay = 0, dir = 'up', style = {} }) {
  const [ref, v] = useInView(0.08)
  const from = { opacity: 0, x: dir === 'left' ? -64 : dir === 'right' ? 64 : 0, y: dir === 'up' ? 48 : 0 }
  return (
    <motion.div ref={ref} initial={from} animate={v ? { opacity: 1, x: 0, y: 0 } : {}} transition={{ duration: 0.9, delay, ease: [0.25, 0.46, 0.45, 0.94] }} style={style}>
      {children}
    </motion.div>
  )
}

const experiencias = [
  {
    title: 'Cata',
    sub: 'La Experiencia Esencial',
    img: 'https://images.unsplash.com/photo-1543218024-57a70143c369?w=800&q=85',
    includes: ['Recorrido por bodega histórica', 'Visita al viñedo', 'Degustación guiada de 3 vinos'],
    color: C.gold,
  },
  {
    title: 'Wine House',
    sub: 'Vino, Sabor y Experiencia',
    img: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=800&q=85',
    includes: ['Recorrido por bodega y viñedo', 'Degustación de 4 vinos de autor', 'Tabla de fiambres y quesos', 'Panificados caseros · Dips · Postre'],
    color: C.champagne,
  },
  {
    title: 'Vinos y Fuegos',
    sub: 'La Experiencia Premium',
    img: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=800&q=85',
    includes: ['Recorrido completo · Empanadas fritas', 'Asado: vacío, costillas, chorizos, matambre', 'Ensaladas · Flan casero', 'Maridaje ilimitado con vinos de la bodega'],
    color: C.sand,
  },
]

const eventos = [
  { day: 'Cada Viernes y Sábado', title: 'Wine Lovers', desc: 'Noches de encuentro, música en vivo y vinos de autor en los viñedos.', img: '/evento-musica.jpg' },
  { day: 'Domingos al Atardecer', title: 'Sunset Sessions', desc: 'El sol se pone entre las vides. Copa en mano, tiempo propio.', img: 'https://images.unsplash.com/photo-1586370434639-0fe43b2d32e6?w=700&q=80' },
  { day: 'A Convenir', title: 'Eventos Privados', desc: 'Casamientos boutique, cumpleaños, corporativos. La bodega como escenario.', img: '/evento-ambiente.jpg' },
]

const testimonios = [
  { name: 'Valeria M.', origen: 'Buenos Aires', texto: 'Una experiencia que supera cualquier expectativa. Los vinos son extraordinarios y la atención completamente personalizada. Volveríamos mil veces.', stars: 5 },
  { name: 'Rodrigo y Caro', origen: 'Córdoba', texto: 'Festejamos nuestro aniversario con la experiencia Wine House. El entorno del viñedo al atardecer fue mágico. Gracias por hacer de ese momento algo tan especial.', stars: 5 },
  { name: 'Familia Torres', origen: 'Mendoza Capital', texto: 'La mejor bodega boutique de San Rafael, sin dudas. Atendida por sus propios dueños, con una calidez y pasión que se nota en cada copa.', stars: 5 },
]

function ExperienciaCard({ exp, delay, index }) {
  const [hov, setHov] = useState(false)
  const [ref, v] = useInView(0.06)
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 56 }} animate={v ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: 'easeOut' }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer', background: '#0f0f0f', border: `1px solid ${hov ? 'rgba(201,166,107,0.4)' : 'rgba(201,166,107,0.1)'}`, transition: 'all 0.45s', transform: hov ? 'translateY(-6px)' : 'none' }}>

      <div style={{ height: 340, overflow: 'hidden', position: 'relative' }}>
        <motion.img src={exp.img} alt={exp.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          animate={{ scale: hov ? 1.08 : 1 }} transition={{ duration: 0.7 }} />
        <div style={{ position: 'absolute', inset: 0, background: hov ? 'linear-gradient(to bottom, rgba(11,11,11,0.2) 0%, rgba(11,11,11,0.7) 100%)' : 'linear-gradient(to bottom, rgba(11,11,11,0.1) 0%, rgba(11,11,11,0.55) 100%)', transition: 'all 0.45s' }} />

        <div style={{ position: 'absolute', top: 18, left: 18, background: 'rgba(11,11,11,0.75)', backdropFilter: 'blur(10px)', padding: '5px 14px', border: `1px solid ${exp.color}30` }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: '0.22em', color: exp.color, textTransform: 'uppercase' }}>Experiencia {index + 1}</span>
        </div>
      </div>

      <div style={{ padding: '28px 28px 32px' }}>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: '0.28em', color: exp.color, textTransform: 'uppercase', marginBottom: 10, opacity: 0.85 }}>{exp.sub}</p>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(30px, 3.5vw, 40px)', color: C.cream, fontWeight: 500, marginBottom: 20, lineHeight: 1.1 }}>{exp.title}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 26 }}>
          {exp.includes.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{ color: exp.color, fontSize: 12, marginTop: 2, flexShrink: 0 }}>✦</span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: C.muted, lineHeight: 1.5 }}>{item}</span>
            </div>
          ))}
        </div>
        <motion.div animate={{ width: hov ? '100%' : '0%' }} transition={{ duration: 0.35 }}
          style={{ height: 1, background: exp.color, marginBottom: 22, opacity: 0.5 }} />
        <Link to="/contacto" style={{ textDecoration: 'none' }}>
          <button style={{
            fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase',
            color: hov ? C.dark : exp.color, background: hov ? exp.color : 'transparent',
            border: `1.5px solid ${exp.color}`, padding: '12px 28px', cursor: 'pointer', transition: 'all 0.3s', width: '100%',
          }}>
            Reservar Experiencia
          </button>
        </Link>
      </div>
    </motion.div>
  )
}

function EventoCard({ ev, delay }) {
  const [hov, setHov] = useState(false)
  const [ref, v] = useInView(0.06)
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 40 }} animate={v ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.72, delay }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer' }}>
      <div style={{ height: 400, overflow: 'hidden' }}>
        <motion.img src={ev.img} alt={ev.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: hov ? 'brightness(0.65)' : 'brightness(0.45)' }}
          animate={{ scale: hov ? 1.07 : 1 }} transition={{ duration: 0.65 }} />
      </div>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '32px 28px' }}>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: '0.28em', color: C.gold, textTransform: 'uppercase', marginBottom: 10 }}>{ev.day}</p>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(28px, 3vw, 36px)', color: C.cream, fontWeight: 500, marginBottom: 10, lineHeight: 1.1 }}>{ev.title}</h3>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'rgba(245,241,234,0.75)', lineHeight: 1.65 }}>{ev.desc}</p>
        <motion.div animate={{ width: hov ? '100%' : 0 }} transition={{ duration: 0.38 }}
          style={{ height: 1.5, background: C.gold, marginTop: 20 }} />
      </div>
    </motion.div>
  )
}

function StarIcon() {
  return <span style={{ color: C.gold, fontSize: 14 }}>★</span>
}

export default function Home() {
  const heroRef = useRef(null)
  const { scrollY } = useScroll()
  const imgY   = useTransform(scrollY, [0, 900], [0, 200])
  const textY  = useTransform(scrollY, [0, 600], [0, 70])

  return (
    <div style={{ background: C.dark }}>

      {/* ══ HERO ══════════════════════════════════════════════════ */}
      <section ref={heroRef} style={{ position: 'relative', height: '100vh', minHeight: 680, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div style={{ position: 'absolute', inset: '-20%', y: imgY }}>
          <img
            src="https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1800&q=90"
            alt="Viñedos Terra Lombarda"
            style={{ width: '100%', height: '140%', objectFit: 'cover' }}
          />
        </motion.div>

        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(11,11,11,0.4) 0%, rgba(11,11,11,0.65) 45%, rgba(11,11,11,0.98) 100%)' }} />

        <motion.div style={{ position: 'relative', textAlign: 'center', padding: '0 28px', maxWidth: 920, zIndex: 2, y: textY }}>
          <motion.p
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.2 }}
            style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, letterSpacing: '0.52em', color: C.gold, textTransform: 'uppercase', marginBottom: 30, opacity: 0.9 }}>
            — San Rafael · Mendoza · Argentina —
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 44 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(52px, 10vw, 120px)', color: C.cream, lineHeight: 0.88, marginBottom: 26, fontWeight: 500, letterSpacing: '0.06em' }}>
            BODEGA<br />
            <em style={{ color: C.gold, fontStyle: 'italic', fontWeight: 400 }}>Terra Lombarda</em>
          </motion.h1>

          <motion.div
            initial={{ width: 0 }} animate={{ width: 72 }} transition={{ delay: 0.95, duration: 0.8 }}
            style={{ height: 1, background: C.gold, margin: '0 auto 32px', opacity: 0.6 }} />

          <motion.p
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1.0 }}
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(17px, 2.2vw, 23px)', color: C.cream, fontStyle: 'italic', opacity: 0.85, marginBottom: 8, lineHeight: 1.5 }}>
            Nuestra Bodega, Nuestra Casa.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1.12 }}
            style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(12px, 1.4vw, 15px)', color: C.champagne, opacity: 0.8, marginBottom: 52, lineHeight: 1.6, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Experiencias Boutique entre Viñedos y Vinos de Autor
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1.28 }}
            style={{ display: 'flex', gap: 18, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contacto" style={{ textDecoration: 'none' }}>
              <button
                style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: C.dark, background: C.gold, border: `2px solid ${C.gold}`, padding: '16px 44px', cursor: 'pointer', transition: 'all 0.3s' }}
                onMouseEnter={e => { e.target.style.background = 'transparent'; e.target.style.color = C.gold }}
                onMouseLeave={e => { e.target.style.background = C.gold; e.target.style.color = C.dark }}>
                Reservar Experiencia
              </button>
            </Link>
            <Link to="/experiencias" style={{ textDecoration: 'none' }}>
              <button
                style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: C.cream, background: 'transparent', border: `2px solid rgba(245,241,234,0.4)`, padding: '16px 44px', cursor: 'pointer', transition: 'all 0.3s' }}
                onMouseEnter={e => { e.target.style.borderColor = C.cream; e.target.style.background = 'rgba(245,241,234,0.07)' }}
                onMouseLeave={e => { e.target.style.borderColor = 'rgba(245,241,234,0.4)'; e.target.style.background = 'transparent' }}>
                Ver Experiencias
              </button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
          style={{ position: 'absolute', bottom: 36, left: '50%', zIndex: 2 }}
          className="bounce-arrow">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="1.5" opacity="0.65"><polyline points="6 9 12 15 18 9"/></svg>
        </motion.div>
      </section>

      {/* ══ MARQUEE ════════════════════════════════════════════════ */}
      <div style={{ background: C.bordo, borderTop: '1px solid rgba(201,166,107,0.2)', borderBottom: '1px solid rgba(201,166,107,0.2)', padding: '13px 0', overflow: 'hidden' }}>
        <div className="marquee-track">
          {[1, 2].map(k => (
            <span key={k} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, fontWeight: 500, letterSpacing: '0.38em', color: C.champagne, textTransform: 'uppercase', opacity: 0.9 }}>
              &nbsp;&nbsp;VIÑEDOS&nbsp;&nbsp;·&nbsp;&nbsp;VINOS DE AUTOR&nbsp;&nbsp;·&nbsp;&nbsp;GASTRONOMÍA&nbsp;&nbsp;·&nbsp;&nbsp;ATARDECERES&nbsp;&nbsp;·&nbsp;&nbsp;DEGUSTACIONES&nbsp;&nbsp;·&nbsp;&nbsp;MÚSICA EN VIVO&nbsp;&nbsp;·&nbsp;&nbsp;EXPERIENCIAS BOUTIQUE&nbsp;&nbsp;·&nbsp;&nbsp;SAN RAFAEL&nbsp;&nbsp;·&nbsp;&nbsp;MENDOZA&nbsp;&nbsp;·&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ══ BODEGA TEASER ══════════════════════════════════════════ */}
      <section style={{ padding: '120px 32px', maxWidth: 1380, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 88, alignItems: 'center' }}>
          <FadeIn dir="left">
            <div style={{ position: 'relative' }}>
              <div style={{ overflow: 'hidden' }}>
                <img
                  src="https://images.unsplash.com/photo-1474722883778-792e7990302f?w=900&q=85"
                  alt="Barricas Terra Lombarda"
                  style={{ width: '100%', height: 580, objectFit: 'cover' }}
                  className="float-wine-slow"
                />
              </div>
              <div style={{ position: 'absolute', bottom: -24, right: -24, background: C.gold, padding: '20px 28px', zIndex: 2 }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, color: C.dark, lineHeight: 1, fontWeight: 700 }}>100+</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, color: C.dark, letterSpacing: '0.16em', textTransform: 'uppercase', marginTop: 4 }}>Años de historia</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn dir="right" delay={0.15}>
            <div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: '0.4em', color: C.gold, textTransform: 'uppercase', marginBottom: 20 }}>Nuestra Bodega</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(38px, 4.5vw, 58px)', color: C.cream, lineHeight: 1.05, marginBottom: 30, fontWeight: 400 }}>
                Una bodega boutique<br /><em style={{ color: C.gold, fontStyle: 'italic' }}>atendida por sus dueños</em>
              </h2>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: C.muted, lineHeight: 2, marginBottom: 24 }}>
                En el corazón de Rama Caída, sobre la Ruta 173, Bodega Terra Lombarda es mucho más que un lugar para tomar vino. Es una experiencia de turismo enológico donde cada visita es única, personalizada y llena de autenticidad.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: C.muted, lineHeight: 2, marginBottom: 42 }}>
                Más de cien años de tradición familiar se fusionan con una propuesta gastronómica de primer nivel, rodeada de viñedos, atardeceres dorados y los mejores vinos de San Rafael.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 46 }}>
                {[
                  'Producción artesanal y de autor',
                  'Degustaciones guiadas por el enólogo',
                  'Gastronomía con productos locales',
                  'Más de 100 años de historia vitivinícola',
                  'Atendida personalmente por sus dueños',
                ].map(t => (
                  <div key={t} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <span style={{ fontSize: 13, color: C.gold, marginTop: 2 }}>✦</span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: C.cream, lineHeight: 1.5 }}>{t}</span>
                  </div>
                ))}
              </div>
              <Link to="/nuestra-historia" style={{ textDecoration: 'none' }}>
                <button
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: C.gold, background: 'transparent', border: `1.5px solid ${C.gold}`, padding: '14px 32px', cursor: 'pointer', transition: 'all 0.3s' }}
                  onMouseEnter={e => { e.target.style.background = C.gold; e.target.style.color = C.dark }}
                  onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = C.gold }}>
                  Conocer Nuestra Historia
                </button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══ EXPERIENCIAS ═══════════════════════════════════════════ */}
      <section style={{ padding: '120px 32px', background: '#0d0d0d' }}>
        <div style={{ maxWidth: 1380, margin: '0 auto' }}>
          <FadeUp style={{ textAlign: 'center', marginBottom: 80 }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: '0.42em', color: C.gold, textTransform: 'uppercase', marginBottom: 18 }}>Lo que vivimos juntos</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(40px, 5vw, 64px)', color: C.cream, fontWeight: 400, marginBottom: 20 }}>Nuestras Experiencias</h2>
            <div style={{ width: 56, height: 1, background: C.gold, margin: '0 auto', opacity: 0.55 }} />
          </FadeUp>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {experiencias.map((exp, i) => (
              <ExperienciaCard key={exp.title} exp={exp} delay={i * 0.12} index={i} />
            ))}
          </div>
          <FadeUp style={{ textAlign: 'center', marginTop: 60 }}>
            <Link to="/experiencias" style={{ textDecoration: 'none' }}>
              <button
                style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.24em', textTransform: 'uppercase', color: C.gold, background: 'transparent', border: `1.5px solid rgba(201,166,107,0.45)`, padding: '15px 46px', cursor: 'pointer', transition: 'all 0.3s' }}
                onMouseEnter={e => { e.target.style.borderColor = C.gold; e.target.style.background = 'rgba(201,166,107,0.08)' }}
                onMouseLeave={e => { e.target.style.borderColor = 'rgba(201,166,107,0.45)'; e.target.style.background = 'transparent' }}>
                Ver Todas las Experiencias
              </button>
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* ══ EVENTOS ════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', padding: '120px 32px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src="https://images.unsplash.com/photo-1543218024-57a70143c369?w=1800&q=70" alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(11,11,11,0.9)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1380, margin: '0 auto' }}>
          <FadeUp style={{ textAlign: 'center', marginBottom: 80 }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: '0.42em', color: C.gold, textTransform: 'uppercase', marginBottom: 18 }}>Agenda de la Bodega</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(40px, 5vw, 64px)', color: C.cream, fontWeight: 400 }}>Eventos en la Bodega</h2>
          </FadeUp>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
            {eventos.map((ev, i) => <EventoCard key={ev.title} ev={ev} delay={i * 0.12} />)}
          </div>
          <FadeUp style={{ textAlign: 'center', marginTop: 60 }}>
            <Link to="/galeria" style={{ textDecoration: 'none' }}>
              <button
                style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.24em', textTransform: 'uppercase', color: C.cream, background: 'transparent', border: `1.5px solid rgba(245,241,234,0.35)`, padding: '15px 46px', cursor: 'pointer', transition: 'all 0.3s' }}
                onMouseEnter={e => { e.target.style.borderColor = C.cream }}
                onMouseLeave={e => { e.target.style.borderColor = 'rgba(245,241,234,0.35)' }}>
                Ver Agenda Completa
              </button>
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* ══ WINE LOVERS ════════════════════════════════════════════ */}
      <section style={{ padding: '120px 32px', background: C.bordo }}>
        <div style={{ maxWidth: 1380, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 80, alignItems: 'center' }}>
            <FadeIn dir="left">
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: '0.42em', color: C.champagne, textTransform: 'uppercase', marginBottom: 20, opacity: 0.8 }}>Comunidad</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(40px, 5vw, 62px)', color: C.cream, fontWeight: 400, marginBottom: 28, lineHeight: 1.05 }}>
                Wine Lovers
              </h2>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: 'rgba(245,241,234,0.7)', lineHeight: 2, marginBottom: 24 }}>
                Un espacio para quienes comparten la pasión por el vino. Cada encuentro en la bodega se convierte en una experiencia colectiva: degustaciones, brindis, charlas al atardecer y conexiones que van más allá de la copa.
              </p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: C.champagne, fontStyle: 'italic', lineHeight: 1.6, marginBottom: 40, opacity: 0.85 }}>
                "El vino une, la bodega contiene,<br />el atardecer en Mendoza lo hace eterno."
              </p>
              <a href="https://instagram.com/bodegaterralombarda" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <button
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: C.dark, background: C.champagne, border: 'none', padding: '14px 32px', cursor: 'pointer', transition: 'all 0.3s' }}
                  onMouseEnter={e => { e.target.style.background = C.cream; e.target.style.transform = 'translateY(-1px)' }}
                  onMouseLeave={e => { e.target.style.background = C.champagne; e.target.style.transform = 'none' }}>
                  Seguinos en Instagram
                </button>
              </a>
            </FadeIn>

            <FadeIn dir="right" delay={0.15}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {[
                  { src: '/evento-musica.jpg', title: 'Música y vino' },
                  { src: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=500&q=80', title: 'Brindis' },
                  { src: '/evento-ambiente.jpg', title: 'Encuentros' },
                  { src: '/evento-noche.jpg', title: 'La noche' },
                ].map((item, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: i * 0.08 }}
                    style={{ overflow: 'hidden', aspectRatio: '1', border: '1px solid rgba(201,166,107,0.2)' }}>
                    <img src={item.src} alt={item.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.75) saturate(0.9)', transition: 'all 0.4s' }}
                      onMouseEnter={e => { e.target.style.filter = 'brightness(0.9) saturate(1.1)'; e.target.style.transform = 'scale(1.04)' }}
                      onMouseLeave={e => { e.target.style.filter = 'brightness(0.75) saturate(0.9)'; e.target.style.transform = 'none' }}
                    />
                  </motion.div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══ SPOTIWINE ══════════════════════════════════════════════ */}
      <section style={{ padding: '120px 32px', background: '#0d0d0d' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <FadeUp>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: '0.42em', color: C.gold, textTransform: 'uppercase', marginBottom: 18 }}>SpotiWine</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(38px, 5vw, 62px)', color: C.cream, fontWeight: 400, marginBottom: 18 }}>La Playlist de la Bodega</h2>
            <div style={{ width: 48, height: 1, background: C.gold, margin: '0 auto 36px', opacity: 0.55 }} />
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, color: C.champagne, fontStyle: 'italic', lineHeight: 1.65, marginBottom: 48, opacity: 0.9 }}>
              Poné Play.<br />Servite una copa.<br />Desconectá del mundo.
            </p>
            <div style={{ borderRadius: 0, overflow: 'hidden', border: '1px solid rgba(201,166,107,0.2)', background: '#111', maxWidth: 680, margin: '0 auto', boxShadow: '0 24px 80px rgba(0,0,0,0.6)' }}>
              <iframe
                style={{ borderRadius: 0 }}
                src="https://open.spotify.com/embed/playlist/37i9dQZF1DX8NTLI2TtZa6?utm_source=generator&theme=0"
                width="100%"
                height="352"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title="SpotiWine Terra Lombarda"
              />
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ══ TESTIMONIOS ════════════════════════════════════════════ */}
      <section style={{ padding: '120px 32px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src="https://images.unsplash.com/photo-1586370434639-0fe43b2d32e6?w=1600&q=65" alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(11,11,11,0.92)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1380, margin: '0 auto' }}>
          <FadeUp style={{ textAlign: 'center', marginBottom: 80 }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: '0.42em', color: C.gold, textTransform: 'uppercase', marginBottom: 18 }}>Lo que dicen</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(38px, 4.5vw, 58px)', color: C.cream, fontWeight: 400 }}>Experiencias que se recuerdan</h2>
          </FadeUp>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {testimonios.map(({ name, origen, texto, stars }, i) => (
              <FadeUp key={name} delay={i * 0.1}>
                <div style={{ padding: '44px 36px', background: 'rgba(11,11,11,0.8)', border: '1px solid rgba(201,166,107,0.18)', backdropFilter: 'blur(12px)', height: '100%' }}>
                  <div style={{ display: 'flex', gap: 2, marginBottom: 22 }}>
                    {Array.from({ length: stars }).map((_, j) => <StarIcon key={j} />)}
                  </div>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 19, color: C.cream, fontStyle: 'italic', lineHeight: 1.85, marginBottom: 28 }}>
                    "{texto}"
                  </p>
                  <div style={{ borderTop: '1px solid rgba(201,166,107,0.18)', paddingTop: 20 }}>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: C.gold, fontWeight: 500, letterSpacing: '0.08em' }}>{name}</p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: C.muted, marginTop: 4 }}>{origen}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══ RESERVAS CTA ═══════════════════════════════════════════ */}
      <section style={{ background: C.bordo, padding: '120px 32px', textAlign: 'center' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <FadeUp>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: '0.42em', color: C.champagne, textTransform: 'uppercase', marginBottom: 20, opacity: 0.8 }}>Bodega Boutique · San Rafael</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(40px, 5.5vw, 66px)', color: C.cream, lineHeight: 1.05, marginBottom: 28, fontWeight: 400 }}>
              ¿Reservás tu<br /><em style={{ color: C.champagne, fontStyle: 'italic' }}>experiencia?</em>
            </h2>
            <div style={{ width: 52, height: 1, background: C.champagne, margin: '0 auto 32px', opacity: 0.5 }} />
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: 'rgba(245,241,234,0.7)', lineHeight: 2, marginBottom: 52 }}>
              Escribinos por WhatsApp y te armamos una experiencia<br />a medida. Atendemos personalmente cada consulta.
            </p>
            <div style={{ display: 'flex', gap: 18, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://wa.me/5492627000000" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <button
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: C.dark, background: C.gold, border: 'none', padding: '17px 48px', cursor: 'pointer', transition: 'all 0.3s' }}
                  onMouseEnter={e => { e.target.style.background = '#d9ba88'; e.target.style.transform = 'translateY(-2px)' }}
                  onMouseLeave={e => { e.target.style.background = C.gold; e.target.style.transform = 'none' }}>
                  Reservar por WhatsApp
                </button>
              </a>
              <Link to="/contacto" style={{ textDecoration: 'none' }}>
                <button
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: C.cream, background: 'transparent', border: `1.5px solid rgba(245,241,234,0.35)`, padding: '17px 48px', cursor: 'pointer', transition: 'all 0.3s' }}
                  onMouseEnter={e => { e.target.style.borderColor = C.cream }}
                  onMouseLeave={e => { e.target.style.borderColor = 'rgba(245,241,234,0.35)' }}>
                  Formulario de Reserva
                </button>
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ══ WHATSAPP FLOTANTE ═══════════════════════════════════════ */}
      <a href="https://wa.me/5492627000000" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
        style={{
          position: 'fixed', bottom: 28, right: 28, zIndex: 900,
          background: '#25D366', width: 58, height: 58, borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 6px 28px rgba(37,211,102,0.35)', textDecoration: 'none', transition: 'all 0.3s',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 8px 36px rgba(37,211,102,0.5)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 6px 28px rgba(37,211,102,0.35)' }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
        </svg>
      </a>

    </div>
  )
}
