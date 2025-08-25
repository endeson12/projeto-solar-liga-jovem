import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/domains/auth/use-auth'

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    // Salvar a URL atual para redirecionar após o login
    return <Navigate to="/auth/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}
