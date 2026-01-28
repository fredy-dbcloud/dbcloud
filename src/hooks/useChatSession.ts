import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useLang } from './useLang';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  metadata?: Record<string, unknown>;
}

type ChatStep = 'greeting' | 'interest' | 'certification' | 'collect_info' | 'thank_you';

export function useChatSession() {
  const { lang, t } = useLang();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [step, setStep] = useState<ChatStep>('greeting');
  const [sessionId, setSessionId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [leadInfo, setLeadInfo] = useState<{ email?: string; company?: string; interest?: string }>({});

  useEffect(() => {
    let stored = localStorage.getItem('dbcloud_chat_session');
    if (!stored) {
      // Generate cryptographically secure session ID with better entropy
      const randomBytes = new Uint8Array(16);
      crypto.getRandomValues(randomBytes);
      const secureId = Array.from(randomBytes)
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
      stored = `session_${Date.now()}_${secureId}`;
      localStorage.setItem('dbcloud_chat_session', stored);
    }
    setSessionId(stored);
    
    // Initial greeting
    setMessages([{
      id: 'greeting',
      role: 'assistant',
      content: t.chat.greeting,
    }]);
  }, [t.chat.greeting]);

  const saveMessage = async (role: 'user' | 'assistant', content: string, metadata?: Record<string, unknown>) => {
    if (!sessionId) return;
    
    try {
      await supabase.from('chat_messages').insert([{
        session_id: sessionId,
        role,
        content,
        lang,
        metadata: JSON.stringify(metadata || {}),
      }]);
    } catch (error) {
      console.error('Failed to save message:', error);
    }
  };

  const processResponse = useCallback(async (userMessage: string) => {
    setIsLoading(true);
    
    // Add user message
    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      role: 'user',
      content: userMessage,
    };
    setMessages(prev => [...prev, userMsg]);
    await saveMessage('user', userMessage);

    // Determine response based on step and message
    let response = '';
    let newStep = step;
    const lowerMessage = userMessage.toLowerCase();

    if (step === 'greeting' || step === 'interest') {
      if (lowerMessage.includes('certif') || lowerMessage.includes('train') || lowerMessage.includes('capacit') || lowerMessage.includes('curso')) {
        response = t.chat.certRedirect;
        newStep = 'certification';
      } else if (lowerMessage.includes('starter') || lowerMessage.includes('advisory') || lowerMessage.includes('asesoría') || lowerMessage.includes('planificación')) {
        setLeadInfo(prev => ({ ...prev, interest: 'starter_consulting' }));
        response = t.chat.askEmail;
        newStep = 'collect_info';
      } else if (lowerMessage.includes('growth') || lowerMessage.includes('execution') || lowerMessage.includes('ejecución')) {
        setLeadInfo(prev => ({ ...prev, interest: 'growth_consulting' }));
        response = t.chat.askEmail;
        newStep = 'collect_info';
      } else if (lowerMessage.includes('enterprise') || lowerMessage.includes('managed') || lowerMessage.includes('gestionado')) {
        setLeadInfo(prev => ({ ...prev, interest: 'enterprise' }));
        response = t.chat.askEmail;
        newStep = 'collect_info';
      } else if (lowerMessage.includes('cloud') || lowerMessage.includes('database') || lowerMessage.includes('base') || lowerMessage.includes('ai') || lowerMessage.includes('ia')) {
        const interest = lowerMessage.includes('cloud') ? 'cloud' : lowerMessage.includes('ai') || lowerMessage.includes('ia') ? 'ai' : 'databases';
        setLeadInfo(prev => ({ ...prev, interest }));
        response = t.chat.askEmail;
        newStep = 'collect_info';
      } else {
        response = t.chat.greeting;
      }
    } else if (step === 'collect_info') {
      // Try to extract email
      const emailMatch = userMessage.match(/[\w.-]+@[\w.-]+\.\w+/);
      if (emailMatch) {
        const email = emailMatch[0];
        const company = userMessage.replace(emailMatch[0], '').trim() || undefined;
        
        // Save lead
        try {
          await supabase.from('leads').insert({
            email,
            company,
            interest: leadInfo.interest || 'general',
            source: 'chat_widget',
            lang,
          });
        } catch (error) {
          console.error('Failed to save lead:', error);
        }
        
        response = t.chat.thankYou;
        newStep = 'thank_you';
      } else {
        response = t.chat.askEmail;
      }
    } else {
      response = t.chat.greeting;
      newStep = 'greeting';
    }

    // Add assistant response
    const assistantMsg: ChatMessage = {
      id: `assistant_${Date.now()}`,
      role: 'assistant',
      content: response,
    };
    
    setTimeout(() => {
      setMessages(prev => [...prev, assistantMsg]);
      setStep(newStep);
      setIsLoading(false);
      saveMessage('assistant', response, { step: newStep });
    }, 500);
  }, [step, lang, t, leadInfo]);

  return {
    messages,
    step,
    isLoading,
    sendMessage: processResponse,
    sessionId,
  };
}
