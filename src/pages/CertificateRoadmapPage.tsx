import React from 'react';
import { CertificateKey } from '../types/certificate';
import { MASTER_CERTIFICATES } from '../data/certificates';
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
  FileText
} from 'lucide-react';

interface CertificateRoadmapPageProps {
  certKey: CertificateKey;
  currentLanguage: Language;
  onBack: () => void;
  onNavigate: (page: string) => void;
}

export const CertificateRoadmapPage: React.FC<CertificateRoadmapPageProps> = ({
  certKey,
  currentLanguage,
  onBack,
  onNavigate
}) => {
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;
  const cert = MASTER_CERTIFICATES[certKey];

  if (!cert) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-slate-600">Certificate definition not found.</p>
        <button onClick={onBack} className="mt-4 text-[#0B1B4F] font-bold hover:underline">
          Return to Dashboard
        </button>
      </div>
    );
  }

  const title = cert.titleTranslations[currentLanguage] || cert.title;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in space-y-8">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold transition-colors shadow-sm"
      >
        <ArrowLeft className="w-3.5 h-3.5 text-[#0B1B4F]" />
        <span>← Back to Schemes Dashboard</span>
      </button>

      {/* Main Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-xs font-black px-2.5 py-1 rounded bg-[#0B1B4F] text-white">
            {cert.id}
          </span>
          <span className="text-xs font-bold px-2.5 py-1 rounded bg-slate-100 text-slate-700">
            {cert.department}
          </span>
          {cert.isHighRiskTrap && (
            <span className="text-xs font-bold px-2.5 py-1 rounded bg-rose-100 text-rose-800 border border-rose-200 flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
              <span>High-Risk Prerequisite Trap</span>
            </span>
          )}
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-[#0B1B4F] font-serif mb-2">
          {title}
        </h2>
        <p className="text-xs text-slate-500 flex items-center gap-1.5 mb-6">
          <Building className="w-3.5 h-3.5 text-slate-400" />
          <span>Issuing Authority: <strong className="text-slate-800">{cert.issuingAuthority}</strong></span>
        </p>

        {/* SLA and Fee HUD */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-100">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-600 mb-1">
              <Clock className="w-4 h-4 text-sky-600" />
              <span>Statutory Turnaround SLA</span>
            </div>
            <div className="text-xl font-bold text-slate-900">
              {cert.statutorySlaDays} Working Days
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">
              Guaranteed under Right to Services Act
            </div>
          </div>

          <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 mb-1">
              <Coins className="w-4 h-4 text-emerald-600" />
              <span>Official Statutory Fee</span>
            </div>
            <div className="text-xl font-bold text-emerald-950">
              ₹{cert.statutoryFeeInr} {cert.statutoryFeeInr === 0 ? '(Free)' : '(Capped)'}
            </div>
            <div className="text-[10px] text-emerald-700 mt-0.5">
              Official government service charge
            </div>
          </div>

          <div className="bg-rose-50 p-4 rounded-xl border border-rose-200">
            <div className="flex items-center gap-2 text-xs font-bold text-rose-800 mb-1">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <span>Cyber Café Overcharging Alert</span>
            </div>
            <div className="text-xl font-bold text-rose-950">
              {cert.cyberCafeExtortionRate}
            </div>
            <div className="text-[10px] text-rose-700 mt-0.5">
              Never pay beyond official statutory fee
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Where to Go & Precursor Documents */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Box 1: Where to Apply */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#0B1B4F] mb-4 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-amber-600" />
            <span>{t.where_to_apply}</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="font-bold text-slate-900 mb-1">1. Online Official State Portal</div>
              <p className="text-slate-600 mb-3">
                {cert.whereToApply.onlinePortalName}
              </p>
              <a
                href={cert.whereToApply.onlinePortalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#0B1B4F] hover:bg-[#142A6F] text-white font-bold transition-colors shadow-sm"
              >
                <span>Visit Official Portal</span>
                <ExternalLink className="w-3 h-3 text-amber-300" />
              </a>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="font-bold text-slate-900 mb-1">2. Offline Authority Office</div>
              <p className="text-slate-600">
                {cert.whereToApply.offlineOffice} (Ask for Revenue / Welfare Counter)
              </p>
            </div>
          </div>
        </div>

        {/* Box 2: Precursor Documents Checklist */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#0B1B4F] mb-4 flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-600" />
            <span>{t.precursor_docs}</span>
          </h3>

          <ul className="space-y-2.5 text-xs text-slate-700">
            {cert.precursorDocuments.map((doc, idx) => (
              <li key={idx} className="flex items-start gap-2.5 bg-slate-50 p-3 rounded-lg border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{doc}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Step-by-Step Blueprint */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#0B1B4F] mb-6 flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-amber-600" />
          <span>Step-by-Step Application Blueprint</span>
        </h3>

        <div className="space-y-3">
          {cert.stepByStepRoadmap.map((step, idx) => (
            <div key={idx} className="flex items-start gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="w-7 h-7 rounded-lg bg-[#0B1B4F] text-amber-300 font-bold text-xs flex items-center justify-center shrink-0">
                {idx + 1}
              </div>
              <p className="text-xs text-slate-700 leading-relaxed pt-0.5">
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Sample Certificate Format Preview (Anti-Fraud Feature) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between gap-2 mb-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#0B1B4F] flex items-center gap-2">
            <FileSearch className="w-4 h-4 text-indigo-600" />
            <span>Authentic Digital Certificate Sample Layout (Anti-Fraud Check)</span>
          </h3>
          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200">
            Official State Format
          </span>
        </div>

        <div className="bg-slate-50 p-6 rounded-xl border-2 border-dashed border-slate-300 text-center">
          <div className="max-w-md mx-auto space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-xl">
              🏛️
            </div>
            <div className="text-xs font-bold text-[#0B1B4F] uppercase tracking-wider">
              {cert.title}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed italic">
              "{cert.samplePreviewDescription}"
            </p>
            <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-200">
              Always verify the QR Code and digital certificate key on the official state revenue portal.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
