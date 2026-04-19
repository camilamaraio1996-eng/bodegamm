import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSite } from '../context/SiteContext'

const C = { gold: '#C4A35A', cream: '#F2EBD9', dark: '#1A1A18', darker: '#111110', card: '#232320', verde: '#2D4A3E', terracota: '#B5533C', muted: 'rgba(242,235,217,0.55)' }

function FadeUp({ children, delay = 0, style = {} }) {
  const ref = useRef(null); const [v, setV] = useState(false)
  useEffect(() => { const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect() } }, { threshold: 0.08 }); if (ref.current) obs.observe(ref.current); return () => obs.disconnect() }, [])
  return <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={v ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: 'easeOut' }} style={style}>{children}</motion.div>
}


function PhotoCard({ photo, delay, onClick }) {
  const [hov, setHov] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      onClick={onClick}
      style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer', breakInside: 'avoid', marginBottom: 16, border: `1px solid ${hov ? C.gold : 'transparent'}`, transition: 'border-color 0.3s' }}
    >
      <motion.img src={photo.src} alt={photo.title || photo.alt} loading="lazy"
        style={{ width: '100%', display: 'block', objectFit: 'cover' }}
        animate={{ scale: hov ? 1.04 : 1 }} transition={{ duration: 0.45 }} />
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: hov ? 1 : 0 }} transition={{ duration: 0.25 }}
        style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(17,17,16,0.85) 0%, transparent 50%)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '20px 18px' }}>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', background: C.verde, color: C.cream, padding: '3px 8px', display: 'inline-block', marginBottom: 6, width: 'fit-content' }}>{photo.cat}</span>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'rgba(242,235,217,0.8)' }}>{photo.title || photo.alt}</p>
      </motion.div>
    </motion.div>
  )
}

export default function Galeria() {
  const { data } = useSite()
  const photos = data.gallery.filter(p => p.visible !== false)
  const allCats = ['Todos', ...new Set(photos.map(p => p.cat))]

  const [filter, setFilter] = useState('Todos')
  const [lb, setLb] = useState(null)

  const filtered = filter === 'Todos' ? photos : photos.filter(p => p.cat === filter)

  return (
    <main>
      {/* HERO */}
      <section style={{ position: 'relative', background: C.darker, minHeight: '40vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', paddingTop: 72, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1600&q=70" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(17,17,16,0.78)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 1, padding: '80px 24px 60px' }}>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: '0.38em', color: C.gold, textTransform: 'uppercase', marginBottom: 16 }}>
            Je Suis Lacan
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(52px, 8vw, 96px)', color: C.cream, lineHeight: 0.95, fontWeight: 600, letterSpacing: '0.05em', marginBottom: 14 }}>
            Galería
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
            style={{ fontFamily: "'EB Garamond', serif", fontSize: 20, color: C.gold, fontStyle: 'italic' }}>
            El lugar, la comida, el barrio, la noche.
          </motion.p>
        </div>
      </section>

      {/* FILTER */}
      <div style={{ position: 'sticky', top: 72, zIndex: 40, background: 'rgba(17,17,16,0.96)', backdropFilter: 'blur(16px)', borderBottom: `2px solid ${C.gold}`, overflowX: 'auto' }}>
        <div style={{ display: 'flex', minWidth: 'max-content', maxWidth: 1280, margin: '0 auto' }}>
          {allCats.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)}
              style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: filter === cat ? C.cream : C.muted, background: filter === cat ? C.verde : 'transparent', border: 'none', padding: '14px 22px', cursor: 'pointer', transition: 'all 0.22s', whiteSpace: 'nowrap', borderBottom: filter === cat ? `2px solid ${C.verde}` : '2px solid transparent', marginBottom: -2 }}
              onMouseEnter={e => { if (filter !== cat) e.currentTarget.style.color = C.gold }}
              onMouseLeave={e => { if (filter !== cat) e.currentTarget.style.color = C.muted }}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* MASONRY */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '48px 24px 80px' }}>
        <div style={{ columns: '1', columnGap: 16 }}
          className="gallery-columns">
          {filtered.map((p, i) => <PhotoCard key={p.id} photo={p} delay={(i % 6) * 0.07} onClick={() => setLb(p)} />)}
        </div>
      </div>

      {/* INSTAGRAM CTA */}
      <section style={{ background: C.darker, padding: '72px 24px', textAlign: 'center' }}>
        <FadeUp>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(28px, 3.5vw, 42px)', color: C.cream, fontWeight: 500, marginBottom: 10 }}>
            Seguinos en Instagram
          </h3>
          <p style={{ fontFamily: "'EB Garamond', serif", fontSize: 20, color: C.gold, fontStyle: 'italic', marginBottom: 28 }}>
            @jesuislacan — fotos, eventos, menú del día.
          </p>
          <a href="https://instagram.com/jesuislacan" target="_blank" rel="noopener noreferrer"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.cream, background: C.terracota, padding: '13px 36px', textDecoration: 'none', display: 'inline-block', transition: 'background 0.25s' }}
            onMouseEnter={e => e.currentTarget.style.background = '#9a4532'}
            onMouseLeave={e => e.currentTarget.style.background = C.terracota}>
            @jesuislacan
          </a>
        </FadeUp>
      </section>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lb && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLb(null)}
            style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(10,10,10,0.94)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
            <motion.div initial={{ scale: 0.88, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.88, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              style={{ position: 'relative', maxWidth: 960, width: '100%' }}>
              <button onClick={() => setLb(null)}
                style={{ position: 'absolute', top: -44, right: 0, background: 'none', border: 'none', color: C.cream, fontSize: 28, cursor: 'pointer', opacity: 0.7, transition: 'opacity 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.opacity = 1}
                onMouseLeave={e => e.currentTarget.style.opacity = 0.7}>
                ✕
              </button>
              <img src={lb.src} alt={lb.title || lb.alt} style={{ width: '100%', maxHeight: '82vh', objectFit: 'contain' }} />
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: C.muted, textAlign: 'center', marginTop: 14, fontStyle: 'italic' }}>{lb.title || lb.alt}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 640px) { .gallery-columns { columns: 2 !important; } }
        @media (min-width: 1024px) { .gallery-columns { columns: 3 !important; } }
      `}</style>
    </main>
  )
}
