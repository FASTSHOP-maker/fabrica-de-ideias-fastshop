import { Button } from "@/components/ui/button";
import { HelpCircle, Lightbulb } from "lucide-react";

interface HeaderProps {
  onHelpClick: () => void;
}

export const Header = ({ onHelpClick }: HeaderProps) => {
  return (
    <header className="relative overflow-hidden bg-gradient-to-r from-primary via-primary-dark to-accent py-16 px-4">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 opacity-30"></div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
              <Lightbulb className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                Fábrica de Ideias
              </h1>
              <p className="text-xl text-white/90 font-medium">
                Transformando ideias em inovação colaborativa
              </p>
            </div>
          </div>
          
          <Button
            variant="outline"
            size="lg"
            onClick={onHelpClick}
            className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
          >
            <HelpCircle className="h-5 w-5 mr-2" />
            Ajuda
          </Button>
        </div>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h3 className="text-white font-semibold text-lg mb-2">Colaborativo</h3>
            <p className="text-white/80">Equipe trabalhando juntas em tempo real</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h3 className="text-white font-semibold text-lg mb-2">Inteligente</h3>
            <p className="text-white/80">IA para análise e priorização automática</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h3 className="text-white font-semibold text-lg mb-2">Estratégico</h3>
            <p className="text-white/80">Alinhado com objetivos corporativos</p>
          </div>
        </div>
      </div>
    </header>
  );
};