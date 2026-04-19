import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'

const C = { gold: '#C4A35A', cream: '#F2EBD9', dark: '#1A1A18', darker: '#111110', card: '#232320', verde: '#2D4A3E', terracota: '#B5533C', muted: 'rgba(242,235,217,0.55)' }

function FadeUp({ children, delay = 0, style = {} }) {
  const ref = useRef(null); const [v, setV] = useState(false)
  useEffect(() => { const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect() } }, { threshold: 0.1 }); if (ref.current) obs.observe(ref.current); return () => obs.disconnect() }, [])
  return <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={v ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: 'easeOut' }} style={style}>{children}</motion.div>
}
function FadeIn({ children, delay = 0, dir = 'up', style = {} }) {
  const ref = useRef(null); const [v, setV] = useState(false)
  useEffect(() => { const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect() } }, { threshold: 0.1 }); if (ref.current) obs.observe(ref.current); return () => obs.disconnect() }, [])
  const from = { opacity: 0, x: dir === 'left' ? -60 : dir === 'right' ? 60 : 0, y: dir === 'up' ? 40 : 0 }
  return <motion.div ref={ref} initial={from} animate={v ? { opacity: 1, x: 0, y: 0 } : {}} transition={{ duration: 0.8, delay, ease: 'easeOut' }} style={style}>{children}</motion.div>
}

const rsi = [
  { label: 'Lo Real', sub: 'La comida, el barrio, la gente', color: C.verde, text: 'El cortado que huele a café recién molido. Las empanadas fritas que manchan los dedos. El adoquín mojado de San Telmo un domingo por la tarde. Lo real no se explica, se vive.' },
  { label: 'Lo Imaginario', sub: 'La atmósfera, la música, la tarde', color: C.gold, text: 'La luz que entra sesgada por las ventanas de madera. El jazz que suena sin apuro. La sensación de que el tiempo acá se mueve diferente, más despacio, más honesto.' },
  { label: 'Lo Simbólico', sub: 'El nombre, la cultura, la identidad', color: C.terracota, text: 'Je Suis Lacan. Un guiño al psicoanálisis, a la herencia francesa del barrio, a esa porteñidad que siempre tomó sus ideas de París para hacerlas propias. RSI: la triada que organiza, sin resolver, todo.' },
]

export default function Nosotros() {
  const heroRef = useRef(null)
  const { scrollY } = useScroll()
  const imgY = useTransform(scrollY, [0, 600], [0, 140])

  return (
    <main>
      {/* HERO */}
      <section ref={heroRef} style={{ position: 'relative', height: '70vh', overflow: 'hidden', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
        <motion.div style={{ position: 'absolute', inset: '-15%', y: imgY }}>
          <img src="https://images.unsplash.com/photo-1601933513793-9b0a13c4bb28?w=1600&q=80" alt="San Telmo"
            style={{ width: '100%', height: '130%', objectFit: 'cover' }} />
        </motion.div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(26,26,24,0.2) 0%, rgba(26,26,24,0.75) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 24px 80px' }}>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: '0.4em', color: C.gold, textTransform: 'uppercase', marginBottom: 16 }}>
            — Balcarce 749, San Telmo —
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38 }}
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(46px, 7vw, 90px)', color: C.cream, lineHeight: 1, fontWeight: 600, letterSpacing: '0.05em' }}>
            Nuestra Historia
          </motion.h1>
          <motion.div initial={{ width: 0 }} animate={{ width: 72 }} transition={{ delay: 0.65, duration: 0.5 }}
            style={{ height: 1.5, background: C.gold, margin: '20px auto 0' }} />
        </div>
      </section>

      {/* NARRATIVA */}
      <section style={{ maxWidth: 820, margin: '0 auto', padding: '100px 24px' }}>
        {[
          {
            tag: 'El Lugar',
            title: 'El Pasaje más antiguo de Buenos Aires',
            body: ['El Pasaje San Lorenzo, trazado en 1786, es el corredor más viejo que subsiste en la ciudad. Sus adoquines vieron pasar virreyes y revolucionarios, tangos y golpes, pizzerías y galerías de arte. Sobre esa misma calle, en la esquina de Balcarce 749, decidimos abrir.', 'No fue una decisión inmobiliaria. Fue una declaración de intenciones: operar en un sitio que la Legislatura porteña declaró de interés cultural, en el barrio que más claramente condensa la paradoja de Buenos Aires — europea por herencia, criolla por vocación.'],
          },
          {
            tag: 'El Nombre',
            title: '"Je Suis Lacan"',
            body: ['Jacques Lacan nunca estuvo en San Telmo. Pero sus ideas, sí. El psicoanálisis lacaniano llegó a Buenos Aires con una intensidad que no encontró igual en ningún otro lugar. Argentina tiene más psicoanalistas por habitante que cualquier nación del planeta.', 'El nombre del bar es un guiño a esa herencia. Un poco irónico, un poco sincero. Como suelen ser los mejores nombres de los bares porteños.'],
          },
          {
            tag: 'El Concepto',
            title: 'RSI: La triada que nos define',
            body: ['Lacan organizó su teoría en torno a tres registros: lo Real, lo Imaginario y lo Simbólico. Nosotros los tomamos prestados para hablar de lo que hacemos: comida real y honesta, una atmósfera que se imagina más que se describe, y un nombre que lleva toda la carga simbólica del barrio.', 'En Je Suis Lacan conviven el desayuno de las 10 de la mañana y el Malbec de las 11 de la noche. El croissant y la empanada frita. El jazz y el tango. No resolvemos la contradicción — la habitamos.'],
          },
        ].map(({ tag, title, body }, i) => (
          <FadeUp key={tag} delay={0} style={{ marginBottom: 72, paddingLeft: i % 2 === 1 ? 28 : 0, borderLeft: i % 2 === 1 ? `2px solid ${C.gold}` : 'none' }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: '0.3em', color: C.gold, textTransform: 'uppercase', marginBottom: 12 }}>{tag}</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(28px, 3.5vw, 40px)', color: C.cream, fontWeight: 500, marginBottom: 22, lineHeight: 1.2 }}>{title}</h2>
            {body.map((p, j) => (
              <p key={j} style={{ fontFamily: "'EB Garamond', serif", fontSize: 19, color: C.muted, lineHeight: 1.85, marginBottom: 16 }}>{p}</p>
            ))}
          </FadeUp>
        ))}
      </section>

      {/* BARRIO */}
      <section style={{ background: C.darker, padding: '100px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 64, alignItems: 'center' }}>
          <FadeIn dir="left">
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: '0.3em', color: C.gold, textTransform: 'uppercase', marginBottom: 14 }}>San Telmo</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(30px, 3.5vw, 44px)', color: C.cream, fontWeight: 500, marginBottom: 22, lineHeight: 1.2 }}>El barrio que nos eligió</h2>
            <p style={{ fontFamily: "'EB Garamond', serif", fontSize: 19, color: C.muted, lineHeight: 1.85, marginBottom: 20 }}>
              A pasos del Zanjón de Granados — esa fascinante excavación que reveló 300 años de Buenos Aires bajo la tierra — y de las esculturas de Mafalda que miran con desconfianza a los turistas.
            </p>
            <p style={{ fontFamily: "'EB Garamond', serif", fontSize: 19, color: C.muted, lineHeight: 1.85 }}>
              Los domingos hay feria de antigüedades en la plaza Dorrego. Los turistas hacen fotos. Los vecinos toman mate y leen el diario. Nosotros abrimos y servimos café para ambos.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 32 }}>
              {['Zanjón de Granados', 'Feria de Antigüedades', 'Mercado de San Telmo', 'Escultura de Mafalda'].map(p => (
                <div key={p} style={{ background: C.card, padding: '12px 16px', display: 'flex', gap: 8, alignItems: 'center', border: '1px solid rgba(196,163,90,0.1)' }}>
                  <span style={{ color: C.gold, fontSize: 14 }}>✦</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: C.cream }}>{p}</span>
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn dir="right" delay={0.1}>
            <img src="https://images.unsplash.com/photo-1543168256-418811576931?w=800&q=80" alt="San Telmo"
              style={{ width: '100%', height: 480, objectFit: 'cover' }} />
          </FadeIn>
        </div>
      </section>

      {/* RSI FILOSOFÍA */}
      <section style={{ padding: '100px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <FadeUp style={{ textAlign: 'center', marginBottom: 64 }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: '0.32em', color: C.gold, textTransform: 'uppercase', marginBottom: 12 }}>Nuestra filosofía</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(34px, 4vw, 50px)', color: C.cream, fontWeight: 500 }}>RSI</h2>
          </FadeUp>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            {rsi.map(({ label, sub, color, text }) => (
              <FadeUp key={label}>
                <div style={{ padding: '40px 32px', border: `1px solid rgba(196,163,90,0.15)`, background: C.card, height: '100%' }}>
                  <div style={{ width: 40, height: 2, background: color, marginBottom: 24 }} />
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 34, color, fontWeight: 600, marginBottom: 6 }}>{label}</h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.muted, marginBottom: 20 }}>{sub}</p>
                  <p style={{ fontFamily: "'EB Garamond', serif", fontSize: 18, color: C.muted, lineHeight: 1.8 }}>{text}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: C.darker, padding: '80px 24px', textAlign: 'center' }}>
        <FadeUp>
          <p style={{ fontFamily: "'EB Garamond', serif", fontSize: 24, color: C.gold, fontStyle: 'italic', marginBottom: 32 }}>
            "Lo real, lo imaginario, lo simbólico."
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/menu">
              <button style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.cream, background: C.terracota, border: `2px solid ${C.terracota}`, padding: '13px 36px', cursor: 'pointer', transition: 'all 0.25s' }}
                onMouseEnter={e => { e.target.style.background = '#9a4532'; e.target.style.borderColor = '#9a4532' }}
                onMouseLeave={e => { e.target.style.background = C.terracota; e.target.style.borderColor = C.terracota }}>
                Ver la Carta
              </button>
            </Link>
            <Link to="/contacto">
              <button style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.gold, background: 'transparent', border: `2px solid ${C.gold}`, padding: '13px 36px', cursor: 'pointer', transition: 'all 0.25s' }}
                onMouseEnter={e => { e.target.style.background = C.gold; e.target.style.color = C.dark }}
                onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = C.gold }}>
                Cómo Llegar
              </button>
            </Link>
          </div>
        </FadeUp>
      </section>
    </main>
  )
}
