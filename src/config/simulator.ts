import { SimulatorConfig } from '@/types'

// Configurações do simulador de economia solar
export const simulatorConfig: SimulatorConfig = {
  // Tarifa média de energia elétrica (R$/kWh) - Piauí 2024
  defaultTariff: 1.20,
  
  // Percentual de redução considerando a "taxa do sol" (Lei 14.300/2022)
  // Mesmo com a taxa, a redução fica entre 50-70%
  reductionPercentage: 60,
  
  // Custo médio do sistema por kWp instalado (R$/kWp)
  systemCostPerKwp: 5500,
  
  // Irradiação solar média no Nordeste (kWh/m²/dia)
  defaultIrradiation: 5.5,
  
  // Potência média por painel solar (W)
  panelPower: 550,
  
  // Área média por painel (m²)
  panelArea: 2.5,
  
  // Taxa de juros para financiamento (% ao ano)
  financingRate: 12,
  
  // Prazo padrão do financiamento (anos)
  financingYears: 10,
}

// Faixas de consumo para classificação
export const consumptionRanges = {
  baixo: { min: 0, max: 150, label: 'Baixo Consumo' },
  medio: { min: 151, max: 400, label: 'Consumo Médio' },
  alto: { min: 401, max: 800, label: 'Alto Consumo' },
  muitoAlto: { min: 801, max: Infinity, label: 'Consumo Muito Alto' },
}

// Bandeiras tarifárias
export const tarifFlags = {
  verde: { multiplier: 1.0, label: 'Bandeira Verde', color: '#22c55e' },
  amarela: { multiplier: 1.05, label: 'Bandeira Amarela', color: '#eab308' },
  vermelha1: { multiplier: 1.10, label: 'Bandeira Vermelha 1', color: '#f97316' },
  vermelha2: { multiplier: 1.15, label: 'Bandeira Vermelha 2', color: '#dc2626' },
}

// Disclaimer padrão para as simulações
export const simulatorDisclaimer = `
⚠️ IMPORTANTE: Esta simulação apresenta valores estimativos para fins educativos e de planejamento inicial.

Os cálculos consideram:
• A Lei 14.300/2022 ("taxa do sol") já está incluída nos percentuais de economia
• Irradiação solar média da região Nordeste
• Tarifa média atual de energia elétrica
• Custos médios de equipamentos e instalação

Para um orçamento preciso e personalizado, recomendamos uma avaliação técnica presencial com uma de nossas empresas parceiras certificadas.

A economia real pode variar conforme:
• Condições específicas do telhado
• Padrão de consumo da família
• Variações na tarifa de energia
• Qualidade dos equipamentos escolhidos
`
