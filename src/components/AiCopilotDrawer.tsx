import React, { useState, useEffect, useRef } from 'react';
import { CitizenProfile } from '../types/profile';
import { CertificateInventory } from '../types/certificate';
import { EvaluationResult } from '../types/scheme';
import { ClericalAuditReport } from '../engine/clericalAudit';
import { CopilotEngine, CopilotMessage } from '../engine/copilotEngine';
import { Language } from '../types/language';
import { 
  Bot, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  X, 
  Sparkles, 
  ShieldCheck, 
  RefreshCw,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface AiCopilotDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  profile: CitizenProfile;
  inventory: CertificateInventory;
  evaluationResults: EvaluationResult[];
  auditReport?: ClericalAuditReport;
  currentLanguage: Language;
  onNavigateTo: (page: string) => void;
}

export const AiCopilotDrawer: React.FC<AiCopilotDrawerProps> = ({
  isOpen,
  onClose,
  profile,
  inventory,
  evaluationResults,
  auditReport,
  currentLanguage,
  onNavigateTo
}) => {
  const [messages, setMessages] = useState<CopilotMessage[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Initialize greeting message on first open
  useEffect(() => {
    if (messages.length === 0) {
      const initialGreeting = CopilotEngine.processQuery(
        'hello',
        profile,
        inventory,
        evaluationResults,
        auditReport,
        currentLanguage
      );
      setMessages([initialGreeting]);
    }
  }, [profile, inventory, evaluationResults, auditReport]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Speech Recognition Setup
  useEffect(() => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      
      const langMap: Record<Language, string> = {
        en: 'en-IN',
        hi: 'hi-IN',
        te: 'te-IN',
        ta: 'ta-IN',
        ml: 'ml-IN'
      };
      recognition.lang = langMap[currentLanguage] || 'en-IN';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        handleSendQuery(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, [currentLanguage]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in this browser. Please use Chrome or Edge.');
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleSpeechOutput = (text: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const cleanText = text.replace(/[*#`•_]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    const langMap: Record<Language, string> = {
      en: 'en-IN',
      hi: 'hi-IN',
      te: 'te-IN',
      ta: 'ta-IN',
      ml: 'ml-IN'
    };
    utterance.lang = langMap[currentLanguage] || 'en-IN';
    utterance.rate = 0.95;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleSendQuery = (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg: CopilotMessage = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updated = [...messages, userMsg];
    setMessages(updated);
    setInputText('');

    setTimeout(() => {
      const reply = CopilotEngine.processQuery(
        query,
        profile,
        inventory,
        evaluationResults,
        auditReport,
        currentLanguage
      );
      setMessages([...updated, reply]);
    }, 300);
  };

  const handleActionClick = (action: string) => {
    if (action === 'OPEN_ROADMAP') onNavigateTo('inventory');
    if (action === 'OPEN_AUDIT') onNavigateTo('audit');
    if (action === 'OPEN_EXTORTION') onNavigateTo('anti-extortion');
    if (action === 'OPEN_DASHBOARD') onNavigateTo('dashboard');
    if (action === 'OPEN_DOSSIER') onNavigateTo('audit');
    if (action === 'QUERY_SCHEMES') handleSendQuery('Which schemes am I eligible for?');
    if (action === 'QUERY_CERTS') handleSendQuery('How do I resolve missing certificates?');
    if (action === 'QUERY_OTR') handleSendQuery('How do I do Aadhaar OTR for NSP?');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-xs animate-fade-in">
      <div 
        className="w-full max-w-lg bg-[#FAF7F2] h-full shadow-2xl flex flex-col border-l border-amber-200 animate-slide-left"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        {/* Luxury Drawer Header */}
        <div className="bg-[#0B1B4F] text-white p-4 sm:p-5 border-b border-amber-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
              <Bot className="w-5 h-5 text-[#FDE68A]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-black text-base text-white tracking-wide">
                  JanSetu AI Copilot
                </h3>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  LIVE AUDIT
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                Context-Aware Civic &amp; Scholarship Assistant
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                const initialGreeting = CopilotEngine.processQuery('hello', profile, inventory, evaluationResults, auditReport, currentLanguage);
                setMessages([initialGreeting]);
              }}
              className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              title="Reset Chat"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Live Profile Context Pill */}
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2.5 flex items-center justify-between text-xs text-amber-900">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-700" />
            <span>Auditing: <strong>{profile.fullName}</strong> ({profile.stateOfDomicile})</span>
          </div>
          <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
            {profile.category} • Income ₹{(profile.annualIncome/100000).toFixed(2)}L
          </span>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[90%] rounded-2xl p-4 shadow-xs text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-[#0B1B4F] text-white rounded-tr-xs'
                      : 'bg-white border border-slate-200 text-slate-800 rounded-tl-xs shadow-sm'
                  }`}
                >
                  <div className="whitespace-pre-line">
                    {msg.text}
                  </div>

                  {/* Action Suggestions */}
                  {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                      {msg.suggestedActions.map((act, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleActionClick(act.action)}
                          className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <span>{act.label}</span>
                          <ChevronRight className="w-3 h-3 text-amber-700" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 mt-1 px-1 text-[10px] text-slate-600 font-medium">
                  <span>{msg.timestamp}</span>
                  {!isUser && (
                    <button
                      onClick={() => handleSpeechOutput(msg.text)}
                      className="text-slate-600 hover:text-[#0B1B4F] flex items-center gap-0.5 cursor-pointer"
                      title="Audio Readout (Web Speech)"
                    >
                      {isSpeaking ? (
                        <VolumeX className="w-3 h-3 text-rose-500" />
                      ) : (
                        <Volume2 className="w-3 h-3 text-amber-700" />
                      )}
                      <span>{isSpeaking ? 'Stop' : 'Listen'}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-4 py-2 bg-slate-100/80 border-t border-slate-200 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <button
            onClick={() => handleSendQuery('Which schemes am I eligible for?')}
            className="text-[11px] font-bold whitespace-nowrap px-2.5 py-1 rounded-full bg-white text-slate-700 hover:bg-amber-50 hover:text-amber-900 border border-slate-300 transition-colors cursor-pointer"
          >
            🎯 Eligible Schemes
          </button>
          <button
            onClick={() => handleSendQuery('How to resolve missing certificates?')}
            className="text-[11px] font-bold whitespace-nowrap px-2.5 py-1 rounded-full bg-white text-slate-700 hover:bg-amber-50 hover:text-amber-900 border border-slate-300 transition-colors cursor-pointer"
          >
            📋 Missing Documents
          </button>
          <button
            onClick={() => handleSendQuery('Is my Aadhaar and Marksheet name matching?')}
            className="text-[11px] font-bold whitespace-nowrap px-2.5 py-1 rounded-full bg-white text-slate-700 hover:bg-amber-50 hover:text-amber-900 border border-slate-300 transition-colors cursor-pointer"
          >
            🔍 Name Audit
          </button>
          <button
            onClick={() => handleSendQuery('What are the statutory legal fees?')}
            className="text-[11px] font-bold whitespace-nowrap px-2.5 py-1 rounded-full bg-white text-slate-700 hover:bg-amber-50 hover:text-amber-900 border border-slate-300 transition-colors cursor-pointer"
          >
            🛡️ Legal Fees
          </button>
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-200 flex items-center gap-2">
          <button
            onClick={toggleListening}
            className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
              isListening
                ? 'bg-rose-500 text-white border-rose-600 animate-pulse'
                : 'bg-slate-100 text-slate-600 hover:bg-amber-50 hover:text-amber-900 border-slate-200'
            }`}
            title={isListening ? 'Listening... click to stop' : 'Click to Speak (Voice Input)'}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5 text-amber-700" />}
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendQuery();
            }}
            placeholder="Ask about schemes, OTR, missing certificates..."
            className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0B1B4F] focus:border-transparent font-sans"
          />

          <button
            onClick={() => handleSendQuery()}
            disabled={!inputText.trim()}
            className="p-2.5 rounded-xl bg-[#0B1B4F] text-white hover:bg-[#152864] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm cursor-pointer"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
