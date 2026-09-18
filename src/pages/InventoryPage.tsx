import React, { useState } from 'react';
import { CertificateInventory, CertificateKey } from '../types/certificate';
import { MASTER_CERTIFICATES } from '../data/certificates';
import { Language } from '../types/language';
import { TRANSLATIONS } from '../data/translations';
import { 
  FileCheck2, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  ArrowRight, 
  ArrowLeft, 
  ShieldAlert, 
  Building, 
  Clock, 
  Coins, 
  ShieldCheck,
  FileText,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Filter,
  Check,
  Info
} from 'lucide-react';

interface InventoryPageProps {
  inventory: CertificateInventory;
  onUpdateInventory: (inventory: CertificateInventory) => void;
  onCalculate: () => void;
  onBack: () => void;
  currentLanguage: Language;
  onViewRoadmap: (certKey: CertificateKey) => void;
}

// Certificate Specimen Visual Configuration (Aesthetic Document Mockup Attributes)
const CERT_SPECIMEN_CONFIG: Record<CertificateKey, {
  watermarkIcon: string;
  themeColor: string;
  borderAccent: string;
  bgGradient: string;
  categoryTag: string;
  sampleNo: string;
}> = {
  incomeCertificate: {
    watermarkIcon: '₹',
    themeColor: 'from-amber-700 to-amber-900',
    borderAccent: 'border-amber-300',
    bgGradient: 'bg-gradient-to-br from-[#FBF8F1] via-[#F6EFE2] to-[#ECE1CE]',
    categoryTag: 'REVENUE FORM 16 / REV-101',
    sampleNo: 'REV/INC/2026/09214'
  },
  communityCertificate: {
    watermarkIcon: '🏛️',
    themeColor: 'from-indigo-700 to-purple-900',
    borderAccent: 'border-indigo-300',
    bgGradient: 'bg-gradient-to-br from-[#F8F9FD] via-[#EEF1FA] to-[#DFE5F5]',
    categoryTag: 'PERMANENT SOCIAL STATUS / REV-103',
    sampleNo: 'CASTE/GAZ/2026/41088'
  },
  firstGraduateCertificate: {
    watermarkIcon: '🎓',
    themeColor: 'from-emerald-700 to-teal-900',
    borderAccent: 'border-emerald-300',
    bgGradient: 'bg-gradient-to-br from-[#F4FAF7] via-[#E8F5EF] to-[#D5EBE0]',
    categoryTag: '100% TUITION WAIVER / REV-104',
    sampleNo: 'FG/TNEGA/2026/78219'
  },
  nativityCertificate: {
    watermarkIcon: '📍',
    themeColor: 'from-blue-700 to-sky-900',
    borderAccent: 'border-blue-300',
    bgGradient: 'bg-gradient-to-br from-[#F5F9FD] via-[#EBF3FB] to-[#D6E7F7]',
    categoryTag: 'DOMICILE RESIDENCE / REV-102',
    sampleNo: 'NAT/DIST/2026/33104'
  },
  govtSchool7_5Certificate: {
    watermarkIcon: '🏫',
    themeColor: 'from-rose-700 to-red-900',
    borderAccent: 'border-rose-300',
    bgGradient: 'bg-gradient-to-br from-[#FDF6F6] via-[#FBEEEE] to-[#F5D8D8]',
    categoryTag: '7.5% PREFERENTIAL / ANNEXURE-III',
    sampleNo: 'EMIS/SCH/2026/89402'
  },
  bankPassbookNPCI: {
    watermarkIcon: '🏦',
    themeColor: 'from-cyan-700 to-blue-900',
    borderAccent: 'border-cyan-300',
    bgGradient: 'bg-gradient-to-br from-[#F3FAFC] via-[#E5F5F9] to-[#D0EDF4]',
    categoryTag: 'NPCI DBT MAPPER / ANNEXURE-I',
    sampleNo: 'NPCI/DBT/2026/66520'
  },
  aadhaarCard: {
    watermarkIcon: '🪪',
    themeColor: 'from-slate-700 to-slate-900',
    borderAccent: 'border-slate-300',
    bgGradient: 'bg-gradient-to-br from-[#F9F9FB] via-[#F1F1F5] to-[#E2E2EB]',
    categoryTag: 'UIDAI DEMOGRAPHIC e-KYC',
    sampleNo: 'XXXX-XXXX-4819'
  },
  marksheet10th12th: {
    watermarkIcon: '📜',
    themeColor: 'from-amber-600 to-yellow-900',
    borderAccent: 'border-amber-400',
    bgGradient: 'bg-gradient-to-br from-[#FCFBF7] via-[#F7F4EB] to-[#ECE5D4]',
    categoryTag: 'BOARD MERIT RECORD / EDU-MARK',
    sampleNo: 'HSC/REG/2026/51209'
  },
  rationCard: {
    watermarkIcon: '🌾',
    themeColor: 'from-lime-700 to-emerald-900',
    borderAccent: 'border-lime-300',
    bgGradient: 'bg-gradient-to-br from-[#F9FAF4] via-[#F1F6E8] to-[#E2EED0]',
    categoryTag: 'CIVIL SUPPLIES / PDS-SMART',
    sampleNo: 'NFSA/PDS/2026/19401'
  },
  disabilityCertificate: {
    watermarkIcon: '♿',
    themeColor: 'from-teal-700 to-cyan-900',
    borderAccent: 'border-teal-300',
    bgGradient: 'bg-gradient-to-br from-[#F4FAFA] via-[#E7F6F6] to-[#CFEEEE]',
    categoryTag: 'SWAVLAMBAN UDID / 40%+ PwD',
    sampleNo: 'UDID/DIS/2026/00472'
  },
  ewsCertificate: {
    watermarkIcon: '🛡️',
    themeColor: 'from-amber-800 to-stone-900',
    borderAccent: 'border-amber-300',
    bgGradient: 'bg-gradient-to-br from-[#FAF8F5] via-[#F4EFEA] to-[#E6DCDB]',
    categoryTag: '103RD AMENDMENT / EWS-CENTRAL',
    sampleNo: 'EWS/GEN/2026/83910'
  },
  bonafideCertificate: {
    watermarkIcon: '🏛️',
    themeColor: 'from-violet-700 to-indigo-900',
    borderAccent: 'border-violet-300',
    bgGradient: 'bg-gradient-to-br from-[#F9F7FC] via-[#F2EEF9] to-[#E3D9F3]',
    categoryTag: 'INSTITUTE AISHE / INS-BON',
    sampleNo: 'COL/BON/2026/99310'
  }
};

export const InventoryPage: React.FC<InventoryPageProps> = ({
  inventory,
  onUpdateInventory,
  onCalculate,
  onBack,
  currentLanguage,
  onViewRoadmap
}) => {
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  const [filterMode, setFilterMode] = useState<'all' | 'held' | 'missing'>('all');

  const certKeys = Object.keys(MASTER_CERTIFICATES) as CertificateKey[];
  const heldCount = certKeys.filter((k) => !!inventory[k]).length;
  const missingCount = certKeys.length - heldCount;
  const readinessPercent = Math.round((heldCount / certKeys.length) * 100);

  const toggleCertificate = (key: CertificateKey) => {
    onUpdateInventory({
      ...inventory,
      [key]: !inventory[key]
    });
  };

  const filteredKeys = certKeys.filter(key => {
    if (filterMode === 'held') return !!inventory[key];
    if (filterMode === 'missing') return !inventory[key];
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in space-y-8">
      {/* 1. Sovereign Editorial Header & Readiness Meter */}
      <div className="relative rounded-3xl overflow-hidden shadow-luxury border border-[#E7DDCE] bg-white p-6 sm:p-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF0E1] border border-[#DFC8A5] text-[#854D0E] text-xs font-bold uppercase tracking-widest mb-3 font-display">
              <FileCheck2 className="w-3.5 h-3.5 text-amber-700" />
              <span>Step 2 of 3: Gazette Document & Prerequisite Audit</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-[#0B1B4F] tracking-tight font-serif leading-tight">
              Sovereign Certificate <span className="font-cormorant italic font-normal text-amber-700">Inventory & Roadmaps.</span>
            </h2>

            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
              Verify documents in your possession to unlock eligible scholarships. For any missing certificates, access step-by-step resolution roadmaps with statutory government fees to avoid cyber café extortion.
            </p>
          </div>

          {/* Readiness Score Pill Card */}
          <div className="shrink-0 flex items-center gap-4 bg-[#FAF7F2] p-5 rounded-2xl border border-[#EDE4D8] shadow-sm">
            <div className="w-16 h-16 rounded-full border-4 border-amber-600/30 flex items-center justify-center bg-white shadow-inner">
              <span className="text-xl font-black text-[#0B1B4F] font-serif">{readinessPercent}%</span>
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-amber-800 tracking-wider">Audit Readiness</div>
              <div className="text-sm font-black text-[#0B1B4F]">{heldCount} of {certKeys.length} Verified</div>
              <div className="text-[11px] text-slate-500 font-medium">
                {missingCount > 0 ? `${missingCount} Missing Roadmaps` : 'All Documents Cleared'}
              </div>
            </div>
          </div>
        </div>

        {/* Readiness Meter Bar */}
        <div className="mt-8 pt-6 border-t border-[#EDE6DD]">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2 font-display">
            <span>Official Document Readiness Gauge</span>
            <span className="text-[#0B1B4F]">{readinessPercent}% Ready for Direct Portal Submission</span>
          </div>
          <div className="w-full bg-[#FAF7F2] rounded-full h-3.5 p-0.5 border border-[#DFC8A5] overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                readinessPercent >= 70
                  ? 'bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-500'
                  : readinessPercent >= 40
                  ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600'
                  : 'bg-gradient-to-r from-rose-500 via-red-500 to-amber-500'
              }`}
              style={{ width: `${readinessPercent}%` }}
            />
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#F2EDE4]">
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-xs font-bold text-slate-600 font-display">Filter View:</span>
            <div className="inline-flex rounded-xl p-1 bg-[#FAF7F2] border border-[#E7DDCE]">
              <button
                onClick={() => setFilterMode('all')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  filterMode === 'all'
                    ? 'bg-[#0B1B4F] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Documents ({certKeys.length})
              </button>
              <button
                onClick={() => setFilterMode('held')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  filterMode === 'held'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                In Possession ({heldCount})
              </button>
              <button
                onClick={() => setFilterMode('missing')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  filterMode === 'missing'
                    ? 'bg-rose-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Missing Roadmaps ({missingCount})
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <Info className="w-3.5 h-3.5 text-amber-600" />
            <span>Click any card or toggle button to mark possession status</span>
          </div>
        </div>
      </div>

      {/* 2. Side-by-Side Aesthetic 2-per-Row Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredKeys.map((key) => {
          const cert = MASTER_CERTIFICATES[key];
          const isHeld = !!inventory[key];
          const title = cert.titleTranslations[currentLanguage] || cert.title;
          const specimen = CERT_SPECIMEN_CONFIG[key] || {
            watermarkIcon: '📜',
            themeColor: 'from-amber-700 to-amber-900',
            borderAccent: 'border-amber-300',
            bgGradient: 'bg-gradient-to-br from-[#FBF8F1] via-[#F6EFE2] to-[#ECE1CE]',
            categoryTag: cert.id,
            sampleNo: `${cert.id}/2026/AUTO`
          };

          return (
            <div
              key={key}
              className={`rounded-3xl border transition-all duration-300 overflow-hidden flex flex-col justify-between ${
                isHeld
                  ? 'bg-white border-[#B2E1C9] ring-1 ring-[#B2E1C9] shadow-luxury'
                  : 'bg-white border-[#E7DDCE] hover:border-[#D5C2AA] shadow-sm hover:shadow-luxury'
              }`}
            >
              {/* Top Split Layout: Specimen Left & Metadata Right */}
              <div className="p-5 sm:p-6 flex flex-col sm:flex-row gap-5">
                {/* Left Side: Aesthetic Certificate Document Specimen */}
                <div className="sm:w-44 shrink-0 flex flex-col justify-between">
                  <div className={`relative rounded-2xl p-4 border ${specimen.borderAccent} ${specimen.bgGradient} shadow-inner overflow-hidden min-h-[160px] flex flex-col justify-between`}>
                    {/* Background Watermark Seal */}
                    <div className="absolute -right-4 -bottom-4 text-6xl opacity-15 pointer-events-none select-none font-serif">
                      {specimen.watermarkIcon}
                    </div>

                    {/* Specimen Header */}
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[9px] font-black uppercase tracking-wider text-slate-700 font-mono px-1.5 py-0.5 rounded bg-white/80 border border-slate-200">
                          {cert.id}
                        </span>
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      </div>
                      <div className="text-[9px] font-bold text-slate-600 line-clamp-1">
                        {specimen.categoryTag}
                      </div>
                    </div>

                    {/* Specimen Body Motif */}
                    <div className="my-2 py-1 text-center border-y border-dashed border-slate-300/80">
                      <div className="text-2xl">{specimen.watermarkIcon}</div>
                      <div className="text-[8px] font-mono font-bold text-slate-500 tracking-tighter mt-0.5">
                        {specimen.sampleNo}
                      </div>
                    </div>

                    {/* Specimen Status Stamp */}
                    <div className="mt-1">
                      {isHeld ? (
                        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-700 text-white text-[9px] font-bold uppercase tracking-wider shadow-2xs">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                          <span>Registered</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-800 text-amber-50 text-[9px] font-bold uppercase tracking-wider shadow-2xs">
                          <AlertTriangle className="w-2.5 h-2.5" />
                          <span>Not Uploaded</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* SLA & Statutory Fee Badges under specimen */}
                  <div className="mt-3 grid grid-cols-2 gap-1.5 text-center">
                    <div className="p-1.5 rounded-xl bg-[#FAF7F2] border border-[#EDE4D8]">
                      <div className="text-[9px] text-slate-500 uppercase font-bold">Govt SLA</div>
                      <div className="text-xs font-black text-[#0B1B4F] flex items-center justify-center gap-0.5">
                        <Clock className="w-3 h-3 text-amber-600" />
                        <span>{cert.statutorySlaDays}d</span>
                      </div>
                    </div>

                    <div className="p-1.5 rounded-xl bg-[#FAF7F2] border border-[#EDE4D8]">
                      <div className="text-[9px] text-slate-500 uppercase font-bold">Official Fee</div>
                      <div className="text-xs font-black text-emerald-700 flex items-center justify-center gap-0.5">
                        <Coins className="w-3 h-3 text-emerald-600" />
                        <span>₹{cert.statutoryFeeInr}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side: Certificate Typography, Department, & Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    {/* Identification Badge & Trap Warning */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#0B1B4F] text-amber-300 font-mono">
                        {cert.id} Official Standard
                      </span>

                      {cert.isHighRiskTrap && !isHeld && (
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-800 border border-rose-200 flex items-center gap-1">
                          <ShieldAlert className="w-3 h-3 text-rose-600" />
                          <span>High-Risk Prerequisite</span>
                        </span>
                      )}
                    </div>

                    {/* Official Certificate Title */}
                    <h3 className="text-base sm:text-lg font-bold text-[#0B1B4F] font-serif leading-snug mb-1">
                      {title}
                    </h3>

                    {/* Issuing Authority */}
                    <div className="text-xs text-slate-600 mb-3 flex items-start gap-1.5">
                      <Building className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-slate-800">{cert.issuingAuthority}</span>
                        <span className="block text-[11px] text-slate-500 font-normal">{cert.department}</span>
                      </div>
                    </div>

                    {/* Application Channel */}
                    <div className="text-[11px] text-slate-600 bg-[#FAF7F2] p-2.5 rounded-xl border border-[#EDE4D8] mb-3">
                      <span className="font-bold text-[#0B1B4F] block mb-0.5 font-display">Official Channel:</span>
                      <span className="text-slate-700">{cert.whereToApply.onlinePortalName} or {cert.whereToApply.offlineOffice}</span>
                    </div>

                    {/* Anti-Extortion Warning if applicable */}
                    {cert.cyberCafeExtortionRate && (
                      <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mb-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Statutory Cap: <strong>₹{cert.statutoryFeeInr}</strong> (Avoid cyber café charges of {cert.cyberCafeExtortionRate})</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer: Roadmap Action & Toggle Switch */}
              <div className="px-5 py-3.5 bg-[#FAF7F2]/80 border-t border-[#EDE4D8] flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => onViewRoadmap(key)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B1B4F] hover:text-amber-700 transition-colors cursor-pointer group"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-600 group-hover:scale-110 transition-transform" />
                  <span className="underline underline-offset-2">View How to Obtain (SLA Roadmap)</span>
                  <ChevronRight className="w-3.5 h-3.5 text-amber-700 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <button
                  type="button"
                  onClick={() => toggleCertificate(key)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-xs cursor-pointer ${
                    isHeld
                      ? 'bg-emerald-700 hover:bg-emerald-800 text-white ring-2 ring-emerald-600/30'
                      : 'bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 hover:border-slate-400'
                  }`}
                >
                  {isHeld ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-white" />
                      <span>{t.inventory_held || 'In Possession (Verified)'}</span>
                    </>
                  ) : (
                    <>
                      <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-400" />
                      <span>{t.inventory_lacking || 'Mark as In Hand'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Bottom Sticky Action Navigation Bar */}
      <div className="luxury-card rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-luxury">
        <div>
          <h4 className="text-sm font-bold text-[#0B1B4F] font-serif mb-1">
            Ready to Evaluate National Entitlements?
          </h4>
          <p className="text-xs text-slate-500 max-w-xl">
            Our deterministic policy engine will evaluate your {heldCount} verified certificates and profile against all 50+ central & state welfare policies with zero AI hallucination.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <button
            onClick={onBack}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs border border-slate-200 shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-slate-600" />
            <span>{t.back_to_profile || 'Back to Profile'}</span>
          </button>

          <button
            onClick={onCalculate}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#0B1B4F] hover:bg-[#142A6F] text-white font-bold text-sm shadow-luxury flex items-center justify-center gap-2.5 transition-all hover:shadow-luxury-lg hover:-translate-y-0.5 cursor-pointer"
          >
            <span className="font-display tracking-wide">{t.calc_button || 'Evaluate Eligible Scholarships'}</span>
            <ArrowRight className="w-4 h-4 text-[#F5E29F]" />
          </button>
        </div>
      </div>
    </div>
  );
};
