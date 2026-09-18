import React from 'react';
import { CitizenProfile } from '../types/profile';
import { CertificateInventory, CertificateKey } from '../types/certificate';
import { EvaluationResult } from '../types/scheme';
import { MASTER_CERTIFICATES } from '../data/certificates';
import { 
  Printer, 
  X, 
  ShieldCheck, 
  QrCode, 
  Building, 
  CheckCircle2, 
  XCircle,
  FileCheck,
  Award
} from 'lucide-react';

interface ApplicationDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: CitizenProfile;
  inventory: CertificateInventory;
  evaluationResults: EvaluationResult[];
}

export const ApplicationDossierModal: React.FC<ApplicationDossierModalProps> = ({
  isOpen,
  onClose,
  profile,
  inventory,
  evaluationResults
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const eligibleSchemes = evaluationResults.filter(r => r.status === 'READY_TO_APPLY');
  const conditionalSchemes = evaluationResults.filter(r => r.status === 'CONDITIONALLY_ELIGIBLE');
  const totalPotentialBenefit = evaluationResults
    .filter(r => r.status === 'READY_TO_APPLY' || r.status === 'CONDITIONALLY_ELIGIBLE')
    .reduce((sum, r) => sum + r.scheme.benefitAmountAnnualNumeric, 0);

  const certKeyList = Object.keys(inventory) as CertificateKey[];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in print:p-0 print:bg-white print:static">
      <div 
        className="w-full max-w-4xl bg-[#FAF7F2] rounded-2xl shadow-2xl border border-amber-300 overflow-hidden flex flex-col max-h-[92vh] animate-scale-up print:max-h-none print:shadow-none print:border-none print:rounded-none"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        {/* Modal Top Control Bar (Hidden in Print) */}
        <div className="bg-[#0B1B4F] text-white p-4 sm:p-5 border-b border-amber-500/30 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-amber-300" />
            <div>
              <h3 className="text-base font-black text-white font-serif tracking-wide">
                1-Click Citizen Application Dossier
              </h3>
              <p className="text-[11px] text-slate-300">
                Official Pre-Flight Submission Card for College Officers &amp; CSC Desks
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4 text-slate-950" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PRINTABLE DOSSIER SHEET */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-6 text-slate-900 print:p-0 print:overflow-visible">
          {/* Official Emblem & Header */}
          <div className="border-b-2 border-[#0B1B4F] pb-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-[#0B1B4F] text-[#FDE68A] text-xs font-serif font-black px-2.5 py-0.5 rounded tracking-wider">
                    JANSETU AI
                  </span>
                  <span className="font-mono text-xs text-slate-500">
                    Audit Ref: #JS-{profile.stateOfDomicile.slice(0,2).toUpperCase()}-2026-9901
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-[#0B1B4F] font-serif tracking-tight">
                  CITIZEN SCHOLARSHIP &amp; CIVIC SUBMISSION CARD
                </h1>
                <p className="text-xs text-slate-600 mt-0.5">
                  Pre-Flight Verification • National Direct Benefit Transfer (DBT) Pre-Check
                </p>
              </div>

              <div className="flex flex-col items-center justify-center p-2.5 bg-white rounded-xl border border-amber-300 shadow-2xs">
                <QrCode className="w-12 h-12 text-[#0B1B4F]" />
                <span className="text-[9px] font-mono font-black text-amber-800 mt-1">
                  VERIFIED AUDIT
                </span>
              </div>
            </div>
          </div>

          {/* Section 1: Verified Citizen Demographics */}
          <div className="border-b border-slate-200 pb-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B1B4F] font-serif mb-3">
              01. Verified Applicant Demographics
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="text-slate-500 block text-[10px]">Applicant Name:</span>
                <strong className="text-slate-900 font-bold">{profile.fullName}</strong>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="text-slate-500 block text-[10px]">Aadhaar Masked:</span>
                <strong className="font-mono text-slate-900 font-bold">XXXX - XXXX - {profile.aadhaarLast4 || 'XXXX'}</strong>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="text-slate-500 block text-[10px]">State of Domicile:</span>
                <strong className="text-slate-900 font-bold">{profile.stateOfDomicile} ({profile.district})</strong>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="text-slate-500 block text-[10px]">Social Category:</span>
                <strong className="text-slate-900 font-bold">{profile.category}</strong>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="text-slate-500 block text-[10px]">Annual Family Income:</span>
                <strong className="text-slate-900 font-bold">₹{profile.annualIncome.toLocaleString('en-IN')}</strong>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="text-slate-500 block text-[10px]">Education &amp; Course:</span>
                <strong className="text-slate-900 font-bold">{profile.courseName || profile.courseLevel}</strong>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="text-slate-500 block text-[10px]">Academic Merit (%):</span>
                <strong className="text-slate-900 font-bold">{profile.marksPercentage}%</strong>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="text-slate-500 block text-[10px]">Special Entitlements:</span>
                <strong className="text-slate-900 font-bold">
                  {profile.isFirstGraduate ? 'First Graduate' : ''} {profile.schoolingType === 'govt_school' ? '• 7.5% Govt School' : ''}
                  {!profile.isFirstGraduate && profile.schoolingType !== 'govt_school' ? 'General' : ''}
                </strong>
              </div>
            </div>
          </div>

          {/* Section 2: Calculated Scheme Entitlements */}
          <div className="border-b border-slate-200 pb-5">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B1B4F] font-serif">
                02. Audited Scheme Entitlements
              </h4>
              <span className="text-xs font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded border border-amber-300">
                Total Potential Grant: ₹{totalPotentialBenefit.toLocaleString('en-IN')} / year
              </span>
            </div>

            <div className="space-y-2">
              {eligibleSchemes.map(r => (
                <div key={r.scheme.id} className="p-3 rounded-lg bg-emerald-50/70 border border-emerald-300 flex items-center justify-between text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-emerald-900">{r.scheme.name}</span>
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-white text-emerald-800 border border-emerald-300">
                        {r.scheme.code}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-600 mt-0.5">
                      Portal: {r.scheme.portalName} • Authority: {r.scheme.authority}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-[#0B1B4F] font-serif text-sm">
                      {r.scheme.benefitAmount}
                    </span>
                    <span className="block text-[10px] font-bold text-emerald-700">🟢 100% READY</span>
                  </div>
                </div>
              ))}

              {conditionalSchemes.map(r => (
                <div key={r.scheme.id} className="p-3 rounded-lg bg-amber-50/70 border border-amber-300 flex items-center justify-between text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-amber-950">{r.scheme.name}</span>
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-white text-amber-800 border border-amber-300">
                        {r.scheme.code}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-600 mt-0.5">
                      Missing: {r.missingCertificates.length} document(s)
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-[#0B1B4F] font-serif text-sm">
                      {r.scheme.benefitAmount}
                    </span>
                    <span className="block text-[10px] font-bold text-amber-700">🟠 PENDING DOCS</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Certificate Verification Matrix */}
          <div className="border-b border-slate-200 pb-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B1B4F] font-serif mb-3">
              03. Pre-Flight Document Inventory Verification
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              {certKeyList.map(k => {
                const isHeld = inventory[k];
                const cert = MASTER_CERTIFICATES[k];
                return (
                  <div 
                    key={k} 
                    className={`p-2 rounded-lg border flex items-center justify-between ${
                      isHeld ? 'bg-emerald-50 border-emerald-200 text-emerald-950' : 'bg-rose-50 border-rose-200 text-rose-950'
                    }`}
                  >
                    <span className="font-medium text-[11px] line-clamp-1">{cert?.title || k}</span>
                    {isHeld ? (
                      <span className="font-bold text-[10px] text-emerald-700 flex items-center gap-0.5 shrink-0">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Verified</span>
                      </span>
                    ) : (
                      <span className="font-bold text-[10px] text-rose-700 flex items-center gap-0.5 shrink-0">
                        <XCircle className="w-3 h-3 text-rose-600" />
                        <span>Missing</span>
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 4: Officer & Operator Advisory Note */}
          <div className="p-4 rounded-xl bg-slate-100 border border-slate-300 text-xs space-y-2">
            <strong className="block text-[#0B1B4F] font-serif font-bold text-xs uppercase tracking-wider">
              Instructions for College Nodal Officer (INO) &amp; CSC Operator:
            </strong>
            <ul className="list-disc list-inside space-y-1 text-slate-700 text-[11px]">
              <li>This citizen profile has passed automated pre-flight deterministic statutory verification.</li>
              <li>Ensure the student’s bank account is <strong>Aadhaar-NPCI Seeded</strong> before final submission on PFMS / State Treasury.</li>
              <li>Zero processing fees are legally permitted for NSP submissions. Do not charge beyond statutory portal fees.</li>
            </ul>
          </div>

          {/* Signatures Footer */}
          <div className="pt-6 grid grid-cols-2 gap-8 text-center text-xs">
            <div className="border-t border-slate-400 pt-2">
              <span className="text-slate-500 block text-[10px]">Candidate / Citizen Signature</span>
              <strong className="text-slate-800">{profile.fullName}</strong>
            </div>
            <div className="border-t border-slate-400 pt-2">
              <span className="text-slate-500 block text-[10px]">Institute Nodal Officer / CSC Seal</span>
              <span className="text-slate-400 italic font-mono text-[11px]">[ Official Seal &amp; Date ]</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
