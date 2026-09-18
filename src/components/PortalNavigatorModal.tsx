import React, { useState } from 'react';
import { SchemeDefinition } from '../types/scheme';
import { 
  ExternalLink, 
  Copy, 
  Check, 
  X, 
  ShieldCheck, 
  Key, 
  FileText, 
  AlertCircle, 
  HelpCircle,
  Building,
  ArrowRight
} from 'lucide-react';

interface PortalNavigatorModalProps {
  scheme: SchemeDefinition | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PortalNavigatorModal: React.FC<PortalNavigatorModalProps> = ({
  scheme,
  isOpen,
  onClose
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen || !scheme) return null;

  const guide = scheme.navigationGuide || {
    applicationMode: 'citizen_otr_portal' as const,
    otrRegistrationUrl: scheme.officialPortalUrl,
    applicantLoginUrl: scheme.officialPortalUrl,
    searchKeyword: `${scheme.code} ${scheme.name}`,
    portalMenuHierarchy: ['Home', 'Schemes', scheme.name],
    requiredUploadSpecs: [
      { documentName: 'Aadhaar Card', allowedFormats: 'PDF', maxFileSize: '< 200 KB' },
      { documentName: 'Marksheet', allowedFormats: 'PDF, JPEG', maxFileSize: '< 200 KB' },
      { documentName: 'Income Certificate', allowedFormats: 'PDF', maxFileSize: '< 200 KB' }
    ],
    postSubmissionAction: 'Submit printed copy of online submission to your College Nodal Officer.'
  };

  const handleCopySearch = () => {
    navigator.clipboard.writeText(guide.searchKeyword);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div 
        className="w-full max-w-2xl bg-[#FAF7F2] rounded-2xl shadow-2xl border border-amber-300 overflow-hidden flex flex-col max-h-[90vh] animate-scale-up"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        {/* Modal Header */}
        <div className="bg-[#0B1B4F] text-white p-5 sm:p-6 border-b border-amber-500/30 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-amber-500/20 text-[#FDE68A] border border-amber-400/30 font-serif">
                {scheme.code}
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-white/10 text-slate-200">
                {scheme.level === 'central' ? 'Central Scheme' : `${scheme.state} State`}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white font-serif tracking-tight">
              Portal Application &amp; OTR Navigator Guide
            </h3>
            <p className="text-xs text-slate-300 mt-0.5 line-clamp-1">
              {scheme.name}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-xs sm:text-sm">
          {/* Application Mode Banner */}
          <div className="p-4 rounded-xl border bg-white shadow-xs">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
              Application Route Type
            </div>
            <div className="flex items-center gap-2">
              {guide.applicationMode === 'citizen_otr_portal' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold text-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  🟢 Citizen Direct Online Apply (Aadhaar OTR Mandatory)
                </span>
              )}
              {guide.applicationMode === 'college_nodal_officer' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 text-blue-800 border border-blue-300 font-bold text-xs">
                  <Building className="w-3.5 h-3.5 text-blue-600" />
                  🔵 Institutional Submission (Via College Scholarship Desk)
                </span>
              )}
              {guide.applicationMode === 'counseling_single_window' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-purple-50 text-purple-800 border border-purple-300 font-bold text-xs">
                  🟣 Centralized Counseling Upload (TNEA / State CET)
                </span>
              )}
            </div>
          </div>

          {/* Quick Action Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {guide.otrRegistrationUrl && (
              <a
                href={guide.otrRegistrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-950 font-bold flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <Key className="w-4 h-4 text-amber-700" />
                  <div>
                    <div className="text-xs font-bold">1. Aadhaar OTR Register</div>
                    <div className="text-[10px] text-amber-800 font-normal">One-Time Registration</div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-amber-700 group-hover:translate-x-0.5 transition-transform" />
              </a>
            )}

            <a
              href={guide.applicantLoginUrl || scheme.officialPortalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-xl bg-[#0B1B4F] hover:bg-[#152864] text-white font-bold flex items-center justify-between transition-all group shadow-sm"
            >
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-amber-300" />
                <div>
                  <div className="text-xs font-bold text-white">2. Launch Official Portal</div>
                  <div className="text-[10px] text-slate-300 font-normal">{scheme.portalName}</div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-amber-300 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          {/* Copyable Search Keyword */}
          <div className="p-4 rounded-xl bg-white border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#0B1B4F]">
                Official Scheme Search Keyword
              </span>
              <button
                onClick={handleCopySearch}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-amber-700" />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Keyword'}</span>
              </button>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 font-mono text-xs text-slate-800 border border-slate-200 select-all">
              {guide.searchKeyword}
            </div>
            <p className="text-[11px] text-slate-500 mt-1.5">
              Paste this keyword in the portal's scheme search bar after logging in.
            </p>
          </div>

          {/* Step-by-Step Portal Path */}
          <div className="p-4 rounded-xl bg-white border border-slate-200">
            <h4 className="text-xs font-bold text-[#0B1B4F] uppercase tracking-wider mb-3">
              Portal Menu Navigation Breadcrumbs
            </h4>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              {guide.portalMenuHierarchy.map((step, idx) => (
                <React.Fragment key={idx}>
                  <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 font-medium border border-slate-200">
                    {step}
                  </span>
                  {idx < guide.portalMenuHierarchy.length - 1 && (
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Document Upload Specs */}
          <div className="p-4 rounded-xl bg-white border border-slate-200">
            <h4 className="text-xs font-bold text-[#0B1B4F] uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-amber-600" />
              <span>Mandatory Document Upload Specifications</span>
            </h4>
            <div className="divide-y divide-slate-100">
              {guide.requiredUploadSpecs.map((spec, idx) => (
                <div key={idx} className="py-2 flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">{spec.documentName}</span>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono text-[11px]">
                      {spec.allowedFormats}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 font-mono text-[11px] border border-amber-200 font-bold">
                      {spec.maxFileSize}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Post Submission Advisory */}
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-2.5 text-xs text-emerald-900">
            <AlertCircle className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-emerald-950 font-bold">Post-Submission Action:</strong>
              <p className="mt-0.5">{guide.postSubmissionAction}</p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#0B1B4F] text-white font-bold text-xs hover:bg-[#152864] transition-colors"
          >
            Done &amp; Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
