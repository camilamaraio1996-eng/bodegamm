import { Link } from 'react-router-dom'

const C = { gold: '#C4A35A', cream: '#F2EBD9', dark: '#111110', verde: '#2D4A3E' }

const IgIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
  </svg>
)
const FbIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)

export default function Footer() {
  return (
    <footer style={{ background: C.dark, borderTop: `1px solid rgba(196,163,90,0.15)` }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 24px 48px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 48 }}>

        {/* Brand */}
        <div>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", color: C.cream, fontSize: 20, fontWeight: 600, letterSpacing: '0.15em', lineHeight: 1.2 }}>JE SUIS LACAN</div>
            <div style={{ fontFamily: "'Inter', sans-serif", color: C.gold, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', marginTop: 4, opacity: 0.8 }}>Bar · Bistró · Café · Almacén</div>
          </Link>
          <p style={{ fontFamily: "'EB Garamond', serif", fontSize: 17, color: C.gold, fontStyle: 'italic', marginTop: 20, lineHeight: 1.5 }}>
            "Lo real, lo imaginario,<br />lo simbólico."
          </p>
          <div style={{ display: 'flex', gap: 14, marginTop: 20 }}>
            {[
              { href: 'https://instagram.com/jesuislacan', icon: <IgIcon /> },
              { href: 'https://facebook.com', icon: <FbIcon /> },
            ].map(({ href, icon }) => (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                style={{ color: C.cream, opacity: 0.5, transition: 'opacity 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.opacity = 1}
                onMouseLeave={e => e.currentTarget.style.opacity = 0.5}>
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Dirección */}
        <div>
          <h4 style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: '0.25em', color: C.gold, textTransform: 'uppercase', marginBottom: 20 }}>Dirección</h4>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'rgba(242,235,217,0.65)', lineHeight: 2 }}>
            Balcarce 749<br />San Telmo, CABA<br />Buenos Aires, Argentina
          </p>
          <a href="tel:+541131231586" style={{ display: 'block', fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'rgba(242,235,217,0.65)', marginTop: 12, textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = C.gold}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(242,235,217,0.65)'}>
            11 3123-1586
          </a>
        </div>

        {/* Horarios */}
        <div>
          <h4 style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: '0.25em', color: C.gold, textTransform: 'uppercase', marginBottom: 20 }}>Horarios</h4>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'rgba(242,235,217,0.65)', lineHeight: 2 }}>
            Martes a Domingo<br />
            <span style={{ color: C.cream, fontWeight: 500 }}>10:00 — 23:45</span><br />
            Lunes: cerrado
          </p>
        </div>

        {/* Contacto */}
        <div>
          <h4 style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: '0.25em', color: C.gold, textTransform: 'uppercase', marginBottom: 20 }}>Reservas</h4>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'rgba(242,235,217,0.55)', lineHeight: 1.8, marginBottom: 20 }}>
            Escribinos por WhatsApp.<br />Te respondemos al toque.
          </p>
          <a href="https://wa.me/541131231586" target="_blank" rel="noopener noreferrer"
            style={{
              fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: '#fff', background: '#25D366', border: 'none',
              padding: '11px 22px', textDecoration: 'none', transition: 'background 0.25s', display: 'inline-block',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#1da851'}
            onMouseLeave={e => e.currentTarget.style.background = '#25D366'}>
            WhatsApp
          </a>
        </div>
      </div>

      {/* Bottom */}
      <div style={{ borderTop: '1px solid rgba(196,163,90,0.12)', padding: '28px 24px', textAlign: 'center' }}>
        <p style={{ fontFamily: "'EB Garamond', serif", fontSize: 16, color: C.gold, fontStyle: 'italic', letterSpacing: '0.08em', marginBottom: 8 }}>
          ✦ &nbsp; Lo real, lo imaginario, lo simbólico. &nbsp; ✦
        </p>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'rgba(242,235,217,0.3)', letterSpacing: '0.05em' }}>
          © {new Date().getFullYear()} Je Suis Lacan — San Telmo, Buenos Aires
        </p>
      </div>
    </footer>
  )
}
