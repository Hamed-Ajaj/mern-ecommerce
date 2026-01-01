import { create } from 'zustand'
import type { Product } from '@/types/product'

type CartStore = {
  cart: Product[]
  addToCart: (product: Product) => void
  clearCart: () => void
}

export const useCartStore = create<CartStore>((set) => ({
  cart: [],
  addToCart: (product) =>
    set((state) => ({
      cart: [...state.cart, product],
    })),
  clearCart: () => set({ cart: [] }),
}))
