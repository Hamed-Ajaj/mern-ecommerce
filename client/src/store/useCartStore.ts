import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '@/types/product'

type CartItem = Product & {
  quantity: number
}

type CartStore = {
  cart: CartItem[]
  cartsByUser: Record<string, CartItem[]>
  activeUserKey: string
  hasHydrated: boolean
  setHasHydrated: (value: boolean) => void
  setActiveUserKey: (key: string) => void
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
      cartsByUser: {},
      activeUserKey: 'guest',
      hasHydrated: false,
      setHasHydrated: (value) => set({ hasHydrated: value }),
      setActiveUserKey: (key) =>
        set((state) => ({
          activeUserKey: key,
          cart: state.cartsByUser[key] || [],
        })),

      addToCart: (product) =>
        set((state) => {
          const existing = state.cart.find((p) => p.id === product.id)

          if (existing) {
            const cart = state.cart.map((p) =>
                p.id === product.id
                  ? { ...p, quantity: p.quantity + 1 }
                  : p
              )
            return {
              cart,
              cartsByUser: {
                ...state.cartsByUser,
                [state.activeUserKey]: cart,
              },
            }
          }

          const cart = [...state.cart, { ...product, quantity: 1 }]
          return {
            cart,
            cartsByUser: {
              ...state.cartsByUser,
              [state.activeUserKey]: cart,
            },
          }
        }),

      increaseQuantity: (id) =>
        set((state) => {
          const cart = state.cart.map((p) =>
            p.id === id ? { ...p, quantity: p.quantity + 1 } : p
          )
          return {
            cart,
            cartsByUser: {
              ...state.cartsByUser,
              [state.activeUserKey]: cart,
            },
          }
        }),

      decreaseQuantity: (id) =>
        set((state) => {
          const cart = state.cart
            .map((p) =>
              p.id === id ? { ...p, quantity: p.quantity - 1 } : p
            )
            .filter((p) => p.quantity > 0)
          return {
            cart,
            cartsByUser: {
              ...state.cartsByUser,
              [state.activeUserKey]: cart,
            },
          }
        }),

      removeFromCart: (id) =>
        set((state) => {
          const cart = state.cart.filter((p) => p.id !== id)
          return {
            cart,
            cartsByUser: {
              ...state.cartsByUser,
              [state.activeUserKey]: cart,
            },
          }
        }),

      clearCart: () =>
        set((state) => ({
          cart: [],
          cartsByUser: {
            ...state.cartsByUser,
            [state.activeUserKey]: [],
          },
        })),
    }),
    {
      name: 'cart-store',
      onRehydrateStorage: () => (state) => {
        if (!state) return
        state.setActiveUserKey(state.activeUserKey || 'guest')
        state.setHasHydrated(true)
      },
    }
  )
)
