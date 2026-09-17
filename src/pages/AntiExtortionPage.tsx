import React, { useState } from 'react';
import { EXTORTION_RATE_CARD, CIVIC_HELPLINES } from '../data/antiExtortion';
import { Language } from '../types/language';
import { TRANSLATIONS } from '../data/translations';
import { 
  PhoneCall, 
  Coins, 
  ArrowLeft, 
  Smartphone, 
  Hash, 
  AlertOctagon,
  PhoneForwarded,
  ShieldCheck
} from 'lucide-react';

interface AntiExtortionPageProps {
  currentLanguage: Language;
  onBack: () => void;
}

export const AntiExtortionPage: React.FC<AntiExtortionPageProps> = ({
  currentLanguage,
  onBack
}) => {
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  const [dialString, setDialString] = useState('*99*99#');
  const [simulatedScreen, setSimulatedScreen] = useState<string | null>(null);
  const [isDialing, setIsDialing] = useState(false);

  const handleKeypadPress = (val: string) => {
    setDialString(prev => prev + val);
  };

  const handleKeypadClear = () => {
    setDialString('');
    setSimulatedScreen(null);
  };

  const handleDial = () => {
    setIsDialing(true);
    setSimulatedScreen('Connecting to NPCI USSD Gateway...');

    setTimeout(() => {
      setIsDialing(false);
      if (dialString === '*99*99#') {
        setSimulatedScreen(
          '🏛️ NPCI AADHAAR DBT STATUS\n\n' +
          'Aadhaar: XXXX-XXXX-4829\n' +
          'Status: ACTIVE (MAPPED)\n' +
          'Bank: STATE BANK OF INDIA\n' +
          'Last Seeded: 14-Aug-2024\n\n' +
          '1. View Full Details\n' +
          '2. Exit'
        );
      } else if (dialString === '*99#') {
        setSimulatedScreen(
          '📱 NUUP BANKING (*99#)\n\n' +
          'Select Bank:\n' +
          '1. State Bank of India\n' +
          '2. Canara Bank\n' +
          '3. Union Bank of India\n' +
          '4. Check Balance\n' +
          '5. Mini Statement'
        );
      } else {
        setSimulatedScreen(
          `Telecom Service Code ${dialString} processed.\n` +
          'For Aadhaar DBT seeding status, dial *99*99#\n' +
          'For offline mobile banking, dial *99#'
        );
      }
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in space-y-8">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold transition-colors shadow-sm"
      >
        <ArrowLeft className="w-3.5 h-3.5 text-[#0B1B4F]" />
        <span>← Back to Dashboard</span>
      </button>

      {/* Hero Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-rose-900 text-xs font-bold uppercase tracking-wider mb-3">
          <AlertOctagon className="w-3.5 h-3.5 text-rose-600" />
          <span>Anti-Extortion & Rural Offline Access Hub</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-[#0B1B4F] font-serif mb-2">
          Statutory Fee Rate Card & Interactive *99*99# USSD Simulator
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
          Statutory government scholarship applications are legally capped at ₹0 (Free) or ₹60 (CSC). Compare official rates to avoid paying ₹200 to ₹500 at unaccredited cyber cafés.
        </p>
      </div>

      {/* Grid: Rate Card & USSD Phone Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Col (7 cols): Anti-Extortion Rate Card */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#0B1B4F] mb-4 flex items-center gap-2">
              <Coins className="w-4 h-4 text-amber-600" />
              <span>Official Statutory Fees vs Cyber Café Overcharging</span>
            </h3>

            <div className="space-y-3">
              {EXTORTION_RATE_CARD.map((item, idx) => (
                <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <span className="font-bold text-xs text-slate-900">
                      {item.serviceName}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-500">
                      SLA: {item.statutorySlaDays}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                    <div className="bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
                      <span className="text-[10px] text-emerald-800 block font-bold">Government Capped Fee:</span>
                      <strong className="text-emerald-950">{item.statutoryOfficialFee}</strong>
                    </div>

                    <div className="bg-rose-50 p-2.5 rounded-lg border border-rose-200">
                      <span className="text-[10px] text-rose-800 block font-bold">Cyber Café Extortion:</span>
                      <strong className="text-rose-950">{item.cyberCafeExtortionRate}</strong>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    💡 {item.legalNote}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col (5 cols): Interactive USSD Phone Simulator */}
        <div className="lg:col-span-5">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm sticky top-24">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#0B1B4F] mb-2 flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-emerald-600" />
              <span>Offline USSD Dialpad Simulator</span>
            </h3>
            <p className="text-[11px] text-slate-500 mb-4">
              For citizens with feature phones or no internet. Dial <strong className="text-[#0B1B4F]">*99*99#</strong> to verify bank DBT status.
            </p>

            {/* Phone Mockup */}
            <div className="w-full max-w-xs mx-auto bg-[#0B1B4F] rounded-3xl p-5 border-4 border-slate-300 shadow-xl">
              {/* Screen */}
              <div className="bg-emerald-950/90 border border-emerald-500/50 rounded-2xl p-4 min-h-[140px] flex flex-col justify-between mb-4 font-mono text-xs shadow-inner">
                {simulatedScreen ? (
                  <pre className="text-emerald-300 whitespace-pre-wrap leading-relaxed text-[11px]">
                    {simulatedScreen}
                  </pre>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center text-slate-300 py-6">
                    <Hash className="w-6 h-6 text-emerald-400 mb-1" />
                    <span className="text-[11px]">Ready to Dial</span>
                    <span className="text-base font-bold text-white mt-1">{dialString || '___'}</span>
                  </div>
                )}

                {isDialing && (
                  <div className="text-center text-amber-300 text-xs animate-pulse">
                    Connecting to NPCI...
                  </div>
                )}
              </div>

              {/* Keypad */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((key) => (
                  <button
                    key={key}
                    onClick={() => handleKeypadPress(key)}
                    className="p-3 rounded-xl bg-[#142A6F] hover:bg-[#1D3B98] text-white font-bold text-sm border border-slate-700 active:scale-95 transition-all shadow"
                  >
                    {key}
                  </button>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleKeypadClear}
                  className="py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs"
                >
                  Clear
                </button>
                <button
                  onClick={handleDial}
                  className="py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-md"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call / Dial</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* National Grievance Directory */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#0B1B4F] mb-4 flex items-center gap-2">
          <PhoneForwarded className="w-4 h-4 text-amber-600" />
          <span>Statutory Citizen Grievance Helplines (Toll-Free)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CIVIC_HELPLINES.map((hl, idx) => (
            <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="text-lg font-black text-[#0B1B4F] mb-0.5 font-serif">
                  {hl.number}
                </div>
                <div className="text-xs font-bold text-slate-800 mb-1">
                  {hl.title}
                </div>
                <p className="text-[11px] text-slate-600 mb-2 leading-relaxed">
                  {hl.description}
                </p>
              </div>

              <div className="text-[10px] text-slate-500 pt-2 border-t border-slate-200 flex justify-between font-semibold">
                <span>{hl.scope}</span>
                <span>{hl.timings}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
