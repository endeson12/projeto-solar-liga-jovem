// Perfis de usuário
export type Role = 'ADMIN' | 'EMPRESA' | 'MEMBRO'

export interface User {
  id: string
  name: string
  email: string
  role: Role
  companyId?: string
  communityId?: string
  avatar?: string
  phone?: string
  createdAt: string
  updatedAt: string
}

// Empresas
export interface Company {
  id: string
  name: string
  cnpj: string
  contactEmail: string
  phone?: string
  website?: string
  address?: string
  city: string
  state: string
  status: 'ATIVA' | 'PENDENTE' | 'SUSPENSA'
  services: string[] // ex.: 'instalacao', 'manutencao', 'consultoria'
  communities: string[] // ids das comunidades atendidas
  description?: string
  logo?: string
  createdAt: string
  updatedAt: string
}

// Comunidades
export interface Community {
  id: string
  name: string
  description?: string
  city: string
  state: string
  lat?: number
  lng?: number
  members: string[] // user ids
  companies: string[] // company ids
  totalSavings: number // economia total em centavos
  co2Avoided: number // CO2 evitado em kg
  techniciansFormed: number
  createdAt: string
  updatedAt: string
}

// Financeiro
export type FinanceEntryType = 'RECEITA' | 'DESPESA'
export type FinanceCategory = 
  | 'Equipamentos' 
  | 'Instalacao' 
  | 'Treinamento' 
  | 'Administrativo' 
  | 'Marketing'
  | 'Manutencao'
  | 'Outros'

export interface FinanceEntry {
  id: string
  communityId: string
  type: FinanceEntryType
  category: FinanceCategory
  amount: number // em centavos
  description?: string
  date: string
  createdBy: string // user id
  createdAt: string
  updatedAt: string
}

// Pagamentos
export type PaymentStatus = 'PENDENTE' | 'PAGO' | 'CANCELADO'
export type PaymentMethod = 'PIX' | 'BOLETO' | 'CREDITO' | 'DEBITO' | 'DINHEIRO' | 'MANUAL'

export interface Payment {
  id: string
  userId: string
  communityId: string
  amount: number // centavos
  status: PaymentStatus
  method: PaymentMethod
  description?: string
  dueDate?: string
  paidAt?: string
  receiptUrl?: string
  createdAt: string
  updatedAt: string
}

// Aprendizagem
export type CourseLevel = 'Básico' | 'Intermediário' | 'Avançado'

export interface CourseModule {
  id: string
  title: string
  description: string
  level: CourseLevel
  durationMin: number
  videoUrl?: string
  content?: string
  order: number
  prerequisites: string[] // module ids
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Progress {
  userId: string
  moduleId: string
  completed: boolean
  score?: number // 0-100
  timeSpent: number // minutos
  lastAccessed: string
  completedAt?: string
  updatedAt: string
}

export interface Certificate {
  id: string
  userId: string
  courseId: string
  issuedAt: string
  certificateUrl?: string
}

// SolarMatch - Perfis de Instaladores
export interface InstallerProfile {
  userId: string
  bio?: string
  skills: string[]
  experience: string // ex: '2 anos', '6 meses'
  trainingsCompleted: number
  fieldRatingsAvg?: number // 0..5
  jobsCompleted?: number
  availability: 'Disponível' | 'Ocupado' | 'Indisponível'
  serviceAreas: string[] // cidades/regiões
  certifications: string[]
  portfolio?: string[] // urls de fotos
  createdAt: string
  updatedAt: string
}

// Simulador
export interface SimulationInput {
  monthlyBill: number // valor da conta em reais
  monthlyConsumption?: number // kWh opcional
  tariff?: number // R$/kWh opcional
  irradiation?: number // kWh/m²/dia opcional
  roofArea?: number // m² opcional
}

export interface SimulationResult {
  input: SimulationInput
  estimatedSavings: {
    monthly: number // R$
    yearly: number // R$
    percentage: number // %
  }
  systemSpecs: {
    power: number // kWp
    estimatedCost: number // R$
    panels: number
    area: number // m²
  }
  payback: {
    years: number
    months: number
  }
  financing: {
    monthlyPayment: number // R$
    totalCost: number // R$
    interestRate: number // %
  }
  disclaimer: string
  generatedAt: string
}

// Configurações do simulador
export interface SimulatorConfig {
  defaultTariff: number // R$/kWh
  reductionPercentage: number // % (considerando taxa do sol)
  systemCostPerKwp: number // R$/kWp
  defaultIrradiation: number // kWh/m²/dia
  panelPower: number // W por painel
  panelArea: number // m² por painel
  financingRate: number // % ao ano
  financingYears: number
}

// Utilitários
export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

// Estados da aplicação
export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface AppState {
  theme: 'light' | 'dark' | 'system'
  sidebarOpen: boolean
  notifications: Notification[]
}

export interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  createdAt: string
  read: boolean
}
