import { type ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../../store/useAuthStore'

type GuestGuardProps = {
  children: ReactNode
}

const GuestGuard = ({ children }: GuestGuardProps) => {
  const { user, loading } = useAuthStore()

  if (loading) return null

  if (user) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

export default GuestGuard
