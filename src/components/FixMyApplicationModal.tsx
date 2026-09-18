import React, { useState } from 'react';
import { CitizenProfile } from '../types/profile';
import { PreFlightAnalysisReport, PreFlightRiskItem } from '../types/preflight';
import { MandateGenerator } from '../engine/mandateGenerator';
import { ActionPlanPdfGenerator } from '../engine/actionPlanPdfGenerator';
import { 
  X, 
  Wrench, 
  CheckCircle2, 
  FileDown, 
  ExternalLink, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  Printer,
  Calendar,
  AlertTriangle
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface FixMyApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: PreFlightAnalysisReport | null;
  profile: CitizenProfile;
  onOpenScanner?: (certKey: any) => void;
  onNavigate?: (page: string) => void;
}

export const FixMyApplicationModal: React.FC<FixMyApplicationModalProps> = ({
  isOpen,
  onClose,
  report,
  profile,
  onOpenScanner,
  onNavigate
}) => {
  const [resolvedRisks, setResolvedRisks] = useState<Record<string, boolean>>({});

  if (!isOpen || !report) return null;

  const { risks, selectedSchemeName, readiness } = report;
  const { overallScore } = readiness;

  const toggleResolved = (riskId: string) => {
    setResolvedRisks(prev => {
      const nextState = { ...prev, [riskId]: !prev[riskId] };
      const allResolved = risks.every(r => nextState[r.id]);
      if (allResolved) {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
      return nextState;
    });
  };

  const handleDownloadMandate = () => {
    MandateGenerator.generateMandatePdf(profile);
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.7 }
    });
  };

  const handleDownloadActionPlan = () => {
    // Generate citizen pre-flight action plan
    ActionPlanPdfGenerator.generatePreFlightRemediationPlan(profile, risks.map(r => ({
      title: r.title,
      description: r.problemDescription,
      remedy: r.requiredAction,
      slaDays: 7,
      isResolved: !!resolvedRisks[r.id]
    })));
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  const completedCount = risks.filter(r => resolvedRisks[r.id]).length;
  const progressPct = risks.length > 0 ? Math.round((completedCount / risks.length) * 100) : 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FAF7F2] rounded-2xl shadow-2xl border-2 border-[#D4AF37]/40 w-full max-w-4xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-[#0B1B4F] text-white p-5 px-6 flex items-center justify-between border-b border-[#D4AF37]/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#F5E29F]">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded border border-[#D4AF37]/30 font-mono">
                  1-Click Statutory Remediation Plan
                </span>
                <span className="text-xs text-slate-300 font-serif">Target: {selectedSchemeName}</span>
              </div>
              <h3 className="text-lg font-bold font-serif text-white mt-0.5">
                Fix My Application — Step-by-Step Action Plan
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
          {/* Progress Tracker */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="text-sm font-bold text-[#0B1B4F] font-serif">
                  Statutory Remediation Progress ({completedCount} of {risks.length} Steps Completed)
                </h4>
                <p className="text-xs text-slate-500">
                  Follow each remedy step below to elevate your pre-flight score from {overallScore}% to 100% READY.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleDownloadActionPlan}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer font-serif"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-950" />
                  <span>Download Action Plan (PDF)</span>
                </button>
              </div>
            </div>

            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
              <div
                className="bg-gradient-to-r from-[#0B1B4F] via-amber-500 to-emerald-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          {/* Action Step Cards */}
          <div className="space-y-4">
            {risks.map((risk, idx) => {
              const isResolved = !!resolvedRisks[risk.id];
              return (
                <div
                  key={risk.id}
                  className={`bg-white rounded-2xl border-2 p-5 shadow-sm transition-all space-y-4 ${
                    isResolved
                      ? 'border-emerald-500/60 bg-emerald-50/10'
                      : 'border-slate-200 hover:border-amber-300'
                  }`}
                >
                  {/* Step Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-xl font-bold font-serif text-sm flex items-center justify-center shrink-0 ${
                        isResolved
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {isResolved ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : idx + 1}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-300">
                            {risk.category}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            risk.severity === 'CRITICAL' ? 'bg-rose-100 text-rose-800' :
                            risk.severity === 'WARNING' ? 'bg-amber-100 text-amber-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {risk.severity} SEVERITY
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-[#0B1B4F] font-serif mt-1">
                          {risk.title}
                        </h4>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleResolved(risk.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                        isResolved
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          : 'bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-300'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{isResolved ? 'Resolved ✓' : 'Mark as Done'}</span>
                    </button>
                  </div>

                  {/* 4-Box Action Details Breakdown */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    {/* 1. What is Wrong? */}
                    <div className="bg-[#FAF7F2] p-3.5 rounded-xl border border-[#EAE2D5] space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-rose-800">
                        1. What is Wrong?
                      </div>
                      <p className="text-slate-800 leading-relaxed">
                        {risk.problemDescription}
                      </p>
                    </div>

                    {/* 2. Statutory Consequence */}
                    <div className="bg-[#FAF7F2] p-3.5 rounded-xl border border-[#EAE2D5] space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                        2. Why It Matters
                      </div>
                      <p className="text-slate-800 leading-relaxed">
                        Government portal verification algorithms will trigger an automatic rejection or hold funds at the State Treasury stage.
                      </p>
                    </div>

                    {/* 3. Action to Take */}
                    <div className="bg-[#FAF7F2] p-3.5 rounded-xl border border-[#EAE2D5] space-y-1 md:col-span-2">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                        3. Required Statutory Action &amp; Remedy
                      </div>
                      <p className="text-slate-800 leading-relaxed font-semibold">
                        {risk.requiredAction}
                      </p>
                    </div>
                  </div>

                  {/* Action Triggers */}
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                    <div className="text-[11px] text-slate-500 flex items-center gap-1 font-mono">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>Estimated Resolution SLA: 1 - 7 Working Days</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {risk.id.includes('npci') || risk.category === 'PREREQUISITE' ? (
                        <button
                          type="button"
                          onClick={handleDownloadMandate}
                          className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer"
                        >
                          <FileDown className="w-3.5 h-3.5" />
                          <span>Download RBI Annexure-I Bank Form (PDF)</span>
                        </button>
                      ) : null}

                      {risk.category === 'IDENTITY' && (
                        <button
                          type="button"
                          onClick={() => {
                            onClose();
                            if (onNavigate) onNavigate('grievance');
                          }}
                          className="px-4 py-2 rounded-xl bg-[#0B1B4F] hover:bg-[#162D6E] text-[#F5E29F] text-xs font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>Generate Notary Affidavit &amp; RTI Petition</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-100 p-4 px-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-600 font-medium">
            Completed: <span className="font-bold text-emerald-800">{completedCount} of {risks.length} Action Items</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-[#0B1B4F] hover:bg-[#162D6E] text-white text-xs font-bold transition cursor-pointer"
            >
              Close &amp; Return to Flight Deck
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
