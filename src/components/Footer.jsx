import { Link } from 'react-router-dom'

const C = {
  dark:  '#0B0B0B',
  bordo: '#4A0E1A',
  gold:  '#C9A66B',
  cream: '#F5F1EA',
  muted: 'rgba(245,241,234,0.45)',
}

const IgIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
  </svg>
)

const WaIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
  </svg>
)

const SpotifyIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
  </svg>
)

const WineIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ opacity: 0.5 }}>
    <path d="M20 3H4v10c0 4.418 3.582 8 8 8s8-3.582 8-8V3zM6 5h12v2H6V5zm6 14c-3.309 0-6-2.691-6-6v-4h12v4c0 3.309-2.691 6-6 6z"/>
    <path d="M11 13h2v5h-2z"/>
  </svg>
)

export default function Footer() {
  return (
    <footer style={{ background: '#0a0a0a', borderTop: '1px solid rgba(201,166,107,0.12)' }}>
      <div style={{ maxWidth: 1380, margin: '0 auto', padding: '88px 32px 56px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 56 }}>

        <div>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", color: C.cream, fontSize: 22, fontWeight: 600, letterSpacing: '0.2em', lineHeight: 1.2 }}>TERRA LOMBARDA</div>
            <div style={{ fontFamily: "'Inter', sans-serif", color: C.gold, fontSize: 8, letterSpacing: '0.36em', textTransform: 'uppercase', marginTop: 6, opacity: 0.85 }}>Bodega Boutique · San Rafael · Mendoza</div>
          </Link>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 19, color: C.gold, fontStyle: 'italic', marginTop: 26, lineHeight: 1.6, opacity: 0.9 }}>
            "Nuestra Bodega,<br />Nuestra Casa."
          </p>
          <div style={{ display: 'flex', gap: 18, marginTop: 24 }}>
            {[
              { href: 'https://instagram.com/bodegaterralombarda', Icon: IgIcon, label: 'Instagram' },
              { href: 'https://wa.me/5492627000000', Icon: WaIcon, label: 'WhatsApp' },
              { href: 'https://open.spotify.com/playlist/37i9dQZF1DX8NTLI2TtZa6', Icon: SpotifyIcon, label: 'Spotify' },
            ].map(({ href, Icon, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                style={{ color: C.cream, opacity: 0.4, transition: 'all 0.25s' }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.color = C.gold }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '0.4'; e.currentTarget.style.color = C.cream }}>
                <Icon />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: '0.34em', color: C.gold, textTransform: 'uppercase', marginBottom: 24 }}>Ubicación</h4>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: C.muted, lineHeight: 2.2 }}>
            Cubillos 4300 (Ruta 173)<br />Rama Caída<br />San Rafael, Mendoza
          </p>
          <a href="https://maps.google.com/?q=Cubillos+4300+Rama+Caida+San+Rafael+Mendoza"
            target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-block', fontFamily: "'Inter', sans-serif", fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.gold, textDecoration: 'none', marginTop: 16, opacity: 0.8, transition: 'opacity 0.2s', borderBottom: '1px solid rgba(201,166,107,0.3)', paddingBottom: 2 }}
            onMouseEnter={e => e.currentTarget.style.opacity = '1'}
            onMouseLeave={e => e.currentTarget.style.opacity = '0.8'}>
            Cómo llegar →
          </a>
        </div>

        <div>
          <h4 style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: '0.34em', color: C.gold, textTransform: 'uppercase', marginBottom: 24 }}>Horarios</h4>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: C.muted, lineHeight: 2.3 }}>
            Viernes y Sábado<br />
            <span style={{ color: C.cream, fontWeight: 500 }}>13:00 — 21:00</span><br />
            Domingo<br />
            <span style={{ color: C.cream, fontWeight: 500 }}>13:00 — 19:00</span><br />
            <span style={{ fontSize: 12, opacity: 0.7 }}>Lun–Jue: con reserva</span>
          </p>
        </div>

        <div>
          <h4 style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: '0.34em', color: C.gold, textTransform: 'uppercase', marginBottom: 24 }}>Reservas</h4>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: C.muted, lineHeight: 1.95, marginBottom: 24 }}>
            Reservá tu experiencia<br />directamente por WhatsApp.
          </p>
          <a href="https://wa.me/5492627000000" target="_blank" rel="noopener noreferrer"
            style={{
              fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: C.dark, background: C.gold,
              padding: '12px 26px', textDecoration: 'none',
              transition: 'all 0.28s', display: 'inline-block',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#d9ba88'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = C.gold; e.currentTarget.style.transform = 'none' }}>
            WhatsApp
          </a>
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(201,166,107,0.1)', padding: '28px 32px', textAlign: 'center' }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: C.gold, fontStyle: 'italic', letterSpacing: '0.08em', marginBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, opacity: 0.8 }}>
          <WineIcon /> Más de 100 años de historia vitivinícola. <WineIcon />
        </p>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: 'rgba(245,241,234,0.2)', letterSpacing: '0.08em' }}>
          © {new Date().getFullYear()} Bodega Terra Lombarda — San Rafael, Mendoza
        </p>
      </div>
    </footer>
  )
}
