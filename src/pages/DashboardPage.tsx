import React, { useState } from 'react';
import { EvaluationResult, SchemeDefinition } from '../types/scheme';
import { CitizenProfile } from '../types/profile';
import { CertificateInventory, CertificateKey } from '../types/certificate';
import { MASTER_CERTIFICATES } from '../data/certificates';
import { Language } from '../types/language';
import { TRANSLATIONS } from '../data/translations';
import { ActionPlanPdfGenerator } from '../engine/actionPlanPdfGenerator';
import { 
  Award, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  ExternalLink, 
  FileText, 
  Share2, 
  Layers, 
  Building2, 
  Clock, 
  HelpCircle,
  TrendingUp,
  ShieldCheck,
  FileDown,
  Compass,
  Printer
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface DashboardPageProps {
  profile: CitizenProfile;
  inventory: CertificateInventory;
  results: EvaluationResult[];
  currentLanguage: Language;
  onOpenCockpit: (scheme: SchemeDefinition) => void;
  onViewRoadmap: (certKey: CertificateKey) => void;
  onNavigate: (page: string) => void;
  onOpenPortalGuide?: (scheme: SchemeDefinition) => void;
  onOpenDossier?: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  profile,
  inventory,
  results,
  currentLanguage,
  onOpenCockpit,
  onViewRoadmap,
  onNavigate,
  onOpenPortalGuide,
  onOpenDossier
}) => {
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;
  const [filterTab, setFilterTab] = useState<'ALL' | 'READY' | 'MISSING' | 'INELIGIBLE'>('ALL');

  const readyResults = results.filter(r => r.status === 'READY_TO_APPLY');
  const conditionalResults = results.filter(r => r.status === 'CONDITIONALLY_ELIGIBLE');
  const ineligibleResults = results.filter(r => r.status === 'INELIGIBLE');

  const totalPotentialBenefit = [...readyResults, ...conditionalResults].reduce(
    (sum, r) => sum + r.scheme.benefitAmountAnnualNumeric,
    0
  );

  const displayedResults = results.filter(r => {
    if (filterTab === 'READY') return r.status === 'READY_TO_APPLY';
    if (filterTab === 'MISSING') return r.status === 'CONDITIONALLY_ELIGIBLE';
    if (filterTab === 'INELIGIBLE') return r.status === 'INELIGIBLE';
    return true;
  });

  const handleDownloadPdf = () => {
    ActionPlanPdfGenerator.generateActionPlan(profile, results);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 }
    });
  };

  const handleShareWhatsapp = () => {
    const readyList = readyResults.map(r => `• ${r.scheme.name} (${r.scheme.benefitAmount})`).join('\n');
    const missingList = conditionalResults.map(r => `• ${r.scheme.name} (Needs: ${r.missingCertificates.map(k => MASTER_CERTIFICATES[k]?.id || k).join(', ')})`).join('\n');

    const text = encodeURIComponent(
      `🇮🇳 *JanSetu AI Civic Action Report for ${profile.fullName}*\n\n` +
      `🎓 *Total Potential Benefit:* ₹${totalPotentialBenefit.toLocaleString('en-IN')}\n\n` +
      `✅ *Direct Ready Schemes (${readyResults.length}):*\n${readyList || 'None ready yet.'}\n\n` +
      `⚠️ *Conditionally Eligible (${conditionalResults.length}):*\n${missingList || 'None'}\n\n` +
      `Generated via JanSetu AI - Government of India National Scholarship Portal.`
    );

    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in space-y-8">
      {/* 1. Civic Summary Card (Government Ministry Style) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 mb-3">
              <TrendingUp className="w-3.5 h-3.5 text-amber-600" />
              <span>{t.eligible_benefit_total}</span>
            </div>
            <div className="text-3xl sm:text-5xl font-black text-[#0B1B4F] tracking-tight mb-2 font-serif">
              ₹{totalPotentialBenefit.toLocaleString('en-IN')}
              <span className="text-sm sm:text-base font-normal text-slate-500 font-sans ml-2">/ year</span>
            </div>
            <p className="text-xs text-slate-600">
              Audited for <strong>{profile.fullName}</strong> ({profile.stateOfDomicile}, {profile.category} Category, {profile.courseName || profile.courseLevel})
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            {onOpenDossier && (
              <button
                onClick={onOpenDossier}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-sm transition-all cursor-pointer"
                title="1-Click Printable Citizen Application Dossier"
              >
                <Printer className="w-4 h-4 text-slate-950" />
                <span>1-Click Dossier</span>
              </button>
            )}

            <button
              onClick={handleDownloadPdf}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0B1B4F] hover:bg-[#152864] text-white font-bold text-xs shadow-sm transition-all"
            >
              <FileDown className="w-4 h-4 text-amber-300" />
              <span>{t.download_action_plan_pdf}</span>
            </button>

            <button
              onClick={handleShareWhatsapp}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all"
            >
              <Share2 className="w-4 h-4" />
              <span>WhatsApp</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Filter Tiers */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setFilterTab('ALL')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            filterTab === 'ALL'
              ? 'bg-[#0B1B4F] text-[#F5E29F] shadow-sm'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          All Evaluated Schemes ({results.length})
        </button>

        <button
          onClick={() => setFilterTab('READY')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            filterTab === 'READY'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'bg-white text-emerald-800 hover:bg-emerald-50 border border-emerald-300'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>🟢 100% Ready ({readyResults.length})</span>
        </button>

        <button
          onClick={() => setFilterTab('MISSING')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            filterTab === 'MISSING'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'bg-white text-amber-800 hover:bg-amber-50 border border-amber-300'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>🟠 Missing Certificates ({conditionalResults.length})</span>
        </button>

        <button
          onClick={() => setFilterTab('INELIGIBLE')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            filterTab === 'INELIGIBLE'
              ? 'bg-slate-700 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <XCircle className="w-3.5 h-3.5" />
          <span>🔴 Ineligible ({ineligibleResults.length})</span>
        </button>
      </div>

      {/* 3. Scheme Cards List */}
      <div className="space-y-4">
        {displayedResults.map((res) => {
          const scheme = res.scheme;
          const isReady = res.status === 'READY_TO_APPLY';
          const isConditional = res.status === 'CONDITIONALLY_ELIGIBLE';
          const isIneligible = res.status === 'INELIGIBLE';
          const schemeTitle = scheme.nameTranslations[currentLanguage] || scheme.name;

          return (
            <div
              key={scheme.id}
              className={`rounded-2xl border p-6 bg-white transition-all shadow-sm ${
                isReady
                  ? 'border-emerald-300 ring-1 ring-emerald-300'
                  : isConditional
                  ? 'border-amber-300 ring-1 ring-amber-300'
                  : 'border-slate-200 opacity-80'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                <div className="space-y-1.5 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#0B1B4F] text-white">
                      {scheme.code}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200">
                      {scheme.level === 'central' ? 'Central Scheme' : `${scheme.state} State Scheme`}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>Closing Date: {scheme.applicationClosingDate}</span>
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#0B1B4F] leading-snug">
                    {schemeTitle}
                  </h3>

                  <p className="text-xs text-slate-500 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{scheme.authority}</span>
                  </p>
                </div>

                {/* Benefit Amount Badge */}
                <div className="text-left lg:text-right shrink-0">
                  <div className="text-xs font-semibold text-slate-500 mb-0.5">Statutory Benefit</div>
                  <div className="text-lg font-black text-[#0B1B4F] bg-amber-50 px-3.5 py-1.5 rounded-lg border border-amber-200 inline-block font-serif">
                    {scheme.benefitAmount}
                  </div>
                </div>
              </div>

              {/* Status Explanation Box */}
              <div className="mb-4">
                {isReady && (
                  <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 mb-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>100% Eligible &amp; Document-Ready</span>
                    </div>
                    <p className="text-xs text-emerald-800">
                      You meet all legal criteria and hold all required certificates. Apply directly on the official government portal before deadline.
                    </p>
                  </div>
                )}

                {isConditional && (
                  <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-900 mb-1">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      <span>Conditionally Eligible — Requires {res.missingCertificates.length} Certificate(s)</span>
                    </div>
                    <p className="text-xs text-amber-800 mb-2">
                      You meet the legal qualifications for this grant, but you must obtain the following prerequisite document(s):
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {res.missingCertificates.map((key) => {
                        const cert = MASTER_CERTIFICATES[key];
                        return (
                          <button
                            key={key}
                            onClick={() => onViewRoadmap(key)}
                            className="text-xs font-bold px-3 py-1 rounded bg-white hover:bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
                          >
                            <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                            <span>{cert?.title || key}</span>
                            <span className="text-[10px] text-amber-700">(View Roadmap →)</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {isIneligible && (
                  <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-700 mb-1">
                      <XCircle className="w-4 h-4 text-rose-500" />
                      <span>Statutory Legal Disqualification Reason</span>
                    </div>
                    <ul className="list-disc list-inside text-xs text-slate-600 space-y-1">
                      {res.failedClauses.map((clause, idx) => (
                        <li key={idx}>{clause}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
                <div className="text-[11px] text-slate-500">
                  Gateway: <strong>{scheme.portalName}</strong>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {onOpenPortalGuide && (
                    <button
                      onClick={() => onOpenPortalGuide(scheme)}
                      className="px-3.5 py-2 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs border border-amber-300 transition-all flex items-center gap-1.5 cursor-pointer"
                      title="Step-by-Step Portal Navigation & OTR Guide"
                    >
                      <Compass className="w-3.5 h-3.5 text-amber-700" />
                      <span>How to Apply (OTR Guide)</span>
                    </button>
                  )}

                  <button
                    onClick={() => onOpenCockpit(scheme)}
                    className="px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-200 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Layers className="w-3.5 h-3.5 text-[#0B1B4F]" />
                    <span>{t.open_cockpit_button}</span>
                  </button>

                  <a
                    href={scheme.officialPortalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm ${
                      isReady
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        : 'bg-[#0B1B4F] hover:bg-[#142A6F] text-white'
                    }`}
                  >
                    <span>{t.direct_apply_button}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
