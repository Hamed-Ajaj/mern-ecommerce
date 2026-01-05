import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    users: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [productsRes, ordersRes, usersRes] = await Promise.all([
          fetch('http://localhost:5000/api/products'),
          fetch('http://localhost:5000/api/orders'),
          fetch('http://localhost:5000/api/users'),
        ])

        const productsData = await productsRes.json()
        const ordersData = await ordersRes.json()
        const usersData = await usersRes.json()

        setStats({
          products: productsData.products?.length || 0,
          orders: ordersData.orders?.length || 0,
          users: usersData.users?.length || 0,
        })
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-stone-900">
        Admin Dashboard
      </h1>
      <p className="mt-2 text-stone-600">Welcome to the admin panel.</p>

      {loading ? (
        <div className="mt-8">Loading analytics...</div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-[24px] border border-black/10 bg-white/80 p-8 shadow-[0_18px_40px_rgba(0,0,0,0.05)]">
            <p className="text-sm uppercase tracking-[0.3em] text-stone-500">
              Products
            </p>
            <p className="mt-4 font-display text-5xl font-semibold text-stone-900">
              {stats.products}
            </p>
            <Button asChild variant="outline" className="mt-6 w-full">
              <Link to="/admin/products">Manage Products</Link>
            </Button>
          </div>

          <div className="rounded-[24px] border border-black/10 bg-white/80 p-8 shadow-[0_18px_40px_rgba(0,0,0,0.05)]">
            <p className="text-sm uppercase tracking-[0.3em] text-stone-500">
              Orders
            </p>
            <p className="mt-4 font-display text-5xl font-semibold text-stone-900">
              {stats.orders}
            </p>
            <Button asChild variant="outline" className="mt-6 w-full">
              <Link to="/admin/orders">View Orders</Link>
            </Button>
          </div>

          <div className="rounded-[24px] border border-black/10 bg-white/80 p-8 shadow-[0_18px_40px_rgba(0,0,0,0.05)]">
            <p className="text-sm uppercase tracking-[0.3em] text-stone-500">
              Users
            </p>
            <p className="mt-4 font-display text-5xl font-semibold text-stone-900">
              {stats.users}
            </p>
            <Button asChild variant="outline" className="mt-6 w-full">
              <Link to="/admin/users">Manage Users</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
