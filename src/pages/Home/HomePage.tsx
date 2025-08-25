import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Sun, 
  Users, 
  GraduationCap, 
  Building2, 
  Calculator,
  Zap,
  Leaf,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Heart
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const heroVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
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
      staggerChildren: 0.2
    }
  }
}

const benefits = [
  {
    icon: Users,
    title: 'Para Moradores',
    description: 'Reduza até 70% da sua conta de luz e gere renda extra com energia solar.',
    features: ['Economia garantida', 'Financiamento facilitado', 'Suporte completo']
  },
  {
    icon: GraduationCap,
    title: 'Para Técnicos',
    description: 'Aprenda uma profissão do futuro com alta demanda no mercado.',
    features: ['Cursos gratuitos', 'Certificação reconhecida', 'Oportunidades de trabalho']
  },
  {
    icon: Building2,
    title: 'Para Empresas',
    description: 'Encontre técnicos qualificados e expanda seus negócios.',
    features: ['Técnicos certificados', 'Leads qualificados', 'Parcerias estratégicas']
  },
  {
    icon: Heart,
    title: 'Para a Comunidade',
    description: 'Fortaleça laços comunitários e promova desenvolvimento sustentável.',
    features: ['Impacto social', 'Sustentabilidade', 'Desenvolvimento local']
  }
]

const howItWorks = [
  {
    step: '1',
    title: 'Simule sua Economia',
    description: 'Use nossa calculadora gratuita para descobrir quanto você pode economizar com energia solar.',
    icon: Calculator
  },
  {
    step: '2',
    title: 'Conecte-se com Especialistas',
    description: 'Encontre empresas e técnicos certificados em sua região através do SolarMatch.',
    icon: Users
  },
  {
    step: '3',
    title: 'Transforme sua Realidade',
    description: 'Instale seu sistema solar e comece a economizar enquanto ajuda o meio ambiente.',
    icon: Zap
  }
]

const impactNumbers = [
  { number: '2.500+', label: 'Famílias Beneficiadas', icon: Users },
  { number: 'R$ 1.2M', label: 'Economia Gerada', icon: TrendingUp },
  { number: '150+', label: 'Técnicos Formados', icon: GraduationCap },
  { number: '45 ton', label: 'CO₂ Evitado', icon: Leaf }
]

export function HomePage() {
  return (
    <div className="min-h-screen bg-solar-gradient">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-solar-hero solar-glow solar-rays">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="text-center"
            variants={heroVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="inline-flex items-center px-6 py-3 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-primary text-sm font-medium mb-8 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sun className="mr-2 h-4 w-4" />
              Energia do Sol para Todos
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white dark:text-white mb-6 drop-shadow-lg">
              Projeto{' '}
              <span className="text-yellow-300 drop-shadow-md">SolAr</span>
            </h1>
            
            <h2 className="text-xl md:text-2xl lg:text-3xl font-heading font-semibold text-white/90 dark:text-white/90 mb-8 drop-shadow-md">
              Energia do Sol para Todos
            </h2>
            <p className="text-lg md:text-xl text-white/80 dark:text-white/80 mb-12 max-w-3xl mx-auto drop-shadow-sm">
              Economize na conta de luz, aprenda uma nova profissão e fortaleça sua comunidade. 
              Descubra como a energia solar pode transformar sua vida.
            </p>
            
            {/* CTAs principais */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={cardVariants}>
                <Button size="lg" variant="solar" asChild className="text-lg px-8 py-4">
                  <Link to="/simulador">
                    <Calculator className="mr-2 h-5 w-5" />
                    Simule sua Economia
                  </Link>
                </Button>
              </motion.div>
              
              <motion.div variants={cardVariants}>
                <Button size="lg" variant="outline" asChild className="text-lg px-8 py-4">
                  <Link to="/auth/register?type=tecnico">
                    <GraduationCap className="mr-2 h-5 w-5" />
                    Quero ser Técnico Solar
                  </Link>
                </Button>
              </motion.div>
              
              <motion.div variants={cardVariants}>
                <Button size="lg" variant="outline" asChild className="text-lg px-8 py-4">
                  <Link to="/auth/register?type=empresa">
                    <Building2 className="mr-2 h-5 w-5" />
                    Sou uma Empresa
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* O que é o SolAr */}
      <section className="py-20 bg-solar-section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
              O que é o SolAr?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              O SolAr é mais que uma plataforma - é um movimento de transformação social através da energia solar. 
              Conectamos moradores, técnicos e empresas para criar um ecossistema sustentável que beneficia toda a comunidade.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <motion.div key={index} variants={cardVariants}>
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 solar-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-xl">{benefit.title}</CardTitle>
                      <CardDescription>{benefit.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {benefit.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm">
                            <CheckCircle className="h-4 w-4 text-solar-tertiary mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
              Como Funciona
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Em apenas 3 passos simples, você pode começar sua jornada rumo à independência energética.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {howItWorks.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  className="text-center"
                >
                  <div className="relative">
                    <div className="w-20 h-20 solar-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                      <Icon className="h-10 w-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-solar-secondary text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-foreground mb-4">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {step.description}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Números de Impacto */}
      <section className="py-20 bg-solar-section-alt solar-glow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
              Nosso Impacto
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Juntos, estamos construindo um futuro mais sustentável e próspero para nossas comunidades.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {impactNumbers.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-solar-tertiary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-solar-tertiary" />
                  </div>
                  <div className="text-3xl md:text-4xl font-heading font-bold solar-text-gradient mb-2">
                    {item.number}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {item.label}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Transparência sobre a Taxa do Sol */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
              Transparência Total
            </h2>
            <h3 className="text-xl font-semibold text-muted-foreground mb-8">
              A "Taxa do Sol": o que mudou e por que ainda compensa
            </h3>
            
            <Card className="text-left">
              <CardContent className="p-8">
                <p className="text-lg mb-6">
                  Sabemos que você pode ter ouvido falar da <strong>Lei 14.300/2022</strong> (conhecida como "taxa do sol"). 
                  Queremos ser totalmente transparentes sobre o que isso significa para você:
                </p>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-solar-tertiary mt-1 flex-shrink-0" />
                    <div>
                      <strong>O que mudou:</strong> A partir de 2023, há uma cobrança gradual pela 
                      infraestrutura da rede elétrica (TUSD Fio B).
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-solar-tertiary mt-1 flex-shrink-0" />
                    <div>
                      <strong>Por que ainda compensa:</strong> Mesmo com a taxa, a economia continua 
                      sendo de 50% a 70% na conta de luz, mantendo o investimento altamente vantajoso.
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-solar-tertiary mt-1 flex-shrink-0" />
                    <div>
                      <strong>Nosso compromisso:</strong> Todas as nossas simulações já consideram 
                      essa taxa, garantindo que você tenha informações reais e atualizadas.
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <Button variant="solar" size="lg" asChild>
                    <Link to="/simulador">
                      <Calculator className="mr-2 h-5 w-5" />
                      Faça sua Simulação Atualizada
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-solar-hero solar-glow solar-rays text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              Pronto para Transformar sua Vida?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Junte-se a milhares de pessoas que já descobriram o poder da energia solar.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="solar" asChild>
                <Link to="/simulador">
                  <Sun className="mr-2 h-5 w-5" />
                  Começar Agora
                </Link>
              </Button>
              
              <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-solar-secondary">
                <Link to="/comunidades">
                  <Users className="mr-2 h-5 w-5" />
                  Ver Comunidades
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
