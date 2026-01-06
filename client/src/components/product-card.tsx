import type { Product } from '@/types/product'
import { useState } from 'react'
import { Card, CardContent, CardFooter } from './ui/card'
import { Button } from './ui/button'
import { useCartStore } from '@/store/useCartStore'
import { toast } from 'sonner'

const ProductCard = ({ product }: { product: Product }) => {
  const addToCart = useCartStore((state) => state.addToCart)
  const [imageLoaded, setImageLoaded] = useState(false)
  return (
    <Card
      key={product.id}
      className="group flex h-full flex-col gap-4 rounded-[24px] border-black/10 bg-white/80 py-5 shadow-[0_18px_40px_rgba(0,0,0,0.05)] transition hover:-translate-y-1"
    >
      <CardContent className="flex-1 px-5">
        <div className="relative mb-5 h-44 overflow-hidden rounded-2xl">
          {product.image_url ? (
            <div className="relative h-full w-full">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,0,0,0.08)_1px,_transparent_1px)] bg-[length:18px_18px] opacity-30" />
              <img
                src={product.image_url}
                alt={product.title}
                loading="lazy"
                onLoad={() => setImageLoaded(true)}
                className={`h-full w-full object-cover transition duration-500 ${imageLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-md'}`}
              />
            </div>
          ) : (
            <div className="relative h-full w-full bg-gradient-to-br from-[#e6d3b3] via-[#f6e2c5] to-[#f8f0e6]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,0,0,0.08)_1px,_transparent_1px)] bg-[length:18px_18px] opacity-30" />
              <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold uppercase tracking-[0.2em] text-stone-700/60">
                No image
              </span>
            </div>
          )}
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
      <CardFooter className="mt-auto px-5">
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
