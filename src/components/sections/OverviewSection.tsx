import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { TrendingUp, Lightbulb, Target, DollarSign } from "lucide-react";

// Mock data for demonstration
const mockStats = {
  totalIdeas: 47,
  clusters: 6,
  businessModels: 8,
  avgScore: 3.2
};

const mockChartData = [
  { name: "Casa Inteligente", value: 12, color: "#0ea5e9" },
  { name: "Mobilidade Verde", value: 8, color: "#10b981" },
  { name: "Saúde Digital", value: 10, color: "#f59e0b" },
  { name: "Sustentabilidade", value: 7, color: "#ef4444" },
  { name: "Agricultura Tech", value: 6, color: "#8b5cf6" },
  { name: "Outros", value: 4, color: "#6b7280" },
];

export const OverviewSection = () => {
  const handleChartClick = (data: any) => {
    const clusterElement = document.getElementById("clusters");
    if (clusterElement) {
      clusterElement.scrollIntoView({ behavior: "smooth" });
      // Highlight the corresponding cluster card
      setTimeout(() => {
        const clusterCards = clusterElement.querySelectorAll('[data-cluster]');
        clusterCards.forEach(card => {
          if (card.getAttribute('data-cluster') === data.name) {
            card.classList.add('ring-4', 'ring-accent', 'ring-opacity-50');
            setTimeout(() => {
              card.classList.remove('ring-4', 'ring-accent', 'ring-opacity-50');
            }, 3000);
          }
        });
      }, 100);
    }
  };

  return (
    <section id="overview" className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Visão Geral do Portfólio
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Acompanhe o progresso da inovação em tempo real. Métricas estratégicas 
            e distribuição de ideias por área de negócio.
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Ideias</CardTitle>
              <Lightbulb className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{mockStats.totalIdeas}</div>
              <p className="text-xs text-muted-foreground">
                +12% desde o mês passado
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20 hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clusters Ativos</CardTitle>
              <Target className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">{mockStats.clusters}</div>
              <p className="text-xs text-muted-foreground">
                Áreas estratégicas
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-success/5 to-success/10 border-success/20 hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Modelos de Negócio</CardTitle>
              <DollarSign className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{mockStats.businessModels}</div>
              <p className="text-xs text-muted-foreground">
                Diversidade estratégica
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-warning/5 to-warning/10 border-warning/20 hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Score Médio</CardTitle>
              <TrendingUp className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">{mockStats.avgScore}/5</div>
              <p className="text-xs text-muted-foreground">
                Qualidade das ideias
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Chart Section */}
        <Card className="bg-gradient-to-br from-background to-muted/20">
          <CardHeader>
            <CardTitle className="text-xl font-semibold mb-2">
              Distribuição por Cluster Estratégico
            </CardTitle>
            <p className="text-muted-foreground">
              Clique em uma fatia para navegar para a análise detalhada do cluster
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={mockChartData}
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      dataKey="value"
                      onClick={handleChartClick}
                      className="cursor-pointer"
                    >
                      {mockChartData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.color}
                          stroke="white"
                          strokeWidth={2}
                          className="hover:opacity-80 transition-opacity"
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`${value} ideias`, 'Quantidade']}
                      labelStyle={{ color: '#374151' }}
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="space-y-3">
                {mockChartData.map((item) => (
                  <div 
                    key={item.name}
                    className="flex items-center justify-between p-3 bg-white rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => handleChartClick(item)}
                  >
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <Badge variant="outline" className="bg-muted">
                      {item.value} ideias
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};