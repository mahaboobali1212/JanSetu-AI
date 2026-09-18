import React from 'react';
import { PreFlightAnalysisReport } from '../types/preflight';
import { 
  X, 
  HelpCircle, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Sparkles, 
  ExternalLink, 
  BookOpen, 
  Wrench, 
  ShieldAlert,
  Bot,
  Scale
} from 'lucide-react';

interface WhyNotReadyModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: PreFlightAnalysisReport | null;
  onOpenFixPlan: () => void;
  onOpenCopilot?: () => void;
}

export const WhyNotReadyModal: React.FC<WhyNotReadyModalProps> = ({
  isOpen,
  onClose,
  report,
  onOpenFixPlan,
  onOpenCopilot
}) => {
  if (!isOpen || !report) return null;

  const { readiness, risks, bedrockPlainLanguageSummary, citations } = report;
  const { overallScore, status, eligibilityScore, documentsScore, identityScore, prerequisitesScore, policyConfidenceScore } = readiness;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FAF7F2] rounded-2xl shadow-2xl border-2 border-[#D4AF37]/40 w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#0B1B4F] text-white p-5 px-6 flex items-center justify-between border-b border-[#D4AF37]/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded border border-[#D4AF37]/30 font-mono">
                  Statutory Diagnostic Engine
                </span>
                <span className="text-xs text-slate-300 font-serif">Readiness: {overallScore}%</span>
              </div>
              <h3 className="text-lg font-bold font-serif text-white mt-0.5">
                Why Am I Not Ready? — Root Cause Explainer
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-grow">
          {/* AI Plain-Language Breakdown Banner */}
          <div className="bg-white border-2 border-[#D4AF37]/40 rounded-2xl p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0B1B4F] uppercase tracking-wider font-mono">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Amazon Bedrock Plain-Language Executive Summary</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-sans bg-amber-50/50 p-4 rounded-xl border border-amber-200/60">
              {bedrockPlainLanguageSummary}
            </p>
          </div>

          {/* 4-Part Diagnostic Score Cards */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3 font-serif">
              4-Pillar Pre-Flight Assessment:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Pillar 1: Eligibility */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">1. Scheme Eligibility</span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {eligibilityScore}/100
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-emerald-600 h-1.5 rounded-full" style={{ width: `${eligibilityScore}%` }} />
                </div>
                <p className="text-[11px] text-slate-500">
                  Evaluated with AWS Cedar deterministic policy rules (caste, income ceiling, state domicile).
                </p>
              </div>

              {/* Pillar 2: Documents */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">2. Mandatory Documents</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded border ${
                    documentsScore >= 80
                      ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                      : 'text-amber-700 bg-amber-50 border-amber-200'
                  }`}>
                    {documentsScore}/100
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${documentsScore}%` }} />
                </div>
                <p className="text-[11px] text-slate-500">
                  Required certificates verified in citizen vault against scheme mandate.
                </p>
              </div>

              {/* Pillar 3: Identity Consistency */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">3. Identity Consistency</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded border ${
                    identityScore >= 90
                      ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                      : 'text-rose-700 bg-rose-50 border-rose-200'
                  }`}>
                    {identityScore}/100
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-rose-500 h-1.5 rounded-full" style={{ width: `${identityScore}%` }} />
                </div>
                <p className="text-[11px] text-slate-500">
                  Cross-document name, DOB, and guardian spelling match across Aadhaar, Board, and Bank passbook.
                </p>
              </div>

              {/* Pillar 4: Prerequisites */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">4. Banking & OTR Prerequisites</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded border ${
                    prerequisitesScore >= 80
                      ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                      : 'text-amber-700 bg-amber-50 border-amber-200'
                  }`}>
                    {prerequisitesScore}/100
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: `${prerequisitesScore}%` }} />
                </div>
                <p className="text-[11px] text-slate-500">
                  NPCI Aadhaar Payment Bridge (APBS) active mapping and portal One-Time Registration.
                </p>
              </div>
            </div>
          </div>

          {/* Identified Risks & Failure Points */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 font-serif">
              Identified Blockers & Risk Factors ({risks.length}):
            </h4>
            <div className="space-y-2.5">
              {risks.map((risk) => (
                <div
                  key={risk.id}
                  className={`p-4 rounded-xl border text-xs space-y-1.5 ${
                    risk.severity === 'CRITICAL'
                      ? 'bg-rose-50/80 border-rose-200 text-rose-950'
                      : risk.severity === 'WARNING'
                      ? 'bg-amber-50/80 border-amber-200 text-amber-950'
                      : 'bg-blue-50/80 border-blue-200 text-blue-950'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {risk.severity === 'CRITICAL' ? (
                        <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                      )}
                      <strong className="font-bold text-sm font-serif">{risk.title}</strong>
                    </div>
                    <span className="text-[10px] font-bold uppercase font-mono px-2 py-0.5 rounded bg-white/80 border border-slate-300">
                      {risk.category}
                    </span>
                  </div>
                  <p className="text-[12px] leading-relaxed text-slate-800">
                    {risk.problemDescription}
                  </p>
                  <div className="pt-1 text-[11px] font-semibold text-slate-700 bg-white/60 p-2 rounded-lg border border-slate-200/60">
                    <span className="font-bold text-[#0B1B4F]">Suggested Statutory Fix:</span> {risk.requiredAction}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Official Gazette & Authority Citations */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0B1B4F] uppercase tracking-wider">
              <BookOpen className="w-4 h-4 text-amber-600" />
              <span>Official Policy & Gazette Sources (Zero-Hallucination)</span>
            </div>
            <div className="space-y-2">
              {citations.map((c, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                >
                  <div>
                    <div className="font-bold text-slate-900 font-serif">
                      {c.authority} — {c.policyName}
                    </div>
                    <div className="text-[11px] text-slate-600 mt-0.5">
                      {c.gazetteClause}
                    </div>
                  </div>
                  <a
                    href={c.officialPortalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0B1B4F] hover:underline shrink-0 bg-white px-2.5 py-1 rounded border border-slate-300"
                  >
                    <span>View Gazette</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-100 p-4 px-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-600 font-medium">
            Status: <span className="font-bold text-[#0B1B4F]">{status.replace('_', ' ')}</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {onOpenCopilot && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenCopilot();
                }}
                className="px-4 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
              >
                <Bot className="w-3.5 h-3.5 text-amber-600" />
                <span>Ask JanSetu Copilot</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenFixPlan();
              }}
              className="px-5 py-2.5 rounded-xl bg-[#0B1B4F] hover:bg-[#162D6E] text-[#F5E29F] text-xs font-bold transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Wrench className="w-4 h-4" />
              <span>Launch "Fix My Application" Action Plan</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
