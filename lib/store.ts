import { create } from 'zustand'
import { Product } from './data'

export interface CartItem {
  product: Product
  quantity: number
}

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (product: Product) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, qty: number) => void
  clearCart: () => void
  toggleCart: () => void
  closeCart: () => void
  totalItems: () => number
  totalPrice: () => number
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,

  addItem: (product) => set(state => {
    const existing = state.items.find(i => i.product.id === product.id)
    if (existing) return { items: state.items.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i) }
    return { items: [...state.items, { product, quantity: 1 }] }
  }),

  removeItem: (id) => set(state => ({ items: state.items.filter(i => i.product.id !== id) })),

  updateQuantity: (id, qty) => {
    if (qty <= 0) { get().removeItem(id); return }
    set(state => ({ items: state.items.map(i => i.product.id === id ? { ...i, quantity: qty } : i) }))
  },

  clearCart: () => set({ items: [] }),
  toggleCart: () => set(state => ({ isOpen: !state.isOpen })),
  closeCart: () => set({ isOpen: false }),
  totalItems: () => get().items.reduce((s, i) => s + i.quantity, 0),
  totalPrice: () => get().items.reduce((s, i) => s + i.product.price * i.quantity, 0),
}))
