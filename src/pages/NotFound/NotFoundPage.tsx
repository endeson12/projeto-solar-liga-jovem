import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, ArrowLeft, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-solar-neutral via-background to-solar-neutral-dark flex items-center justify-center px-4">
      <motion.div
        className="text-center max-w-md mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 solar-gradient rounded-full flex items-center justify-center">
            <Sun className="h-8 w-8 text-white" />
          </div>
        </div>

        {/* 404 */}
        <motion.h1
          className="text-8xl md:text-9xl font-bold solar-text-gradient mb-4"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          404
        </motion.h1>

        <motion.h2
          className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Página não encontrada
        </motion.h2>

        <motion.p
          className="text-lg text-muted-foreground mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          Ops! Parece que esta página saiu para captar energia solar. 
          Que tal voltar para a página inicial?
        </motion.p>

        {/* Botões */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Button variant="solar" size="lg" asChild>
            <Link to="/">
              <Home className="mr-2 h-5 w-5" />
              Voltar ao Início
            </Link>
          </Button>
          
          <Button variant="outline" size="lg" onClick={() => window.history.back()}>
            <ArrowLeft className="mr-2 h-5 w-5" />
            Página Anterior
          </Button>
        </motion.div>

        {/* Links úteis */}
        <motion.div
          className="mt-12 pt-8 border-t border-border"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <p className="text-sm text-muted-foreground mb-4">
            Ou explore estas páginas populares:
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link to="/simulador" className="text-primary hover:underline">
              Simulador Solar
            </Link>
            <Link to="/empresas" className="text-primary hover:underline">
              Empresas Parceiras
            </Link>
            <Link to="/comunidades" className="text-primary hover:underline">
              Comunidades
            </Link>
            <Link to="/ajuda" className="text-primary hover:underline">
              Central de Ajuda
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
