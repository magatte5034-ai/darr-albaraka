import { useEffect } from 'react'
import { Link, useSearchParams, useLocation } from 'react-router-dom'
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'
import { useCart } from '../context/CartContext'

type CallbackType = 'success' | 'cancel'

export default function PaymentCallbackPage({ type }: { type: CallbackType }) {
  const [searchParams] = useSearchParams()
  const { clearCart } = useCart()
  const orderRef = searchParams.get('ref') || ''
  const location = useLocation()

  useEffect(() => {
    // Si paiement réussi, vider le panier
    if (type === 'success') {
      clearCart()
    }
  }, [type, clearCart])

  if (type === 'success') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-12 max-w-md w-full text-center">
          {/* Icône succès */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          <h1 className="text-2xl font-bold font-heading text-gray-900 mb-2">
            Paiement réussi !
          </h1>
          <p className="text-gray-500 mb-2">
            Votre commande a été confirmée et le paiement a bien été reçu.
          </p>

          {orderRef && (
            <div className="bg-green-50 rounded-xl px-4 py-3 mb-6 mt-4">
              <p className="text-xs text-green-600 font-medium">Référence de commande</p>
              <p className="text-sm font-bold text-green-800 font-mono">{orderRef}</p>
            </div>
          )}

          {/* Logos des méthodes de paiement */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="flex items-center gap-1 bg-blue-50 rounded-lg px-3 py-1.5">
              <span className="text-blue-600 font-bold text-sm">🌊 Wave</span>
            </div>
            <div className="flex items-center gap-1 bg-orange-50 rounded-lg px-3 py-1.5">
              <span className="text-orange-600 font-bold text-sm">🟠 Orange Money</span>
            </div>
          </div>

          <p className="text-xs text-gray-400 mb-8">
            Vous recevrez une confirmation par SMS ou WhatsApp très bientôt.
          </p>

          <div className="flex flex-col gap-3">
            <Link
              to="/"
              className="bg-green-700 hover:bg-green-800 text-white py-3 rounded-xl font-semibold transition"
            >
              Retour à l'accueil
            </Link>
            <Link
              to="/catalog"
              className="border border-green-700 text-green-700 hover:bg-green-50 py-3 rounded-xl font-semibold transition"
            >
              Continuer mes achats
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Paiement annulé
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-12 max-w-md w-full text-center">
        {/* Icône annulation */}
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-12 h-12 text-red-500" />
        </div>

        <h1 className="text-2xl font-bold font-heading text-gray-900 mb-2">
          Paiement annulé
        </h1>
        <p className="text-gray-500 mb-6">
          Vous avez annulé le paiement. Votre panier est toujours intact.
        </p>

        {orderRef && (
          <div className="bg-gray-50 rounded-xl px-4 py-3 mb-6">
            <p className="text-xs text-gray-500 font-medium">Référence</p>
            <p className="text-sm font-bold text-gray-700 font-mono">{orderRef}</p>
          </div>
        )}

        <div className="flex flex-col gap-3">
          <Link
            to="/cart"
            className="bg-green-700 hover:bg-green-800 text-white py-3 rounded-xl font-semibold transition"
          >
            Retourner au panier
          </Link>
          <Link
            to="/"
            className="border border-gray-300 text-gray-600 hover:bg-gray-50 py-3 rounded-xl font-semibold transition"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  )
}
