import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Button } from '../../../components/ui/button'
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../../../components/ui/alert-dialog'

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
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null)
  const [deleteOpen, setDeleteOpen] = useState(false)

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
    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      })
      if (res.status === 401) {
        toast.error('Please sign in to continue')
        return
      }
      if (res.status === 403) {
        toast.error('Admin access required')
        return
      }
      if (!res.ok) {
        toast.error('Failed to delete product')
        return
      }
      setProducts((prev) => prev.filter((p) => p.id !== id))
    } catch (error) {
      console.error('Failed to delete product:', error)
      toast.error('An error occurred while deleting the product')
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
                onClick={() => {
                  setDeleteTarget(product)
                  setDeleteOpen(true)
                }}
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
      <AlertDialog
        open={deleteOpen}
        onOpenChange={(open) => {
          setDeleteOpen(open)
          if (!open) {
            setDeleteTarget(null)
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete product?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete{' '}
              {deleteTarget ? `"${deleteTarget.title}"` : 'this product'}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 text-white hover:bg-red-700"
              onClick={() => {
                if (deleteTarget) {
                  handleDelete(deleteTarget.id)
                }
                setDeleteOpen(false)
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default AdminProducts
