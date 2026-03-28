import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { useLang } from '../../context/LanguageContext'

const fmt = (n: number) => n.toLocaleString('fr-SN') + ' FCFA'

export default function CartDrawer() {
  const { items, removeItem, updateQty, total, isOpen, closeCart } = useCart()
  const { tr } = useLang()

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b bg-green-900 text-white">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} />
            <h2 className="font-semibold text-lg">{tr('cartTitle')}</h2>
          </div>
          <button onClick={closeCart} className="hover:bg-white/10 p-1 rounded transition">
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-gray-400">
              <ShoppingBag size={48} strokeWidth={1} />
              <p className="text-sm">{tr('cartEmpty')}</p>
              <button
                onClick={closeCart}
                className="text-sm text-green-700 hover:underline"
              >
                {tr('cartContinue')}
              </button>
            </div>
          ) : (
            items.map(item => (
              <div key={item.product.id} className="flex gap-3 bg-gray-50 rounded-xl p-3">
                <img
                  src={item.product.image}
                  alt={item.product.title}
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{item.product.title}</p>
                  <p className="text-xs text-gray-500 mb-1">{item.product.seller}</p>
                  <p className="text-sm font-bold text-green-700">{fmt(item.product.price)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQty(item.product.id, item.quantity - 1)}
                      className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQty(item.product.id, item.quantity + 1)}
                      disabled={item.quantity >= item.product.stock}
                      className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition disabled:opacity-40"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.product.id)}
                  className="text-red-400 hover:text-red-600 self-start p-1 transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t p-4 space-y-3 bg-gray-50">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">{tr('subtotal')}</span>
              <span className="font-semibold">{fmt(total)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">{tr('shipping')}</span>
              <span className="text-green-600 font-medium">{tr('free')}</span>
            </div>
            <div className="flex justify-between font-bold text-base border-t pt-2">
              <span>{tr('total')}</span>
              <span className="text-green-700">{fmt(total)}</span>
            </div>
            <Link
              to="/cart"
              onClick={closeCart}
              className="block w-full bg-green-700 hover:bg-green-800 text-white text-center py-3 rounded-xl font-semibold transition"
            >
              {tr('checkout')}
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
