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
  FileText
} from 'lucide-react';

interface SchemeCockpitPageProps {
  scheme: SchemeDefinition;
  inventory: CertificateInventory;
  currentLanguage: Language;
  onBack: () => void;
  onViewRoadmap: (certKey: CertificateKey) => void;
}

export const SchemeCockpitPage: React.FC<SchemeCockpitPageProps> = ({
  scheme,
  inventory,
  currentLanguage,
  onBack,
  onViewRoadmap
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
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold transition-colors shadow-sm"
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
                className="text-[10px] text-[#0B1B4F] hover:underline font-bold flex items-center gap-1"
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

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col justify-between">
            <div className="text-xs font-bold text-slate-600 mb-1">Official Portal Gateway</div>
            <a
              href={scheme.officialPortalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-[#0B1B4F] hover:bg-[#142A6F] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
            >
              <span>Apply on {scheme.portalName}</span>
              <ExternalLink className="w-3.5 h-3.5 text-amber-300" />
            </a>
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
                    className="text-[11px] text-amber-800 hover:text-amber-900 font-bold hover:underline flex items-center gap-1"
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
                className={`p-5 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-amber-50/70 border-amber-400 ring-2 ring-amber-400/20 shadow-sm'
                    : isCompleted
                    ? 'bg-slate-50 border-slate-200 opacity-90'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-7 h-7 rounded-lg font-black text-xs flex items-center justify-center shrink-0 ${
                      isSelected
                        ? 'bg-[#0B1B4F] text-amber-300'
                        : isCompleted
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-200 text-slate-700'
                    }`}>
                      {isCompleted ? '✓' : stg.stageNumber}
                    </div>

                    <div>
                      <span className="text-sm font-bold text-[#0B1B4F] block">
                        {stg.title}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Department: {stg.department}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-slate-600 bg-white px-2.5 py-1 rounded border border-slate-200">
                      ⏱ Est: {stg.estimatedDays}
                    </span>
                    {isSelected && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-200 text-amber-900">
                        Active Selection
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-slate-700 mt-2 pl-10 leading-relaxed">
                  {stg.description}
                </p>

                {stg.warningAlert && (
                  <div className="mt-3 ml-10 p-2.5 rounded-lg bg-amber-100 border border-amber-300 text-amber-900 text-xs flex items-center gap-2">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0 text-amber-700" />
                    <span>{stg.warningAlert}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
