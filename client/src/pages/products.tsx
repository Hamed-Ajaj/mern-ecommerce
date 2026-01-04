import { useEffect, useState } from 'react'
import type { Product } from '../types/product'
import ProductCard from '@/components/product-card'
import { toast } from 'sonner'

const Products = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const fetchProducts = async () => {
    try {
      setLoading(true)
      const res = await fetch("http://localhost:5000/api/products")
      const data = await res.json()
      if (res.ok) {
        setProducts(data.products)
        setLoading(false)
      }
      console.log(data.products)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unexpected Error")
      setLoading(false)
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

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
        {products?.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </section>
    </div>
  )
}

export default Products
