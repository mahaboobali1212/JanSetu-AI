import React, { useState } from 'react';
import { CitizenProfile } from '../types/profile';
import { ClericalAuditEngine, ClericalAuditReport } from '../engine/clericalAudit';
import { MandateGenerator } from '../engine/mandateGenerator';
import { Language } from '../types/language';
import { TRANSLATIONS } from '../data/translations';
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  FileDown, 
  ArrowLeft, 
  CreditCard, 
  ExternalLink,
  ShieldAlert,
  HelpCircle,
  FileCheck,
  Printer
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PreFlightAuditPageProps {
  profile: CitizenProfile;
  currentLanguage: Language;
  onBack: () => void;
  onOpenDossier?: () => void;
}

export const PreFlightAuditPage: React.FC<PreFlightAuditPageProps> = ({
  profile,
  currentLanguage,
  onBack,
  onOpenDossier
}) => {
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  const [aadhaarName, setAadhaarName] = useState(profile.fullName);
  const [marksheetName, setMarksheetName] = useState(profile.fullName);
  const [bankPassbookName, setBankPassbookName] = useState(profile.fullName);

  const [auditReport, setAuditReport] = useState<ClericalAuditReport>(() => 
    ClericalAuditEngine.runAudit({
      aadhaarName: profile.fullName,
      marksheetName: profile.fullName,
      bankPassbookName: profile.fullName
    })
  );

  const handleRunAudit = () => {
    const report = ClericalAuditEngine.runAudit({
      aadhaarName,
      marksheetName,
      bankPassbookName
    });
    setAuditReport(report);

    if (report.overallScore >= 90) {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.7 }
      });
    }
  };

  const handleDownloadMandatePdf = () => {
    MandateGenerator.generateMandatePdf(profile);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 }
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in space-y-8">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold transition-colors shadow-sm cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5 text-[#0B1B4F]" />
        <span>← Back to Dashboard</span>
      </button>

      {/* Page Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-3">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Pre-Flight Clerical &amp; Banking Rejection Prevention</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-[#0B1B4F] font-serif mb-2">
          Clerical Mismatch &amp; NPCI DBT Mandate Audit
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
          Over 30% of scholarship grants fail silently at the treasury stage due to spelling/initial discrepancies or inactive NPCI DBT mapping. Run this pre-flight check before applying.
        </p>

        {/* Audit Score Badge */}
        <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-slate-500 mb-0.5">Pre-Flight Audit Readiness Score</div>
            <div className="text-3xl sm:text-4xl font-black text-[#0B1B4F] font-serif flex items-center gap-3">
              <span>{auditReport.overallScore}%</span>
              <span className={`text-xs font-bold font-sans px-2.5 py-1 rounded border ${
                auditReport.status === 'GREEN_CLEARED'
                  ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                  : auditReport.status === 'YELLOW_WARNING'
                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                  : 'bg-rose-100 text-rose-900 border-rose-300'
              }`}>
                {auditReport.status === 'GREEN_CLEARED' ? 'LOW RISK (CLEARED)' : auditReport.status === 'YELLOW_WARNING' ? 'MEDIUM RISK (WARNING)' : 'HIGH RISK (ACTION REQUIRED)'}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {onOpenDossier && (
              <button
                onClick={onOpenDossier}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-sm transition-all cursor-pointer"
              >
                <Printer className="w-4 h-4 text-slate-950" />
                <span>1-Click Citizen Dossier</span>
              </button>
            )}

            <button
              onClick={handleDownloadMandatePdf}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B1B4F] hover:bg-[#152864] text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
            >
              <FileDown className="w-4 h-4 text-amber-300" />
              <span>{t.generate_annexure_pdf}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 1. Name Matcher Form & Analysis */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#0B1B4F] mb-1">
            01. Cross-Document Name Consistency Verifier
          </h3>
          <p className="text-xs text-slate-500">
            Compare exact names printed on your identity card, board marksheet, and bank account frontpage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Name on Aadhaar Card (Demographic KYC)
            </label>
            <input
              type="text"
              value={aadhaarName}
              onChange={(e) => setAadhaarName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-bold text-[#0B1B4F] focus:outline-hidden focus:ring-2 focus:ring-[#0B1B4F]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Name on 10th / 12th Board Marksheet
            </label>
            <input
              type="text"
              value={marksheetName}
              onChange={(e) => setMarksheetName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-bold text-[#0B1B4F] focus:outline-hidden focus:ring-2 focus:ring-[#0B1B4F]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Name on Bank Passbook (NPCI DBT Account)
            </label>
            <input
              type="text"
              value={bankPassbookName}
              onChange={(e) => setBankPassbookName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-bold text-[#0B1B4F] focus:outline-hidden focus:ring-2 focus:ring-[#0B1B4F]"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleRunAudit}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors shadow-sm cursor-pointer"
          >
            Re-Run Clerical Name Audit
          </button>
        </div>

        {/* Audit Observations */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Automated Discrepancy Diagnostics:
          </h4>
          <div className="space-y-2">
            {auditReport.issues.map((d, i) => (
              <div
                key={i}
                className={`p-3.5 rounded-xl border text-xs flex items-start gap-3 ${
                  d.severity === 'PASS'
                    ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                    : d.severity === 'WARNING'
                    ? 'bg-amber-50/70 border-amber-200 text-amber-950'
                    : 'bg-rose-50/70 border-rose-200 text-rose-950'
                }`}
              >
                {d.severity === 'PASS' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <strong className="block font-bold">{d.title}</strong>
                  <p className="mt-0.5 text-[11px] leading-relaxed">{d.description}</p>
                  {d.statutoryRemedy && (
                    <p className="mt-1 text-[11px] font-semibold text-slate-700 italic">Remedy: {d.statutoryRemedy}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. NPCI Seeding Mandate PDF Generator Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-md border border-amber-200">
              <CreditCard className="w-3.5 h-3.5 text-amber-600" />
              <span>Standard RBI / NPCI Annexure-I Bank Application Form</span>
            </div>
            <h3 className="text-xl font-bold text-[#0B1B4F] font-serif">
              Aadhaar-to-Bank NPCI DBT Seeding Mandate
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              If your bank account is not mapped to the NPCI Aadhaar payment bridge, download this pre-filled Annexure-I mandate form. Sign it, attach a copy of your Aadhaar and Bank Passbook, and hand it to your branch manager (Statutory Fee: ₹0).
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={handleDownloadMandatePdf}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              <FileDown className="w-4 h-4" />
              <span>Download Printable Annexure-I (PDF)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
