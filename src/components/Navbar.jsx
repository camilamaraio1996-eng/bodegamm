import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const C = {
  dark:  '#0B0B0B',
  bordo: '#4A0E1A',
  gold:  '#C9A66B',
  cream: '#F5F1EA',
  muted: 'rgba(245,241,234,0.55)',
}

const links = [
  { label: 'Inicio',          to: '/' },
  { label: 'Experiencias',    to: '/experiencias' },
  { label: 'Nuestra Historia', to: '/nuestra-historia' },
  { label: 'Vinos',           to: '/vinos' },
  { label: 'Galería',         to: '/galeria' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const location = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => setOpen(false), [location])

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999,
        transition: 'all 0.5s ease',
        background: scrolled ? 'rgba(11,11,11,0.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(201,166,107,0.15)' : 'none',
      }}>
        <div style={{ maxWidth: 1380, margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 80 }}>

          <Link to="/" style={{ textDecoration: 'none' }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", lineHeight: 1.1 }}>
              <div style={{ color: C.cream, fontSize: 18, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase' }}>Terra Lombarda</div>
              <div style={{ color: C.gold, fontSize: 8, letterSpacing: '0.38em', textTransform: 'uppercase', marginTop: 4, opacity: 0.9 }}>Bodega Boutique · San Rafael</div>
            </div>
          </Link>

          <nav style={{ display: 'flex', gap: 32, alignItems: 'center' }} className="desktop-nav">
            {links.map(l => (
              <Link key={l.to} to={l.to}
                style={{
                  fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 500,
                  letterSpacing: '0.16em', textTransform: 'uppercase',
                  color: location.pathname === l.to ? C.gold : C.cream,
                  textDecoration: 'none', transition: 'color 0.25s',
                  borderBottom: location.pathname === l.to ? `1px solid ${C.gold}` : '1px solid transparent',
                  paddingBottom: 2, opacity: location.pathname === l.to ? 1 : 0.8,
                }}
                onMouseEnter={e => { e.currentTarget.style.color = C.gold; e.currentTarget.style.opacity = '1' }}
                onMouseLeave={e => { e.currentTarget.style.color = location.pathname === l.to ? C.gold : C.cream; e.currentTarget.style.opacity = location.pathname === l.to ? '1' : '0.8' }}
              >{l.label}</Link>
            ))}

            <Link to="/contacto" style={{ textDecoration: 'none' }}>
              <div style={{
                fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600,
                letterSpacing: '0.2em', textTransform: 'uppercase',
                color: C.dark, background: C.gold,
                padding: '11px 24px', transition: 'all 0.3s', cursor: 'pointer',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = '#d9ba88'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                onMouseLeave={e => { e.currentTarget.style.background = C.gold; e.currentTarget.style.transform = 'none' }}
              >
                Reservar
              </div>
            </Link>
          </nav>

          <button onClick={() => setOpen(v => !v)}
            style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}
            className="hamburger-btn" aria-label="Menú">
            <div style={{ width: 24, height: 1.5, background: C.cream, marginBottom: 6, transition: 'all 0.3s', transform: open ? 'rotate(45deg) translateY(7.5px)' : 'none' }} />
            <div style={{ width: 24, height: 1.5, background: C.cream, marginBottom: 6, opacity: open ? 0 : 1, transition: 'opacity 0.3s' }} />
            <div style={{ width: 24, height: 1.5, background: C.cream, transition: 'all 0.3s', transform: open ? 'rotate(-45deg) translateY(-7.5px)' : 'none' }} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.38, ease: 'easeInOut' }}
            style={{
              position: 'fixed', inset: 0, zIndex: 998,
              background: 'rgba(11,11,11,0.98)',
              backdropFilter: 'blur(28px)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: 36,
            }}
          >
            <div style={{ position: 'absolute', top: 28, left: 32 }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", color: C.cream, fontSize: 18, fontWeight: 600, letterSpacing: '0.18em' }}>Terra Lombarda</div>
              <div style={{ color: C.gold, fontSize: 8, letterSpacing: '0.35em', textTransform: 'uppercase', marginTop: 3, opacity: 0.85 }}>Bodega Boutique</div>
            </div>

            {[...links, { label: 'Reservar', to: '/contacto' }].map((l, i) => (
              <motion.div key={l.to}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.07 + i * 0.07 }}
              >
                <Link to={l.to} style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(30px, 7vw, 42px)',
                  fontWeight: 400,
                  color: location.pathname === l.to ? C.gold : C.cream,
                  textDecoration: 'none',
                  letterSpacing: '0.04em',
                  transition: 'color 0.2s',
                  opacity: location.pathname === l.to ? 1 : 0.8,
                }}>{l.label}</Link>
              </motion.div>
            ))}

            <div style={{ position: 'absolute', bottom: 40, display: 'flex', gap: 10, alignItems: 'center' }}>
              <div style={{ width: 28, height: 1, background: 'rgba(201,166,107,0.3)' }} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: '0.35em', color: 'rgba(201,166,107,0.5)', textTransform: 'uppercase' }}>Cubillos 4300 · San Rafael · Mendoza</span>
              <div style={{ width: 28, height: 1, background: 'rgba(201,166,107,0.3)' }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 960px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: block !important; }
        }
      `}</style>
    </>
  )
}
