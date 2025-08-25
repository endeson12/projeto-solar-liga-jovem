import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Trophy, 
  Star, 
  MapPin, 
  Award, 
  TrendingUp,
  Users,
  Clock,
  DollarSign,
  Search,
  Filter,
  Medal,
  Target,
  Zap,
  Building2
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { formatCurrency } from '@/lib/utils'

// Mock data - em produção viria da API
const mockInstallers = [
  {
    id: '1',
    name: 'SolEnergia Piauí',
    city: 'Teresina',
    state: 'PI',
    rating: 4.9,
    reviews: 156,
    projectsCompleted: 450,
    yearsExperience: 5,
    averagePrice: 450000, // R$ 4.500,00 por kWp em centavos
    averageDeliveryTime: 30, // dias
    certifications: ['INMETRO', 'ANEEL', 'ABNT NBR 16274'],
    specialties: ['Residencial', 'Comercial', 'Rural'],
    solarMatchScore: 95,
    rank: 1,
    badge: 'gold',
    monthlyInstallations: 25,
    customerSatisfaction: 98,
    technicalQuality: 96,
    priceCompetitiveness: 92,
    deliveryReliability: 97
  },
  {
    id: '2',
    name: 'Solar Tech PI',
    city: 'Teresina',
    state: 'PI',
    rating: 4.8,
    reviews: 134,
    projectsCompleted: 380,
    yearsExperience: 4,
    averagePrice: 470000,
    averageDeliveryTime: 35,
    certifications: ['INMETRO', 'ANEEL'],
    specialties: ['Residencial', 'Comercial'],
    solarMatchScore: 92,
    rank: 2,
    badge: 'gold',
    monthlyInstallations: 20,
    customerSatisfaction: 96,
    technicalQuality: 94,
    priceCompetitiveness: 89,
    deliveryReliability: 95
  },
  {
    id: '3',
    name: 'Energia Limpa Nordeste',
    city: 'Fortaleza',
    state: 'CE',
    rating: 4.7,
    reviews: 98,
    projectsCompleted: 280,
    yearsExperience: 3,
    averagePrice: 490000,
    averageDeliveryTime: 40,
    certifications: ['INMETRO'],
    specialties: ['Residencial'],
    solarMatchScore: 88,
    rank: 3,
    badge: 'silver',
    monthlyInstallations: 15,
    customerSatisfaction: 94,
    technicalQuality: 90,
    priceCompetitiveness: 85,
    deliveryReliability: 92
  },
  {
    id: '4',
    name: 'Sol do Maranhão',
    city: 'São Luís',
    state: 'MA',
    rating: 4.6,
    reviews: 76,
    projectsCompleted: 200,
    yearsExperience: 3,
    averagePrice: 510000,
    averageDeliveryTime: 45,
    certifications: ['INMETRO'],
    specialties: ['Residencial', 'Rural'],
    solarMatchScore: 85,
    rank: 4,
    badge: 'silver',
    monthlyInstallations: 12,
    customerSatisfaction: 92,
    technicalQuality: 88,
    priceCompetitiveness: 82,
    deliveryReliability: 89
  },
  {
    id: '5',
    name: 'Verde Solar Ceará',
    city: 'Fortaleza',
    state: 'CE',
    rating: 4.5,
    reviews: 54,
    projectsCompleted: 150,
    yearsExperience: 2,
    averagePrice: 530000,
    averageDeliveryTime: 50,
    certifications: ['INMETRO'],
    specialties: ['Residencial'],
    solarMatchScore: 82,
    rank: 5,
    badge: 'bronze',
    monthlyInstallations: 8,
    customerSatisfaction: 90,
    technicalQuality: 85,
    priceCompetitiveness: 78,
    deliveryReliability: 85
  }
]

const getBadgeColor = (badge: string) => {
  switch (badge) {
    case 'gold': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20'
    case 'silver': return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20'
    case 'bronze': return 'text-amber-700 bg-amber-100 dark:bg-amber-900/20'
    default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20'
  }
}

const getBadgeIcon = (badge: string) => {
  switch (badge) {
    case 'gold': return Trophy
    case 'silver': return Medal
    case 'bronze': return Award
    default: return Award
  }
}

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

export function SolarMatchPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedState, setSelectedState] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState('')

  const filteredInstallers = mockInstallers.filter(installer => {
    const matchesSearch = installer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         installer.city.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesState = !selectedState || installer.state === selectedState
    const matchesSpecialty = !selectedSpecialty || installer.specialties.includes(selectedSpecialty)
    return matchesSearch && matchesState && matchesSpecialty
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-solar-neutral via-background to-solar-neutral-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            <Trophy className="inline-block mr-3 h-10 w-10 text-primary" />
            SolarMatch
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ranking dos melhores instaladores de energia solar. Encontre empresas certificadas, 
            compare preços e escolha o parceiro ideal para seu projeto solar.
          </p>
        </motion.div>

        {/* Como funciona */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="solar-shadow">
            <CardHeader className="text-center">
              <CardTitle>Como Funciona o SolarMatch</CardTitle>
              <CardDescription>
                Nosso algoritmo avalia empresas com base em critérios rigorosos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Satisfação do Cliente</h3>
                  <p className="text-sm text-muted-foreground">
                    Avaliações reais de clientes sobre atendimento e qualidade
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-solar-tertiary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Zap className="h-8 w-8 text-solar-tertiary" />
                  </div>
                  <h3 className="font-semibold mb-2">Qualidade Técnica</h3>
                  <p className="text-sm text-muted-foreground">
                    Certificações, experiência e qualidade das instalações
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <DollarSign className="h-8 w-8 text-amber-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Competitividade</h3>
                  <p className="text-sm text-muted-foreground">
                    Preços justos e condições de pagamento atrativas
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Pontualidade</h3>
                  <p className="text-sm text-muted-foreground">
                    Cumprimento de prazos e confiabilidade na entrega
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Filtros */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar por empresa ou cidade..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="md:w-48">
                  <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                  >
                    <option value="">Todos os Estados</option>
                    <option value="PI">Piauí</option>
                    <option value="CE">Ceará</option>
                    <option value="MA">Maranhão</option>
                    <option value="RN">Rio Grande do Norte</option>
                    <option value="PB">Paraíba</option>
                    <option value="PE">Pernambuco</option>
                  </select>
                </div>

                <div className="md:w-48">
                  <select
                    value={selectedSpecialty}
                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                    className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                  >
                    <option value="">Todas as Especialidades</option>
                    <option value="Residencial">Residencial</option>
                    <option value="Comercial">Comercial</option>
                    <option value="Rural">Rural</option>
                    <option value="Industrial">Industrial</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Ranking */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {filteredInstallers.map((installer, index) => {
            const BadgeIcon = getBadgeIcon(installer.badge)
            
            return (
              <motion.div key={installer.id} variants={cardVariants}>
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                      {/* Ranking e Badge */}
                      <div className="flex items-center gap-4">
                        <div className="text-4xl font-bold text-primary">
                          #{installer.rank}
                        </div>
                        <div className={`p-2 rounded-lg ${getBadgeColor(installer.badge)}`}>
                          <BadgeIcon className="h-6 w-6" />
                        </div>
                      </div>

                      {/* Informações principais */}
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-foreground mb-2">
                              {installer.name}
                            </h3>
                            <div className="flex items-center text-muted-foreground mb-2">
                              <MapPin className="h-4 w-4 mr-1" />
                              {installer.city}, {installer.state}
                            </div>
                            <div className="flex items-center mb-2">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < Math.floor(installer.rating)
                                        ? 'text-yellow-500 fill-current'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="ml-2 text-sm text-muted-foreground">
                                {installer.rating} ({installer.reviews} avaliações)
                              </span>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-2xl font-bold text-primary mb-1">
                              {installer.solarMatchScore}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              SolarMatch Score
                            </div>
                          </div>
                        </div>

                        {/* Estatísticas */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="text-center p-3 bg-muted rounded-lg">
                            <div className="text-lg font-bold text-foreground">
                              {installer.projectsCompleted}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Projetos
                            </div>
                          </div>
                          
                          <div className="text-center p-3 bg-muted rounded-lg">
                            <div className="text-lg font-bold text-foreground">
                              {installer.yearsExperience} anos
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Experiência
                            </div>
                          </div>
                          
                          <div className="text-center p-3 bg-muted rounded-lg">
                            <div className="text-lg font-bold text-foreground">
                              {formatCurrency(installer.averagePrice)}/kWp
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Preço Médio
                            </div>
                          </div>
                          
                          <div className="text-center p-3 bg-muted rounded-lg">
                            <div className="text-lg font-bold text-foreground">
                              {installer.averageDeliveryTime} dias
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Prazo Médio
                            </div>
                          </div>
                        </div>

                        {/* Métricas detalhadas */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="text-center">
                            <div className="text-sm font-medium text-foreground">
                              {installer.customerSatisfaction}%
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Satisfação
                            </div>
                          </div>
                          
                          <div className="text-center">
                            <div className="text-sm font-medium text-foreground">
                              {installer.technicalQuality}%
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Qualidade
                            </div>
                          </div>
                          
                          <div className="text-center">
                            <div className="text-sm font-medium text-foreground">
                              {installer.priceCompetitiveness}%
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Preço
                            </div>
                          </div>
                          
                          <div className="text-center">
                            <div className="text-sm font-medium text-foreground">
                              {installer.deliveryReliability}%
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Pontualidade
                            </div>
                          </div>
                        </div>

                        {/* Especialidades e certificações */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {installer.specialties.map((specialty, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                            >
                              {specialty}
                            </span>
                          ))}
                          {installer.certifications.map((cert, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-solar-tertiary/10 text-solar-tertiary text-xs rounded-full"
                            >
                              {cert}
                            </span>
                          ))}
                        </div>

                        {/* Ações */}
                        <div className="flex flex-col sm:flex-row gap-3">
                          <Button variant="solar" asChild>
                            <Link to={`/empresas/${installer.id}`}>
                              Ver Detalhes
                            </Link>
                          </Button>
                          <Button variant="outline">
                            Solicitar Orçamento
                          </Button>
                          <Button variant="outline">
                            Comparar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Sem resultados */}
        {filteredInstallers.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Trophy className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Nenhum instalador encontrado
            </h3>
            <p className="text-muted-foreground mb-4">
              Tente ajustar os filtros ou buscar por outros termos.
            </p>
            <Button variant="outline" onClick={() => {
              setSearchTerm('')
              setSelectedState('')
              setSelectedSpecialty('')
            }}>
              Limpar Filtros
            </Button>
          </motion.div>
        )}

        {/* CTA para empresas */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Card className="bg-gradient-to-r from-primary/10 to-solar-tertiary/10 border-primary/20">
            <CardContent className="p-8 text-center">
              <Building2 className="h-16 w-16 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-4">
                É uma Empresa Instaladora?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Cadastre sua empresa no SolarMatch e apareça no ranking dos melhores instaladores. 
                Receba leads qualificados e aumente suas vendas!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="solar" size="lg" asChild>
                  <Link to="/auth/register">
                    Cadastrar Empresa
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/ajuda">
                    Como Funciona
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
