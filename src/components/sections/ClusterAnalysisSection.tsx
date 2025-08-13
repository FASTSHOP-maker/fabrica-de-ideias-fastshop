import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Home, Car, Heart, Leaf, Tractor, Zap } from "lucide-react";

const clusters = [
  {
    id: "casa-inteligente",
    name: "Casa Inteligente",
    icon: Home,
    description: "Automação residencial e IoT doméstico",
    value: "Conveniência, segurança e eficiência energética",
    needs: "Praticidade no dia a dia, economia de energia, segurança familiar",
    color: "from-blue-500 to-blue-600",
    borderColor: "border-blue-200",
    bgColor: "bg-blue-50",
    count: 12
  },
  {
    id: "mobilidade-verde",
    name: "Mobilidade Verde",
    icon: Car,
    description: "Transporte sustentável e eletrificação",
    value: "Redução de emissões e mobilidade inteligente",
    needs: "Transporte limpo, redução de custos, acessibilidade",
    color: "from-green-500 to-green-600",
    borderColor: "border-green-200",
    bgColor: "bg-green-50",
    count: 8
  },
  {
    id: "saude-digital",
    name: "Saúde Digital",
    icon: Heart,
    description: "Telemedicina e monitoramento de saúde",
    value: "Prevenção, diagnóstico precoce e acessibilidade",
    needs: "Cuidados remotos, monitoramento contínuo, redução de custos",
    color: "from-red-500 to-red-600",
    borderColor: "border-red-200",
    bgColor: "bg-red-50",
    count: 10
  },
  {
    id: "sustentabilidade",
    name: "Sustentabilidade",
    icon: Leaf,
    description: "Economia circular e energia renovável",
    value: "Impacto ambiental positivo e eficiência de recursos",
    needs: "Redução de desperdício, energia limpa, responsabilidade ambiental",
    color: "from-emerald-500 to-emerald-600",
    borderColor: "border-emerald-200",
    bgColor: "bg-emerald-50",
    count: 7
  },
  {
    id: "agricultura-tech",
    name: "Agricultura Tech",
    icon: Tractor,
    description: "Agricultura de precisão e biotecnologia",
    value: "Produtividade agrícola e sustentabilidade",
    needs: "Otimização de safras, redução de custos, práticas sustentáveis",
    color: "from-amber-500 to-amber-600",
    borderColor: "border-amber-200",
    bgColor: "bg-amber-50",
    count: 6
  },
  {
    id: "energia-inteligente",
    name: "Energia Inteligente",
    icon: Zap,
    description: "Smart grids e armazenamento de energia",
    value: "Eficiência energética e distribuição inteligente",
    needs: "Gestão de energia, redução de perdas, autonomia energética",
    color: "from-purple-500 to-purple-600",
    borderColor: "border-purple-200",
    bgColor: "bg-purple-50",
    count: 4
  }
];

export const ClusterAnalysisSection = () => {
  return (
    <section id="clusters" className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Análise de Clusters Estratégicos
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Mapeamento das áreas estratégicas da empresa. Cada cluster representa 
            uma oportunidade de mercado com proposta de valor e necessidades específicas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clusters.map((cluster) => {
            const Icon = cluster.icon;
            return (
              <Card 
                key={cluster.id}
                data-cluster={cluster.name}
                className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${cluster.borderColor} bg-gradient-to-br from-white to-muted/20`}
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${cluster.color} opacity-5 rounded-full -translate-y-16 translate-x-16`} />
                
                <CardHeader className="relative">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${cluster.color} bg-opacity-10`}>
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <Badge variant="secondary" className={cluster.bgColor}>
                      {cluster.count} ideias
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground">
                    {cluster.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {cluster.description}
                  </p>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm text-foreground mb-2">
                      💡 Proposta de Valor
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {cluster.value}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm text-foreground mb-2">
                      🎯 Necessidades do Cliente
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {cluster.needs}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground italic">
            💡 Dica: Clique nas fatias do gráfico na seção anterior para destacar o cluster correspondente
          </p>
        </div>
      </div>
    </section>
  );
};