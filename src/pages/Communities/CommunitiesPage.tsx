import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Users, 
  MapPin, 
  Zap, 
  Leaf, 
  TrendingUp,
  Search,
  Filter,
  DollarSign
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { formatCurrency } from '@/lib/utils'

// Mock data - em produção viria da API
const mockCommunities = [
  {
    id: '1',
    name: 'Vila Solar Teresina',
    description: 'Comunidade pioneira em energia solar no Piauí, com foco em sustentabilidade e economia.',
    city: 'Teresina',
    state: 'PI',
    members: 245,
    companies: 8,
    totalSavings: 125000, // R$ 1.250,00 em centavos
    co2Avoided: 2500, // kg
    techniciansFormed: 15,
    lat: -5.0892,
    lng: -42.8019,
    image: '/community-1.jpg'
  },
  {
    id: '2',
    name: 'Eco Bairro Fortaleza',
    description: 'Transformando vidas através da energia solar no coração do Ceará.',
    city: 'Fortaleza',
    state: 'CE',
    members: 189,
    companies: 6,
    totalSavings: 98000,
    co2Avoided: 1800,
    techniciansFormed: 12,
    lat: -3.7319,
    lng: -38.5267,
    image: '/community-2.jpg'
  },
  {
    id: '3',
    name: 'Solar do Maranhão',
    description: 'Comunidade em crescimento focada na inclusão energética e desenvolvimento local.',
    city: 'São Luís',
    state: 'MA',
    members: 156,
    companies: 4,
    totalSavings: 67000,
    co2Avoided: 1200,
    techniciansFormed: 8,
    lat: -2.5387,
    lng: -44.2825,
    image: '/community-3.jpg'
  }
]

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

export function CommunitiesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedState, setSelectedState] = useState('')

  const filteredCommunities = mockCommunities.filter(community => {
    const matchesSearch = community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         community.city.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesState = !selectedState || community.state === selectedState
    return matchesSearch && matchesState
  })

  // Estatísticas agregadas
  const totalStats = mockCommunities.reduce((acc, community) => ({
    members: acc.members + community.members,
    savings: acc.savings + community.totalSavings,
    co2: acc.co2 + community.co2Avoided,
    technicians: acc.technicians + community.techniciansFormed
  }), { members: 0, savings: 0, co2: 0, technicians: 0 })

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
            <Users className="inline-block mr-3 h-10 w-10 text-primary" />
            Comunidades Energéticas
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Descubra comunidades que estão transformando suas realidades através da energia solar. 
            Junte-se ao movimento e faça parte dessa revolução energética!
          </p>
        </motion.div>

        {/* Estatísticas gerais */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="solar-shadow">
            <CardHeader className="text-center">
              <CardTitle>Impacto Coletivo das Comunidades</CardTitle>
              <CardDescription>
                Juntos, estamos construindo um futuro mais sustentável
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {totalStats.members.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Membros Ativos</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-solar-tertiary mb-2">
                    {formatCurrency(totalStats.savings)}
                  </div>
                  <div className="text-sm text-muted-foreground">Economia Total</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {totalStats.co2.toLocaleString()} kg
                  </div>
                  <div className="text-sm text-muted-foreground">CO₂ Evitado</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-600 mb-2">
                    {totalStats.technicians}
                  </div>
                  <div className="text-sm text-muted-foreground">Técnicos Formados</div>
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
                      placeholder="Buscar por nome ou cidade..."
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
                    <option value="AL">Alagoas</option>
                    <option value="SE">Sergipe</option>
                    <option value="BA">Bahia</option>
                  </select>
                </div>

                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Ver no Mapa
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Lista de comunidades */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredCommunities.map((community, index) => (
            <motion.div key={community.id} variants={cardVariants}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                {/* Imagem da comunidade */}
                <div className="aspect-video bg-gradient-to-r from-primary/20 to-solar-tertiary/20 rounded-t-lg flex items-center justify-center">
                  <Users className="h-12 w-12 text-primary" />
                </div>
                
                <CardHeader>
                  <CardTitle className="text-xl">{community.name}</CardTitle>
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    {community.city}, {community.state}
                  </div>
                  <CardDescription>{community.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  {/* Estatísticas da comunidade */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-lg font-bold text-primary">
                        {community.members}
                      </div>
                      <div className="text-xs text-muted-foreground">Membros</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-lg font-bold text-amber-600">
                        {community.companies}
                      </div>
                      <div className="text-xs text-muted-foreground">Empresas</div>
                    </div>
                  </div>

                  {/* Impacto */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-2 text-solar-tertiary" />
                        <span>Economia Total</span>
                      </div>
                      <span className="font-medium">
                        {formatCurrency(community.totalSavings)}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <Leaf className="h-4 w-4 mr-2 text-green-600" />
                        <span>CO₂ Evitado</span>
                      </div>
                      <span className="font-medium">
                        {community.co2Avoided} kg
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <Zap className="h-4 w-4 mr-2 text-amber-600" />
                        <span>Técnicos Formados</span>
                      </div>
                      <span className="font-medium">
                        {community.techniciansFormed}
                      </span>
                    </div>
                  </div>

                  {/* Ações */}
                  <div className="flex gap-2">
                    <Button variant="solar" size="sm" className="flex-1" asChild>
                      <Link to={`/comunidades/${community.id}`}>
                        Conhecer
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm">
                      Participar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Sem resultados */}
        {filteredCommunities.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Nenhuma comunidade encontrada
            </h3>
            <p className="text-muted-foreground mb-4">
              Tente ajustar os filtros ou buscar por outros termos.
            </p>
            <Button variant="outline" onClick={() => {
              setSearchTerm('')
              setSelectedState('')
            }}>
              Limpar Filtros
            </Button>
          </motion.div>
        )}

        {/* CTA para criar comunidade */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Card className="bg-gradient-to-r from-primary/10 to-solar-tertiary/10 border-primary/20">
            <CardContent className="p-8 text-center">
              <Users className="h-16 w-16 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Crie sua Comunidade Energética
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Reúna seus vizinhos e amigos para formar uma comunidade solar. 
                Juntos, vocês podem conseguir melhores preços, compartilhar conhecimento 
                e amplificar o impacto positivo da energia solar!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="solar" size="lg" asChild>
                  <Link to="/auth/register">
                    Criar Comunidade
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
