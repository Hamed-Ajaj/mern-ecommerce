import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Products from './pages/products'
import Login from './pages/login'
import Cart from './pages/cart'
import { useEffect } from 'react'
import { useAuthStore } from './store/useAuthStore'
import SignUpPage from './pages/sign-up'

function App() {
  const { setUser, setLoading } = useAuthStore()
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
  return (
    <main className="min-h-full bg-[#f8f4ef] text-stone-900">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </main>
  )
}

export default App
