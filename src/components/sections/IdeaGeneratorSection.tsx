import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Loader2, Lightbulb, Sparkles, Send, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const clusters = [
  "Casa Inteligente",
  "Mobilidade Verde", 
  "Saúde Digital",
  "Sustentabilidade",
  "Agricultura Tech",
  "Energia Inteligente"
];

export const IdeaGeneratorSection = () => {
  const { toast } = useToast();
  const [ideaInput, setIdeaInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [analyzedIdea, setAnalyzedIdea] = useState({
    benefit: "",
    target: "",
    businessModel: ""
  });
  const [selectedCluster, setSelectedCluster] = useState("");
  const [creatorName, setCreatorName] = useState("");
  const [showWebhookConfig, setShowWebhookConfig] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState(localStorage.getItem('ai_webhook_url') || '');

  const handleAnalyzeIdea = async () => {
    if (!ideaInput.trim()) return;
    
    // Verificar se webhook está configurado
    if (!webhookUrl) {
      setShowWebhookConfig(true);
      toast({
        title: "Configuração necessária",
        description: "Configure a URL do webhook N8N/Make para conectar com a IA",
        variant: "destructive",
      });
      return;
    }
    
    setIsAnalyzing(true);
    
    try {
      const { analyzeIdea } = await import('@/services/aiGateway');
      const analysis = await analyzeIdea(ideaInput);
      
      setAnalyzedIdea({
        benefit: analysis.beneficio,
        target: analysis.publico,
        businessModel: analysis.modelo
      });
      
      toast({
        title: "Análise concluída",
        description: "Sua ideia foi analisada com sucesso!",
      });
      
    } catch (error) {
      console.error("Erro ao analisar ideia:", error);
      
      // Fallback para análise simulada
      setAnalyzedIdea({
        benefit: "Redução de custos operacionais e melhoria da experiência do usuário através de automação inteligente",
        target: "Empresas de médio e grande porte que buscam otimização de processos e redução de custos",
        businessModel: "SaaS (Software as a Service) com modelo de assinatura mensal baseado no número de usuários"
      });
      
      let errorMessage = "Usando análise local. Verifique a URL do webhook.";
      if (error instanceof Error) {
        if (error.message === 'WEBHOOK_NOT_CONFIGURED') {
          errorMessage = "Configure a URL do webhook para conectar com a IA.";
          setShowWebhookConfig(true);
        } else if (error.message === 'TIMEOUT') {
          errorMessage = "Timeout na análise. Usando fallback local.";
        } else if (error.message === 'INVALID_RESPONSE_FORMAT') {
          errorMessage = "Resposta da IA em formato inválido. Usando fallback local.";
        }
      }
      
      toast({
        title: "Erro na análise",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSubmitIdea = async () => {
    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      // Reset form
      setIdeaInput("");
      setAnalyzedIdea({ benefit: "", target: "", businessModel: "" });
      setSelectedCluster("");
      setCreatorName("");
      
      toast({
        title: "Ideia adicionada",
        description: "Sua ideia foi adicionada à base com sucesso!",
      });
    }, 1000);
  };

  const handleSaveWebhook = () => {
    if (webhookUrl.trim()) {
      localStorage.setItem('ai_webhook_url', webhookUrl.trim());
      setShowWebhookConfig(false);
      toast({
        title: "Configuração salva",
        description: "URL do webhook configurada com sucesso!",
      });
    }
  };

  return (
    <section id="generator" className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-accent to-accent-light rounded-full mb-6">
            <Lightbulb className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Gerador de Ideias Inteligente
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Transforme uma ideia simples em uma proposta de negócio estruturada. 
            Nossa IA analisa e sugere benefícios, público-alvo e modelo de negócio.
          </p>
        </div>

        <Card className="bg-gradient-to-br from-background to-muted/20 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center justify-between">
              <div className="flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-accent" />
                Descreva sua ideia
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowWebhookConfig(!showWebhookConfig)}
                className="text-muted-foreground hover:text-accent"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Webhook Configuration Panel */}
            {showWebhookConfig && (
              <div className="p-4 bg-muted/50 rounded-lg border border-muted">
                <h4 className="font-medium text-sm mb-2">Configuração do Webhook</h4>
                <p className="text-xs text-muted-foreground mb-3">
                  Configure a URL do webhook do seu fluxo N8N ou Make para análise inteligente:
                </p>
                <div className="space-y-2">
                  <Input
                    placeholder="https://seu-webhook-url.com/webhook"
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    className="text-sm"
                  />
                  <div className="flex space-x-2">
                    <Button onClick={handleSaveWebhook} size="sm" className="flex-1">
                      Salvar
                    </Button>
                    <Button variant="outline" onClick={() => setShowWebhookConfig(false)} size="sm">
                      Cancelar
                    </Button>
                  </div>
                </div>
              </div>
            )}
            {/* Idea Input */}
            <div className="space-y-2">
              <Label htmlFor="idea-input" className="text-sm font-medium">
                Ideia (exemplo: "seguro para patinetes elétricos")
              </Label>
              <div className="flex space-x-2">
                <Input
                  id="idea-input"
                  placeholder="Digite sua ideia aqui..."
                  value={ideaInput}
                  onChange={(e) => setIdeaInput(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  onClick={handleAnalyzeIdea}
                  disabled={!ideaInput.trim() || isAnalyzing}
                  className="bg-gradient-to-r from-accent to-accent-light hover:from-accent-light hover:to-accent"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Analisando...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Analisar Ideia
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* AI Analysis Results */}
            {(analyzedIdea.benefit || isAnalyzing) && (
              <div className="space-y-4 p-4 bg-accent/5 rounded-lg border border-accent/20">
                <h3 className="font-semibold text-accent flex items-center">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Análise da IA
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Benefício Principal</Label>
                    {isAnalyzing ? (
                      <div className="h-20 bg-muted/50 rounded animate-pulse mt-2" />
                    ) : (
                      <Textarea
                        value={analyzedIdea.benefit}
                        onChange={(e) => setAnalyzedIdea({...analyzedIdea, benefit: e.target.value})}
                        className="mt-2"
                        rows={3}
                      />
                    )}
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Público-Alvo</Label>
                    {isAnalyzing ? (
                      <div className="h-20 bg-muted/50 rounded animate-pulse mt-2" />
                    ) : (
                      <Textarea
                        value={analyzedIdea.target}
                        onChange={(e) => setAnalyzedIdea({...analyzedIdea, target: e.target.value})}
                        className="mt-2"
                        rows={3}
                      />
                    )}
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Modelo de Negócio Sugerido</Label>
                    {isAnalyzing ? (
                      <div className="h-20 bg-muted/50 rounded animate-pulse mt-2" />
                    ) : (
                      <Textarea
                        value={analyzedIdea.businessModel}
                        onChange={(e) => setAnalyzedIdea({...analyzedIdea, businessModel: e.target.value})}
                        className="mt-2"
                        rows={3}
                      />
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Additional Fields */}
            {analyzedIdea.benefit && !isAnalyzing && (
              <div className="space-y-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <h3 className="font-semibold text-primary">Finalizar Submissão</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Cluster Estratégico</Label>
                    <Select value={selectedCluster} onValueChange={setSelectedCluster}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Selecione um cluster" />
                      </SelectTrigger>
                      <SelectContent>
                        {clusters.map((cluster) => (
                          <SelectItem key={cluster} value={cluster}>
                            {cluster}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Seu Nome</Label>
                    <Input
                      placeholder="Nome do criador da ideia"
                      value={creatorName}
                      onChange={(e) => setCreatorName(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                </div>

                <Button 
                  onClick={handleSubmitIdea}
                  disabled={!selectedCluster || !creatorName || isSubmitting}
                  className="w-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary"
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Adicionando à Base...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Adicionar à Base de Ideias
                    </>
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};