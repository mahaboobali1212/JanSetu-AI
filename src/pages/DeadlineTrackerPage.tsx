import React, { useState } from 'react';
import { SchemeDefinition } from '../types/scheme';
import { CENTRAL_SCHEMES } from '../data/schemesCentral';
import { STATE_SCHEMES } from '../data/schemesStates';
import { CitizenProfile } from '../types/profile';
import { Language } from '../types/language';
import { 
  Calendar, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Send, 
  Download, 
  ExternalLink, 
  ArrowLeft, 
  Search, 
  Filter, 
  Sparkles,
  ChevronRight,
  Bell
} from 'lucide-react';

interface DeadlineTrackerPageProps {
  profile: CitizenProfile;
  currentLanguage: Language;
  onBack: () => void;
  onOpenCockpit: (scheme: SchemeDefinition) => void;
}

export const DeadlineTrackerPage: React.FC<DeadlineTrackerPageProps> = ({
  profile,
  currentLanguage,
  onBack,
  onOpenCockpit
}) => {
  const [filterScope, setFilterScope] = useState<'all' | 'domicile' | 'central' | 'urgent'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const allSchemes: SchemeDefinition[] = [...CENTRAL_SCHEMES, ...STATE_SCHEMES];

  const today = new Date();

  // Calculate days remaining and categorize
  const enrichedSchemes = allSchemes.map(scheme => {
    const closeDate = new Date(scheme.applicationClosingDate);
    const diffTime = closeDate.getTime() - today.getTime();
    const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    let urgency: 'URGENT' | 'MEDIUM' | 'ACTIVE' | 'EXPIRED' = 'ACTIVE';
    if (daysLeft < 0) urgency = 'EXPIRED';
    else if (daysLeft <= 15) urgency = 'URGENT';
    else if (daysLeft <= 30) urgency = 'MEDIUM';
    else urgency = 'ACTIVE';

    return {
      ...scheme,
      daysLeft,
      urgency
    };
  });

  // Filter schemes
  const filteredSchemes = enrichedSchemes.filter(scheme => {
    // Search query filter
    const matchesSearch = 
      scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.authority.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (scheme.state && scheme.state.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (filterScope === 'domicile') {
      return scheme.level === 'state' && scheme.state?.toLowerCase() === profile.stateOfDomicile.toLowerCase();
    }
    if (filterScope === 'central') {
      return scheme.level === 'central';
    }
    if (filterScope === 'urgent') {
      return scheme.urgency === 'URGENT';
    }
    return true;
  }).sort((a, b) => a.daysLeft - b.daysLeft);

  const urgentCount = enrichedSchemes.filter(s => s.urgency === 'URGENT').length;

  const handleGoogleCalendar = (scheme: typeof enrichedSchemes[0]) => {
    const title = encodeURIComponent(`[JanSetu Deadline] Apply for ${scheme.name}`);
    const details = encodeURIComponent(
      `Statutory closing date for ${scheme.name} (${scheme.benefitAmount}).\nOfficial Portal: ${scheme.officialPortalUrl}\nAuthority: ${scheme.authority}`
    );
    // Format YYYYMMDD
    const dateFormatted = scheme.applicationClosingDate.replace(/-/g, '');
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&dates=${dateFormatted}/${dateFormatted}`;
    window.open(url, '_blank');
  };

  const handleDownloadIcs = (scheme: typeof enrichedSchemes[0]) => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//JanSetu AI//Scholarship Deadline Calendar//EN
BEGIN:VEVENT
SUMMARY:[JanSetu Deadline] Apply for ${scheme.name}
DESCRIPTION:Statutory closing date for ${scheme.name}. Official Portal: ${scheme.officialPortalUrl}
DTSTART;VALUE=DATE:${scheme.applicationClosingDate.replace(/-/g, '')}
DTEND;VALUE=DATE:${scheme.applicationClosingDate.replace(/-/g, '')}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${scheme.code}-deadline.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleWhatsAppAlert = (scheme: typeof enrichedSchemes[0]) => {
    const msg = `*JanSetu AI Scheme Deadline Alert*\n\n📌 *Scheme:* ${scheme.name}\n💰 *Benefit:* ${scheme.benefitAmount}\n⏰ *Closing Date:* ${scheme.applicationClosingDate} (${scheme.daysLeft > 0 ? `${scheme.daysLeft} days left` : 'Closing Soon'})\n🔗 *Official Portal:* ${scheme.officialPortalUrl}\n\n_Generated via JanSetu AI Sovereign Access Gateway_`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Header */}
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
            <span className="text-[10px] font-bold uppercase tracking-widest bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded-full border border-emerald-300">
              Live Deadline Hub
            </span>
            <span className="text-xs text-slate-500 font-serif">Statutory Application Calendars & WhatsApp Alerts</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#0B1B4F] mt-1">
            Scheme Deadlines Calendar & Alert Tracker
          </h1>
        </div>

        {urgentCount > 0 && (
          <div className="flex items-center gap-2 bg-rose-50 border border-rose-200 px-4 py-2.5 rounded-xl shadow-sm text-rose-900">
            <AlertTriangle className="w-5 h-5 text-rose-600 animate-bounce" />
            <div>
              <div className="text-[10px] uppercase font-bold text-rose-700">Urgent Attention</div>
              <div className="text-xs font-bold font-serif">{urgentCount} Schemes Expiring in &lt; 15 Days!</div>
            </div>
          </div>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-[#DACBB8] p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search scheme name, state, authority..."
            className="w-full bg-[#FAF7F2] border border-[#DACBB8] rounded-xl pl-9 pr-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0B1B4F]"
          />
        </div>

        {/* Scope Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setFilterScope('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              filterScope === 'all'
                ? 'bg-[#0B1B4F] text-[#F5E29F] shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All Schemes ({allSchemes.length})
          </button>
          <button
            onClick={() => setFilterScope('urgent')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
              filterScope === 'urgent'
                ? 'bg-rose-700 text-white shadow-sm'
                : 'bg-rose-50 text-rose-800 hover:bg-rose-100'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Closing Soon ({urgentCount})</span>
          </button>
          <button
            onClick={() => setFilterScope('domicile')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              filterScope === 'domicile'
                ? 'bg-[#0B1B4F] text-[#F5E29F] shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {profile.stateOfDomicile} Only
          </button>
          <button
            onClick={() => setFilterScope('central')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              filterScope === 'central'
                ? 'bg-[#0B1B4F] text-[#F5E29F] shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Central All-India
          </button>
        </div>
      </div>

      {/* Schemes Deadline Timeline List */}
      <div className="space-y-4">
        {filteredSchemes.map((scheme) => (
          <div
            key={scheme.id}
            className={`bg-white rounded-2xl border-2 p-5 shadow-sm transition hover:shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-5 ${
              scheme.urgency === 'URGENT'
                ? 'border-rose-300 bg-rose-50/20'
                : scheme.urgency === 'MEDIUM'
                  ? 'border-amber-300'
                  : 'border-[#DACBB8]'
            }`}
          >
            {/* Left: Scheme Info */}
            <div className="space-y-1.5 flex-grow">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                  scheme.urgency === 'URGENT' ? 'bg-rose-100 text-rose-800 border border-rose-300' :
                  scheme.urgency === 'MEDIUM' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                  'bg-emerald-100 text-emerald-800 border border-emerald-300'
                }`}>
                  {scheme.daysLeft > 0 ? `⏳ Closing in ${scheme.daysLeft} Days` : '🚨 Closing Imminently'}
                </span>
                <span className="text-[10px] font-bold uppercase bg-[#0B1B4F] text-[#F5E29F] px-2 py-0.5 rounded">
                  {scheme.level.toUpperCase()} {scheme.state ? `• ${scheme.state}` : ''}
                </span>
                <span className="text-xs text-slate-500 font-mono">{scheme.code}</span>
              </div>

              <h3 className="text-base font-bold font-serif text-[#0B1B4F]">
                {scheme.name}
              </h3>
              <p className="text-xs text-slate-600 line-clamp-1">
                {scheme.shortDescription}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                <span>💰 <strong>Benefit:</strong> {scheme.benefitAmount}</span>
                <span>🏛️ <strong>Portal:</strong> {scheme.portalName}</span>
                <span>📅 <strong>Deadline:</strong> <strong className="font-mono text-slate-800">{scheme.applicationClosingDate}</strong></span>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
              <button
                type="button"
                onClick={() => handleGoogleCalendar(scheme)}
                title="Add reminder to Google Calendar"
                className="px-3 py-2 rounded-xl bg-white border border-[#DACBB8] hover:bg-slate-50 text-slate-700 text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
              >
                <Calendar className="w-3.5 h-3.5 text-blue-600" />
                <span>Google Cal</span>
              </button>

              <button
                type="button"
                onClick={() => handleDownloadIcs(scheme)}
                title="Download .ics event file"
                className="px-2.5 py-2 rounded-xl bg-white border border-[#DACBB8] hover:bg-slate-50 text-slate-700 text-xs font-bold transition shadow-sm"
              >
                <Download className="w-3.5 h-3.5 text-slate-600" />
              </button>

              <button
                type="button"
                onClick={() => handleWhatsAppAlert(scheme)}
                title="Send WhatsApp Reminder"
                className="px-3 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>WhatsApp Alert</span>
              </button>

              <button
                type="button"
                onClick={() => onOpenCockpit(scheme)}
                className="px-3.5 py-2 rounded-xl bg-[#0B1B4F] text-[#F5E29F] hover:bg-[#12286D] text-xs font-bold transition flex items-center gap-1 shadow-sm"
              >
                <span>View Details</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
