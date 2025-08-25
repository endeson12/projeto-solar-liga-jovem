import { Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/components/theme-provider'
import { AuthProvider } from '@/domains/auth/auth-provider'
import { Layout } from '@/components/layout/layout'
import { AuthGuard } from '@/app/guards/auth-guard'

// Pages
import { HomePage } from '@/pages/Home/HomePage'
import { SimulatorPage } from '@/pages/Simulator/SimulatorPage'
import { LearningPage } from '@/pages/Learning/LearningPage'
import { ModulePage } from '@/pages/Learning/ModulePage'
import { DashboardPage } from '@/pages/Dashboard/DashboardPage'
import { CompaniesPage } from '@/pages/Companies/CompaniesPage'
import { CompanyDetailPage } from '@/pages/Companies/CompanyDetailPage'
import { CommunitiesPage } from '@/pages/Communities/CommunitiesPage'
import { CommunityDetailPage } from '@/pages/Communities/CommunityDetailPage'
import { SolarMatchPage } from '@/pages/SolarMatch/SolarMatchPage'
import { LoginPage } from '@/pages/Auth/LoginPage'
import { RegisterPage } from '@/pages/Auth/RegisterPage'
import { HelpPage } from '@/pages/Help/HelpPage'
import { NotFoundPage } from '@/pages/NotFound/NotFoundPage'
import { AccountPage } from '@/pages/Account/AccountPage'

/**
 * Componente principal da aplicação SolAr
 * 
 * @component
 * @example
 * return (
 *   <App />
 * )
 */
function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="solar-ui-theme">
      <AuthProvider>
        <div className="min-h-screen bg-background font-sans antialiased" role="main">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="simulador" element={<SimulatorPage />} />
              <Route path="empresas" element={<CompaniesPage />} />
              <Route path="empresas/:id" element={<CompanyDetailPage />} />
              <Route path="comunidades" element={<CommunitiesPage />} />
              <Route path="comunidades/:id" element={<CommunityDetailPage />} />
              <Route path="solarmatch" element={<SolarMatchPage />} />
              <Route path="ajuda" element={<HelpPage />} />
              
              {/* Protected routes */}
              <Route path="conta" element={<AuthGuard><AccountPage /></AuthGuard>} />
            </Route>
            
            {/* Auth routes - keep only one set of auth routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registro" element={<RegisterPage />} />

            {/* Protected routes */}
            <Route
              path="/dashboard"
              element={
                <AuthGuard>
                  <Layout />
                </AuthGuard>
              }
            >
              <Route index element={<DashboardPage />} />
            </Route>

            <Route
              path="/aprendizagem"
              element={
                <AuthGuard>
                  <Layout />
                </AuthGuard>
              }
            >
              <Route index element={<LearningPage />} />
              <Route path=":moduleId" element={<ModulePage />} />
            </Route>

            {/* Admin/Company only routes - TODO: Implement Finance and Payments pages */}

            {/* 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Toaster />
        </div>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
