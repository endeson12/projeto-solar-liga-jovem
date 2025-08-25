import { motion } from 'framer-motion'
import { BookOpen, Play, Award, Clock, Users, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const mockCourses = [
  {
    id: '1',
    title: 'Fundamentos da Energia Solar',
    description: 'Aprenda os conceitos básicos sobre energia fotovoltaica e como ela funciona.',
    level: 'Básico',
    duration: 120,
    students: 1250,
    rating: 4.8,
    progress: 75,
    thumbnail: '/course-1.jpg'
  },
  {
    id: '2',
    title: 'Instalação de Sistemas Solares',
    description: 'Técnicas práticas para instalação segura e eficiente de painéis solares.',
    level: 'Intermediário',
    duration: 180,
    students: 890,
    rating: 4.9,
    progress: 0,
    thumbnail: '/course-2.jpg'
  },
  {
    id: '3',
    title: 'Manutenção e Troubleshooting',
    description: 'Como identificar e resolver problemas comuns em sistemas solares.',
    level: 'Avançado',
    duration: 150,
    students: 456,
    rating: 4.7,
    progress: 0,
    thumbnail: '/course-3.jpg'
  }
]

export function LearningPage() {
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
            <BookOpen className="inline-block mr-3 h-10 w-10 text-primary" />
            Área de Aprendizagem
          </h1>
          <p className="text-xl text-muted-foreground dark:text-white max-w-3xl mx-auto">
            Desenvolva suas habilidades em energia solar com nossos cursos gratuitos e certificações reconhecidas.
          </p>
        </motion.div>

        {/* Progresso do usuário */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="solar-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="mr-2 h-5 w-5 text-primary" />
                Seu Progresso
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">3</div>
                  <div className="text-sm text-muted-foreground">Cursos Concluídos</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-solar-tertiary mb-2">450</div>
                  <div className="text-sm text-muted-foreground">Minutos de Estudo</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-600 mb-2">2</div>
                  <div className="text-sm text-muted-foreground">Certificados Obtidos</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Lista de cursos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-video bg-gradient-to-r from-primary/20 to-solar-tertiary/20 rounded-t-lg flex items-center justify-center">
                  <Play className="h-12 w-12 text-primary" />
                </div>
                
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${
                      course.level === 'Básico' ? 'bg-green-100 dark:bg-green-900/80 text-green-800 dark:text-green-100 border-green-300 dark:border-green-800/50' :
                      course.level === 'Intermediário' ? 'bg-yellow-100 dark:bg-yellow-900/80 text-yellow-800 dark:text-yellow-100 border-yellow-300 dark:border-yellow-800/50' :
                      'bg-red-100 dark:bg-red-900/80 text-red-800 dark:text-red-100 border-red-300 dark:border-red-800/50'
                    }`}>
                      {course.level}
                    </span>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      {course.rating}
                    </div>
                  </div>
                  
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {course.duration} min
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {course.students} alunos
                    </div>
                  </div>
                  
                  {course.progress > 0 && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progresso</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  <Button 
                    variant={course.progress > 0 ? "solar" : "outline"} 
                    className="w-full"
                  >
                    {course.progress > 0 ? 'Continuar' : 'Começar Curso'}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA para certificação */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Card className="bg-gradient-to-r from-primary/10 to-solar-tertiary/10 border-primary/20">
            <CardContent className="p-8 text-center">
              <Award className="h-16 w-16 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Obtenha sua Certificação Profissional
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Complete nossa trilha de aprendizagem e receba um certificado reconhecido 
                pelo mercado de energia solar. Aumente suas chances de conseguir um emprego na área!
              </p>
              <Button variant="solar" size="lg">
                Ver Trilha de Certificação
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
