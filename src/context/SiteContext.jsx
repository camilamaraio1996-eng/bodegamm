import { createContext, useContext, useState, useCallback } from 'react'

export const DEFAULT_DATA = {
  info: {
    name:      'BODEGA TERRA LOMBARDA',
    tagline:   'Bodega Boutique · Viñedos · Experiencias',
    address:   'Cubillos 4300 (Ruta 173), Rama Caída',
    city:      'San Rafael, Mendoza',
    phone:     '2627 000-000',
    whatsapp:  '5492627000000',
    instagram: 'bodegaterralombarda',
    facebook:  'bodegaterralombarda',
    spotify:   'playlist/37i9dQZF1DX8NTLI2TtZa6',
    hours: [
      { day: 'Viernes y Sábado', time: '13:00 — 21:00' },
      { day: 'Domingo',          time: '13:00 — 19:00' },
      { day: 'Lunes a Jueves',   time: 'Con reserva previa' },
    ],
    mapsUrl: 'https://maps.google.com/?q=Cubillos+4300+Rama+Caida+San+Rafael+Mendoza',
  },

  images: {
    hero:      'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1800&q=90',
    about:     'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=900&q=85',
    historia:  'https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=85',
    eventos:   'https://images.unsplash.com/photo-1543730435960-55bc92d5a1a0?w=1600&q=80',
    cta:       'https://images.unsplash.com/photo-1586370434639-0fe43b2d32e6?w=1600&q=80',
  },

  promos: [
    { id: 'pr1', label: 'Experiencia CATA (por persona)',    price: 'Consultar', visible: true },
    { id: 'pr2', label: 'Wine House (2 personas)',           price: 'Consultar', visible: true },
    { id: 'pr3', label: 'Vinos y Fuegos (grupo mínimo 4)',  price: 'Consultar', visible: true },
    { id: 'pr4', label: 'Eventos Privados a medida',         price: 'Consultar', visible: true },
  ],

  menu: {
    cata: {
      label: 'Experiencia Cata',
      items: [
        { id: 'ct1', name: 'Recorrido por Bodega Histórica', description: 'Visita guiada por nuestra bodega centenaria, descubriendo los secretos de la producción artesanal.', price: '', badge: 'Incluido', visible: true },
        { id: 'ct2', name: 'Visita al Viñedo',               description: 'Caminata entre los viñedos de la finca, conociendo las variedades y el ciclo de la vid.', price: '', badge: 'Incluido', visible: true },
        { id: 'ct3', name: 'Degustación Guiada de 3 Vinos', description: 'Selección de tintos, blancos y rosados de producción propia, con maridaje explicado por el enólogo.', price: '', badge: 'Incluido', visible: true },
      ],
    },
    wineHouse: {
      label: 'Wine House',
      items: [
        { id: 'wh1', name: 'Recorrido por Bodega',        description: 'Visita completa a las instalaciones y procesos de elaboración.', price: '', badge: 'Incluido', visible: true },
        { id: 'wh2', name: 'Visita al Viñedo',            description: 'Recorrido entre los viñedos de la finca con explicación técnica.', price: '', badge: 'Incluido', visible: true },
        { id: 'wh3', name: 'Degustación de 4 Vinos',     description: 'Selección premium de vinos de autor, maridados con especialidad.', price: '', badge: 'Incluido', visible: true },
        { id: 'wh4', name: 'Tabla de Fiambres y Quesos', description: 'Tabla artesanal con quesos regionales, fiambres de calidad y dips caseros.', price: '', badge: 'Incluido', visible: true },
        { id: 'wh5', name: 'Panificados Caseros',         description: 'Pan artesanal horneado en la bodega, elaborado con receta propia.', price: '', badge: 'Incluido', visible: true },
        { id: 'wh6', name: 'Postre',                      description: 'Postre de temporada elaborado con ingredientes locales.', price: '', badge: 'Incluido', visible: true },
      ],
    },
    fuegos: {
      label: 'Vinos y Fuegos',
      items: [
        { id: 'vf1',  name: 'Recorrido por Bodega y Viñedo', description: 'Experiencia completa de visita a las instalaciones históricas y los viñedos.', price: '', badge: 'Incluido', visible: true },
        { id: 'vf2',  name: 'Selección de Quesos y Fiambres', description: 'Entrada con quesos artesanales y fiambres seleccionados.', price: '', badge: 'Incluido', visible: true },
        { id: 'vf3',  name: 'Empanadas Fritas',              description: 'Empanadas criollas fritas con rellenos de la región.', price: '', badge: 'Incluido', visible: true },
        { id: 'vf4',  name: 'Asado Completo',                description: 'Vacío, costillas, chorizos, morcillas y matambre al asador.', price: '', badge: 'Incluido', visible: true },
        { id: 'vf5',  name: 'Ensaladas',                     description: 'Ensaladas frescas de estación.', price: '', badge: 'Incluido', visible: true },
        { id: 'vf6',  name: 'Flan Casero',                   description: 'Flan cremoso de la casa con crema y dulce de leche artesanal.', price: '', badge: 'Incluido', visible: true },
        { id: 'vf7',  name: 'Maridaje con Vinos de la Bodega', description: 'Selección ilimitada de vinos de producción propia durante toda la experiencia.', price: '', badge: 'Incluido', visible: true },
      ],
    },
    vinos: {
      label: 'Nuestros Vinos',
      items: [
        { id: 'vi1', name: 'Malbec Reserva',      description: 'Gran expresión del terroir de Rama Caída. Notas a frutas negras, vainilla y especias. 14 meses en roble francés.',  price: 'Consultar', badge: 'Estrella', visible: true },
        { id: 'vi2', name: 'Cabernet Sauvignon',  description: 'Carácter firme y elegante. Taninos bien integrados con aromas a grosella, cedro y tierra húmeda.',                   price: 'Consultar', badge: '', visible: true },
        { id: 'vi3', name: 'Blend de Autor',      description: 'Ensamblaje de Malbec, Cabernet y Bonarda. Nuestra expresión más personal. Producción limitada.',                     price: 'Consultar', badge: 'Premium', visible: true },
        { id: 'vi4', name: 'Chardonnay Barrel',   description: 'Fermentado y envejecido en barrica. Notas a manteca, durazno y vainilla con acidez refrescante.',                   price: 'Consultar', badge: '', visible: true },
        { id: 'vi5', name: 'Rosé de Malbec',      description: 'Fresco y elegante. Aromas a frutilla, rosa y cítricos. Ideal para los atardeceres en el viñedo.',                   price: 'Consultar', badge: '', visible: true },
        { id: 'vi6', name: 'Torrontés Premium',   description: 'Emblema de la uva argentina. Floral, aromático, con notas a jazmín, durazno y lima.',                              price: 'Consultar', badge: '', visible: true },
      ],
    },
  },

  gallery: [
    { id: 'g1',  src: '/foto-vinedo-sunset.jpg',    title: 'Viñedos al atardecer',        cat: 'Viñedos',       visible: true },
    { id: 'g2',  src: '/foto-evento-vinedo.jpg',    title: 'Atardecer en el viñedo',      cat: 'Viñedos',       visible: true },
    { id: 'g3',  src: '/foto-bodega-interior.jpg',  title: 'Interior de la bodega',       cat: 'Bodega',        visible: true },
    { id: 'g4',  src: '/foto-bottle.jpg',           title: 'Vino Terra Lombarda',         cat: 'Bodega',        visible: true },
    { id: 'g5',  src: '/foto-noche-cena.jpg',       title: 'Noche en la bodega',          cat: 'Eventos',       visible: true },
    { id: 'g6',  src: '/foto-noche-luna.jpg',       title: 'Cena bajo la luna',           cat: 'Eventos',       visible: true },
    { id: 'g7',  src: '/foto-sunset-cena.jpg',      title: 'Cena al atardecer',           cat: 'Eventos',       visible: true },
    { id: 'g8',  src: '/foto-cata.jpg',             title: 'Degustación y maridaje',      cat: 'Experiencias',  visible: true },
    { id: 'g9',  src: '/foto-asado.jpg',            title: 'Asado en la finca',           cat: 'Gastronomía',   visible: true },
    { id: 'g10', src: '/foto-cata.jpg',             title: 'Tabla de quesos y fiambres',  cat: 'Gastronomía',   visible: true },
    { id: 'g11', src: '/foto-vinedo-sunset.jpg',    title: 'Atardecer mendocino',         cat: 'Viñedos',       visible: true },
    { id: 'g12', src: '/foto-bodega-interior.jpg',  title: 'Recorrido por la bodega',     cat: 'Experiencias',  visible: true },
    { id: 'g13', src: '/foto-bottle.jpg',           title: 'Malbec de autor 2024',        cat: 'Vinos',         visible: true },
    { id: 'g14', src: '/foto-sunset-cena.jpg',      title: 'Vinos y viñedo',              cat: 'Vinos',         visible: true },
  ],
}

const SiteContext = createContext(null)
const KEY = 'terralombarda_data'

function load() {
  try { const r = localStorage.getItem(KEY); return r ? JSON.parse(r) : null } catch { return null }
}

function deepMerge(base, over) {
  const r = { ...base }
  for (const k of Object.keys(over)) {
    if (over[k] !== null && typeof over[k] === 'object' && !Array.isArray(over[k])) {
      r[k] = deepMerge(base[k] || {}, over[k])
    } else {
      r[k] = over[k]
    }
  }
  return r
}

export function SiteProvider({ children }) {
  const [data, setData] = useState(() => {
    const saved = load()
    return saved ? deepMerge(DEFAULT_DATA, saved) : DEFAULT_DATA
  })
  const [toastVisible, setToastVisible] = useState(false)

  const persist = useCallback((next) => {
    setData(next)
    localStorage.setItem(KEY, JSON.stringify(next))
    setToastVisible(true)
    setTimeout(() => setToastVisible(false), 2400)
  }, [])

  const updateInfo    = useCallback((info)    => persist({ ...data, info }),    [data, persist])
  const updateImages  = useCallback((images)  => persist({ ...data, images }),  [data, persist])
  const updateMenu    = useCallback((menu)    => persist({ ...data, menu }),    [data, persist])
  const updateGallery = useCallback((gallery) => persist({ ...data, gallery }), [data, persist])
  const updatePromos  = useCallback((promos)  => persist({ ...data, promos }),  [data, persist])
  const resetAll      = useCallback(() => { localStorage.removeItem(KEY); setData(DEFAULT_DATA) }, [])

  const save = { updateInfo, updateImages, updateMenu, updateGallery, updatePromos, resetAll }

  return (
    <SiteContext.Provider value={{ data, ...save, toastVisible }}>
      {children}
    </SiteContext.Provider>
  )
}

export function useSite() {
  return useContext(SiteContext)
}
