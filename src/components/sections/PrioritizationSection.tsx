import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Loader2, Zap, RefreshCw, Download, Info, TrendingUp } from "lucide-react";

// Mock data for ideas
const mockIdeas = [
  {
    id: 1,
    name: "Sistema de Manutenção Preditiva para Drones",
    cluster: "Agricultura Tech",
    businessModel: "SaaS",
    status: "Em Avaliação",
    alignment: 4.2,
    customerValue: 4.5,
    feasibility: 3.8,
    market: 4.0,
    innovation: 4.3,
    total: 4.16
  },
  {
    id: 2,
    name: "Seguro Inteligente para Patinetes Elétricos",
    cluster: "Mobilidade Verde",
    businessModel: "Seguro",
    status: "Aprovada",
    alignment: 3.9,
    customerValue: 4.2,
    feasibility: 4.1,
    market: 3.7,
    innovation: 3.8,
    total: 3.94
  },
  {
    id: 3,
    name: "Plataforma de Telemedicina Rural",
    cluster: "Saúde Digital",
    businessModel: "Marketplace",
    status: "Em Desenvolvimento",
    alignment: 4.4,
    customerValue: 4.7,
    feasibility: 3.2,
    market: 4.1,
    innovation: 4.0,
    total: 4.08
  }
];

const criteria = {
  alignment: {
    title: "Alinhamento Estratégico",
    description: "Avalia o quanto a ideia está alinhada com os objetivos estratégicos da empresa, missão, visão e valores corporativos."
  },
  customerValue: {
    title: "Valor para o Cliente",
    description: "Mede o valor percebido pelo cliente final, incluindo benefícios tangíveis e intangíveis que a solução oferece."
  },
  feasibility: {
    title: "Viabilidade Técnica",
    description: "Analisa a capacidade técnica e recursos necessários para implementar a ideia com a tecnologia disponível."
  },
  market: {
    title: "Potencial de Mercado",
    description: "Avalia o tamanho do mercado-alvo, demanda potencial e oportunidades de crescimento da solução."
  },
  innovation: {
    title: "Grau de Inovação",
    description: "Mede o nível de diferenciação e novidade da ideia em relação às soluções existentes no mercado."
  }
};

export const PrioritizationSection = () => {
  const [ideas, setIdeas] = useState(mockIdeas);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleAIAnalysis = async () => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      const updatedIdeas = ideas.map(idea => ({
        ...idea,
        alignment: Math.round((Math.random() * 2 + 3) * 10) / 10,
        customerValue: Math.round((Math.random() * 2 + 3) * 10) / 10,
        feasibility: Math.round((Math.random() * 2 + 3) * 10) / 10,
        market: Math.round((Math.random() * 2 + 3) * 10) / 10,
        innovation: Math.round((Math.random() * 2 + 3) * 10) / 10,
      }));
      
      updatedIdeas.forEach(idea => {
        idea.total = Math.round(((idea.alignment + idea.customerValue + idea.feasibility + idea.market + idea.innovation) / 5) * 10) / 10;
      });
      
      setIdeas(updatedIdeas.sort((a, b) => b.total - a.total));
      setIsAnalyzing(false);
    }, 3000);
  };

  const handleSync = async () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
    }, 1000);
  };

  const handleDownload = () => {
    // Simulate CSV download
    const csv = "data:text/csv;charset=utf-8," + 
      "Nome,Cluster,Modelo,Status,Alinhamento,Valor Cliente,Viabilidade,Mercado,Inovação,Total\n" +
      ideas.map(idea => 
        `"${idea.name}","${idea.cluster}","${idea.businessModel}","${idea.status}",${idea.alignment},${idea.customerValue},${idea.feasibility},${idea.market},${idea.innovation},${idea.total}`
      ).join("\n");
    
    const encodedUri = encodeURI(csv);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "ideas_prioritization.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const updateScore = (ideaId: number, criterion: string, value: string) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue < 0 || numValue > 5) return;
    
    setIdeas(prev => prev.map(idea => {
      if (idea.id === ideaId) {
        const updated = { ...idea, [criterion]: numValue };
        updated.total = Math.round(((updated.alignment + updated.customerValue + updated.feasibility + updated.market + updated.innovation) / 5) * 10) / 10;
        return updated;
      }
      return idea;
    }));
  };

  const getScoreColor = (score: number) => {
    if (score >= 4.5) return "text-success";
    if (score >= 3.5) return "text-warning";
    return "text-destructive";
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      "Em Avaliação": "bg-warning/10 text-warning border-warning/20",
      "Aprovada": "bg-success/10 text-success border-success/20",
      "Em Desenvolvimento": "bg-primary/10 text-primary border-primary/20",
      "Pausada": "bg-muted text-muted-foreground border-muted"
    };
    return variants[status as keyof typeof variants] || variants["Em Avaliação"];
  };

  return (
    <section id="prioritization" className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-full mb-6">
            <TrendingUp className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Priorização com Inteligência Artificial
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Combine expertise humana com análise objetiva da IA. Avalie ideias com base em 
            critérios estratégicos e obtenha rankings automáticos para decisões assertivas.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <Button 
            onClick={handleSync}
            disabled={isSyncing}
            variant="outline"
            className="bg-white hover:bg-muted"
          >
            {isSyncing ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-2" />
            )}
            Sincronizar Dados
          </Button>

          <Button 
            onClick={handleAIAnalysis}
            disabled={isAnalyzing}
            className="bg-gradient-to-r from-accent to-accent-light hover:from-accent-light hover:to-accent"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                IA Analisando...
              </>
            ) : (
              <>
                <Zap className="h-4 w-4 mr-2" />
                Analisar com IA
              </>
            )}
          </Button>

          <Button 
            onClick={handleDownload}
            variant="outline"
            className="bg-white hover:bg-muted"
          >
            <Download className="h-4 w-4 mr-2" />
            Baixar CSV
          </Button>
        </div>

        {/* Ranking Table */}
        <Card className="bg-white shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Ranking de Ideias por Pontuação
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">Ideia</TableHead>
                    <TableHead className="font-semibold">Cluster</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    {Object.entries(criteria).map(([key, criterion]) => (
                      <TableHead key={key} className="text-center min-w-32">
                        <Dialog>
                          <DialogTrigger asChild>
                            <button className="flex items-center justify-center space-x-1 hover:text-primary transition-colors">
                              <span className="font-semibold text-xs">{criterion.title}</span>
                              <Info className="h-3 w-3" />
                            </button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>{criterion.title}</DialogTitle>
                            </DialogHeader>
                            <p className="text-muted-foreground">{criterion.description}</p>
                          </DialogContent>
                        </Dialog>
                      </TableHead>
                    ))}
                    <TableHead className="text-center font-semibold bg-primary/10">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ideas.map((idea, index) => (
                    <TableRow key={idea.id} className="hover:bg-muted/30">
                      <TableCell className="max-w-xs">
                        <div>
                          <div className="font-medium text-sm">{idea.name}</div>
                          <div className="text-xs text-muted-foreground">{idea.businessModel}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {idea.cluster}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`text-xs ${getStatusBadge(idea.status)}`}>
                          {idea.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Input
                          type="number"
                          min="0"
                          max="5"
                          step="0.1"
                          value={idea.alignment}
                          onChange={(e) => updateScore(idea.id, 'alignment', e.target.value)}
                          className={`w-16 text-center ${getScoreColor(idea.alignment)}`}
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <Input
                          type="number"
                          min="0"
                          max="5"
                          step="0.1"
                          value={idea.customerValue}
                          onChange={(e) => updateScore(idea.id, 'customerValue', e.target.value)}
                          className={`w-16 text-center ${getScoreColor(idea.customerValue)}`}
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <Input
                          type="number"
                          min="0"
                          max="5"
                          step="0.1"
                          value={idea.feasibility}
                          onChange={(e) => updateScore(idea.id, 'feasibility', e.target.value)}
                          className={`w-16 text-center ${getScoreColor(idea.feasibility)}`}
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <Input
                          type="number"
                          min="0"
                          max="5"
                          step="0.1"
                          value={idea.market}
                          onChange={(e) => updateScore(idea.id, 'market', e.target.value)}
                          className={`w-16 text-center ${getScoreColor(idea.market)}`}
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <Input
                          type="number"
                          min="0"
                          max="5"
                          step="0.1"
                          value={idea.innovation}
                          onChange={(e) => updateScore(idea.id, 'innovation', e.target.value)}
                          className={`w-16 text-center ${getScoreColor(idea.innovation)}`}
                        />
                      </TableCell>
                      <TableCell className="text-center bg-primary/5">
                        <div className={`font-bold text-lg ${getScoreColor(idea.total)}`}>
                          {idea.total}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          #{index + 1}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};