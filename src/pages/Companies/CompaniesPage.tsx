import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Star,
  Search,
  Filter,
  ExternalLink
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

// Mock data - em produção viria da API
const mockCompanies = [
  {
    id: '1',
    name: 'SolEnergia Piauí',
    description: 'Especializada em instalações residenciais e comerciais com mais de 5 anos de experiência.',
    city: 'Teresina',
    state: 'PI',
    phone: '(86) 99999-1111',
    email: 'contato@solenergia.com.br',
    website: 'www.solenergia.com.br',
    rating: 4.8,
    reviews: 124,
    services: ['Instalação', 'Manutenção', 'Consultoria'],
    logo: '/company-1.jpg',
    projectsCompleted: 450
  },
  {
    id: '2',
    name: 'Nordeste Solar',
    description: 'Líder em energia solar no Nordeste, atendendo residências e empresas.',
    city: 'Fortaleza',
    state: 'CE',
    phone: '(85) 98888-2222',
    email: 'info@nordestesolar.com.br',
    website: 'www.nordestesolar.com.br',
    rating: 4.9,
    reviews: 89,
    services: ['Instalação', 'Financiamento', 'Monitoramento'],
    logo: '/company-2.jpg',
    projectsCompleted: 320
  },
  {
    id: '3',
    name: 'Sol do Maranhão',
    description: 'Empresa familiar com foco em atendimento personalizado e qualidade.',
    city: 'São Luís',
    state: 'MA',
    phone: '(98) 97777-3333',
    email: 'contato@soldoma.com.br',
    website: 'www.soldoma.com.br',
    rating: 4.7,
    reviews: 67,
    services: ['Instalação', 'Manutenção'],
    logo: '/company-3.jpg',
    projectsCompleted: 180
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

export function CompaniesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedState, setSelectedState] = useState('')

  const filteredCompanies = mockCompanies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.city.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesState = !selectedState || company.state === selectedState
    return matchesSearch && matchesState
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
            <Building2 className="inline-block mr-3 h-10 w-10 text-primary" />
            Empresas Parceiras
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Encontre empresas certificadas e qualificadas para seu projeto de energia solar. 
            Todas foram avaliadas pela nossa equipe e pela comunidade.
          </p>
        </motion.div>

        {/* Filtros */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
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
                  Filtros
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Lista de empresas */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredCompanies.map((company, index) => (
            <motion.div key={company.id} variants={cardVariants}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{company.name}</CardTitle>
                      <div className="flex items-center text-sm text-muted-foreground mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        {company.city}, {company.state}
                      </div>
                      <div className="flex items-center mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(company.rating)
                                  ? 'text-yellow-500 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-muted-foreground">
                          {company.rating} ({company.reviews} avaliações)
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <CardDescription className="text-sm">
                    {company.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  {/* Serviços */}
                  <div className="mb-4">
                    <h4 className="font-medium text-sm mb-2">Serviços:</h4>
                    <div className="flex flex-wrap gap-1">
                      {company.services.map((service) => (
                        <span
                          key={service}
                          className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Estatísticas */}
                  <div className="mb-4 p-3 bg-muted rounded-lg">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">
                        {company.projectsCompleted}+
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Projetos Concluídos
                      </div>
                    </div>
                  </div>

                  {/* Contato */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm">
                      <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{company.phone}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="truncate">{company.email}</span>
                    </div>
                    {company.website && (
                      <div className="flex items-center text-sm">
                        <ExternalLink className="h-4 w-4 mr-2 text-muted-foreground" />
                        <a 
                          href={`https://${company.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline truncate"
                        >
                          {company.website}
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Ações */}
                  <div className="flex gap-2">
                    <Button variant="solar" size="sm" className="flex-1" asChild>
                      <Link to={`/empresas/${company.id}`}>
                        Ver Detalhes
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm">
                      Contatar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Sem resultados */}
        {filteredCompanies.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Building2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Nenhuma empresa encontrada
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
                É uma Empresa de Energia Solar?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Cadastre-se na nossa plataforma e conecte-se com clientes qualificados 
                em busca de soluções em energia solar. Aumente sua visibilidade e seus negócios!
              </p>
              <Button variant="solar" size="lg" asChild>
                <Link to="/auth/register?type=empresa">
                  Cadastrar Minha Empresa
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
