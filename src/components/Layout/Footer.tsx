import { Link } from 'react-router-dom'
import { useLang } from '../../context/LanguageContext'
import { Phone, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  const { tr } = useLang()
  return (
    <footer className="bg-green-950 text-green-100 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🛍️</span>
            <span className="text-yellow-300 font-bold text-lg font-heading">Darr-Albaraka</span>
          </div>
          <p className="text-sm text-green-300 leading-relaxed">{tr('footerDesc')}</p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">{tr('footerLinks')}</h3>
          <ul className="space-y-2 text-sm">
            {[
              { to: '/', label: tr('home') },
              { to: '/catalog', label: tr('catalog') },
              { to: '/businesses', label: tr('businesses') },
              { to: '/profile', label: tr('profile') },
            ].map(l => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-yellow-300 transition">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">{tr('footerContact')}</h3>
          <ul className="space-y-2 text-sm text-green-300">
            <li className="flex items-center gap-2"><Phone size={14} /><span>+221 77 797 50 34</span></li>
            <li className="flex items-center gap-2"><Mail size={14} /><span>contact@darr-albaraka.com</span></li>
            <li className="flex items-center gap-2"><MapPin size={14} /><span>Dakar, Sénégal</span></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-green-800 py-4 text-center text-xs text-green-400">
        {tr('footerRights')}
      </div>
    </footer>
  )
}
