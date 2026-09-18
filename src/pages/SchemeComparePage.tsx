import React, { useState } from 'react';
import { SchemeDefinition } from '../types/scheme';
import { CENTRAL_SCHEMES } from '../data/schemesCentral';
import { STATE_SCHEMES } from '../data/schemesStates';
import { MASTER_CERTIFICATES } from '../data/certificates';
import { Language } from '../types/language';
import { 
  Scale, 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  IndianRupee, 
  Building2, 
  Calendar, 
  FileCheck2, 
  ExternalLink,
  Sparkles,
  Layers,
  ChevronRight
} from 'lucide-react';

interface SchemeComparePageProps {
  currentLanguage: Language;
  onBack: () => void;
  onOpenCockpit: (scheme: SchemeDefinition) => void;
  onOpenPortalGuide: (scheme: SchemeDefinition) => void;
}

export const SchemeComparePage: React.FC<SchemeComparePageProps> = ({
  currentLanguage,
  onBack,
  onOpenCockpit,
  onOpenPortalGuide
}) => {
  const allSchemes: SchemeDefinition[] = [...CENTRAL_SCHEMES, ...STATE_SCHEMES];

  const [schemeAId, setSchemeAId] = useState<string>(allSchemes[0]?.id || '');
  const [schemeBId, setSchemeBId] = useState<string>(allSchemes[1]?.id || '');

  const schemeA = allSchemes.find(s => s.id === schemeAId) || allSchemes[0];
  const schemeB = allSchemes.find(s => s.id === schemeBId) || allSchemes[1];

  // Evaluate Dual-Benefit Stacking Legality
  const isSchemeATuition = schemeA.benefitType === 'fee_waiver';
  const isSchemeBTuition = schemeB.benefitType === 'fee_waiver';

  let stackingStatus: 'ALLOWED' | 'PROHIBITED' | 'CONDITIONAL' = 'ALLOWED';
  let stackingVerdict = '';
  let stackingRule = '';

  if (isSchemeATuition && isSchemeBTuition) {
    stackingStatus = 'PROHIBITED';
    stackingVerdict = 'Duplicate Tuition Waiver Claim Prohibited';
    stackingRule = 'Statutory rules prohibit claiming two full tuition fee waivers for the same degree course. You must choose the higher benefit scheme.';
  } else if ((isSchemeATuition && schemeB.benefitType === 'cash_dbt') || (schemeA.benefitType === 'cash_dbt' && isSchemeBTuition)) {
    stackingStatus = 'ALLOWED';
    stackingVerdict = '100% Concurrent Stacking Permitted (Tuition Fee + Living DBT)';
    stackingRule = 'Government rules permit combining a Tuition Fee Waiver (reimbursed directly to the college) with a Central Merit / Maintenance Allowance (credited to the student’s bank account).';
  } else {
    stackingStatus = 'CONDITIONAL';
    stackingVerdict = 'Conditional Dual-Availing (Subject to Nodal Verification)';
    stackingRule = 'If both are cash DBT schemes, check whether both scholarships disallow other central/state grants in their undertaking clause.';
  }

  const combinedAnnualValue = (schemeA.benefitAmountAnnualNumeric || 0) + (schemeB.benefitAmountAnnualNumeric || 0);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#DACBB8] pb-6">
        <div>
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#0B1B4F] mb-2 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full border border-amber-300">
              Scheme Stacking Engine
            </span>
            <span className="text-xs text-slate-500 font-serif">Dual-Benefit Legality & Side-by-Side Matrix</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#0B1B4F] mt-1">
            Multi-Scheme Dual Benefit & Stacking Comparison
          </h1>
        </div>

        <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-xl border border-[#DACBB8] shadow-sm">
          <Layers className="w-5 h-5 text-[#B8860B]" />
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-500">Max Combined Potential</div>
            <div className="text-sm font-bold text-emerald-800 font-serif">
              ₹{combinedAnnualValue.toLocaleString('en-IN')} / Year
            </div>
          </div>
        </div>
      </div>

      {/* Scheme Selectors Bar */}
      <div className="bg-white rounded-2xl border border-[#DACBB8] p-5 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5 font-serif">
            Select Primary Scheme (Scheme A):
          </label>
          <select
            value={schemeAId}
            onChange={(e) => setSchemeAId(e.target.value)}
            className="w-full bg-[#FAF7F2] border border-[#DACBB8] rounded-xl px-3.5 py-2.5 text-xs font-bold text-[#0B1B4F] focus:outline-none focus:ring-2 focus:ring-[#0B1B4F]"
          >
            {allSchemes.map((s) => (
              <option key={`a-${s.id}`} value={s.id}>
                [{s.level.toUpperCase()}] {s.name} ({s.benefitAmount})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5 font-serif">
            Select Secondary Scheme (Scheme B):
          </label>
          <select
            value={schemeBId}
            onChange={(e) => setSchemeBId(e.target.value)}
            className="w-full bg-[#FAF7F2] border border-[#DACBB8] rounded-xl px-3.5 py-2.5 text-xs font-bold text-[#0B1B4F] focus:outline-none focus:ring-2 focus:ring-[#0B1B4F]"
          >
            {allSchemes.map((s) => (
              <option key={`b-${s.id}`} value={s.id}>
                [{s.level.toUpperCase()}] {s.name} ({s.benefitAmount})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Dual Stacking Legal Verdict Banner */}
      <div className={`p-6 rounded-2xl border-2 shadow-sm ${
        stackingStatus === 'ALLOWED'
          ? 'bg-emerald-50/80 border-emerald-400 text-emerald-950'
          : stackingStatus === 'PROHIBITED'
            ? 'bg-rose-50/80 border-rose-400 text-rose-950'
            : 'bg-amber-50/80 border-amber-400 text-amber-950'
      }`}>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 bg-white shadow-sm">
            {stackingStatus === 'ALLOWED' && <CheckCircle2 className="w-7 h-7 text-emerald-600" />}
            {stackingStatus === 'PROHIBITED' && <XCircle className="w-7 h-7 text-rose-600" />}
            {stackingStatus === 'CONDITIONAL' && <AlertCircle className="w-7 h-7 text-amber-600" />}
          </div>
          <div className="space-y-1 flex-grow">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                stackingStatus === 'ALLOWED' ? 'bg-emerald-200 text-emerald-900' :
                stackingStatus === 'PROHIBITED' ? 'bg-rose-200 text-rose-900' : 'bg-amber-200 text-amber-900'
              }`}>
                Stacking Evaluation: {stackingStatus}
              </span>
              <span className="text-xs font-bold font-serif">{stackingVerdict}</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-800">
              {stackingRule}
            </p>
          </div>
        </div>
      </div>

      {/* Side-by-Side Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card Scheme A */}
        <div className="bg-white rounded-2xl border-2 border-[#D4AF37]/40 p-6 space-y-5 shadow-md flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-[10px] font-bold uppercase tracking-widest bg-[#0B1B4F] text-[#F5E29F] px-2.5 py-0.5 rounded-md">
                Scheme A • {schemeA.level.toUpperCase()}
              </span>
              <span className="text-xs text-slate-500 font-mono">{schemeA.code}</span>
            </div>

            <h3 className="text-lg font-bold font-serif text-[#0B1B4F] leading-snug">
              {schemeA.name}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {schemeA.shortDescription}
            </p>

            {/* Metrics */}
            <div className="space-y-2.5 pt-2 text-xs">
              <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#EAE2D5] flex items-center justify-between">
                <span className="text-slate-600 font-medium">Grant / Benefit Value:</span>
                <span className="font-bold text-emerald-800 font-serif text-sm">{schemeA.benefitAmount}</span>
              </div>

              <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#EAE2D5] flex items-center justify-between">
                <span className="text-slate-600 font-medium">Disbursement Mode:</span>
                <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                  {schemeA.benefitType === 'fee_waiver' ? 'Direct to College (Fee Waiver)' : 'Direct Student DBT Bank'}
                </span>
              </div>

              <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#EAE2D5] flex items-center justify-between">
                <span className="text-slate-600 font-medium">Income Ceiling:</span>
                <span className="font-bold text-slate-800">
                  {schemeA.criteria.maxAnnualIncome ? `₹${(schemeA.criteria.maxAnnualIncome / 100000).toFixed(2)} Lakhs/yr` : 'No Income Cap'}
                </span>
              </div>

              <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#EAE2D5] flex items-center justify-between">
                <span className="text-slate-600 font-medium">Application Deadline:</span>
                <span className="font-bold text-slate-800 font-mono">{schemeA.applicationClosingDate}</span>
              </div>
            </div>

            {/* Mandatory Docs */}
            <div>
              <div className="text-[11px] font-bold uppercase text-slate-500 font-serif mb-2">
                Mandatory Documents ({schemeA.requiredCertificates.length}):
              </div>
              <div className="flex flex-wrap gap-1.5">
                {schemeA.requiredCertificates.map(c => (
                  <span key={c} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                    {MASTER_CERTIFICATES[c]?.title?.split('(')[0]?.trim() || c}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
            <button
              onClick={() => onOpenCockpit(schemeA)}
              className="flex-1 py-2.5 rounded-xl bg-[#0B1B4F] text-[#F5E29F] text-xs font-bold hover:bg-[#12286D] transition flex items-center justify-center gap-1 shadow-sm"
            >
              <span>View Scheme Cockpit</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onOpenPortalGuide(schemeA)}
              className="px-3 py-2.5 rounded-xl bg-white border border-[#DACBB8] hover:bg-slate-50 text-slate-700 text-xs font-bold transition flex items-center gap-1 shadow-sm"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Guide</span>
            </button>
          </div>
        </div>

        {/* Card Scheme B */}
        <div className="bg-white rounded-2xl border-2 border-[#D4AF37]/40 p-6 space-y-5 shadow-md flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-[10px] font-bold uppercase tracking-widest bg-[#0B1B4F] text-[#F5E29F] px-2.5 py-0.5 rounded-md">
                Scheme B • {schemeB.level.toUpperCase()}
              </span>
              <span className="text-xs text-slate-500 font-mono">{schemeB.code}</span>
            </div>

            <h3 className="text-lg font-bold font-serif text-[#0B1B4F] leading-snug">
              {schemeB.name}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {schemeB.shortDescription}
            </p>

            {/* Metrics */}
            <div className="space-y-2.5 pt-2 text-xs">
              <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#EAE2D5] flex items-center justify-between">
                <span className="text-slate-600 font-medium">Grant / Benefit Value:</span>
                <span className="font-bold text-emerald-800 font-serif text-sm">{schemeB.benefitAmount}</span>
              </div>

              <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#EAE2D5] flex items-center justify-between">
                <span className="text-slate-600 font-medium">Disbursement Mode:</span>
                <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                  {schemeB.benefitType === 'fee_waiver' ? 'Direct to College (Fee Waiver)' : 'Direct Student DBT Bank'}
                </span>
              </div>

              <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#EAE2D5] flex items-center justify-between">
                <span className="text-slate-600 font-medium">Income Ceiling:</span>
                <span className="font-bold text-slate-800">
                  {schemeB.criteria.maxAnnualIncome ? `₹${(schemeB.criteria.maxAnnualIncome / 100000).toFixed(2)} Lakhs/yr` : 'No Income Cap'}
                </span>
              </div>

              <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#EAE2D5] flex items-center justify-between">
                <span className="text-slate-600 font-medium">Application Deadline:</span>
                <span className="font-bold text-slate-800 font-mono">{schemeB.applicationClosingDate}</span>
              </div>
            </div>

            {/* Mandatory Docs */}
            <div>
              <div className="text-[11px] font-bold uppercase text-slate-500 font-serif mb-2">
                Mandatory Documents ({schemeB.requiredCertificates.length}):
              </div>
              <div className="flex flex-wrap gap-1.5">
                {schemeB.requiredCertificates.map(c => (
                  <span key={c} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                    {MASTER_CERTIFICATES[c]?.title?.split('(')[0]?.trim() || c}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
            <button
              onClick={() => onOpenCockpit(schemeB)}
              className="flex-1 py-2.5 rounded-xl bg-[#0B1B4F] text-[#F5E29F] text-xs font-bold hover:bg-[#12286D] transition flex items-center justify-center gap-1 shadow-sm"
            >
              <span>View Scheme Cockpit</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onOpenPortalGuide(schemeB)}
              className="px-3 py-2.5 rounded-xl bg-white border border-[#DACBB8] hover:bg-slate-50 text-slate-700 text-xs font-bold transition flex items-center gap-1 shadow-sm"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Guide</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
