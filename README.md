# SolAr - Energia do Sol para Todos

![SolAr Logo](https://via.placeholder.com/200x80/FFB703/023047?text=SolAr)

## 📋 Sobre o Projeto

O **SolAr** é uma plataforma digital inovadora que democratiza o acesso à energia solar, conectando comunidades periféricas, técnicos solares e empresas do setor. Nossa missão é tornar a energia limpa acessível para todos, promovendo desenvolvimento sustentável e economia nas contas de luz.

### 🎯 Público-Alvo
- **Comunidades periféricas**: Famílias que buscam reduzir custos energéticos
- **Técnicos solares**: Profissionais em formação e capacitação
- **Empresas do setor**: Instaladores e fornecedores de energia solar

## 🚀 Funcionalidades Principais

### ✅ Implementadas no MVP
- **🏠 Página Inicial**: Apresentação da plataforma e seus benefícios
- **⚡ Simulador Solar**: Cálculo personalizado de economia energética
- **🏢 Catálogo de Empresas**: Listagem e detalhes de empresas parceiras
- **👥 Comunidades Energéticas**: Formação e gestão de grupos solares
- **🏆 SolarMatch**: Ranking dos melhores instaladores
- **📚 Área de Aprendizagem**: Cursos e certificações em energia solar
- **❓ Central de Ajuda**: FAQ e suporte ao usuário
- **🔐 Sistema de Autenticação**: Login/registro com perfis diferenciados
- **📊 Dashboard**: Painel personalizado por tipo de usuário

### 🔄 Em Desenvolvimento
- **💰 Módulo Financeiro**: Gestão de receitas e despesas
- **💳 Sistema de Pagamentos**: Processamento de transações
- **🗺️ Mapa Interativo**: Visualização geográfica das comunidades
- **📄 Geração de PDFs**: Relatórios e certificados
- **🤖 Chatbot**: Assistente virtual para suporte

## 🛠️ Stack Tecnológica

### Frontend
- **React 18** - Biblioteca principal
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework de estilos
- **shadcn/ui** - Componentes UI baseados em Radix
- **Framer Motion** - Animações fluidas
- **React Router** - Roteamento SPA

### Bibliotecas Principais
- **Zustand** - Gerenciamento de estado global
- **React Hook Form + Zod** - Formulários e validação
- **Recharts** - Gráficos e visualizações
- **Lucide React** - Ícones modernos
- **Leaflet** - Mapas interativos (planejado)

### Ferramentas de Desenvolvimento
- **ESLint + Prettier** - Qualidade e formatação de código
- **Vitest** - Testes unitários
- **MSW** - Mock Service Worker para APIs
- **IndexedDB/localStorage** - Persistência local

## 🎨 Design System

### Paleta de Cores
- **Primária**: `#FFB703` (Amarelo Sol) - Energia e otimismo
- **Secundária**: `#023047` (Azul Escuro) - Confiança e estabilidade
- **Terciária**: `#2A9D8F` (Verde Sustentabilidade) - Natureza e crescimento
- **Neutros**: `#F8F9FA`, `#E9ECEF` - Background e textos

### Princípios de Design
- **Minimalista e acolhedor**: Interface limpa focada na usabilidade
- **Responsivo**: Mobile-first com adaptação para todos os dispositivos
- **Acessível**: Conformidade com WCAG AA
- **Dark Mode**: Suporte nativo a tema escuro

## 📁 Estrutura do Projeto

```
src/
├── app/                    # Configurações da aplicação
│   └── guards/            # Guards de autenticação e autorização
├── components/            # Componentes reutilizáveis
│   ├── ui/               # Componentes base (Button, Card, etc.)
│   └── layout/           # Componentes de layout (Navbar, Footer)
├── domains/              # Domínios de negócio
│   ├── auth/            # Autenticação e autorização
│   └── simulator/       # Simulador de energia solar
├── hooks/               # Custom hooks
├── lib/                 # Utilitários e configurações
├── pages/              # Páginas da aplicação
│   ├── Home/           # Página inicial
│   ├── Simulator/      # Simulador solar
│   ├── Companies/      # Empresas e detalhes
│   ├── Communities/    # Comunidades energéticas
│   ├── Learning/       # Área de aprendizagem
│   ├── SolarMatch/     # Ranking de instaladores
│   ├── Auth/          # Login e registro
│   └── Help/          # Central de ajuda
├── services/          # Serviços e APIs
├── store/            # Gerenciamento de estado global
├── styles/           # Estilos globais
├── types/            # Definições de tipos TypeScript
└── utils/            # Funções utilitárias
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone [url-do-repositorio]
cd solar

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env

# Execute o servidor de desenvolvimento
npm run dev
```

### Scripts Disponíveis
```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build para produção
npm run preview      # Preview do build
npm run lint         # Linting do código
npm run type-check   # Verificação de tipos
npm test            # Execução de testes
```

## 🌐 Navegação da Aplicação

### Rotas Públicas
- `/` - Página inicial
- `/simulador` - Simulador de economia solar
- `/empresas` - Catálogo de empresas
- `/empresas/:id` - Detalhes da empresa
- `/comunidades` - Lista de comunidades
- `/comunidades/:id` - Detalhes da comunidade
- `/solarmatch` - Ranking de instaladores
- `/ajuda` - Central de ajuda
- `/auth/login` - Login
- `/auth/register` - Registro

### Rotas Protegidas
- `/dashboard` - Painel do usuário
- `/aprendizagem` - Área de aprendizagem
- `/aprendizagem/:moduleId` - Módulo específico

## 👥 Perfis de Usuário

### 🏠 Membro (Usuário Final)
- Acesso ao simulador e comunidades
- Participação em cursos
- Acompanhamento de economia energética

### 🏢 Empresa (Instalador)
- Gestão de leads e projetos
- Participação no SolarMatch
- Acesso a relatórios financeiros

### 👨‍💼 Admin (Administrador)
- Gestão completa da plataforma
- Moderação de conteúdo
- Análise de métricas globais

## 🔧 Configuração de Ambiente

### Variáveis de Ambiente (.env)
```bash
# Configurações do Simulador
VITE_SIMULATOR_TARIFF=0.65
VITE_SIMULATOR_REDUCTION_PERCENTAGE=0.95
VITE_SIMULATOR_SYSTEM_COST_PER_KWP=4500
VITE_SIMULATOR_SOLAR_IRRADIATION=5.5

# Informações de Contato
VITE_CONTACT_PHONE="(86) 99999-0000"
VITE_CONTACT_EMAIL="contato@solar.com.br"
VITE_CONTACT_ADDRESS="Teresina, PI"

# Configurações do Mapa
VITE_MAP_DEFAULT_LAT=-5.0892
VITE_MAP_DEFAULT_LNG=-42.8019
VITE_MAP_DEFAULT_ZOOM=13

# Modo de Desenvolvimento
VITE_DEBUG_MODE=true
```

## 🧪 Testes

### Executar Testes
```bash
npm test              # Todos os testes
npm run test:watch    # Modo watch
npm run test:coverage # Com cobertura
```

### Estrutura de Testes
- **Unitários**: Componentes e utilitários
- **Integração**: Fluxos completos
- **E2E**: Cenários de usuário (planejado)

## 📈 Performance e Qualidade

### Métricas Alvo
- **Lighthouse Score**: ≥90 em todas as categorias
- **First Contentful Paint**: <1.5s
- **Largest Contentful Paint**: <2.5s
- **Cumulative Layout Shift**: <0.1

### Boas Práticas
- Lazy loading de componentes
- Otimização de imagens
- Code splitting automático
- Service Worker para cache (planejado)

## 🚀 Deploy e Produção

### Build de Produção
```bash
npm run build
npm run preview  # Testar build localmente
```

### Checklist de Deploy
- [ ] Testes passando
- [ ] Build sem erros
- [ ] Variáveis de ambiente configuradas
- [ ] Performance otimizada
- [ ] Acessibilidade validada

## 🤝 Contribuição

### Como Contribuir
1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

### Padrões de Código
- Use TypeScript para tipagem
- Siga as regras do ESLint/Prettier
- Escreva testes para novas funcionalidades
- Documente componentes complexos
- Use commits semânticos

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Contato e Suporte

- **Email**: contato@solar.com.br
- **WhatsApp**: (86) 99999-0000
- **Website**: [solar.com.br](https://solar.com.br)

---

**SolAr** - Transformando vidas através da energia solar ☀️

*Desenvolvido com ❤️ para o Desafio Liga Jovem Sebrae*
