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
  Printer,
  Calendar,
  Send,
  Scale,
  Sparkles,
  ChevronRight,
  AlertCircle
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
  onInspectCedar?: (scheme: SchemeDefinition) => void;
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
  onOpenDossier,
  onInspectCedar
}) => {
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;
  const [filterTab, setFilterTab] = useState<'ALL' | 'READY' | 'MISSING' | 'INELIGIBLE'>('ALL');

  const readyResults = results.filter(r => r.status === 'READY_TO_APPLY');
  const conditionalResults = results.filter(r => r.status === 'CONDITIONALLY_ELIGIBLE');
  const ineligibleResults = results.filter(r => r.status === 'INELIGIBLE');

  // ONLY ELIGIBLE SCHEMES FOR STACKING COMPARISON
  const eligibleSchemes: SchemeDefinition[] = [
    ...readyResults.map(r => r.scheme),
    ...conditionalResults.map(r => r.scheme)
  ];

  const [compareAId, setCompareAId] = useState<string>(eligibleSchemes[0]?.id || '');
  const [compareBId, setCompareBId] = useState<string>(eligibleSchemes[1]?.id || eligibleSchemes[0]?.id || '');

  const schemeA = eligibleSchemes.find(s => s.id === compareAId) || eligibleSchemes[0];
  const schemeB = eligibleSchemes.find(s => s.id === compareBId) || eligibleSchemes[1] || eligibleSchemes[0];

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

  const today = new Date();
  const getDaysRemaining = (closingDateStr: string) => {
    const closeDate = new Date(closingDateStr);
    const diffTime = closeDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

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

  const handleGoogleCalendar = (scheme: SchemeDefinition) => {
    const title = encodeURIComponent(`[JanSetu Deadline] Apply for ${scheme.name}`);
    const details = encodeURIComponent(
      `Statutory closing date for ${scheme.name} (${scheme.benefitAmount}).\nOfficial Portal: ${scheme.officialPortalUrl}\nAuthority: ${scheme.authority}`
    );
    const dateFormatted = scheme.applicationClosingDate.replace(/-/g, '');
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&dates=${dateFormatted}/${dateFormatted}`;
    window.open(url, '_blank');
  };

  const handleWhatsAppAlert = (scheme: SchemeDefinition) => {
    const daysLeft = getDaysRemaining(scheme.applicationClosingDate);
    const msg = `*JanSetu AI Scheme Deadline Alert*\n\n📌 *Scheme:* ${scheme.name}\n💰 *Benefit:* ${scheme.benefitAmount}\n⏰ *Closing Date:* ${scheme.applicationClosingDate} (${daysLeft > 0 ? `${daysLeft} days left` : 'Closing Soon'})\n🔗 *Official Portal:* ${scheme.officialPortalUrl}\n\n_Generated via JanSetu AI Sovereign Access Gateway_`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`, '_blank');
  };

  // Evaluate Stacking Legality for Eligible Schemes
  let stackingStatus: 'ALLOWED' | 'PROHIBITED' | 'CONDITIONAL' = 'ALLOWED';
  let stackingVerdict = '';
  let stackingRule = '';

  if (schemeA && schemeB && schemeA.id !== schemeB.id) {
    const isSchemeATuition = schemeA.benefitType === 'fee_waiver';
    const isSchemeBTuition = schemeB.benefitType === 'fee_waiver';

    if (isSchemeATuition && isSchemeBTuition) {
      stackingStatus = 'PROHIBITED';
      stackingVerdict = 'Duplicate Tuition Waiver Claim Prohibited';
      stackingRule = 'Statutory rules prohibit claiming two full tuition fee waivers for the same degree course. You should proceed with the higher benefit scheme.';
    } else if ((isSchemeATuition && schemeB.benefitType === 'cash_dbt') || (schemeA.benefitType === 'cash_dbt' && isSchemeBTuition)) {
      stackingStatus = 'ALLOWED';
      stackingVerdict = '100% Concurrent Stacking Permitted (Tuition Fee + Living DBT)';
      stackingRule = 'Government rules permit combining a Tuition Fee Waiver (reimbursed directly to the college) with a Central Merit / Maintenance Allowance (credited to the student’s bank account).';
    } else {
      stackingStatus = 'CONDITIONAL';
      stackingVerdict = 'Conditional Dual-Availing (Subject to Nodal Verification)';
      stackingRule = 'Both are cash DBT schemes. Ensure you verify whether both scholarships allow concurrent central/state grants in their undertaking clause.';
    }
  }

  const combinedAnnualValue = schemeA && schemeB && schemeA.id !== schemeB.id
    ? (schemeA.benefitAmountAnnualNumeric || 0) + (schemeB.benefitAmountAnnualNumeric || 0)
    : (schemeA?.benefitAmountAnnualNumeric || 0);

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
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0B1B4F] hover:bg-[#152864] text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
            >
              <FileDown className="w-4 h-4 text-amber-300" />
              <span>{t.download_action_plan_pdf}</span>
            </button>

            <button
              onClick={handleShareWhatsapp}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
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
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            filterTab === 'ALL'
              ? 'bg-[#0B1B4F] text-[#F5E29F] shadow-sm'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          All Evaluated Schemes ({results.length})
        </button>

        <button
          onClick={() => setFilterTab('READY')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
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
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
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
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            filterTab === 'INELIGIBLE'
              ? 'bg-slate-700 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <XCircle className="w-3.5 h-3.5" />
          <span>🔴 Ineligible ({ineligibleResults.length})</span>
        </button>
      </div>

      {/* 3. Scheme Cards List with Integrated Deadlines & Calendar Alerts */}
      <div className="space-y-4">
        {displayedResults.map((res) => {
          const scheme = res.scheme;
          const isReady = res.status === 'READY_TO_APPLY';
          const isConditional = res.status === 'CONDITIONALLY_ELIGIBLE';
          const isIneligible = res.status === 'INELIGIBLE';
          const schemeTitle = scheme.nameTranslations[currentLanguage] || scheme.name;
          const daysLeft = getDaysRemaining(scheme.applicationClosingDate);

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

                    {/* Integrated Live Deadline Countdown Badge */}
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                      daysLeft <= 15 
                        ? 'bg-rose-100 text-rose-800 border border-rose-300 animate-pulse' 
                        : daysLeft <= 30 
                          ? 'bg-amber-100 text-amber-800 border border-amber-300' 
                          : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    }`}>
                      <Clock className="w-3 h-3" />
                      <span>{daysLeft > 0 ? `Closing in ${daysLeft} Days (${scheme.applicationClosingDate})` : 'Closing Today'}</span>
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
                            <span>{cert?.title?.split('(')[0]?.trim() || key}</span>
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

              {/* Action Buttons with Integrated Deadlines Reminder */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span>Portal: <strong>{scheme.portalName}</strong></span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {/* Deadline Quick Reminders */}
                  <button
                    type="button"
                    onClick={() => handleGoogleCalendar(scheme)}
                    title="Add closing date to Google Calendar"
                    className="px-2.5 py-2 rounded-lg bg-white hover:bg-blue-50 text-slate-700 text-xs font-semibold border border-slate-200 transition flex items-center gap-1 shadow-2xs cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    <span className="hidden sm:inline">Add Cal</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleWhatsAppAlert(scheme)}
                    title="Send WhatsApp Deadline Reminder"
                    className="px-2.5 py-2 rounded-lg bg-white hover:bg-emerald-50 text-slate-700 text-xs font-semibold border border-slate-200 transition flex items-center gap-1 shadow-2xs cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="hidden sm:inline">Alert</span>
                  </button>

                  {onInspectCedar && (
                    <button
                      type="button"
                      onClick={() => onInspectCedar(scheme)}
                      title="Inspect AWS Cedar Policy Engine Rule"
                      className="px-2.5 py-2 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-950 text-xs font-semibold border border-amber-300 transition flex items-center gap-1 shadow-2xs cursor-pointer"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                      <span className="hidden sm:inline">Cedar Policy</span>
                    </button>
                  )}

                  {onOpenPortalGuide && (
                    <button
                      onClick={() => onOpenPortalGuide(scheme)}
                      className="px-3.5 py-2 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs border border-amber-300 transition-all flex items-center gap-1.5 cursor-pointer"
                      title="Step-by-Step Portal Navigation & OTR Guide"
                    >
                      <Compass className="w-3.5 h-3.5 text-amber-700" />
                      <span>How to Apply</span>
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

      {/* 4. Integrated Multi-Scheme Stacking Comparison (ONLY FOR ELIGIBLE SCHEMES) */}
      {eligibleSchemes.length >= 2 && schemeA && schemeB && (
        <div className="bg-white rounded-3xl border-2 border-[#D4AF37]/40 p-6 sm:p-8 shadow-luxury space-y-6 mt-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FAF0E1] border border-[#DFC8A5] flex items-center justify-center text-[#854D0E] shrink-0">
                <Scale className="w-6 h-6 text-[#B8860B]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    Eligible Schemes Only
                  </span>
                  <span className="text-xs text-slate-500 font-serif">Dual-Benefit Legality Evaluator</span>
                </div>
                <h3 className="text-xl font-bold font-serif text-[#0B1B4F] mt-0.5">
                  Multi-Scheme "Dual Benefit & Stacking" Comparison
                </h3>
              </div>
            </div>

            <div className="bg-[#FAF7F2] border border-[#EAE2D5] px-4 py-2 rounded-xl text-right">
              <div className="text-[10px] font-bold uppercase text-slate-500">Max Combined Potential</div>
              <div className="text-base font-bold text-emerald-800 font-serif">
                ₹{combinedAnnualValue.toLocaleString('en-IN')} / Year
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Compare any two schemes that <strong>you are legally qualified for</strong> to verify if you can claim both concurrently under government scholarship codes.
          </p>

          {/* Scheme Selectors for Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#FAF7F2] p-4 rounded-2xl border border-[#EAE2D5]">
            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1 font-serif">
                Select Primary Qualified Scheme:
              </label>
              <select
                value={compareAId}
                onChange={(e) => setCompareAId(e.target.value)}
                className="w-full bg-white border border-[#DACBB8] rounded-xl px-3 py-2 text-xs font-bold text-[#0B1B4F] focus:ring-2 focus:ring-[#0B1B4F]"
              >
                {eligibleSchemes.map((s) => (
                  <option key={`comp-a-${s.id}`} value={s.id}>
                    [{s.level.toUpperCase()}] {s.name} ({s.benefitAmount})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1 font-serif">
                Select Secondary Qualified Scheme:
              </label>
              <select
                value={compareBId}
                onChange={(e) => setCompareBId(e.target.value)}
                className="w-full bg-white border border-[#DACBB8] rounded-xl px-3 py-2 text-xs font-bold text-[#0B1B4F] focus:ring-2 focus:ring-[#0B1B4F]"
              >
                {eligibleSchemes.map((s) => (
                  <option key={`comp-b-${s.id}`} value={s.id}>
                    [{s.level.toUpperCase()}] {s.name} ({s.benefitAmount})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Stacking Verdict Banner */}
          {schemeA.id !== schemeB.id && (
            <div className={`p-4 sm:p-5 rounded-2xl border-2 flex items-start gap-3.5 ${
              stackingStatus === 'ALLOWED'
                ? 'bg-emerald-50/90 border-emerald-400 text-emerald-950'
                : stackingStatus === 'PROHIBITED'
                  ? 'bg-rose-50/90 border-rose-400 text-rose-950'
                  : 'bg-amber-50/90 border-amber-400 text-amber-950'
            }`}>
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                {stackingStatus === 'ALLOWED' && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                {stackingStatus === 'PROHIBITED' && <XCircle className="w-5 h-5 text-rose-600" />}
                {stackingStatus === 'CONDITIONAL' && <AlertCircle className="w-5 h-5 text-amber-600" />}
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2 font-bold text-xs font-serif uppercase">
                  <span>{stackingVerdict}</span>
                </div>
                <p className="text-xs leading-relaxed text-slate-700">
                  {stackingRule}
                </p>
              </div>
            </div>
          )}

          {/* Side-by-Side Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Scheme A Card */}
            <div className="bg-[#FAF7F2] rounded-2xl p-5 border border-[#EAE2D5] space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase text-slate-500">
                  <span>{schemeA.code}</span>
                  <span className="bg-[#0B1B4F] text-white px-2 py-0.5 rounded">{schemeA.level.toUpperCase()}</span>
                </div>
                <h4 className="text-sm font-bold text-[#0B1B4F] font-serif leading-snug">
                  {schemeA.name}
                </h4>
                <div className="text-xs text-slate-600 line-clamp-2">
                  {schemeA.shortDescription}
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs space-y-1">
                  <div>💰 <strong>Benefit Value:</strong> <span className="text-emerald-800 font-bold">{schemeA.benefitAmount}</span></div>
                  <div>🏛️ <strong>Disbursement:</strong> {schemeA.benefitType === 'fee_waiver' ? 'Direct College Tuition Waiver' : 'Student Bank DBT'}</div>
                  <div>📅 <strong>Deadline:</strong> {schemeA.applicationClosingDate}</div>
                </div>
              </div>
              <button
                onClick={() => onOpenCockpit(schemeA)}
                className="w-full py-2 rounded-xl bg-[#0B1B4F] text-[#F5E29F] text-xs font-bold hover:bg-[#152864] transition flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>View Full Scheme Cockpit</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Scheme B Card */}
            <div className="bg-[#FAF7F2] rounded-2xl p-5 border border-[#EAE2D5] space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase text-slate-500">
                  <span>{schemeB.code}</span>
                  <span className="bg-[#0B1B4F] text-white px-2 py-0.5 rounded">{schemeB.level.toUpperCase()}</span>
                </div>
                <h4 className="text-sm font-bold text-[#0B1B4F] font-serif leading-snug">
                  {schemeB.name}
                </h4>
                <div className="text-xs text-slate-600 line-clamp-2">
                  {schemeB.shortDescription}
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs space-y-1">
                  <div>💰 <strong>Benefit Value:</strong> <span className="text-emerald-800 font-bold">{schemeB.benefitAmount}</span></div>
                  <div>🏛️ <strong>Disbursement:</strong> {schemeB.benefitType === 'fee_waiver' ? 'Direct College Tuition Waiver' : 'Student Bank DBT'}</div>
                  <div>📅 <strong>Deadline:</strong> {schemeB.applicationClosingDate}</div>
                </div>
              </div>
              <button
                onClick={() => onOpenCockpit(schemeB)}
                className="w-full py-2 rounded-xl bg-[#0B1B4F] text-[#F5E29F] text-xs font-bold hover:bg-[#152864] transition flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>View Full Scheme Cockpit</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
