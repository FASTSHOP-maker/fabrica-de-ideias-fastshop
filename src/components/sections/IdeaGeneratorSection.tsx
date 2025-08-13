import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Loader2, Lightbulb, Sparkles, Send } from "lucide-react";

const clusters = [
  "Casa Inteligente",
  "Mobilidade Verde", 
  "Saúde Digital",
  "Sustentabilidade",
  "Agricultura Tech",
  "Energia Inteligente"
];

export const IdeaGeneratorSection = () => {
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

  const handleAnalyzeIdea = async () => {
    if (!ideaInput.trim()) return;
    
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setAnalyzedIdea({
        benefit: "Redução de custos operacionais e melhoria da experiência do usuário através de automação inteligente",
        target: "Empresas de médio e grande porte que buscam otimização de processos e redução de custos",
        businessModel: "SaaS (Software as a Service) com modelo de assinatura mensal baseado no número de usuários"
      });
      setIsAnalyzing(false);
    }, 2000);
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
    }, 1000);
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
            <CardTitle className="text-xl font-semibold flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-accent" />
              Descreva sua ideia
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
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