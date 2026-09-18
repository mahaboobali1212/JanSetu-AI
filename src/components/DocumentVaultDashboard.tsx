import React, { useState } from 'react';
import { CertificateInventory, CertificateKey } from '../types/certificate';
import { MASTER_CERTIFICATES } from '../data/certificates';
import { PreFlightDocument, DocumentValidationStatus } from '../types/preflight';
import { PreFlightEngine } from '../engine/preflightEngine';
import { 
  FileText, 
  ShieldCheck, 
  AlertTriangle, 
  XCircle, 
  HelpCircle, 
  Scan, 
  CheckCircle2, 
  Calendar, 
  Building2, 
  Hash, 
  User, 
  ArrowRight, 
  Sparkles,
  Search,
  Filter,
  Eye,
  RefreshCw
} from 'lucide-react';

interface DocumentVaultDashboardProps {
  inventory: CertificateInventory;
  onUpdateInventory: (updated: CertificateInventory) => void;
  onScanCertificate: (certKey: CertificateKey) => void;
  onViewRoadmap?: (certKey: CertificateKey) => void;
  userState?: string;
}

export const DocumentVaultDashboard: React.FC<DocumentVaultDashboardProps> = ({
  inventory,
  onUpdateInventory,
  onScanCertificate,
  onViewRoadmap,
  userState = 'Telangana'
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const documents: PreFlightDocument[] = PreFlightEngine.getVaultDocuments(inventory);

  const filteredDocs = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterStatus === 'ALL') return matchesSearch;
    return matchesSearch && doc.status === filterStatus;
  });

  const getStatusBadge = (status: DocumentValidationStatus) => {
    switch (status) {
      case 'VALID':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Valid ✓</span>
          </span>
        );
      case 'WARNING':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>Warning ⚠</span>
          </span>
        );
      case 'MISSING':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-900 border border-rose-300">
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
            <span>Missing ✗</span>
          </span>
        );
      case 'NEEDS_REVIEW':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-900 border border-blue-300">
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
            <span>Needs Review ?</span>
          </span>
        );
    }
  };

  const counts = {
    total: documents.length,
    valid: documents.filter(d => d.status === 'VALID').length,
    warning: documents.filter(d => d.status === 'WARNING').length,
    missing: documents.filter(d => d.status === 'MISSING').length,
    needsReview: documents.filter(d => d.status === 'NEEDS_REVIEW').length,
  };

  const handleToggleInventory = (certKey: CertificateKey) => {
    const updated = {
      ...inventory,
      [certKey]: !inventory[certKey]
    };
    onUpdateInventory(updated);
  };

  return (
    <div className="space-y-6">
      {/* Header & Metric Summary */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Unified Citizen Document Vault</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-[#0B1B4F] font-serif">
              Master Document & Certificate Inventory
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mt-1">
              Live Textract metadata, digital signature audits, statutory validity windows, and scheme prerequisites for your state ({userState}).
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5">
              <div className="text-[10px] uppercase font-bold text-slate-500">Total</div>
              <div className="text-lg font-black text-slate-900">{counts.total}</div>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5">
              <div className="text-[10px] uppercase font-bold text-emerald-700">Valid ✓</div>
              <div className="text-lg font-black text-emerald-800">{counts.valid}</div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-2.5">
              <div className="text-[10px] uppercase font-bold text-amber-700">Warning ⚠</div>
              <div className="text-lg font-black text-amber-800">{counts.warning}</div>
            </div>
            <div className="bg-rose-50 border border-rose-200 rounded-xl p-2.5">
              <div className="text-[10px] uppercase font-bold text-rose-700">Missing ✗</div>
              <div className="text-lg font-black text-rose-800">{counts.missing}</div>
            </div>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search documents or authorities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3.5 py-2 text-xs text-slate-900 font-medium focus:outline-hidden focus:ring-2 focus:ring-[#0B1B4F]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {['ALL', 'VALID', 'WARNING', 'MISSING', 'NEEDS_REVIEW'].map((status) => {
              const active = filterStatus === status;
              return (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    active
                      ? 'bg-[#0B1B4F] text-[#F5E29F] shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {status === 'ALL' ? 'All Documents' : status.replace('_', ' ')}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Document Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDocs.map((doc) => {
          const masterDef = MASTER_CERTIFICATES[doc.key];
          return (
            <div
              key={doc.key}
              className={`bg-white border rounded-2xl p-5 shadow-sm transition-all hover:shadow-md flex flex-col justify-between ${
                doc.status === 'VALID'
                  ? 'border-emerald-200'
                  : doc.status === 'WARNING'
                  ? 'border-amber-200'
                  : doc.status === 'MISSING'
                  ? 'border-rose-200 bg-rose-50/10'
                  : 'border-blue-200'
              }`}
            >
              <div>
                {/* Card Top */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      doc.status === 'VALID' ? 'bg-emerald-50 text-emerald-700' :
                      doc.status === 'WARNING' ? 'bg-amber-50 text-amber-700' :
                      doc.status === 'MISSING' ? 'bg-rose-50 text-rose-700' :
                      'bg-blue-50 text-blue-700'
                    }`}>
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#0B1B4F] font-serif leading-snug">
                        {doc.title}
                      </h4>
                      <div className="text-[11px] text-slate-500 font-medium">
                        {masterDef?.issuingAuthority || 'Revenue / Educational Department'}
                      </div>
                    </div>
                  </div>
                  {getStatusBadge(doc.status)}
                </div>

                {/* Extracted Metadata Fields */}
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 space-y-2 text-xs mb-3 font-mono">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">Statutory ID / Code:</span>
                    <span className="font-bold text-slate-800">{doc.id}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">Validity Status:</span>
                    <span className={`font-bold ${doc.isExpired ? 'text-rose-600' : 'text-emerald-700'}`}>
                      {doc.validityDescription}
                    </span>
                  </div>
                  {doc.extractedFields && (
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-500">OCR Confidence:</span>
                      <span className="font-bold text-blue-700">{doc.extractedFields.extractionConfidence}% (Textract)</span>
                    </div>
                  )}
                </div>

                {/* Audit Remarks */}
                {doc.potentialProblems.length > 0 && (
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    {doc.potentialProblems.join('. ')}
                  </p>
                )}

                {/* Schemes where used */}
                {doc.whereUsedInSchemes.length > 0 && (
                  <div className="mb-4">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                      Required by Central & State Schemes:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {doc.whereUsedInSchemes.map((schemeName, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-amber-50 border border-amber-200 text-amber-900 text-[10px] font-bold font-mono"
                        >
                          {schemeName}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => handleToggleInventory(doc.key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    inventory[doc.key]
                      ? 'bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-700 border border-slate-200'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  }`}
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>{inventory[doc.key] ? 'Mark Missing' : 'Mark Available'}</span>
                </button>

                <div className="flex items-center gap-2">
                  {onViewRoadmap && (
                    <button
                      type="button"
                      onClick={() => onViewRoadmap(doc.key)}
                      className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold transition cursor-pointer flex items-center gap-1"
                      title="View procurement SLA and Tahsil step-by-step roadmap"
                    >
                      <span>SLA Guide</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => onScanCertificate(doc.key)}
                    className="px-3.5 py-1.5 rounded-lg bg-[#0B1B4F] hover:bg-[#162D6E] text-[#F5E29F] text-xs font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Scan className="w-3.5 h-3.5" />
                    <span>Scan with OCR</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
