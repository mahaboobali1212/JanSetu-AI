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
  FileCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PreFlightAuditPageProps {
  profile: CitizenProfile;
  currentLanguage: Language;
  onBack: () => void;
}

export const PreFlightAuditPage: React.FC<PreFlightAuditPageProps> = ({
  profile,
  currentLanguage,
  onBack
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
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold transition-colors shadow-sm"
      >
        <ArrowLeft className="w-3.5 h-3.5 text-[#0B1B4F]" />
        <span>← Back to Dashboard</span>
      </button>

      {/* Page Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-3">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Pre-Flight Clerical & Banking Rejection Prevention</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-[#0B1B4F] font-serif mb-2">
          Clerical Mismatch & NPCI DBT Mandate Audit
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
          Over 30% of scholarship grants fail silently at the treasury stage due to spelling/initial discrepancies or inactive NPCI DBT mapping. Run this pre-flight check before applying.
        </p>

        {/* Audit Score Badge */}
        <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-slate-500 mb-0.5">Pre-Flight Audit Readiness Score</div>
            <div className="text-3xl font-black text-[#0B1B4F] flex items-center gap-2 font-serif">
              <span className={auditReport.overallScore >= 80 ? 'text-emerald-700' : 'text-amber-700'}>
                {auditReport.overallScore} / 100
              </span>
              <span className="text-xs font-semibold text-slate-500">
                ({auditReport.status.replace('_', ' ')})
              </span>
            </div>
          </div>

          <button
            onClick={handleDownloadMandatePdf}
            className="px-6 py-3 rounded-lg bg-[#0B1B4F] hover:bg-[#142A6F] text-white font-bold text-xs shadow-md flex items-center gap-2 transition-all"
          >
            <FileDown className="w-4 h-4 text-amber-300" />
            <span>Generate Printable Annexure-I Mandate PDF</span>
          </button>
        </div>
      </div>

      {/* Interactive Name Mismatch Tester */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#0B1B4F] mb-4 flex items-center gap-2">
          <FileCheck className="w-4 h-4 text-amber-600" />
          <span>Document Name & Initials Compatibility Matcher</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              1. Name on Aadhaar Card
            </label>
            <input
              type="text"
              value={aadhaarName}
              onChange={(e) => setAadhaarName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-[#0B1B4F] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              2. Name on 10th Marksheet
            </label>
            <input
              type="text"
              value={marksheetName}
              onChange={(e) => setMarksheetName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-[#0B1B4F] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              3. Name in Bank Passbook
            </label>
            <input
              type="text"
              value={bankPassbookName}
              onChange={(e) => setBankPassbookName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-[#0B1B4F] focus:outline-none"
            />
          </div>
        </div>

        <button
          onClick={handleRunAudit}
          className="px-5 py-2.5 rounded-lg bg-[#0B1B4F] hover:bg-[#142A6F] text-white font-bold text-xs transition-colors shadow-sm"
        >
          Re-Analyze Document Compatibility
        </button>

        {/* Audit Results Breakdown */}
        <div className="mt-6 space-y-3">
          {auditReport.issues.map((issue, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border ${
                issue.severity === 'PASS'
                  ? 'bg-emerald-50/70 border-emerald-200'
                  : issue.severity === 'WARNING'
                  ? 'bg-amber-50/70 border-amber-200'
                  : 'bg-rose-50/70 border-rose-200'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <div className="flex items-center gap-2 font-bold text-xs">
                  {issue.severity === 'PASS' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                  )}
                  <span className="text-[#0B1B4F]">{issue.title}</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700">
                  {issue.severity}
                </span>
              </div>

              <p className="text-xs text-slate-700 mb-2">
                {issue.description}
              </p>

              <div className="text-[11px] text-slate-600 bg-white p-2.5 rounded-lg border border-slate-200 mb-2 font-mono">
                {issue.detectedDiscrepancy}
              </div>

              <div className="text-xs text-slate-800">
                <strong className="text-amber-800">Statutory Remedy: </strong>
                {issue.statutoryRemedy}
              </div>

              {issue.directActionUrl && (
                <div className="mt-2">
                  <a
                    href={issue.directActionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-[#0B1B4F] hover:underline font-bold"
                  >
                    <span>{issue.directActionLabel || 'Take Action →'}</span>
                    <ExternalLink className="w-3 h-3 text-amber-600" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* NPCI DBT Seeding vs Bank Account Linking Explainer Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#0B1B4F] mb-4 flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-emerald-600" />
          <span>The Fatal Difference: ATM KYC vs NPCI DBT Mapper Seeding</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs mb-6">
          <div className="bg-rose-50 p-4 rounded-xl border border-rose-200">
            <div className="font-bold text-rose-900 mb-1 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <span>1. Basic Bank Account Linking (ATM KYC)</span>
            </div>
            <p className="text-slate-700 leading-relaxed">
              Links your Aadhaar number to your bank branch for ATM & identity verification. <strong>This DOES NOT enable automatic scholarship deposits.</strong>
            </p>
          </div>

          <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
            <div className="font-bold text-emerald-900 mb-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>2. Active NPCI DBT Mapper Seeding (Mandatory)</span>
            </div>
            <p className="text-slate-700 leading-relaxed">
              Registers your account with the National Payments Corporation of India (NPCI) central gateway. <strong>Mandatory for all PFMS scholarship disbursements.</strong>
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-[#0B1B4F] mb-0.5">Need to seed your bank account?</div>
            <p className="text-xs text-slate-600">Download the pre-filled official Annexure-I form and submit it to your Bank Branch Manager.</p>
          </div>

          <button
            onClick={handleDownloadMandatePdf}
            className="px-5 py-2.5 rounded-lg bg-[#0B1B4F] hover:bg-[#142A6F] text-white font-bold text-xs flex items-center gap-2 shrink-0 transition-colors shadow-sm"
          >
            <FileDown className="w-4 h-4 text-amber-300" />
            <span>Download Annexure-I PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
