import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'

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
  return <motion.div ref={ref} initial={{ opacity: 0, y: 38 }} animate={v ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.68, delay, ease: 'easeOut' }} style={style}>{children}</motion.div>
}

function FadeIn({ children, delay = 0, dir = 'up', style = {} }) {
  const ref = useRef(null)
  const [v, setV] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect() } }, { threshold: 0.06 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  const from = { opacity: 0, x: dir === 'left' ? -52 : dir === 'right' ? 52 : 0, y: dir === 'up' ? 38 : 0 }
  return <motion.div ref={ref} initial={from} animate={v ? { opacity: 1, x: 0, y: 0 } : {}} transition={{ duration: 0.78, delay, ease: 'easeOut' }} style={style}>{children}</motion.div>
}

const infoItems = [
  {
    title: 'Dirección',
    lines: ['Cubillos 4300 (Ruta 173)', 'Rama Caída, San Rafael', 'Mendoza, Argentina'],
    cta: { label: 'Ver en Maps', href: 'https://maps.google.com/?q=Cubillos+4300+Rama+Caida+San+Rafael+Mendoza' },
  },
  {
    title: 'WhatsApp',
    lines: ['Reservas y consultas', 'Respondemos siempre'],
    cta: { label: 'Abrir WhatsApp', href: 'https://wa.me/5492627000000', green: true },
  },
  {
    title: 'Horarios',
    lines: ['Viernes y Sábado: 13–21hs', 'Domingo: 13–19hs', 'Lun–Jue: con reserva'],
  },
  {
    title: 'Instagram',
    lines: ['@bodegaterralombarda', 'Eventos y novedades'],
    cta: { label: 'Seguirnos', href: 'https://instagram.com/bodegaterralombarda' },
  },
]

const HOURS = [
  { days: 'Viernes', time: '13:00 — 21:00' },
  { days: 'Sábado', time: '13:00 — 21:00' },
  { days: 'Domingo', time: '13:00 — 19:00' },
  { days: 'Lunes a Jueves', time: 'Con reserva previa' },
]

const EXPERIENCIAS = ['Seleccionar experiencia', 'Cata', 'Wine House', 'Vinos y Fuegos', 'Evento Privado', 'Casamiento Boutique', 'Cumpleaños', 'Corporativo', 'Otra consulta']

export default function Contacto() {
  const [form, setForm] = useState({ nombre: '', telefono: '', email: '', personas: '2', experiencia: '', fecha: '', mensaje: '' })
  const [sent, setSent] = useState(false)

  const inputStyle = {
    width: '100%', padding: '14px 16px',
    background: 'rgba(201,166,107,0.04)',
    border: '1px solid rgba(201,166,107,0.2)',
    color: C.cream, fontFamily: "'Inter', sans-serif", fontSize: 14,
    outline: 'none', transition: 'border-color 0.25s', appearance: 'none',
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const msg = encodeURIComponent(
      `Hola Terra Lombarda! Quiero reservar una experiencia.\n\nNombre: ${form.nombre}\nTeléfono: ${form.telefono}\nEmail: ${form.email}\nPersonas: ${form.personas}\nExperiencia: ${form.experiencia}\nFecha: ${form.fecha}${form.mensaje ? `\nMensaje: ${form.mensaje}` : ''}`
    )
    window.open(`https://wa.me/5492627000000?text=${msg}`, '_blank')
    setSent(true)
  }

  return (
    <div style={{ background: C.dark }}>
      {/* HERO */}
      <section style={{ position: 'relative', minHeight: '46vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', paddingTop: 80, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src="/foto-sunset-cena.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(11,11,11,0.92) 0%, rgba(74,14,26,0.85) 100%)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 1, padding: '80px 28px 72px' }}>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: '0.5em', color: C.gold, textTransform: 'uppercase', marginBottom: 20 }}>
            Terra Lombarda · San Rafael
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(48px, 8vw, 92px)', color: C.cream, lineHeight: 0.92, fontWeight: 400, letterSpacing: '0.04em', marginBottom: 22 }}>
            Reservas & Contacto
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.48 }}
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 21, color: C.gold, fontStyle: 'italic', opacity: 0.9 }}>
            Reservá tu experiencia en la bodega.
          </motion.p>
        </div>
      </section>

      {/* INFO CARDS */}
      <section style={{ background: '#0d0d0d', padding: '80px 32px' }}>
        <div style={{ maxWidth: 1380, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
          {infoItems.map(({ title, lines, cta }, i) => (
            <FadeUp key={title} delay={i * 0.08}>
              <div style={{ padding: '36px 28px', background: 'rgba(201,166,107,0.03)', border: '1px solid rgba(201,166,107,0.15)', height: '100%', display: 'flex', flexDirection: 'column', backdropFilter: 'blur(8px)' }}>
                <div style={{ width: 28, height: 1.5, background: C.gold, marginBottom: 20, opacity: 0.65 }} />
                <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: '0.3em', color: C.gold, textTransform: 'uppercase', marginBottom: 18 }}>{title}</h3>
                <div style={{ flex: 1 }}>
                  {lines.map((l, j) => (
                    <p key={j} style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: j === 0 ? C.cream : C.muted, lineHeight: 2.15, fontWeight: j === 0 ? 500 : 400 }}>{l}</p>
                  ))}
                </div>
                {cta && (
                  <a href={cta.href} target="_blank" rel="noopener noreferrer"
                    style={{
                      fontFamily: "'Inter', sans-serif", fontSize: 9, fontWeight: 600,
                      letterSpacing: '0.22em', textTransform: 'uppercase',
                      color: C.dark,
                      background: cta.green ? '#25D366' : C.gold,
                      padding: '10px 20px', textDecoration: 'none', display: 'inline-block',
                      marginTop: 22, transition: 'all 0.28s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'none' }}>
                    {cta.label}
                  </a>
                )}
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* FORM + MAPA */}
      <section style={{ padding: '100px 32px' }}>
        <div style={{ maxWidth: 1380, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 80, alignItems: 'start' }}>

          {/* FORM */}
          <FadeIn dir="left">
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: '0.42em', color: C.gold, textTransform: 'uppercase', marginBottom: 18 }}>Formulario</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(34px, 4vw, 50px)', color: C.cream, fontWeight: 400, marginBottom: 14, lineHeight: 1.1 }}>
              Reservar Experiencia
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: C.muted, lineHeight: 1.85, marginBottom: 36 }}>
              Completá el formulario y te contactamos por WhatsApp para confirmar tu reserva.
            </p>

            {sent ? (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                style={{ padding: '44px 36px', background: 'rgba(201,166,107,0.06)', border: '1px solid rgba(201,166,107,0.3)', textAlign: 'center' }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, color: C.cream, marginBottom: 14 }}>¡Reserva enviada!</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: C.muted, lineHeight: 1.85 }}>
                  Te redirigimos a WhatsApp para coordinar los detalles.<br />¡Nos vemos en la bodega!
                </p>
                <button onClick={() => setSent(false)}
                  style={{ marginTop: 28, fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: C.gold, background: 'transparent', border: `1.5px solid ${C.gold}`, padding: '12px 26px', cursor: 'pointer' }}>
                  Nueva Reserva
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div>
                    <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: '0.22em', color: C.muted, textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Nombre *</label>
                    <input required type="text" value={form.nombre} onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))}
                      placeholder="Tu nombre completo" style={inputStyle}
                      onFocus={e => e.target.style.borderColor = C.gold}
                      onBlur={e => e.target.style.borderColor = 'rgba(201,166,107,0.2)'} />
                  </div>
                  <div>
                    <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: '0.22em', color: C.muted, textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Teléfono *</label>
                    <input required type="tel" value={form.telefono} onChange={e => setForm(f => ({ ...f, telefono: e.target.value }))}
                      placeholder="+54 9..." style={inputStyle}
                      onFocus={e => e.target.style.borderColor = C.gold}
                      onBlur={e => e.target.style.borderColor = 'rgba(201,166,107,0.2)'} />
                  </div>
                </div>
                <div>
                  <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: '0.22em', color: C.muted, textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Email</label>
                  <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="tu@email.com" style={inputStyle}
                    onFocus={e => e.target.style.borderColor = C.gold}
                    onBlur={e => e.target.style.borderColor = 'rgba(201,166,107,0.2)'} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div>
                    <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: '0.22em', color: C.muted, textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Personas *</label>
                    <select required value={form.personas} onChange={e => setForm(f => ({ ...f, personas: e.target.value }))}
                      style={{ ...inputStyle, cursor: 'pointer' }}
                      onFocus={e => e.target.style.borderColor = C.gold}
                      onBlur={e => e.target.style.borderColor = 'rgba(201,166,107,0.2)'}>
                      {[1,2,3,4,5,6,7,8,10,12,15,20,25,30].map(n => <option key={n} value={n}>{n} persona{n > 1 ? 's' : ''}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: '0.22em', color: C.muted, textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Experiencia *</label>
                    <select required value={form.experiencia} onChange={e => setForm(f => ({ ...f, experiencia: e.target.value }))}
                      style={{ ...inputStyle, cursor: 'pointer' }}
                      onFocus={e => e.target.style.borderColor = C.gold}
                      onBlur={e => e.target.style.borderColor = 'rgba(201,166,107,0.2)'}>
                      {EXPERIENCIAS.map(ex => <option key={ex} value={ex === 'Seleccionar experiencia' ? '' : ex}>{ex}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: '0.22em', color: C.muted, textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Fecha preferida *</label>
                  <input required type="date" value={form.fecha} onChange={e => setForm(f => ({ ...f, fecha: e.target.value }))}
                    style={{ ...inputStyle, colorScheme: 'dark' }}
                    onFocus={e => e.target.style.borderColor = C.gold}
                    onBlur={e => e.target.style.borderColor = 'rgba(201,166,107,0.2)'} />
                </div>
                <div>
                  <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: '0.22em', color: C.muted, textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Mensaje o requerimientos</label>
                  <textarea value={form.mensaje} onChange={e => setForm(f => ({ ...f, mensaje: e.target.value }))}
                    placeholder="Alergias, ocasión especial, requerimientos dietarios, etc."
                    rows={4}
                    style={{ ...inputStyle, resize: 'vertical', minHeight: 100 }}
                    onFocus={e => e.target.style.borderColor = C.gold}
                    onBlur={e => e.target.style.borderColor = 'rgba(201,166,107,0.2)'} />
                </div>
                <button type="submit"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.24em', textTransform: 'uppercase', color: C.dark, background: C.gold, border: 'none', padding: '17px 32px', cursor: 'pointer', transition: 'all 0.3s', marginTop: 6 }}
                  onMouseEnter={e => { e.target.style.background = '#d9ba88'; e.target.style.transform = 'translateY(-1px)' }}
                  onMouseLeave={e => { e.target.style.background = C.gold; e.target.style.transform = 'none' }}>
                  RESERVAR EXPERIENCIA →
                </button>
              </form>
            )}
          </FadeIn>

          {/* HORARIOS + MAPA */}
          <FadeIn dir="right" delay={0.12}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: '0.42em', color: C.gold, textTransform: 'uppercase', marginBottom: 18 }}>Horarios</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(32px, 3.5vw, 46px)', color: C.cream, fontWeight: 400, marginBottom: 32, lineHeight: 1.1 }}>
              ¿Cuándo nos visitás?
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginBottom: 48, border: '1px solid rgba(201,166,107,0.15)' }}>
              {HOURS.map(({ days, time }, i) => (
                <div key={days} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 24px', borderBottom: i < HOURS.length - 1 ? '1px solid rgba(201,166,107,0.1)' : 'none', background: i % 2 === 0 ? 'rgba(201,166,107,0.03)' : 'transparent' }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: C.muted }}>{days}</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: time.includes('reserva') ? 'rgba(245,241,234,0.4)' : C.cream, fontWeight: 500 }}>{time}</span>
                </div>
              ))}
            </div>

            <div style={{ overflow: 'hidden', border: '1px solid rgba(201,166,107,0.2)', marginBottom: 28 }}>
              <iframe
                title="Bodega Terra Lombarda en el mapa"
                src="https://maps.google.com/maps?q=Cubillos+4300+San+Rafael+Mendoza+Argentina&output=embed"
                width="100%" height="300" style={{ display: 'block', border: 0, filter: 'grayscale(50%) contrast(1.05) brightness(0.85)' }}
                allowFullScreen loading="lazy"
              />
            </div>

            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <a href="https://maps.google.com/?q=Cubillos+4300+Rama+Caida+San+Rafael+Mendoza" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <button style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: C.gold, background: 'transparent', border: `1.5px solid ${C.gold}`, padding: '12px 26px', cursor: 'pointer', transition: 'all 0.3s' }}
                  onMouseEnter={e => { e.target.style.background = C.gold; e.target.style.color = C.dark }}
                  onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = C.gold }}>
                  Cómo Llegar →
                </button>
              </a>
              <a href="https://wa.me/5492627000000" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <button style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: C.dark, background: '#25D366', border: 'none', padding: '12px 26px', cursor: 'pointer', transition: 'all 0.3s' }}
                  onMouseEnter={e => e.target.style.opacity = '0.85'}
                  onMouseLeave={e => e.target.style.opacity = '1'}>
                  WhatsApp
                </button>
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CÓMO LLEGAR */}
      <section style={{ background: '#0d0d0d', padding: '80px 32px' }}>
        <div style={{ maxWidth: 1380, margin: '0 auto' }}>
          <FadeUp style={{ textAlign: 'center', marginBottom: 60 }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: '0.42em', color: C.gold, textTransform: 'uppercase', marginBottom: 16 }}>Llegada</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(32px, 4vw, 48px)', color: C.cream, fontWeight: 400 }}>Cómo Llegar a la Bodega</h2>
          </FadeUp>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
            {[
              { icon: '🚗', title: 'En Auto', desc: 'Desde San Rafael ciudad: tomar Ruta 173 hacia Rama Caída. Cubillos 4300. Aproximadamente 20 minutos.' },
              { icon: '📍', title: 'GPS', desc: 'Bodega Terra Lombarda, Cubillos 4300, Rama Caída, San Rafael, Mendoza. Buscar por nombre en Google Maps.' },
              { icon: '🚌', title: 'Traslados', desc: 'Consultanos por traslados desde San Rafael o desde los principales hoteles de la zona.' },
              { icon: '📞', title: 'Dudas', desc: 'Si tenés alguna duda para llegar, escribinos por WhatsApp. Te mandamos la ubicación exacta.' },
            ].map(({ icon, title, desc }, i) => (
              <FadeUp key={title} delay={i * 0.07}>
                <div style={{ padding: '32px 26px', background: 'rgba(201,166,107,0.03)', border: '1px solid rgba(201,166,107,0.13)', height: '100%' }}>
                  <div style={{ fontSize: 26, marginBottom: 14 }}>{icon}</div>
                  <h4 style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: '0.24em', color: C.gold, textTransform: 'uppercase', marginBottom: 12 }}>{title}</h4>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: C.muted, lineHeight: 1.8 }}>{desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ padding: '80px 32px', textAlign: 'center', borderTop: '1px solid rgba(201,166,107,0.1)' }}>
        <FadeUp>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, color: C.gold, fontStyle: 'italic', marginBottom: 22, opacity: 0.9 }}>
            "El vino más rico es el que se toma<br />en el lugar donde nació."
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: C.muted, marginBottom: 38, lineHeight: 1.85 }}>
            Reserva tu visita y viví una experiencia que no vas a olvidar.
          </p>
          <a href="https://wa.me/5492627000000" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <button
              style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: C.dark, background: C.gold, border: 'none', padding: '17px 52px', cursor: 'pointer', transition: 'all 0.3s' }}
              onMouseEnter={e => { e.target.style.background = '#d9ba88'; e.target.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.target.style.background = C.gold; e.target.style.transform = 'none' }}>
              Reservar por WhatsApp
            </button>
          </a>
        </FadeUp>
      </section>
    </div>
  )
}
