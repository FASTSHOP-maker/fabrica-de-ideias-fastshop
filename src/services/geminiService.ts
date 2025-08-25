import type { Service, AIGeneratedIdea } from '../types';

// Esta é uma versão mock do serviço Gemini para demonstração
// No projeto real, isso se conectaria à API do Google Gemini através do Google Apps Script

export async function getAIGeneratedIdeaDetails(userIdea: string): Promise<AIGeneratedIdea> {
  // Simula o tempo de processamento da IA
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Análise mock baseada na entrada do usuário
  const mockAnalysis: AIGeneratedIdea = {
    beneficio: `Solução inovadora que otimiza ${userIdea.toLowerCase()}, proporcionando maior eficiência e conveniência para os usuários.`,
    publico: generateMockTargetAudience(userIdea),
    modelo: generateMockBusinessModel(userIdea)
  };
  
  return mockAnalysis;
}

export async function getAIRanking(services: Service[]): Promise<Service[]> {
  // Simula o tempo de processamento da IA para múltiplos serviços
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Mock da análise de IA - gera scores aleatórios mas consistentes
  const rankedServices = services.map(service => {
    const scores = generateMockScores(service);
    const revenueEstimate = generateMockRevenue(service, scores);
    
    return {
      ...service,
      scores,
      revenueEstimate
    };
  });
  
  return rankedServices;
}

export async function getAIInsight(question: string, services: Service[]): Promise<string> {
  // Simula o tempo de processamento da IA
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Análise mock baseada na pergunta e dados
  const totalServices = services.length;
  const approvedServices = services.filter(s => s.status === 'aprovada').length;
  const clusters = [...new Set(services.map(s => s.cluster))];
  
  if (question.toLowerCase().includes('resumo') || question.toLowerCase().includes('geral')) {
    return `Com base no portfólio atual, temos ${totalServices} ideias de serviço, sendo ${approvedServices} já aprovadas. Os principais clusters de atuação são: ${clusters.join(', ')}. As ideias mais promissoras demonstram forte alinhamento estratégico e potencial de receita recorrente.`;
  }
  
  if (question.toLowerCase().includes('melhor') || question.toLowerCase().includes('top')) {
    const topService = services.reduce((prev, current) => {
      const prevTotal = prev.scores?.reduce((a, b) => a + b, 0) || 0;
      const currentTotal = current.scores?.reduce((a, b) => a + b, 0) || 0;
      return currentTotal > prevTotal ? current : prev;
    });
    
    return `A ideia com melhor avaliação é "${topService.service}", que se destaca por seu forte alinhamento estratégico e potencial de impacto no faturamento. Esta solução atende às necessidades de ${topService.targetAudience} através do modelo de ${topService.businessModel}.`;
  }
  
  if (question.toLowerCase().includes('cluster')) {
    const clusterCounts = clusters.map(cluster => {
      const count = services.filter(s => s.cluster === cluster).length;
      return `${cluster}: ${count} ideias`;
    });
    
    return `Distribuição por clusters estratégicos: ${clusterCounts.join(', ')}. Isso mostra uma diversificação equilibrada do portfólio de inovação.`;
  }
  
  return `Analisando sua pergunta "${question}", posso dizer que o portfólio atual apresenta ${totalServices} ideias distribuídas em ${clusters.length} clusters estratégicos. Recomendo focar nas ideias com status "aprovada" para implementação prioritária, especialmente aquelas com modelos de receita recorrente.`;
}

// Funções utilitárias para gerar dados mock consistentes

function generateMockTargetAudience(idea: string): string {
  const keywords = idea.toLowerCase();
  
  if (keywords.includes('casa') || keywords.includes('residencial')) {
    return "Proprietários de casas e apartamentos modernos";
  }
  if (keywords.includes('empresa') || keywords.includes('corporativo')) {
    return "Pequenas e médias empresas";
  }
  if (keywords.includes('jovem') || keywords.includes('estudante')) {
    return "Jovens adultos e estudantes universitários";
  }
  if (keywords.includes('idoso') || keywords.includes('senior')) {
    return "Público sênior com renda estável";
  }
  
  return "Consumidores urbanos de classe média alta";
}

function generateMockBusinessModel(idea: string): string {
  const keywords = idea.toLowerCase();
  
  if (keywords.includes('aluguel') || keywords.includes('locação')) {
    return "Locação";
  }
  if (keywords.includes('assinatura') || keywords.includes('mensalidade')) {
    return "Assinatura/Recorrência";
  }
  if (keywords.includes('seguro') || keywords.includes('proteção')) {
    return "Seguro";
  }
  if (keywords.includes('consultoria') || keywords.includes('assessoria')) {
    return "Consultoria";
  }
  
  const models = ["Produto", "Consultoria", "Assinatura/Recorrência", "Locação"];
  return models[Math.floor(Math.random() * models.length)];
}

function generateMockScores(service: Service): number[] {
  // Gera scores baseados no tipo de serviço para ter consistência
  const baseScores = [3, 3, 3, 3, 3]; // Scores médios
  
  // Ajusta scores baseado no modelo de negócio
  if (service.businessModel === "Assinatura/Recorrência") {
    baseScores[2] += 1; // Melhor impacto financeiro
  }
  
  if (service.businessModel === "Consultoria") {
    baseScores[0] += 1; // Melhor alinhamento
    baseScores[3] += 1; // Melhor viabilidade
  }
  
  if (service.status === "aprovada") {
    baseScores[3] += 1; // Melhor viabilidade
  }
  
  // Adiciona variação aleatória pequena
  return baseScores.map(score => {
    const variation = Math.floor(Math.random() * 3) - 1; // -1, 0, ou 1
    return Math.max(1, Math.min(5, score + variation));
  });
}

function generateMockRevenue(service: Service, scores: number[]): number {
  const totalScore = scores.reduce((a, b) => a + b, 0);
  const baseRevenue = totalScore * 10000; // Base de R$ 10k por ponto
  
  // Multiplier baseado no modelo de negócio
  let multiplier = 1;
  switch (service.businessModel) {
    case "Assinatura/Recorrência":
      multiplier = 3;
      break;
    case "Seguro":
      multiplier = 2.5;
      break;
    case "Consultoria":
      multiplier = 1.5;
      break;
    case "Produto":
      multiplier = 2;
      break;
    default:
      multiplier = 1.8;
  }
  
  return Math.round(baseRevenue * multiplier);
}