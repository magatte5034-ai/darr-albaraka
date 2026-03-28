import { useState } from 'react'
import { User, ShoppingBag, LogOut, ChevronRight, Package } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import { supabase } from '../lib/supabase'
import type { Session } from '../lib/supabase'

interface Props { session: Session }

type Tab = 'orders' | 'profile'

// Mock orders
const MOCK_ORDERS = [
  { id: 'ORD-001', date: '2026-03-20', status: 'delivered', total: 213000, items: 3, product: 'Samsung Galaxy A54 + Écouteurs JBL...' },
  { id: 'ORD-002', date: '2026-03-15', status: 'confirmed', total: 45000, items: 1, product: 'Boubou Grand Bazin Brodé' },
  { id: 'ORD-003', date: '2026-03-08', status: 'pending', total: 7500, items: 1, product: "Huile d'Arachide Bio 5L" },
]

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-blue-100 text-blue-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
}

const fmt = (n: number) => n.toLocaleString('fr-SN') + ' FCFA'

export default function ProfilePage({ session }: Props) {
  const { tr, lang } = useLang()
  const [tab, setTab] = useState<Tab>('orders')
  const user = session.user

  const statusLabel = (s: string) => {
    const map: Record<string, string> = {
      pending: tr('pending'), confirmed: tr('confirmed'),
      delivered: tr('delivered'), cancelled: tr('cancelled'),
    }
    return map[s] ?? s
  }

  const memberSince = new Date(user.created_at || Date.now()).toLocaleDateString(
    lang === 'fr' ? 'fr-SN' : 'en-US',
    { month: 'long', year: 'numeric' }
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-900 to-green-700 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto flex items-center gap-5">
          {user.user_metadata?.avatar_url ? (
            <img
              src={user.user_metadata.avatar_url}
              alt="avatar"
              className="w-20 h-20 rounded-full border-4 border-yellow-400 shadow-lg object-cover"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-yellow-400 border-4 border-yellow-300 flex items-center justify-center shadow-lg">
              <User size={32} className="text-green-900" />
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold font-heading">
              {user.user_metadata?.full_name || user.email}
            </h1>
            <p className="text-green-200 text-sm mt-1">{user.email}</p>
            <span className="inline-block mt-2 bg-yellow-400/20 text-yellow-300 text-xs font-semibold px-3 py-1 rounded-full">
              ✓ Google OAuth
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {([
                { id: 'orders', icon: <ShoppingBag size={18} />, label: tr('orders') },
                { id: 'profile', icon: <User size={18} />, label: tr('personalInfo') },
              ] as const).map(item => (
                <button
                  key={item.id}
                  onClick={() => setTab(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3.5 text-sm font-medium transition ${tab === item.id ? 'bg-green-50 text-green-800 border-l-4 border-green-700' : 'text-gray-600 hover:bg-gray-50 border-l-4 border-transparent'}`}
                >
                  <span className="flex items-center gap-2">{item.icon} {item.label}</span>
                  <ChevronRight size={14} className={tab === item.id ? 'text-green-600' : 'text-gray-400'} />
                </button>
              ))}
            </div>

            <button
              onClick={() => supabase.auth.signOut()}
              className="w-full flex items-center justify-center gap-2 bg-white border border-red-200 text-red-500 hover:bg-red-50 py-3 rounded-2xl text-sm font-medium transition shadow-sm"
            >
              <LogOut size={16} /> {tr('logout')}
            </button>
          </aside>

          {/* Main */}
          <main className="lg:col-span-2">
            {tab === 'orders' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
                  <ShoppingBag size={18} className="text-green-700" />
                  <h2 className="font-bold text-gray-900">{tr('orders')}</h2>
                  <span className="ml-auto bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">{MOCK_ORDERS.length}</span>
                </div>

                {MOCK_ORDERS.length === 0 ? (
                  <div className="flex flex-col items-center py-16 gap-4 text-gray-400">
                    <Package size={40} strokeWidth={1} />
                    <p className="text-sm">{tr('noOrders')}</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-50">
                    {MOCK_ORDERS.map(order => (
                      <div key={order.id} className="p-5 hover:bg-gray-50 transition">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div>
                            <span className="font-bold text-gray-900 text-sm">#{order.id}</span>
                            <p className="text-xs text-gray-500 mt-0.5">{order.date} · {order.items} article{order.items > 1 ? 's' : ''}</p>
                          </div>
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_COLORS[order.status]}`}>
                            {statusLabel(order.status)}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 mb-2 line-clamp-1">{order.product}</p>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-green-700 text-sm">{fmt(order.total)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {tab === 'profile' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
                  <User size={18} className="text-green-700" />
                  <h2 className="font-bold text-gray-900">{tr('personalInfo')}</h2>
                </div>
                <div className="p-5 space-y-4">
                  {[
                    { label: lang === 'fr' ? 'Nom complet' : 'Full Name', value: user.user_metadata?.full_name || '—' },
                    { label: tr('email'), value: user.email || '—' },
                    { label: lang === 'fr' ? 'Fournisseur' : 'Provider', value: 'Google OAuth' },
                    { label: lang === 'fr' ? 'ID Supabase' : 'Supabase ID', value: user.id.slice(0, 16) + '...' },
                    { label: tr('member'), value: memberSince },
                  ].map(row => (
                    <div key={row.label} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                      <span className="text-sm text-gray-500 font-medium">{row.label}</span>
                      <span className="text-sm text-gray-800 font-semibold">{row.value}</span>
                    </div>
                  ))}
                </div>
                <div className="px-5 pb-5">
                  <div className="bg-green-50 rounded-xl p-4 text-sm text-green-700">
                    <span className="font-semibold">✓ {lang === 'fr' ? 'Compte vérifié via Google' : 'Account verified via Google'}</span>
                    <p className="text-xs mt-1 text-green-600">
                      {lang === 'fr' ? 'Votre email est automatiquement vérifié.' : 'Your email is automatically verified.'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
