import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Terminal, Loader2, Minimize2 } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { siteConfig, techStack, projects, experience } from '../config/siteConfig';

// @ts-ignore
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

// System prompt injected with Muhammad's profile data
const systemInstruction = `
You are the AI persona of Muhammad Abdullah, an AI/ML and Agentic AI Engineer.
You represent him on his portfolio website.
Your goal is to answer questions about his experience, projects, and skills based on the provided context.
Answer in a confident, professional, and slightly tech-savvy tone.
Do NOT hallucinate. If you don't know the answer based on the context, say so and offer to connect via email: ${siteConfig.email}.
Keep responses relatively short (1-3 paragraphs max) as they are displayed in a small floating chat window.

Here is the context about Muhammad:
Name: ${siteConfig.name}
Role: ${siteConfig.title}
Email: ${siteConfig.email}
Location: ${siteConfig.location}
Bio: ${siteConfig.tagline}

Skills:
${techStack.join(', ')}

Projects:
${projects.map(p => `- ${p.title}: ${p.description}`).join('\n')}

Experience:
${experience.map(e => `- ${e.role} at ${e.company} (${e.duration}): ${e.description[0]}`).join('\n')}
`;

type Message = {
  id: string;
  role: 'user' | 'model';
  text: string;
};

export default function AskMuhammadAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'model', text: "> System Online. Hello, I am Muhammad's AI assistant. Ask me anything about his skills, projects, or experience." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    if (!apiKey) {
      setError('Gemini API Key is missing. Please add VITE_GEMINI_API_KEY to your .env.local file.');
      return;
    }

    const userText = input.trim();
    const newMessage: Message = { id: Date.now().toString(), role: 'user', text: userText };
    
    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setIsLoading(true);
    setError('');

    try {
      // Prepare history format for Gemini
      const history = messages.slice(1).map(msg => ({
        role: msg.role === 'model' ? 'model' : 'user',
        parts: [{ text: msg.text }]
      }));

      // List of models to try as fallbacks (Updated for latest API tier)
      const availableModels = [
        'gemini-3.1-flash-lite',
        'gemini-3.5-flash',
        'gemini-flash-latest'
      ];

      let responseText = '';
      let success = false;
      let lastErr: any = null;

      for (const modelName of availableModels) {
        try {
          const model = genAI.getGenerativeModel({
            model: modelName,
            systemInstruction: systemInstruction,
          });

          const chat = model.startChat({ history });
          const result = await chat.sendMessage(userText);
          responseText = result.response.text();
          success = true;
          console.log(`Successfully used model: ${modelName}`);
          break; // Stop trying if we succeed
        } catch (err: any) {
          console.warn(`Model ${modelName} failed, trying next... Error: ${err.message}`);
          lastErr = err;
        }
      }

      if (!success) {
        throw lastErr || new Error('All fallback models failed to respond.');
      }

      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'model', text: responseText }]);
    } catch (err: any) {
      console.error("Agent Error:", err);
      setError(err.message || 'Failed to connect to the AI agent.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        className="glow-card"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '60px',
          height: '60px',
          borderRadius: '30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--accent-primary)',
          cursor: 'pointer',
          zIndex: 9999,
          boxShadow: '0 0 20px rgba(0, 255, 65, 0.3)'
        }}
        whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(0, 255, 65, 0.5)' }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Terminal size={24} color="var(--accent-primary)" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            style={{
              position: 'fixed',
              bottom: '90px',
              right: '24px',
              width: 'clamp(300px, 90vw, 400px)',
              height: '500px',
              background: 'var(--bg-primary)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              zIndex: 9999,
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
            }}
          >
            {/* Header */}
            <div style={{
              padding: '16px',
              borderBottom: '1px solid var(--border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'var(--bg-secondary)',
              borderTopLeftRadius: '12px',
              borderTopRightRadius: '12px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="pulse-dot green" />
                <span style={{ fontFamily: 'JetBrains Mono', fontSize: '14px', color: 'var(--text-primary)', fontWeight: 600 }}>Agent</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <Minimize2 size={18} />
              </button>
            </div>

            {/* Messages */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              fontFamily: 'JetBrains Mono',
              fontSize: '13px'
            }}>
              {messages.map(msg => (
                <div 
                  key={msg.id}
                  style={{
                    alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                    background: msg.role === 'user' ? 'rgba(0, 255, 65, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                    border: `1px solid ${msg.role === 'user' ? 'rgba(0, 255, 65, 0.3)' : 'var(--border)'}`,
                    padding: '10px 14px',
                    borderRadius: '8px',
                    maxWidth: '85%',
                    color: msg.role === 'user' ? 'var(--text-primary)' : 'var(--text-secondary)',
                    lineHeight: 1.5,
                    whiteSpace: 'pre-wrap'
                  }}
                >
                  {msg.role === 'model' && <span style={{ color: 'var(--accent-primary)' }}>$ </span>}
                  {msg.text}
                </div>
              ))}
              
              {isLoading && (
                <div style={{ alignSelf: 'flex-start', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Loader2 size={14} className="animate-spin" /> 
                  <span className="blink">processing...</span>
                </div>
              )}
              
              {error && (
                <div style={{ color: 'var(--accent-error)', fontSize: '12px', padding: '8px', border: '1px solid rgba(255,85,85,0.3)', borderRadius: '6px', background: 'rgba(255,85,85,0.1)' }}>
                  [ERROR] {error}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form 
              onSubmit={handleSend}
              style={{
                padding: '16px',
                borderTop: '1px solid var(--border)',
                display: 'flex',
                gap: '8px',
                background: 'var(--bg-secondary)',
                borderBottomLeftRadius: '12px',
                borderBottomRightRadius: '12px',
              }}
            >
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask me anything..."
                style={{
                  flex: 1,
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-primary)',
                  padding: '10px 14px',
                  borderRadius: '6px',
                  fontFamily: 'JetBrains Mono',
                  fontSize: '13px',
                  outline: 'none'
                }}
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                style={{
                  background: 'var(--accent-primary)',
                  color: '#000',
                  border: 'none',
                  padding: '10px',
                  borderRadius: '6px',
                  cursor: (isLoading || !input.trim()) ? 'not-allowed' : 'pointer',
                  opacity: (isLoading || !input.trim()) ? 0.5 : 1
                }}
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
