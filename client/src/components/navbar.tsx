import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { useAuthStore } from '../store/useAuthStore'
import { useCartStore } from '../store/useCartStore'

const Navbar = () => {
  const cart = useCartStore((state) => state.cart)
  const { user, loading } = useAuthStore()


  const initials = user?.username
    ?.split(' ')
    .map((chunk) => chunk[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <nav className="sticky top-0 z-50 border-b border-black/10 bg-[#f8f4ef]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white text-sm font-semibold">
            AE
          </span>
          <div className="leading-tight">
            <span className="block text-xs uppercase tracking-[0.35em] text-stone-500">
              Atelier
            </span>
            <span className="font-display text-lg">Aster & Ember</span>
          </div>
        </Link>

        <div className="flex items-center gap-4 text-sm">
          <Button asChild variant="outline" className="rounded-full border-black/10">
            <Link to="/products">Products</Link>
          </Button>
          {user && (
            <Button asChild className='relative cursor-pointer rounded-full' variant={'default'}>
              <Link to="/cart">Cart
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-1 grid h-5 w-5 place-items-center rounded-full bg-white text-[11px] font-semibold text-black">
                    {cart.length}
                  </span>
                )}
              </Link>
            </Button>
          )}
          {loading ? (<>loading</>) : user ? (
            <div className="flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1.5">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-stone-900 text-xs font-semibold text-white">
                {initials || 'U'}
              </span>
              <span className="hidden text-sm sm:block">{user.username}</span>
            </div>
          ) : (
            <Button
              asChild
              className="rounded-full border border-black bg-black px-4 py-2 text-white transition hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(0,0,0,0.15)]"
            >
              <Link to="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
