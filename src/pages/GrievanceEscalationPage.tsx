import React, { useState } from 'react';
import { CitizenProfile } from '../types/profile';
import { Language } from '../types/language';
import { getStateGrievanceInfo, StateGrievanceInfo } from '../data/grievanceActs';
import { MASTER_CERTIFICATES } from '../data/certificates';
import { CertificateKey } from '../types/certificate';
import { 
  ShieldAlert, 
  FileText, 
  PhoneCall, 
  Send, 
  Printer, 
  Copy, 
  Check, 
  ExternalLink, 
  Clock, 
  AlertTriangle, 
  Building, 
  Scale, 
  Sparkles,
  ArrowLeft,
  Calendar,
  Hash,
  MapPin,
  CheckCircle2
} from 'lucide-react';

interface GrievanceEscalationPageProps {
  profile: CitizenProfile;
  currentLanguage: Language;
  onBack: () => void;
}

export const GrievanceEscalationPage: React.FC<GrievanceEscalationPageProps> = ({
  profile,
  currentLanguage,
  onBack
}) => {
  const [selectedService, setSelectedService] = useState<string>('communityCertificate');
  const [customServiceName, setCustomServiceName] = useState<string>('');
  const [ackNumber, setAckNumber] = useState<string>('MS-TG-2025-998241');
  const [appliedDate, setAppliedDate] = useState<string>('2026-08-20');
  const [selectedCenter, setSelectedCenter] = useState<string>('MeeSeva / e-Sevai / CSC Center');
  const [activeFormatTab, setActiveFormatTab] = useState<'charter' | 'rti' | 'helpline'>('charter');
  const [copied, setCopied] = useState<boolean>(false);

  const stateInfo: StateGrievanceInfo = getStateGrievanceInfo(profile.stateOfDomicile);

  // Calculate elapsed days and SLA delay
  const today = new Date();
  const applied = new Date(appliedDate);
  const diffTime = Math.abs(today.getTime() - applied.getTime());
  const elapsedDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  const slaLimitDays = stateInfo.statutorySlaDays[selectedService] || 15;
  const isDelayed = elapsedDays > slaLimitDays;
  const delayDays = isDelayed ? elapsedDays - slaLimitDays : 0;

  const serviceDisplayName = selectedService === 'custom' 
    ? (customServiceName || 'Government Certificate / Scholarship') 
    : (MASTER_CERTIFICATES[selectedService as CertificateKey]?.title || selectedService);

  // Generate Citizen Charter Escalation Notice Text
  const charterNoticeText = `FORMAL NOTICE OF DEFAULT & CITIZEN CHARTER ESCALATION
Under the Provisions of the ${stateInfo.actName} (${stateInfo.actYear})

To:
The Appellate Authority / Revenue Divisional Officer (RDO)
Office of the Sub-Collector / Revenue Division
District: ${profile.district || 'State District'}, State of ${profile.stateOfDomicile}

Subject: Grievance regarding illegal delay in delivery of service "${serviceDisplayName}" beyond the statutory SLA limit of ${slaLimitDays} days.

Respected Sir/Madam,

1. I, ${profile.fullName || 'CITIZEN'}, resident of ${profile.district}, ${profile.stateOfDomicile}, had submitted a statutory application for "${serviceDisplayName}" on ${appliedDate} through ${selectedCenter}.
2. The official Application Acknowledgment / Transaction Number is: ${ackNumber}.
3. Under the statutory provisions of the ${stateInfo.actName} (${stateInfo.actYear}), the maximum prescribed time limit (SLA) for issuance/delivery of this service is ${slaLimitDays} working days.
4. As of today (${new Date().toLocaleDateString('en-IN')}), a total of ${elapsedDays} days have elapsed, resulting in an unlawful delay of ${delayDays} days beyond the legal entitlement period.
5. Due to this administrative inaction, my statutory rights to higher education scholarships, admissions, and tuition fee reimbursement are being severely prejudiced.

PRAYER:
In view of the statutory mandate, I humbly request your good office to:
a) Cause immediate issuance and delivery of the said certificate without further delay.
b) Initiate proceedings under the ${stateInfo.actName} for fixing liability and imposing statutory penalty (${stateInfo.penaltyPerDayToOfficer}) upon the defaulting officer.

Applicant Signature: ______________________
Name: ${profile.fullName || 'Citizen Applicant'}
Aadhaar Last 4: ${profile.aadhaarLast4 || '4829'}
Date: ${new Date().toLocaleDateString('en-IN')}`;

  // Generate RTI Form A Application Text
  const rtiApplicationText = `APPLICATION FOR OBTAINING INFORMATION UNDER SECTION 6(1) OF THE RIGHT TO INFORMATION ACT, 2005

To:
The Public Information Officer (PIO) / Administrative Officer
Office of the Tahsildar / Revenue Department
Mandal / Taluk Revenue Office, District: ${profile.district || 'District'}, ${profile.stateOfDomicile}

1. Full Name of Applicant: ${profile.fullName || 'Citizen Applicant'}
2. Address & District: ${profile.district || 'District'}, State of ${profile.stateOfDomicile}
3. Particulars of Information Required:
   Regarding Application Reference No: ${ackNumber} submitted on ${appliedDate} for "${serviceDisplayName}".

   Specific Information Sought under RTI Act 2005:
   a) Please provide the certified daily progress report / movement history of my application file from ${appliedDate} to date.
   b) Please provide the names, designations, and employee codes of all dealing assistants, Revenue Inspectors, and Officers with whom the file remained pending, along with the exact number of days it was kept by each officer.
   c) As per the Citizen Charter / State Right to Services Act, the prescribed time limit is ${slaLimitDays} days. Please furnish the recorded reasons for the delay of ${delayDays} days in taking a decision on this application.
   d) Please provide the certified copies of the file notings, inspection reports, and remarks entered by the verifying officers on my application.
   e) Please state the action taken by the Department against the delinquent officials for violating the statutory service delivery timeline.

4. Application Fee: ₹10/- (Affixed via Court Fee Stamp / Postal Order / Online MeeSeva Receipt).
5. I state that the information sought does not fall within any of the exemptions under Section 8 of the RTI Act 2005.

Place: ${profile.district || 'State District'}
Date: ${new Date().toLocaleDateString('en-IN')}

Signature of Applicant: ______________________`;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsApp = (text: string) => {
    const encoded = encodeURIComponent(`*JANSETU AI LEGAL GRIEVANCE DOSSIER*\n\n${text}`);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Top Navigation & Header */}
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
            <span className="text-[10px] font-bold uppercase tracking-widest bg-rose-100 text-rose-800 px-2.5 py-0.5 rounded-full border border-rose-200">
              Statutory Anti-Delay Hub
            </span>
            <span className="text-xs text-slate-500 font-serif">State Right to Services & RTI Act 2005</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#0B1B4F] mt-1">
            1-Click Citizen Grievance & Statutory RTI Generator
          </h1>
        </div>

        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-[#DACBB8] shadow-sm">
          <Scale className="w-5 h-5 text-[#B8860B]" />
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-500">Applicable State Law</div>
            <div className="text-xs font-bold text-[#0B1B4F]">{stateInfo.actName}</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Configurator (Left) & Legal Dossier (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Delay Configuration Form */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-[#DACBB8] p-6 shadow-sm space-y-5">
            <h2 className="text-base font-bold font-serif text-[#0B1B4F] flex items-center gap-2 border-b border-slate-100 pb-3">
              <Clock className="w-4 h-4 text-[#B8860B]" />
              <span>Configure Delayed Application</span>
            </h2>

            {/* Service Selection */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5 font-serif">
                Delayed Service / Certificate:
              </label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#DACBB8] rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0B1B4F]"
              >
                <option value="communityCertificate">Caste / Community Certificate (SC/ST/BC/OBC)</option>
                <option value="incomeCertificate">Annual Family Income Certificate</option>
                <option value="firstGraduateCertificate">REV-104 First Graduate Certificate</option>
                <option value="rationCard">Ration Card / Rice Card Application</option>
                <option value="nativityCertificate">Nativity / Residence Certificate</option>
                <option value="bonafideCertificate">College Bonafide & Fee Structure</option>
                <option value="custom">Other State Service / Scholarship</option>
              </select>
            </div>

            {selectedService === 'custom' && (
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1 font-serif">
                  Specify Service Name:
                </label>
                <input
                  type="text"
                  value={customServiceName}
                  onChange={(e) => setCustomServiceName(e.target.value)}
                  placeholder="e.g. Telangana ePASS Scholarship Sanction"
                  className="w-full bg-[#FAF7F2] border border-[#DACBB8] rounded-xl px-3.5 py-2 text-xs text-slate-800"
                />
              </div>
            )}

            {/* Acknowledgement Reference Number */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5 font-serif">
                MeeSeva / e-Sevai / Portal Ref No:
              </label>
              <div className="relative">
                <Hash className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={ackNumber}
                  onChange={(e) => setAckNumber(e.target.value)}
                  placeholder="e.g. MS-TG-2025-998241"
                  className="w-full bg-[#FAF7F2] border border-[#DACBB8] rounded-xl pl-9 pr-3.5 py-2 text-xs font-mono font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0B1B4F]"
                />
              </div>
            </div>

            {/* Application Date & Submission Center */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5 font-serif">
                  Date Applied:
                </label>
                <input
                  type="date"
                  value={appliedDate}
                  onChange={(e) => setAppliedDate(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#DACBB8] rounded-xl px-3 py-2 text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#0B1B4F]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5 font-serif">
                  Submission Channel:
                </label>
                <select
                  value={selectedCenter}
                  onChange={(e) => setSelectedCenter(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#DACBB8] rounded-xl px-2.5 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0B1B4F]"
                >
                  <option value="MeeSeva / e-Sevai Center">MeeSeva / e-Sevai</option>
                  <option value="Online Citizen Portal">Online Citizen Portal</option>
                  <option value="CSC / Grama Sachivalayam">CSC / Village Secretariate</option>
                  <option value="Tahsildar Revenue Office">Tahsildar Office</option>
                </select>
              </div>
            </div>

            {/* Statutory Delay Audit Summary Card */}
            <div className={`p-4 rounded-xl border ${
              isDelayed 
                ? 'bg-rose-50/80 border-rose-300 text-rose-950' 
                : 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
            }`}>
              <div className="flex items-start gap-2.5">
                {isDelayed ? (
                  <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="font-bold text-xs font-serif uppercase tracking-wide">
                    {isDelayed ? `🚨 Statutory Default: ${delayDays} Days Overdue` : 'Within Legal SLA Period'}
                  </div>
                  <div className="text-[11px] mt-1 space-y-0.5 leading-relaxed">
                    <div>• <strong>Elapsed Time:</strong> {elapsedDays} days since submission.</div>
                    <div>• <strong>Prescribed Legal SLA:</strong> {slaLimitDays} working days.</div>
                    <div>• <strong>Officer Penalty:</strong> {stateInfo.penaltyPerDayToOfficer}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Authority Helpline Box */}
          <div className="bg-[#0B1B4F] text-white rounded-2xl p-5 border border-[#D4AF37]/30 shadow-md space-y-3">
            <div className="flex items-center gap-2 text-[#F5E29F]">
              <PhoneCall className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider font-serif">
                State Nodal Grievance Line
              </span>
            </div>
            <div className="text-sm font-bold text-white">
              {stateInfo.helplineNumber}
            </div>
            <div className="text-xs text-slate-300">
              Official Redressal Portal: <span className="text-[#F5E29F] font-semibold">{stateInfo.grievancePortalName}</span>
            </div>
            <a
              href={stateInfo.grievancePortalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#F5E29F] text-xs font-bold transition border border-white/20"
            >
              <span>Launch {stateInfo.state} Grievance Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* AWS Step Functions Statutory SLA State Machine */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3 font-sans">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#0B1B4F] font-serif">
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                <span>AWS Step Functions SLA Pipeline</span>
              </div>
              <span className="text-[10px] font-mono bg-rose-50 text-rose-800 px-2 py-0.5 rounded border border-rose-200">
                Serverless State Machine
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-emerald-950">Day 0: Statutory Filing</div>
                  <div className="text-[11px] text-emerald-800">Application lodged via {selectedCenter}</div>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>

              <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-amber-950">Day 15: Intermediate Audit Notice</div>
                  <div className="text-[11px] text-amber-800">Auto-dispatches AWS SNS reminder to Tahsildar</div>
                </div>
                <Clock className="w-4 h-4 text-amber-600" />
              </div>

              <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-rose-950">Day 30: Appellate Escalation</div>
                  <div className="text-[11px] text-rose-800">Triggers Section 20 ₹250/day officer penalty timer</div>
                </div>
                <Scale className="w-4 h-4 text-rose-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Generated Legal Petitions */}
        <div className="lg:col-span-7 space-y-4">
          {/* Format Tabs */}
          <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-[#DACBB8] shadow-sm">
            <button
              onClick={() => setActiveFormatTab('charter')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                activeFormatTab === 'charter'
                  ? 'bg-[#0B1B4F] text-[#F5E29F] shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Citizen Charter Notice</span>
            </button>
            <button
              onClick={() => setActiveFormatTab('rti')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                activeFormatTab === 'rti'
                  ? 'bg-[#0B1B4F] text-[#F5E29F] shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>RTI 2005 Form-A</span>
            </button>
            <button
              onClick={() => setActiveFormatTab('helpline')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                activeFormatTab === 'helpline'
                  ? 'bg-[#0B1B4F] text-[#F5E29F] shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>CM Helpline Script</span>
            </button>
          </div>

          {/* Legal Letterhead Viewer */}
          <div className="bg-white rounded-2xl border-2 border-[#D4AF37]/40 shadow-lg p-6 sm:p-8 space-y-6">
            {/* Letterhead Header */}
            <div className="text-center border-b-2 border-slate-900 pb-4">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-widest font-serif">
                GOVERNMENT OF {profile.stateOfDomicile.toUpperCase()} • STATUTORY CITIZEN NOTICE
              </div>
              <div className="text-sm font-bold font-serif text-[#0B1B4F] mt-1">
                {activeFormatTab === 'charter' && `FORMAL DEFAULT NOTICE UNDER ${stateInfo.actName.toUpperCase()}`}
                {activeFormatTab === 'rti' && 'STATUTORY APPLICATION UNDER SECTION 6(1) OF RIGHT TO INFORMATION ACT, 2005'}
                {activeFormatTab === 'helpline' && `CM GRIEVANCE DOSSIER & CALL TRANSCRIPT (${stateInfo.state.toUpperCase()})`}
              </div>
            </div>

            {/* Petition Text Body */}
            <div className="bg-[#FAF7F2] p-5 rounded-xl border border-[#EAE2D5] font-mono text-xs text-slate-800 leading-relaxed whitespace-pre-wrap max-h-[420px] overflow-y-auto">
              {activeFormatTab === 'charter' && charterNoticeText}
              {activeFormatTab === 'rti' && rtiApplicationText}
              {activeFormatTab === 'helpline' && (
                `CALL SCRIPT FOR CM HELPLINE (${stateInfo.helplineNumber}):
                
1. "Hello Officer, I am calling to register an urgent grievance under the ${stateInfo.actName}."
2. "My Name is ${profile.fullName || 'Citizen'} from ${profile.district}, ${profile.stateOfDomicile}."
3. "I applied for ${serviceDisplayName} on ${appliedDate} with Acknowledgment Ref No: ${ackNumber}."
4. "The statutory delivery period is ${slaLimitDays} working days, but ${elapsedDays} days have passed."
5. "This unlawful delay of ${delayDays} days is blocking my admission and scholarship fee reimbursement."
6. "Kindly register this formal complaint against the Tahsildar / Revenue Division Office and provide me the Grievance Token ID."`
              )}
            </div>

            {/* Actions Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
              <div className="text-[11px] text-slate-500 font-serif">
                Legally admissible under Section 65B of Indian Evidence Act
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleCopy(
                    activeFormatTab === 'charter' 
                      ? charterNoticeText 
                      : activeFormatTab === 'rti' 
                        ? rtiApplicationText 
                        : charterNoticeText
                  )}
                  className="px-3.5 py-2 rounded-xl bg-white border border-[#DACBB8] hover:bg-slate-50 text-slate-700 text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-600" />}
                  <span>{copied ? 'Copied to Clipboard!' : 'Copy Text'}</span>
                </button>

                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-3.5 py-2 rounded-xl bg-white border border-[#DACBB8] hover:bg-slate-50 text-slate-700 text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-600" />
                  <span>Print PDF Petition</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleWhatsApp(
                    activeFormatTab === 'charter' 
                      ? charterNoticeText 
                      : activeFormatTab === 'rti' 
                        ? rtiApplicationText 
                        : charterNoticeText
                  )}
                  className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Share on WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
