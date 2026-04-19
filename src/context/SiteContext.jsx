import { createContext, useContext, useState, useCallback } from 'react'

// ─── Default data ─────────────────────────────────────────
export const DEFAULT_DATA = {
  info: {
    name:      'Je Suis Lacan',
    tagline:   'Bar · Bistró · Café · Almacén',
    address:   'Balcarce 749, San Telmo, CABA',
    phone:     '11 3123-1586',
    whatsapp:  '541131231586',
    instagram: 'jesuislacan',
    facebook:  '',
    hours: [
      { day: 'Martes a Domingo', time: '10:00 — 23:45' },
      { day: 'Lunes',            time: 'Cerrado' },
    ],
    mapsUrl: 'https://maps.google.com/?q=Balcarce+749+San+Telmo+Buenos+Aires',
  },

  images: {
    hero:    'https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=1800&q=85',
    about:   'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=900&q=80',
    music:   'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=1600&q=75',
    nosotros:'https://images.unsplash.com/photo-1601933513793-9b0a13c4bb28?w=1600&q=80',
    barrio:  'https://images.unsplash.com/photo-1543168256-418811576931?w=800&q=80',
  },

  promos: [
    { id: 'pr1', label: 'Café Doble + 2 Medialunas', price: '1850', visible: true },
    { id: 'pr2', label: 'Jugo + Tostado',             price: '3250', visible: true },
    { id: 'pr3', label: 'Licuado + Tostadas con dips',price: '3500', visible: true },
    { id: 'pr4', label: '3 Empanadas + Copa de Vino', price: '3600', visible: true },
  ],

  menu: {
    takeaway: {
      label: 'Take Away',
      items: [
        { id: 'ta1', name: 'Café con leche',   description: 'En vaso o taza grande, leche cremosa.',          price: '1400', badge: '', visible: true },
        { id: 'ta2', name: 'Cortado',           description: 'Espresso con un toque de leche.',               price: '1200', badge: '', visible: true },
        { id: 'ta3', name: 'Cappuccino',        description: 'Espresso, leche vaporizada y espuma.',           price: '1600', badge: '', visible: true },
        { id: 'ta4', name: 'Té / Infusiones',   description: 'Selección de bolsitas importadas.',              price: '1200', badge: '', visible: true },
        { id: 'ta5', name: 'Medialunas x2',     description: 'De manteca, recién horneadas.',                 price: '900',  badge: '', visible: true },
        { id: 'ta6', name: 'Tostado simple',    description: 'Jamón y queso en pan de miga.',                 price: '1800', badge: '', visible: true },
        { id: 'ta7', name: 'Tostado completo',  description: 'Jamón, queso, tomate y lechuga.',               price: '2200', badge: '', visible: true },
        { id: 'ta8', name: 'Empanada frita',    description: 'De carne cortada a cuchillo. Por unidad.',      price: '800',  badge: '', visible: true },
      ],
    },
    pasteleria: {
      label: 'Pastelería',
      items: [
        { id: 'pa1', name: 'Croissant de manteca', description: 'Elaborado en casa, hojaldrado.',                        price: '1400', badge: '', visible: true },
        { id: 'pa2', name: 'Pain au chocolat',      description: 'Masa hojaldrada con corazón de chocolate belga.',       price: '1600', badge: '', visible: true },
        { id: 'pa3', name: 'Chocotorta Lacan',      description: 'La versión de la casa: más oscura, más densa.',         price: '2400', badge: 'Estrella', visible: true },
        { id: 'pa4', name: 'Budín de limón',        description: 'Húmedo, glaseado con limón.',                           price: '1800', badge: '', visible: true },
        { id: 'pa5', name: 'Tarta de frutos rojos', description: 'Masa sablé, crema pastelera y frambuesas.',             price: '2600', badge: '', visible: true },
        { id: 'pa6', name: 'Alfajor artesanal',     description: 'Dulce de leche, coco y chocolate.',                    price: '1200', badge: '', visible: true },
      ],
    },
    desayunos: {
      label: 'Desayunos y Meriendas',
      items: [
        { id: 'de1', name: 'Desayuno Lacan',    description: 'Café con leche, 2 medialunas, jugo de naranja natural.', price: '2800', badge: '', visible: true },
        { id: 'de2', name: 'Desayuno Francés',  description: 'Café, croissant, manteca, mermelada casera.',            price: '3200', badge: '', visible: true },
        { id: 'de3', name: 'Merienda completa', description: 'Té o café, tostadas con 2 dips, fruta.',                price: '2600', badge: '', visible: true },
        { id: 'de4', name: 'Licuado + tostadas',description: 'Licuado de fruta de estación, 2 tostadas con dips.',    price: '3500', badge: '', visible: true },
        { id: 'de5', name: 'Jugo + tostado',    description: 'Jugo natural, tostado jamón y queso.',                   price: '3250', badge: '', visible: true },
        { id: 'de6', name: 'Yogur con granola', description: 'Yogur natural, granola artesanal, miel.',               price: '2200', badge: '', visible: true },
      ],
    },
    promos: {
      label: 'Promos',
      items: [
        { id: 'pr1', name: 'Café Doble + 2 Medialunas',     description: 'El clásico porteño de las mañanas.',            price: '1850', badge: '', visible: true },
        { id: 'pr2', name: 'Jugo + Tostado',                description: 'Jugo natural de naranja y tostado.',             price: '3250', badge: '', visible: true },
        { id: 'pr3', name: 'Licuado + Tostadas con dips',   description: 'Licuado de fruta, tostadas y dips de la casa.', price: '3500', badge: '', visible: true },
        { id: 'pr4', name: '3 Empanadas + Copa de vino',    description: 'Empanadas fritas y copa de Malbec Mendoza.',    price: '3600', badge: '', visible: true },
        { id: 'pr5', name: 'Happy Hour (18–20hs)',           description: 'Dos cervezas tiradas al precio de una.',        price: '2800', badge: '', visible: true },
        { id: 'pr6', name: 'Menú del mediodía',             description: 'Plato del día + bebida + postre.',              price: '4500', badge: '', visible: true },
      ],
    },
    especial: {
      label: 'Especial Lacan',
      items: [
        { id: 'es1', name: 'Picada Lacan',                description: 'Queso dambo, muzzarelitas, surimis, jamón crudo y aceitunas. Para dos que pican tres.', price: '7800', badge: 'Estrella', visible: true },
        { id: 'es2', name: "Soupe à l'Oignon",           description: 'La clásica sopa de cebolla francesa, gratinada con queso gruyère.',                    price: '3600', badge: 'Signature', visible: true },
        { id: 'es3', name: 'Milanesa Lacan para compartir',description: 'Dos milanesas a caballo con papas fritas. El plato de la casa.',                    price: '7800', badge: 'Para 2', visible: true },
        { id: 'es4', name: 'Tabla de quesos y fiambres', description: 'Selección de quesos maduros, salames, pickles y pan casero.',                          price: '6500', badge: '', visible: true },
        { id: 'es5', name: 'Bruschette del barrio',      description: 'Pan de campo tostado, tomate cherry, albahaca y aceite de oliva virgen.',              price: '3200', badge: '', visible: true },
        { id: 'es6', name: 'Tarta del día',              description: 'Tarta caliente de la temporada, según lo que llegó del mercado.',                     price: '2800', badge: '', visible: true },
      ],
    },
    bar: {
      label: 'Bar',
      items: [
        { id: 'ba1', name: 'Malbec copa',          description: 'Mendoza, uva Malbec. Robusto y frutal.',        price: '1800', badge: '', visible: true },
        { id: 'ba2', name: 'Torrontés copa',       description: 'Salta, aromático y fresco.',                   price: '1800', badge: '', visible: true },
        { id: 'ba3', name: 'Cerveza artesanal',    description: 'Rubia o roja, de producción local.',            price: '2200', badge: '', visible: true },
        { id: 'ba4', name: 'Cerveza importada',    description: 'Stella Artois, Heineken o Guinness.',           price: '2600', badge: '', visible: true },
        { id: 'ba5', name: 'Fernet con Coca',      description: 'El ritual porteño. Largo o corto.',             price: '2400', badge: '', visible: true },
        { id: 'ba6', name: 'Aperol Spritz',        description: 'Aperol, Prosecco, soda y naranja.',             price: '3200', badge: '', visible: true },
        { id: 'ba7', name: 'Botella Malbec',       description: 'Selección de la casa, Mendoza.',                price: '8500', badge: '', visible: true },
        { id: 'ba8', name: 'Agua mineral',         description: 'Con o sin gas, 500ml.',                        price: '900',  badge: '', visible: true },
      ],
    },
    almacen: {
      label: 'Almacén Natural',
      items: [
        { id: 'al1', name: 'Mermelada artesanal',       description: 'Damasco, frambuesa o higos. Frasco 250g.', price: '2800', badge: '', visible: true },
        { id: 'al2', name: 'Dulce de leche repostero',  description: 'Artesanal. Frasco 350g.',                  price: '3200', badge: '', visible: true },
        { id: 'al3', name: 'Aceite de oliva extra virgen',description: 'Cosecha propia, Mendoza. 250ml.',        price: '4500', badge: '', visible: true },
        { id: 'al4', name: 'Té orgánico seleccionado',  description: 'Caja x10 saquitos.',                      price: '2200', badge: '', visible: true },
        { id: 'al5', name: 'Café en grano',             description: 'Blend de la casa, 250g.',                 price: '3800', badge: '', visible: true },
        { id: 'al6', name: 'Granola artesanal',         description: 'Avena, miel, frutos secos. Bolsa 300g.',  price: '2600', badge: '', visible: true },
      ],
    },
  },

  gallery: [
    { id: 'g1',  src: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=900&q=80', title: 'Interior cálido, mesas de madera',        cat: 'Ambiente',   visible: true },
    { id: 'g2',  src: 'https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=900&q=80', title: 'Café en San Telmo, tarde porteña',         cat: 'Ambiente',   visible: true },
    { id: 'g3',  src: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=900&q=80',title: 'Café con leche recién hecho',            cat: 'Café',       visible: true },
    { id: 'g4',  src: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=900&q=80',title: 'Picada Lacan — quesos y fiambres',       cat: 'Comida',     visible: true },
    { id: 'g5',  src: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=900&q=80',  title: "Soupe à l'oignon gratinada",             cat: 'Comida',     visible: true },
    { id: 'g6',  src: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=900&q=80',title: 'Noche de jazz en vivo',                 cat: 'Música',     visible: true },
    { id: 'g7',  src: 'https://images.unsplash.com/photo-1543168256-418811576931?w=900&q=80',  title: 'Pasaje San Lorenzo, adoquines históricos',cat: 'Barrio',    visible: true },
    { id: 'g8',  src: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=900&q=80',title: 'Espresso con arte latte',               cat: 'Café',       visible: true },
    { id: 'g9',  src: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=900&q=80',  title: 'Milanesa Lacan para compartir',          cat: 'Comida',     visible: true },
    { id: 'g10', src: 'https://images.unsplash.com/photo-1601933513793-9b0a13c4bb28?w=900&q=80',title: 'Esquina de San Telmo al atardecer',     cat: 'Barrio',     visible: true },
    { id: 'g11', src: 'https://images.unsplash.com/photo-1464219222984-216ebffaaf85?w=900&q=80',title: 'Copa de Malbec, luz de tarde',          cat: 'Bar',        visible: true },
    { id: 'g12', src: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a318?w=900&q=80',title: 'Croissant de manteca artesanal',        cat: 'Pastelería', visible: true },
  ],
}

// ─── Context ──────────────────────────────────────────────
const SiteContext = createContext(null)
const KEY = 'jesuislacan_data'

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

  const updateInfo     = useCallback((info)    => persist({ ...data, info }),    [data, persist])
  const updateImages   = useCallback((images)  => persist({ ...data, images }),  [data, persist])
  const updateMenu     = useCallback((menu)    => persist({ ...data, menu }),    [data, persist])
  const updateGallery  = useCallback((gallery) => persist({ ...data, gallery }), [data, persist])
  const updatePromos   = useCallback((promos)  => persist({ ...data, promos }),  [data, persist])
  const resetAll       = useCallback(() => { localStorage.removeItem(KEY); setData(DEFAULT_DATA) }, [])

  // Expose update helpers that accept the full slice
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
