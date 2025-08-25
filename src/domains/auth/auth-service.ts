import { User } from '@/types'
import { generateId } from '@/lib/utils'

interface RegisterData {
  name: string
  email: string
  password: string
  role: 'EMPRESA' | 'MEMBRO'
  companyName?: string
  cnpj?: string
  phone?: string
}

// Mock users para desenvolvimento
const mockUsers: User[] = [
  {
    id: 'admin-1',
    name: 'Administrador SolAr',
    email: 'admin@projetosolar.com.br',
    role: 'ADMIN',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'empresa-1',
    name: 'João Silva',
    email: 'joao@solenergia.com.br',
    role: 'EMPRESA',
    companyId: 'company-1',
    phone: '(85) 99999-1111',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'membro-1',
    name: 'Maria Santos',
    email: 'maria@email.com',
    role: 'MEMBRO',
    communityId: 'community-1',
    phone: '(85) 99999-2222',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

class AuthService {
  private users: User[] = mockUsers

  async login(email: string, password: string): Promise<User> {
    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Para o MVP, aceitar qualquer senha para usuários existentes
    const user = this.users.find(u => u.email === email)
    
    if (!user) {
      throw new Error('Usuário não encontrado')
    }

    // Simular validação de senha (no MVP, qualquer senha funciona)
    if (password.length < 6) {
      throw new Error('Senha deve ter pelo menos 6 caracteres')
    }

    return user
  }

  async register(userData: RegisterData): Promise<User> {
    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Verificar se email já existe
    const existingUser = this.users.find(u => u.email === userData.email)
    if (existingUser) {
      throw new Error('Este email já está cadastrado')
    }

    // Criar novo usuário
    const newUser: User = {
      id: generateId(),
      name: userData.name,
      email: userData.email,
      role: userData.role,
      phone: userData.phone,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // Se for empresa, criar companyId (seria criado no backend real)
    if (userData.role === 'EMPRESA') {
      newUser.companyId = generateId()
    }

    // Se for membro, associar a uma comunidade padrão (seria escolhido pelo usuário)
    if (userData.role === 'MEMBRO') {
      newUser.communityId = 'community-1' // Comunidade padrão para o MVP
    }

    // Adicionar à lista de usuários (em produção seria salvo no banco)
    this.users.push(newUser)

    return newUser
  }

  async getCurrentUser(): Promise<User | null> {
    const storedUser = localStorage.getItem('solar-user')
    if (storedUser) {
      return JSON.parse(storedUser)
    }
    return null
  }

  async updateProfile(userId: string, data: Partial<User>): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 500))

    const userIndex = this.users.findIndex(u => u.id === userId)
    if (userIndex === -1) {
      throw new Error('Usuário não encontrado')
    }

    const updatedUser = {
      ...this.users[userIndex],
      ...data,
      updatedAt: new Date().toISOString(),
    }

    this.users[userIndex] = updatedUser
    
    // Atualizar localStorage se for o usuário atual
    const currentUser = await this.getCurrentUser()
    if (currentUser?.id === userId) {
      localStorage.setItem('solar-user', JSON.stringify(updatedUser))
    }

    return updatedUser
  }

  async resetPassword(email: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 1000))

    const user = this.users.find(u => u.email === email)
    if (!user) {
      throw new Error('Usuário não encontrado')
    }

    // Em produção, enviaria email com link de reset
    console.log(`Email de reset enviado para ${email}`)
  }

  // Método para obter usuários (apenas para admin)
  async getUsers(): Promise<User[]> {
    await new Promise(resolve => setTimeout(resolve, 500))
    return this.users
  }
}

export const authService = new AuthService()
