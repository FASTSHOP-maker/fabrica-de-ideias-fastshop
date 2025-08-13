import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const sections = [
  { id: "overview", label: "Visão Geral" },
  { id: "clusters", label: "Análise de Clusters" },
  { id: "generator", label: "Gerador de Ideias" },
  { id: "prioritization", label: "Priorização" },
  { id: "explorer", label: "Explorador" },
];

export const NavigationBar = () => {
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b shadow-sm">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-center space-x-8 py-4">
          {sections.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={cn(
                "px-4 py-2 rounded-lg font-medium transition-all duration-200",
                "hover:bg-primary/10 hover:text-primary",
                activeSection === id
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};