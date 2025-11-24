import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { GET_PRODUCTS, COLLECTION_PRODUCTS } from '../constants';

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface GeminiAssistantProps {
  currentAgenda: number;
}

export const GeminiAssistant: React.FC<GeminiAssistantProps> = ({ currentAgenda }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Buonasera. I am your digital design assistant. How can I help refine the collection or agenda today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim() || !process.env.API_KEY) return;

    const userMsg = inputValue;
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Context building based on current app state
      let products = "";
      if (currentAgenda === 100) {
        products = COLLECTION_PRODUCTS.map(p => `${p.name} (${p.price})`).join(', ');
      } else {
        products = GET_PRODUCTS(currentAgenda).map(p => `${p.name} (${p.price})`).join(', ');
      }

      let context = "";
      if (currentAgenda === 1) {
        context = "Current Context: Reviewing 'Ethereal Garden' Concept. Themes: Botanical, Surrealism, Heritage.";
      } else if (currentAgenda === 100) {
        context = `Current Context: Reviewing Product Collection. Available Items: ${products}.`;
      } else {
        context = "Current Context: General Strategy Review.";
      }

      const systemInstruction = `You are a highly sophisticated fashion assistant for Gucci's Creative Director. 
      Tone: Professional, elegant, concise, and knowledgeable about high fashion history and trends.
      ${context}
      Do not be overly chatty. Provide insightful, sharp feedback.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: userMsg,
        config: {
          systemInstruction: systemInstruction,
        },
      });

      const text = response.text || "I apologize, I cannot provide an answer at this moment.";
      setMessages(prev => [...prev, { role: 'model', text }]);
    } catch (error) {
      console.error("Gemini API Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "I am currently unable to connect to the fashion archives (API Error)." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleMicClick = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
            setIsListening(true);
        };

        recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            setInputValue(transcript);
        };

        recognition.onerror = (event: any) => {
            console.error('Speech recognition error', event.error);
            setIsListening(false);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognition.start();
    } else {
        alert("Voice input is not supported in this browser.");
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-8 right-8 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 border border-white/20
        ${isOpen ? 'bg-stone-900 rotate-45' : 'bg-gucci-gold rotate-0'}`}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        )}
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-24 right-8 z-40 w-80 md:w-96 bg-white rounded-lg shadow-2xl border border-stone-200 overflow-hidden transition-all duration-300 origin-bottom-right
        ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}
      >
        {/* Header */}
        <div className="bg-stone-900 p-4 text-white flex items-center justify-between">
           <div className="flex items-center gap-2">
             <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
             <span className="font-serif tracking-wider text-sm">AI STYLIST</span>
           </div>
           <span className="text-xs text-stone-400">Powered by Gemini</span>
        </div>

        {/* Messages */}
        <div ref={chatContainerRef} className="h-80 overflow-y-auto p-4 bg-stone-50 space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-lg p-3 text-sm leading-relaxed shadow-sm
                ${msg.role === 'user' 
                  ? 'bg-gucci-gold text-white rounded-br-none' 
                  : 'bg-white text-stone-800 border border-stone-200 rounded-bl-none'}`
                }
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-stone-200 p-3 rounded-lg rounded-bl-none">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-stone-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-stone-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-stone-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-3 bg-white border-t border-stone-200">
          <div className="relative flex items-center gap-2">
            <div className="relative flex-grow">
               <input 
                 type="text" 
                 value={inputValue}
                 onChange={(e) => setInputValue(e.target.value)}
                 onKeyDown={handleKeyDown}
                 placeholder="Ask about trends or collections..."
                 className="w-full pl-4 pr-10 py-2 bg-stone-100 border-none rounded-md text-sm focus:ring-1 focus:ring-gucci-gold outline-none text-stone-800 placeholder-stone-400"
               />
               <button 
                 onClick={handleSend}
                 disabled={isLoading || !inputValue.trim()}
                 className="absolute right-2 top-1/2 transform -translate-y-1/2 text-stone-400 hover:text-gucci-gold disabled:opacity-50"
               >
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
               </button>
            </div>
            
            <button 
              onClick={handleMicClick}
              className={`p-2 rounded-full transition-colors ${isListening ? 'bg-gucci-red text-white animate-pulse' : 'bg-stone-100 text-stone-500 hover:text-gucci-dark'}`}
              title="Voice Input"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};