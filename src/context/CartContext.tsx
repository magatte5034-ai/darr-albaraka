import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export interface CartProduct {
  id: string
  title: string
  price: number
  image: string
  stock: number
  seller: string
}

export interface CartItem {
  product: CartProduct
  quantity: number
}

interface CartCtx {
  items: CartItem[]
  addItem: (product: CartProduct, qty?: number) => void
  removeItem: (id: string) => void
  updateQty: (id: string, qty: number) => void
  clearCart: () => void
  total: number
  count: number
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
}

const CartContext = createContext<CartCtx>({} as CartCtx)

const STORAGE_KEY = 'da_cart'

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch { return [] }
  })
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const addItem = (product: CartProduct, qty = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.product.id === product.id)
      if (existing) {
        return prev.map(i =>
          i.product.id === product.id
            ? { ...i, quantity: Math.min(i.quantity + qty, product.stock) }
            : i
        )
      }
      return [...prev, { product, quantity: qty }]
    })
    setIsOpen(true)
  }

  const removeItem = (id: string) =>
    setItems(prev => prev.filter(i => i.product.id !== id))

  const updateQty = (id: string, qty: number) => {
    if (qty < 1) { removeItem(id); return }
    setItems(prev =>
      prev.map(i => i.product.id === id ? { ...i, quantity: qty } : i)
    )
  }

  const clearCart = () => setItems([])

  const total = items.reduce((s, i) => s + i.product.price * i.quantity, 0)
  const count = items.reduce((s, i) => s + i.quantity, 0)

  return (
    <CartContext.Provider value={{
      items, addItem, removeItem, updateQty, clearCart,
      total, count, isOpen, openCart: () => setIsOpen(true), closeCart: () => setIsOpen(false)
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
