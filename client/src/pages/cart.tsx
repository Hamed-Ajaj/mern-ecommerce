import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { useCartStore } from '../store/useCartStore'

const Cart = () => {
  const cart = useCartStore((state) => state.cart)
  const clearCart = useCartStore((state) => state.clearCart)

  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-stone-500">
            Cart
          </p>
          <h1 className="font-display mt-3 text-4xl text-stone-900">
            Your selections
          </h1>
          <p className="mt-2 text-sm text-stone-600">
            {cart.length > 0
              ? `You have ${cart.length} item${cart.length > 1 ? 's' : ''} ready.`
              : 'Your cart is quiet for now.'}
          </p>
        </div>
        <Button
          asChild
          className="rounded-full border border-black bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5"
        >
          <Link to="/products">Browse products</Link>
        </Button>
      </div>

      {cart.length === 0 ? (
        <div className="mt-12 rounded-[24px] border border-black/10 bg-white/80 p-8 text-center">
          <p className="text-sm text-stone-600">
            Start with our latest drop and build your list.
          </p>
        </div>
      ) : (
        <div className="mt-10 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-wrap items-center justify-between gap-4 rounded-[20px] border border-black/10 bg-white/80 px-5 py-4"
            >
              <div>
                <p className="font-display text-lg text-stone-900">
                  {item.title}
                </p>
                <p className="text-xs text-stone-500">{item.description}</p>
              </div>
              <span className="text-sm font-semibold text-stone-800">
                ${item.price}
              </span>
            </div>
          ))}
          <Button
            variant="outline"
            onClick={clearCart}
            className="rounded-full border-black/10 bg-white px-5 py-2.5 text-sm font-semibold text-stone-700 transition hover:border-black"
          >
            Clear cart
          </Button>
        </div>
      )}
    </div>
  )
}

export default Cart
