import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Database, Brain, Users, Shield, Zap, ExternalLink } from "lucide-react";

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal = ({ isOpen, onClose }: HelpModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary flex items-center">
            <Brain className="h-6 w-6 mr-2" />
            Fábrica de Ideias - Guia Completo
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Introduction */}
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-6 rounded-lg border border-primary/20">
            <h3 className="text-lg font-semibold text-primary mb-3">
              🚀 Bem-vindo à Fábrica de Ideias
            </h3>
            <p className="text-muted-foreground">
              Uma plataforma colaborativa de gestão de inovação que transforma o processo caótico 
              de geração de ideias em um pipeline organizado, onde a Inteligência Artificial atua 
              como consultor estratégico para toda a equipe.
            </p>
          </div>

          {/* Architecture */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Database className="h-5 w-5 mr-2 text-primary" />
              Arquitetura do Sistema
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-muted/30 p-4 rounded-lg">
                <div className="font-semibold text-primary mb-2">Frontend (React)</div>
                <p className="text-sm text-muted-foreground">
                  Interface moderna e responsiva construída com React e TypeScript
                </p>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg">
                <div className="font-semibold text-primary mb-2">Backend (Apps Script)</div>
                <p className="text-sm text-muted-foreground">
                  Google Apps Script como intermediário seguro para API calls
                </p>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg">
                <div className="font-semibold text-primary mb-2">Database (Sheets)</div>
                <p className="text-sm text-muted-foreground">
                  Google Sheets como banco de dados colaborativo e universal
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Zap className="h-5 w-5 mr-2 text-accent" />
              Funcionalidades Principais
            </h3>
            <div className="space-y-4">
              
              <div className="flex items-start space-x-3">
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 mt-1">
                  1
                </Badge>
                <div>
                  <h4 className="font-semibold">Visão Geral Estratégica</h4>
                  <p className="text-sm text-muted-foreground">
                    Dashboard com métricas em tempo real e gráfico interativo de distribuição por clusters. 
                    Clique nas fatias para navegar diretamente para análises detalhadas.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20 mt-1">
                  2
                </Badge>
                <div>
                  <h4 className="font-semibold">Análise de Clusters</h4>
                  <p className="text-sm text-muted-foreground">
                    Mapeamento das áreas estratégicas da empresa com propostas de valor 
                    e necessidades do cliente claramente definidas.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Badge variant="outline" className="bg-success/10 text-success border-success/20 mt-1">
                  3
                </Badge>
                <div>
                  <h4 className="font-semibold">Gerador de Ideias com IA</h4>
                  <p className="text-sm text-muted-foreground">
                    Transforme ideias simples em propostas estruturadas. A IA analisa e sugere 
                    benefícios, público-alvo e modelos de negócio automaticamente.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20 mt-1">
                  4
                </Badge>
                <div>
                  <h4 className="font-semibold">Priorização Inteligente</h4>
                  <p className="text-sm text-muted-foreground">
                    Combine avaliação manual da equipe com análise objetiva da IA. 
                    Rankings automáticos baseados em critérios estratégicos claros.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Badge variant="outline" className="bg-purple-500/10 text-purple-600 border-purple-500/20 mt-1">
                  5
                </Badge>
                <div>
                  <h4 className="font-semibold">Explorer de Serviços</h4>
                  <p className="text-sm text-muted-foreground">
                    Navegue, filtre e gerencie o portfólio completo. Busca avançada 
                    por cluster, modelo de negócio, status e prioridade.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-blue-500/20 mt-1">
                  6
                </Badge>
                <div>
                  <h4 className="font-semibold">Assistente de IA</h4>
                  <p className="text-sm text-muted-foreground">
                    Chat inteligente para consultas em linguagem natural sobre o portfólio. 
                    Encontre insights e responda perguntas estratégicas rapidamente.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Security & Collaboration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <Shield className="h-5 w-5 mr-2 text-success" />
                Segurança
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Chaves de API seguras no backend</li>
                <li>• Controle de acesso via Google Workspace</li>
                <li>• Dados centralizados e auditáveis</li>
                <li>• Histórico completo de alterações</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <Users className="h-5 w-5 mr-2 text-primary" />
                Colaboração
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Trabalho em tempo real da equipe</li>
                <li>• Sincronização automática de dados</li>
                <li>• Comentários e feedback integrados</li>
                <li>• Notificações de atualizações</li>
              </ul>
            </div>
          </div>

          <Separator />

          {/* Getting Started */}
          <div className="bg-gradient-to-r from-accent/5 to-primary/5 p-6 rounded-lg border border-accent/20">
            <h3 className="text-lg font-semibold text-accent mb-3">
              🎯 Como Começar
            </h3>
            <div className="space-y-2 text-sm">
              <p><strong>1. Configuração:</strong> Verifique se o Google Apps Script está conectado corretamente</p>
              <p><strong>2. Permissões:</strong> Garanta acesso à planilha Google para toda a equipe</p>
              <p><strong>3. Treinamento:</strong> Familiarize a equipe com os critérios de avaliação</p>
              <p><strong>4. Uso:</strong> Comece adicionando ideias e usando a análise de IA</p>
            </div>
          </div>

          {/* Configuration Link */}
          <div className="bg-muted/30 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold">Configuração Técnica</h4>
                <p className="text-sm text-muted-foreground">
                  Para configurar o backend e conexões, consulte o README.md
                </p>
              </div>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                <ExternalLink className="h-3 w-3 mr-1" />
                README.md
              </Badge>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};