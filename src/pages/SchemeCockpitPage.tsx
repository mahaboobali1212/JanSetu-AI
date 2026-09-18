import React, { useState } from 'react';
import { SchemeDefinition } from '../types/scheme';
import { CertificateInventory, CertificateKey } from '../types/certificate';
import { MASTER_CERTIFICATES } from '../data/certificates';
import { Language } from '../types/language';
import { TRANSLATIONS } from '../data/translations';
import { CalendarGenerator } from '../engine/calendarGenerator';
import { 
  Layers, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  ExternalLink, 
  ArrowLeft, 
  Building2, 
  AlertCircle, 
  FileText,
  Compass,
  Key
} from 'lucide-react';

interface SchemeCockpitPageProps {
  scheme: SchemeDefinition;
  inventory: CertificateInventory;
  currentLanguage: Language;
  onBack: () => void;
  onViewRoadmap: (certKey: CertificateKey) => void;
  onOpenPortalGuide?: (scheme: SchemeDefinition) => void;
}

export const SchemeCockpitPage: React.FC<SchemeCockpitPageProps> = ({
  scheme,
  inventory,
  currentLanguage,
  onBack,
  onViewRoadmap,
  onOpenPortalGuide
}) => {
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;
  const [activeStage, setActiveStage] = useState<number>(1);

  const schemeTitle = scheme.nameTranslations[currentLanguage] || scheme.name;

  const closingDate = new Date(scheme.applicationClosingDate);
  const today = new Date();
  const diffTime = closingDate.getTime() - today.getTime();
  const daysRemaining = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  const handleDownloadCalendar = () => {
    CalendarGenerator.downloadIcsReminder(scheme);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in space-y-8">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold transition-colors shadow-sm cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5 text-[#0B1B4F]" />
        <span>← Back to Dashboard</span>
      </button>

      {/* Scheme Cockpit Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-xs font-black px-2.5 py-1 rounded bg-[#0B1B4F] text-white">
            {scheme.code}
          </span>
          <span className="text-xs font-bold px-2.5 py-1 rounded bg-amber-50 text-amber-900 border border-amber-200">
            {scheme.level === 'central' ? 'Central Scheme' : `${scheme.state} State Scheme`}
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-[#0B1B4F] font-serif mb-2">
          {schemeTitle}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mb-6">
          {scheme.shortDescription}
        </p>

        {/* Live Deadline & Benefit HUD */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-100">
          <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200">
            <div className="text-xs font-bold text-amber-900 mb-1">Financial Entitlement</div>
            <div className="text-xl font-black text-[#0B1B4F] font-serif">
              {scheme.benefitAmount}
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">Benefit Type: {scheme.benefitType.replace('_', ' ').toUpperCase()}</div>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between gap-1 mb-1">
              <span className="text-xs font-bold text-slate-600">Application Deadline</span>
              <button
                onClick={handleDownloadCalendar}
                className="text-[10px] text-[#0B1B4F] hover:underline font-bold flex items-center gap-1 cursor-pointer"
                title="Add to Google Calendar / Phone Calendar"
              >
                <Calendar className="w-3 h-3 text-amber-600" />
                <span>Add Reminder (.ics)</span>
              </button>
            </div>
            <div className="text-xl font-bold text-slate-900">
              {scheme.applicationClosingDate}
            </div>
            <div className="text-[10px] text-amber-700 font-bold mt-0.5 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{daysRemaining} Days Left to Apply</span>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col justify-between gap-2">
            <div className="text-xs font-bold text-slate-600">Official Portal Gateways</div>
            <div className="flex flex-col gap-1.5">
              {onOpenPortalGuide && (
                <button
                  onClick={() => onOpenPortalGuide(scheme)}
                  className="px-3.5 py-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold text-xs flex items-center justify-center gap-1.5 border border-amber-300 transition-all cursor-pointer"
                >
                  <Compass className="w-3.5 h-3.5 text-amber-800" />
                  <span>How to Apply &amp; OTR Guide</span>
                </button>
              )}

              <a
                href={scheme.officialPortalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-[#0B1B4F] hover:bg-[#142A6F] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
              >
                <span>Launch {scheme.portalName}</span>
                <ExternalLink className="w-3.5 h-3.5 text-amber-300" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Diff Matrix */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#0B1B4F] mb-4 flex items-center gap-2">
          <FileText className="w-4 h-4 text-amber-600" />
          <span>Certificate Requirements Matrix</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {scheme.requiredCertificates.map((key) => {
            const cert = MASTER_CERTIFICATES[key];
            const isHeld = inventory[key];

            return (
              <div
                key={key}
                className={`p-3.5 rounded-xl border transition-all ${
                  isHeld
                    ? 'bg-emerald-50/60 border-emerald-200'
                    : 'bg-amber-50/60 border-amber-200'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white text-slate-700 border border-slate-200">
                    {cert?.id || key}
                  </span>
                  {isHeld ? (
                    <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Ready in Hand</span>
                    </span>
                  ) : (
                    <span className="text-[11px] font-bold text-amber-800 flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5 text-rose-500" />
                      <span>Missing</span>
                    </span>
                  )}
                </div>

                <div className="text-xs font-bold text-[#0B1B4F] mb-2 line-clamp-1">
                  {cert?.title || key}
                </div>

                {!isHeld && (
                  <button
                    onClick={() => onViewRoadmap(key)}
                    className="text-[11px] text-amber-800 hover:text-amber-900 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Resolution Roadmap →</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Visual 6-Stage Government Workflow Architecture */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between gap-2 mb-6">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#0B1B4F] flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-600" />
              <span>Visual 6-Stage Government Workflow Architecture</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Click any stage to mark "Where I Am Present" and view specific official instructions.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-3">
          {scheme.workflowStages.map((stg) => {
            const isSelected = activeStage === stg.stageNumber;
            const isCompleted = activeStage > stg.stageNumber;

            return (
              <div
                key={stg.stageNumber}
                onClick={() => setActiveStage(stg.stageNumber)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#0B1B4F] text-white border-[#0B1B4F] shadow-md'
                    : isCompleted
                    ? 'bg-emerald-50/70 border-emerald-300 text-slate-800'
                    : 'bg-slate-50 hover:bg-slate-100/70 border-slate-200 text-slate-800'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                        isSelected
                          ? 'bg-amber-400 text-slate-950 font-serif'
                          : isCompleted
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {stg.stageNumber}
                    </span>
                    <strong className="text-xs sm:text-sm font-bold font-serif">
                      {stg.title}
                    </strong>
                  </div>

                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                      isSelected
                        ? 'bg-white/10 text-amber-300'
                        : 'bg-white text-slate-600 border border-slate-200'
                    }`}
                  >
                    Est: {stg.estimatedDays}
                  </span>
                </div>

                <div className="text-xs mt-1 pl-8 space-y-1">
                  <div className={isSelected ? 'text-slate-300' : 'text-slate-500'}>
                    Department / Node: <strong>{stg.department}</strong>
                  </div>
                  <p className={isSelected ? 'text-slate-200 text-xs' : 'text-slate-600 text-xs'}>
                    {stg.description}
                  </p>

                  {stg.warningAlert && (
                    <div
                      className={`p-2 rounded-lg text-[11px] mt-2 flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-amber-500/20 text-amber-200 border border-amber-500/40'
                          : 'bg-amber-50 text-amber-900 border border-amber-200'
                      }`}
                    >
                      <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>{stg.warningAlert}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
