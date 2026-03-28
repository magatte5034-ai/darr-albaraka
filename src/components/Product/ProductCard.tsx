import { Link } from 'react-router-dom'
import { ShoppingCart, Star } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { useLang } from '../../context/LanguageContext'
import type { MockProduct } from '../../data/mockData'

interface Props {
  product: MockProduct
  lang: 'fr' | 'en'
}

const fmt = (n: number) => n.toLocaleString('fr-SN') + ' FCFA'

export default function ProductCard({ product, lang }: Props) {
  const { addItem } = useCart()
  const { tr } = useLang()

  const title = lang === 'en' ? product.titleEn : product.title

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      stock: product.stock,
      seller: product.seller,
    })
  }

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1 border border-gray-100">
        {/* Image */}
        <div className="relative overflow-hidden h-48">
          <img
            src={product.image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {product.badge && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {product.badge}
            </span>
          )}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="bg-white text-gray-700 text-xs font-semibold px-3 py-1 rounded-full">
                {tr('outOfStock')}
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="text-xs text-green-600 font-medium mb-1">{product.categoryName}</p>
          <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-1 leading-snug">{title}</h3>
          <p className="text-xs text-gray-400 mb-2">{product.seller}</p>

          {/* Stars */}
          <div className="flex items-center gap-1 mb-3">
            <div className="flex">
              {[1,2,3,4,5].map(i => (
                <Star
                  key={i}
                  size={11}
                  className={i <= Math.round(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'}
                />
              ))}
            </div>
            <span className="text-xs text-gray-400">({product.reviews})</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="font-bold text-green-700">{fmt(product.price)}</span>
            {product.compareAtPrice && (
              <span className="text-xs text-gray-400 line-through">{fmt(product.compareAtPrice)}</span>
            )}
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="w-full bg-green-700 hover:bg-green-800 disabled:bg-gray-200 disabled:text-gray-400 text-white py-2 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition"
          >
            <ShoppingCart size={14} />
            {product.stock === 0 ? tr('outOfStock') : tr('addToCart')}
          </button>
        </div>
      </div>
    </Link>
  )
}
