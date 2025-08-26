import type { Service } from '../types';

// IMPORTANTE: Substitua a string abaixo pela URL real do seu Web App do Google Apps Script.
// Você obtém essa URL na "Parte 2, Passo 5" do arquivo README.md.
// Enquanto a URL não for alterada, o aplicativo usará dados de mock para demonstração.
export const WEB_APP_URL: string = 'https://script.google.com/macros/s/AKfycbylpL8GyyD8VohVKbROiBJ1MnHY7wJP7JbNeub1kbX0HP0avLoQdYzpZ85ZPfbWxU4Bzg/exec';

// --- Funções de Mock para demonstração ---
// Esta seção permite que o aplicativo funcione sem uma planilha real configurada.

let mockServices: Service[] = [
    { id: 1, service: "Consultoria de Casa Inteligente", need: "Ajuda para escolher e instalar dispositivos de casa inteligente compatíveis.", cluster: "Casa Inteligente", businessModel: "Consultoria", targetAudience: "Proprietários de casas", status: "aprovada", creatorName: "Ana", creationDate: "2023-10-01T10:00:00Z", scores: [5, 4, 3, 5, 4], revenueEstimate: 150000 },
    { id: 2, service: "Plano de Suporte Técnico Premium", need: "Suporte técnico 24/7 para todos os eletrônicos da casa.", cluster: "Suporte Técnico", businessModel: "Assinatura/Recorrência", targetAudience: "Famílias com muitos dispositivos", status: "avaliação", creatorName: "Bruno", creationDate: "2023-10-02T11:30:00Z", scores: [4, 5, 5, 4, 3], revenueEstimate: 500000 },
    { id: 3, service: "Aluguel de Equipamentos de Realidade Virtual", need: "Acesso a equipamentos de VR de ponta para eventos ou uso casual.", cluster: "Acesso Flexível", businessModel: "Locação", targetAudience: "Gamers e planejadores de eventos", status: "avaliação", creatorName: "Carlos", creationDate: "2023-10-03T14:00:00Z", scores: [3, 4, 3, 4, 4], revenueEstimate: 80000 },
    { id: 4, service: "Seguro de Proteção para Eletrônicos", need: "Tranquilidade contra danos, roubos e defeitos dos seus dispositivos favoritos.", cluster: "Tranquilidade", businessModel: "Seguro", targetAudience: "Donos de dispositivos caros", status: "aprovada", creatorName: "Diana", creationDate: "2023-10-04T09:15:00Z", scores: [4, 3, 5, 4, 3], revenueEstimate: 300000 },
    { id: 5, service: "Clube de Descontos Exclusivos", need: "Acesso a descontos especiais em produtos premium e lançamentos.", cluster: "Acesso Flexível", businessModel: "Assinatura/Recorrência", targetAudience: "Entusiastas de tecnologia", status: "avaliação", creatorName: "Eduardo", creationDate: "2023-10-05T16:45:00Z", scores: [3, 4, 4, 5, 4], revenueEstimate: 200000 },
];

let nextId = mockServices.length + 1;

function isUsingMockData(): boolean {
    return WEB_APP_URL === 'https://script.google.com/macros/s/AKfycbxhnPlNOW1fd2jHtJkVFyLnavi_8Dm-0W5CNKzjMbq_9G-fCERVx54g_voglXPEGHxCqg/exec';
}

export async function getServices(): Promise<Service[]> {
    if (isUsingMockData()) {
        // Simula o tempo de carregamento
        await new Promise(resolve => setTimeout(resolve, 1500));
        return mockServices;
    }

    try {
        const getUrl = `${WEB_APP_URL}?action=getServices`;
        // Tenta via GET primeiro
        const response = await fetch(getUrl, { method: 'GET' });
        if (response.ok) {
            const data = await response.json();
            return data;
        }

        // Fallback: alguns Apps Script aceitam apenas POST
        const postResponse = await fetch(WEB_APP_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'getServices' })
        });
        if (!postResponse.ok) {
            throw new Error(`Erro HTTP: ${postResponse.status}`);
        }
        const postData = await postResponse.json();
        return postData;
    } catch (error) {
        console.error('Erro ao buscar serviços da planilha:', error);
        throw new Error('Não foi possível conectar à planilha Google. Verifique o deploy do Web App (Execute as Me; Access: Anyone) e libere CORS.');
    }
}

export async function addServiceToSheet(service: Omit<Service, 'id' | 'creationDate' | 'scores' | 'revenueEstimate'>): Promise<Service> {
    if (isUsingMockData()) {
        // Simula o tempo de processamento
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const newService: Service = {
            ...service,
            id: nextId++,
            creationDate: new Date().toISOString(),
            scores: [0, 0, 0, 0, 0], // Scores iniciais zerados
            revenueEstimate: 0
        };
        
        mockServices.push(newService);
        return newService;
    }

    try {
        const response = await fetch(WEB_APP_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'addService',
                data: service
            })
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Erro ao adicionar serviço à planilha:', error);
        throw new Error('Não foi possível adicionar o serviço. Verifique sua conexão e tente novamente.');
    }
}

export async function updateServiceInSheet(service: Service): Promise<Service> {
    if (isUsingMockData()) {
        // Simula o tempo de processamento
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const index = mockServices.findIndex(s => s.id === service.id);
        if (index !== -1) {
            mockServices[index] = service;
            return service;
        } else {
            throw new Error('Serviço não encontrado para atualização');
        }
    }

    try {
        const response = await fetch(WEB_APP_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'updateService',
                data: service
            })
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Erro ao atualizar serviço na planilha:', error);
        throw new Error('Não foi possível atualizar o serviço. Verifique sua conexão e tente novamente.');
    }
}

export async function deleteServiceFromSheet(serviceId: number): Promise<void> {
    if (isUsingMockData()) {
        // Simula o tempo de processamento
        await new Promise(resolve => setTimeout(resolve, 600));
        
        const index = mockServices.findIndex(s => s.id === serviceId);
        if (index !== -1) {
            mockServices.splice(index, 1);
        } else {
            throw new Error('Serviço não encontrado para exclusão');
        }
        return;
    }

    try {
        const response = await fetch(WEB_APP_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'deleteService',
                serviceId: serviceId
            })
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        // A resposta pode ser um JSON com sucesso ou apenas um status de OK
        return;
    } catch (error) {
        console.error('Erro ao deletar serviço da planilha:', error);
        throw new Error('Não foi possível deletar o serviço. Verifique sua conexão e tente novamente.');
    }
}