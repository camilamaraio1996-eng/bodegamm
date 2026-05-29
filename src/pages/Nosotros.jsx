import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'

const C = {
  dark:      '#0B0B0B',
  bordo:     '#4A0E1A',
  champagne: '#D7C3A1',
  sand:      '#E6D8C3',
  gold:      '#C9A66B',
  cream:     '#F5F1EA',
  muted:     'rgba(245,241,234,0.6)',
}

function FadeUp({ children, delay = 0, style = {} }) {
  const ref = useRef(null)
  const [v, setV] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect() } }, { threshold: 0.08 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return <motion.div ref={ref} initial={{ opacity: 0, y: 48 }} animate={v ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.82, delay, ease: 'easeOut' }} style={style}>{children}</motion.div>
}

function FadeIn({ children, delay = 0, dir = 'up', style = {} }) {
  const ref = useRef(null)
  const [v, setV] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect() } }, { threshold: 0.06 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  const from = { opacity: 0, x: dir === 'left' ? -64 : dir === 'right' ? 64 : 0, y: dir === 'up' ? 48 : 0 }
  return <motion.div ref={ref} initial={from} animate={v ? { opacity: 1, x: 0, y: 0 } : {}} transition={{ duration: 0.9, delay, ease: 'easeOut' }} style={style}>{children}</motion.div>
}

const timeline = [
  {
    year: '1920',
    title: 'Los orígenes',
    body: 'La familia Lombarda llega desde Italia a las tierras de Rama Caída, San Rafael. Traen consigo el conocimiento ancestral de la viticultura italiana y la visión de construir algo que trascienda generaciones.',
  },
  {
    year: '1945',
    title: 'La primera cosecha',
    body: 'Después de décadas de cultivo y aprendizaje, se elabora el primer vino de la bodega con uvas propias del viñedo. Un Malbec que hoy es la base de todos nuestros vinos de autor.',
  },
  {
    year: '1970',
    title: 'La segunda generación',
    body: 'Los hijos de los fundadores toman el legado y amplían el viñedo. Se incorporan nuevas variedades: Cabernet Sauvignon, Chardonnay y Torrontés, diversificando la producción sin perder la esencia artesanal.',
  },
  {
    year: '1998',
    title: 'Turismo enológico',
    body: 'La bodega abre sus puertas al turismo. Guiados por los propios dueños, los visitantes comienzan a descubrir el proceso completo: desde el viñedo hasta la copa. El turismo enológico boutique nace en Rama Caída.',
  },
  {
    year: '2010',
    title: 'Vinos de autor',
    body: 'Se lanza la primera línea de vinos de autor con producción limitada. Cada etiqueta cuenta una historia, lleva el nombre de la familia y representa lo mejor de cada cosecha. Reconocimientos nacionales siguen.',
  },
  {
    year: 'Hoy',
    title: 'Experiencias únicas',
    body: 'Terra Lombarda es hoy una de las bodegas boutique más queridas de San Rafael. Seguimos siendo una bodega atendida por sus propios dueños, con la misma pasión de hace 100 años pero con mirada puesta en el futuro.',
  },
]

const pilares = [
  {
    label: 'Tradición',
    sub: 'Más de 100 años de historia vitivinícola',
    color: C.gold,
    text: 'Cada botella de Terra Lombarda lleva en su interior más de un siglo de aprendizaje. Las técnicas que heredamos de nuestros fundadores conviven con la innovación enológica contemporánea. No renunciamos a ninguno de los dos mundos.',
  },
  {
    label: 'Autenticidad',
    sub: 'Atendida por sus propios dueños',
    color: C.champagne,
    text: 'No somos una bodega corporativa. Cuando venís a visitarnos, nos encontrás a nosotros. El enólogo que explica la cata es quien elaboró el vino. La persona que te recibe es quien cuida el viñedo. Esa cercanía no tiene precio.',
  },
  {
    label: 'Terroir',
    sub: 'Rama Caída, San Rafael, Mendoza',
    color: C.sand,
    text: 'Nuestro suelo arenoso, el clima semi-árido y los vientos de la cordillera crean condiciones únicas para la vid. Rama Caída es un secreto bien guardado de San Rafael, y nuestros vinos lo expresan en cada sorbo.',
  },
]

export default function Historia() {
  const heroRef = useRef(null)
  const { scrollY } = useScroll()
  const imgY = useTransform(scrollY, [0, 600], [0, 140])

  return (
    <div style={{ background: C.dark }}>
      {/* HERO */}
      <section ref={heroRef} style={{ position: 'relative', height: '72vh', minHeight: 540, overflow: 'hidden', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
        <motion.div style={{ position: 'absolute', inset: '-15%', y: imgY }}>
          <img src="/foto-vinedo-sunset.jpg" alt="Viñedos Terra Lombarda"
            style={{ width: '100%', height: '130%', objectFit: 'cover' }} />
        </motion.div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(11,11,11,0.25) 0%, rgba(11,11,11,0.92) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 28px 96px' }}>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: '0.5em', color: C.gold, textTransform: 'uppercase', marginBottom: 22 }}>
            — Rama Caída · San Rafael · Desde 1920 —
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38 }}
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(48px, 8vw, 100px)', color: C.cream, lineHeight: 0.92, fontWeight: 400, letterSpacing: '0.04em', marginBottom: 22 }}>
            Nuestra Historia
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.56 }}
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: C.gold, fontStyle: 'italic', marginBottom: 0, opacity: 0.9 }}>
            "Más de 100 años de pasión por el vino."
          </motion.p>
          <motion.div initial={{ width: 0 }} animate={{ width: 60 }} transition={{ delay: 0.72, duration: 0.6 }}
            style={{ height: 1.5, background: C.gold, margin: '22px auto 0', opacity: 0.65 }} />
        </div>
      </section>

      {/* INTRO NARRATIVA */}
      <section style={{ maxWidth: 860, margin: '0 auto', padding: '100px 32px 80px' }}>
        <FadeUp>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: '0.42em', color: C.gold, textTransform: 'uppercase', marginBottom: 22 }}>Quiénes somos</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(32px, 3.5vw, 48px)', color: C.cream, fontWeight: 400, marginBottom: 30, lineHeight: 1.15 }}>
            Una familia. Un viñedo. Una pasión que dura más de un siglo.
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: C.muted, lineHeight: 2.05, marginBottom: 24 }}>
            La Bodega Terra Lombarda nació en las tierras de Rama Caída, en el corazón de San Rafael, Mendoza. Fundada por inmigrantes italianos que trajeron consigo el amor por la vid y el saber hacer del vino artesanal, la bodega ha permanecido fiel a esa herencia durante más de cien años.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: C.muted, lineHeight: 2.05 }}>
            Hoy somos una bodega boutique atendida por sus propios dueños. No hay intermediarios entre vos y la experiencia. Cada cata, cada recorrido, cada copa que servimos lleva el compromiso de quienes cuidan el viñedo con sus propias manos.
          </p>
        </FadeUp>
      </section>

      {/* TIMELINE */}
      <section style={{ padding: '80px 32px 100px', background: '#0d0d0d' }}>
        <div style={{ maxWidth: 920, margin: '0 auto' }}>
          <FadeUp style={{ textAlign: 'center', marginBottom: 80 }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: '0.42em', color: C.gold, textTransform: 'uppercase', marginBottom: 18 }}>Cronología</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(36px, 4.5vw, 54px)', color: C.cream, fontWeight: 400 }}>El camino de la familia</h2>
          </FadeUp>

          <div style={{ position: 'relative' }}>
            {/* línea central */}
            <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, background: 'linear-gradient(to bottom, transparent, rgba(201,166,107,0.4) 10%, rgba(201,166,107,0.4) 90%, transparent)', transform: 'translateX(-50%)' }} className="timeline-line" />

            {timeline.map((item, i) => (
              <FadeUp key={item.year} delay={i * 0.08} style={{ marginBottom: 56 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 60px 1fr', gap: 0, alignItems: 'start' }}>
                  {i % 2 === 0 ? (
                    <>
                      <div style={{ paddingRight: 40, textAlign: 'right' }}>
                        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 48, color: C.gold, fontWeight: 700, lineHeight: 1, display: 'block', marginBottom: 10 }}>{item.year}</span>
                        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, color: C.cream, fontWeight: 400, marginBottom: 12 }}>{item.title}</h3>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: C.muted, lineHeight: 1.85 }}>{item.body}</p>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 12 }}>
                        <div style={{ width: 14, height: 14, borderRadius: '50%', background: C.gold, border: '3px solid #0d0d0d', boxShadow: `0 0 0 1px ${C.gold}` }} />
                      </div>
                      <div />
                    </>
                  ) : (
                    <>
                      <div />
                      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 12 }}>
                        <div style={{ width: 14, height: 14, borderRadius: '50%', background: C.champagne, border: '3px solid #0d0d0d', boxShadow: `0 0 0 1px ${C.champagne}` }} />
                      </div>
                      <div style={{ paddingLeft: 40 }}>
                        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 48, color: C.champagne, fontWeight: 700, lineHeight: 1, display: 'block', marginBottom: 10 }}>{item.year}</span>
                        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, color: C.cream, fontWeight: 400, marginBottom: 12 }}>{item.title}</h3>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: C.muted, lineHeight: 1.85 }}>{item.body}</p>
                      </div>
                    </>
                  )}
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* FOTO + TEXTO */}
      <section style={{ padding: '100px 32px', background: C.dark }}>
        <div style={{ maxWidth: 1380, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 80, alignItems: 'center' }}>
          <FadeIn dir="left">
            <img src="/foto-bodega-interior.jpg" alt="Bodega Terra Lombarda"
              style={{ width: '100%', height: 560, objectFit: 'cover' }} />
          </FadeIn>
          <FadeIn dir="right" delay={0.12}>
            <div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: '0.42em', color: C.gold, textTransform: 'uppercase', marginBottom: 20 }}>La bodega</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(32px, 4vw, 50px)', color: C.cream, fontWeight: 400, marginBottom: 26, lineHeight: 1.1 }}>
                El espacio que guarda<br /><em style={{ color: C.gold, fontStyle: 'italic' }}>cien años de vinos</em>
              </h2>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: C.muted, lineHeight: 2, marginBottom: 22 }}>
                La bodega original sigue en pie. Sus paredes de adobe, sus barricas centenarias y el aroma a vino que impregna cada rincón cuentan una historia que ningún libro puede replicar.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: C.muted, lineHeight: 2, marginBottom: 40 }}>
                Cuando recorrés la bodega con nosotros, no solo ves el proceso de elaboración del vino. Sos parte de una historia que lleva más de 100 años escribiéndose en el corazón de San Rafael.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {['Cubillos 4300, Ruta 173', 'Rama Caída, San Rafael', 'Mendoza, Argentina', 'Bodega activa desde 1920'].map(p => (
                  <div key={p} style={{ background: 'rgba(201,166,107,0.06)', padding: '12px 16px', display: 'flex', gap: 10, alignItems: 'center', border: '1px solid rgba(201,166,107,0.15)' }}>
                    <span style={{ color: C.gold, fontSize: 11 }}>✦</span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: C.cream, opacity: 0.85 }}>{p}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* PILARES */}
      <section style={{ padding: '100px 32px', background: '#0d0d0d' }}>
        <div style={{ maxWidth: 1380, margin: '0 auto' }}>
          <FadeUp style={{ textAlign: 'center', marginBottom: 72 }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: '0.42em', color: C.gold, textTransform: 'uppercase', marginBottom: 18 }}>Nuestra filosofía</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(34px, 4.5vw, 54px)', color: C.cream, fontWeight: 400 }}>Los pilares de Terra Lombarda</h2>
          </FadeUp>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {pilares.map(({ label, sub, color, text }) => (
              <FadeUp key={label}>
                <div style={{ padding: '44px 36px', border: '1px solid rgba(201,166,107,0.15)', background: 'rgba(201,166,107,0.03)', height: '100%' }}>
                  <div style={{ width: 40, height: 2, background: color, marginBottom: 28, opacity: 0.8 }} />
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 40, color, fontWeight: 500, marginBottom: 10 }}>{label}</h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: C.muted, marginBottom: 24 }}>{sub}</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: C.muted, lineHeight: 1.95 }}>{text}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: C.bordo, padding: '96px 32px', textAlign: 'center' }}>
        <FadeUp>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, color: C.champagne, fontStyle: 'italic', marginBottom: 38, lineHeight: 1.5, opacity: 0.9 }}>
            "Cien años de historia,<br />un solo destino: el vino."
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/experiencias" style={{ textDecoration: 'none' }}>
              <button
                style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: C.dark, background: C.gold, border: `2px solid ${C.gold}`, padding: '15px 40px', cursor: 'pointer', transition: 'all 0.3s' }}
                onMouseEnter={e => { e.target.style.background = 'transparent'; e.target.style.color = C.gold }}
                onMouseLeave={e => { e.target.style.background = C.gold; e.target.style.color = C.dark }}>
                Ver Experiencias
              </button>
            </Link>
            <Link to="/contacto" style={{ textDecoration: 'none' }}>
              <button
                style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: C.gold, background: 'transparent', border: `2px solid ${C.gold}`, padding: '15px 40px', cursor: 'pointer', transition: 'all 0.3s' }}
                onMouseEnter={e => { e.target.style.background = C.gold; e.target.style.color = C.dark }}
                onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = C.gold }}>
                Reservar Visita
              </button>
            </Link>
          </div>
        </FadeUp>
      </section>

      <style>{`
        @media (max-width: 640px) {
          .timeline-line { display: none; }
        }
      `}</style>
    </div>
  )
}
