import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Building, Mail, Edit, Users, Briefcase } from 'lucide-react'

export function CompanyProfile({ user }: { user: any }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Perfil da Empresa</h2>
        <Button variant="outline" size="sm">
          <Edit className="mr-2 h-4 w-4" />
          Editar Perfil
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building className="h-5 w-5 mr-2" />
              Dados da Empresa
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Razão Social</p>
              <p>{user.companyName || 'Não informado'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Nome Fantasia</p>
              <p>{user.tradingName || 'Não informado'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">CNPJ</p>
              <p>{user.cnpj || 'Não informado'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Inscrição Estadual</p>
              <p>{user.stateRegistration || 'Não informada'}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mail className="h-5 w-5 mr-2" />
              Contato
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">E-mail</p>
              <p>{user.email || 'Não informado'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Telefone</p>
              <p>{user.phone || 'Não informado'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Endereço</p>
              <p>{user.address || 'Não informado'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Responsável</p>
              <p>{user.responsibleName || 'Não informado'}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Briefcase className="h-5 w-5 mr-2" />
              Atividades
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">Projetos Ativos</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">Projetos Concluídos</p>
                <p className="text-2xl font-bold">45</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">Avaliação Média</p>
                <div className="flex items-center">
                  <span className="text-2xl font-bold mr-2">4.8</span>
                  <span className="text-sm text-muted-foreground">(128 avaliações)</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Equipe
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <p className="font-medium">João Silva</p>
                  <p className="text-sm text-muted-foreground">Engenheiro Chefe</p>
                </div>
                <Button variant="outline" size="sm">Ver perfil</Button>
              </div>
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Maria Santos</p>
                  <p className="text-sm text-muted-foreground">Gerente de Projetos</p>
                </div>
                <Button variant="outline" size="sm">Ver perfil</Button>
              </div>
              <Button variant="outline" className="w-full">
                Gerenciar equipe
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
