import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'

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

function FadeUp({ children, delay = 0, style = {} }) {
  const ref = useRef(null)
  const [v, setV] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect() } }, { threshold: 0.08 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return <motion.div ref={ref} initial={{ opacity: 0, y: 48 }} animate={v ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay, ease: 'easeOut' }} style={style}>{children}</motion.div>
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
  return <motion.div ref={ref} initial={from} animate={v ? { opacity: 1, x: 0, y: 0 } : {}} transition={{ duration: 0.88, delay, ease: 'easeOut' }} style={style}>{children}</motion.div>
}

const paquetes = [
  {
    id: 'cata',
    num: '01',
    title: 'Cata',
    sub: 'La Experiencia Esencial',
    tagline: 'Descubrí el alma de la bodega',
    img: '/foto-cata.jpg',
    color: C.gold,
    includes: [
      { icon: '🏛️', text: 'Recorrido guiado por la bodega histórica de más de 100 años' },
      { icon: '🍇', text: 'Visita al viñedo: conocé las variedades y el ciclo de la vid' },
      { icon: '🍷', text: 'Degustación guiada de 3 vinos de producción propia con explicación del enólogo' },
    ],
    ideal: 'Parejas · Amigos · Turistas enológicos',
  },
  {
    id: 'wineHouse',
    num: '02',
    title: 'Wine House',
    sub: 'Vino, Sabor y Experiencia',
    tagline: 'Una tarde completa en la bodega',
    img: '/foto-sunset-cena.jpg',
    color: C.champagne,
    includes: [
      { icon: '🏛️', text: 'Recorrido por bodega histórica y visita al viñedo' },
      { icon: '🍷', text: 'Degustación de 4 vinos de autor maridados' },
      { icon: '🧀', text: 'Tabla artesanal de fiambres y quesos regionales' },
      { icon: '🍞', text: 'Panificados caseros con dips artesanales' },
      { icon: '🍮', text: 'Postre de temporada elaborado en la bodega' },
      { icon: '🥗', text: 'Opciones vegetarianas y sin TACC disponibles' },
    ],
    ideal: 'Celebraciones · Cumpleaños · Grupos · Parejas',
  },
  {
    id: 'fuegos',
    num: '03',
    title: 'Vinos y Fuegos',
    sub: 'La Experiencia Premium',
    tagline: 'El asado más memorable de tu vida',
    img: '/foto-asado.jpg',
    color: C.sand,
    includes: [
      { icon: '🏛️', text: 'Recorrido completo por bodega y viñedos' },
      { icon: '🧀', text: 'Selección de quesos artesanales y fiambres de entrada' },
      { icon: '🥟', text: 'Empanadas fritas criollas con rellenos de la región' },
      { icon: '🔥', text: 'Asado completo: vacío, costillas, chorizos, morcillas, matambre' },
      { icon: '🥗', text: 'Ensaladas frescas de estación y flan casero de postre' },
      { icon: '🍷', text: 'Maridaje ilimitado con vinos de producción propia durante toda la experiencia' },
    ],
    ideal: 'Grupos grandes · Eventos corporativos · Familias · Ocasiones especiales',
  },
]

export default function Experiencias() {
  const heroRef = useRef(null)
  const { scrollY } = useScroll()
  const imgY = useTransform(scrollY, [0, 600], [0, 130])

  return (
    <div style={{ background: C.dark }}>
      {/* HERO */}
      <section ref={heroRef} style={{ position: 'relative', height: '70vh', minHeight: 520, overflow: 'hidden', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
        <motion.div style={{ position: 'absolute', inset: '-15%', y: imgY }}>
          <img src="/foto-evento-vinedo.jpg" alt="Experiencias Terra Lombarda"
            style={{ width: '100%', height: '130%', objectFit: 'cover' }} />
        </motion.div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(11,11,11,0.3) 0%, rgba(11,11,11,0.95) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 28px 96px' }}>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: '0.5em', color: C.gold, textTransform: 'uppercase', marginBottom: 22 }}>
            — Bodega Terra Lombarda · San Rafael —
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38 }}
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(50px, 8.5vw, 104px)', color: C.cream, lineHeight: 0.92, fontWeight: 400, letterSpacing: '0.04em', marginBottom: 22 }}>
            Experiencias
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.56 }}
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: C.champagne, fontStyle: 'italic', opacity: 0.9 }}>
            Boutique · Personalizadas · Memorables
          </motion.p>
          <motion.div initial={{ width: 0 }} animate={{ width: 60 }} transition={{ delay: 0.72, duration: 0.6 }}
            style={{ height: 1, background: C.gold, margin: '22px auto 0', opacity: 0.6 }} />
        </div>
      </section>

      {/* INTRO */}
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '96px 32px 80px', textAlign: 'center' }}>
        <FadeUp>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: '0.42em', color: C.gold, textTransform: 'uppercase', marginBottom: 20 }}>Por qué elegir Terra Lombarda</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(32px, 3.5vw, 46px)', color: C.cream, fontWeight: 400, marginBottom: 26, lineHeight: 1.2 }}>
            Cada experiencia es única.<br />Cada copa, irrepetible.
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: C.muted, lineHeight: 2 }}>
            Somos una bodega boutique atendida por sus propios dueños. Eso significa que cada experiencia tiene nombre y apellido, que el enólogo explica cada vino, que la gastronomía sale de la cocina de la casa. No hay intermediarios entre vos y la autenticidad.
          </p>
        </FadeUp>
      </section>

      {/* PAQUETES */}
      {paquetes.map((pkg, i) => (
        <section key={pkg.id} style={{ padding: '80px 32px', background: i % 2 === 0 ? C.dark : '#0d0d0d', borderTop: '1px solid rgba(201,166,107,0.08)' }}>
          <div style={{ maxWidth: 1380, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 80, alignItems: 'center' }}>

              <FadeIn dir={i % 2 === 0 ? 'left' : 'right'}>
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                  <img src={pkg.img} alt={pkg.title}
                    style={{ width: '100%', height: 520, objectFit: 'cover' }} className="float-wine-slow" />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 60%, rgba(11,11,11,0.5) 100%)' }} />
                  <div style={{ position: 'absolute', top: 24, left: 24, background: 'rgba(11,11,11,0.8)', backdropFilter: 'blur(10px)', padding: '10px 20px', border: `1px solid ${pkg.color}40` }}>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 42, color: pkg.color, fontWeight: 700, lineHeight: 1, display: 'block' }}>{pkg.num}</span>
                  </div>
                </div>
              </FadeIn>

              <FadeIn dir={i % 2 === 0 ? 'right' : 'left'} delay={0.12}>
                <div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: '0.42em', color: pkg.color, textTransform: 'uppercase', marginBottom: 14, opacity: 0.85 }}>{pkg.sub}</p>
                  <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(44px, 5.5vw, 68px)', color: C.cream, fontWeight: 400, marginBottom: 14, lineHeight: 0.95 }}>{pkg.title}</h2>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: pkg.color, fontStyle: 'italic', marginBottom: 32, opacity: 0.85 }}>{pkg.tagline}</p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
                    {pkg.includes.map((item, j) => (
                      <div key={j} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: '14px 18px', background: 'rgba(201,166,107,0.04)', border: `1px solid ${pkg.color}18` }}>
                        <span style={{ fontSize: 18, flexShrink: 0 }}>{item.icon}</span>
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: C.cream, lineHeight: 1.55, opacity: 0.9 }}>{item.text}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 36 }}>
                    <span style={{ color: pkg.color, fontSize: 11 }}>✦</span>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: C.muted, letterSpacing: '0.06em' }}>
                      Ideal para: {pkg.ideal}
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                    <Link to="/contacto" style={{ textDecoration: 'none' }}>
                      <button
                        style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: C.dark, background: pkg.color, border: 'none', padding: '15px 36px', cursor: 'pointer', transition: 'all 0.3s' }}
                        onMouseEnter={e => { e.target.style.opacity = '0.85'; e.target.style.transform = 'translateY(-1px)' }}
                        onMouseLeave={e => { e.target.style.opacity = '1'; e.target.style.transform = 'none' }}>
                        Reservar esta Experiencia
                      </button>
                    </Link>
                    <a href="https://wa.me/5492627000000" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                      <button
                        style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: pkg.color, background: 'transparent', border: `1.5px solid ${pkg.color}55`, padding: '15px 36px', cursor: 'pointer', transition: 'all 0.3s' }}
                        onMouseEnter={e => { e.target.style.borderColor = pkg.color }}
                        onMouseLeave={e => { e.target.style.borderColor = `${pkg.color}55` }}>
                        Consultar Precio
                      </button>
                    </a>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
      ))}

      {/* INFO */}
      <section style={{ padding: '100px 32px', background: C.bordo }}>
        <div style={{ maxWidth: 1380, margin: '0 auto' }}>
          <FadeUp style={{ textAlign: 'center', marginBottom: 72 }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(36px, 4vw, 52px)', color: C.cream, fontWeight: 400 }}>Información práctica</h2>
          </FadeUp>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
            {[
              { icon: '📅', title: 'Reservas', desc: 'Todas las experiencias requieren reserva previa. Contactanos por WhatsApp para coordinar fecha y horario.' },
              { icon: '👥', title: 'Grupos', desc: 'Adaptamos las experiencias para grupos de 2 a 30 personas. Consultá por propuestas personalizadas.' },
              { icon: '🌿', title: 'Dietas', desc: 'Contamos con opciones vegetarianas y sin TACC en las experiencias gastronómicas. Informalo al reservar.' },
              { icon: '📍', title: 'Cómo llegar', desc: 'Cubillos 4300, Ruta 173, Rama Caída. Te enviamos indicaciones al confirmar tu reserva.' },
            ].map(({ icon, title, desc }, i) => (
              <FadeUp key={title} delay={i * 0.08}>
                <div style={{ padding: '36px 28px', background: 'rgba(11,11,11,0.35)', border: '1px solid rgba(201,166,107,0.15)', backdropFilter: 'blur(8px)', height: '100%' }}>
                  <div style={{ fontSize: 26, marginBottom: 16 }}>{icon}</div>
                  <h4 style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, letterSpacing: '0.26em', color: C.gold, textTransform: 'uppercase', marginBottom: 14 }}>{title}</h4>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'rgba(245,241,234,0.65)', lineHeight: 1.8 }}>{desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '100px 32px', textAlign: 'center' }}>
        <FadeUp>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, color: C.gold, fontStyle: 'italic', marginBottom: 36, lineHeight: 1.55 }}>
            "El mejor momento para visitar una bodega<br />es ahora — con buena compañía."
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://wa.me/5492627000000" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <button
                style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: C.dark, background: C.gold, border: 'none', padding: '16px 44px', cursor: 'pointer', transition: 'all 0.3s' }}
                onMouseEnter={e => { e.target.style.background = '#d9ba88' }}
                onMouseLeave={e => { e.target.style.background = C.gold }}>
                Reservar por WhatsApp
              </button>
            </a>
            <Link to="/contacto" style={{ textDecoration: 'none' }}>
              <button
                style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: C.gold, background: 'transparent', border: `1.5px solid ${C.gold}`, padding: '16px 44px', cursor: 'pointer', transition: 'all 0.3s' }}
                onMouseEnter={e => { e.target.style.background = C.gold; e.target.style.color = C.dark }}
                onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = C.gold }}>
                Formulario de Reserva
              </button>
            </Link>
          </div>
        </FadeUp>
      </section>
    </div>
  )
}
