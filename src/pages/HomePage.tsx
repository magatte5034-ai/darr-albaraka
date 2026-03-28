import { Link } from 'react-router-dom'
import { ArrowRight, Star, ShieldCheck, Truck, Headphones } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import ProductCard from '../components/Product/ProductCard'
import { CATEGORIES, PRODUCTS, BUSINESSES } from '../data/mockData'
import type { Session } from '../lib/supabase'

interface Props { session: Session }

export default function HomePage({ session: _session }: Props) {
  const { lang, tr } = useLang()
  const featured = PRODUCTS.filter(p => p.featured)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-900 via-green-800 to-green-600 text-white">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/5 rounded-full" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-yellow-400/10 rounded-full" />
        <div className="relative max-w-7xl mx-auto px-4 py-20 sm:py-28 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 text-center md:text-left">
            <span className="inline-block bg-yellow-400/20 text-yellow-300 text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
              🌍 Dakar, Sénégal
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold font-heading leading-tight mb-4">
              {tr('heroTitle')}
            </h1>
            <p className="text-green-200 text-lg mb-8 max-w-lg">{tr('heroSubtitle')}</p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <Link to="/catalog" className="bg-yellow-400 hover:bg-yellow-300 text-green-900 font-bold px-6 py-3 rounded-full flex items-center gap-2 transition shadow-lg">
                {tr('heroBtn')} <ArrowRight size={18} />
              </Link>
              <Link to="/businesses" className="border-2 border-white/30 hover:bg-white/10 text-white font-semibold px-6 py-3 rounded-full transition">
                {tr('heroBtn2')}
              </Link>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-4 border-yellow-400/30 shadow-2xl">
                <img src="https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=600&q=80" alt="market" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -top-3 -right-3 bg-white text-green-900 text-xs font-bold px-3 py-1 rounded-full shadow-lg">✅ 542 vendeurs</div>
              <div className="absolute -bottom-3 -left-3 bg-yellow-400 text-green-900 text-xs font-bold px-3 py-1 rounded-full shadow-lg">🛍️ +10 000 produits</div>
            </div>
          </div>
        </div>
        <div className="bg-white/10 border-t border-white/10 py-4">
          <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-8 text-sm text-green-100">
            <div className="flex items-center gap-2"><ShieldCheck size={16} className="text-yellow-300" /> Paiement sécurisé</div>
            <div className="flex items-center gap-2"><Truck size={16} className="text-yellow-300" /> Livraison rapide</div>
            <div className="flex items-center gap-2"><Headphones size={16} className="text-yellow-300" /> Support 7j/7</div>
            <div className="flex items-center gap-2"><Star size={16} className="text-yellow-300 fill-yellow-300" /> Vendeurs vérifiés</div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-gray-900">{tr('categoriesTitle')}</h2>
            <p className="text-gray-500 mt-1">{tr('categoriesSubtitle')}</p>
          </div>
          <Link to="/catalog" className="text-green-700 hover:text-green-900 text-sm font-semibold flex items-center gap-1">
            {tr('seeAll')} <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {CATEGORIES.map(cat => (
            <Link key={cat.id} to={`/catalog?category=${cat.id}`} className="group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 aspect-square">
              <img src={cat.image} alt={lang === 'en' ? cat.nameEn : cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="text-2xl mb-1">{cat.icon}</div>
                <h3 className="text-white font-bold text-sm">{lang === 'en' ? cat.nameEn : cat.name}</h3>
                <p className="text-white/70 text-xs">{cat.count} articles</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="bg-white py-14">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-gray-900">{tr('featuredTitle')}</h2>
              <p className="text-gray-500 mt-1">{tr('featuredSubtitle')}</p>
            </div>
            <Link to="/catalog" className="text-green-700 hover:text-green-900 text-sm font-semibold flex items-center gap-1">
              {tr('seeAll')} <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {featured.map(p => <ProductCard key={p.id} product={p} lang={lang} />)}
          </div>
        </div>
      </section>

      {/* PARTNER BUSINESSES */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-gray-900">{tr('partnersTitle')}</h2>
            <p className="text-gray-500 mt-1">{tr('partnersSubtitle')}</p>
          </div>
          <Link to="/businesses" className="text-green-700 hover:text-green-900 text-sm font-semibold flex items-center gap-1">
            {tr('seeAll')} <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BUSINESSES.slice(0, 3).map(b => (
            <Link key={b.id} to="/businesses" className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100">
              <div className="h-36 overflow-hidden relative">
                <img src={b.cover} alt={b.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-4 flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden border border-gray-200 flex-shrink-0 bg-white">
                  <img src={b.logo} alt={b.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 text-sm truncate">{b.name}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{b.city} · {b.category}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star size={11} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-xs text-gray-600">{b.rating}</span>
                    <span className="text-xs text-gray-400">· {b.productCount} {tr('products')}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 pb-14">
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-green-900 font-heading">
              {lang === 'fr' ? 'Vendez sur Darr-Albaraka' : 'Sell on Darr-Albaraka'}
            </h2>
            <p className="text-green-800 mt-1">
              {lang === 'fr' ? 'Rejoignez nos 500+ vendeurs et touchez des milliers de clients' : 'Join our 500+ sellers and reach thousands of customers'}
            </p>
          </div>
          <Link to="/businesses" className="bg-green-900 hover:bg-green-800 text-white font-bold px-8 py-3 rounded-full whitespace-nowrap transition shadow-lg">
            {lang === 'fr' ? 'Devenir partenaire' : 'Become a partner'}
          </Link>
        </div>
      </section>
    </div>
  )
}
