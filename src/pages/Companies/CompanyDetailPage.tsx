import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  ExternalLink,
  Star,
  Award,
  Users,
  Calendar,
  MessageCircle
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

// Mock data - em produção viria da API
const mockCompany = {
  id: '1',
  name: 'SolEnergia Piauí',
  description: 'A SolEnergia Piauí é uma empresa especializada em soluções completas de energia solar, atuando no mercado há mais de 5 anos. Nossa missão é democratizar o acesso à energia limpa e renovável, oferecendo produtos de alta qualidade e atendimento personalizado.',
  city: 'Teresina',
  state: 'PI',
  address: 'Rua das Flores, 123 - Centro',
  phone: '(86) 99999-1111',
  email: 'contato@solenergia.com.br',
  website: 'www.solenergia.com.br',
  rating: 4.8,
  reviews: 124,
  services: ['Instalação Residencial', 'Instalação Comercial', 'Manutenção', 'Consultoria', 'Financiamento'],
  certifications: ['INMETRO', 'ANEEL', 'ABNT NBR 16274'],
  projectsCompleted: 450,
  yearsExperience: 5,
  teamSize: 15,
  gallery: [
    '/project-1.jpg',
    '/project-2.jpg',
    '/project-3.jpg',
    '/project-4.jpg'
  ],
  testimonials: [
    {
      name: 'Maria Silva',
      text: 'Excelente atendimento! A equipe foi muito profissional e o sistema está funcionando perfeitamente.',
      rating: 5,
      date: '2024-01-15'
    },
    {
      name: 'João Santos',
      text: 'Recomendo! Reduzi 80% da minha conta de luz e o investimento já está se pagando.',
      rating: 5,
      date: '2024-01-10'
    }
  ]
}

export function CompanyDetailPage() {
  // O parâmetro id está disponível via useParams se necessário
  useParams()

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
            <Link to="/empresas">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar às Empresas
            </Link>
          </Button>
          
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="w-24 h-24 bg-gradient-to-r from-primary/20 to-solar-tertiary/20 rounded-lg flex items-center justify-center">
              <Building2 className="h-12 w-12 text-primary" />
            </div>
            
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">
                {mockCompany.name}
              </h1>
              <div className="flex items-center text-muted-foreground mb-3">
                <MapPin className="h-4 w-4 mr-1" />
                {mockCompany.city}, {mockCompany.state}
              </div>
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(mockCompany.rating)
                          ? 'text-yellow-500 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-muted-foreground">
                  {mockCompany.rating} ({mockCompany.reviews} avaliações)
                </span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="solar" size="lg">
                <MessageCircle className="mr-2 h-4 w-4" />
                Solicitar Orçamento
              </Button>
              <Button variant="outline" size="lg">
                <Phone className="mr-2 h-4 w-4" />
                Ligar Agora
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Conteúdo principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Sobre a empresa */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Sobre a Empresa</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {mockCompany.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Serviços */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Serviços Oferecidos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {mockCompany.services.map((service, index) => (
                      <div key={index} className="flex items-center p-3 bg-muted rounded-lg">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                        <span className="font-medium">{service}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Galeria de projetos */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Projetos Realizados</CardTitle>
                  <CardDescription>
                    Confira alguns dos nossos trabalhos mais recentes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {mockCompany.gallery.map((_, index) => (
                      <div
                        key={index}
                        className="aspect-square bg-gradient-to-r from-primary/20 to-solar-tertiary/20 rounded-lg flex items-center justify-center"
                      >
                        <Building2 className="h-8 w-8 text-primary" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Depoimentos */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Depoimentos de Clientes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockCompany.testimonials.map((testimonial, index) => (
                      <div key={index} className="p-4 bg-muted rounded-lg">
                        <div className="flex items-center mb-2">
                          <div className="flex items-center">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                            ))}
                          </div>
                          <span className="ml-2 font-medium text-sm">{testimonial.name}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          "{testimonial.text}"
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Estatísticas */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Estatísticas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-4 bg-primary/10 rounded-lg">
                    <div className="text-2xl font-bold text-primary">
                      {mockCompany.projectsCompleted}+
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Projetos Concluídos
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-xl font-bold text-solar-tertiary">
                        {mockCompany.yearsExperience}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Anos de Experiência
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-amber-600">
                        {mockCompany.teamSize}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Profissionais
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contato */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Informações de Contato</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-sm">
                    <Phone className="h-4 w-4 mr-3 text-muted-foreground" />
                    <span>{mockCompany.phone}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Mail className="h-4 w-4 mr-3 text-muted-foreground" />
                    <span className="break-all">{mockCompany.email}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <ExternalLink className="h-4 w-4 mr-3 text-muted-foreground" />
                    <a 
                      href={`https://${mockCompany.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline break-all"
                    >
                      {mockCompany.website}
                    </a>
                  </div>
                  <div className="flex items-start text-sm">
                    <MapPin className="h-4 w-4 mr-3 text-muted-foreground mt-0.5" />
                    <div>
                      <div>{mockCompany.address}</div>
                      <div className="text-muted-foreground">
                        {mockCompany.city}, {mockCompany.state}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Certificações */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="mr-2 h-5 w-5" />
                    Certificações
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {mockCompany.certifications.map((cert, index) => (
                      <div key={index} className="flex items-center p-2 bg-muted rounded">
                        <Award className="h-4 w-4 mr-2 text-amber-600" />
                        <span className="text-sm font-medium">{cert}</span>
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
                    <Calendar className="mr-2 h-4 w-4" />
                    Agendar Visita
                  </Button>
                  <Button variant="outline" className="w-full">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Enviar Mensagem
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Users className="mr-2 h-4 w-4" />
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
