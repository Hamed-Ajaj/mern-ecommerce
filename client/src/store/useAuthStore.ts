import { create } from 'zustand'

type User = {
  id?: number
  username: string
  email?: string
  role?: string
}

type AuthStore = {
  user: User | null
  setUser: (user: User | null) => void
  loading: boolean
  setLoading: (loading: boolean) => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  loading: true,
  setLoading: (loading) => set({ loading }),
}))
