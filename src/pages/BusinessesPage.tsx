import { useState } from 'react'
import { Star, MapPin, Package, ExternalLink } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import { BUSINESSES } from '../data/mockData'

export default function BusinessesPage() {
  const { lang, tr } = useLang()
  const [selected, setSelected] = useState<string | null>(null)

  const business = BUSINESSES.find(b => b.id === selected)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-900 to-green-700 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold font-heading mb-3">{tr('businessesTitle')}</h1>
          <p className="text-green-200 text-lg">{tr('businessesSubtitle')}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BUSINESSES.map(b => {
            const desc = lang === 'en' ? b.descriptionEn : b.description
            return (
              <div
                key={b.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer"
                onClick={() => setSelected(b.id)}
              >
                {/* Cover */}
                <div className="h-44 overflow-hidden relative">
                  <img
                    src={b.cover}
                    alt={b.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/30 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                    <MapPin size={11} /> {b.city}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start gap-3 -mt-10 mb-4">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden border-4 border-white shadow-md flex-shrink-0 bg-white">
                      <img src={b.logo} alt={b.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="mt-8 min-w-0">
                      <h3 className="font-bold text-gray-900 text-base truncate">{b.name}</h3>
                      <span className="text-xs text-green-700 bg-green-50 px-2 py-0.5 rounded-full font-medium">{b.category}</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 line-clamp-2 mb-4">{desc}</p>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3 text-gray-500">
                      <div className="flex items-center gap-1">
                        <Star size={13} className="text-yellow-400 fill-yellow-400" />
                        <span className="font-semibold text-gray-700">{b.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Package size={13} />
                        <span>{b.productCount} {tr('products')}</span>
                      </div>
                    </div>
                    <button className="flex items-center gap-1 text-green-700 hover:text-green-900 font-semibold transition">
                      {tr('visitStore')} <ExternalLink size={13} />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Business detail modal */}
      {selected && business && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div
            className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* Cover */}
            <div className="h-48 relative">
              <img src={business.cover} alt={business.name} className="w-full h-full object-cover" />
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 w-8 h-8 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center transition"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-start gap-4 -mt-12 mb-6">
                <div className="w-20 h-20 rounded-2xl overflow-hidden border-4 border-white shadow-lg bg-white flex-shrink-0">
                  <img src={business.logo} alt={business.name} className="w-full h-full object-cover" />
                </div>
                <div className="mt-10">
                  <h2 className="text-xl font-bold text-gray-900 font-heading">{business.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-green-700 bg-green-50 px-2 py-0.5 rounded-full font-medium">{business.category}</span>
                    <span className="text-xs text-gray-500 flex items-center gap-1"><MapPin size={11} /> {business.city}</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                {lang === 'en' ? business.descriptionEn : business.description}
              </p>

              <div className="grid grid-cols-3 gap-4 bg-gray-50 rounded-2xl p-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-700">{business.rating}</div>
                  <div className="text-xs text-gray-500 mt-0.5 flex items-center justify-center gap-1">
                    <Star size={11} className="text-yellow-400 fill-yellow-400" /> Note
                  </div>
                </div>
                <div className="text-center border-x border-gray-200">
                  <div className="text-2xl font-bold text-green-700">{business.productCount}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{tr('products')}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-700">5★</div>
                  <div className="text-xs text-gray-500 mt-0.5">{lang === 'fr' ? 'Partenaire' : 'Partner'}</div>
                </div>
              </div>

              <div className="flex gap-3">
                <a
                  href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER?.replace(/\D/g, '')}?text=${encodeURIComponent(`Bonjour ${business.name}, je voudrais des informations...`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold text-center transition flex items-center justify-center gap-2"
                >
                  💬 WhatsApp
                </a>
                <button
                  onClick={() => setSelected(null)}
                  className="flex-1 border-2 border-green-700 text-green-700 hover:bg-green-50 py-3 rounded-xl font-semibold transition"
                >
                  {lang === 'fr' ? 'Fermer' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
