import type { Product } from '@/types/product'
import { Card, CardContent, CardFooter } from './ui/card'
import { Button } from './ui/button'
import { useCartStore } from '@/store/useCartStore'
import { toast } from 'sonner'

const ProductCard = ({ product }: { product: Product }) => {
  const addToCart = useCartStore((state) => state.addToCart)
  return (
    <Card
      key={product.id}
      className="group gap-4 rounded-[24px] border-black/10 bg-white/80 py-5 shadow-[0_18px_40px_rgba(0,0,0,0.05)] transition hover:-translate-y-1"
    >
      <CardContent className="px-5">
        <div className="relative mb-5 h-44 overflow-hidden rounded-2xl bg-gradient-to-br from-[#e6d3b3] via-[#f6e2c5] to-[#f8f0e6]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,0,0,0.08)_1px,_transparent_1px)] bg-[length:18px_18px] opacity-30" />
        </div>
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-display text-lg text-stone-900">
              {product.title}
            </h3>
            <p className="mt-2 text-xs text-stone-500">
              {product.description}
            </p>
          </div>
          <span className="text-sm font-semibold text-stone-800">
            ${product.price}
          </span>
        </div>
      </CardContent>
      <CardFooter className="px-5">
        <Button
          onClick={() => {
            addToCart(product)
            toast.success(`${product.title} added to your cart.`)
          }}
          className="w-full cursor-pointer rounded-full border border-black bg-black text-white transition group-hover:-translate-y-0.5"
        >
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  )
}
export default ProductCard
