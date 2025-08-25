import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { User, Mail, Edit, Briefcase, Award, Calendar } from 'lucide-react'

export function WorkerProfile({ user }: { user: any }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Meu Perfil Profissional</h2>
        <Button variant="outline" size="sm">
          <Edit className="mr-2 h-4 w-4" />
          Editar Perfil
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              Informações Pessoais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Nome Completo</p>
              <p>{user.name || 'Não informado'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">CPF</p>
              <p>{user.cpf || 'Não informado'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Data de Nascimento</p>
              <p>{user.birthDate || 'Não informada'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Gênero</p>
              <p>{user.gender || 'Não informado'}</p>
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
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Briefcase className="h-5 w-5 mr-2" />
              Experiência Profissional
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {user.experience?.length > 0 ? (
                user.experience.map((exp: any, index: number) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">{exp.position}</p>
                        <p className="text-sm text-muted-foreground">{exp.company}</p>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {exp.startDate} - {exp.endDate || 'Atual'}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">Nenhuma experiência profissional cadastrada.</p>
                  <Button>Adicionar Experiência</Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="h-5 w-5 mr-2" />
              Habilidades e Certificações
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Habilidades</h4>
                <div className="flex flex-wrap gap-2">
                  {user.skills?.length > 0 ? (
                    user.skills.map((skill: string, index: number) => (
                      <span key={index} className="px-3 py-1 bg-muted rounded-full text-sm">
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p className="text-muted-foreground">Nenhuma habilidade cadastrada.</p>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Certificações</h4>
                {user.certifications?.length > 0 ? (
                  <div className="space-y-3">
                    {user.certifications.map((cert: any, index: number) => (
                      <div key={index} className="flex items-start">
                        <div className="bg-primary/10 p-2 rounded-lg mr-3">
                          <Award className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{cert.name}</p>
                          <p className="text-sm text-muted-foreground">{cert.issuer} • {cert.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">Nenhuma certificação cadastrada.</p>
                )}
              </div>
              
              <Button variant="outline" className="w-full mt-4">
                Adicionar Habilidade ou Certificação
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Disponibilidade
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Tipo de Contrato</p>
                  <p>{user.contractType || 'Não especificado'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Disponibilidade</p>
                  <p>{user.availability || 'Não especificada'}</p>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                Atualizar Disponibilidade
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
