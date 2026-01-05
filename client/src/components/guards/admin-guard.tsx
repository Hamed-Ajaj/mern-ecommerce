import { type ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../../store/useAuthStore'

type AdminGuardProps = {
  children: ReactNode
}

const AdminGuard = ({ children }: AdminGuardProps) => {
  const { user, loading } = useAuthStore()

  if (loading) return null

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

export default AdminGuard
