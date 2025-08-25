import { useAuth } from '@/domains/auth/use-auth'
// Using a simple div as a fallback for the Skeleton component
const Skeleton = ({ className }: { className: string }) => (
  <div className={`animate-pulse bg-muted rounded-md ${className}`} />
)
import { ClientProfile } from '@/components/profiles/ClientProfile'
import { CompanyProfile } from '@/components/profiles/CompanyProfile'
import { WorkerProfile } from '@/components/profiles/WorkerProfile'

// Mock data for demonstration purposes
type MockUserData = {
  [key: string]: any;
  CLIENT: any;
  EMPRESA: any;
  MEMBRO: any;
};

const mockUserData: MockUserData = {
  CLIENT: {
    name: 'João da Silva',
    email: 'joao@example.com',
    phone: '(11) 98765-4321',
    cpf: '123.456.789-00',
    birthDate: '15/05/1985',
    address: 'Rua das Flores, 123 - São Paulo/SP',
    communityId: 'Solaris 123',
    gender: 'Masculino'
  },
  EMPRESA: {
    name: 'Energia Solar Ltda',
    email: 'contato@energiasolar.com',
    phone: '(11) 3456-7890',
    companyName: 'Energia Solar Eficiente Ltda',
    tradingName: 'Energia Solar',
    cnpj: '12.345.678/0001-90',
    stateRegistration: '123.456.789.112',
    address: 'Av. Paulista, 1000 - São Paulo/SP',
    responsibleName: 'Carlos Eduardo'
  },
  MEMBRO: {
    name: 'Ana Paula Oliveira',
    email: 'ana.oliveira@example.com',
    phone: '(11) 99876-5432',
    cpf: '987.654.321-00',
    birthDate: '22/10/1990',
    address: 'Rua das Palmeiras, 45 - São Paulo/SP',
    gender: 'Feminino',
    skills: ['Instalação de painéis solares', 'Manutenção elétrica', 'Vendas técnicas'],
    certifications: [
      { name: 'Instalador Solar Fotovoltaico', issuer: 'SENAI', date: '2022' },
      { name: 'NR-10', issuer: 'SENAC', date: '2021' }
    ],
    experience: [
      {
        position: 'Técnico em Energia Solar',
        company: 'SolarTech',
        startDate: '01/2021',
        endDate: 'Presente'
      },
      {
        position: 'Auxiliar de Instalação',
        company: 'EcoEnergia',
        startDate: '06/2019',
        endDate: '12/2020'
      }
    ],
    contractType: 'CLT',
    availability: 'Tempo integral'
  }
}

export function AccountPage() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 space-y-4">
        <Skeleton className="h-8 w-64" />
        <div className="grid gap-4 md:grid-cols-2">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="container mx-auto p-6">
        <p>Você precisa estar logado para acessar esta página.</p>
      </div>
    )
  }

  // Determine which profile component to render based on user role
  const renderProfile = () => {
    // For demo purposes, we'll use mock data based on role
    // Default to 'CLIENT' for 'ADMIN' role or any other unexpected role
    const roleKey = user.role === 'ADMIN' || !['EMPRESA', 'MEMBRO'].includes(user.role) 
      ? 'CLIENT' 
      : user.role;
      
    const userData = { ...user, ...mockUserData[roleKey] };
    
    if (user.role === 'EMPRESA') {
      return <CompanyProfile user={userData} />;
    }
    
    if (user.role === 'MEMBRO') {
      return <WorkerProfile user={userData} />;
    }
    
    // Default to ClientProfile for ADMIN or any other role
    return <ClientProfile user={userData} />;
  }

  return (
    <div className="container mx-auto p-6">
      {renderProfile()}
    </div>
  )
}

export default AccountPage
