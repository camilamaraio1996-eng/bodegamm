import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useSite } from '../context/SiteContext'

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
  return <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={v ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: 'easeOut' }} style={style}>{children}</motion.div>
}

function FadeIn({ children, delay = 0, dir = 'up', style = {} }) {
  const ref = useRef(null)
  const [v, setV] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect() } }, { threshold: 0.06 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  const from = { opacity: 0, x: dir === 'left' ? -56 : dir === 'right' ? 56 : 0, y: dir === 'up' ? 40 : 0 }
  return <motion.div ref={ref} initial={from} animate={v ? { opacity: 1, x: 0, y: 0 } : {}} transition={{ duration: 0.82, delay, ease: 'easeOut' }} style={style}>{children}</motion.div>
}

function WineCard({ vino, index }) {
  const [hov, setHov] = useState(false)
  const images = [
    '/foto-bottle.jpg',
    '/foto-cata.jpg',
    '/foto-sunset-cena.jpg',
    '/foto-bodega-interior.jpg',
    '/foto-asado.jpg',
    '/foto-vinedo-sunset.jpg',
  ]
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.62, delay: (index % 3) * 0.08, ease: 'easeOut' }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: '#0f0f0f',
        border: `1px solid ${hov ? 'rgba(201,166,107,0.4)' : 'rgba(201,166,107,0.1)'}`,
        overflow: 'hidden',
        transition: 'all 0.35s',
        transform: hov ? 'translateY(-5px)' : 'none',
        display: 'flex', flexDirection: 'column',
      }}>
      <div style={{ height: 240, overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
        <motion.img src={images[index % images.length]} alt={vino.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          animate={{ scale: hov ? 1.06 : 1 }} transition={{ duration: 0.55 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, rgba(11,11,11,0.6) 100%)' }} />
        {vino.badge && (
          <div style={{ position: 'absolute', top: 14, left: 14, background: C.bordo, padding: '4px 12px', border: '1px solid rgba(201,166,107,0.2)' }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 8, letterSpacing: '0.2em', color: C.champagne, textTransform: 'uppercase' }}>{vino.badge}</span>
          </div>
        )}
      </div>
      <div style={{ padding: '24px 24px 28px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, color: C.cream, fontWeight: 500, marginBottom: 10, lineHeight: 1.2 }}>{vino.name}</h3>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: C.muted, lineHeight: 1.7, marginBottom: 20, flex: 1 }}>{vino.description}</p>
        <a href="https://wa.me/5492627000000" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
          <button style={{
            width: '100%',
            fontFamily: "'Inter', sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase',
            color: hov ? C.dark : C.gold,
            background: hov ? C.gold : 'transparent',
            border: `1.5px solid ${C.gold}`,
            padding: '11px 0', cursor: 'pointer', transition: 'all 0.3s',
          }}>
            Consultar & Encargar
          </button>
        </a>
      </div>
    </motion.div>
  )
}

export default function Vinos() {
  const { data } = useSite()
  const vinos = data.menu.vinos?.items || []

  return (
    <div style={{ background: C.dark }}>

      {/* HERO */}
      <section style={{ position: 'relative', minHeight: '56vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', paddingTop: 80, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src="/foto-bottle.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(11,11,11,0.5) 0%, rgba(11,11,11,0.97) 100%)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 1, padding: '80px 28px 72px' }}>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: '0.5em', color: C.gold, textTransform: 'uppercase', marginBottom: 20 }}>
            Terra Lombarda · Producción Propia
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(50px, 8.5vw, 108px)', color: C.cream, lineHeight: 0.88, fontWeight: 400, letterSpacing: '0.04em', marginBottom: 24 }}>
            Nuestros Vinos
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.48 }}
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: C.champagne, fontStyle: 'italic', opacity: 0.9 }}>
            Vinos de autor, elaborados con pasión en San Rafael.
          </motion.p>
        </div>
      </section>

      {/* INTRO */}
      <section style={{ maxWidth: 860, margin: '0 auto', padding: '96px 32px 64px', textAlign: 'center' }}>
        <FadeUp>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: '0.42em', color: C.gold, textTransform: 'uppercase', marginBottom: 20 }}>Producción artesanal</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(30px, 3.5vw, 46px)', color: C.cream, fontWeight: 400, marginBottom: 26, lineHeight: 1.2 }}>
            Cada vino cuenta una historia.<br />La nuestra dura más de 100 años.
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: C.muted, lineHeight: 2 }}>
            Nuestros vinos nacen en los viñedos de Rama Caída, bajo el sol y el viento de San Rafael. Elaborados de manera artesanal con técnicas heredadas y mirada moderna, cada botella es un reflejo fiel del terroir mendocino y la pasión de la familia.
          </p>
        </FadeUp>
      </section>

      {/* VINOS GRID */}
      <section style={{ padding: '0 32px 100px', maxWidth: 1380, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 22 }}>
          {vinos.filter(v => v.visible !== false).map((vino, i) => (
            <WineCard key={vino.id} vino={vino} index={i} />
          ))}
        </div>
        <FadeUp style={{ textAlign: 'center', marginTop: 60 }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: C.muted, marginBottom: 28, lineHeight: 1.8 }}>
            Los vinos están disponibles para su consumo durante las experiencias en la bodega<br />
            y para llevar a domicilio con consulta previa.
          </p>
          <a href="https://wa.me/5492627000000" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <button
              style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: C.dark, background: C.gold, border: 'none', padding: '14px 38px', cursor: 'pointer', transition: 'all 0.3s' }}
              onMouseEnter={e => { e.target.style.background = '#d9ba88' }}
              onMouseLeave={e => { e.target.style.background = C.gold }}>
              Consultar por WhatsApp
            </button>
          </a>
        </FadeUp>
      </section>

      {/* SPOTIWINE */}
      <section style={{ padding: '100px 32px', background: C.bordo }}>
        <div style={{ maxWidth: 940, margin: '0 auto', textAlign: 'center' }}>
          <FadeUp>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: '0.42em', color: C.champagne, textTransform: 'uppercase', marginBottom: 20, opacity: 0.8 }}>SpotiWine</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(40px, 5.5vw, 66px)', color: C.cream, fontWeight: 400, marginBottom: 20, lineHeight: 1.05 }}>
              La Playlist de la Bodega
            </h2>
            <div style={{ width: 52, height: 1, background: C.champagne, margin: '0 auto 36px', opacity: 0.45 }} />
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, color: C.champagne, fontStyle: 'italic', lineHeight: 1.7, marginBottom: 52, opacity: 0.88 }}>
              Poné Play.<br />Servite una copa.<br />Desconectá del mundo.
            </p>
            <div style={{ overflow: 'hidden', border: '1px solid rgba(201,166,107,0.2)', background: '#111', maxWidth: 720, margin: '0 auto', boxShadow: '0 32px 100px rgba(0,0,0,0.7)' }}>
              <iframe
                src="https://open.spotify.com/embed/playlist/37i9dQZF1DX8NTLI2TtZa6?utm_source=generator&theme=0"
                width="100%" height="380" frameBorder="0" allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy" title="SpotiWine Terra Lombarda"
              />
            </div>
          </FadeUp>
        </div>
      </section>

      {/* TERROIR SECTION */}
      <section style={{ padding: '100px 32px', background: '#0d0d0d' }}>
        <div style={{ maxWidth: 1380, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 80, alignItems: 'center' }}>
            <FadeIn dir="left">
              <img src="https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=85" alt="Viñedos Terra Lombarda"
                style={{ width: '100%', height: 540, objectFit: 'cover' }} />
            </FadeIn>
            <FadeIn dir="right" delay={0.12}>
              <div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: '0.42em', color: C.gold, textTransform: 'uppercase', marginBottom: 22 }}>El terroir</p>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(34px, 4vw, 50px)', color: C.cream, fontWeight: 400, marginBottom: 26, lineHeight: 1.1 }}>
                  Rama Caída, el secreto<br /><em style={{ color: C.gold, fontStyle: 'italic' }}>mejor guardado de Mendoza</em>
                </h2>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: C.muted, lineHeight: 2, marginBottom: 22 }}>
                  Ubicada en el extremo sur de Mendoza, Rama Caída es una de las zonas vitivinícolas más únicas de la provincia. Su suelo arenoso, el clima semi-árido y los vientos de la Cordillera de los Andes crean condiciones excepcionales para la maduración de la uva.
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: C.muted, lineHeight: 2, marginBottom: 40 }}>
                  Nuestros viñedos se benefician de grandes amplitudes térmicas entre el día y la noche, lo que produce uvas con aromas intensos, acidez natural perfecta y concentración de taninos que hacen de nuestros vinos algo verdaderamente especial.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    'Suelos arenosos de alta permeabilidad',
                    'Clima semi-árido con baja pluviometría',
                    'Amplitud térmica de 15°C día/noche',
                    'Altitud: 750 metros sobre el nivel del mar',
                  ].map(t => (
                    <div key={t} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                      <span style={{ color: C.gold, fontSize: 12 }}>✦</span>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: C.cream, opacity: 0.85 }}>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '100px 32px', textAlign: 'center', background: C.dark, borderTop: '1px solid rgba(201,166,107,0.1)' }}>
        <FadeUp>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, color: C.gold, fontStyle: 'italic', marginBottom: 22, opacity: 0.9 }}>
            "Para conocer un vino de verdad,<br />hay que conocer la tierra de donde viene."
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: C.muted, marginBottom: 40, lineHeight: 1.85 }}>
            Visitá la bodega y descubrí el origen de cada copa.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/experiencias" style={{ textDecoration: 'none' }}>
              <button
                style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: C.dark, background: C.gold, border: 'none', padding: '16px 44px', cursor: 'pointer', transition: 'all 0.3s' }}
                onMouseEnter={e => { e.target.style.background = '#d9ba88' }}
                onMouseLeave={e => { e.target.style.background = C.gold }}>
                Ver Experiencias
              </button>
            </Link>
            <Link to="/contacto" style={{ textDecoration: 'none' }}>
              <button
                style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: C.gold, background: 'transparent', border: `1.5px solid ${C.gold}`, padding: '16px 44px', cursor: 'pointer', transition: 'all 0.3s' }}
                onMouseEnter={e => { e.target.style.background = C.gold; e.target.style.color = C.dark }}
                onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = C.gold }}>
                Reservar Visita
              </button>
            </Link>
          </div>
        </FadeUp>
      </section>
    </div>
  )
}
