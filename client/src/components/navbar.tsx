import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useAuthStore } from '../store/useAuthStore'
import { useCartStore } from '../store/useCartStore'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { toast } from 'sonner'

const Navbar = () => {
  const cart = useCartStore((state) => state.cart)
  const { user, loading, setUser } = useAuthStore()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const searchParam = searchParams.get('search') ?? ''
  const [searchValue, setSearchValue] = useState(searchParam)

  useEffect(() => {
    setSearchValue(searchParam)
  }, [searchParam])

  const handleLogout = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      })
      if (res.ok) {
        setUser(null)
        toast.success('Logged out successfully')
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unexpected error')
    }
  }

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const next = searchValue.trim()
    const query = next ? `?search=${encodeURIComponent(next)}` : ''
    if (query.length > 0) {
      navigate(`/products${query}`)
    }
  }

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
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1.5"
          >
            <Input
              type="search"
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              placeholder="Search products"
              className="h-8 w-28 border-0 bg-transparent px-0 text-sm shadow-none focus-visible:ring-0 sm:w-40"
            />
            <Button
              type="submit"
              variant="ghost"
              className="h-8 rounded-full px-3 text-xs font-semibold text-stone-600 hover:text-stone-900"
            >
              Search
            </Button>
          </form>
          <Button asChild variant="outline" className="rounded-full border-black/10">
            <Link to="/products">Products</Link>
          </Button>
          <Button asChild className='relative cursor-pointer rounded-full' variant={'default'}>
            <Link to="/cart">Cart
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-1 grid h-5 w-5 place-items-center rounded-full bg-white text-[11px] font-semibold text-black">
                  {cart.length}
                </span>
              )}
            </Link>
          </Button>
          {loading ? (<>loading</>) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1.5 transition hover:border-black/30"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-stone-900 text-xs font-semibold text-white">
                    {initials || 'U'}
                  </span>
                  <span className="hidden text-sm sm:block">{user.username}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem asChild>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  variant="destructive"
                  onSelect={(event) => {
                    event.preventDefault()
                    handleLogout()
                  }}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
