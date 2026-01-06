import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { Product } from '../types/product'
import ProductCard from '@/components/product-card'
import Loading from '@/components/loading'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const searchParam = searchParams.get('search') ?? ''
  const orderParam = searchParams.get('order') ?? 'desc'
  const sortParam = searchParams.get('sort') ?? 'newest'
  const [searchValue, setSearchValue] = useState(searchParam)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setSearchValue(searchParam)
  }, [searchParam])

  const fetchProducts = async (
    search: string,
    sort: string,
    order: string
  ) => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (search) params.set('search', search)
      if (sort) params.set('sort', sort)
      if (order) params.set('order', order)
      const query = params.toString() ? `?${params.toString()}` : ''
      const res = await fetch(`http://localhost:5000/api/products${query}`)
      const data = await res.json()
      if (res.ok) {
        setProducts(data.products)
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unexpected Error')
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts(searchParam, sortParam, orderParam)
  }, [searchParam, sortParam, orderParam])

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const next = searchValue.trim()
    const params: Record<string, string> = {
      sort: sortParam,
      order: orderParam,
    }
    if (next) {
      params.search = next
    }
    setSearchParams(params)
  }

  const handleSortChange = (value: string) => {
    const params: Record<string, string> = {
      sort: value,
      order: orderParam,
    }
    if (searchParam) {
      params.search = searchParam
    }
    setSearchParams(params)
  }

  const handleOrderChange = (value: string) => {
    const params: Record<string, string> = {
      sort: sortParam,
      order: value,
    }
    if (searchParam) {
      params.search = searchParam
    }
    setSearchParams(params)
  }

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
          <div className="flex flex-col gap-3 sm:items-end">
            <div className="rounded-full border border-black/10 bg-white px-5 py-2 text-xs uppercase tracking-[0.2em] text-stone-500">
              Limited drop
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Select value={sortParam} onValueChange={handleSortChange}>
                <SelectTrigger className="h-9 w-[160px] rounded-full border-black/10 bg-white text-xs uppercase tracking-[0.2em] text-stone-600">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price">Price</SelectItem>
                </SelectContent>
              </Select>
              <Select value={orderParam} onValueChange={handleOrderChange}>
                <SelectTrigger className="h-9 w-[140px] rounded-full border-black/10 bg-white text-xs uppercase tracking-[0.2em] text-stone-600">
                  <SelectValue placeholder="Order" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="desc">Descending</SelectItem>
                  <SelectItem value="asc">Ascending</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1.5"
            >
              <Input
                type="search"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="Search products"
                className="h-9 w-56 border-0 bg-transparent px-0 text-sm shadow-none focus-visible:ring-0"
              />
              <Button
                type="submit"
                variant="ghost"
                className="h-8 rounded-full px-3 text-xs font-semibold text-stone-600 hover:text-stone-900"
              >
                Search
              </Button>
            </form>
          </div>
        </div>
      </section>

      {loading ? (
        <section className="mx-auto max-w-6xl px-6 pb-24">
          <Loading label="Loading products" />
        </section>
      ) : (
        <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-24 sm:grid-cols-2 lg:grid-cols-3">
          {products?.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </section>
      )}
    </div>
  )
}

export default Products
