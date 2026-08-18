export interface ProfessionalExperience {
  position: string
  company: string
  startDate: string
  endDate?: string
}

export interface Certification {
  name: string
  issuer: string
  date: string
}

export interface ProfileUser {
  name?: string
  email?: string
  phone?: string
  address?: string
  cpf?: string
  birthDate?: string
  communityId?: string
  gender?: string
  companyName?: string
  tradingName?: string
  cnpj?: string
  stateRegistration?: string
  responsibleName?: string
  experience?: ProfessionalExperience[]
  skills?: string[]
  certifications?: Certification[]
  contractType?: string
  availability?: string
}
