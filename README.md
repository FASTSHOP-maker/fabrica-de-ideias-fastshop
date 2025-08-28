# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/106e590d-c96d-4e1c-b727-33c7a945257b

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/106e590d-c96d-4e1c-b727-33c7a945257b) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/106e590d-c96d-4e1c-b727-33c7a945257b) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## AI Integration with N8N/Make

This application integrates with external AI services through webhooks using N8N or Make.com for intelligent idea analysis and chat assistance.

### Webhook Configuration

The app uses a single webhook endpoint to handle two different AI assistants:

1. **Help Assistant** (`help_assistant_v1`) - For general questions and help
2. **Idea Assistant** (`idea_assistant_v1`) - For analyzing business ideas

### Payload Structure

#### Chat Messages (Help Assistant)
```json
{
  "message": "User's question",
  "assistant_id": "help_assistant_v1",
  "session_id": "session_1234567890",
  "conversation_id": "uuid-v4",
  "source": "fabrica_ideias",
  "route": "chat_help",
  "correlation_id": "uuid-v4",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "context": "fabrica_ideias_chat"
}
```

Expected response:
```json
{
  "response": "AI's text response"
}
```

#### Idea Analysis (Idea Assistant)
```json
{
  "message": "Analise esta ideia de negócio: \"ideia do usuário\"",
  "assistant_id": "idea_assistant_v1",
  "session_id": "session_1234567890",
  "conversation_id": "uuid-v4",
  "source": "fabrica_ideias",
  "route": "idea_analysis",
  "correlation_id": "uuid-v4",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "response_schema": {
    "type": "object",
    "properties": {
      "beneficio": { "type": "string", "description": "Benefício principal da ideia" },
      "publico": { "type": "string", "description": "Público-alvo identificado" },
      "modelo": { "type": "string", "description": "Modelo de negócio sugerido" }
    },
    "required": ["beneficio", "publico", "modelo"]
  }
}
```

Expected response:
```json
{
  "beneficio": "Benefício principal identificado pela IA",
  "publico": "Público-alvo sugerido pela IA",
  "modelo": "Modelo de negócio recomendado pela IA"
}
```

### N8N/Make Flow Setup

1. **Webhook Trigger**: Configure to receive POST requests
2. **Switch/Router Node**: Route based on `assistant_id`:
   - `help_assistant_v1` → Chat processing flow
   - `idea_assistant_v1` → Idea analysis flow
3. **LLM Integration**: Connect to your preferred LLM service (OpenAI, Claude, etc.)
4. **Response Formatting**: Ensure responses match the expected format above

### Security Considerations

- The app supports optional `X-Webhook-Token` header for authentication
- Store webhook token in localStorage as `ai_webhook_token`
- Configure CORS properly in your N8N/Make webhook
- Use HTTPS endpoints for production

### Prompt Examples for LLM

#### For Idea Analysis:
```
Você é um especialista em análise de negócios. Analise a seguinte ideia e retorne APENAS um JSON válido no formato:

{
  "beneficio": "Descreva o principal benefício desta ideia em 1-2 frases",
  "publico": "Identifique o público-alvo ideal em 1-2 frases", 
  "modelo": "Sugira o melhor modelo de negócio em 1-2 frases"
}

Ideia: [IDEA_TEXT]

Importante: Retorne APENAS o JSON, sem texto adicional.
```

#### For Chat Help:
```
Você é um assistente especializado na "Fábrica de Ideias", uma plataforma de gestão de portfólio de inovação. Responda perguntas sobre ideias, análises, clusters estratégicos e insights do portfólio de forma amigável e útil.

Pergunta: [USER_MESSAGE]
```
