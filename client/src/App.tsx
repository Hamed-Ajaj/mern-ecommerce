import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Products from './pages/products'
import Login from './pages/auth/login'
import Cart from './pages/cart'
import { useEffect } from 'react'
import { useAuthStore } from './store/useAuthStore'
import SignUpPage from './pages/auth/sign-up'
import Footer from './components/footer'
import GuestGuard from './components/guards/guest-guard'
import AuthGuard from './components/guards/auth-guard'
import ProfilePage from './pages/auth/profile'

function App() {
  const { user, setUser, setLoading } = useAuthStore()
  useEffect(() => {
    fetch("http://localhost:5000/api/auth/me", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error()
        return res.json()
      })
      .then((user) => {
        setUser(user)
      })
      .catch(() => {
        setUser(null)
      })
      .finally(() => {
        setLoading(false) // 🔑 auth resolved
      })
  }, [])
  console.log("user", user)

  return (
    <main className="flex min-h-screen flex-col bg-[#f8f4ef] text-stone-900">
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={<GuestGuard><Login /></GuestGuard>} />
          <Route path="/sign-up" element={<GuestGuard><SignUpPage /></GuestGuard>} />
          <Route path="/cart" element={<AuthGuard><Cart /></AuthGuard>} />
          <Route path="/profile" element={<AuthGuard><ProfilePage /></AuthGuard>} />
        </Routes>
      </div>
      <Footer />
    </main>
  )
}

export default App
