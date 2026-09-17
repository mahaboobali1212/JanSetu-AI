import React from 'react';
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
  HelpCircle,
  Building,
  Clock,
  Coins,
  ShieldCheck
} from 'lucide-react';

interface InventoryPageProps {
  inventory: CertificateInventory;
  onUpdateInventory: (inventory: CertificateInventory) => void;
  onCalculate: () => void;
  onBack: () => void;
  currentLanguage: Language;
  onViewRoadmap: (certKey: CertificateKey) => void;
}

export const InventoryPage: React.FC<InventoryPageProps> = ({
  inventory,
  onUpdateInventory,
  onCalculate,
  onBack,
  currentLanguage,
  onViewRoadmap
}) => {
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  const certKeys = Object.keys(MASTER_CERTIFICATES) as CertificateKey[];
  const heldCount = certKeys.filter((k) => inventory[k]).length;
  const missingCount = certKeys.length - heldCount;
  const readinessPercent = Math.round((heldCount / certKeys.length) * 100);

  const toggleCertificate = (key: CertificateKey) => {
    onUpdateInventory({
      ...inventory,
      [key]: !inventory[key]
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in space-y-8">
      {/* 1. Page Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
              <FileCheck2 className="w-3.5 h-3.5 text-amber-600" />
              <span>Step 2 of 3: Pre-Flight Document Inventory</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1B4F] font-serif">
              {t.page2_heading}
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-600 max-w-2xl">
              {t.page2_sub}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-[#0B1B4F] text-white p-4 rounded-xl text-center min-w-[130px] shadow-sm">
              <div className="text-[10px] uppercase font-bold text-amber-300">Readiness Score</div>
              <div className="text-2xl font-black">{readinessPercent}%</div>
              <div className="text-[10px] text-slate-300">{heldCount} / {certKeys.length} Ready</div>
            </div>
          </div>
        </div>

        {/* Readiness Meter Bar */}
        <div className="mt-6 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
            <span>Official Document Readiness Gauge</span>
            <span className="text-[#0B1B4F]">{readinessPercent}% Ready for Direct Portal Submission</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-3 p-0.5 border border-slate-200 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                readinessPercent > 70
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-500'
                  : readinessPercent > 40
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500'
                  : 'bg-gradient-to-r from-rose-500 to-amber-500'
              }`}
              style={{ width: `${readinessPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* 2. Certificate Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {certKeys.map((key) => {
          const cert = MASTER_CERTIFICATES[key];
          const isHeld = inventory[key];
          const title = cert.titleTranslations[currentLanguage] || cert.title;

          return (
            <div
              key={key}
              className={`rounded-2xl border p-5 transition-all flex flex-col justify-between ${
                isHeld
                  ? 'bg-white border-emerald-300 shadow-sm'
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
              }`}
            >
              <div>
                {/* Top Badge & Identifier */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#0B1B4F] text-white">
                      {cert.id}
                    </span>
                    {cert.isHighRiskTrap && !isHeld && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800 border border-rose-200 flex items-center gap-1">
                        <ShieldAlert className="w-3 h-3 text-rose-600" />
                        <span>Prerequisite Trap</span>
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{cert.statutorySlaDays}d SLA</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Coins className="w-3.5 h-3.5 text-amber-600" />
                      <span className="text-slate-700">₹{cert.statutoryFeeInr}</span>
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-[#0B1B4F] mb-1 leading-snug">
                  {title}
                </h3>

                {/* Authority */}
                <p className="text-xs text-slate-500 mb-3 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{cert.issuingAuthority}</span>
                </p>

                {/* Where to apply pill */}
                <div className="text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200 mb-4">
                  <span className="font-bold text-slate-700 block mb-0.5">Application Channel:</span>
                  <span>{cert.whereToApply.onlinePortalName} or {cert.whereToApply.offlineOffice}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => onViewRoadmap(key)}
                  className="text-xs text-[#0B1B4F] hover:text-amber-600 font-bold flex items-center gap-1 transition-colors"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                  <span>How to Get (Roadmap) →</span>
                </button>

                <button
                  type="button"
                  onClick={() => toggleCertificate(key)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm ${
                    isHeld
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300'
                  }`}
                >
                  {isHeld ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                      <span>{t.inventory_held}</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-3.5 h-3.5 text-rose-500" />
                      <span>{t.inventory_lacking}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Navigation Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <button
          onClick={onBack}
          className="w-full sm:w-auto px-6 py-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.back_to_profile}</span>
        </button>

        <button
          onClick={onCalculate}
          className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-[#0B1B4F] hover:bg-[#142A6F] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all hover:shadow-lg"
        >
          <span>{t.calc_button}</span>
          <ArrowRight className="w-4 h-4 text-amber-300" />
        </button>
      </div>
    </div>
  );
};
