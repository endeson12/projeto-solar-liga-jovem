import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  CheckCircle, 
  Clock, 
  BookOpen,
  Award,
  Download
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'

// Mock data - em produção viria da API
const mockModule = {
  id: '1',
  title: 'Fundamentos da Energia Solar',
  description: 'Aprenda os conceitos básicos sobre energia fotovoltaica e como ela funciona.',
  duration: 120,
  videoUrl: 'https://example.com/video.mp4',
  content: `
# Introdução à Energia Solar

A energia solar fotovoltaica é uma tecnologia que converte a luz solar diretamente em eletricidade através do efeito fotovoltaico.

## Como Funciona

1. **Captação da Luz Solar**: Os painéis solares captam a radiação solar
2. **Conversão Fotovoltaica**: As células convertem luz em eletricidade DC
3. **Inversão**: O inversor converte DC em AC para uso doméstico
4. **Distribuição**: A energia é distribuída pela instalação elétrica

## Benefícios

- Redução na conta de luz
- Energia limpa e renovável
- Valorização do imóvel
- Baixa manutenção
  `,
  quiz: [
    {
      question: 'O que é o efeito fotovoltaico?',
      options: [
        'Conversão de luz em calor',
        'Conversão de luz em eletricidade',
        'Conversão de calor em eletricidade',
        'Conversão de vento em eletricidade'
      ],
      correct: 1
    }
  ]
}

export function ModulePage() {
  const { moduleId } = useParams()
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(65)
  const [quizAnswers, setQuizAnswers] = useState<number[]>([])
  const { toast } = useToast()

  const handleCompleteModule = () => {
    toast({
      title: 'Módulo concluído!',
      description: 'Parabéns! Você completou este módulo com sucesso.',
    })
  }

  const handleDownloadCertificate = () => {
    toast({
      title: 'Certificado em desenvolvimento',
      description: 'A funcionalidade de certificado será implementada em breve.',
    })
  }

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
            <Link to="/aprendizagem">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar aos Cursos
            </Link>
          </Button>
          
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">
            {mockModule.title}
          </h1>
          <p className="text-lg text-muted-foreground mb-4">
            {mockModule.description}
          </p>
          
          {/* Progresso */}
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-1">
                <span>Progresso do Módulo</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              {mockModule.duration} min
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Conteúdo principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Player de vídeo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardContent className="p-0">
                  <div className="aspect-video bg-gradient-to-r from-primary/20 to-solar-tertiary/20 rounded-t-lg flex items-center justify-center">
                    <Button
                      variant="solar"
                      size="lg"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="rounded-full w-16 h-16"
                    >
                      {isPlaying ? (
                        <Pause className="h-8 w-8" />
                      ) : (
                        <Play className="h-8 w-8 ml-1" />
                      )}
                    </Button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">Vídeo Aula</h3>
                    <p className="text-sm text-muted-foreground">
                      Assista ao conteúdo em vídeo para uma melhor compreensão dos conceitos.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Conteúdo textual */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="mr-2 h-5 w-5" />
                    Material de Apoio
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <div className="whitespace-pre-line text-sm">
                    {mockModule.content}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quiz */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Quiz de Verificação</CardTitle>
                  <CardDescription>
                    Teste seus conhecimentos sobre o conteúdo estudado
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {mockModule.quiz.map((question, qIndex) => (
                    <div key={qIndex} className="space-y-4">
                      <h4 className="font-medium">{question.question}</h4>
                      <div className="space-y-2">
                        {question.options.map((option, oIndex) => (
                          <label
                            key={oIndex}
                            className="flex items-center space-x-3 p-3 rounded-lg border cursor-pointer hover:bg-accent"
                          >
                            <input
                              type="radio"
                              name={`question-${qIndex}`}
                              value={oIndex}
                              onChange={() => {
                                const newAnswers = [...quizAnswers]
                                newAnswers[qIndex] = oIndex
                                setQuizAnswers(newAnswers)
                              }}
                              className="text-primary"
                            />
                            <span className="text-sm">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  <Button 
                    variant="solar" 
                    className="mt-6"
                    onClick={handleCompleteModule}
                  >
                    Finalizar Módulo
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Informações do curso */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Informações do Curso</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Duração</span>
                    <span className="text-sm font-medium">{mockModule.duration} min</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Nível</span>
                    <span className="text-sm font-medium">Básico</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Certificado</span>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Ações */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Ações</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={handleDownloadCertificate}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Baixar Material
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Award className="mr-2 h-4 w-4" />
                    Ver Certificado
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Próximos módulos */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Próximos Módulos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg border">
                      <h4 className="font-medium text-sm mb-1">
                        Componentes de um Sistema Solar
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Painéis, inversores e outros equipamentos
                      </p>
                    </div>
                    <div className="p-3 rounded-lg border opacity-50">
                      <h4 className="font-medium text-sm mb-1">
                        Dimensionamento de Sistemas
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Como calcular o tamanho ideal
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
