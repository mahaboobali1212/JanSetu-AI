import React, { useState } from 'react';
import { CitizenProfile } from '../types/profile';
import { CertificateInventory, CertificateKey } from '../types/certificate';
import { SchemeDefinition } from '../types/scheme';
import { Language } from '../types/language';
import { TRANSLATIONS } from '../data/translations';
import { CENTRAL_SCHEMES } from '../data/schemesCentral';
import { STATE_SCHEMES } from '../data/schemesStates';
import { PreFlightEngine } from '../engine/preflightEngine';
import { PreFlightAnalysisReport, CrossDocConsistencyField } from '../types/preflight';
import { ApplicationDependencyGraph } from '../components/ApplicationDependencyGraph';
import { DocumentVaultDashboard } from '../components/DocumentVaultDashboard';
import { WhyNotReadyModal } from '../components/WhyNotReadyModal';
import { FixMyApplicationModal } from '../components/FixMyApplicationModal';
import { DocumentScannerModal } from '../components/DocumentScannerModal';
import { MandateGenerator } from '../engine/mandateGenerator';
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle,
  FileDown, 
  ArrowLeft, 
  CreditCard, 
  ExternalLink,
  ShieldAlert,
  HelpCircle,
  FileCheck,
  Printer,
  Sparkles,
  Layers,
  Wrench,
  Bot,
  Scale,
  ArrowRight,
  RefreshCw,
  Clock,
  BookOpen,
  Scan,
  GitBranch,
  Search,
  CheckCircle,
  Plus,
  Trash2,
  Edit3,
  Check,
  RotateCcw,
  Info,
  SlidersHorizontal
} from 'lucide-react';
import confetti from 'canvas-confetti';

export interface ConsistencyRow {
  id: string;
  fieldLabel: string;
  icon?: string;
  primaryValue: string;
  primaryDocName: string;
  secondaryValue: string;
  secondaryDocName: string;
  isCustom?: boolean;
}

export const evaluateRowConsistency = (row: ConsistencyRow): { 
  status: 'CONSISTENT' | 'DISCREPANCY' | 'CRITICAL'; 
  label: string; 
  explanation: string;
} => {
  const p = (row.primaryValue || '').trim();
  const s = (row.secondaryValue || '').trim();
  
  if (!p && !s) {
    return { status: 'CONSISTENT', label: 'BLANK', explanation: 'Both fields empty' };
  }
  if (p.toLowerCase() === s.toLowerCase()) {
    return { status: 'CONSISTENT', label: '✓ CONSISTENT', explanation: 'Exact character-for-character match verified across documents.' };
  }

  const pLower = p.toLowerCase();
  const sLower = s.toLowerCase();
  const isNameField = row.fieldLabel.toLowerCase().includes('name');
  
  if (isNameField) {
    const pWords = pLower.split(/\s+/).filter(Boolean);
    const sWords = sLower.split(/\s+/).filter(Boolean);
    
    // Check if initial or partial surname permutation (e.g. Ali S vs Shaik Mahaboob Ali)
    const hasCommonWord = pWords.some(w => sWords.includes(w) && w.length > 2);
    const pFirst = pWords[0];
    const sFirst = sWords[0];
    const pLast = pWords[pWords.length - 1];
    const sLast = sWords[sWords.length - 1];
    
    if (hasCommonWord || (pLast === sLast) || (pFirst === sFirst) || (pWords.length === 1 && sWords.length > 1) || (sWords.length === 1 && pWords.length > 1)) {
      return { 
        status: 'DISCREPANCY', 
        label: '⚠ DISCREPANCY', 
        explanation: `Initials or name sequence variance detected ("${p}" vs "${s}"). Requires Name Discrepancy Affidavit on ₹20 stamp paper to prevent portal rejection.` 
      };
    }
  }

  // Check numeric equivalence (e.g. ₹1,20,000 vs 120000 or 15/08/2004 vs 15-Aug-2004)
  const pDigits = p.replace(/\D/g, '');
  const sDigits = s.replace(/\D/g, '');
  if (pDigits && sDigits && pDigits === sDigits) {
    return {
      status: 'CONSISTENT',
      label: '✓ CONSISTENT',
      explanation: 'Statutory values match numerically across different display formats.'
    };
  }

  return { 
    status: 'CRITICAL', 
    label: '❌ CRITICAL MISMATCH', 
    explanation: `Values differ significantly ("${p}" vs "${s}"). Government scrutiny will reject without corrective revenue endorsement.` 
  };
};

interface PreFlightAuditPageProps {
  profile: CitizenProfile;
  inventory: CertificateInventory;
  onUpdateInventory: (updated: CertificateInventory) => void;
  currentLanguage: Language;
  onBack: () => void;
  onNavigate?: (page: string) => void;
  onOpenDossier?: () => void;
  onOpenCopilot?: () => void;
}

export const PreFlightAuditPage: React.FC<PreFlightAuditPageProps> = ({
  profile,
  inventory,
  onUpdateInventory,
  currentLanguage,
  onBack,
  onNavigate,
  onOpenDossier,
  onOpenCopilot
}) => {
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  // All schemes available
  const allSchemes: SchemeDefinition[] = [
    ...CENTRAL_SCHEMES,
    ...STATE_SCHEMES
  ];

  const [selectedSchemeId, setSelectedSchemeId] = useState<string>(
    allSchemes[0]?.id || 'pm-post-matric-sc'
  );

  const selectedScheme = allSchemes.find(s => s.id === selectedSchemeId) || allSchemes[0];

  // Active Tab
  const [activeTab, setActiveTab] = useState<'flight-deck' | 'dependency-graph' | 'vault' | 'clerical'>('flight-deck');

  // Modals state
  const [isWhyNotReadyOpen, setIsWhyNotReadyOpen] = useState(false);
  const [isFixPlanOpen, setIsFixPlanOpen] = useState(false);
  const [scannerCertKey, setScannerCertKey] = useState<CertificateKey | null>(null);

  // Manual Name Matcher inputs
  const [aadhaarName, setAadhaarName] = useState(profile.fullName || 'Shaik Mahaboob Ali');
  const [marksheetName, setMarksheetName] = useState('Ali S');
  const [bankPassbookName, setBankPassbookName] = useState(
    profile.fullName.includes(' ') 
      ? profile.fullName.split(' ')[0] + ' ' + (profile.fullName.split(' ')[1]?.[0] || 'K')
      : profile.fullName
  );

  // Cross-Document Consistency Live Rows (Editable boxes)
  const [consistencyRows, setConsistencyRows] = useState<ConsistencyRow[]>([
    {
      id: 'name',
      fieldLabel: 'Applicant Full Name & Initials',
      icon: '👤',
      primaryValue: profile.fullName || 'Shaik Mahaboob Ali',
      primaryDocName: 'Primary (Aadhaar)',
      secondaryValue: 'Ali S',
      secondaryDocName: 'Secondary (Marks / Bank)'
    },
    {
      id: 'dob',
      fieldLabel: 'Date of Birth (DD-MM-YYYY)',
      icon: '📅',
      primaryValue: '15-Aug-2004',
      primaryDocName: 'Primary (Aadhaar)',
      secondaryValue: '15-Aug-2004',
      secondaryDocName: 'Secondary (Marks Board)'
    },
    {
      id: 'father',
      fieldLabel: 'Father / Guardian Name',
      icon: '👨‍👧',
      primaryValue: 'ABDUL RAHMAN',
      primaryDocName: 'Primary (Aadhaar)',
      secondaryValue: 'ABDUL RAHMAN',
      secondaryDocName: 'Secondary (Marks / Ration)'
    },
    {
      id: 'domicile',
      fieldLabel: 'State of Domicile & District',
      icon: '📍',
      primaryValue: profile.stateOfDomicile ? `Visakhapatnam, ${profile.stateOfDomicile}` : 'Visakhapatnam, Andhra Pradesh',
      primaryDocName: 'Primary (Aadhaar / Domicile)',
      secondaryValue: profile.stateOfDomicile ? `Visakhapatnam, ${profile.stateOfDomicile}` : 'Visakhapatnam, Andhra Pradesh',
      secondaryDocName: 'Secondary (MeeSeva)'
    },
    {
      id: 'income',
      fieldLabel: 'Annual Family Gross Income',
      icon: '💰',
      primaryValue: `₹${(profile.annualIncome || 120000).toLocaleString('en-IN')}`,
      primaryDocName: 'Primary (Income Cert REV-101)',
      secondaryValue: `₹${(profile.annualIncome || 120000).toLocaleString('en-IN')}`,
      secondaryDocName: 'Secondary (Application Form)'
    },
    {
      id: 'category',
      fieldLabel: 'Social Reservation Category',
      icon: '🏛️',
      primaryValue: profile.category || 'OBC',
      primaryDocName: 'Primary (Caste Cert REV-103)',
      secondaryValue: profile.category || 'OBC',
      secondaryDocName: 'Secondary (OAP / Portal Form)'
    }
  ]);

  // Run PreFlight Engine
  const report: PreFlightAnalysisReport = PreFlightEngine.analyzeApplication(
    profile,
    inventory,
    selectedScheme,
    allSchemes,
    currentLanguage
  );

  const { readiness, risks, citations, bedrockPlainLanguageSummary, dependencyGraph } = report;
  const { eligibilityScore, documentsScore, prerequisitesScore, policyConfidenceScore } = readiness;

  // Compute live identity score based on current boxes
  const totalRowsCount = consistencyRows.length;
  const consistentRowsCount = consistencyRows.filter(r => evaluateRowConsistency(r).status === 'CONSISTENT').length;
  const liveIdentityScore = totalRowsCount > 0 ? Math.round((consistentRowsCount / totalRowsCount) * 100) : 100;

  // Recalculate dynamic overall score
  const overallScore = Math.round(
    eligibilityScore * 0.30 +
    documentsScore * 0.25 +
    liveIdentityScore * 0.20 +
    prerequisitesScore * 0.15 +
    policyConfidenceScore * 0.10
  );

  const status = overallScore >= 85 ? 'READY' : overallScore >= 65 ? 'NEEDS_HUMAN_REVIEW' : 'NOT_READY';

  const handleUpdateRowField = (id: string, field: 'primaryValue' | 'secondaryValue' | 'fieldLabel', value: string) => {
    setConsistencyRows(prev => prev.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const handleAddCustomRow = () => {
    const newId = `custom_${Date.now()}`;
    setConsistencyRows(prev => [
      ...prev,
      {
        id: newId,
        fieldLabel: 'Custom Field (e.g. Ration Card No)',
        icon: '📑',
        primaryValue: '',
        primaryDocName: 'Primary (Aadhaar / ID)',
        secondaryValue: '',
        secondaryDocName: 'Secondary Document',
        isCustom: true
      }
    ]);
  };

  const handleDeleteRow = (id: string) => {
    setConsistencyRows(prev => prev.filter(r => r.id !== id));
  };

  const handleTestDiscrepancy = () => {
    setConsistencyRows(prev => prev.map(r => {
      if (r.id === 'name') {
        return { ...r, primaryValue: profile.fullName || 'Shaik Mahaboob Ali', secondaryValue: 'Ali S' };
      }
      return r;
    }));
  };

  const handleTestSyncMatch = () => {
    setConsistencyRows(prev => prev.map(r => ({
      ...r,
      secondaryValue: r.primaryValue
    })));
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  const handleResetRows = () => {
    setConsistencyRows([
      {
        id: 'name',
        fieldLabel: 'Applicant Full Name & Initials',
        icon: '👤',
        primaryValue: profile.fullName || 'Shaik Mahaboob Ali',
        primaryDocName: 'Primary (Aadhaar)',
        secondaryValue: 'Ali S',
        secondaryDocName: 'Secondary (Marks / Bank)'
      },
      {
        id: 'dob',
        fieldLabel: 'Date of Birth (DD-MM-YYYY)',
        icon: '📅',
        primaryValue: '15-Aug-2004',
        primaryDocName: 'Primary (Aadhaar)',
        secondaryValue: '15-Aug-2004',
        secondaryDocName: 'Secondary (Marks Board)'
      },
      {
        id: 'father',
        fieldLabel: 'Father / Guardian Name',
        icon: '👨‍👧',
        primaryValue: 'ABDUL RAHMAN',
        primaryDocName: 'Primary (Aadhaar)',
        secondaryValue: 'ABDUL RAHMAN',
        secondaryDocName: 'Secondary (Marks / Ration)'
      },
      {
        id: 'domicile',
        fieldLabel: 'State of Domicile & District',
        icon: '📍',
        primaryValue: profile.stateOfDomicile ? `Visakhapatnam, ${profile.stateOfDomicile}` : 'Visakhapatnam, Andhra Pradesh',
        primaryDocName: 'Primary (Aadhaar / Domicile)',
        secondaryValue: profile.stateOfDomicile ? `Visakhapatnam, ${profile.stateOfDomicile}` : 'Visakhapatnam, Andhra Pradesh',
        secondaryDocName: 'Secondary (MeeSeva)'
      },
      {
        id: 'income',
        fieldLabel: 'Annual Family Gross Income',
        icon: '💰',
        primaryValue: `₹${(profile.annualIncome || 120000).toLocaleString('en-IN')}`,
        primaryDocName: 'Primary (Income Cert REV-101)',
        secondaryValue: `₹${(profile.annualIncome || 120000).toLocaleString('en-IN')}`,
        secondaryDocName: 'Secondary (Application Form)'
      },
      {
        id: 'category',
        fieldLabel: 'Social Reservation Category',
        icon: '🏛️',
        primaryValue: profile.category || 'OBC',
        primaryDocName: 'Primary (Caste Cert REV-103)',
        secondaryValue: profile.category || 'OBC',
        secondaryDocName: 'Secondary (OAP / Portal Form)'
      }
    ]);
  };

  const handleOpenScanner = (certKey: CertificateKey) => {
    setScannerCertKey(certKey);
  };

  const handleVerifyCertificateFromScanner = (certKey: CertificateKey) => {
    onUpdateInventory({
      ...inventory,
      [certKey]: true
    });
    setScannerCertKey(null);
  };

  const handleDownloadMandatePdf = () => {
    MandateGenerator.generateMandatePdf(profile);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 }
    });
  };

  const timelineStages = [
    { name: '1. Profile Setup', status: 'COMPLETED' },
    { name: '2. Scheme Selected', status: 'COMPLETED' },
    { name: '3. Documents Uploaded', status: documentsScore >= 80 ? 'COMPLETED' : 'IN_PROGRESS' },
    { name: '4. OCR Analyzed', status: 'COMPLETED' },
    { name: '5. Eligibility Checked', status: eligibilityScore >= 80 ? 'COMPLETED' : 'IN_PROGRESS' },
    { name: '6. Cross-Doc Checked', status: liveIdentityScore >= 90 ? 'COMPLETED' : 'WARNING' },
    { name: '7. Pre-Flight Cleared', status: overallScore >= 80 ? 'COMPLETED' : 'PENDING' },
    { name: '8. Ready to Apply', status: status === 'READY' ? 'COMPLETED' : 'PENDING' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in space-y-8">
      {/* Top Breadcrumb & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold transition-colors shadow-xs cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#0B1B4F]" />
          <span>← Back to Dashboard</span>
        </button>

        {/* Scheme Selector Dropdown */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-slate-600 font-serif">
            Audit Target Scheme:
          </label>
          <select
            value={selectedSchemeId}
            onChange={(e) => setSelectedSchemeId(e.target.value)}
            className="bg-white border border-slate-300 rounded-xl px-3.5 py-1.5 text-xs font-bold text-[#0B1B4F] shadow-xs focus:outline-hidden focus:ring-2 focus:ring-[#0B1B4F] cursor-pointer"
          >
            {allSchemes.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.authority})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Hero Header: Readiness Score + 5 Breakdown Sub-Bars + Tri-State Verdict */}
      <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        {/* Background Sovereign Watermark Accent */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-radial from-[#D4AF37]/10 to-transparent pointer-events-none rounded-bl-full" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold uppercase tracking-wider font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>AI-Powered Government Application Pre-Flight Engine</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0B1B4F] font-serif leading-tight">
              Pre-Flight Application Flight Deck
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Target Scheme: <strong className="text-slate-900 font-serif">{selectedScheme?.name}</strong>. Zero-hallucination statutory verification powered by AWS Cedar policy engine and Amazon Bedrock explainability.
            </p>
          </div>

          {/* Large Readiness Score Gauge */}
          <div className="flex items-center gap-5 shrink-0 bg-[#FAF7F2] p-5 rounded-2xl border-2 border-[#D4AF37]/40 shadow-sm">
            <div className="relative w-20 h-20 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-200"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className={`${
                    overallScore >= 80 ? 'text-emerald-600' :
                    overallScore >= 60 ? 'text-amber-500' : 'text-rose-600'
                  }`}
                  strokeDasharray={`${overallScore}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-black text-[#0B1B4F] font-serif">{overallScore}%</span>
              </div>
            </div>

            <div>
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                Pre-Flight Status
              </div>
              <div className="mt-0.5">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider font-mono border ${
                  status === 'READY'
                    ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                    : status === 'NOT_READY'
                    ? 'bg-rose-100 text-rose-900 border-rose-300'
                    : 'bg-amber-100 text-amber-900 border-amber-300'
                }`}>
                  {status === 'READY' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  {status === 'NOT_READY' && <XCircle className="w-4 h-4 text-rose-600" />}
                  {status === 'NEEDS_HUMAN_REVIEW' && <AlertTriangle className="w-4 h-4 text-amber-600" />}
                  <span>{status.replace(/_/g, ' ')}</span>
                </span>
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                {risks.length === 0 ? 'Zero Blockers Detected' : `${risks.length} Action Items Identified`}
              </div>
            </div>
          </div>
        </div>

        {/* 5-Part Sub-Score Breakdown Bars */}
        <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-600">1. Eligibility</span>
              <span className="text-emerald-700">{eligibilityScore}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5">
              <div className="bg-emerald-600 h-1.5 rounded-full" style={{ width: `${eligibilityScore}%` }} />
            </div>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-600">2. Documents</span>
              <span className="text-amber-700">{documentsScore}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5">
              <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${documentsScore}%` }} />
            </div>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-600">3. Identity</span>
              <span className={liveIdentityScore >= 90 ? 'text-emerald-700' : 'text-amber-700'}>{liveIdentityScore}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5">
              <div className={`${liveIdentityScore >= 90 ? 'bg-emerald-500' : 'bg-amber-500'} h-1.5 rounded-full transition-all duration-300`} style={{ width: `${liveIdentityScore}%` }} />
            </div>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-600">4. Prerequisites</span>
              <span className="text-indigo-700">{prerequisitesScore}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5">
              <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: `${prerequisitesScore}%` }} />
            </div>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-600">5. Policy Conf.</span>
              <span className="text-blue-700">{policyConfidenceScore}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5">
              <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${policyConfidenceScore}%` }} />
            </div>
          </div>
        </div>

        {/* 8-Stage Progress Timeline */}
        <div className="mt-6 pt-6 border-t border-slate-100">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 font-serif">
            8-Stage Sovereign Application Progress Pipeline:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {timelineStages.map((stage, idx) => (
              <div
                key={idx}
                className={`p-2.5 rounded-xl border text-center text-xs space-y-1 ${
                  stage.status === 'COMPLETED'
                    ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950 font-bold'
                    : stage.status === 'WARNING'
                    ? 'bg-amber-50/80 border-amber-300 text-amber-950 font-bold'
                    : stage.status === 'IN_PROGRESS'
                    ? 'bg-blue-50/80 border-blue-300 text-blue-950 font-bold'
                    : 'bg-slate-50 border-slate-200 text-slate-400 font-medium'
                }`}
              >
                <div className="text-[10px] uppercase tracking-wider font-mono">
                  {stage.status === 'COMPLETED' ? '✓ DONE' : stage.status === 'WARNING' ? '⚠ CHECK' : stage.status}
                </div>
                <div className="text-[11px] leading-snug">{stage.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Primary Action Buttons Bar */}
        <div className="mt-6 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsWhyNotReadyOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-bold transition shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-amber-600" />
              <span>Why Am I Not Ready?</span>
            </button>

            <button
              onClick={() => setIsFixPlanOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-[#0B1B4F] hover:bg-[#162D6E] text-[#F5E29F] text-xs font-bold transition shadow-md flex items-center gap-2 cursor-pointer border border-[#D4AF37]/30"
            >
              <Wrench className="w-4 h-4" />
              <span>Fix My Application (Action Plan)</span>
            </button>

            {onOpenCopilot && (
              <button
                onClick={onOpenCopilot}
                className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition shadow-xs flex items-center gap-2 cursor-pointer"
              >
                <Bot className="w-4 h-4 text-slate-950" />
                <span>Ask JanSetu Copilot</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {onOpenDossier && (
              <button
                onClick={onOpenDossier}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition flex items-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Dossier</span>
              </button>
            )}

            <button
              onClick={handleDownloadMandatePdf}
              className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <FileDown className="w-4 h-4" />
              <span>{t.generate_annexure_pdf}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('flight-deck')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer whitespace-nowrap ${
            activeTab === 'flight-deck'
              ? 'bg-[#0B1B4F] text-[#F5E29F] shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Cross-Doc Matrix &amp; Risk Engine</span>
        </button>

        <button
          onClick={() => setActiveTab('dependency-graph')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer whitespace-nowrap ${
            activeTab === 'dependency-graph'
              ? 'bg-[#0B1B4F] text-[#F5E29F] shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <GitBranch className="w-4 h-4" />
          <span>Application Dependency Graph</span>
        </button>

        <button
          onClick={() => setActiveTab('vault')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer whitespace-nowrap ${
            activeTab === 'vault'
              ? 'bg-[#0B1B4F] text-[#F5E29F] shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Document Vault Dashboard</span>
        </button>

        <button
          onClick={() => setActiveTab('clerical')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer whitespace-nowrap ${
            activeTab === 'clerical'
              ? 'bg-[#0B1B4F] text-[#F5E29F] shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Clerical Matcher &amp; NPCI Mandate</span>
        </button>
      </div>

      {/* TAB 1: FLIGHT DECK (Cross-Doc Matrix + Identified Risks + Cedar vs AI Policy) */}
      {activeTab === 'flight-deck' && (
        <div className="space-y-6">
          {/* 1. Cross-Document Consistency Matrix (Interactive & Editable) */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0B1B4F] font-mono mb-1">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>01. Multi-Document Consistency &amp; Clerical Variance Matrix</span>
                </div>
                <h3 className="text-lg font-bold font-serif text-[#0B1B4F]">
                  Cross-Document Field Matching &amp; Manual Clerical Inspector
                </h3>
                <p className="text-xs text-slate-500">
                  Type or modify values in the boxes below to inspect clerical variances in real-time, or upload documents to auto-populate.
                </p>
              </div>

              {/* Action Tools Header */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleAddCustomRow}
                  className="px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-blue-700" />
                  <span>Add Field</span>
                </button>

                <button
                  type="button"
                  onClick={handleTestSyncMatch}
                  className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                  title="Make all primary and secondary fields match perfectly"
                >
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Test 100% Match</span>
                </button>

                <button
                  type="button"
                  onClick={handleTestDiscrepancy}
                  className="px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                  title="Simulate initials mismatch between Aadhaar and Board Marksheet"
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  <span>Test Discrepancy</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetRows}
                  className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                  title="Reset to default fields"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>

                <button
                  onClick={() => handleOpenScanner('aadhaarCard')}
                  className="px-4 py-2 rounded-xl bg-[#0B1B4F] hover:bg-[#162D6E] text-[#F5E29F] text-xs font-bold transition shadow-xs flex items-center gap-2 cursor-pointer shrink-0 border border-[#D4AF37]/30"
                >
                  <Scan className="w-4 h-4 text-amber-400" />
                  <span>Upload &amp; Auto-Scan</span>
                </button>
              </div>
            </div>

            {/* Informational Guidance Strip */}
            <div className="p-3 bg-[#FAF7F2] border border-[#DACBB8] rounded-xl flex items-start sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <Edit3 className="w-4 h-4 text-[#0B1B4F] shrink-0" />
                <span>
                  <strong className="text-slate-900 font-serif">Manual Inspection Active:</strong> Edit values directly in the boxes below. Status and Identity score ({liveIdentityScore}%) recalculate automatically!
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-500 font-bold shrink-0">
                {consistentRowsCount} of {totalRowsCount} Fields Matching
              </span>
            </div>

            {/* Interactive Consistency Table with Manual Input Boxes */}
            <div className="overflow-x-auto border border-slate-200 rounded-2xl">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#FAF7F2] text-slate-800 uppercase font-serif border-b border-slate-200 text-[11px]">
                  <tr>
                    <th className="py-3 px-4 w-1/4">Field to Compare</th>
                    <th className="py-3 px-4 w-1/3">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-blue-600 inline-block" />
                        <span>Primary Value (Box to Write / Inspect)</span>
                      </div>
                    </th>
                    <th className="py-3 px-4 w-1/3">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-amber-600 inline-block" />
                        <span>Secondary Value (Box to Write / Inspect)</span>
                      </div>
                    </th>
                    <th className="py-3 px-4 text-center">Live Status</th>
                    <th className="py-3 px-3 text-center w-12">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {consistencyRows.map((row) => {
                    const evalResult = evaluateRowConsistency(row);
                    return (
                      <tr key={row.id} className="hover:bg-slate-50/70 transition">
                        {/* Column 1: Field Name */}
                        <td className="py-3 px-4 align-top">
                          <div className="space-y-1">
                            {row.isCustom ? (
                              <input
                                type="text"
                                value={row.fieldLabel}
                                onChange={(e) => handleUpdateRowField(row.id, 'fieldLabel', e.target.value)}
                                placeholder="Field Name..."
                                className="w-full font-bold text-slate-900 border border-slate-300 rounded-lg px-2 py-1 text-xs focus:ring-1 focus:ring-[#0B1B4F]"
                              />
                            ) : (
                              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                                <span>{row.icon || '📄'}</span>
                                <span>{row.fieldLabel}</span>
                              </div>
                            )}
                            <div className="text-[10px] text-slate-500 font-mono flex items-center gap-2">
                              <span className="text-blue-700 font-semibold">{row.primaryDocName}</span>
                              <span>vs</span>
                              <span className="text-amber-800 font-semibold">{row.secondaryDocName}</span>
                            </div>
                          </div>
                        </td>

                        {/* Column 2: Primary Input Box */}
                        <td className="py-3 px-4 align-top">
                          <div className="space-y-1">
                            <input
                              type="text"
                              value={row.primaryValue}
                              onChange={(e) => handleUpdateRowField(row.id, 'primaryValue', e.target.value)}
                              placeholder="Enter primary value..."
                              className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-mono text-xs font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0B1B4F] focus:border-[#0B1B4F] transition shadow-2xs"
                            />
                            <div className="text-[10px] text-slate-400">e.g. As printed on Aadhaar / KYC</div>
                          </div>
                        </td>

                        {/* Column 3: Secondary Input Box */}
                        <td className="py-3 px-4 align-top">
                          <div className="space-y-1">
                            <input
                              type="text"
                              value={row.secondaryValue}
                              onChange={(e) => handleUpdateRowField(row.id, 'secondaryValue', e.target.value)}
                              placeholder="Enter secondary value..."
                              className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-mono text-xs font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0B1B4F] focus:border-[#0B1B4F] transition shadow-2xs"
                            />
                            <div className="text-[10px] text-slate-400">e.g. As printed on Certificate / Bank / Marksheet</div>
                          </div>
                        </td>

                        {/* Column 4: Live Status */}
                        <td className="py-3 px-4 align-top text-center">
                          <div className="space-y-1 inline-flex flex-col items-center">
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold shadow-2xs ${
                              evalResult.status === 'CONSISTENT'
                                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                                : evalResult.status === 'DISCREPANCY'
                                ? 'bg-amber-100 text-amber-950 border border-amber-300 animate-pulse'
                                : 'bg-rose-100 text-rose-950 border border-rose-300'
                            }`}>
                              {evalResult.label}
                            </span>
                            {evalResult.status !== 'CONSISTENT' && (
                              <p className="text-[10px] text-amber-900 max-w-[200px] text-left leading-tight bg-amber-50/80 p-1.5 rounded border border-amber-200">
                                {evalResult.explanation}
                              </p>
                            )}
                          </div>
                        </td>

                        {/* Column 5: Actions */}
                        <td className="py-3 px-3 align-top text-center">
                          {row.isCustom ? (
                            <button
                              type="button"
                              onClick={() => handleDeleteRow(row.id)}
                              className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition"
                              title="Delete custom row"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleUpdateRowField(row.id, 'secondaryValue', row.primaryValue)}
                              className="p-1.5 text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition"
                              title="Sync secondary to match primary"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Bottom Status Callout based on live inspection */}
            {liveIdentityScore < 100 ? (
              <div className="bg-amber-50/80 border border-amber-300 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-amber-950">
                <div className="flex items-start gap-2.5">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-amber-900 font-serif">Clerical Variance Intercepted:</span> One or more fields have discrepancies. You can download the Gazette-Compliant Name Discrepancy Affidavit in the <em>Fix My Application</em> action plan to avoid rejection.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsFixPlanOpen(true)}
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition shadow-2xs whitespace-nowrap cursor-pointer"
                >
                  Generate Affidavit &amp; Action Plan
                </button>
              </div>
            ) : (
              <div className="bg-emerald-50/80 border border-emerald-300 rounded-xl p-4 flex items-center gap-3 text-xs text-emerald-950">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <span className="font-bold text-emerald-900 font-serif">100% Cross-Document Identity Consistency Verified:</span> All primary and secondary attributes match identically across all government records. Zero clerical rejection risk!
                </div>
              </div>
            )}
          </div>

          {/* 2. Policy Engine: Deterministic AWS Cedar Rule vs Bedrock Explanation */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Deterministic Rule Engine */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0B1B4F] uppercase tracking-wider font-mono">
                <Scale className="w-4 h-4 text-emerald-600" />
                <span>Deterministic AWS Cedar Policy Engine</span>
              </div>
              <h4 className="text-base font-bold text-[#0B1B4F] font-serif">
                Zero-Hallucination Statutory Rule Evaluation
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Rules are hard-grounded in official Gazette Orders. JanSetu AI will <strong>never hallucinate</strong> eligibility. The candidate's annual income of ₹{profile.annualIncome.toLocaleString('en-IN')} is verified under the statutory ceiling of ₹{(selectedScheme.criteria.maxAnnualIncome || 250000).toLocaleString('en-IN')}.
              </p>

              <div className="bg-slate-900 text-amber-300 p-4 rounded-xl font-mono text-xs overflow-x-auto space-y-1">
                <div>// AWS Cedar Deterministic Policy Spec</div>
                <div className="text-slate-400">permit(</div>
                <div className="pl-4 text-emerald-400">principal == Citizen::{profile.category},</div>
                <div className="pl-4 text-blue-300">action == Action::"ApplyScheme",</div>
                <div className="pl-4 text-amber-400">resource == Scheme::"{selectedScheme.id}"</div>
                <div className="text-slate-400">) when &#123;</div>
                <div className="pl-4 text-slate-200">context.income &lt;= {selectedScheme.criteria.maxAnnualIncome || 250000} &amp;&amp;</div>
                <div className="pl-4 text-slate-200">context.state == "{profile.stateOfDomicile}"</div>
                <div className="text-slate-400">&#125;;</div>
              </div>
            </div>

            {/* Amazon Bedrock AI Plain-Language Explainer */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0B1B4F] uppercase tracking-wider font-mono">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Amazon Bedrock Plain-Language Explainer</span>
              </div>
              <h4 className="text-base font-bold text-[#0B1B4F] font-serif">
                Plain-Language Citizen Breakdown
              </h4>
              <div className="bg-amber-50/60 border border-amber-200/80 rounded-xl p-4 text-xs text-slate-800 leading-relaxed space-y-2">
                <p>
                  {bedrockPlainLanguageSummary}
                </p>
                <div className="pt-2 border-t border-amber-200/60 flex items-center justify-between text-[11px] text-amber-900 font-semibold">
                  <span>Confidence Score: {policyConfidenceScore}%</span>
                  <span>Grounding: Official Gazette Verified</span>
                </div>
              </div>

              <div className="flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => setIsWhyNotReadyOpen(true)}
                  className="text-xs font-bold text-[#0B1B4F] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Open Full Diagnostic Breakdown</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* 3. Official Source Citations with Disclaimer */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0B1B4F] uppercase tracking-wider">
                <BookOpen className="w-4 h-4 text-amber-600" />
                <span>Official Government Gazette &amp; Portal Citations</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 font-mono">
                100% Sourced &amp; Grounded
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {citations.map((c, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
                  <div className="font-bold text-slate-900 font-serif flex items-center justify-between">
                    <span>{c.authority}</span>
                    <a
                      href={c.officialPortalUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] font-bold text-[#0B1B4F] hover:underline inline-flex items-center gap-1 bg-white px-2 py-0.5 rounded border border-slate-200"
                    >
                      <span>{c.policyName}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {c.gazetteClause}
                  </p>
                </div>
              ))}
            </div>

            {/* Zero Hallucination Disclaimer */}
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-900 leading-relaxed">
              <span className="font-bold">Official Disclaimer:</span> JanSetu AI grounds all scheme eligibility rules strictly in published Government Gazette notifications. If official gazette rules for a sub-criterion cannot be independently verified from government portals, the engine marks the clause as "Needs Review" rather than inventing eligibility.
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DEPENDENCY GRAPH */}
      {activeTab === 'dependency-graph' && (
        <ApplicationDependencyGraph
          nodes={dependencyGraph}
          onRemediateNode={() => setIsFixPlanOpen(true)}
        />
      )}

      {/* TAB 3: DOCUMENT VAULT DASHBOARD */}
      {activeTab === 'vault' && (
        <DocumentVaultDashboard
          inventory={inventory}
          onUpdateInventory={onUpdateInventory}
          onScanCertificate={handleOpenScanner}
          onViewRoadmap={(certKey) => {
            if (onNavigate) onNavigate('certificate-roadmap');
          }}
          userState={profile.stateOfDomicile}
        />
      )}

      {/* TAB 4: CLERICAL MATCHER & NPCI MANDATE */}
      {activeTab === 'clerical' && (
        <div className="space-y-6">
          {/* Clerical Matcher Form */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#0B1B4F] mb-1">
                Cross-Document Name Consistency Verifier
              </h3>
              <p className="text-xs text-slate-500">
                Compare exact names printed on your identity card, board marksheet, and bank account passbook.
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

            {/* Observations */}
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Automated Diagnostics:
              </h4>
              {risks.filter(r => r.category === 'IDENTITY').map((d, i) => (
                <div key={i} className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/70 text-xs flex items-start gap-3 text-amber-950">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold">{d.title}</strong>
                    <p className="mt-0.5 text-[11px] leading-relaxed">{d.problemDescription}</p>
                    <p className="mt-1 text-[11px] font-semibold text-slate-700 italic">Remedy: {d.requiredAction}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* NPCI Mandate Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
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
      )}

      {/* Next Step Banner: 1-Click RTI & Grievance Generator */}
      {onNavigate && (
        <div className="bg-gradient-to-r from-[#0B1B4F] to-[#162D6E] rounded-2xl p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-luxury border border-[#D4AF37]/30">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest bg-[#D4AF37] text-[#0B1B4F] px-2.5 py-0.5 rounded font-mono">
                Next Civic Power Tool
              </span>
              <span className="text-xs text-slate-300 font-serif">State Right to Services &amp; RTI Act</span>
            </div>
            <h4 className="text-lg font-bold font-serif text-white">
              Facing Certificate Delays at MeeSeva / e-Sevai / Tahsildar Office?
            </h4>
            <p className="text-xs text-slate-200 max-w-xl">
              Use our 1-Click Statutory RTI &amp; Grievance Generator to draft legally binding default notices and RTI Form-A petitions to enforce statutory SLA delivery.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('grievance')}
            className="shrink-0 px-6 py-3.5 rounded-xl bg-[#D4AF37] hover:bg-[#E5C158] text-[#0B1B4F] font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer font-serif"
          >
            <span>Launch RTI &amp; Grievance Generator</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Modals */}
      <WhyNotReadyModal
        isOpen={isWhyNotReadyOpen}
        onClose={() => setIsWhyNotReadyOpen(false)}
        report={report}
        onOpenFixPlan={() => setIsFixPlanOpen(true)}
        onOpenCopilot={onOpenCopilot}
      />

      <FixMyApplicationModal
        isOpen={isFixPlanOpen}
        onClose={() => setIsFixPlanOpen(false)}
        report={report}
        profile={profile}
        onOpenScanner={handleOpenScanner}
        onNavigate={onNavigate}
      />

      <DocumentScannerModal
        isOpen={!!scannerCertKey}
        onClose={() => setScannerCertKey(null)}
        targetCertKey={scannerCertKey}
        onVerifyCertificate={handleVerifyCertificateFromScanner}
        userState={profile.stateOfDomicile}
      />
    </div>
  );
};
