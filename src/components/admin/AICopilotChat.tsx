import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, Send } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { supabase } from '@/integrations/supabase/client';

interface CopilotMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AICopilotChatProps {
  lang?: 'en' | 'es';
}

export function AICopilotChat({ lang = 'en' }: AICopilotChatProps) {
  const [messages, setMessages] = useState<CopilotMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const labels = {
    en: {
      title: 'AI Operations Copilot',
      description: 'Ask about client risks, upgrade opportunities, margins, and operational priorities',
      askCopilot: 'Ask the AI Copilot',
      tryQuestions: 'Try questions like:',
      question1: '"Which clients are at risk this week?"',
      question2: '"Who should we contact for upgrades?"',
      question3: '"Which requests threaten our margins?"',
      question4: '"What should the team focus on today?"',
      placeholder: 'Ask about client risks, upgrades, margins...',
      failed: 'Failed to get response from AI copilot.',
    },
    es: {
      title: 'Copiloto de Operaciones IA',
      description: 'Pregunta sobre riesgos de clientes, oportunidades de upgrade, márgenes y prioridades operativas',
      askCopilot: 'Pregunta al Copiloto IA',
      tryQuestions: 'Prueba preguntas como:',
      question1: '"¿Qué clientes están en riesgo esta semana?"',
      question2: '"¿A quién deberíamos contactar para upgrades?"',
      question3: '"¿Qué solicitudes amenazan nuestros márgenes?"',
      question4: '"¿En qué debería enfocarse el equipo hoy?"',
      placeholder: 'Pregunta sobre riesgos, upgrades, márgenes...',
      failed: 'No se pudo obtener respuesta del copiloto IA.',
    },
  };

  const t = labels[lang];

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: CopilotMessage = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('ai-copilot', {
        body: { query: input },
      });
      
      const assistantMessage: CopilotMessage = {
        role: 'assistant',
        content: !error && data?.success ? data.answer : `Error: ${data?.error || error?.message || 'Unknown error'}`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      const errorMessage: CopilotMessage = {
        role: 'assistant',
        content: t.failed,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    }
    setIsLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          {t.title}
        </CardTitle>
        <CardDescription>
          {t.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ScrollArea className="h-[400px] border rounded-lg p-4 bg-muted/30">
          {messages.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              <Bot className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="font-medium">{t.askCopilot}</p>
              <p className="text-sm mt-2">{t.tryQuestions}</p>
              <ul className="text-sm mt-2 space-y-1">
                <li>{t.question1}</li>
                <li>{t.question2}</li>
                <li>{t.question3}</li>
                <li>{t.question4}</li>
              </ul>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-lg p-3 ${
                    msg.role === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-card border'
                  }`}>
                    {msg.role === 'assistant' ? (
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    ) : (
                      <p className="text-sm">{msg.content}</p>
                    )}
                    <p className="text-xs opacity-70 mt-2">
                      {msg.timestamp.toLocaleTimeString(lang === 'es' ? 'es-ES' : 'en-US')}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-card border rounded-lg p-3">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <div className="animate-pulse">●</div>
                      <div className="animate-pulse delay-100">●</div>
                      <div className="animate-pulse delay-200">●</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </ScrollArea>
        <div className="flex gap-2">
          <Textarea
            placeholder={t.placeholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            rows={2}
            className="resize-none"
          />
          <Button 
            onClick={sendMessage} 
            disabled={isLoading || !input.trim()}
            size="icon"
            className="shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
