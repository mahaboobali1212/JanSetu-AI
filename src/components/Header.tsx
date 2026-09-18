import React, { useState } from 'react';
import { Language, SUPPORTED_LANGUAGES } from '../types/language';
import { TRANSLATIONS } from '../data/translations';
import { SpeechAssistant } from '../engine/speechAssistant';
import { 
  ShieldCheck, 
  Volume2, 
  VolumeX, 
  Globe, 
  FileCheck2, 
  Award, 
  PhoneCall, 
  UserCheck,
  Bot,
  Printer,
  Sparkles,
  Scale,
  Layers,
  Calendar,
  Cloud
} from 'lucide-react';

interface HeaderProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  currentPage: string;
  onNavigate: (page: string) => void;
  readinessPercentage: number;
  onOpenCopilot?: () => void;
  onOpenDossier?: () => void;
  onOpenAwsStack?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLanguage,
  onLanguageChange,
  currentPage,
  onNavigate,
  readinessPercentage,
  onOpenCopilot,
  onOpenDossier,
  onOpenAwsStack
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  const toggleSpeech = () => {
    if (isSpeaking) {
      SpeechAssistant.stop();
      setIsSpeaking(false);
    } else {
      const summaryText = `${t.app_title}. ${t.app_tagline}. ${t.app_sub}`;
      SpeechAssistant.speak(summaryText, currentLanguage);
      setIsSpeaking(true);
    }
  };

  const navItems = [
    { id: 'login', label: t.nav_step1, icon: UserCheck },
    { id: 'inventory', label: t.nav_step2, icon: FileCheck2 },
    { id: 'dashboard', label: t.nav_step3, icon: Award },
    { id: 'audit', label: t.nav_audit, icon: ShieldCheck },
    { id: 'grievance', label: t.nav_grievance || 'RTI & Grievance', icon: Scale },
    { id: 'anti-extortion', label: t.nav_anti_extortion, icon: PhoneCall },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FDFBF7] shadow-sm border-b border-[#EAE2D5]">
      {/* 1. National Tricolor Strip */}
      <div className="gov-tricolor-bar" />

      {/* 2. Top Sovereign Micro-Bar */}
      <div className="bg-[#FAF4EB] border-b border-[#EADFCF] py-1.5 px-4 sm:px-8 text-[11px] text-[#6B5740] flex flex-wrap items-center justify-between gap-2 font-medium">
        <div className="flex items-center gap-3">
          <span className="font-bold text-[#3B2D1D] flex items-center gap-1.5 font-serif tracking-wide">
            <span>🏛️</span>
            <span>भारत सरकार • GOVERNMENT OF INDIA</span>
          </span>
          <span className="text-[#D8C7B0] hidden sm:inline">|</span>
          <span className="text-[#7A6650] hidden sm:inline font-sans text-[11px]">
            National Statutory Scholarship & Entitlement Access Portal
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Audio Reader */}
          <button
            onClick={toggleSpeech}
            className={`flex items-center gap-1 px-3 py-0.5 rounded-full text-[11px] font-bold transition-all ${
              isSpeaking
                ? 'bg-amber-200/80 text-amber-950 border border-amber-400 animate-pulse'
                : 'bg-white hover:bg-amber-50 text-slate-700 border border-[#DACBB8] shadow-sm'
            }`}
            title="Listen to page contents in selected language"
          >
            {isSpeaking ? <VolumeX className="w-3 h-3 text-amber-800" /> : <Volume2 className="w-3 h-3 text-slate-600" />}
            <span>{isSpeaking ? t.stop_speech : t.listen_speech}</span>
          </button>

          {/* 5-Language Switcher */}
          <div className="flex items-center gap-1 bg-white px-2 py-0.5 rounded-full border border-[#DACBB8] shadow-sm">
            <Globe className="w-3 h-3 text-slate-500 mr-1" />
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isActive = currentLanguage === lang.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => onLanguageChange(lang.code)}
                  className={`px-2 py-0.5 rounded-full text-[11px] font-bold transition-all ${
                    isActive
                      ? 'bg-[#0B1B4F] text-[#F5E29F]'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {lang.nativeLabel}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Main Luxury Editorial Branding Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand with Editorial Serif Typography */}
        <div 
          onClick={() => onNavigate('login')}
          className="flex items-center gap-4 cursor-pointer group"
        >
          {/* Circular Gold Seal Motif (Inspired by user uploaded image) */}
          <div className="w-13 h-13 rounded-full gold-seal-badge flex items-center justify-center p-2.5 text-center shrink-0 group-hover:scale-105 transition-transform">
            <div className="text-[9px] font-black text-[#644616] uppercase font-display leading-tight">
              JS<br />
              <span className="text-[7px] tracking-tighter">AI</span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-[#0B1B4F] tracking-tight flex items-center gap-2 font-serif">
                JanSetu <span className="font-cormorant italic font-normal text-amber-800 text-3xl">AI</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-sans tracking-widest uppercase">
                  जनसेतु
                </span>
              </h1>
            </div>
            <p className="text-xs text-[#64748B] font-medium tracking-wide">
              Civic Access Flight Deck & Pre-Flight Audit System
            </p>
          </div>
        </div>

        {/* Right: Gold Seal Readiness Indicator */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-3 bg-[#FAF4EB] border border-[#E8DCCB] px-4 py-2 rounded-2xl">
            <span className="text-2xl">🇮🇳</span>
            <div className="text-left">
              <div className="text-[10px] font-black uppercase text-[#854D0E] tracking-wider font-display">
                AZADI KA AMRIT MAHOTSAV
              </div>
              <div className="text-[11px] text-slate-600 font-medium">
                100% Deterministic • Zero Hallucination
              </div>
            </div>
          </div>

          <div className="bg-[#0B1B4F] text-white px-4 py-2.5 rounded-2xl shadow-sm border border-[#142A6F] text-right">
            <div className="text-[10px] uppercase font-bold text-[#F5E29F] tracking-wider font-display">
              Document Readiness
            </div>
            <div className="text-lg font-black tracking-tight font-serif flex items-center justify-end gap-1.5 text-white">
              <span>{readinessPercentage}%</span>
              <span className="text-[10px] font-sans font-medium text-slate-300">Audited</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Regal Navy Navigation Ribbon */}
      <div className="bg-[#0B1B4F] border-t border-[#081338]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between overflow-x-auto no-scrollbar py-1 gap-2">
          <div className="flex items-center gap-1">
            {navItems.map((item, index) => {
              const isActive = currentPage === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold whitespace-nowrap transition-all rounded-lg ${
                    isActive
                      ? 'bg-[#152864] text-[#F5E29F] shadow-sm ring-1 ring-[#DFB738]/40'
                      : 'text-slate-300 hover:text-white hover:bg-[#152864]/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#F5E29F]' : 'text-slate-400'}`} />
                  <span className="font-sans tracking-wide">{item.label}</span>
                  {index < navItems.length - 1 && (
                    <span className="text-slate-600 ml-2 font-normal hidden md:inline">|</span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {onOpenAwsStack && (
              <button
                onClick={onOpenAwsStack}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#152864] hover:bg-[#1e388a] text-[#F5E29F] text-xs font-bold border border-[#DFB738]/40 transition-all cursor-pointer shadow-xs"
                title="View AWS Serverless & Cedar Policy Architecture"
              >
                <Cloud className="w-3.5 h-3.5 text-[#DFB738]" />
                <span className="hidden sm:inline">AWS Stack</span>
              </button>
            )}

            {onOpenDossier && (
              <button
                onClick={onOpenDossier}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#F5E29F] text-xs font-bold border border-amber-400/30 transition-all cursor-pointer"
                title="1-Click Printable Application Dossier"
              >
                <Printer className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">1-Click Dossier</span>
              </button>
            )}

            {onOpenCopilot && (
              <button
                onClick={onOpenCopilot}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-extrabold shadow-sm transition-all cursor-pointer animate-pulse"
                title="Launch JanSetu AI Copilot"
              >
                <Bot className="w-3.5 h-3.5 text-slate-950" />
                <span>AI Copilot</span>
                <Sparkles className="w-3 h-3 text-slate-950" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
