import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'
import type { Session } from './lib/supabase'

import { LanguageProvider } from './context/LanguageContext'
import { CartProvider } from './context/CartContext'

import AuthCallback from './pages/AuthCallback'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import CatalogPage from './pages/CatalogPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import BusinessesPage from './pages/BusinessesPage'
import ProfilePage from './pages/ProfilePage'
import PaymentCallbackPage from './pages/PaymentCallbackPage'

import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer'
import CartDrawer from './components/Cart/CartDrawer'

/** Wraps all authenticated pages with Navbar + Footer + CartDrawer */
function AppShell({ session, children }: { session: Session; children: React.ReactNode }) {
  return (
    <>
      <Navbar session={session} />
      <CartDrawer />
      <main>{children}</main>
      <Footer />
    </>
  )
}

function App() {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center gap-3">
          <span className="text-4xl">🛍️</span>
          <div className="w-8 h-8 border-4 border-green-700 border-t-transparent rounded-full animate-spin" />
          <p className="text-green-700 font-medium text-sm">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <LanguageProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/login" element={session ? <Navigate to="/" replace /> : <LoginPage />} />
            {/* PayTech payment callbacks — accessibles sans connexion */}
            <Route path="/payment/success" element={<PaymentCallbackPage type="success" />} />
            <Route path="/payment/cancel" element={<PaymentCallbackPage type="cancel" />} />

            {/* Protected routes */}
            {session ? (
              <>
                <Route path="/" element={<AppShell session={session}><HomePage session={session} /></AppShell>} />
                <Route path="/catalog" element={<AppShell session={session}><CatalogPage /></AppShell>} />
                <Route path="/product/:id" element={<AppShell session={session}><ProductDetailPage /></AppShell>} />
                <Route path="/cart" element={<AppShell session={session}><CartPage /></AppShell>} />
                <Route path="/businesses" element={<AppShell session={session}><BusinessesPage /></AppShell>} />
                <Route path="/profile" element={<AppShell session={session}><ProfilePage session={session} /></AppShell>} />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/login" replace />} />
            )}

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </LanguageProvider>
  )
}

export default App
