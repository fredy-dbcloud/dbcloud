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

export function AICopilotChat() {
  const [messages, setMessages] = useState<CopilotMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
        content: 'Failed to get response from AI copilot.',
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
          AI Operations Copilot
        </CardTitle>
        <CardDescription>
          Ask about client risks, upgrade opportunities, margins, and operational priorities
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ScrollArea className="h-[400px] border rounded-lg p-4 bg-muted/30">
          {messages.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              <Bot className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="font-medium">Ask the AI Copilot</p>
              <p className="text-sm mt-2">Try questions like:</p>
              <ul className="text-sm mt-2 space-y-1">
                <li>"Which clients are at risk this week?"</li>
                <li>"Who should we contact for upgrades?"</li>
                <li>"Which requests threaten our margins?"</li>
                <li>"What should the team focus on today?"</li>
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
                      {msg.timestamp.toLocaleTimeString()}
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
            placeholder="Ask about client risks, upgrades, margins..."
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
