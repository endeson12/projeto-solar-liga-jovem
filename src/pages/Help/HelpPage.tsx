import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  HelpCircle, 
  Search, 
  ChevronDown, 
  ChevronUp,
  MessageCircle,
  Phone,
  Mail,
  FileText,
  Video,
  Users,
  Zap,
  DollarSign,
  Building2
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

// Mock data - em produção viria da API
const faqCategories = [
  {
    id: 'geral',
    title: 'Perguntas Gerais',
    icon: HelpCircle,
    questions: [
      {
        id: '1',
        question: 'O que é o SolAr?',
        answer: 'O SolAr é uma plataforma digital que conecta comunidades periféricas, técnicos solares e empresas do setor para democratizar o acesso à energia solar. Nossa missão é tornar a energia limpa acessível para todos, promovendo desenvolvimento sustentável e economia nas contas de luz.'
      },
      {
        id: '2',
        question: 'Como funciona a plataforma?',
        answer: 'A plataforma oferece simulações de economia solar, conecta você com empresas certificadas, disponibiliza cursos de capacitação, facilita a formação de comunidades energéticas e oferece ferramentas de gestão financeira para acompanhar sua economia com energia solar.'
      },
      {
        id: '3',
        question: 'É gratuito usar o SolAr?',
        answer: 'Sim! O SolAr é completamente gratuito para usuários finais. Nosso modelo de negócio é baseado em parcerias com empresas do setor solar, que pagam uma taxa para ter acesso aos leads qualificados da plataforma.'
      }
    ]
  },
  {
    id: 'energia-solar',
    title: 'Energia Solar',
    icon: Zap,
    questions: [
      {
        id: '4',
        question: 'Como funciona a energia solar?',
        answer: 'A energia solar fotovoltaica converte a luz do sol em eletricidade através de painéis solares. A energia gerada pode ser usada imediatamente ou injetada na rede elétrica, gerando créditos que reduzem sua conta de luz.'
      },
      {
        id: '5',
        question: 'Quanto posso economizar com energia solar?',
        answer: 'A economia pode chegar a 95% da sua conta de luz. O valor exato depende do seu consumo, localização e tamanho do sistema instalado. Use nosso simulador para ter uma estimativa personalizada.'
      },
      {
        id: '6',
        question: 'Energia solar funciona em dias nublados?',
        answer: 'Sim! Mesmo em dias nublados, os painéis solares continuam gerando energia, embora em menor quantidade. O sistema é dimensionado considerando as variações climáticas da sua região.'
      }
    ]
  },
  {
    id: 'financeiro',
    title: 'Financeiro',
    icon: DollarSign,
    questions: [
      {
        id: '7',
        question: 'Como funciona o financiamento solar?',
        answer: 'Oferecemos várias opções de financiamento através de nossos parceiros: financiamento bancário, consórcio solar, leasing e parcelamento direto com as empresas instaladoras. As condições variam conforme seu perfil de crédito.'
      },
      {
        id: '8',
        question: 'Qual o tempo de retorno do investimento?',
        answer: 'O payback médio varia entre 4 a 7 anos, dependendo do seu consumo e da modalidade de financiamento escolhida. Após esse período, toda a economia é lucro líquido por mais de 20 anos.'
      },
      {
        id: '9',
        question: 'Posso acompanhar minha economia na plataforma?',
        answer: 'Sim! Nossa plataforma oferece um módulo financeiro completo onde você pode acompanhar sua economia mensal, comparar com períodos anteriores e gerar relatórios detalhados.'
      }
    ]
  },
  {
    id: 'comunidades',
    title: 'Comunidades',
    icon: Users,
    questions: [
      {
        id: '10',
        question: 'O que são comunidades energéticas?',
        answer: 'São grupos de pessoas que se unem para implementar projetos de energia solar em conjunto. Isso permite conseguir melhores preços, compartilhar conhecimento e amplificar o impacto positivo da energia solar.'
      },
      {
        id: '11',
        question: 'Como criar uma comunidade?',
        answer: 'Você pode criar uma comunidade através da plataforma, convidando vizinhos e amigos. Oferecemos suporte completo para organização, desde a formação do grupo até a negociação com empresas instaladoras.'
      },
      {
        id: '12',
        question: 'Quais as vantagens de participar de uma comunidade?',
        answer: 'Melhores preços por volume, suporte técnico compartilhado, troca de experiências, maior poder de negociação e acesso a programas de capacitação exclusivos.'
      }
    ]
  },
  {
    id: 'empresas',
    title: 'Para Empresas',
    icon: Building2,
    questions: [
      {
        id: '13',
        question: 'Como minha empresa pode se cadastrar?',
        answer: 'Empresas podem se cadastrar gratuitamente na plataforma. Após análise da documentação e certificações, você terá acesso aos leads qualificados e poderá participar do SolarMatch.'
      },
      {
        id: '14',
        question: 'O que é o SolarMatch?',
        answer: 'É nosso sistema de ranking que avalia empresas com base em qualidade, preço, prazo e satisfação dos clientes. Empresas bem avaliadas recebem mais destaque na plataforma.'
      },
      {
        id: '15',
        question: 'Qual o custo para empresas?',
        answer: 'Cobramos uma taxa de sucesso apenas quando há conversão de leads em vendas. Não há taxa de cadastro ou mensalidade. O valor varia conforme o volume de negócios.'
      }
    ]
  }
]

const supportChannels = [
  {
    title: 'Chat Online',
    description: 'Atendimento em tempo real',
    icon: MessageCircle,
    action: 'Iniciar Chat',
    available: '24/7'
  },
  {
    title: 'WhatsApp',
    description: '(86) 99999-0000',
    icon: Phone,
    action: 'Chamar no WhatsApp',
    available: 'Seg-Sex 8h-18h'
  },
  {
    title: 'E-mail',
    description: 'ajuda@solar.com.br',
    icon: Mail,
    action: 'Enviar E-mail',
    available: 'Resposta em 24h'
  }
]

const resources = [
  {
    title: 'Guia Completo de Energia Solar',
    description: 'Tudo que você precisa saber sobre energia solar',
    icon: FileText,
    type: 'PDF'
  },
  {
    title: 'Vídeos Tutoriais',
    description: 'Aprenda como usar a plataforma',
    icon: Video,
    type: 'Vídeo'
  },
  {
    title: 'Webinars Gratuitos',
    description: 'Participe de nossos eventos online',
    icon: Users,
    type: 'Evento'
  }
]

export function HelpPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null)

  // Filtrar perguntas
  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => 
    !selectedCategory || category.id === selectedCategory
  ).filter(category => 
    category.questions.length > 0
  )

  const toggleQuestion = (questionId: string) => {
    setExpandedQuestion(expandedQuestion === questionId ? null : questionId)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-solar-neutral via-background to-solar-neutral-dark">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            <HelpCircle className="inline-block mr-3 h-10 w-10 text-primary" />
            Central de Ajuda
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Encontre respostas para suas dúvidas sobre energia solar, nossa plataforma e como aproveitar ao máximo o SolAr.
          </p>
        </motion.div>

        {/* Busca e filtros */}
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
                      placeholder="Buscar por perguntas ou palavras-chave..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="md:w-64">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                  >
                    <option value="">Todas as Categorias</option>
                    {faqCategories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FAQ */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Perguntas Frequentes
              </h2>
              
              {filteredCategories.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <HelpCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Nenhuma pergunta encontrada
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Tente ajustar sua busca ou entre em contato conosco.
                    </p>
                    <Button variant="outline" onClick={() => {
                      setSearchTerm('')
                      setSelectedCategory('')
                    }}>
                      Limpar Filtros
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-6">
                  {filteredCategories.map((category) => (
                    <Card key={category.id}>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <category.icon className="mr-2 h-5 w-5 text-primary" />
                          {category.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {category.questions.map((question) => (
                            <div key={question.id} className="border rounded-lg">
                              <button
                                onClick={() => toggleQuestion(question.id)}
                                className="w-full p-4 text-left flex items-center justify-between hover:bg-muted transition-colors"
                              >
                                <span className="font-medium text-foreground">
                                  {question.question}
                                </span>
                                {expandedQuestion === question.id ? (
                                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                                ) : (
                                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                )}
                              </button>
                              
                              {expandedQuestion === question.id && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="px-4 pb-4"
                                >
                                  <div className="pt-2 border-t">
                                    <p className="text-muted-foreground leading-relaxed">
                                      {question.answer}
                                    </p>
                                  </div>
                                </motion.div>
                              )}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Canais de suporte */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Precisa de Mais Ajuda?</CardTitle>
                  <CardDescription>
                    Nossa equipe está pronta para ajudar você
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {supportChannels.map((channel, index) => (
                    <div key={index} className="p-4 border rounded-lg hover:bg-muted transition-colors">
                      <div className="flex items-start">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                          <channel.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground mb-1">
                            {channel.title}
                          </h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            {channel.description}
                          </p>
                          <div className="text-xs text-muted-foreground mb-3">
                            {channel.available}
                          </div>
                          <Button variant="outline" size="sm" className="w-full">
                            {channel.action}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Recursos úteis */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Recursos Úteis</CardTitle>
                  <CardDescription>
                    Materiais para aprender mais sobre energia solar
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {resources.map((resource, index) => (
                    <div key={index} className="flex items-center p-3 border rounded-lg hover:bg-muted transition-colors cursor-pointer">
                      <div className="w-8 h-8 bg-primary/10 rounded mr-3 flex items-center justify-center">
                        <resource.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{resource.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {resource.description}
                        </div>
                      </div>
                      <div className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        {resource.type}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Feedback */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card className="bg-gradient-to-r from-primary/10 to-solar-tertiary/10 border-primary/20">
                <CardContent className="p-6 text-center">
                  <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    Não encontrou sua resposta?
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Envie sua pergunta e nossa equipe responderá em breve.
                  </p>
                  <Button variant="solar" className="w-full">
                    Enviar Pergunta
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
