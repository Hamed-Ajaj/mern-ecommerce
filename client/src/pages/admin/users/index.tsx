import { useEffect, useState } from 'react'
import { toast } from 'sonner'

type User = {
  id: number
  username: string
  email: string
  role: string
  created_at?: string
}

const formatDate = (value?: string) => {
  if (!value) return '—'
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) {
    return '—'
  }
  return parsed.toLocaleDateString()
}

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/users', {
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
          toast.error('Failed to load users')
          return
        }

        const data = await res.json()
        if (data.success) {
          setUsers(data.users || [])
        } else {
          toast.error('Failed to load users')
        }
      } catch (error) {
        console.error('Failed to fetch users:', error)
        toast.error('An error occurred while loading users')
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-semibold text-stone-900">
          Users
        </h1>
      </div>

      <div className="mt-8 grid gap-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex flex-col gap-3 rounded-xl border border-black/10 bg-white/80 p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <h3 className="font-semibold text-stone-900">
                {user.username}
              </h3>
              <p className="text-sm text-stone-600">{user.email}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm text-stone-600">
              <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-stone-700">
                {user.role}
              </span>
              <span>{formatDate(user.created_at)}</span>
            </div>
          </div>
        ))}
        {users.length === 0 && (
          <div className="rounded-xl border border-black/10 bg-white/80 p-8 text-center">
            <p className="text-stone-600">No users found</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminUsers
