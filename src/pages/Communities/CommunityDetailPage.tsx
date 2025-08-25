import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Users, 
  MapPin, 
  Zap, 
  Leaf, 
  DollarSign,
  Calendar,
  MessageCircle,
  TrendingUp,
  Award,
  Building2,
  UserPlus,
  Share2
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency } from '@/lib/utils'

// Mock data - em produção viria da API
const mockCommunity = {
  id: '1',
  name: 'Vila Solar Teresina',
  description: 'A Vila Solar Teresina é uma comunidade pioneira em energia solar no Piauí, criada em 2022 com o objetivo de democratizar o acesso à energia limpa e promover o desenvolvimento sustentável local. Nossa comunidade reúne famílias, pequenos negócios e técnicos especializados que trabalham juntos para reduzir custos energéticos e formar uma rede de apoio mútuo.',
  city: 'Teresina',
  state: 'PI',
  address: 'Bairro Dirceu Arcoverde',
  foundedDate: '2022-03-15',
  members: 245,
  companies: 8,
  totalSavings: 125000,
  monthlySavings: 8500,
  co2Avoided: 2500,
  techniciansFormed: 15,
  systemsInstalled: 89,
  totalCapacity: 450, // kWp
  coordinator: {
    name: 'Ana Paula Santos',
    role: 'Coordenadora da Comunidade',
    phone: '(86) 99999-1234',
    email: 'ana@vilasolar.com.br'
  },
  recentActivities: [
    {
      id: '1',
      type: 'installation',
      title: 'Nova instalação concluída',
      description: 'Sistema de 5kWp instalado na residência da família Silva',
      date: '2024-01-20',
      icon: Zap
    },
    {
      id: '2',
      type: 'training',
      title: 'Curso de capacitação',
      description: '3 novos técnicos certificados em instalação solar',
      date: '2024-01-18',
      icon: Award
    },
    {
      id: '3',
      type: 'member',
      title: 'Novos membros',
      description: '5 novas famílias se juntaram à comunidade',
      date: '2024-01-15',
      icon: UserPlus
    }
  ],
  partnerCompanies: [
    { id: '1', name: 'SolEnergia Piauí', rating: 4.8 },
    { id: '2', name: 'Solar Tech PI', rating: 4.6 },
    { id: '3', name: 'Energia Limpa Nordeste', rating: 4.7 }
  ],
  upcomingEvents: [
    {
      id: '1',
      title: 'Reunião Mensal da Comunidade',
      date: '2024-02-05',
      time: '19:00',
      location: 'Centro Comunitário'
    },
    {
      id: '2',
      title: 'Workshop: Manutenção de Painéis',
      date: '2024-02-12',
      time: '14:00',
      location: 'Escola Municipal'
    }
  ]
}

export function CommunityDetailPage() {
  const { id } = useParams()

  return (
    <div className="min-h-screen bg-gradient-to-br from-solar-neutral via-background to-solar-neutral-dark">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/comunidades">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar às Comunidades
            </Link>
          </Button>
          
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="w-24 h-24 bg-gradient-to-r from-primary/20 to-solar-tertiary/20 rounded-lg flex items-center justify-center">
              <Users className="h-12 w-12 text-primary" />
            </div>
            
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">
                {mockCommunity.name}
              </h1>
              <div className="flex items-center text-muted-foreground mb-3">
                <MapPin className="h-4 w-4 mr-1" />
                {mockCommunity.address}, {mockCommunity.city} - {mockCommunity.state}
              </div>
              <div className="flex items-center text-sm text-muted-foreground mb-4">
                <Calendar className="h-4 w-4 mr-1" />
                Fundada em {new Date(mockCommunity.foundedDate).toLocaleDateString('pt-BR')}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="solar" size="lg">
                <UserPlus className="mr-2 h-4 w-4" />
                Participar
              </Button>
              <Button variant="outline" size="lg">
                <Share2 className="mr-2 h-4 w-4" />
                Compartilhar
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Conteúdo principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Sobre a comunidade */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Sobre a Comunidade</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {mockCommunity.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Estatísticas principais */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Impacto da Comunidade</CardTitle>
                  <CardDescription>
                    Resultados alcançados desde a fundação
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center p-4 bg-primary/10 rounded-lg">
                      <Zap className="h-8 w-8 text-primary mx-auto mb-2" />
                      <div className="text-2xl font-bold text-primary">
                        {mockCommunity.systemsInstalled}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Sistemas Instalados
                      </div>
                    </div>
                    
                    <div className="text-center p-4 bg-solar-tertiary/10 rounded-lg">
                      <DollarSign className="h-8 w-8 text-solar-tertiary mx-auto mb-2" />
                      <div className="text-2xl font-bold text-solar-tertiary">
                        {formatCurrency(mockCommunity.totalSavings)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Economia Total
                      </div>
                    </div>
                    
                    <div className="text-center p-4 bg-green-100 dark:bg-green-900/20 rounded-lg">
                      <Leaf className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-green-600">
                        {mockCommunity.co2Avoided} kg
                      </div>
                      <div className="text-sm text-muted-foreground">
                        CO₂ Evitado
                      </div>
                    </div>
                    
                    <div className="text-center p-4 bg-amber-100 dark:bg-amber-900/20 rounded-lg">
                      <Award className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-amber-600">
                        {mockCommunity.techniciansFormed}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Técnicos Formados
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Atividades recentes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Atividades Recentes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockCommunity.recentActivities.map((activity) => {
                      const IconComponent = activity.icon
                      return (
                        <div key={activity.id} className="flex items-start p-4 bg-muted rounded-lg">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                            <IconComponent className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-foreground mb-1">
                              {activity.title}
                            </h4>
                            <p className="text-sm text-muted-foreground mb-2">
                              {activity.description}
                            </p>
                            <div className="text-xs text-muted-foreground">
                              {new Date(activity.date).toLocaleDateString('pt-BR')}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Empresas parceiras */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building2 className="mr-2 h-5 w-5" />
                    Empresas Parceiras
                  </CardTitle>
                  <CardDescription>
                    Empresas que atendem nossa comunidade
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockCommunity.partnerCompanies.map((company) => (
                      <div key={company.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-primary/10 rounded mr-3 flex items-center justify-center">
                            <Building2 className="h-4 w-4 text-primary" />
                          </div>
                          <span className="font-medium">{company.name}</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          ⭐ {company.rating}
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4" asChild>
                    <Link to="/empresas">
                      Ver Todas as Empresas
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Informações gerais */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Informações Gerais</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-4 bg-primary/10 rounded-lg">
                    <div className="text-2xl font-bold text-primary">
                      {mockCommunity.members}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Membros Ativos
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-xl font-bold text-solar-tertiary">
                        {mockCommunity.companies}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Empresas Parceiras
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-amber-600">
                        {mockCommunity.totalCapacity} kWp
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Capacidade Total
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="text-sm text-muted-foreground mb-2">
                      Economia Mensal Atual
                    </div>
                    <div className="text-lg font-bold text-solar-tertiary">
                      {formatCurrency(mockCommunity.monthlySavings)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Coordenador */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Coordenação</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{mockCommunity.coordinator.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {mockCommunity.coordinator.role}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <MessageCircle className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{mockCommunity.coordinator.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <MessageCircle className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="break-all">{mockCommunity.coordinator.email}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Próximos eventos */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="mr-2 h-5 w-5" />
                    Próximos Eventos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockCommunity.upcomingEvents.map((event) => (
                      <div key={event.id} className="p-3 bg-muted rounded-lg">
                        <div className="font-medium text-sm mb-1">
                          {event.title}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(event.date).toLocaleDateString('pt-BR')} às {event.time}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          📍 {event.location}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Ações */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card>
                <CardContent className="pt-6 space-y-3">
                  <Button variant="solar" className="w-full">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Participar da Comunidade
                  </Button>
                  <Button variant="outline" className="w-full">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Falar com Coordenador
                  </Button>
                  <Button variant="outline" className="w-full">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Ver no SolarMatch
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
