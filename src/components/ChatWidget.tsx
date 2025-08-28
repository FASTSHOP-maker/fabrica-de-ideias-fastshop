import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, X, Bot, User, Loader2, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: number;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState(localStorage.getItem('ai_webhook_url') || '');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'ai',
      content: 'Olá! Sou seu assistente de inovação. Posso ajudar você a analisar o portfólio de ideias, encontrar insights e responder perguntas sobre os projetos. Como posso ajudar?',
      timestamp: new Date()
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { toast } = useToast();

  const exampleQuestions = [
    "Quais são nossas ideias mais promissoras?",
    "Resuma as ideias do cluster Casa Inteligente",
    "Quais ideias têm maior potencial de receita?",
    "Mostre ideias com score acima de 4.0"
  ];

  const handleSendMessage = async () => {
    if (!currentMessage.trim() || isTyping) return;

    // Verificar se webhook está configurado
    if (!webhookUrl) {
      setShowConfig(true);
      toast({
        title: "Configuração necessária",
        description: "Configure a URL do webhook N8N/Make para conectar com a IA",
        variant: "destructive",
      });
      return;
    }

    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      content: currentMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const messageToSend = currentMessage;
    setCurrentMessage('');
    setIsTyping(true);

    try {
      const { sendChatMessage } = await import('@/services/aiGateway');
      const aiContent = await sendChatMessage(messageToSend);
      
      const aiResponse: Message = {
        id: Date.now() + 1,
        type: 'ai',
        content: aiContent,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      
    } catch (error) {
      console.error("Erro ao enviar mensagem via AI Gateway:", error);
      
      // Fallback para resposta local em caso de erro
      const aiResponse: Message = {
        id: Date.now() + 1,
        type: 'ai',
        content: getAIResponse(messageToSend),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      
      let errorMessage = "Usando resposta local. Verifique a URL do webhook.";
      if (error instanceof Error) {
        if (error.message === 'WEBHOOK_NOT_CONFIGURED') {
          errorMessage = "Configure a URL do webhook para conectar com a IA.";
          setShowConfig(true);
        } else if (error.message === 'TIMEOUT') {
          errorMessage = "Timeout na conexão. Tente novamente.";
        }
      }
      
      toast({
        title: "Erro na conexão",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsTyping(false);
    }
  };

  const getAIResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('promissoras') || lowerQuestion.includes('melhores')) {
      return 'Com base na análise atual, as ideias mais promissoras são:\n\n1. **Sistema de Manutenção Preditiva para Drones** (Score: 4.16) - Agricultura Tech\n2. **Plataforma de Telemedicina Rural** (Score: 4.08) - Saúde Digital\n3. **Seguro Inteligente para Patinetes** (Score: 3.94) - Mobilidade Verde\n\nTodas apresentam alto alinhamento estratégico e grande valor para o cliente.';
    }
    
    if (lowerQuestion.includes('casa inteligente') || lowerQuestion.includes('cluster')) {
      return 'No cluster **Casa Inteligente**, temos atualmente:\n\n🏠 **Automação Inteligente de Jardins** (Score: 3.23)\n- Modelo: Produto físico + software\n- Status: Aprovada\n- Foco: Sistema IoT para irrigação automática\n\nEste cluster tem potencial para expansão com ideias em automação residencial, segurança doméstica e eficiência energética.';
    }
    
    if (lowerQuestion.includes('receita') || lowerQuestion.includes('monetização')) {
      return 'As ideias com maior **potencial de receita recorrente** são:\n\n💰 **Modelos SaaS:**\n- Sistema de Manutenção Preditiva (drone maintenance)\n- Smart Grid Residencial\n\n🏪 **Modelos Marketplace:**\n- Plataforma de Telemedicina Rural\n- Marketplace de Energia Solar\n\nEstes modelos garantem receita recorrente e escalabilidade.';
    }
    
    if (lowerQuestion.includes('score') || lowerQuestion.includes('4.0')) {
      return 'Ideias com **score acima de 4.0:**\n\n⭐ **Sistema de Manutenção Preditiva** - 4.16\n⭐ **Plataforma de Telemedicina Rural** - 4.08\n\nEstas ideias se destacam por:\n- Alto alinhamento estratégico\n- Forte valor para o cliente\n- Boa viabilidade técnica\n- Mercado promissor';
    }
    
    return 'Entendi sua pergunta! Com base no portfólio atual de 47 ideias distribuídas em 6 clusters estratégicos, posso fornecer análises específicas sobre qualquer aspecto que interesse. Que tipo de insight você gostaria de explorar mais a fundo?';
  };

  const handleQuestionClick = (question: string) => {
    setCurrentMessage(question);
  };

  const handleSaveWebhook = () => {
    if (webhookUrl.trim()) {
      localStorage.setItem('ai_webhook_url', webhookUrl.trim());
      setShowConfig(false);
      toast({
        title: "Configuração salva",
        description: "URL do webhook configurada com sucesso!",
      });
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300 z-50"
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </Button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className={cn("w-96 bg-white shadow-2xl border-0 flex flex-col", 
        showConfig ? "h-[580px]" : "h-[500px]"
      )}>
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primary-dark p-4 rounded-t-lg flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Assistente IA</h3>
              <p className="text-white/80 text-sm">
                {webhookUrl ? 'Conectado via N8N/Make' : 'Modo Local'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowConfig(!showConfig)}
              className="text-white hover:bg-white/20"
            >
              <Settings className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Configuration Panel */}
        {showConfig && (
          <div className="p-4 bg-muted border-b">
            <h4 className="font-medium text-sm mb-2">Configuração do Webhook</h4>
            <p className="text-xs text-muted-foreground mb-3">
              Digite a URL do webhook do seu fluxo N8N ou Make para conectar com a IA:
            </p>
            <div className="space-y-2">
              <Input
                placeholder="https://seu-webhook-url.com/webhook"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                className="text-sm"
              />
              <div className="flex space-x-2">
                <Button onClick={handleSaveWebhook} size="sm" className="flex-1">
                  Salvar
                </Button>
                <Button variant="outline" onClick={() => setShowConfig(false)} size="sm">
                  Cancelar
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex items-start space-x-2",
                message.type === 'user' ? "justify-end" : "justify-start"
              )}
            >
              {message.type === 'ai' && (
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="h-3 w-3 text-primary" />
                </div>
              )}
              <div
                className={cn(
                  "max-w-[80%] p-3 rounded-lg text-sm",
                  message.type === 'user'
                    ? "bg-primary text-primary-foreground rounded-br-none"
                    : "bg-muted text-foreground rounded-bl-none"
                )}
              >
                <div className="whitespace-pre-wrap">{message.content}</div>
                <div className={cn(
                  "text-xs mt-1 opacity-70",
                  message.type === 'user' ? "text-primary-foreground" : "text-muted-foreground"
                )}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
              {message.type === 'user' && (
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <User className="h-3 w-3 text-primary" />
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex items-start space-x-2">
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Bot className="h-3 w-3 text-primary" />
              </div>
              <div className="bg-muted text-foreground p-3 rounded-lg rounded-bl-none flex items-center space-x-1">
                <Loader2 className="h-3 w-3 animate-spin" />
                <span className="text-sm">Pensando...</span>
              </div>
            </div>
          )}
        </div>

        {/* Example Questions */}
        {messages.length === 1 && (
          <div className="px-4 pb-2">
            <p className="text-xs text-muted-foreground mb-2">Perguntas sugeridas:</p>
            <div className="space-y-1">
              {exampleQuestions.slice(0, 2).map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuestionClick(question)}
                  className="text-xs text-primary hover:text-primary-dark bg-primary/5 hover:bg-primary/10 px-2 py-1 rounded text-left w-full transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <Input
              placeholder="Digite sua pergunta..."
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              disabled={isTyping}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!currentMessage.trim() || isTyping}
              size="sm"
              className="bg-primary hover:bg-primary-dark"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};