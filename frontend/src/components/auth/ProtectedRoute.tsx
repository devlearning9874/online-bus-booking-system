import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store'
import type { User } from '@/types/auth'

interface ProtectedRouteProps {
  children: ReactNode
  requiredRole?: User['role']
}

function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps): JSX.Element {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
