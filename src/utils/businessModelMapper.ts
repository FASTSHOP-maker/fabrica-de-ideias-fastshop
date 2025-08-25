// Mapeia descrições de modelos de negócio para categorias padronizadas

export function mapBusinessModel(description: string): string {
  const normalizedDesc = description.toLowerCase().trim();
  
  // Mapeamento de termos comuns para categorias padronizadas
  const modelMappings: { [key: string]: string } = {
    'assinatura': 'Assinatura/Recorrência',
    'recorrencia': 'Assinatura/Recorrência',
    'mensalidade': 'Assinatura/Recorrência',
    'subscription': 'Assinatura/Recorrência',
    'recorrente': 'Assinatura/Recorrência',
    
    'consultoria': 'Consultoria',
    'consulting': 'Consultoria',
    'assessoria': 'Consultoria',
    'advisory': 'Consultoria',
    
    'locacao': 'Locação',
    'aluguel': 'Locação',
    'rental': 'Locação',
    'leasing': 'Locação',
    
    'seguro': 'Seguro',
    'insurance': 'Seguro',
    'protecao': 'Seguro',
    'protection': 'Seguro',
    
    'produto': 'Produto',
    'product': 'Produto',
    'venda': 'Produto',
    'sale': 'Produto',
    
    'servico': 'Serviço',
    'service': 'Serviço',
    'atendimento': 'Serviço',
    
    'plataforma': 'Plataforma',
    'platform': 'Plataforma',
    'marketplace': 'Plataforma',
    
    'licenca': 'Licenciamento',
    'license': 'Licenciamento',
    'licensing': 'Licenciamento',
  };
  
  // Procura por correspondências nas chaves do mapeamento
  for (const [key, value] of Object.entries(modelMappings)) {
    if (normalizedDesc.includes(key)) {
      return value;
    }
  }
  
  // Se não encontrar correspondência, retorna a descrição original capitalizada
  return description.charAt(0).toUpperCase() + description.slice(1).toLowerCase();
}

// Lista dos modelos de negócio padronizados disponíveis
export const standardBusinessModels = [
  'Assinatura/Recorrência',
  'Consultoria',
  'Locação',
  'Seguro',
  'Produto',
  'Serviço',
  'Plataforma',
  'Licenciamento',
];

// Função para validar se um modelo está na lista padrão
export function isStandardBusinessModel(model: string): boolean {
  return standardBusinessModels.includes(model);
}