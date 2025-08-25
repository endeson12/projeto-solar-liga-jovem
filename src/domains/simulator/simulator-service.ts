import { SimulationInput, SimulationResult } from '@/types'
import { simulatorConfig, simulatorDisclaimer } from '@/config/simulator'

class SimulatorService {
  /**
   * Calcula a simulação de economia solar baseada nos dados de entrada
   */
  async calculateSolarEconomy(input: SimulationInput): Promise<SimulationResult> {
    // Simular delay de processamento
    await new Promise(resolve => setTimeout(resolve, 1500))

    const {
      monthlyBill,
      monthlyConsumption,
      tariff = simulatorConfig.defaultTariff,
      irradiation = simulatorConfig.defaultIrradiation,
    } = input

    // Calcular consumo mensal se não fornecido
    const calculatedConsumption = monthlyConsumption || (monthlyBill / tariff)

    // Calcular economia considerando a "taxa do sol"
    const reductionFactor = simulatorConfig.reductionPercentage / 100
    const monthlySavings = monthlyBill * reductionFactor
    const yearlySavings = monthlySavings * 12

    // Dimensionar o sistema solar
    const systemPower = this.calculateSystemPower(calculatedConsumption, irradiation)
    const systemCost = systemPower * simulatorConfig.systemCostPerKwp
    const panelsNeeded = Math.ceil(systemPower * 1000 / simulatorConfig.panelPower)
    const systemArea = panelsNeeded * simulatorConfig.panelArea

    // Calcular payback
    const paybackMonths = systemCost / monthlySavings
    const paybackYears = Math.floor(paybackMonths / 12)
    const remainingMonths = Math.round(paybackMonths % 12)

    // Calcular financiamento
    const monthlyRate = simulatorConfig.financingRate / 100 / 12
    const totalPayments = simulatorConfig.financingYears * 12
    const monthlyPayment = this.calculateMonthlyPayment(systemCost, monthlyRate, totalPayments)
    const totalFinancingCost = monthlyPayment * totalPayments

    const result: SimulationResult = {
      input: {
        monthlyBill,
        monthlyConsumption: calculatedConsumption,
        tariff,
        irradiation,
      },
      estimatedSavings: {
        monthly: monthlySavings,
        yearly: yearlySavings,
        percentage: simulatorConfig.reductionPercentage,
      },
      systemSpecs: {
        power: systemPower,
        estimatedCost: systemCost,
        panels: panelsNeeded,
        area: systemArea,
      },
      payback: {
        years: paybackYears,
        months: remainingMonths,
      },
      financing: {
        monthlyPayment,
        totalCost: totalFinancingCost,
        interestRate: simulatorConfig.financingRate,
      },
      disclaimer: simulatorDisclaimer,
      generatedAt: new Date().toISOString(),
    }

    return result
  }

  /**
   * Calcula a potência necessária do sistema solar (kWp)
   */
  private calculateSystemPower(monthlyConsumption: number, irradiation: number): number {
    // Fórmula simplificada: Potência = Consumo mensal / (Irradiação * 30 dias * Eficiência)
    // Considerando eficiência de 80% do sistema
    const efficiency = 0.8
    const dailyGeneration = irradiation * efficiency
    const monthlyGeneration = dailyGeneration * 30
    
    return Math.round((monthlyConsumption / monthlyGeneration) * 100) / 100
  }

  /**
   * Calcula a parcela mensal do financiamento usando a fórmula Price
   */
  private calculateMonthlyPayment(principal: number, monthlyRate: number, periods: number): number {
    if (monthlyRate === 0) return principal / periods
    
    const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, periods)) / 
                   (Math.pow(1 + monthlyRate, periods) - 1)
    
    return Math.round(payment * 100) / 100
  }

  /**
   * Valida os dados de entrada da simulação
   */
  validateInput(input: SimulationInput): { isValid: boolean; errors: string[] } {
    const errors: string[] = []

    if (!input.monthlyBill || input.monthlyBill <= 0) {
      errors.push('O valor da conta de luz deve ser maior que zero')
    }

    if (input.monthlyBill > 10000) {
      errors.push('Valor da conta muito alto. Verifique se está correto.')
    }

    if (input.monthlyConsumption && input.monthlyConsumption <= 0) {
      errors.push('O consumo mensal deve ser maior que zero')
    }

    if (input.tariff && (input.tariff <= 0 || input.tariff > 5)) {
      errors.push('A tarifa deve estar entre R$ 0,01 e R$ 5,00 por kWh')
    }

    if (input.irradiation && (input.irradiation < 3 || input.irradiation > 8)) {
      errors.push('A irradiação deve estar entre 3 e 8 kWh/m²/dia')
    }

    return {
      isValid: errors.length === 0,
      errors,
    }
  }

  /**
   * Gera sugestões baseadas no perfil de consumo
   */
  generateRecommendations(result: SimulationResult): string[] {
    const recommendations: string[] = []
    const { monthlyConsumption } = result.input
    const { monthly: monthlySavings } = result.estimatedSavings
    const { monthlyPayment } = result.financing

    if (!monthlyConsumption) return recommendations

    // Recomendações baseadas no consumo
    if (monthlyConsumption < 150) {
      recommendations.push('💡 Seu consumo é baixo. Um sistema pequeno já trará ótima economia!')
    } else if (monthlyConsumption > 500) {
      recommendations.push('⚡ Alto consumo detectado. A energia solar será especialmente vantajosa para você!')
    }

    // Recomendações sobre financiamento
    if (monthlyPayment <= monthlySavings * 0.8) {
      recommendations.push('💰 Excelente! A parcela do financiamento é menor que sua economia mensal.')
    }

    // Recomendações sobre payback
    if (result.payback.years <= 5) {
      recommendations.push('🚀 Payback rápido! Seu investimento se paga em poucos anos.')
    }

    // Recomendação ambiental
    const co2Avoided = monthlyConsumption * 0.0817 * 12 // kg CO2/ano
    recommendations.push(`🌱 Você evitará ${Math.round(co2Avoided)} kg de CO₂ por ano!`)

    return recommendations
  }

  /**
   * Calcula diferentes cenários de financiamento
   */
  calculateFinancingScenarios(systemCost: number): Array<{
    years: number
    monthlyPayment: number
    totalCost: number
    totalInterest: number
  }> {
    const scenarios = [5, 7, 10, 15] // anos
    const monthlyRate = simulatorConfig.financingRate / 100 / 12

    return scenarios.map(years => {
      const periods = years * 12
      const monthlyPayment = this.calculateMonthlyPayment(systemCost, monthlyRate, periods)
      const totalCost = monthlyPayment * periods
      const totalInterest = totalCost - systemCost

      return {
        years,
        monthlyPayment,
        totalCost,
        totalInterest,
      }
    })
  }
}

export const simulatorService = new SimulatorService()
