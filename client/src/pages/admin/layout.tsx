import { Outlet, Link, useLocation } from 'react-router-dom'
import { cn } from '../../lib/utils'

const AdminLayout = () => {
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r border-black/10 bg-white/80 p-6">
        <Link
          to="/admin"
          className="mb-8 block font-display text-xl font-semibold text-stone-900"
        >
          Admin Panel
        </Link>

        <nav className="space-y-2">
          <Link
            to="/admin"
            className={cn(
              'block rounded-lg px-4 py-2 text-sm font-medium transition',
              isActive('/admin')
                ? 'bg-stone-900 text-white'
                : 'text-stone-600 hover:bg-stone-100'
            )}
          >
            Dashboard
          </Link>
          <Link
            to="/admin/products"
            className={cn(
              'block rounded-lg px-4 py-2 text-sm font-medium transition',
              isActive('/admin/products') ||
                location.pathname.startsWith('/admin/products/edit')
                ? 'bg-stone-900 text-white'
                : 'text-stone-600 hover:bg-stone-100'
            )}
          >
            Products
          </Link>
          <Link
            to="/admin/products/create"
            className={cn(
              'block rounded-lg px-4 py-2 text-sm font-medium transition',
              isActive('/admin/products/create')
                ? 'bg-stone-900 text-white'
                : 'text-stone-600 hover:bg-stone-100'
            )}
          >
            Create Product
          </Link>
          <Link
            to="/admin/users"
            className={cn(
              'block rounded-lg px-4 py-2 text-sm font-medium transition',
              isActive('/admin/users')
                ? 'bg-stone-900 text-white'
                : 'text-stone-600 hover:bg-stone-100'
            )}
          >
            Users
          </Link>
        </nav>
      </aside>
      <main className="flex-1 px-6 py-12">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout
