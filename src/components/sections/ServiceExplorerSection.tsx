import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Search, Filter, Edit, Trash2, Star, TrendingUp } from "lucide-react";

// Extended mock data for service explorer
const mockServices = [
  {
    id: 1,
    name: "Sistema de Manutenção Preditiva para Drones",
    cluster: "Agricultura Tech",
    businessModel: "SaaS",
    status: "Em Avaliação",
    priority: "Altíssima",
    description: "Plataforma de IA que prediz falhas em drones agrícolas, otimizando manutenção e reduzindo custos operacionais.",
    creator: "João Silva",
    score: 4.16,
    createdAt: "2024-01-15"
  },
  {
    id: 2,
    name: "Seguro Inteligente para Patinetes Elétricos",
    cluster: "Mobilidade Verde",
    businessModel: "Seguro",
    status: "Aprovada",
    priority: "Alta",
    description: "Seguro baseado em dados de uso e comportamento do condutor, oferecendo preços personalizados e cobertura em tempo real.",
    creator: "Maria Santos", 
    score: 3.94,
    createdAt: "2024-01-12"
  },
  {
    id: 3,
    name: "Plataforma de Telemedicina Rural",
    cluster: "Saúde Digital",
    businessModel: "Marketplace",
    status: "Em Desenvolvimento",
    priority: "Alta", 
    description: "Conecta médicos especialistas a pacientes em áreas rurais através de consultas virtuais e diagnósticos remotos.",
    creator: "Dr. Carlos Mendoza",
    score: 4.08,
    createdAt: "2024-01-10"
  },
  {
    id: 4,
    name: "Smart Grid Residencial",
    cluster: "Energia Inteligente",
    businessModel: "SaaS",
    status: "Pausada",
    priority: "Média",
    description: "Sistema de gerenciamento inteligente de energia residencial com otimização automática de consumo.",
    creator: "Ana Costa",
    score: 3.45,
    createdAt: "2024-01-08"
  },
  {
    id: 5,
    name: "Marketplace de Energia Solar",
    cluster: "Sustentabilidade",
    businessModel: "Marketplace",
    status: "Em Avaliação",
    priority: "Média",
    description: "Plataforma que conecta produtores de energia solar residencial com consumidores locais.",
    creator: "Pedro Oliveira",
    score: 3.67,
    createdAt: "2024-01-05"
  },
  {
    id: 6,
    name: "Automação Inteligente de Jardins",
    cluster: "Casa Inteligente",
    businessModel: "Produto",
    status: "Aprovada",
    priority: "Baixa",
    description: "Sistema IoT para irrigação e cuidado automático de jardins baseado em dados climáticos e do solo.",
    creator: "Luisa Fernandez",
    score: 3.23,
    createdAt: "2024-01-03"
  }
];

const clusters = ["Todos", "Casa Inteligente", "Mobilidade Verde", "Saúde Digital", "Sustentabilidade", "Agricultura Tech", "Energia Inteligente"];
const businessModels = ["Todos", "SaaS", "Marketplace", "Seguro", "Produto", "Consultoria"];
const statuses = ["Todos", "Em Avaliação", "Aprovada", "Em Desenvolvimento", "Pausada", "Cancelada"];
const priorities = ["Todas", "Altíssima", "Alta", "Média", "Baixa"];

export const ServiceExplorerSection = () => {
  const [services, setServices] = useState(mockServices);
  const [filteredServices, setFilteredServices] = useState(mockServices);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCluster, setFilterCluster] = useState("Todos");
  const [filterModel, setFilterModel] = useState("Todos");
  const [filterStatus, setFilterStatus] = useState("Todos");
  const [filterPriority, setFilterPriority] = useState("Todas");
  const [editingService, setEditingService] = useState<any>(null);

  // Apply filters
  const applyFilters = () => {
    let filtered = services.filter(service => {
      const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          service.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCluster = filterCluster === "Todos" || service.cluster === filterCluster;
      const matchesModel = filterModel === "Todos" || service.businessModel === filterModel;
      const matchesStatus = filterStatus === "Todos" || service.status === filterStatus;
      const matchesPriority = filterPriority === "Todas" || service.priority === filterPriority;
      
      return matchesSearch && matchesCluster && matchesModel && matchesStatus && matchesPriority;
    });
    
    setFilteredServices(filtered);
  };

  // Apply filters whenever dependencies change
  useState(() => {
    applyFilters();
  });

  const handleDelete = (serviceId: number) => {
    if (confirm("Tem certeza que deseja excluir esta ideia?")) {
      const updatedServices = services.filter(s => s.id !== serviceId);
      setServices(updatedServices);
      setFilteredServices(updatedServices.filter(service => {
        const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCluster = filterCluster === "Todos" || service.cluster === filterCluster;
        const matchesModel = filterModel === "Todos" || service.businessModel === filterModel;
        const matchesStatus = filterStatus === "Todos" || service.status === filterStatus;
        const matchesPriority = filterPriority === "Todas" || service.priority === filterPriority;
        return matchesSearch && matchesCluster && matchesModel && matchesStatus && matchesPriority;
      }));
    }
  };

  const handleEdit = (service: any) => {
    setEditingService({...service});
  };

  const handleSaveEdit = () => {
    if (editingService) {
      const updatedServices = services.map(s => 
        s.id === editingService.id ? editingService : s
      );
      setServices(updatedServices);
      applyFilters();
      setEditingService(null);
    }
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      "Altíssima": "bg-destructive/10 text-destructive border-destructive/20",
      "Alta": "bg-warning/10 text-warning border-warning/20", 
      "Média": "bg-primary/10 text-primary border-primary/20",
      "Baixa": "bg-muted text-muted-foreground border-muted"
    };
    return colors[priority as keyof typeof colors] || colors["Média"];
  };

  const getStatusColor = (status: string) => {
    const colors = {
      "Em Avaliação": "bg-warning/10 text-warning border-warning/20",
      "Aprovada": "bg-success/10 text-success border-success/20",
      "Em Desenvolvimento": "bg-primary/10 text-primary border-primary/20",
      "Pausada": "bg-muted text-muted-foreground border-muted",
      "Cancelada": "bg-destructive/10 text-destructive border-destructive/20"
    };
    return colors[status as keyof typeof colors] || colors["Em Avaliação"];
  };

  return (
    <section id="explorer" className="py-16 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-success to-success-light rounded-full mb-6">
            <Search className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Explorador de Serviços
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Navegue, filtre e gerencie todo o portfólio de ideias. 
            Encontre rapidamente as soluções que precisa e acompanhe seu progresso.
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8 bg-gradient-to-r from-background to-muted/20">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filtros de Busca
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              <div>
                <Label>Buscar</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Nome ou descrição..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setTimeout(applyFilters, 300);
                    }}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div>
                <Label>Cluster</Label>
                <Select value={filterCluster} onValueChange={(value) => {
                  setFilterCluster(value);
                  setTimeout(applyFilters, 100);
                }}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {clusters.map(cluster => (
                      <SelectItem key={cluster} value={cluster}>{cluster}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Modelo de Negócio</Label>
                <Select value={filterModel} onValueChange={(value) => {
                  setFilterModel(value);
                  setTimeout(applyFilters, 100);
                }}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {businessModels.map(model => (
                      <SelectItem key={model} value={model}>{model}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Status</Label>
                <Select value={filterStatus} onValueChange={(value) => {
                  setFilterStatus(value);
                  setTimeout(applyFilters, 100);
                }}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map(status => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Prioridade</Label>
                <Select value={filterPriority} onValueChange={(value) => {
                  setFilterPriority(value);
                  setTimeout(applyFilters, 100);
                }}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {priorities.map(priority => (
                      <SelectItem key={priority} value={priority}>{priority}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button 
                  onClick={() => {
                    setSearchTerm("");
                    setFilterCluster("Todos");
                    setFilterModel("Todos");
                    setFilterStatus("Todos");
                    setFilterPriority("Todas");
                    setFilteredServices(services);
                  }}
                  variant="outline"
                  className="w-full"
                >
                  Limpar Filtros
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            {filteredServices.length} de {services.length} ideias encontradas
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <Card key={service.id} className="bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-warning fill-warning" />
                    <span className="font-bold text-lg">{service.score}</span>
                  </div>
                  <div className="flex space-x-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(service)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(service.id)}
                      className="h-8 w-8 p-0 hover:bg-destructive hover:text-destructive-foreground"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <CardTitle className="text-lg leading-tight">{service.name}</CardTitle>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {service.description}
                </p>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">
                      {service.cluster}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {service.businessModel}
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className={`text-xs ${getStatusColor(service.status)}`}>
                      {service.status}
                    </Badge>
                    <Badge variant="outline" className={`text-xs ${getPriorityColor(service.priority)}`}>
                      {service.priority}
                    </Badge>
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    <p>Criado por: <span className="font-medium">{service.creator}</span></p>
                    <p>Data: {new Date(service.createdAt).toLocaleDateString('pt-BR')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Edit Dialog */}
        <Dialog open={!!editingService} onOpenChange={() => setEditingService(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Editar Serviço</DialogTitle>
            </DialogHeader>
            {editingService && (
              <div className="space-y-4">
                <div>
                  <Label>Nome do Serviço</Label>
                  <Input
                    value={editingService.name}
                    onChange={(e) => setEditingService({...editingService, name: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label>Descrição</Label>
                  <Textarea
                    value={editingService.description}
                    onChange={(e) => setEditingService({...editingService, description: e.target.value})}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Cluster</Label>
                    <Select 
                      value={editingService.cluster} 
                      onValueChange={(value) => setEditingService({...editingService, cluster: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {clusters.filter(c => c !== "Todos").map(cluster => (
                          <SelectItem key={cluster} value={cluster}>{cluster}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Status</Label>
                    <Select 
                      value={editingService.status} 
                      onValueChange={(value) => setEditingService({...editingService, status: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {statuses.filter(s => s !== "Todos").map(status => (
                          <SelectItem key={status} value={status}>{status}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => setEditingService(null)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleSaveEdit}>
                    Salvar Alterações
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};