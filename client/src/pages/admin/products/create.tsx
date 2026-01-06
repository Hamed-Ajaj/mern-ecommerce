import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { toast } from 'sonner'
import { createProductSchema } from '../../../schemas/product.schema'

const CreateProduct = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    image_url: '',
  })
  const [errors, setErrors] = useState<{
    title?: string
    description?: string
    price?: string
    image_url?: string
  }>({})
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const result = createProductSchema.safeParse(formData)
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors
      setErrors({
        title: fieldErrors.title?.[0],
        description: fieldErrors.description?.[0],
        price: fieldErrors.price?.[0],
        image_url: fieldErrors.image_url?.[0],
      })
      toast.error('Please fix the highlighted fields')
      return
    }

    setErrors({})
    setLoading(true)

    try {
      const res = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
        }),
      })

      if (res.status === 401) {
        toast.error('Please sign in to continue')
        return
      }

      if (res.status === 403) {
        toast.error('Admin access required')
        return
      }

      let data: { success?: boolean; message?: string } | null = null
      try {
        data = await res.json()
      } catch {
        data = null
      }

      if (res.ok && data?.success) {
        toast.success('Product created successfully')
        navigate('/admin/products')
      } else {
        toast.error(data?.message || 'Failed to create product')
      }
    } catch {
      toast.error('An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-stone-900">
        Create Product
      </h1>

      <form onSubmit={handleSubmit} className="mt-8 max-w-2xl space-y-6">
        <div>
          <label className="block text-sm font-medium text-stone-700">
            Title
          </label>
          <Input
            type="text"
            value={formData.title}
            onChange={(e) => {
              setFormData({ ...formData, title: e.target.value })
              if (errors.title) {
                setErrors((prev) => ({ ...prev, title: undefined }))
              }
            }}
            required
            className={`mt-2 bg-white ${errors.title ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
          />
          {errors.title && (
            <p className="mt-1 text-xs text-red-600">{errors.title}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700">
            Price
          </label>
          <Input
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => {
              setFormData({ ...formData, price: e.target.value })
              if (errors.price) {
                setErrors((prev) => ({ ...prev, price: undefined }))
              }
            }}
            required
            className={`mt-2 bg-white ${errors.price ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
          />
          {errors.price && (
            <p className="mt-1 text-xs text-red-600">{errors.price}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => {
              setFormData({ ...formData, description: e.target.value })
              if (errors.description) {
                setErrors((prev) => ({ ...prev, description: undefined }))
              }
            }}
            rows={4}
            className={`mt-2 w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 ${errors.description ? 'border-red-500 focus-visible:ring-red-500' : 'focus-visible:ring-stone-900'}`}
          />
          {errors.description && (
            <p className="mt-1 text-xs text-red-600">{errors.description}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700">
            Image URL
          </label>
          <Input
            type="url"
            value={formData.image_url}
            onChange={(e) => {
              setFormData({ ...formData, image_url: e.target.value })
              if (errors.image_url) {
                setErrors((prev) => ({ ...prev, image_url: undefined }))
              }
            }}
            className={`mt-2 bg-white ${errors.image_url ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
          />
          {errors.image_url && (
            <p className="mt-1 text-xs text-red-600">{errors.image_url}</p>
          )}
        </div>

        <div className="flex gap-4">
          <Button type="submit" disabled={loading} className="rounded-full">
            {loading ? 'Creating...' : 'Create Product'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/admin/products')}
            className="rounded-full"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CreateProduct
