import React, { useEffect, useState } from 'react'
import { User } from '@/types'
import { authService } from './auth-service'
import { AuthContext, type RegisterData } from './auth-context'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Verificar se há um usuário logado no localStorage
    const initAuth = async () => {
      try {
        const storedUser = localStorage.getItem('solar-user')
        if (storedUser) {
          const userData = JSON.parse(storedUser)
          setUser(userData)
        }
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error)
        localStorage.removeItem('solar-user')
      } finally {
        setIsLoading(false)
      }
    }

    initAuth()
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const userData = await authService.login(email, password)
      setUser(userData)
      localStorage.setItem('solar-user', JSON.stringify(userData))
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData: RegisterData) => {
    setIsLoading(true)
    try {
      const newUser = await authService.register(userData)
      setUser(newUser)
      localStorage.setItem('solar-user', JSON.stringify(newUser))
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('solar-user')
  }

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
