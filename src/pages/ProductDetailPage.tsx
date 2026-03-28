import { useParams, Link } from 'react-router-dom'
import { ShoppingCart, ArrowLeft, Star, MessageCircle, Shield, Truck, RotateCcw } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useLang } from '../context/LanguageContext'
import { PRODUCTS } from '../data/mockData'

const fmt = (n: number) => n.toLocaleString('fr-SN') + ' FCFA'

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { lang, tr } = useLang()
  const { addItem } = useCart()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  const product = PRODUCTS.find(p => p.id === id)

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-gray-400">
        <span className="text-5xl">🔍</span>
        <p>Produit introuvable</p>
        <Link to="/catalog" className="text-green-700 hover:underline text-sm">&larr; Retour au catalogue</Link>
      </div>
    )
  }

  const title = lang === 'en' ? product.titleEn : product.title
  const description = lang === 'en' ? product.descriptionEn : product.description

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      stock: product.stock,
      seller: product.seller,
    }, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const whatsappLink = `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER?.replace(/\D/g, '')}?text=${encodeURIComponent(`Bonjour, je suis intéressé par "${product.title}" - ${fmt(product.price)}`)}`

  const related = PRODUCTS.filter(p => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 3)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-green-700 transition">{tr('home')}</Link>
          <span>/</span>
          <Link to="/catalog" className="hover:text-green-700 transition">{tr('catalog')}</Link>
          <span>/</span>
          <span className="text-gray-800 font-medium truncate max-w-xs">{title}</span>
        </nav>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Image */}
            <div className="relative bg-gray-50">
              <img
                src={product.image}
                alt={title}
                className="w-full h-80 md:h-full object-cover"
                style={{ minHeight: '400px' }}
              />
              {product.badge && (
                <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {product.badge}
                </span>
              )}
              {product.compareAtPrice && (
                <span className="absolute top-4 right-4 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  -{Math.round((1 - product.price / product.compareAtPrice) * 100)}%
                </span>
              )}
            </div>

            {/* Info */}
            <div className="p-8 flex flex-col">
              <Link to="/catalog" className="flex items-center gap-1 text-green-600 text-sm mb-4 hover:underline w-fit">
                <ArrowLeft size={14} /> {tr('catalog')}
              </Link>

              <span className="text-sm text-green-600 font-medium mb-1">{product.categoryName}</span>
              <h1 className="text-2xl font-bold font-heading text-gray-900 mb-2">{title}</h1>
              <p className="text-sm text-gray-500 mb-4">Vendu par <span className="font-semibold text-gray-700">{product.seller}</span></p>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} size={16} className={i <= Math.round(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'} />
                  ))}
                </div>
                <span className="text-sm text-gray-600 font-medium">{product.rating}</span>
                <span className="text-sm text-gray-400">({product.reviews} avis)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-bold text-green-700">{fmt(product.price)}</span>
                {product.compareAtPrice && (
                  <span className="text-lg text-gray-400 line-through">{fmt(product.compareAtPrice)}</span>
                )}
              </div>

              {/* Stock */}
              <div className="flex items-center gap-2 mb-6">
                <div className={`w-2 h-2 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className={`text-sm font-medium ${product.stock > 0 ? 'text-green-700' : 'text-red-600'}`}>
                  {product.stock > 0 ? `${tr('inStock')} (${product.stock})` : tr('outOfStock')}
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed mb-6">{description}</p>

              {/* Quantity */}
              {product.stock > 0 && (
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-sm font-medium text-gray-700">{tr('quantity')}</span>
                  <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                    <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition text-lg">−</button>
                    <span className="w-10 text-center font-semibold text-sm">{qty}</span>
                    <button onClick={() => setQty(q => Math.min(product.stock, q + 1))} className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition text-lg">+</button>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 flex-wrap mt-auto pt-2">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition ${
                    added
                      ? 'bg-green-600 text-white'
                      : 'bg-green-700 hover:bg-green-800 text-white disabled:bg-gray-200 disabled:text-gray-400'
                  }`}
                >
                  <ShoppingCart size={18} />
                  {added ? (lang === 'fr' ? '✓ Ajouté !' : '✓ Added!') : tr('addToCart')}
                </button>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl border-2 border-green-700 text-green-700 hover:bg-green-50 font-semibold transition"
                >
                  <MessageCircle size={18} />
                  WhatsApp
                </a>
              </div>

              {/* Trust */}
              <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-gray-100">
                <div className="flex flex-col items-center gap-1 text-center">
                  <Shield size={18} className="text-green-600" />
                  <span className="text-xs text-gray-500">{lang === 'fr' ? 'Paiement sécurisé' : 'Secure payment'}</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-center">
                  <Truck size={18} className="text-green-600" />
                  <span className="text-xs text-gray-500">{lang === 'fr' ? 'Livraison rapide' : 'Fast delivery'}</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-center">
                  <RotateCcw size={18} className="text-green-600" />
                  <span className="text-xs text-gray-500">{lang === 'fr' ? 'Retour facile' : 'Easy returns'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold font-heading text-gray-900 mb-6">
              {lang === 'fr' ? 'Produits similaires' : 'Similar products'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map(p => {
                const pTitle = lang === 'en' ? p.titleEn : p.title
                return (
                  <Link key={p.id} to={`/product/${p.id}`} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition border border-gray-100 flex gap-4 p-3">
                    <img src={p.image} alt={pTitle} className="w-20 h-20 rounded-xl object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0 py-1">
                      <p className="text-sm font-semibold text-gray-800 line-clamp-2 leading-snug">{pTitle}</p>
                      <p className="text-sm font-bold text-green-700 mt-1">{fmt(p.price)}</p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
