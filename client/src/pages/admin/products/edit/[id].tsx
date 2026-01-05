import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const EditProduct = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    image_url: '',
  })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setFormData({
            title: data.product.title,
            description: data.product.description || '',
            price: String(data.product.price),
            image_url: data.product.image_url || '',
          })
        }
      })
      .finally(() => setLoading(false))
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
        }),
      })

      if (res.ok) {
        toast.success('Product updated successfully')
        navigate('/admin/products')
      } else {
        toast.error('Failed to update product')
      }
    } catch {
      toast.error('An error occurred')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-stone-900">
        Edit Product
      </h1>

      <form onSubmit={handleSubmit} className="mt-8 max-w-2xl space-y-6">
        <div>
          <label className="block text-sm font-medium text-stone-700">
            Title
          </label>
          <Input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            className="mt-2 bg-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700">
            Price
          </label>
          <Input
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
            className="mt-2 bg-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            rows={4}
            className="mt-2 w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700">
            Image URL
          </label>
          <Input
            type="url"
            value={formData.image_url}
            onChange={(e) =>
              setFormData({ ...formData, image_url: e.target.value })
            }
            className="mt-2 bg-white"
          />
        </div>

        <div className="flex gap-4">
          <Button type="submit" disabled={saving} className="rounded-full">
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/admin/products')}
            className="rounded-full "
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}

export default EditProduct
