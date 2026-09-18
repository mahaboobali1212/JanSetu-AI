import React, { useState } from 'react';
import { CertificateKey } from '../types/certificate';
import { MASTER_CERTIFICATES } from '../data/certificates';
import { getStateAwareCertificateInfo } from '../data/stateCertificatePortals';
import { Language } from '../types/language';
import { TRANSLATIONS } from '../data/translations';
import { 
  Building, 
  MapPin, 
  Clock, 
  Coins, 
  ShieldAlert, 
  ExternalLink, 
  ArrowLeft, 
  CheckCircle2, 
  FileSearch, 
  HelpCircle,
  FileText,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  Globe
} from 'lucide-react';

interface CertificateRoadmapPageProps {
  certKey: CertificateKey;
  currentLanguage: Language;
  userState?: string;
  onBack: () => void;
  onNavigate: (page: string) => void;
}

const ALL_INDIAN_STATES = [
  'Telangana',
  'Andhra Pradesh',
  'Tamil Nadu',
  'Karnataka',
  'Maharashtra',
  'Uttar Pradesh',
  'Kerala',
  'Delhi',
  'Bihar',
  'Gujarat',
  'Rajasthan',
  'West Bengal',
  'Madhya Pradesh',
  'Punjab',
  'Haryana',
  'Odisha',
  'Assam'
];

export const CertificateRoadmapPage: React.FC<CertificateRoadmapPageProps> = ({
  certKey,
  currentLanguage,
  userState = 'Tamil Nadu',
  onBack,
  onNavigate
}) => {
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;
  
  // Allow user to view their state or switch to any other state
  const [activeState, setActiveState] = useState<string>(userState || 'Tamil Nadu');

  // Fallback cert definition
  const fallbackCert = MASTER_CERTIFICATES[certKey];
  
  // State-aware dynamic info
  const stateInfo = getStateAwareCertificateInfo(certKey, activeState, currentLanguage);

  if (!fallbackCert) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-slate-600">Certificate definition not found.</p>
        <button onClick={onBack} className="mt-4 text-[#0B1B4F] font-bold hover:underline">
          Return to Dashboard
        </button>
      </div>
    );
  }

  const title = stateInfo.friendlyName || fallbackCert.title;
  const nativeTitle = stateInfo.nativeTitle;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in space-y-8">
      {/* Top Header Bar: Back Button & State Switcher HUD */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-[#0B1B4F] border border-[#DFC8A5] text-xs font-bold transition-all shadow-sm cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-amber-700" />
          <span>← Back to Document Inventory / Dashboard</span>
        </button>

        {/* State Routing Selector */}
        <div className="flex items-center gap-2.5 bg-white px-4 py-2 rounded-xl border border-[#DFC8A5] shadow-xs">
          <Globe className="w-4 h-4 text-amber-600 shrink-0" />
          <span className="text-xs font-bold text-slate-700 font-display">Target State Portal:</span>
          <select
            value={activeState}
            onChange={(e) => setActiveState(e.target.value)}
            className="bg-[#FAF7F2] border border-[#DFC8A5] text-[#0B1B4F] text-xs font-bold rounded-lg px-3 py-1 focus:ring-2 focus:ring-[#0B1B4F] outline-none cursor-pointer"
          >
            {ALL_INDIAN_STATES.map((st) => (
              <option key={st} value={st}>
                {st} {st === userState ? '(Your Profile State)' : ''}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Editorial Header Card */}
      <div className="relative rounded-3xl overflow-hidden shadow-luxury border border-[#E7DDCE] bg-white p-6 sm:p-10">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-xs font-black px-3 py-1 rounded-lg bg-[#0B1B4F] text-amber-300 font-mono tracking-wide">
            {stateInfo.badgeCode || fallbackCert.id}
          </span>
          <span className="text-xs font-bold px-3 py-1 rounded-lg bg-[#FAF0E1] text-[#854D0E] border border-[#DFC8A5]">
            🏛️ {stateInfo.department || fallbackCert.department}
          </span>
          <span className="text-xs font-bold px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
            📍 State: {activeState}
          </span>
          {fallbackCert.isHighRiskTrap && (
            <span className="text-xs font-bold px-3 py-1 rounded-lg bg-rose-100 text-rose-800 border border-rose-200 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
              <span>High-Risk Prerequisite Trap</span>
            </span>
          )}
        </div>

        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#FAF0E1] border border-[#DFC8A5] flex items-center justify-center text-3xl shadow-inner shrink-0 hidden sm:flex">
            {stateInfo.icon || '📜'}
          </div>
          <div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0B1B4F] tracking-tight font-serif leading-tight">
              {title}
            </h2>
            {nativeTitle && (
              <p className="mt-1 text-sm font-semibold text-amber-800">
                {nativeTitle}
              </p>
            )}
            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
              {stateInfo.whatItIs} <strong className="text-[#0B1B4F]">{stateInfo.whyNeeded}</strong>
            </p>
            <p className="mt-3 text-xs text-slate-500 flex items-center gap-2">
              <Building className="w-4 h-4 text-amber-700" />
              <span>Issuing Authority in {activeState}: <strong className="text-slate-800 font-semibold">{stateInfo.issuingAuthority}</strong></span>
            </p>
          </div>
        </div>

        {/* SLA and Fee HUD */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 mt-6 border-t border-[#EDE6DD]">
          <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#EDE4D8]">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 mb-1">
              <Clock className="w-4 h-4 text-sky-600" />
              <span>Statutory Turnaround SLA</span>
            </div>
            <div className="text-xl font-bold text-slate-900 font-serif">
              {stateInfo.statutorySlaDays} Working Days
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              Guaranteed under {activeState} Right to Public Services Act
            </div>
          </div>

          <div className="bg-emerald-50/80 p-4 rounded-2xl border border-emerald-200">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 mb-1">
              <Coins className="w-4 h-4 text-emerald-600" />
              <span>Official Statutory Fee</span>
            </div>
            <div className="text-xl font-bold text-emerald-950 font-serif">
              ₹{stateInfo.statutoryFeeInr} {stateInfo.statutoryFeeInr === 0 ? '(100% FREE)' : '(Govt Capped)'}
            </div>
            <div className="text-[11px] text-emerald-700 mt-0.5">
              Official State User Charge (Do not pay extra)
            </div>
          </div>

          <div className="bg-rose-50/80 p-4 rounded-2xl border border-rose-200">
            <div className="flex items-center gap-2 text-xs font-bold text-rose-800 mb-1">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <span>Anti-Extortion Advisory</span>
            </div>
            <div className="text-xl font-bold text-rose-950 font-serif">
              {stateInfo.cyberCafeExtortionRate}
            </div>
            <div className="text-[11px] text-rose-700 mt-0.5">
              Common agent extortion rate. Demand official receipt.
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Where to Go (State Specific) & Precursor Documents */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Box 1: Where to Apply (State Portal + Offline Office) */}
        <div className="bg-white border border-[#E7DDCE] rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#0B1B4F] flex items-center gap-2 font-display">
            <MapPin className="w-4 h-4 text-amber-600" />
            <span>1. Official Application Gateways ({activeState})</span>
          </h3>

          <div className="space-y-4 text-xs">
            {/* Online Portal */}
            <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#EDE4D8] space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="font-bold text-[#0B1B4F] text-sm">
                  Option A: Official {activeState} State Portal
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  Direct Government Link
                </span>
              </div>
              <p className="text-slate-600 font-medium leading-relaxed">
                {stateInfo.onlinePortalName}
              </p>
              <div className="text-slate-500 font-mono text-[11px] break-all bg-white p-2 rounded-lg border border-slate-200">
                {stateInfo.onlinePortalUrl}
              </div>
              <a
                href={stateInfo.onlinePortalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0B1B4F] hover:bg-[#142A6F] text-white font-bold text-xs transition-all shadow-sm hover:shadow-md cursor-pointer"
              >
                <span>Open {activeState} Portal</span>
                <ExternalLink className="w-3.5 h-3.5 text-amber-300" />
              </a>
            </div>

            {/* Offline Citizen Service Center */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
              <div className="font-bold text-slate-900 text-sm">
                Option B: Physical Citizen Service Center / Office
              </div>
              <p className="text-slate-700 leading-relaxed font-medium">
                {stateInfo.offlineOffice}
              </p>
              <p className="text-slate-500 text-[11px]">
                Tip: Carry original Aadhaar and required precursor documents. Always collect an official computerized receipt with the Ack / Application Reference Number.
              </p>
            </div>
          </div>
        </div>

        {/* Box 2: Precursor Documents Checklist */}
        <div className="bg-white border border-[#E7DDCE] rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#0B1B4F] flex items-center gap-2 font-display">
              <FileText className="w-4 h-4 text-emerald-600" />
              <span>2. Required Precursor Documents Checklist</span>
            </h3>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-[#FAF0E1] text-[#854D0E] border border-[#DFC8A5]">
              {stateInfo.precursorDocuments.length} Documents
            </span>
          </div>

          <p className="text-xs text-slate-500">
            Keep clear self-attested photocopies (under 200KB PDF/JPEG for online upload) ready before initiating application:
          </p>

          <ul className="space-y-2.5 text-xs text-slate-700">
            {stateInfo.precursorDocuments.map((doc, idx) => (
              <li key={idx} className="flex items-start gap-3 bg-[#FAF7F2] p-3.5 rounded-xl border border-[#EDE4D8]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="font-medium">{doc}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Step-by-Step Blueprint */}
      <div className="bg-white border border-[#E7DDCE] rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#0B1B4F] flex items-center gap-2 font-display">
          <HelpCircle className="w-4 h-4 text-amber-600" />
          <span>3. Step-by-Step Statutory Application Blueprint ({activeState})</span>
        </h3>

        <div className="space-y-3.5">
          {stateInfo.stepByStepRoadmap.map((step, idx) => (
            <div key={idx} className="flex items-start gap-4 bg-[#FAF7F2] p-4 sm:p-5 rounded-2xl border border-[#EDE4D8]">
              <div className="w-8 h-8 rounded-xl bg-[#0B1B4F] text-amber-300 font-bold text-xs flex items-center justify-center shrink-0 shadow-xs font-display">
                {idx + 1}
              </div>
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed pt-1 font-medium">
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Sample Certificate Format Preview (Anti-Fraud Feature) */}
      <div className="bg-white border border-[#E7DDCE] rounded-3xl p-6 sm:p-10 shadow-sm space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#0B1B4F] flex items-center gap-2 font-display">
            <FileSearch className="w-4 h-4 text-indigo-600" />
            <span>4. Authentic Digital Certificate Layout (Anti-Fraud Verification)</span>
          </h3>
          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Official {activeState} Government Format</span>
          </span>
        </div>

        <div className="bg-[#FAF7F2] p-6 sm:p-8 rounded-2xl border-2 border-dashed border-[#DFC8A5] text-center">
          <div className="max-w-xl mx-auto space-y-3">
            <div className="w-14 h-14 mx-auto rounded-full bg-white border border-[#DFC8A5] flex items-center justify-center text-2xl shadow-inner">
              {stateInfo.icon || '🏛️'}
            </div>
            <div className="text-xs font-bold text-[#0B1B4F] uppercase tracking-wider font-display">
              {title} — {activeState} Government
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic bg-white p-4 rounded-xl border border-slate-200">
              "{stateInfo.samplePreviewDescription}"
            </p>
            <div className="text-xs text-slate-500 pt-2 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>Always scan the QR Code on the physical copy to verify authenticity on the official {activeState} state database.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Floating Return Button */}
      <div className="flex justify-between items-center bg-white p-4 sm:p-6 rounded-2xl border border-[#E7DDCE] shadow-sm">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FAF7F2] hover:bg-slate-100 text-[#0B1B4F] font-bold text-xs border border-[#DFC8A5] transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-amber-700" />
          <span>Return to Document Inventory</span>
        </button>

        <button
          onClick={() => onNavigate('dashboard')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0B1B4F] hover:bg-[#142A6F] text-white font-bold text-xs shadow-luxury transition-all cursor-pointer"
        >
          <span>Go to Schemes Dashboard</span>
          <ChevronRight className="w-4 h-4 text-amber-300" />
        </button>
      </div>
    </div>
  );
};
