import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { SiteProvider } from './context/SiteContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Historia from './pages/Nosotros'
import Experiencias from './pages/Menu'
import Galeria from './pages/Galeria'
import Contacto from './pages/Contacto'
import Vinos from './pages/TakeAway'
import Admin from './pages/Admin'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function PublicLayout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/"                element={<Home />} />
          <Route path="/experiencias"    element={<Experiencias />} />
          <Route path="/nuestra-historia" element={<Historia />} />
          <Route path="/galeria"         element={<Galeria />} />
          <Route path="/contacto"        element={<Contacto />} />
          <Route path="/vinos"           element={<Vinos />} />
          {/* legacy aliases */}
          <Route path="/nuestra-selva"   element={<Historia />} />
          <Route path="/nosotros"        element={<Historia />} />
          <Route path="/menu"            element={<Experiencias />} />
          <Route path="/takeaway"        element={<Vinos />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

function AppRoutes() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')
  if (isAdmin) return <Routes><Route path="/admin" element={<Admin />} /></Routes>
  return <PublicLayout />
}

export default function App() {
  return (
    <SiteProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </SiteProvider>
  )
}
