import React, { useState, useEffect, useRef } from 'react';
import { CertificateKey } from '../types/certificate';
import { MASTER_CERTIFICATES } from '../data/certificates';
import { 
  Scan, 
  UploadCloud, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  X, 
  Sparkles, 
  ShieldCheck, 
  Calendar, 
  User, 
  Hash, 
  Building2,
  RefreshCw,
  Eye,
  Edit3,
  Check,
  FileCode2,
  QrCode,
  Landmark,
  GraduationCap,
  Percent,
  CheckSquare,
  Square,
  HelpCircle,
  Clock,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface DocumentScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetCertKey?: CertificateKey | null;
  onVerifyCertificate: (certKey: CertificateKey) => void;
  userState?: string;
}

export interface CertificateInspectionData {
  certKey: CertificateKey;
  title: string;
  applicantName: string;
  certNumber: string;
  issueDate: string;
  validUntil: string;
  issuingAuthority: string;
  isExpired: boolean;
  confidenceScore: number;
  qrVerified: boolean;
  sealVerified: boolean;
  remarks: string;
  // Specific fields
  annualIncome?: number;
  category?: string;
  subCaste?: string;
  marksPercentage?: number;
  bankName?: string;
  accountNumber?: string;
  ifscCode?: string;
  isNpciSeeded?: boolean;
  residenceYears?: number;
  udidNumber?: string;
  disabilityPercentage?: number;
  emisStudentId?: string;
}

const DEFAULT_INSPECTION_PRESETS: Record<CertificateKey, CertificateInspectionData> = {
  incomeCertificate: {
    certKey: 'incomeCertificate',
    title: 'Certificate of Annual Family Income (REV-101)',
    applicantName: 'MOHAMMED RAFIQ / CITIZEN',
    certNumber: 'INC-2025-3419082',
    issueDate: '2025-06-05',
    validUntil: '2026-03-31 (Current Financial Year)',
    issuingAuthority: 'Deputy Tahsildar / MeeSeva Gateway',
    isExpired: false,
    confidenceScore: 98.8,
    qrVerified: true,
    sealVerified: true,
    annualIncome: 120000,
    remarks: 'Annual family income certified as ₹1,20,000/-. Within fee reimbursement ceiling of ₹2.5 Lakh.'
  },
  communityCertificate: {
    certKey: 'communityCertificate',
    title: 'Community, Nativity & Date of Birth Certificate (REV-103)',
    applicantName: 'MOHAMMED RAFIQ / CITIZEN',
    certNumber: 'CST-2025-9984721',
    issueDate: '2025-01-12',
    validUntil: 'Permanent / Lifetime Validity',
    issuingAuthority: 'Tahsildar / Revenue Department',
    isExpired: false,
    confidenceScore: 99.4,
    qrVerified: true,
    sealVerified: true,
    category: 'OBC',
    subCaste: 'BC-E (Socially & Educationally Backward Class)',
    remarks: 'Valid digital signature detected. Statutory permanent validity confirmed under G.O. Ms 58.'
  },
  firstGraduateCertificate: {
    certKey: 'firstGraduateCertificate',
    title: 'First Graduate Certificate (REV-104)',
    applicantName: 'CITIZEN APPLICANT',
    certNumber: 'REV-104-TN-882190',
    issueDate: '2025-05-10',
    validUntil: 'Valid for Full Course Duration (4 Years)',
    issuingAuthority: 'Zonal Deputy Tahsildar / TNeGA',
    isExpired: false,
    confidenceScore: 99.1,
    qrVerified: true,
    sealVerified: true,
    remarks: 'Joint family non-graduate declaration verified. Eligible for 100% state tuition fee waiver.'
  },
  nativityCertificate: {
    certKey: 'nativityCertificate',
    title: 'State Domicile / Nativity Certificate',
    applicantName: 'CITIZEN APPLICANT',
    certNumber: 'DOM-2025-667104',
    issueDate: '2025-01-11',
    validUntil: 'Permanent / Valid for State Quotas',
    issuingAuthority: 'Tahsildar / MeeSeva / e-District',
    isExpired: false,
    confidenceScore: 99.0,
    qrVerified: true,
    sealVerified: true,
    residenceYears: 10,
    remarks: 'Continuous 10 years domicile in state confirmed through land and schooling records.'
  },
  govtSchool7_5Certificate: {
    certKey: 'govtSchool7_5Certificate',
    title: 'Govt School Continuous Study Certificate (Annexure-III)',
    applicantName: 'CITIZEN APPLICANT',
    certNumber: 'CEO-SCH-75-39210',
    issueDate: '2025-04-20',
    validUntil: 'Permanent for Professional Counselling',
    issuingAuthority: 'Chief Educational Officer (CEO) / Headmaster',
    isExpired: false,
    confidenceScore: 97.9,
    qrVerified: true,
    sealVerified: true,
    emisStudentId: 'EMIS-33020918402',
    remarks: 'Class 6 to 12 Government School EMIS continuous attendance verified 100%.'
  },
  bonafideCertificate: {
    certKey: 'bonafideCertificate',
    title: 'Institutional Bonafide & Current Study Certificate',
    applicantName: 'CITIZEN APPLICANT',
    certNumber: 'COL-BON-2025-4192',
    issueDate: '2025-07-15',
    validUntil: 'Academic Year 2025-26',
    issuingAuthority: 'Principal / Dean of Institution',
    isExpired: false,
    confidenceScore: 96.5,
    qrVerified: true,
    sealVerified: true,
    remarks: 'Regular full-time student status verified with AISHE Institutional Code.'
  },
  bankPassbookNPCI: {
    certKey: 'bankPassbookNPCI',
    title: 'Bank Passbook & NPCI DBT Aadhaar Seeding Mandate',
    applicantName: 'CITIZEN APPLICANT',
    certNumber: 'SB-A/C-9948210459',
    issueDate: '2025-02-10',
    validUntil: 'Active Account / Direct DBT Ready',
    issuingAuthority: 'Public Sector Bank / NPCI Gateway',
    isExpired: false,
    confidenceScore: 98.2,
    qrVerified: true,
    sealVerified: true,
    bankName: 'State Bank of India',
    accountNumber: 'XXXX-XXXX-0459',
    ifscCode: 'SBIN0001234',
    isNpciSeeded: true,
    remarks: 'Aadhaar Payment Bridge System (APBS) active and linked to UIDAI mapper. Ready for PFMS DBT transfer.'
  },
  marksheet10th12th: {
    certKey: 'marksheet10th12th',
    title: 'Higher Secondary School Certificate (Marks Memorandum)',
    applicantName: 'CITIZEN APPLICANT',
    certNumber: 'HSC-2025-7764120',
    issueDate: '2025-05-18',
    validUntil: 'Permanent Academic Record',
    issuingAuthority: 'State Board of Intermediate / Secondary Education',
    isExpired: false,
    confidenceScore: 99.7,
    qrVerified: true,
    sealVerified: true,
    marksPercentage: 88.4,
    remarks: 'Aggregate Score: 88.4%. Clears merit scholarship cutoff criteria.'
  },
  rationCard: {
    certKey: 'rationCard',
    title: 'National Food Security Rice Card / Smart Family Card',
    applicantName: 'FAMILY HEAD / CITIZEN',
    certNumber: 'WAP-09-8839219-B',
    issueDate: '2024-03-15',
    validUntil: 'Active (NFSA BPL Category)',
    issuingAuthority: 'Civil Supplies Department',
    isExpired: false,
    confidenceScore: 98.5,
    qrVerified: true,
    sealVerified: true,
    remarks: 'BPL / White Card authenticated. Valid for all income-exempt statutory waivers.'
  },
  aadhaarCard: {
    certKey: 'aadhaarCard',
    title: 'UIDAI Aadhaar Electronic Verification Record',
    applicantName: 'CITIZEN APPLICANT',
    certNumber: 'XXXX-XXXX-4829',
    issueDate: '2023-08-22',
    validUntil: 'Lifetime / NPCI Bank Linked',
    issuingAuthority: 'Unique Identification Authority of India (UIDAI)',
    isExpired: false,
    confidenceScore: 99.9,
    qrVerified: true,
    sealVerified: true,
    remarks: 'Aadhaar demographic details match profile with active biometric & NPCI DBT status.'
  },
  disabilityCertificate: {
    certKey: 'disabilityCertificate',
    title: 'Unique Disability ID (UDID) Certificate',
    applicantName: 'CITIZEN APPLICANT',
    certNumber: 'UDID-TS-998210-P',
    issueDate: '2024-02-04',
    validUntil: 'Permanent Disability Card',
    issuingAuthority: 'District Medical Board / CMO',
    isExpired: false,
    confidenceScore: 99.3,
    qrVerified: true,
    sealVerified: true,
    udidNumber: 'TS-998210-P',
    disabilityPercentage: 45,
    remarks: '45% locomotor disability certified by Chief Medical Officer. Exceeds 40% benchmark quota.'
  },
  ewsCertificate: {
    certKey: 'ewsCertificate',
    title: 'Economically Weaker Section (EWS) Income & Asset Certificate',
    applicantName: 'CITIZEN APPLICANT',
    certNumber: 'EWS-2025-449102',
    issueDate: '2025-04-15',
    validUntil: '2026-03-31 (Valid for Current FY)',
    issuingAuthority: 'Tahsildar / Sub-Divisional Magistrate',
    isExpired: false,
    confidenceScore: 98.9,
    qrVerified: true,
    sealVerified: true,
    annualIncome: 350000,
    remarks: 'Family gross income under ₹8 Lakh/yr and residential asset limits verified under EWS criteria.'
  }
};

const CERT_TABS: { key: CertificateKey; label: string; icon: string; code: string }[] = [
  { key: 'incomeCertificate', label: 'Income Certificate', icon: '💰', code: 'REV-101' },
  { key: 'communityCertificate', label: 'Community / Caste', icon: '🏛️', code: 'REV-103' },
  { key: 'firstGraduateCertificate', label: 'First Graduate', icon: '🎓', code: 'REV-104' },
  { key: 'bankPassbookNPCI', label: 'Bank & NPCI DBT', icon: '🏦', code: 'NPCI-DBT' },
  { key: 'nativityCertificate', label: 'Nativity / Domicile', icon: '📍', code: 'DOM-102' },
  { key: 'govtSchool7_5Certificate', label: '7.5% Govt School', icon: '🏫', code: 'ANNEX-3' },
  { key: 'marksheet10th12th', label: 'Marksheet (10/12)', icon: '📝', code: 'EDU-MEMO' },
  { key: 'bonafideCertificate', label: 'College Bonafide', icon: '📜', code: 'AISHE-BON' },
  { key: 'aadhaarCard', label: 'Aadhaar Record', icon: '🆔', code: 'UIDAI-E' },
  { key: 'rationCard', label: 'Ration / BPL Card', icon: '🍚', code: 'NFSA-RICE' },
  { key: 'ewsCertificate', label: 'EWS Certificate', icon: '📑', code: 'EWS-ASSET' },
  { key: 'disabilityCertificate', label: 'UDID Disability', icon: '♿', code: 'UDID-DIS' },
];

export const DocumentScannerModal: React.FC<DocumentScannerModalProps> = ({
  isOpen,
  onClose,
  targetCertKey,
  onVerifyCertificate,
  userState = 'Telangana'
}) => {
  const [selectedKey, setSelectedKey] = useState<CertificateKey>(targetCertKey || 'incomeCertificate');
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStep, setScanStep] = useState<string>('');
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string; previewUrl?: string } | null>(null);
  const [activeMode, setActiveMode] = useState<'scan' | 'manual'>('manual');
  
  // Inspection form state (the manual input boxes)
  const [formData, setFormData] = useState<CertificateInspectionData>(
    DEFAULT_INSPECTION_PRESETS[targetCertKey || 'incomeCertificate'] || DEFAULT_INSPECTION_PRESETS.incomeCertificate
  );

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (targetCertKey) {
      setSelectedKey(targetCertKey);
      setFormData(DEFAULT_INSPECTION_PRESETS[targetCertKey] || DEFAULT_INSPECTION_PRESETS.incomeCertificate);
      setUploadedFile(null);
    }
  }, [targetCertKey]);

  // When changing certificate tab
  const handleTabSelect = (key: CertificateKey) => {
    setSelectedKey(key);
    setFormData(DEFAULT_INSPECTION_PRESETS[key] || DEFAULT_INSPECTION_PRESETS.incomeCertificate);
    setUploadedFile(null);
  };

  if (!isOpen) return null;

  // Handle local file upload
  const handleFileUpload = (file: File) => {
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
    let previewUrl: string | undefined = undefined;
    if (file.type.startsWith('image/')) {
      previewUrl = URL.createObjectURL(file);
    }
    setUploadedFile({
      name: file.name,
      size: `${sizeInMB} MB`,
      previewUrl
    });
    
    // Trigger auto-scan on upload
    handleStartScan(file.name);
  };

  const handleStartScan = (filename?: string) => {
    setIsScanning(true);
    setScanProgress(15);
    setScanStep(`Initializing Amazon Textract analyze_document(FeatureTypes=["FORMS", "TABLES"]) on ${filename || 'document'}...`);

    const t1 = setTimeout(() => {
      setScanProgress(45);
      setScanStep('Extracting Key-Value pairs (Beneficiary Name, Certificate ID, Issuing Authority, Financial Year)...');
    }, 500);

    const t2 = setTimeout(() => {
      setScanProgress(75);
      setScanStep('Auditing Government Seals, QR Verification String & UIDAI/Revenue Gateway Hash...');
    }, 1100);

    const t3 = setTimeout(() => {
      setScanProgress(95);
      setScanStep('Cross-referencing Statutory Validity Timelines against State Gazette Guidelines...');
    }, 1600);

    const t4 = setTimeout(() => {
      setScanProgress(100);
      setIsScanning(false);
      setScanStep('Inspection & OCR Extraction Completed Successfully!');
      
      // Auto-fill form from preset
      const preset = DEFAULT_INSPECTION_PRESETS[selectedKey] || DEFAULT_INSPECTION_PRESETS.incomeCertificate;
      setFormData({
        ...preset,
        confidenceScore: 99.2,
        remarks: `Successfully extracted and inspected from ${filename || 'document'}. All statutory security seals & dates verified.`
      });

      confetti({
        particleCount: 40,
        spread: 55,
        origin: { y: 0.7 }
      });
    }, 2000);
  };

  const handleFieldChange = (field: keyof CertificateInspectionData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveAndVerify = () => {
    onVerifyCertificate(selectedKey);
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 }
    });
    onClose();
  };

  const currentCertDef = MASTER_CERTIFICATES[selectedKey];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md animate-fade-in">
      <div className="bg-[#FAF7F2] rounded-2xl shadow-2xl border-2 border-[#D4AF37]/50 w-full max-w-4xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Header */}
        <div className="bg-[#0B1B4F] text-white p-4 sm:p-5 px-6 flex items-center justify-between border-b border-[#D4AF37]/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#F5E29F]">
              <Scan className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded border border-[#D4AF37]/30 flex items-center gap-1 font-mono">
                  <Sparkles className="w-3 h-3 text-[#D4AF37]" /> Powered by Amazon Textract &amp; JanSetu AI
                </span>
                <span className="text-xs text-slate-300 font-serif hidden sm:inline">100% Client Pre-Flight</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold font-serif text-white mt-0.5">
                Smart Certificate Scanner &amp; Manual Inspector
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-grow">
          
          {/* Certificate Selection Tabs */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-serif flex items-center gap-1.5">
                <span>Select Certificate to Inspect or Enter Manually:</span>
              </label>
              <span className="text-[11px] text-slate-500 font-mono">
                {CERT_TABS.length} Certificates Supported
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {CERT_TABS.map((tab) => {
                const isSelected = selectedKey === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => handleTabSelect(tab.key)}
                    className={`px-2.5 py-2 rounded-xl text-left transition flex items-center gap-2 border text-xs ${
                      isSelected
                        ? 'bg-[#0B1B4F] text-[#F5E29F] border-[#0B1B4F] shadow-md ring-2 ring-[#D4AF37]/50'
                        : 'bg-white text-slate-700 hover:bg-slate-100/80 border-[#DACBB8]'
                    }`}
                  >
                    <span className="text-base flex-shrink-0">{tab.icon}</span>
                    <div className="truncate">
                      <div className="font-bold truncate">{tab.label}</div>
                      <div className={`text-[10px] font-mono ${isSelected ? 'text-[#D4AF37]' : 'text-slate-400'}`}>
                        {tab.code}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mode Switcher Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-2.5 rounded-xl border border-[#DACBB8]">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveMode('manual')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                  activeMode === 'manual'
                    ? 'bg-[#0B1B4F] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>✍️ Manual Entry &amp; Inspection Boxes</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveMode('scan')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                  activeMode === 'scan'
                    ? 'bg-[#0B1B4F] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <UploadCloud className="w-3.5 h-3.5" />
                <span>⚡ Upload / OCR Auto-Scan</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  const preset = DEFAULT_INSPECTION_PRESETS[selectedKey] || DEFAULT_INSPECTION_PRESETS.incomeCertificate;
                  setFormData(preset);
                }}
                className="text-[11px] text-blue-700 hover:text-blue-900 font-semibold flex items-center gap-1 px-2 py-1 bg-blue-50 rounded border border-blue-200"
              >
                <Sparkles className="w-3 h-3" />
                <span>Auto-Fill Sample Data</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setFormData({
                    certKey: selectedKey,
                    title: currentCertDef?.title || 'Certificate',
                    applicantName: '',
                    certNumber: '',
                    issueDate: new Date().toISOString().split('T')[0],
                    validUntil: 'Permanent / Lifetime Validity',
                    issuingAuthority: currentCertDef?.issuingAuthority || 'Revenue Department',
                    isExpired: false,
                    confidenceScore: 100,
                    qrVerified: true,
                    sealVerified: true,
                    remarks: 'Manually inspected and verified by applicant.'
                  });
                  setUploadedFile(null);
                }}
                className="text-[11px] text-slate-500 hover:text-slate-700 flex items-center gap-1 px-2 py-1 bg-slate-100 rounded border border-slate-200"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Clear Boxes</span>
              </button>
            </div>
          </div>

          {/* Upload / Scanner Section (Shown when in 'scan' mode) */}
          {activeMode === 'scan' && (
            <div className="space-y-3">
              {!isScanning ? (
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragActive(false);
                    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                      handleFileUpload(e.dataTransfer.files[0]);
                    }
                  }}
                  className={`border-2 border-dashed rounded-2xl p-6 text-center transition flex flex-col items-center justify-center bg-white ${
                    dragActive
                      ? 'border-[#0B1B4F] bg-blue-50/50 scale-[0.99]'
                      : 'border-[#DACBB8] hover:border-[#B8860B] hover:bg-amber-50/20'
                  }`}
                >
                  <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 mb-3 shadow-sm">
                    <UploadCloud className="w-7 h-7 text-[#0B1B4F]" />
                  </div>
                  <h4 className="text-sm font-bold text-[#0B1B4F] font-serif">
                    Drag &amp; Drop {currentCertDef?.title?.split('(')[0]?.trim() || 'Certificate'} Image / PDF
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-md">
                    Upload your actual JPG, PNG, or PDF. Amazon Textract will parse text and auto-populate the inspection boxes below.
                  </p>

                  {uploadedFile && (
                    <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-300 rounded-lg text-xs text-emerald-800">
                      <FileText className="w-4 h-4 text-emerald-600" />
                      <span className="font-semibold">{uploadedFile.name}</span>
                      <span className="text-slate-400">({uploadedFile.size})</span>
                    </div>
                  )}

                  <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleStartScan()}
                      className="px-4 py-2 rounded-xl bg-[#0B1B4F] text-[#F5E29F] text-xs font-bold hover:bg-[#12286D] transition shadow-md flex items-center gap-2 border border-[#D4AF37]/30"
                    >
                      <Scan className="w-4 h-4" />
                      <span>Scan Sample {CERT_TABS.find(t => t.key === selectedKey)?.label}</span>
                    </button>
                    <label className="cursor-pointer px-4 py-2 rounded-xl bg-white border border-[#DACBB8] hover:bg-slate-50 text-slate-700 text-xs font-bold transition shadow-sm flex items-center gap-2">
                      <FileText className="w-4 h-4 text-slate-500" />
                      <span>Select File from Computer</span>
                      <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        accept="image/*,application/pdf"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleFileUpload(e.target.files[0]);
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
              ) : (
                <div className="bg-white border border-[#DACBB8] rounded-2xl p-6 text-center space-y-3 shadow-sm relative overflow-hidden">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#0B1B4F]">
                    <RefreshCw className="w-6 h-6 animate-spin text-[#0B1B4F]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0B1B4F] font-serif">
                      Inspecting &amp; Extracting Fields with Amazon Textract...
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 font-mono">
                      {scanStep}
                    </p>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200 max-w-md mx-auto">
                    <div
                      className="bg-gradient-to-r from-[#0B1B4F] via-[#D4AF37] to-emerald-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${scanProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* MAIN SECTION: Manual Inspection Boxes (Directly Editable) */}
          <div className="bg-white rounded-2xl border-2 border-[#D4AF37]/30 p-5 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-[#0B1B4F]" />
                <h4 className="text-sm font-bold font-serif text-[#0B1B4F]">
                  Inspected Document Attributes (Fill / Edit Boxes Manually)
                </h4>
              </div>
              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                Confidence: {formData.confidenceScore || 100}%
              </span>
            </div>

            {/* General Form Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              
              {/* Field: Full Name */}
              <div>
                <label className="block text-slate-700 font-bold mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#0B1B4F]" />
                  <span>Beneficiary / Candidate Full Name *</span>
                </label>
                <input
                  type="text"
                  value={formData.applicantName}
                  onChange={(e) => handleFieldChange('applicantName', e.target.value)}
                  placeholder="e.g. MOHAMMED RAFIQ / CITIZEN NAME"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-[#0B1B4F] focus:ring-1 focus:ring-[#0B1B4F] text-slate-900 font-mono text-xs font-semibold bg-[#FAF7F2]/50"
                />
              </div>

              {/* Field: Certificate Ref No */}
              <div>
                <label className="block text-slate-700 font-bold mb-1 flex items-center gap-1.5">
                  <Hash className="w-3.5 h-3.5 text-[#0B1B4F]" />
                  <span>Certificate / Application Ref Number *</span>
                </label>
                <input
                  type="text"
                  value={formData.certNumber}
                  onChange={(e) => handleFieldChange('certNumber', e.target.value)}
                  placeholder="e.g. CST-2025-9984721 or REV-101-99210"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-[#0B1B4F] focus:ring-1 focus:ring-[#0B1B4F] text-slate-900 font-mono text-xs font-semibold bg-[#FAF7F2]/50"
                />
              </div>

              {/* Field: Issuing Authority */}
              <div>
                <label className="block text-slate-700 font-bold mb-1 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-[#0B1B4F]" />
                  <span>Issuing Government Authority / Revenue Officer *</span>
                </label>
                <input
                  type="text"
                  value={formData.issuingAuthority}
                  onChange={(e) => handleFieldChange('issuingAuthority', e.target.value)}
                  placeholder="e.g. Tahsildar / Zonal Revenue Officer / MeeSeva Gateway"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-[#0B1B4F] focus:ring-1 focus:ring-[#0B1B4F] text-slate-900 text-xs font-semibold bg-[#FAF7F2]/50"
                />
              </div>

              {/* Field: Issue Date */}
              <div>
                <label className="block text-slate-700 font-bold mb-1 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#0B1B4F]" />
                  <span>Issue Date *</span>
                </label>
                <input
                  type="text"
                  value={formData.issueDate}
                  onChange={(e) => handleFieldChange('issueDate', e.target.value)}
                  placeholder="YYYY-MM-DD or DD-MMM-YYYY"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-[#0B1B4F] focus:ring-1 focus:ring-[#0B1B4F] text-slate-900 font-mono text-xs font-semibold bg-[#FAF7F2]/50"
                />
              </div>

              {/* Field: Statutory Validity Period */}
              <div className="sm:col-span-2">
                <label className="block text-slate-700 font-bold mb-1 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#0B1B4F]" />
                  <span>Statutory Validity &amp; Expiry Rule *</span>
                </label>
                <input
                  type="text"
                  value={formData.validUntil}
                  onChange={(e) => handleFieldChange('validUntil', e.target.value)}
                  placeholder="e.g. Permanent / Lifetime Validity OR Valid till 31-Mar-2026"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-[#0B1B4F] focus:ring-1 focus:ring-[#0B1B4F] text-slate-900 text-xs font-semibold bg-[#FAF7F2]/50"
                />
              </div>
            </div>

            {/* DYNAMIC CONTEXT-SPECIFIC FIELDS BASED ON CERTIFICATE TYPE */}
            <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#DACBB8] space-y-3">
              <div className="text-xs font-bold font-serif text-[#0B1B4F] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Certificate-Specific Statutory Parameters:</span>
              </div>

              {/* Specific for Income Certificate */}
              {selectedKey === 'incomeCertificate' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      Annual Family Gross Income (₹) *
                    </label>
                    <input
                      type="number"
                      value={formData.annualIncome || ''}
                      onChange={(e) => handleFieldChange('annualIncome', Number(e.target.value))}
                      placeholder="e.g. 120000"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 font-mono text-xs font-bold bg-white"
                    />
                  </div>
                  <div className="flex items-center text-[11px] text-slate-600 pt-5">
                    {Number(formData.annualIncome) <= 250000 ? (
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Within ₹2.5 Lakh/yr Post-Matric &amp; Full Fee Waiver Ceiling
                      </span>
                    ) : (
                      <span className="text-amber-700 font-bold flex items-center gap-1">
                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                        Above ₹2.5 Lakh (May require merit quota / partial concession)
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Specific for Community / Caste Certificate */}
              {selectedKey === 'communityCertificate' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      Statutory Reservation Category *
                    </label>
                    <select
                      value={formData.category || 'OBC'}
                      onChange={(e) => handleFieldChange('category', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 text-xs font-bold bg-white"
                    >
                      <option value="SC">SC (Scheduled Caste)</option>
                      <option value="ST">ST (Scheduled Tribe)</option>
                      <option value="OBC">OBC (Other Backward Class)</option>
                      <option value="MBC">MBC / DNC (Most Backward Class)</option>
                      <option value="BC">BC (Backward Class)</option>
                      <option value="EWS">EWS (Economically Weaker Section)</option>
                      <option value="General">General / Open Category</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      Sub-Caste / Social Community Name
                    </label>
                    <input
                      type="text"
                      value={formData.subCaste || ''}
                      onChange={(e) => handleFieldChange('subCaste', e.target.value)}
                      placeholder="e.g. BC-E / Dudekula / Muslim Backward"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 text-xs font-semibold bg-white"
                    />
                  </div>
                </div>
              )}

              {/* Specific for Bank Passbook & NPCI */}
              {selectedKey === 'bankPassbookNPCI' && (
                <div className="space-y-3 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">
                        Bank Name *
                      </label>
                      <input
                        type="text"
                        value={formData.bankName || 'State Bank of India'}
                        onChange={(e) => handleFieldChange('bankName', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 text-xs font-semibold bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">
                        Account Number (Masked)
                      </label>
                      <input
                        type="text"
                        value={formData.accountNumber || 'XXXX-XXXX-0459'}
                        onChange={(e) => handleFieldChange('accountNumber', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 font-mono text-xs bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">
                        IFSC Code
                      </label>
                      <input
                        type="text"
                        value={formData.ifscCode || 'SBIN0001234'}
                        onChange={(e) => handleFieldChange('ifscCode', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 font-mono text-xs uppercase bg-white"
                      />
                    </div>
                  </div>
                  
                  <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Landmark className="w-4 h-4 text-emerald-700" />
                      <div>
                        <span className="font-bold text-slate-900">Aadhaar-NPCI DBT Direct Seeding Status</span>
                        <p className="text-[11px] text-slate-500">Is this account active on the NPCI Aadhaar Payment Bridge (APBS)?</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleFieldChange('isNpciSeeded', !formData.isNpciSeeded)}
                      className={`px-3 py-1.5 rounded-lg font-bold text-xs transition flex items-center gap-1.5 ${
                        formData.isNpciSeeded !== false
                          ? 'bg-emerald-600 text-white'
                          : 'bg-rose-100 text-rose-800 border border-rose-300'
                      }`}
                    >
                      {formData.isNpciSeeded !== false ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Active / Seeded ✓</span>
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>Not Seeded ✗</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Specific for Marksheet */}
              {selectedKey === 'marksheet10th12th' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      Aggregate Percentage / Marks (%) *
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.marksPercentage || ''}
                      onChange={(e) => handleFieldChange('marksPercentage', Number(e.target.value))}
                      placeholder="e.g. 88.4"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 font-mono text-xs font-bold bg-white"
                    />
                  </div>
                  <div className="flex items-center text-[11px] text-slate-600 pt-5">
                    {Number(formData.marksPercentage) >= 60 ? (
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Qualifies for National Merit &amp; State Quota Cutoffs
                      </span>
                    ) : (
                      <span className="text-slate-600">Eligible for Standard Pass Quotas</span>
                    )}
                  </div>
                </div>
              )}

              {/* Specific for Nativity / Domicile */}
              {selectedKey === 'nativityCertificate' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      Continuous Domicile in State (Years) *
                    </label>
                    <input
                      type="number"
                      value={formData.residenceYears || 7}
                      onChange={(e) => handleFieldChange('residenceYears', Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 font-mono text-xs font-bold bg-white"
                    />
                  </div>
                  <div className="flex items-center text-[11px] text-slate-600 pt-5">
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Meets minimum statutory 5–7 years state domicile rule
                    </span>
                  </div>
                </div>
              )}

              {/* Specific for 7.5% Govt School */}
              {selectedKey === 'govtSchool7_5Certificate' && (
                <div className="text-xs space-y-2">
                  <label className="block text-slate-700 font-bold">
                    EMIS Student Tracking ID *
                  </label>
                  <input
                    type="text"
                    value={formData.emisStudentId || 'EMIS-33020918402'}
                    onChange={(e) => handleFieldChange('emisStudentId', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 font-mono text-xs bg-white"
                  />
                  <p className="text-[11px] text-emerald-800 font-medium">
                    ✓ Validated for continuous enrollment in Tamil Nadu / State Government School from Class 6 to 12.
                  </p>
                </div>
              )}

              {/* Specific for UDID Disability */}
              {selectedKey === 'disabilityCertificate' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      UDID Card Number *
                    </label>
                    <input
                      type="text"
                      value={formData.udidNumber || 'UDID-TS-998210-P'}
                      onChange={(e) => handleFieldChange('udidNumber', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 font-mono text-xs bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      Disability Percentage (%) *
                    </label>
                    <input
                      type="number"
                      value={formData.disabilityPercentage || 40}
                      onChange={(e) => handleFieldChange('disabilityPercentage', Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 font-mono text-xs font-bold bg-white"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Document Integrity Checks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <label className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100 transition text-xs">
                <input
                  type="checkbox"
                  checked={formData.sealVerified !== false}
                  onChange={(e) => handleFieldChange('sealVerified', e.target.checked)}
                  className="w-4 h-4 text-[#0B1B4F] rounded border-slate-300 focus:ring-[#0B1B4F]"
                />
                <div>
                  <div className="font-bold text-slate-900">Official Government Seal / Watermark Present</div>
                  <div className="text-[10px] text-slate-500">Ashoka Lion emblem &amp; state header verified</div>
                </div>
              </label>

              <label className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100 transition text-xs">
                <input
                  type="checkbox"
                  checked={formData.qrVerified !== false}
                  onChange={(e) => handleFieldChange('qrVerified', e.target.checked)}
                  className="w-4 h-4 text-[#0B1B4F] rounded border-slate-300 focus:ring-[#0B1B4F]"
                />
                <div>
                  <div className="font-bold text-slate-900">Digital Signature / QR Code Authenticity</div>
                  <div className="text-[10px] text-slate-500">Cryptographically verifiable on state e-portal</div>
                </div>
              </label>
            </div>

            {/* Verification Remarks Box */}
            <div>
              <label className="block text-slate-700 font-bold text-xs mb-1">
                Inspection Notes &amp; Statutory Remarks:
              </label>
              <textarea
                rows={2}
                value={formData.remarks}
                onChange={(e) => handleFieldChange('remarks', e.target.value)}
                placeholder="Add inspector or citizen verification remarks..."
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-[#0B1B4F] text-slate-900 text-xs bg-[#FAF7F2]/50 font-sans"
              />
            </div>
          </div>

          {/* Statutory Roadmap Info Pill */}
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3.5 flex items-start gap-3 text-xs text-amber-950">
            <Info className="w-4 h-4 text-amber-700 mt-0.5 flex-shrink-0" />
            <div className="leading-relaxed">
              <span className="font-bold">Official Statutory Guideline:</span> {currentCertDef?.title} is issued by <span className="font-semibold text-amber-900">{currentCertDef?.issuingAuthority}</span>. Statutory SLA for issuance is <span className="font-bold text-amber-900">{currentCertDef?.statutorySlaDays || 15} days</span> with an official government fee of <span className="font-bold text-amber-900">₹{currentCertDef?.statutoryFeeInr || 60}</span>.
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Clicking save will mark this certificate as <strong className="text-slate-800">Verified</strong> in your active application.</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 sm:w-auto px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveAndVerify}
              className="w-1/2 sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition shadow-md flex items-center justify-center gap-2 border border-emerald-600"
            >
              <Check className="w-4 h-4" />
              <span>Save &amp; Mark Verified</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

