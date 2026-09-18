import React, { useState } from 'react';
import { CertificateInventory, CertificateKey } from '../types/certificate';
import { MASTER_CERTIFICATES } from '../data/certificates';
import { getStateAwareCertificateInfo } from '../data/stateCertificatePortals';
import { Language } from '../types/language';
import { TRANSLATIONS } from '../data/translations';
import { 
  FileCheck2, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  ArrowRight, 
  ArrowLeft, 
  ShieldAlert, 
  Building, 
  Clock, 
  Coins, 
  ShieldCheck,
  FileText,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Filter,
  Check,
  Info,
  MapPin,
  HelpCircle,
  Globe,
  Scan
} from 'lucide-react';
import { DocumentScannerModal } from '../components/DocumentScannerModal';

interface InventoryPageProps {
  inventory: CertificateInventory;
  onUpdateInventory: (inventory: CertificateInventory) => void;
  onCalculate: () => void;
  onBack: () => void;
  currentLanguage: Language;
  onViewRoadmap: (certKey: CertificateKey) => void;
  userState?: string;
}

// Friendly, Known Names & Plain-Language Explanations for Everyday Citizens
const FRIENDLY_CERT_DETAILS: Record<CertificateKey, {
  friendlyName: string;
  nativeTamil: string;
  nativeHindi: string;
  nativeTelugu: string;
  nativeMalayalam: string;
  whatItIs: string;
  whyNeeded: string;
  whereToGet: string;
  slaDays: number;
  officialFee: number;
  icon: string;
  badgeCode: string;
  isHighPriority: boolean;
}> = {
  incomeCertificate: {
    friendlyName: 'Annual Family Income Certificate',
    nativeTamil: 'வருமானச் சான்றிதழ்',
    nativeHindi: 'पारिवारिक आय प्रमाण पत्र',
    nativeTelugu: 'కుటుంబ వార్షిక ఆదాయ ధ్రువీకరణ పత్రం',
    nativeMalayalam: 'വരുമാന സർട്ടിഫിക്കറ്റ്',
    whatItIs: 'An official government certificate issued by the Revenue Department confirming the total annual earnings of all family members combined.',
    whyNeeded: 'Mandatory proof to qualify for scholarships with family income ceilings (< ₹2.5 Lakh or ₹8 Lakh/yr).',
    whereToGet: 'State e-District / TNeGA e-Sevai / MeeSeva Portal or your local Taluk / Tehsil Revenue Office.',
    slaDays: 8,
    officialFee: 60,
    icon: '💰',
    badgeCode: 'REV-101',
    isHighPriority: true
  },
  communityCertificate: {
    friendlyName: 'Community / Caste Certificate',
    nativeTamil: 'சாதிச் சான்றிதழ்',
    nativeHindi: 'जाति / सामाजिक श्रेणी प्रमाण पत्र',
    nativeTelugu: 'కులం / సామాజిక వర్గ ధ్రువీకరణ పత్రం',
    nativeMalayalam: 'ജാതി സർട്ടിഫിക്കറ്റ്',
    whatItIs: 'A permanent statutory document validating your social category (SC, ST, OBC, MBC, BC, or EWS).',
    whyNeeded: 'Required to claim fee reimbursements, post-matric grants, and reserved scholarship quotas.',
    whereToGet: 'e-Sevai / MeeSeva Center or Tahsildar / Zonal Revenue Officer (Lifetime Validity).',
    slaDays: 15,
    officialFee: 60,
    icon: '🏛️',
    badgeCode: 'REV-103',
    isHighPriority: true
  },
  firstGraduateCertificate: {
    friendlyName: 'First Graduate Certificate (No Degree in Family)',
    nativeTamil: 'முதல் பட்டதாரி சான்றிதழ்',
    nativeHindi: 'प्रथम स्नातक प्रमाण पत्र',
    nativeTelugu: 'మొదటి పట్టభద్రుడి ధ్రువీకరణ పత్రం',
    nativeMalayalam: 'കുടുംബത്തിലെ ആദ്യ ബിരുദധാരി സർട്ടിഫിക്കറ്റ്',
    whatItIs: 'Certifies that you are the very first person in your entire family (parents and siblings) to enter higher education.',
    whyNeeded: 'Waives 100% of college tuition fees for professional & degree programs under state welfare acts.',
    whereToGet: 'TNeGA e-Sevai Center / e-District Portal with non-graduate affidavit on ₹20 stamp paper.',
    slaDays: 15,
    officialFee: 60,
    icon: '🎓',
    badgeCode: 'REV-104',
    isHighPriority: true
  },
  nativityCertificate: {
    friendlyName: 'Nativity / Residence Certificate',
    nativeTamil: 'இருப்பிடச் சான்றிதழ்',
    nativeHindi: 'मूल निवास / अधिवास प्रमाण पत्र',
    nativeTelugu: 'స్థానికత / నివాస ధ్రువీకరణ పత్రం',
    nativeMalayalam: 'സ്ഥിരതാമസ സർട്ടിഫിക്കറ്റ്',
    whatItIs: 'Proof of continuous residence within the state (minimum 5 years) established through school study or property records.',
    whyNeeded: 'Mandatory for state government scholarship schemes and state quota college counseling.',
    whereToGet: 'State e-District / MeeSeva / e-Sevai kiosk or Taluk Office.',
    slaDays: 7,
    officialFee: 60,
    icon: '📍',
    badgeCode: 'REV-102',
    isHighPriority: false
  },
  govtSchool7_5Certificate: {
    friendlyName: '7.5% Govt School Continuous Study Certificate',
    nativeTamil: '7.5% அரசுப் பள்ளி படிப்பு சான்றிதழ்',
    nativeHindi: '7.5% सरकारी स्कूल सतत अध्ययन प्रमाणपत्र',
    nativeTelugu: '7.5% ప్రభుత్వ పాఠశాల నిరంతర విద్య ధ్రువీకరణ',
    nativeMalayalam: '7.5% ഗവ. സ്കൂൾ പഠന സർട്ടിഫിക്കറ്റ്',
    whatItIs: 'Annexure-III document proving 100% continuous education from Class 6 to 12 in Government schools.',
    whyNeeded: 'Unlocks 7.5% preferential college seats & Pudhumai Penn / Moovalur monthly stipends.',
    whereToGet: 'Issued FREE by your Government School Headmaster and counter-signed by BEO/CEO.',
    slaDays: 3,
    officialFee: 0,
    icon: '🏫',
    badgeCode: 'SCH-7.5',
    isHighPriority: true
  },
  bankPassbookNPCI: {
    friendlyName: 'Aadhaar-Seeded Bank Passbook (NPCI DBT Account)',
    nativeTamil: 'ஆதார் இணைக்கப்பட்ட வங்கி புத்தகம்',
    nativeHindi: 'NPCI DBT मैप किया हुआ बैंक खाता',
    nativeTelugu: 'NPCI DBT అనుసంధాన బ్యాంక్ ఖాతా',
    nativeMalayalam: 'NPCI DBT ലിങ്ക് ചെയ്ത ബാങ്ക് അക്കൗണ്ട്',
    whatItIs: 'A bank account specifically enabled on the NPCI Aadhaar Payment Bridge for direct government fund transfers.',
    whyNeeded: 'Critical: Over 30% of scholarship grants fail at the treasury stage if NPCI DBT mapping is inactive.',
    whereToGet: 'Your Bank Branch (Submit Annexure-I Mandate Form with Aadhaar copy - Statutorily FREE).',
    slaDays: 2,
    officialFee: 0,
    icon: '🏦',
    badgeCode: 'NPCI-DBT',
    isHighPriority: true
  },
  aadhaarCard: {
    friendlyName: 'Aadhaar Card (With Active Mobile OTP)',
    nativeTamil: 'ஆதார் அட்டை (மொபைல் இணைப்பு)',
    nativeHindi: 'आधार कार्ड (सक्रिय मोबाइल लिंक)',
    nativeTelugu: 'ఆధార్ కార్డు (యాక్టివ్ మొబైల్ లింక్)',
    nativeMalayalam: 'ആധാർ കാർഡ് (മൊബൈൽ ലിങ്ക് ചെയ്തത്)',
    whatItIs: 'National 12-digit biometric identity card with your active mobile number linked for OTP logins.',
    whyNeeded: 'Required for National Scholarship Portal (NSP) One-Time Registration (OTR) and e-KYC.',
    whereToGet: 'myAadhaar UIDAI Portal or nearest Post Office / Aadhaar Seva Kendra (₹50 for updates).',
    slaDays: 5,
    officialFee: 50,
    icon: '🪪',
    badgeCode: 'UIDAI-01',
    isHighPriority: false
  },
  marksheet10th12th: {
    friendlyName: '10th & 12th Standard Board Marksheet',
    nativeTamil: '10 & 12-ஆம் வகுப்பு மதிப்பெண் சான்றிதழ்',
    nativeHindi: '10वीं एवं 12वीं अंकतालिका',
    nativeTelugu: '10వ & 12వ తరగతి మార్కుల జాబితా',
    nativeMalayalam: '10, 12 ക്ലാസ് മാർക്ക് ഷീറ്റുകൾ',
    whatItIs: 'Official examination certificate showing subject-wise marks, total percentage, and roll number.',
    whyNeeded: 'Verifies merit cutoffs (e.g., ≥50%, ≥60%, ≥80%) required for central & state scholarships.',
    whereToGet: 'DigiLocker Portal (Instant Verified Copy) or School of Last Study.',
    slaDays: 1,
    officialFee: 0,
    icon: '📜',
    badgeCode: 'EDU-MARK',
    isHighPriority: false
  },
  rationCard: {
    friendlyName: 'Smart Family Ration Card / White Rice Card',
    nativeTamil: 'ஸ்மார்ட் குடும்ப அட்டை (ரேஷன் கார்டு)',
    nativeHindi: 'स्मार्ट राशन कार्ड / खाद्य सुरक्षा कार्ड',
    nativeTelugu: 'స్మార్ట్ రేషన్ కార్డు / వైట్ రైస్ కార్డు',
    nativeMalayalam: 'സ്മാർട്ട് റേഷൻ കാർഡ്',
    whatItIs: 'Civil supplies card showing household head, all dependent family members, and BPL categorization.',
    whyNeeded: 'Proves family relationships, sibling count, and BPL/AAY poverty classification.',
    whereToGet: 'State Civil Supplies / PDS Portal or Taluk Supply Office (TSO).',
    slaDays: 15,
    officialFee: 20,
    icon: '🌾',
    badgeCode: 'PDS-SMART',
    isHighPriority: false
  },
  disabilityCertificate: {
    friendlyName: 'Disability Certificate / UDID Card (40%+ PwD)',
    nativeTamil: 'மாற்றுத்திறனாளி அடையாள அட்டை (UDID)',
    nativeHindi: 'दिव्यांगता प्रमाण पत्र / स्वावलंबन UDID',
    nativeTelugu: 'దివ్యాంగుల ధ్రువీకరణ పత్రం (UDID)',
    nativeMalayalam: 'ഭിന്നശേഷി സർട്ടിഫിക്കറ്റ് (UDID)',
    whatItIs: 'Unique Disability Identity Card issued by the District Medical Board certifying 40%+ permanent disability.',
    whyNeeded: 'Unlocks AICTE Saksham grant (₹50,000/yr), PwD fee waivers, and escort allowances.',
    whereToGet: 'Swavlamban Card Portal (swavlambancard.gov.in) or District Headquarters Hospital.',
    slaDays: 30,
    officialFee: 0,
    icon: '♿',
    badgeCode: 'UDID-PWD',
    isHighPriority: false
  },
  ewsCertificate: {
    friendlyName: 'EWS Certificate (Economically Weaker Section - General)',
    nativeTamil: 'EWS பொருளாதாரத்தில் நலிவடைந்தோர் சான்றிதழ்',
    nativeHindi: 'आर्थिक रूप से कमजोर वर्ग (EWS) प्रमाण पत्र',
    nativeTelugu: 'EWS ఆర్థికంగా వెనుకబడిన వర్గాల పత్రం',
    nativeMalayalam: 'EWS സർട്ടിഫിക്കറ്റ്',
    whatItIs: 'Income and asset certificate for General category students with family gross income < ₹8 Lakh and land limits.',
    whyNeeded: 'Grants access to 10% EWS reservation in central institutions and need-based fee remissions.',
    whereToGet: 'State e-District / CSC Center or Tahsildar / SDO Office (Valid for 1 Financial Year).',
    slaDays: 15,
    officialFee: 60,
    icon: '🛡️',
    badgeCode: 'EWS-CENTRAL',
    isHighPriority: false
  },
  bonafideCertificate: {
    friendlyName: 'Current College Bonafide Student Certificate',
    nativeTamil: 'கல்லூரி மாணவர் உண்மைத்தன்மை சான்றிதழ்',
    nativeHindi: 'कॉलेज वास्तविक छात्र प्रमाण पत्र (Bonafide)',
    nativeTelugu: 'కళాశాల బోనఫైడ్ విద్యార్థి ధ్రువీకరణ పత్రం',
    nativeMalayalam: 'കോളേജ് ബോണഫൈഡ് സർട്ടിഫിക്കറ്റ്',
    whatItIs: 'Official certificate on college letterhead confirming you are currently enrolled in a full-time regular course.',
    whyNeeded: 'Mandatory proof of college admission, AISHE institutional code, and current semester enrollment.',
    whereToGet: 'Your College Academic / Scholarship Section or Principal / Dean Office (FREE).',
    slaDays: 2,
    officialFee: 0,
    icon: '🏛️',
    badgeCode: 'INS-BON',
    isHighPriority: false
  }
};

export const InventoryPage: React.FC<InventoryPageProps> = ({
  inventory,
  onUpdateInventory,
  onCalculate,
  onBack,
  currentLanguage,
  onViewRoadmap,
  userState = 'Tamil Nadu'
}) => {
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  const [filterMode, setFilterMode] = useState<'all' | 'held' | 'missing'>('all');
  const [isScannerOpen, setIsScannerOpen] = useState<boolean>(false);
  const [scannerTargetCert, setScannerTargetCert] = useState<CertificateKey | null>(null);

  const certKeys = Object.keys(MASTER_CERTIFICATES) as CertificateKey[];
  const heldCount = certKeys.filter((k) => !!inventory[k]).length;
  const missingCount = certKeys.length - heldCount;
  const readinessPercent = Math.round((heldCount / certKeys.length) * 100);

  const toggleCertificate = (key: CertificateKey) => {
    onUpdateInventory({
      ...inventory,
      [key]: !inventory[key]
    });
  };

  const filteredKeys = certKeys.filter(key => {
    if (filterMode === 'held') return !!inventory[key];
    if (filterMode === 'missing') return !inventory[key];
    return true;
  });

  const getNativeTitle = (info: typeof FRIENDLY_CERT_DETAILS[CertificateKey]) => {
    if (currentLanguage === 'ta') return info.nativeTamil;
    if (currentLanguage === 'hi') return info.nativeHindi;
    if (currentLanguage === 'te') return info.nativeTelugu;
    if (currentLanguage === 'ml') return info.nativeMalayalam;
    return '';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in space-y-8">
      {/* 1. Sovereign Editorial Header & Readiness Meter */}
      <div className="relative rounded-3xl overflow-hidden shadow-luxury border border-[#E7DDCE] bg-white p-6 sm:p-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF0E1] border border-[#DFC8A5] text-[#854D0E] text-xs font-bold uppercase tracking-widest font-display">
                <FileCheck2 className="w-3.5 h-3.5 text-amber-700" />
                <span>Step 2 of 3: Pre-Flight Certificate Audit &amp; Roadmaps</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold font-display">
                <Globe className="w-3.5 h-3.5 text-emerald-600" />
                <span>State Portal Routing: {userState}</span>
              </div>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-[#0B1B4F] tracking-tight font-serif leading-tight">
              Certificate Audit &amp; <span className="font-cormorant italic font-normal text-amber-700">Pre-Flight Readiness.</span>
            </h2>

            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
              Tick the certificates you currently have in hand. All government links and portals are dynamically tuned to <strong>{userState}</strong>. For any document you don't have, click <strong>"How to Get (Roadmap)"</strong> to view the exact state portal, statutory fee (₹0 - ₹60), and SLA timeline.
            </p>
          </div>

          {/* Readiness Score Pill Card */}
          <div className="shrink-0 flex items-center gap-4 bg-[#FAF7F2] p-5 rounded-2xl border border-[#EDE4D8] shadow-sm">
            <div className="w-16 h-16 rounded-full border-4 border-amber-600/30 flex items-center justify-center bg-white shadow-inner">
              <span className="text-xl font-black text-[#0B1B4F] font-serif">{readinessPercent}%</span>
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-amber-800 tracking-wider">Document Readiness</div>
              <div className="text-sm font-black text-[#0B1B4F]">{heldCount} of {certKeys.length} In Possession</div>
              <div className="text-[11px] text-slate-500 font-medium">
                {missingCount > 0 ? `${missingCount} Missing Prerequisite(s)` : 'All 12 Documents Verified'}
              </div>
            </div>
          </div>
        </div>

        {/* Readiness Meter Bar */}
        <div className="mt-8 pt-6 border-t border-[#EDE6DD]">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2 font-display">
            <span>Official Document Readiness Gauge</span>
            <span className="text-[#0B1B4F]">{readinessPercent}% Ready for Portal Submission</span>
          </div>
          <div className="w-full bg-[#FAF7F2] rounded-full h-3.5 p-0.5 border border-[#DFC8A5] overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                readinessPercent >= 70
                  ? 'bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-500'
                  : readinessPercent >= 40
                  ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600'
                  : 'bg-gradient-to-r from-rose-500 via-red-500 to-amber-500'
              }`}
              style={{ width: `${readinessPercent}%` }}
            />
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#F2EDE4]">
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-xs font-bold text-slate-600 font-display">Filter List:</span>
            <div className="inline-flex rounded-xl p-1 bg-[#FAF7F2] border border-[#E7DDCE]">
              <button
                onClick={() => setFilterMode('all')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  filterMode === 'all'
                    ? 'bg-[#0B1B4F] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Documents ({certKeys.length})
              </button>
              <button
                onClick={() => setFilterMode('held')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  filterMode === 'held'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                ✓ I Have This ({heldCount})
              </button>
              <button
                onClick={() => setFilterMode('missing')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  filterMode === 'missing'
                    ? 'bg-rose-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                ⭕ Missing ({missingCount})
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <Info className="w-3.5 h-3.5 text-amber-600" />
            <span>Click any box or switch to toggle whether you have the document</span>
          </div>
        </div>

        {/* Optional AI Smart Document Scanner Banner */}
        <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-[#0B1B4F] to-[#162D6E] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md border border-[#D4AF37]/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#F5E29F] shrink-0">
              <Scan className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded border border-[#D4AF37]/30">
                  Optional AI Verifier
                </span>
                <span className="text-xs text-slate-300 font-serif">Smart Expiry & Hologram Auditor</span>
              </div>
              <p className="text-xs text-slate-200 mt-0.5">
                Have certificates on your phone or PC? Test them with our Smart Scanner to auto-verify validity dates, or simply continue manually selecting below!
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setScannerTargetCert(null);
              setIsScannerOpen(true);
            }}
            className="shrink-0 px-4 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#E5C158] text-[#0B1B4F] text-xs font-bold transition shadow-md flex items-center gap-2 cursor-pointer font-serif"
          >
            <Scan className="w-4 h-4 text-[#0B1B4F]" />
            <span>Launch Smart Document Scanner</span>
          </button>
        </div>
      </div>

      {/* 2. Side-by-Side Aesthetic 2-per-Row Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredKeys.map((key) => {
          const fallbackCert = MASTER_CERTIFICATES[key];
          const defaultInfo = FRIENDLY_CERT_DETAILS[key];
          const stateInfo = getStateAwareCertificateInfo(key, userState, currentLanguage);
          const isHeld = !!inventory[key];
          const nativeTitle = stateInfo.nativeTitle || getNativeTitle(defaultInfo);

          return (
            <div
              key={key}
              className={`rounded-3xl border transition-all duration-300 overflow-hidden flex flex-col justify-between ${
                isHeld
                  ? 'bg-white border-emerald-300 ring-2 ring-emerald-500/20 shadow-luxury'
                  : 'bg-white border-[#E7DDCE] hover:border-[#D5C2AA] shadow-sm hover:shadow-luxury'
              }`}
            >
              {/* Card Header: Icon + Friendly Name + Interactive Selection Switch */}
              <div className="p-5 sm:p-6 pb-4">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#FAF0E1] border border-[#DFC8A5] flex items-center justify-center text-2xl shadow-inner shrink-0">
                      {stateInfo.icon || defaultInfo.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#0B1B4F] text-amber-300 font-mono">
                          {stateInfo.badgeCode || defaultInfo.badgeCode}
                        </span>
                        {stateInfo.isHighPriority && !isHeld && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800 border border-rose-200">
                            High Priority
                          </span>
                        )}
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                          {userState}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-[#0B1B4F] font-serif leading-snug">
                        {stateInfo.friendlyName || defaultInfo.friendlyName}
                      </h3>
                      {nativeTitle && (
                        <div className="text-xs font-medium text-amber-900/80">
                          {nativeTitle}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Primary Selection Box (Instant Toggle Button) */}
                  <button
                    type="button"
                    onClick={() => toggleCertificate(key)}
                    className={`shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs ${
                      isHeld
                        ? 'bg-emerald-700 text-white ring-2 ring-emerald-500/40 shadow-emerald-700/20'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
                    }`}
                    title="Click to toggle document possession status"
                  >
                    <div className={`w-4 h-4 rounded-md flex items-center justify-center transition-colors ${
                      isHeld ? 'bg-white text-emerald-800' : 'border-2 border-slate-400 bg-white'
                    }`}>
                      {isHeld && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span>{isHeld ? 'I Have This' : 'I Need This'}</span>
                  </button>
                </div>

                {/* Plain-Language Explanation: What it is & Why you need it */}
                <div className="space-y-2 mt-4 text-xs">
                  <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#EDE4D8]">
                    <div className="font-bold text-[#0B1B4F] mb-0.5 font-display flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5 text-amber-700" />
                      <span>What is this &amp; Why it is needed:</span>
                    </div>
                    <p className="text-slate-700 leading-relaxed">
                      {stateInfo.whatItIs || defaultInfo.whatItIs} <span className="font-semibold text-[#0B1B4F]">{stateInfo.whyNeeded || defaultInfo.whyNeeded}</span>
                    </p>
                  </div>

                  {/* Where to get it & Official Cost with direct link */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="font-bold text-slate-900 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-amber-600" />
                        <span>Where to obtain ({userState}):</span>
                      </div>
                      {stateInfo.onlinePortalUrl && (
                        <a
                          href={stateInfo.onlinePortalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0B1B4F] hover:text-[#142A6F] underline"
                          title={`Open ${stateInfo.onlinePortalName}`}
                        >
                          <span>{stateInfo.onlinePortalName}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      <strong>Physical Center:</strong> {stateInfo.offlineOffice || defaultInfo.whereToGet}
                    </p>
                  </div>
                </div>

                {/* Official Statutory SLA & Fee Pills */}
                <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-100 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 font-semibold text-slate-600">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      <span>Govt SLA: <strong>{stateInfo.statutorySlaDays || defaultInfo.slaDays} Days</strong></span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-semibold text-emerald-800">
                      <Coins className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Official Fee: <strong>{(stateInfo.statutoryFeeInr ?? defaultInfo.officialFee) === 0 ? '₹0 (FREE)' : `₹${stateInfo.statutoryFeeInr ?? defaultInfo.officialFee}`}</strong></span>
                    </span>
                  </div>

                  <span className="text-[10px] text-slate-400 font-mono">
                    Authority: {stateInfo.issuingAuthority || fallbackCert.issuingAuthority}
                  </span>
                </div>
              </div>

              {/* Bottom Card Footer: Roadmap Button & Status Summary */}
              <div className={`px-5 py-3 border-t flex flex-wrap items-center justify-between gap-3 ${
                isHeld ? 'bg-emerald-50/50 border-emerald-200' : 'bg-[#FAF7F2] border-[#EDE4D8]'
              }`}>
                <div className="flex items-center gap-2">
                  {isHeld ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Document in Hand (Ready for Direct Submission)</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      <span>Missing Prerequisite</span>
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setScannerTargetCert(key);
                      setIsScannerOpen(true);
                    }}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-950 text-xs font-bold transition border border-slate-200 cursor-pointer"
                    title="Scan or upload photo to auto-verify"
                  >
                    <Scan className="w-3.5 h-3.5 text-amber-600" />
                    <span>Scan (AI)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onViewRoadmap(key)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-[#DFC8A5] text-[#0B1B4F] text-xs font-bold shadow-2xs transition-all cursor-pointer group"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-600 group-hover:scale-110 transition-transform" />
                    <span>How to Get (SLA Roadmap)</span>
                    <ChevronRight className="w-3.5 h-3.5 text-amber-700 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Bottom Sticky Action Navigation Bar */}
      <div className="luxury-card rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-luxury">
        <div>
          <h4 className="text-sm font-bold text-[#0B1B4F] font-serif mb-1">
            Ready to Evaluate Eligible Scholarships?
          </h4>
          <p className="text-xs text-slate-500 max-w-xl">
            Our deterministic policy engine will evaluate your {heldCount} in-hand certificates and profile against all 50+ central & state welfare policies with zero AI hallucination.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <button
            onClick={onBack}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs border border-slate-200 shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-slate-600" />
            <span>{t.back_to_profile || 'Back to Profile'}</span>
          </button>

          <button
            onClick={onCalculate}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#0B1B4F] hover:bg-[#142A6F] text-white font-bold text-sm shadow-luxury flex items-center justify-center gap-2.5 transition-all hover:shadow-luxury-lg hover:-translate-y-0.5 cursor-pointer"
          >
            <span className="font-display tracking-wide">{t.calc_button || 'Evaluate Eligible Scholarships'}</span>
            <ArrowRight className="w-4 h-4 text-[#F5E29F]" />
          </button>
        </div>
      </div>

      {/* Optional AI Document Scanner Modal */}
      <DocumentScannerModal
        isOpen={isScannerOpen}
        onClose={() => {
          setIsScannerOpen(false);
          setScannerTargetCert(null);
        }}
        targetCertKey={scannerTargetCert}
        userState={userState}
        onVerifyCertificate={(certKey) => {
          onUpdateInventory({
            ...inventory,
            [certKey]: true
          });
        }}
      />
    </div>
  );
};
