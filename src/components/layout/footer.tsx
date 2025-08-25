import { Link } from 'react-router-dom'
import { Sun, Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react'

const footerLinks = {
  navegacao: [
    { name: 'Início', href: '/' },
    { name: 'Simulador', href: '/simulador' },
    { name: 'Empresas', href: '/empresas' },
    { name: 'Comunidades', href: '/comunidades' },
  ],
  recursos: [
    { name: 'SolarMatch', href: '/solarmatch' },
    { name: 'Aprendizagem', href: '/aprendizagem' },
    { name: 'Central de Ajuda', href: '/ajuda' },
  ],
  legal: [
    { name: 'Política de Privacidade', href: '/privacidade' },
    { name: 'Termos de Uso', href: '/termos' },
    { name: 'Sobre Nós', href: '/sobre' },
  ],
}

const socialLinks = [
  { name: 'Facebook', href: '#', icon: Facebook },
  { name: 'Instagram', href: '#', icon: Instagram },
  { name: 'LinkedIn', href: '#', icon: Linkedin },
]

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo e descrição */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 solar-gradient rounded-full flex items-center justify-center">
                <Sun className="h-5 w-5 text-white" />
              </div>
              <span className="font-heading font-bold text-xl solar-text-gradient">
                SolAr
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-4 max-w-xs">
              Energia do Sol para Todos. Economize na conta de luz, aprenda uma nova 
              profissão e fortaleça sua comunidade.
            </p>
            
            {/* Informações de contato */}
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>contato@projetosolar.com.br</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>(85) 99999-9999</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Teresina, PI - Brasil</span>
              </div>
            </div>
          </div>

          {/* Links de navegação */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Navegação</h3>
            <ul className="space-y-2">
              {footerLinks.navegacao.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Recursos */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Recursos</h3>
            <ul className="space-y-2">
              {footerLinks.recursos.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal e redes sociais */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-2 mb-6">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Redes sociais */}
            <div>
              <h4 className="font-medium text-foreground mb-3">Siga-nos</h4>
              <div className="flex space-x-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Linha divisória e copyright */}
        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Projeto SolAr. Melhor Equipe da Liga Jovem Sebrae.
            </p>
            <p className="text-sm text-muted-foreground">
              Desenvolvido com ❤️ para o Desafio Liga Jovem Sebrae
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
