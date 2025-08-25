import { motion } from 'framer-motion'
import { 
  Sun, 
  Users, 
  TrendingUp, 
  Calendar,
  BookOpen,
  Building2,
  DollarSign,
  Zap,
  Award,
  Bell
} from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/domains/auth/use-auth'
import { formatCurrency } from '@/lib/utils'

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

// Mock data - em produção viria da API
const mockData = {
  member: {
    totalSavings: 125000, // R$ 1.250,00 em centavos
    monthlyEconomy: 18500, // R$ 185,00
    co2Avoided: 450, // kg
    coursesCompleted: 3,
    nextCourse: 'Manutenção de Sistemas Solares',
    notifications: [
      'Sua economia mensal aumentou 15% este mês!',
      'Novo curso disponível: Energia Solar Avançada',
    ]
  },
  empresa: {
    totalLeads: 24,
    activeProjects: 8,
    monthlyRevenue: 4500000, // R$ 45.000,00
    techniciansAvailable: 12,
    nextAppointment: 'Instalação - Casa da Maria Silva',
    notifications: [
      '3 novos leads qualificados disponíveis',
      'Técnico João concluiu certificação avançada',
    ]
  },
  admin: {
    totalUsers: 2847,
    totalCommunities: 15,
    totalSavings: 125000000, // R$ 1.250.000,00
    monthlyGrowth: 12.5,
    notifications: [
      'Nova empresa cadastrada: SolTech Instalações',
      'Meta mensal de cadastros atingida!',
    ]
  }
}

export function DashboardPage() {
  const { user } = useAuth()

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  const data = user.role === 'ADMIN' ? mockData.admin 
             : user.role === 'EMPRESA' ? mockData.empresa 
             : mockData.member

  return (
    <div className="min-h-screen bg-gradient-to-br from-solar-neutral via-background to-solar-neutral-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">
            Olá, {user.name}! ☀️
          </h1>
          <p className="text-lg text-muted-foreground">
            {user.role === 'ADMIN' && 'Gerencie a plataforma SolAr'}
            {user.role === 'EMPRESA' && 'Acompanhe seus projetos e leads'}
            {user.role === 'MEMBRO' && 'Acompanhe sua jornada solar'}
          </p>
        </motion.div>

        {/* Dashboard por Role */}
        {user.role === 'MEMBRO' && (
          <MemberDashboard data={data} />
        )}

        {user.role === 'EMPRESA' && (
          <CompanyDashboard data={data} />
        )}

        {user.role === 'ADMIN' && (
          <AdminDashboard data={data} />
        )}
      </div>
    </div>
  )
}

function MemberDashboard({ data }: { data: any }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Cards principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div variants={cardVariants}>
          <Card className="solar-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Economia Total</CardTitle>
              <DollarSign className="h-4 w-4 text-solar-tertiary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-solar-tertiary">
                {formatCurrency(data.totalSavings)}
              </div>
              <p className="text-xs text-muted-foreground">
                Desde o início
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={cardVariants}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Economia Mensal</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(data.monthlyEconomy)}
              </div>
              <p className="text-xs text-muted-foreground">
                +15% vs mês anterior
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={cardVariants}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">CO₂ Evitado</CardTitle>
              <Sun className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {data.co2Avoided} kg
              </div>
              <p className="text-xs text-muted-foreground">
                Impacto ambiental positivo
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={cardVariants}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cursos Concluídos</CardTitle>
              <Award className="h-4 w-4 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-600">
                {data.coursesCompleted}
              </div>
              <p className="text-xs text-muted-foreground">
                Certificações obtidas
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Ações rápidas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={cardVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="mr-2 h-5 w-5" />
                Próximo Curso
              </CardTitle>
              <CardDescription>Continue sua jornada de aprendizado</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="font-medium mb-4">{data.nextCourse}</p>
              <Button variant="solar" asChild>
                <Link to="/aprendizagem">
                  Continuar Aprendendo
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={cardVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Notificações
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {data.notifications.map((notification: string, index: number) => (
                  <div key={index} className="text-sm p-3 bg-muted rounded-lg">
                    {notification}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}

function CompanyDashboard({ data }: { data: any }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Cards principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div variants={cardVariants}>
          <Card className="solar-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Leads Ativos</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {data.totalLeads}
              </div>
              <p className="text-xs text-muted-foreground">
                +3 novos esta semana
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={cardVariants}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Projetos Ativos</CardTitle>
              <Zap className="h-4 w-4 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-600">
                {data.activeProjects}
              </div>
              <p className="text-xs text-muted-foreground">
                Em andamento
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={cardVariants}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Receita Mensal</CardTitle>
              <DollarSign className="h-4 w-4 text-solar-tertiary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-solar-tertiary">
                {formatCurrency(data.monthlyRevenue)}
              </div>
              <p className="text-xs text-muted-foreground">
                +20% vs mês anterior
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={cardVariants}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Técnicos Disponíveis</CardTitle>
              <Building2 className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {data.techniciansAvailable}
              </div>
              <p className="text-xs text-muted-foreground">
                Certificados e ativos
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Ações rápidas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={cardVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Próximo Agendamento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium mb-4">{data.nextAppointment}</p>
              <div className="flex gap-2">
                <Button variant="solar" size="sm">Ver Detalhes</Button>
                <Button variant="outline" size="sm">Reagendar</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={cardVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Atualizações
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {data.notifications.map((notification: string, index: number) => (
                  <div key={index} className="text-sm p-3 bg-muted rounded-lg">
                    {notification}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}

function AdminDashboard({ data }: { data: any }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Cards principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div variants={cardVariants}>
          <Card className="solar-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {data.totalUsers.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                +{data.monthlyGrowth}% este mês
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={cardVariants}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Comunidades Ativas</CardTitle>
              <Building2 className="h-4 w-4 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-600">
                {data.totalCommunities}
              </div>
              <p className="text-xs text-muted-foreground">
                Em 8 estados
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={cardVariants}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Economia Total Gerada</CardTitle>
              <DollarSign className="h-4 w-4 text-solar-tertiary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-solar-tertiary">
                {formatCurrency(data.totalSavings)}
              </div>
              <p className="text-xs text-muted-foreground">
                Impacto da plataforma
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={cardVariants}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Crescimento Mensal</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                +{data.monthlyGrowth}%
              </div>
              <p className="text-xs text-muted-foreground">
                Novos cadastros
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Ações administrativas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={cardVariants}>
          <Card>
            <CardHeader>
              <CardTitle>Gestão Financeira</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="solar" className="w-full mb-2" asChild>
                <Link to="/financeiro">
                  Acessar Financeiro
                </Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/pagamentos">
                  Ver Pagamentos
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={cardVariants}>
          <Card>
            <CardHeader>
              <CardTitle>Gestão de Usuários</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full" size="sm">
                  Aprovar Empresas
                </Button>
                <Button variant="outline" className="w-full" size="sm">
                  Gerenciar Comunidades
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={cardVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Notificações do Sistema
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {data.notifications.map((notification: string, index: number) => (
                  <div key={index} className="text-sm p-2 bg-muted rounded">
                    {notification}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
