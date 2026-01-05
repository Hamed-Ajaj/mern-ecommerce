import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '@/types/product'

type CartItem = Product & {
  quantity: number
}

type CartStore = {
  cart: CartItem[]
  hasHydrated: boolean
  setHasHydrated: (value: boolean) => void
  addToCart: (product: Product) => void
  increaseQuantity: (id: number) => void
  decreaseQuantity: (id: number) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cart: [],
      hasHydrated: false,
      setHasHydrated: (value) => set({ hasHydrated: value }),

      addToCart: (product) =>
        set((state) => {
          const existing = state.cart.find((p) => p.id === product.id)

          if (existing) {
            return {
              cart: state.cart.map((p) =>
                p.id === product.id
                  ? { ...p, quantity: p.quantity + 1 }
                  : p
              ),
            }
          }

          return {
            cart: [...state.cart, { ...product, quantity: 1 }],
          }
        }),

      increaseQuantity: (id) =>
        set((state) => ({
          cart: state.cart.map((p) =>
            p.id === id ? { ...p, quantity: p.quantity + 1 } : p
          ),
        })),

      decreaseQuantity: (id) =>
        set((state) => ({
          cart: state.cart
            .map((p) =>
              p.id === id ? { ...p, quantity: p.quantity - 1 } : p
            )
            .filter((p) => p.quantity > 0),
        })),

      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((p) => p.id !== id),
        })),

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'guest-cart', // localStorage key
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    }
  )
)
