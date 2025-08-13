import { useState } from "react";
import { Header } from "@/components/Header";
import { NavigationBar } from "@/components/NavigationBar";
import { OverviewSection } from "@/components/sections/OverviewSection";
import { ClusterAnalysisSection } from "@/components/sections/ClusterAnalysisSection";
import { IdeaGeneratorSection } from "@/components/sections/IdeaGeneratorSection";
import { PrioritizationSection } from "@/components/sections/PrioritizationSection";
import { ServiceExplorerSection } from "@/components/sections/ServiceExplorerSection";
import { ChatWidget } from "@/components/ChatWidget";
import { HelpModal } from "@/components/HelpModal";

const Index = () => {
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header onHelpClick={() => setIsHelpModalOpen(true)} />
      <NavigationBar />
      
      <main>
        <OverviewSection />
        <ClusterAnalysisSection />
        <IdeaGeneratorSection />
        <PrioritizationSection />
        <ServiceExplorerSection />
      </main>

      <footer className="bg-gradient-to-r from-muted to-muted/50 py-12 px-4 mt-16">
        <div className="container mx-auto max-w-6xl text-center">
          <p className="text-muted-foreground">
            © 2024 Fábrica de Ideias - Transformando Inovação em Resultados
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Plataforma colaborativa de gestão de inovação corporativa
          </p>
        </div>
      </footer>

      <ChatWidget />
      <HelpModal isOpen={isHelpModalOpen} onClose={() => setIsHelpModalOpen(false)} />
    </div>
  );
};

export default Index;