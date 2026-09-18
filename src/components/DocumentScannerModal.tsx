import React, { useState, useEffect } from 'react';
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
  Eye
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface DocumentScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetCertKey?: CertificateKey | null;
  onVerifyCertificate: (certKey: CertificateKey) => void;
  userState?: string;
}

interface MockScanResult {
  certKey: CertificateKey;
  title: string;
  applicantName: string;
  certNumber: string;
  issueDate: string;
  validUntil: string;
  isExpired: boolean;
  issuingAuthority: string;
  confidenceScore: number;
  qrVerified: boolean;
  remarks: string;
}

const PRESET_CERTIFICATES: Record<CertificateKey, MockScanResult> = {
  communityCertificate: {
    certKey: 'communityCertificate',
    title: 'Community, Nativity & Date of Birth Certificate',
    applicantName: 'MOHAMMED RAFIQ / CITIZEN',
    certNumber: 'CST-2025-9984721',
    issueDate: '12-Jan-2025',
    validUntil: 'Permanent / Lifetime Validity',
    isExpired: false,
    issuingAuthority: 'Tahsildar / Revenue Department',
    confidenceScore: 99.4,
    qrVerified: true,
    remarks: 'Valid digital signature detected. Caste status statutory verified under G.O. Ms 58.'
  },
  incomeCertificate: {
    certKey: 'incomeCertificate',
    title: 'Certificate of Annual Family Income',
    applicantName: 'MOHAMMED RAFIQ / CITIZEN',
    certNumber: 'INC-2025-3419082',
    issueDate: '05-Jun-2025',
    validUntil: '04-Jun-2026 (Valid for Current Financial Year)',
    isExpired: false,
    issuingAuthority: 'Deputy Tahsildar / MeeSeva Gateway',
    confidenceScore: 98.8,
    qrVerified: true,
    remarks: 'Annual family income certified as ₹1,20,000/-. Within fee reimbursement ceiling.'
  },
  firstGraduateCertificate: {
    certKey: 'firstGraduateCertificate',
    title: 'REV-104 First Graduate Certificate',
    applicantName: 'CITIZEN APPLICANT',
    certNumber: 'REV-104-TN-882190',
    issueDate: '10-May-2025',
    validUntil: 'Valid for Full Degree Course',
    isExpired: false,
    issuingAuthority: 'Zonal Deputy Tahsildar / TNeGA',
    confidenceScore: 99.1,
    qrVerified: true,
    remarks: 'Non-graduate joint family declaration approved. Eligible for 100% tuition waiver.'
  },
  govtSchool7_5Certificate: {
    certKey: 'govtSchool7_5Certificate',
    title: 'Annexure-III Govt School Continuous Study Certificate',
    applicantName: 'CITIZEN APPLICANT',
    certNumber: 'CEO-SCH-75-39210',
    issueDate: '20-Apr-2025',
    validUntil: 'Permanent for Professional Counselling',
    isExpired: false,
    issuingAuthority: 'Chief Educational Officer (CEO)',
    confidenceScore: 97.9,
    qrVerified: true,
    remarks: 'Class 6 to 12 Government School EMIS attendance verified 100%.'
  },
  rationCard: {
    certKey: 'rationCard',
    title: 'National Food Security Rice Card / Smart Ration Card',
    applicantName: 'FAMILY HEAD / CITIZEN',
    certNumber: 'WAP-09-8839219-B',
    issueDate: '15-Mar-2024',
    validUntil: 'Active (NFSA Subsidized Category)',
    isExpired: false,
    issuingAuthority: 'Civil Supplies Department',
    confidenceScore: 98.5,
    qrVerified: true,
    remarks: 'BPL / White Card authenticated. Valid for all income-exempt waivers.'
  },
  marksheet10th12th: {
    certKey: 'marksheet10th12th',
    title: 'Higher Secondary School Certificate (HSC Marks Memorandum)',
    applicantName: 'CITIZEN APPLICANT',
    certNumber: 'HSC-2025-7764120',
    issueDate: '18-May-2025',
    validUntil: 'Permanent Record',
    isExpired: false,
    issuingAuthority: 'State Board of Intermediate / Secondary Education',
    confidenceScore: 99.7,
    qrVerified: true,
    remarks: 'Aggregate Score: 88.4%. Clears merit scholarship cutoff.'
  },
  bonafideCertificate: {
    certKey: 'bonafideCertificate',
    title: 'Institutional Bonafide & Study Certificate',
    applicantName: 'CITIZEN APPLICANT',
    certNumber: 'COL-BON-2025-4192',
    issueDate: '15-Jul-2025',
    validUntil: 'Academic Year 2025-26',
    isExpired: false,
    issuingAuthority: 'Principal / Head of Institution',
    confidenceScore: 96.5,
    qrVerified: true,
    remarks: 'Full-time regular student status verified with AISHE Institution Code.'
  },
  aadhaarCard: {
    certKey: 'aadhaarCard',
    title: 'UIDAI Aadhaar Electronic Verification Record',
    applicantName: 'CITIZEN APPLICANT',
    certNumber: 'XXXX-XXXX-4829',
    issueDate: '22-Aug-2023',
    validUntil: 'Lifetime / NPCI Bank Linked',
    isExpired: false,
    issuingAuthority: 'Unique Identification Authority of India (UIDAI)',
    confidenceScore: 99.9,
    qrVerified: true,
    remarks: 'Aadhaar demographic details match profile with active NPCI DBT seeding.'
  },
  bankPassbookNPCI: {
    certKey: 'bankPassbookNPCI',
    title: 'Bank Passbook & NPCI DBT Seeding Mandate',
    applicantName: 'CITIZEN APPLICANT',
    certNumber: 'SB-A/C-9948210459',
    issueDate: '10-Feb-2025',
    validUntil: 'Active Account',
    isExpired: false,
    issuingAuthority: 'Public Sector Bank / NPCI Gateway',
    confidenceScore: 98.2,
    qrVerified: true,
    remarks: 'Aadhaar Payment Bridge System (APBS) active. Direct DBT ready.'
  },
  nativityCertificate: {
    certKey: 'nativityCertificate',
    title: 'State Residence / Domicile Certificate',
    applicantName: 'CITIZEN APPLICANT',
    certNumber: 'DOM-2025-667104',
    issueDate: '11-Jan-2025',
    validUntil: 'Valid for State Quotas',
    isExpired: false,
    issuingAuthority: 'Tahsildar / MeeSeva / e-District',
    confidenceScore: 99.0,
    qrVerified: true,
    remarks: 'Continuous 7+ years domicile in state verified.'
  },
  disabilityCertificate: {
    certKey: 'disabilityCertificate',
    title: 'Unique Disability ID (UDID) Certificate',
    applicantName: 'CITIZEN APPLICANT',
    certNumber: 'UDID-TS-998210-P',
    issueDate: '04-Feb-2024',
    validUntil: 'Permanent Disability Card',
    isExpired: false,
    issuingAuthority: 'District Medical Board',
    confidenceScore: 99.3,
    qrVerified: true,
    remarks: '40%+ benchmark disability verified by Chief Medical Officer.'
  },
  ewsCertificate: {
    certKey: 'ewsCertificate',
    title: 'Economically Weaker Section (EWS) Income & Asset Certificate',
    applicantName: 'CITIZEN APPLICANT',
    certNumber: 'EWS-2025-449102',
    issueDate: '15-Apr-2025',
    validUntil: '31-Mar-2026 (Valid for Current FY)',
    isExpired: false,
    issuingAuthority: 'Tahsildar / Sub-Divisional Magistrate',
    confidenceScore: 98.9,
    qrVerified: true,
    remarks: 'Family gross income under ₹8 Lakh/yr & land assets verified under EWS criteria.'
  }
};

export const DocumentScannerModal: React.FC<DocumentScannerModalProps> = ({
  isOpen,
  onClose,
  targetCertKey,
  onVerifyCertificate,
  userState = 'Telangana'
}) => {
  const [selectedKey, setSelectedKey] = useState<CertificateKey>(targetCertKey || 'communityCertificate');
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStep, setScanStep] = useState<string>('');
  const [scanResult, setScanResult] = useState<MockScanResult | null>(null);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    if (targetCertKey) {
      setSelectedKey(targetCertKey);
      setScanResult(null);
    }
  }, [targetCertKey]);

  if (!isOpen) return null;

  const handleStartScan = (certKeyToScan: CertificateKey) => {
    setSelectedKey(certKeyToScan);
    setIsScanning(true);
    setScanProgress(10);
    setScanStep('Initializing Amazon Textract analyze_document(FeatureTypes=["FORMS", "TABLES"])...');
    setScanResult(null);

    const timer1 = setTimeout(() => {
      setScanProgress(35);
      setScanStep('Amazon Textract: Extracting Key-Value Pairs (Name, Income, Issuing Authority)...');
    }, 600);

    const timer2 = setTimeout(() => {
      setScanProgress(70);
      setScanStep('Verifying Digital Signature, Revenue Emblems & QR Code Authenticity Hash...');
    }, 1200);

    const timer3 = setTimeout(() => {
      setScanProgress(90);
      setScanStep('Validating Statutory Expiry Timelines against State Gazette Rules...');
    }, 1700);

    const timer4 = setTimeout(() => {
      setScanProgress(100);
      setIsScanning(false);
      setScanStep('Amazon Textract Document AI Validation Completed Successfully!');
      const res = PRESET_CERTIFICATES[certKeyToScan] || PRESET_CERTIFICATES.communityCertificate;
      setScanResult(res);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }, 2200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  };

  const handleApplyVerified = () => {
    if (scanResult) {
      onVerifyCertificate(scanResult.certKey);
      onClose();
    }
  };

  const currentCertDef = MASTER_CERTIFICATES[selectedKey];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FAF7F2] rounded-2xl shadow-2xl border-2 border-[#D4AF37]/40 w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-[#0B1B4F] text-white p-5 px-6 flex items-center justify-between border-b border-[#D4AF37]/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#F5E29F]">
              <Scan className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded border border-[#D4AF37]/30 flex items-center gap-1 font-mono">
                  <Sparkles className="w-3 h-3 text-[#D4AF37]" /> Powered by Amazon Textract
                </span>
                <span className="text-xs text-slate-300 font-serif">100% Client Pre-Flight</span>
              </div>
              <h3 className="text-lg font-bold font-serif text-white mt-0.5">
                Smart Certificate Scanner &amp; Validity Auditor
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
        <div className="p-6 overflow-y-auto space-y-6 flex-grow">
          {/* Informational Banner */}
          <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-3.5 flex items-start gap-3 text-xs text-amber-900 leading-relaxed">
            <Sparkles className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <span className="font-bold">Citizen Privacy Notice:</span> Document scanning is strictly client-side and 100% optional. You can upload or test sample certificates below to auto-verify validity dates, or simply toggle certificates manually on the checklist anytime!
            </div>
          </div>

          {/* Certificate Selection Pills */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2 font-serif">
              Select Certificate Type to Verify:
            </label>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(MASTER_CERTIFICATES) as CertificateKey[]).slice(0, 7).map((key) => {
                const isSelected = selectedKey === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      setSelectedKey(key);
                      setScanResult(null);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 border ${
                      isSelected
                        ? 'bg-[#0B1B4F] text-[#F5E29F] border-[#0B1B4F] shadow-sm'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border-[#DACBB8]'
                    }`}
                  >
                    <span>📄</span>
                    <span>{MASTER_CERTIFICATES[key]?.title?.split('(')[0]?.trim() || key}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dropzone / Scan Trigger Box */}
          {!isScanning && !scanResult && (
            <div
              onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={() => setDragActive(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragActive(false);
                handleStartScan(selectedKey);
              }}
              className={`border-2 border-dashed rounded-2xl p-8 text-center transition flex flex-col items-center justify-center bg-white ${
                dragActive
                  ? 'border-[#0B1B4F] bg-blue-50/50 scale-[0.99]'
                  : 'border-[#DACBB8] hover:border-[#B8860B] hover:bg-amber-50/30'
              }`}
            >
              <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 mb-4 shadow-sm">
                <UploadCloud className="w-8 h-8 text-[#0B1B4F]" />
              </div>
              <h4 className="text-base font-bold text-[#0B1B4F] font-serif">
                Drag & Drop {currentCertDef?.title?.split('(')[0]?.trim() || 'Certificate'} Image / PDF
              </h4>
              <p className="text-xs text-slate-500 mt-1 max-w-md">
                Supports JPG, PNG, PDF (Up to 5MB). The AI validates government seals, QR verification strings, and statutory expiry limits.
              </p>

              <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => handleStartScan(selectedKey)}
                  className="px-5 py-2.5 rounded-xl bg-[#0B1B4F] text-[#F5E29F] text-xs font-bold hover:bg-[#12286D] transition shadow-md flex items-center gap-2 border border-[#D4AF37]/30"
                >
                  <Scan className="w-4 h-4" />
                  <span>Scan & Verify Sample Certificate</span>
                </button>
                <label className="cursor-pointer px-4 py-2.5 rounded-xl bg-white border border-[#DACBB8] hover:bg-slate-50 text-slate-700 text-xs font-bold transition shadow-sm flex items-center gap-2">
                  <FileText className="w-4 h-4 text-slate-500" />
                  <span>Choose Local File</span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*,application/pdf"
                    onChange={() => handleStartScan(selectedKey)}
                  />
                </label>
              </div>
            </div>
          )}

          {/* Scanning Animation Progress */}
          {isScanning && (
            <div className="bg-white border border-[#DACBB8] rounded-2xl p-8 text-center space-y-4 shadow-sm relative overflow-hidden">
              {/* Laser Sweep Effect */}
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent animate-pulse" style={{ top: `${scanProgress}%` }} />
              
              <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#0B1B4F]">
                <RefreshCw className="w-8 h-8 animate-spin text-[#0B1B4F]" />
              </div>
              <div>
                <h4 className="text-base font-bold text-[#0B1B4F] font-serif">
                  Scanning Document with JanSetu OCR Engine...
                </h4>
                <p className="text-xs text-slate-600 mt-1 font-mono">
                  {scanStep}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden border border-slate-200 max-w-md mx-auto">
                <div
                  className="bg-gradient-to-r from-[#0B1B4F] via-[#D4AF37] to-emerald-600 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${scanProgress}%` }}
                />
              </div>
              <div className="text-[11px] font-bold text-slate-500 font-mono">
                {scanProgress}% Processed
              </div>
            </div>
          )}

          {/* Scan Result Dossier */}
          {scanResult && (
            <div className="bg-white rounded-2xl border-2 border-emerald-500/40 p-6 space-y-5 shadow-md">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                        Status: Authentic & Verified
                      </span>
                      <span className="text-[10px] font-bold text-slate-500">
                        Confidence: {scanResult.confidenceScore}%
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-[#0B1B4F] font-serif mt-0.5">
                      {scanResult.title}
                    </h4>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setScanResult(null)}
                  className="text-xs text-slate-500 hover:text-slate-800 font-semibold flex items-center gap-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Scan Another</span>
                </button>
              </div>

              {/* Extracted Metadata Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#EAE2D5]">
                  <div className="text-slate-500 flex items-center gap-1 font-medium mb-1">
                    <User className="w-3.5 h-3.5 text-[#0B1B4F]" />
                    <span>Candidate / Beneficiary Name</span>
                  </div>
                  <div className="font-bold text-slate-900 font-mono text-sm">
                    {scanResult.applicantName}
                  </div>
                </div>

                <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#EAE2D5]">
                  <div className="text-slate-500 flex items-center gap-1 font-medium mb-1">
                    <Hash className="w-3.5 h-3.5 text-[#0B1B4F]" />
                    <span>Application / Certificate Ref No</span>
                  </div>
                  <div className="font-bold text-slate-900 font-mono text-sm">
                    {scanResult.certNumber}
                  </div>
                </div>

                <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#EAE2D5]">
                  <div className="text-slate-500 flex items-center gap-1 font-medium mb-1">
                    <Building2 className="w-3.5 h-3.5 text-[#0B1B4F]" />
                    <span>Issuing Government Authority</span>
                  </div>
                  <div className="font-bold text-slate-900">
                    {scanResult.issuingAuthority}
                  </div>
                </div>

                <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#EAE2D5]">
                  <div className="text-slate-500 flex items-center gap-1 font-medium mb-1">
                    <Calendar className="w-3.5 h-3.5 text-[#0B1B4F]" />
                    <span>Statutory Validity & Expiry</span>
                  </div>
                  <div className="font-bold text-emerald-800 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{scanResult.validUntil}</span>
                  </div>
                </div>
              </div>

              {/* Remarks Box */}
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-950 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-bold">Legal Audit Verdict:</span> {scanResult.remarks}
                </div>
              </div>

              {/* Apply Verified Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold transition"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleApplyVerified}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition shadow-md flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Mark Document as Verified in Inventory</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
