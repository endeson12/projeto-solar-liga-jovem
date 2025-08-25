import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { 
  Calculator, 
  Sun, 
  Zap, 
  TrendingUp, 
  Download, 
  Info,
  DollarSign,
  Calendar,
  Leaf,
  ArrowRight,
  Lightbulb
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { simulatorService } from '@/domains/simulator/simulator-service'
import { SimulationResult } from '@/types'
import { formatCurrency, formatNumber } from '@/lib/utils'

// Schema de validação
const simulatorSchema = z.object({
  monthlyBill: z.number().min(30, 'Valor mínimo: R$ 30,00').max(10000, 'Valor máximo: R$ 10.000,00'),
  monthlyConsumption: z.number().optional(),
  tariff: z.number().optional(),
  irradiation: z.number().optional(),
})

type SimulatorFormData = z.infer<typeof simulatorSchema>

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

export function SimulatorPage() {
  const [result, setResult] = useState<SimulationResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<SimulatorFormData>({
    resolver: zodResolver(simulatorSchema),
  })

  const monthlyBill = watch('monthlyBill')

  const onSubmit = async (data: SimulatorFormData) => {
    try {
      setIsLoading(true)
      
      const validation = simulatorService.validateInput(data)
      if (!validation.isValid) {
        toast({
          title: 'Dados inválidos',
          description: validation.errors.join(', '),
          variant: 'destructive',
        })
        return
      }

      const simulationResult = await simulatorService.calculateSolarEconomy(data)
      setResult(simulationResult)
      
      toast({
        title: 'Simulação concluída!',
        description: 'Confira os resultados abaixo.',
      })
    } catch (error) {
      toast({
        title: 'Erro na simulação',
        description: 'Tente novamente em alguns instantes.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownloadPDF = () => {
    // TODO: Implementar geração de PDF
    toast({
      title: 'Em desenvolvimento',
      description: 'A funcionalidade de PDF será implementada em breve.',
    })
  }

  const recommendations = result ? simulatorService.generateRecommendations(result) : []

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
            <Calculator className="inline-block mr-3 h-10 w-10 text-primary" />
            Simulador Solar
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Descubra quanto você pode economizar com energia solar. 
            Nossa calculadora já considera a Lei 14.300/2022 ("taxa do sol").
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulário */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sun className="mr-2 h-5 w-5 text-primary" />
                  Calcule sua Economia
                </CardTitle>
                <CardDescription>
                  Preencha os dados abaixo para uma simulação personalizada
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Valor da conta */}
                  <div className="space-y-2">
                    <Label htmlFor="monthlyBill" className="text-sm font-medium">
                      Valor médio da sua conta de luz (R$) *
                    </Label>
                    <Input
                      id="monthlyBill"
                      type="number"
                      step="0.01"
                      placeholder="Ex: 250.00"
                      {...register('monthlyBill', { valueAsNumber: true })}
                      className="text-lg"
                    />
                    {errors.monthlyBill && (
                      <p className="text-sm text-destructive">{errors.monthlyBill.message}</p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      💡 Dica: Use a média dos últimos 3 meses para maior precisão
                    </p>
                  </div>

                  {/* Campos opcionais */}
                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-4 flex items-center">
                      <Info className="mr-2 h-4 w-4" />
                      Informações Opcionais (para maior precisão)
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="monthlyConsumption" className="text-sm">
                          Consumo mensal (kWh)
                        </Label>
                        <Input
                          id="monthlyConsumption"
                          type="number"
                          placeholder="Ex: 200"
                          {...register('monthlyConsumption', { valueAsNumber: true })}
                        />
                        <p className="text-xs text-muted-foreground">
                          Encontre na sua conta de luz
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="tariff" className="text-sm">
                          Tarifa (R$/kWh)
                        </Label>
                        <Input
                          id="tariff"
                          type="number"
                          step="0.01"
                          placeholder="Ex: 1.20"
                          {...register('tariff', { valueAsNumber: true })}
                        />
                        <p className="text-xs text-muted-foreground">
                          Padrão: R$ 1,20/kWh
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    variant="solar" 
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Calculando...
                      </>
                    ) : (
                      <>
                        <Calculator className="mr-2 h-4 w-4" />
                        Calcular Economia
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Resultados */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {result ? (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                {/* Economia Principal */}
                <motion.div variants={cardVariants}>
                  <Card className="solar-shadow">
                    <CardHeader className="text-center">
                      <CardTitle className="text-2xl text-primary">
                        🎉 Parabéns! Você pode economizar:
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <div className="text-4xl md:text-5xl font-bold solar-text-gradient mb-2">
                        {formatCurrency(result.estimatedSavings.monthly * 100)}
                      </div>
                      <div className="text-lg text-muted-foreground mb-4">
                        por mês ({result.estimatedSavings.percentage}% de economia)
                      </div>
                      <div className="text-xl font-semibold">
                        {formatCurrency(result.estimatedSavings.yearly * 100)} por ano
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Detalhes do Sistema */}
                <motion.div variants={cardVariants}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Zap className="mr-2 h-5 w-5" />
                        Especificações do Sistema
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">
                            {formatNumber(result.systemSpecs.power, 1)} kWp
                          </div>
                          <div className="text-sm text-muted-foreground">Potência</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">
                            {result.systemSpecs.panels}
                          </div>
                          <div className="text-sm text-muted-foreground">Painéis</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">
                            {formatNumber(result.systemSpecs.area, 1)} m²
                          </div>
                          <div className="text-sm text-muted-foreground">Área necessária</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">
                            {formatCurrency(result.systemSpecs.estimatedCost * 100)}
                          </div>
                          <div className="text-sm text-muted-foreground">Investimento</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Payback e Financiamento */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div variants={cardVariants}>
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center text-lg">
                          <TrendingUp className="mr-2 h-5 w-5" />
                          Retorno do Investimento
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-solar-tertiary mb-1">
                            {result.payback.years} anos
                          </div>
                          {result.payback.months > 0 && (
                            <div className="text-lg text-muted-foreground">
                              e {result.payback.months} meses
                            </div>
                          )}
                          <p className="text-sm text-muted-foreground mt-2">
                            Tempo para recuperar o investimento
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div variants={cardVariants}>
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center text-lg">
                          <DollarSign className="mr-2 h-5 w-5" />
                          Financiamento
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-primary mb-1">
                            {formatCurrency(result.financing.monthlyPayment * 100)}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            parcela mensal em 10 anos
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            Taxa: {result.financing.interestRate}% ao ano
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>

                {/* Recomendações */}
                {recommendations.length > 0 && (
                  <motion.div variants={cardVariants}>
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Lightbulb className="mr-2 h-5 w-5" />
                          Recomendações Personalizadas
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {recommendations.map((rec, index) => (
                            <li key={index} className="text-sm">
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* Ações */}
                <motion.div variants={cardVariants}>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button variant="solar" size="lg" className="flex-1" onClick={handleDownloadPDF}>
                          <Download className="mr-2 h-4 w-4" />
                          Baixar Relatório PDF
                        </Button>
                        <Button variant="outline" size="lg" className="flex-1" asChild>
                          <a href="/empresas">
                            <ArrowRight className="mr-2 h-4 w-4" />
                            Encontrar Instaladores
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Disclaimer */}
                <motion.div variants={cardVariants}>
                  <Card className="border-amber-200 bg-amber-50 dark:bg-amber-950/20">
                    <CardContent className="pt-6">
                      <div className="flex items-start space-x-3">
                        <Info className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-amber-800 dark:text-amber-200">
                          <p className="font-medium mb-2">Importante:</p>
                          <p>
                            Esta simulação apresenta valores estimativos para fins educativos. 
                            Os cálculos já consideram a Lei 14.300/2022 ("taxa do sol"). 
                            Para um orçamento preciso, recomendamos uma avaliação técnica presencial.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ) : (
              /* Estado inicial */
              <Card className="h-96 flex items-center justify-center">
                <CardContent className="text-center">
                  <Sun className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                    Pronto para descobrir sua economia?
                  </h3>
                  <p className="text-muted-foreground">
                    Preencha o formulário ao lado para ver os resultados da sua simulação solar.
                  </p>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>

        {/* Seção de Transparência */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card className="max-w-4xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">
                Transparência sobre a "Taxa do Sol"
              </CardTitle>
              <CardDescription>
                Entenda o que mudou com a Lei 14.300/2022 e por que ainda compensa
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Info className="h-6 w-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold mb-2">O que mudou</h4>
                  <p className="text-sm text-muted-foreground">
                    Cobrança gradual pela infraestrutura da rede elétrica (TUSD Fio B)
                  </p>
                </div>
                
                <div>
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <h4 className="font-semibold mb-2">Por que ainda compensa</h4>
                  <p className="text-sm text-muted-foreground">
                    Economia de 50% a 70% mesmo com a taxa, mantendo alta viabilidade
                  </p>
                </div>
                
                <div>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Calculator className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">Nossa garantia</h4>
                  <p className="text-sm text-muted-foreground">
                    Simulações sempre atualizadas com a legislação vigente
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
