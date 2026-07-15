import { Routes, Route, Navigate } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import WhatsAppButton from './components/WhatsAppButton'
import { LocalBusinessSchema } from './components/StructuredData'

import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Booking from './pages/Booking'
import FAQ from './pages/FAQ'
import Contact from './pages/Contact'
import AdminLogin from './pages/admin/Login'
import AdminDashboard from './pages/admin/Dashboard'

function PublicLayout({ children }) {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <LocalBusinessSchema />
      <Routes>
        {/* Admin routes — no public layout */}
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* Public routes */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
        <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
        <Route path="/booking" element={<PublicLayout><Booking /></PublicLayout>} />
        <Route path="/faq" element={<PublicLayout><FAQ /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
      </Routes>
    </LanguageProvider>
  )
}
