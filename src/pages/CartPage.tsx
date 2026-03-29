import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Trash2, Plus, Minus, ShoppingBag, CreditCard, Banknote,
  CheckCircle, Smartphone, Loader2, AlertCircle
} from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useLang } from '../context/LanguageContext'
import { initiatePayTechPayment, buildPayTechParams, generateRefCommand } from '../lib/paytech'

const fmt = (n: number) => n.toLocaleString('fr-SN') + ' FCFA'

interface Form {
  fullName: string
  phone: string
  address: string
  city: string
  payment: 'cod' | 'paytech'
}

type Step = 'cart' | 'checkout' | 'success' | 'redirecting'

export default function CartPage() {
  const { items, removeItem, updateQty, total, clearCart } = useCart()
  const { tr, lang } = useLang()
  const navigate = useNavigate()

  const [step, setStep] = useState<Step>('cart')
  const [form, setForm] = useState<Form>({
    fullName: '', phone: '', address: '', city: '', payment: 'cod'
  })
  const [errors, setErrors] = useState<Partial<Form>>({})
  const [loading, setLoading] = useState(false)
  const [paymentError, setPaymentError] = useState<string | null>(null)

  const validate = (): boolean => {
    const e: Partial<Form> = {}
    if (!form.fullName.trim()) e.fullName = 'Requis'
    if (!form.phone.trim()) e.phone = 'Requis'
    if (!form.address.trim()) e.address = 'Requis'
    if (!form.city.trim()) e.city = 'Requis'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleOrder = async () => {
    if (!validate()) return
    setPaymentError(null)
    setLoading(true)

    try {
      if (form.payment === 'paytech') {
        // ——— Paiement en ligne via PayTech ———
        const orderRef = generateRefCommand()
        const appUrl = import.meta.env.VITE_APP_URL || window.location.origin

        const params = buildPayTechParams({
          orderRef,
          totalAmount: total,
          customerName: form.fullName,
          appUrl,
        })

        const response = await initiatePayTechPayment(params)

        if (response.success === 1 && response.redirect_url) {
          setStep('redirecting')
          // Rediriger vers PayTech (Wave / Orange Money / Carte)
          window.location.href = response.redirect_url
        } else {
          const errMsg = response.errors?.join(', ') || 'Erreur lors de l\'initialisation du paiement'
          setPaymentError(errMsg)
          setLoading(false)
        }
      } else {
        // ——— Paiement à la livraison ———
        await new Promise(r => setTimeout(r, 1200))
        clearCart()
        setStep('success')
        setLoading(false)
      }
    } catch (err: any) {
      setPaymentError(
        err.message || 'Une erreur est survenue. Veuillez réessayer.'
      )
      setLoading(false)
    }
  }

  // ── REDIRECTION EN COURS ──────────────────────────────────
  if (step === 'redirecting') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-12 max-w-md w-full text-center">
          <div className="w-16 h-16 border-4 border-green-700 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Redirection vers PayTech...</h2>
          <p className="text-gray-500 text-sm mb-6">
            Vous allez être redirigé vers la page de paiement sécurisé PayTech.
          </p>
          <div className="flex items-center justify-center gap-3 text-sm text-gray-400">
            <span>🌊 Wave</span>
            <span>·</span>
            <span>🟠 Orange Money</span>
            <span>·</span>
            <span>💳 Carte</span>
          </div>
        </div>
      </div>
    )
  }

  // ── COMMANDE RÉUSSIE (paiement à la livraison) ────────────
  if (step === 'success') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-12 max-w-md w-full text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold font-heading text-gray-900 mb-2">
            {tr('orderSuccess')}
          </h1>
          <p className="text-gray-500 mb-8">{tr('orderSuccessMsg')}</p>
          <div className="flex flex-col gap-3">
            <Link to="/" className="bg-green-700 hover:bg-green-800 text-white py-3 rounded-xl font-semibold transition">
              {tr('home')}
            </Link>
            <Link to="/catalog" className="border border-green-700 text-green-700 hover:bg-green-50 py-3 rounded-xl font-semibold transition">
              {tr('catalog')}
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // ── PANIER VIDE ───────────────────────────────────────────
  if (items.length === 0 && step === 'cart') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" strokeWidth={1} />
          <h2 className="text-xl font-bold text-gray-700 mb-2">{tr('cartEmpty')}</h2>
          <Link to="/catalog" className="inline-block mt-4 bg-green-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-800 transition">
            {tr('cartContinue')}
          </Link>
        </div>
      </div>
    )
  }

  // ── PAGE PRINCIPALE ───────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-900 to-green-700 text-white py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold font-heading">
            {step === 'cart' ? tr('cartTitle') : tr('checkoutTitle')}
          </h1>
          <div className="flex items-center gap-3 mt-3 text-sm">
            <span className={`flex items-center gap-1 ${step === 'cart' ? 'text-yellow-300 font-semibold' : 'text-green-300'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${step === 'cart' ? 'bg-yellow-400 text-green-900' : 'bg-green-500 text-white'}`}>1</span>
              {tr('cartTitle')}
            </span>
            <div className="flex-1 border-t border-white/20" />
            <span className={`flex items-center gap-1 ${step === 'checkout' ? 'text-yellow-300 font-semibold' : 'text-green-300'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${step === 'checkout' ? 'bg-yellow-400 text-green-900' : 'bg-white/20 text-white'}`}>2</span>
              {tr('checkoutTitle')}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-4">
            {step === 'cart' ? (
              <>
                {items.map(item => (
                  <div key={item.product.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex gap-4">
                    <Link to={`/product/${item.product.id}`}>
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        className="w-20 h-20 rounded-xl object-cover flex-shrink-0 hover:opacity-90 transition"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-800 text-sm line-clamp-2">{item.product.title}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">{item.product.seller}</p>
                      <p className="font-bold text-green-700 mt-1">{fmt(item.product.price)}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                          <button
                            onClick={() => updateQty(item.product.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQty(item.product.id, item.quantity + 1)}
                            disabled={item.quantity >= item.product.stock}
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40 transition"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <span className="text-xs text-gray-500">{fmt(item.product.price * item.quantity)}</span>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="ml-auto text-red-400 hover:text-red-600 transition p-1"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              /* Formulaire de livraison */
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
                <h2 className="font-bold text-gray-900 text-lg">{tr('deliveryInfo')}</h2>

                {([
                  { key: 'fullName', label: tr('fullName'), type: 'text', placeholder: 'Prénom Nom' },
                  { key: 'phone', label: tr('phone'), type: 'tel', placeholder: '+221 77 XXX XX XX' },
                  { key: 'address', label: tr('address'), type: 'text', placeholder: 'Rue, numéro...' },
                  { key: 'city', label: tr('city'), type: 'text', placeholder: 'Dakar' },
                ] as const).map(field => (
                  <div key={field.key}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={form[field.key]}
                      onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                      className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition ${errors[field.key] ? 'border-red-400' : 'border-gray-200'}`}
                    />
                    {errors[field.key] && (
                      <p className="text-xs text-red-500 mt-1">{errors[field.key]}</p>
                    )}
                  </div>
                ))}

                {/* Méthode de paiement */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    {tr('paymentMethod')}
                  </label>
                  <div className="space-y-3">

                    {/* Paiement à la livraison */}
                    <button
                      type="button"
                      onClick={() => setForm(f => ({ ...f, payment: 'cod' }))}
                      className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 text-sm font-medium transition ${
                        form.payment === 'cod'
                          ? 'border-green-600 bg-green-50 text-green-800'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      <Banknote size={22} className={form.payment === 'cod' ? 'text-green-600' : 'text-gray-400'} />
                      <div className="text-left">
                        <p className="font-semibold">{tr('cashOnDelivery')}</p>
                        <p className="text-xs text-gray-500 font-normal mt-0.5">Payez en espèces à la réception</p>
                      </div>
                    </button>

                    {/* Paiement en ligne PayTech */}
                    <button
                      type="button"
                      onClick={() => setForm(f => ({ ...f, payment: 'paytech' }))}
                      className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 text-sm font-medium transition ${
                        form.payment === 'paytech'
                          ? 'border-green-600 bg-green-50 text-green-800'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      <Smartphone size={22} className={form.payment === 'paytech' ? 'text-green-600' : 'text-gray-400'} />
                      <div className="text-left flex-1">
                        <p className="font-semibold">{tr('onlinePayment')}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">🌊 Wave</span>
                          <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-medium">🟠 Orange Money</span>
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">💳 Carte</span>
                        </div>
                      </div>
                      {form.payment === 'paytech' && (
                        <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded-full">Sécurisé</span>
                      )}
                    </button>

                  </div>

                  {/* Info PayTech */}
                  {form.payment === 'paytech' && (
                    <div className="mt-3 bg-blue-50 border border-blue-100 rounded-xl p-3 text-xs text-blue-700">
                      <p className="font-semibold mb-1">🔒 Paiement sécurisé via PayTech</p>
                      <p>Vous serez redirigé vers la plateforme PayTech pour choisir votre mode de paiement : Wave, Orange Money ou Carte bancaire.</p>
                    </div>
                  )}
                </div>

                {/* Erreur de paiement */}
                {paymentError && (
                  <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl p-3">
                    <AlertCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-red-600">{paymentError}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Récapitulatif commande */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sticky top-20">
              <h3 className="font-bold text-gray-900 mb-4">
                {lang === 'fr' ? 'Récapitulatif' : 'Order Summary'}
              </h3>
              <div className="space-y-2 mb-4 text-sm">
                {items.map(i => (
                  <div key={i.product.id} className="flex justify-between text-gray-600">
                    <span className="truncate max-w-[160px]">{i.product.title} ×{i.quantity}</span>
                    <span className="font-medium ml-2">{fmt(i.product.price * i.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-3 space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>{tr('subtotal')}</span>
                  <span>{fmt(total)}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>{tr('shipping')}</span>
                  <span className="font-medium">{tr('free')}</span>
                </div>
                <div className="flex justify-between font-bold text-base pt-2 border-t">
                  <span>{tr('total')}</span>
                  <span className="text-green-700">{fmt(total)}</span>
                </div>
              </div>

              {step === 'cart' ? (
                <button
                  onClick={() => setStep('checkout')}
                  className="w-full mt-4 bg-green-700 hover:bg-green-800 text-white py-3 rounded-xl font-semibold transition"
                >
                  {tr('checkout')} →
                </button>
              ) : (
                <div className="space-y-2 mt-4">
                  <button
                    onClick={handleOrder}
                    disabled={loading}
                    className="w-full bg-green-700 hover:bg-green-800 disabled:bg-green-400 text-white py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        {form.payment === 'paytech'
                          ? (lang === 'fr' ? 'Connexion à PayTech...' : 'Connecting to PayTech...')
                          : (lang === 'fr' ? 'En cours...' : 'Processing...')}
                      </>
                    ) : (
                      form.payment === 'paytech'
                        ? (lang === 'fr' ? '💳 Payer via PayTech' : '💳 Pay via PayTech')
                        : tr('placeOrder')
                    )}
                  </button>
                  <button
                    onClick={() => { setStep('cart'); setPaymentError(null) }}
                    className="w-full text-sm text-gray-500 hover:text-gray-700 py-1 transition"
                  >
                    ← {tr('cartTitle')}
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
