import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Button } from '../../../components/ui/button'

type Product = {
  id: number
  title: string
  description?: string
  price: number
  image_url?: string
}

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProducts(data.products)
        }
      })
      .finally(() => setLoading(false))
  }, [])

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return

    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      })
      if (res.ok) {
        setProducts(products.filter((p) => p.id !== id))
      }
    } catch (error) {
      console.error('Failed to delete product:', error)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-semibold text-stone-900">
          Products
        </h1>
        <Button asChild className="rounded-full">
          <Link to="/admin/products/create">Create Product</Link>
        </Button>
      </div>

      <div className="mt-8 grid gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between rounded-xl border border-black/10 bg-white/80 p-4"
          >
            <div className="flex items-center gap-4">
              {product.image_url && (
                <img
                  src={product.image_url}
                  alt={product.title}
                  className="h-16 w-16 rounded-lg object-cover"
                />
              )}
              <div>
                <h3 className="font-semibold text-stone-900">{product.title}</h3>
                <p className="text-sm text-stone-600">${product.price}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button asChild variant="outline" size="sm">
                <Link to={`/admin/products/edit/${product.id}`}>Edit</Link>
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(product.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
        {products.length === 0 && (
          <div className="rounded-xl border border-black/10 bg-white/80 p-8 text-center">
            <p className="text-stone-600">No products found</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminProducts
