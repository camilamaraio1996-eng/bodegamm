import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const C = { gold: '#C4A35A', cream: '#F2EBD9', dark: '#1A1A18', verde: '#2D4A3E' }

const links = [
  { label: 'Inicio',    to: '/' },
  { label: 'Nosotros',  to: '/nosotros' },
  { label: 'Carta',     to: '/menu' },
  { label: 'Galería',   to: '/galeria' },
  { label: 'Contacto',  to: '/contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const location = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => setOpen(false), [location])

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999,
        transition: 'all 0.4s ease',
        background: scrolled ? 'rgba(26,26,24,0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(18px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(196,163,90,0.2)' : 'none',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>

          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", lineHeight: 1.1 }}>
              <div style={{ color: C.cream, fontSize: 18, fontWeight: 600, letterSpacing: '0.18em' }}>JE SUIS LACAN</div>
              <div style={{ color: C.gold, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', marginTop: 2, opacity: 0.85 }}>Bar · Bistró · Café · Almacén</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav style={{ display: 'flex', gap: 32, alignItems: 'center' }} className="desktop-nav">
            {links.map(l => (
              <Link key={l.to} to={l.to}
                style={{
                  fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 500,
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: location.pathname === l.to ? C.gold : C.cream,
                  textDecoration: 'none', transition: 'color 0.2s',
                  borderBottom: location.pathname === l.to ? `1.5px solid ${C.gold}` : '1.5px solid transparent',
                  paddingBottom: 2,
                }}
                onMouseEnter={e => e.currentTarget.style.color = C.gold}
                onMouseLeave={e => e.currentTarget.style.color = location.pathname === l.to ? C.gold : C.cream}
              >{l.label}</Link>
            ))}

            <a href="https://wa.me/541131231586" target="_blank" rel="noopener noreferrer"
              style={{
                fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600,
                letterSpacing: '0.14em', textTransform: 'uppercase',
                color: C.cream, background: C.verde,
                border: `1.5px solid ${C.verde}`,
                padding: '9px 20px', textDecoration: 'none',
                transition: 'all 0.25s', display: 'flex', alignItems: 'center', gap: 7,
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#25c764'; e.currentTarget.style.borderColor = '#25c764' }}
              onMouseLeave={e => { e.currentTarget.style.background = C.verde; e.currentTarget.style.borderColor = C.verde }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.13.557 4.127 1.529 5.865L0 24l6.335-1.509A11.954 11.954 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.003-1.368l-.359-.214-3.76.896.953-3.667-.234-.375A9.818 9.818 0 0 1 12 2.182c5.427 0 9.818 4.391 9.818 9.818S17.427 21.818 12 21.818z"/></svg>
              WhatsApp
            </a>
          </nav>

          {/* Hamburger */}
          <button onClick={() => setOpen(v => !v)}
            style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}
            className="hamburger-btn" aria-label="Menú">
            <div style={{ width: 24, height: 2, background: C.gold, marginBottom: 5, transition: 'all 0.3s', transform: open ? 'rotate(45deg) translateY(7px)' : 'none' }} />
            <div style={{ width: 24, height: 2, background: C.gold, marginBottom: 5, opacity: open ? 0 : 1, transition: 'opacity 0.3s' }} />
            <div style={{ width: 24, height: 2, background: C.gold, transition: 'all 0.3s', transform: open ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            style={{
              position: 'fixed', top: 0, right: 0, bottom: 0, width: '80%', maxWidth: 320,
              background: '#1A1A18', zIndex: 998,
              borderLeft: '1px solid rgba(196,163,90,0.25)',
              display: 'flex', flexDirection: 'column',
              padding: '100px 40px 40px', gap: 28,
            }}
          >
            {links.map((l, i) => (
              <motion.div key={l.to} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}>
                <Link to={l.to} style={{
                  fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 500,
                  color: location.pathname === l.to ? C.gold : C.cream, textDecoration: 'none',
                }}>{l.label}</Link>
              </motion.div>
            ))}
            <a href="https://wa.me/541131231586" target="_blank" rel="noopener noreferrer"
              style={{
                fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: '#fff', background: C.verde, border: 'none',
                padding: '14px 28px', textDecoration: 'none', marginTop: 16, textAlign: 'center',
              }}>
              WHATSAPP
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', zIndex: 997 }} />
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: block !important; }
        }
      `}</style>
    </>
  )
}
