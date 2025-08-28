import { v4 as uuidv4 } from 'uuid';

export interface ChatMessage {
  message: string;
  assistant_id: string;
  session_id: string;
  conversation_id: string;
  source: string;
  route: string;
  correlation_id: string;
  timestamp: string;
  context?: string;
}

export interface IdeaAnalysisPayload {
  message: string;
  assistant_id: string;
  session_id: string;
  conversation_id: string;
  source: string;
  route: string;
  correlation_id: string;
  timestamp: string;
  response_schema: {
    type: "object";
    properties: {
      beneficio: { type: "string"; description: "Benefício principal da ideia" };
      publico: { type: "string"; description: "Público-alvo identificado" };
      modelo: { type: "string"; description: "Modelo de negócio sugerido" };
    };
    required: ["beneficio", "publico", "modelo"];
  };
}

export interface IdeaAnalysisResponse {
  beneficio: string;
  publico: string;
  modelo: string;
}

/**
 * Envia uma mensagem para o assistente de ajuda via webhook
 */
export async function sendChatMessage(message: string): Promise<string> {
  const webhookUrl = localStorage.getItem('ai_webhook_url');
  
  if (!webhookUrl) {
    throw new Error('WEBHOOK_NOT_CONFIGURED');
  }

  const payload: ChatMessage = {
    message,
    assistant_id: "help_assistant_v1",
    session_id: `session_${Date.now()}`,
    conversation_id: uuidv4(),
    source: "fabrica_ideias",
    route: "chat_help",
    correlation_id: uuidv4(),
    timestamp: new Date().toISOString(),
    context: "fabrica_ideias_chat"
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 20000); // 20s timeout

  try {
    console.log("Enviando mensagem para assistente de ajuda:", payload);
    
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(localStorage.getItem('ai_webhook_token') && {
          "X-Webhook-Token": localStorage.getItem('ai_webhook_token')!
        })
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data.response || data.message || "Recebi sua mensagem, mas não consegui gerar uma resposta adequada.";

  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('TIMEOUT');
      }
      console.error("Erro ao enviar mensagem para webhook:", error);
      throw error;
    }
    
    throw new Error('UNKNOWN_ERROR');
  }
}

/**
 * Envia uma ideia para análise via webhook e retorna estrutura JSON
 */
export async function analyzeIdea(idea: string): Promise<IdeaAnalysisResponse> {
  const webhookUrl = localStorage.getItem('ai_webhook_url');
  
  if (!webhookUrl) {
    throw new Error('WEBHOOK_NOT_CONFIGURED');
  }

  const payload: IdeaAnalysisPayload = {
    message: `Analise esta ideia de negócio: "${idea}"`,
    assistant_id: "idea_assistant_v1",
    session_id: `session_${Date.now()}`,
    conversation_id: uuidv4(),
    source: "fabrica_ideias",
    route: "idea_analysis",
    correlation_id: uuidv4(),
    timestamp: new Date().toISOString(),
    response_schema: {
      type: "object",
      properties: {
        beneficio: { type: "string", description: "Benefício principal da ideia" },
        publico: { type: "string", description: "Público-alvo identificado" },
        modelo: { type: "string", description: "Modelo de negócio sugerido" }
      },
      required: ["beneficio", "publico", "modelo"]
    }
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 20000); // 20s timeout

  try {
    console.log("Enviando ideia para análise:", payload);
    
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(localStorage.getItem('ai_webhook_token') && {
          "X-Webhook-Token": localStorage.getItem('ai_webhook_token')!
        })
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Espera-se que a resposta venha no formato { beneficio, publico, modelo }
    if (data.beneficio && data.publico && data.modelo) {
      return {
        beneficio: data.beneficio,
        publico: data.publico,
        modelo: data.modelo
      };
    }
    
    // Fallback se a resposta não estiver no formato esperado
    throw new Error('INVALID_RESPONSE_FORMAT');

  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('TIMEOUT');
      }
      console.error("Erro ao analisar ideia via webhook:", error);
      throw error;
    }
    
    throw new Error('UNKNOWN_ERROR');
  }
}

/**
 * Verifica se o webhook está configurado
 */
export function isWebhookConfigured(): boolean {
  const webhookUrl = localStorage.getItem('ai_webhook_url');
  return !!webhookUrl && webhookUrl.trim().length > 0;
}