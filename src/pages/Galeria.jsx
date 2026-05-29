import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSite } from '../context/SiteContext'

const C = {
  dark:      '#0B0B0B',
  bordo:     '#4A0E1A',
  champagne: '#D7C3A1',
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
  return <motion.div ref={ref} initial={{ opacity: 0, y: 32 }} animate={v ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay, ease: 'easeOut' }} style={style}>{children}</motion.div>
}

function PhotoCard({ photo, delay, onClick }) {
  const [hov, setHov] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      onClick={onClick}
      style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer', breakInside: 'avoid', marginBottom: 16, border: `1px solid ${hov ? 'rgba(201,166,107,0.4)' : 'transparent'}`, transition: 'border-color 0.3s' }}
    >
      <motion.img src={photo.src} alt={photo.title} loading="lazy"
        style={{ width: '100%', display: 'block', objectFit: 'cover' }}
        animate={{ scale: hov ? 1.05 : 1 }} transition={{ duration: 0.5 }} />
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: hov ? 1 : 0 }} transition={{ duration: 0.28 }}
        style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11,11,11,0.9) 0%, transparent 55%)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '22px 18px' }}>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 8, letterSpacing: '0.22em', textTransform: 'uppercase', background: C.bordo, color: C.champagne, padding: '3px 10px', marginBottom: 8, display: 'inline-block', width: 'fit-content' }}>{photo.cat}</span>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'rgba(245,241,234,0.9)', lineHeight: 1.5 }}>{photo.title}</p>
      </motion.div>
    </motion.div>
  )
}

const eventsList = [
  {
    day: 'Cada Viernes y Sábado',
    title: 'Wine Lovers',
    desc: 'Noches de encuentro en el viñedo. Música en vivo, vinos de autor y la magia del atardecer mendocino.',
    img: '/evento-musica.jpg',
    tag: 'Música · Vino',
  },
  {
    day: 'Domingos',
    title: 'Sunset Sessions',
    desc: 'El sol se pone entre las vides. Una copa en mano, tiempo para desconectar y disfrutar del paisaje.',
    img: 'https://images.unsplash.com/photo-1586370434639-0fe43b2d32e6?w=700&q=80',
    tag: 'Atardecer',
  },
  {
    day: 'Mensual',
    title: 'Degustaciones Especiales',
    desc: 'Catas temáticas con nuestro enólogo. Varietales, cosechas históricas y blend verticales.',
    img: 'https://images.unsplash.com/photo-1543218024-57a70143c369?w=700&q=80',
    tag: 'Enología',
  },
  {
    day: 'A Convenir',
    title: 'Eventos Privados',
    desc: 'Casamientos boutique, cumpleaños, reuniones corporativas. La bodega como escenario único.',
    img: '/evento-ambiente.jpg',
    tag: 'Privado',
  },
  {
    day: 'Temporada',
    title: 'Yoga & Vino',
    desc: 'Sesión de yoga entre los viñedos al amanecer, seguida de degustación con desayuno.',
    img: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=700&q=80',
    tag: 'Bienestar',
  },
  {
    day: 'A Convenir',
    title: 'Experiencias Corporativas',
    desc: 'Team building, lanzamientos y cenas de empresa en un entorno único e inolvidable.',
    img: '/evento-noche.jpg',
    tag: 'Corporativo',
  },
]

export default function Galeria() {
  const { data } = useSite()
  const photos = data.gallery.filter(p => p.visible !== false)
  const allCats = ['Todos', ...new Set(photos.map(p => p.cat))]
  const [filter, setFilter] = useState('Todos')
  const [lb, setLb] = useState(null)
  const [tab, setTab] = useState('eventos')

  const filtered = filter === 'Todos' ? photos : photos.filter(p => p.cat === filter)

  const prevPhoto = () => setLb(i => (i - 1 + filtered.length) % filtered.length)
  const nextPhoto = () => setLb(i => (i + 1) % filtered.length)

  useEffect(() => {
    const handler = (e) => {
      if (lb === null) return
      if (e.key === 'Escape') setLb(null)
      if (e.key === 'ArrowLeft') prevPhoto()
      if (e.key === 'ArrowRight') nextPhoto()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lb, filtered.length])

  return (
    <div style={{ background: C.dark }}>
      {/* HERO */}
      <section style={{ position: 'relative', minHeight: '46vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', paddingTop: 80, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src="https://images.unsplash.com/photo-1543730435960-55bc92d5a1a0?w=1600&q=75" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(11,11,11,0.88) 0%, rgba(74,14,26,0.8) 100%)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 1, padding: '80px 28px 72px' }}>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: '0.5em', color: C.gold, textTransform: 'uppercase', marginBottom: 20 }}>
            Terra Lombarda · Agenda & Galería
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(48px, 8vw, 92px)', color: C.cream, lineHeight: 0.92, fontWeight: 400, letterSpacing: '0.04em', marginBottom: 22 }}>
            Eventos & Galería
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.48 }}
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: C.gold, fontStyle: 'italic', opacity: 0.9 }}>
            Viñedos, vino, música y atardeceres.
          </motion.p>
        </div>
      </section>

      {/* TABS */}
      <div style={{ background: 'rgba(11,11,11,0.97)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(201,166,107,0.18)', position: 'sticky', top: 80, zIndex: 98 }}>
        <div style={{ maxWidth: 1380, margin: '0 auto', padding: '0 32px', display: 'flex' }}>
          {[{ key: 'eventos', label: 'Eventos' }, { key: 'galeria', label: 'Galería' }].map(({ key, label }) => (
            <button key={key} onClick={() => setTab(key)}
              style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: tab === key ? C.gold : 'rgba(245,241,234,0.5)', background: 'none', border: 'none', borderBottom: tab === key ? `2px solid ${C.gold}` : '2px solid transparent', padding: '18px 30px', cursor: 'pointer', transition: 'all 0.25s' }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* ── EVENTOS ── */}
        {tab === 'eventos' && (
          <motion.div key="eventos" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
            <div style={{ maxWidth: 1380, margin: '0 auto', padding: '72px 32px 100px' }}>
              <FadeUp style={{ textAlign: 'center', marginBottom: 72 }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: '0.42em', color: C.gold, textTransform: 'uppercase', marginBottom: 16 }}>Agenda de la Bodega</p>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(36px, 4.5vw, 56px)', color: C.cream, fontWeight: 400 }}>Eventos en la Bodega</h2>
              </FadeUp>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 22 }}>
                {eventsList.map((ev, i) => (
                  <FadeUp key={ev.title} delay={i * 0.07}>
                    <div style={{ position: 'relative', overflow: 'hidden', background: '#0f0f0f', border: '1px solid rgba(201,166,107,0.1)' }}>
                      <div style={{ height: 280, overflow: 'hidden' }}>
                        <img src={ev.img} alt={ev.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7, transition: 'all 0.4s' }}
                          onMouseEnter={e => { e.target.style.opacity = '0.9'; e.target.style.transform = 'scale(1.04)' }}
                          onMouseLeave={e => { e.target.style.opacity = '0.7'; e.target.style.transform = 'none' }} />
                      </div>
                      <div style={{ padding: '28px 26px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 8, letterSpacing: '0.22em', color: C.gold, textTransform: 'uppercase' }}>{ev.day}</span>
                          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 8, letterSpacing: '0.18em', background: C.bordo, color: C.champagne, padding: '3px 10px', textTransform: 'uppercase' }}>{ev.tag}</span>
                        </div>
                        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, color: C.cream, fontWeight: 400, marginBottom: 10, lineHeight: 1.1 }}>{ev.title}</h3>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: C.muted, lineHeight: 1.75 }}>{ev.desc}</p>
                      </div>
                    </div>
                  </FadeUp>
                ))}
              </div>
              <FadeUp style={{ textAlign: 'center', marginTop: 64 }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: C.gold, fontStyle: 'italic', marginBottom: 30, opacity: 0.9 }}>
                  Eventos especiales y fechas únicas en nuestro Instagram
                </p>
                <a href="https://instagram.com/bodegaterralombarda" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                  <button
                    style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: C.dark, background: C.gold, border: 'none', padding: '14px 36px', cursor: 'pointer', transition: 'all 0.3s' }}
                    onMouseEnter={e => { e.target.style.background = '#d9ba88' }}
                    onMouseLeave={e => { e.target.style.background = C.gold }}>
                    Ver Instagram
                  </button>
                </a>
              </FadeUp>
            </div>
          </motion.div>
        )}

        {/* ── GALERÍA ── */}
        {tab === 'galeria' && (
          <motion.div key="galeria" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
            <div style={{ maxWidth: 1380, margin: '0 auto', padding: '60px 32px 100px' }}>
              {/* Filtros */}
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 52 }}>
                {allCats.map(cat => (
                  <button key={cat} onClick={() => setFilter(cat)}
                    style={{
                      fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase',
                      color: filter === cat ? C.dark : C.muted,
                      background: filter === cat ? C.gold : 'transparent',
                      border: `1px solid ${filter === cat ? C.gold : 'rgba(201,166,107,0.25)'}`,
                      padding: '9px 20px', cursor: 'pointer', transition: 'all 0.25s',
                    }}>
                    {cat}
                  </button>
                ))}
              </div>

              {/* Masonry */}
              <motion.div layout style={{ columns: '3 220px', columnGap: 16 }}>
                <AnimatePresence>
                  {filtered.map((photo, i) => (
                    <PhotoCard key={photo.id} photo={photo} delay={i * 0.04} onClick={() => setLb(i)} />
                  ))}
                </AnimatePresence>
              </motion.div>

              <FadeUp style={{ textAlign: 'center', marginTop: 64 }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: C.gold, fontStyle: 'italic', marginBottom: 26, opacity: 0.9 }}>
                  Seguinos para ver la bodega en tiempo real
                </p>
                <a href="https://instagram.com/bodegaterralombarda" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                  <button
                    style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: C.gold, background: 'transparent', border: `1.5px solid ${C.gold}`, padding: '14px 36px', cursor: 'pointer', transition: 'all 0.3s' }}
                    onMouseEnter={e => { e.target.style.background = C.gold; e.target.style.color = C.dark }}
                    onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = C.gold }}>
                    @bodegaterralombarda
                  </button>
                </a>
              </FadeUp>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lb !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLb(null)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(11,11,11,0.97)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, backdropFilter: 'blur(10px)' }}>
            <button onClick={e => { e.stopPropagation(); prevPhoto() }}
              style={{ position: 'absolute', left: 20, background: 'rgba(245,241,234,0.08)', border: '1px solid rgba(245,241,234,0.18)', color: '#fff', width: 52, height: 52, cursor: 'pointer', fontSize: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(245,241,234,0.18)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(245,241,234,0.08)'}>‹</button>
            <motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              style={{ maxWidth: '82vw', maxHeight: '82vh', textAlign: 'center' }}>
              <img src={filtered[lb]?.src} alt={filtered[lb]?.title} style={{ maxWidth: '100%', maxHeight: '76vh', objectFit: 'contain', display: 'block', border: '1px solid rgba(201,166,107,0.15)' }} />
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: 'rgba(245,241,234,0.5)', marginTop: 16, letterSpacing: '0.1em' }}>
                {filtered[lb]?.title}
              </p>
            </motion.div>
            <button onClick={e => { e.stopPropagation(); nextPhoto() }}
              style={{ position: 'absolute', right: 20, background: 'rgba(245,241,234,0.08)', border: '1px solid rgba(245,241,234,0.18)', color: '#fff', width: 52, height: 52, cursor: 'pointer', fontSize: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(245,241,234,0.18)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(245,241,234,0.08)'}>›</button>
            <button onClick={() => setLb(null)}
              style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', color: 'rgba(245,241,234,0.55)', fontSize: 30, cursor: 'pointer', lineHeight: 1 }}>✕</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
