import { useMemo } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { useCartStore } from '../store/useCartStore'
import type { Product } from '../types/product'
import ProductCard from '@/components/product-card'

const Products = () => {
  const products = useMemo<Product[]>(
    () => [
      {
        id: 1,
        title: 'Amber Weave Throw',
        description: 'Lightweight knit with warm tonal texture.',
        price: 68,
      },
      {
        id: 2,
        title: 'Marble Ridge Tray',
        description: 'A sculpted tray for daily rituals.',
        price: 54,
      },
      {
        id: 3,
        title: 'Frosted Glass Vase',
        description: 'Matte finish with a smoke-grey tint.',
        price: 72,
      },
      {
        id: 4,
        title: 'Linen Halo Cushion',
        description: 'Soft neutral cushion with hand-tied edge.',
        price: 48,
      },
      {
        id: 5,
        title: 'Oakline Candle Pair',
        description: 'Warm cedar blend in amber glass.',
        price: 32,
      },
      {
        id: 6,
        title: 'Woven Arc Basket',
        description: 'Structured storage with woven depth.',
        price: 59,
      },
    ],
    [],
  )

  return (
    <div className="relative overflow-hidden">
      <section className="relative mx-auto max-w-6xl px-6 pb-16 pt-12">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-stone-500">
              Products
            </p>
            <h1 className="font-display mt-3 text-4xl text-stone-900">
              The new collection
            </h1>
            <p className="mt-3 max-w-xl text-sm text-stone-600">
              A curated selection of tactile essentials, crafted to bring depth
              and warmth to modern spaces.
            </p>
          </div>
          <div className="rounded-full border border-black/10 bg-white px-5 py-2 text-xs uppercase tracking-[0.2em] text-stone-500">
            Limited drop
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-24 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard product={product} />
        ))}
      </section>
    </div>
  )
}

export default Products
