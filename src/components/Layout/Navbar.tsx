import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { ShoppingCart, User, Menu, X, Search, Globe } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { useLang } from '../../context/LanguageContext'
import type { Session } from '../../lib/supabase'
import { supabase } from '../../lib/supabase'

interface NavbarProps { session: Session }

export default function Navbar({ session }: NavbarProps) {
  const { count, openCart } = useCart()
  const { lang, setLang, tr } = useLang()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const user = session.user

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/catalog?q=${encodeURIComponent(searchQuery.trim())}`)
      setMobileOpen(false)
    }
  }

  const isActive = (path: string) =>
    location.pathname === path
      ? 'text-yellow-300 font-semibold'
      : 'text-green-100 hover:text-white'

  const navLinks = [
    { to: '/', label: tr('home') },
    { to: '/catalog', label: tr('catalog') },
    { to: '/businesses', label: tr('businesses') },
  ]

  return (
    <nav className="bg-gradient-to-r from-green-900 to-green-700 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <span className="text-2xl">🛍️</span>
            <span className="text-yellow-300 font-bold text-xl hidden sm:block font-heading">
              Darr-Albaraka
            </span>
          </Link>

          {/* Search bar — desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={tr('search')}
                className="w-full pl-4 pr-10 py-2 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:bg-white/20 focus:border-white/40 text-sm transition"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white">
                <Search size={16} />
              </button>
            </div>
          </form>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(l => (
              <Link key={l.to} to={l.to} className={`text-sm transition ${isActive(l.to)}`}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 ml-4">
            {/* Language toggle */}
            <button
              onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
              className="hidden sm:flex items-center gap-1 text-green-100 hover:text-white text-xs px-2 py-1 rounded border border-white/20 hover:bg-white/10 transition"
            >
              <Globe size={12} />
              {lang.toUpperCase()}
            </button>

            {/* Cart */}
            <button
              onClick={openCart}
              className="relative p-2 text-green-100 hover:text-white transition"
              aria-label="Cart"
            >
              <ShoppingCart size={22} />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-400 text-green-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center leading-none">
                  {count > 9 ? '9+' : count}
                </span>
              )}
            </button>

            {/* Profile */}
            <Link to="/profile" className="hidden sm:flex items-center gap-2 p-1 rounded-full hover:bg-white/10 transition">
              {user.user_metadata?.avatar_url ? (
                <img
                  src={user.user_metadata.avatar_url}
                  alt="avatar"
                  className="w-8 h-8 rounded-full border-2 border-yellow-300 object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center">
                  <User size={16} className="text-green-900" />
                </div>
              )}
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(v => !v)}
              className="md:hidden p-2 text-green-100 hover:text-white"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-green-900 border-t border-green-700 px-4 pt-3 pb-4 space-y-3">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={tr('search')}
              className="w-full pl-4 pr-10 py-2 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none text-sm"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70">
              <Search size={16} />
            </button>
          </form>

          {navLinks.map(l => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setMobileOpen(false)}
              className={`block py-2 text-sm ${isActive(l.to)}`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/profile"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 py-2 text-sm text-green-100 hover:text-white"
          >
            <User size={16} /> {tr('profile')}
          </Link>
          <div className="flex items-center justify-between pt-2 border-t border-green-700">
            <button
              onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
              className="flex items-center gap-1 text-green-100 text-xs px-3 py-1 rounded border border-white/20"
            >
              <Globe size={12} /> {lang === 'fr' ? 'English' : 'Français'}
            </button>
            <button
              onClick={() => supabase.auth.signOut()}
              className="text-xs text-red-300 hover:text-red-200 py-1"
            >
              {tr('logout')}
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
