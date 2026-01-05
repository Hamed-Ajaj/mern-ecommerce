import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { toast } from 'sonner'

const CreateProduct = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    image_url: '',
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
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

      const data = await res.json()

      if (data.success) {
        toast.success('Product created successfully')
        navigate('/admin/products')
      } else {
        toast.error('Failed to create product')
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
