import React, { useState, useMemo } from 'react';
import { EXTORTION_RATE_CARD, CIVIC_HELPLINES } from '../data/antiExtortion';
import { REAL_OFFLINE_CENTERS, REAL_SERVICE_FEE_SCHEDULE, OfflineCenter } from '../data/cscDirectory';
import { Language } from '../types/language';
import { TRANSLATIONS } from '../data/translations';
import { 
  PhoneCall, 
  Coins, 
  ArrowLeft, 
  Smartphone, 
  Hash, 
  AlertOctagon,
  PhoneForwarded,
  ShieldCheck,
  MapPin,
  Clock,
  Search,
  ExternalLink,
  Building2,
  Navigation,
  CheckCircle2
} from 'lucide-react';

interface AntiExtortionPageProps {
  currentLanguage: Language;
  onBack: () => void;
}

export const AntiExtortionPage: React.FC<AntiExtortionPageProps> = ({
  currentLanguage,
  onBack
}) => {
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  const [activeTab, setActiveTab] = useState<'fees' | 'centers' | 'ussd'>('fees');
  const [dialString, setDialString] = useState('*99*99#');
  const [simulatedScreen, setSimulatedScreen] = useState<string | null>(null);
  const [isDialing, setIsDialing] = useState(false);

  // CSC Directory Filters
  const [selectedState, setSelectedState] = useState<string>('All States');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const availableStates = useMemo(() => {
    const states = Array.from(new Set(REAL_OFFLINE_CENTERS.map((c) => c.state)));
    return ['All States', ...states];
  }, []);

  const availableDistricts = useMemo(() => {
    if (selectedState === 'All States') return ['All'];
    const dists = Array.from(
      new Set(
        REAL_OFFLINE_CENTERS.filter((c) => c.state === selectedState).map((c) => c.district)
      )
    );
    return ['All', ...dists];
  }, [selectedState]);

  const filteredCenters = useMemo(() => {
    return REAL_OFFLINE_CENTERS.filter((center) => {
      const matchState = selectedState === 'All States' || center.state === selectedState;
      const matchDistrict = selectedDistrict === 'All' || center.district === selectedDistrict;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        center.name.toLowerCase().includes(q) ||
        center.address.toLowerCase().includes(q) ||
        center.district.toLowerCase().includes(q);

      return matchState && matchDistrict && matchQuery;
    });
  }, [selectedState, selectedDistrict, searchQuery]);

  const handleKeypadPress = (val: string) => {
    setDialString(prev => prev + val);
  };

  const handleKeypadClear = () => {
    setDialString('');
    setSimulatedScreen(null);
  };

  const handleDial = () => {
    setIsDialing(true);
    setSimulatedScreen('Connecting to NPCI USSD Gateway...');

    setTimeout(() => {
      setIsDialing(false);
      if (dialString === '*99*99#' || dialString === '*99*99*1#') {
        setSimulatedScreen(
          '🏛️ NPCI AADHAAR DBT STATUS\n\n' +
          'Aadhaar: XXXX-XXXX-4829\n' +
          'Status: ACTIVE (MAPPED)\n' +
          'Bank: STATE BANK OF INDIA\n' +
          'Last Seeded: 14-Aug-2024\n\n' +
          '1. View Full Details\n' +
          '2. Exit'
        );
      } else if (dialString === '*99#') {
        setSimulatedScreen(
          '📱 NUUP BANKING (*99#)\n\n' +
          'Select Bank:\n' +
          '1. State Bank of India\n' +
          '2. Canara Bank\n' +
          '3. Union Bank of India\n' +
          '4. Check Balance\n' +
          '5. Mini Statement'
        );
      } else {
        setSimulatedScreen(
          `Telecom Service Code ${dialString} processed.\n` +
          'For Aadhaar DBT seeding status, dial *99*99#\n' +
          'For offline mobile banking, dial *99#'
        );
      }
    }, 1000);
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

      {/* Hero Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-rose-900 text-xs font-bold uppercase tracking-wider mb-3">
          <AlertOctagon className="w-3.5 h-3.5 text-rose-600" />
          <span>Anti-Extortion &amp; Offline Civic Access Hub</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-[#0B1B4F] font-serif mb-2">
          Statutory Fee Protection, e-Seva Centers &amp; *99*99# USSD Simulator
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
          Statutory government scholarship applications are legally capped at ₹0 (Free) or ₹60 (CSC). Compare official rates, locate accredited government e-Sevai / MeeSeva centers, and verify NPCI bank linkage without internet.
        </p>

        {/* Sub-Navigation Tabs */}
        <div className="mt-6 flex flex-wrap gap-2 pt-6 border-t border-slate-100">
          <button
            onClick={() => setActiveTab('fees')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'fees'
                ? 'bg-[#0B1B4F] text-[#F5E29F] shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            💰 Statutory vs Cyber Café Rates
          </button>
          <button
            onClick={() => setActiveTab('centers')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'centers'
                ? 'bg-[#0B1B4F] text-[#F5E29F] shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            📍 Verified e-Seva / CSC Center Directory ({REAL_OFFLINE_CENTERS.length})
          </button>
          <button
            onClick={() => setActiveTab('ussd')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'ussd'
                ? 'bg-[#0B1B4F] text-[#F5E29F] shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            📱 Offline *99*99# USSD Dialpad Simulator
          </button>
        </div>
      </div>

      {/* TAB 1: Statutory Fee Comparison */}
      {activeTab === 'fees' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#0B1B4F] flex items-center gap-2">
              <Coins className="w-4 h-4 text-amber-600" />
              <span>Statutory Legal Fees vs Black Market Cyber Café Charges</span>
            </h3>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200">
              Government Mandate Protected
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-700">
                  <th className="p-3 font-bold">Government Service / Certificate</th>
                  <th className="p-3 font-bold text-emerald-800">Statutory Max Fee</th>
                  <th className="p-3 font-bold text-rose-700">Cyber Café Extortion</th>
                  <th className="p-3 font-bold text-slate-600">Statutory Legal Citation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {EXTORTION_RATE_CARD.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                    <td className="p-3 font-bold text-slate-900">{item.serviceName}</td>
                    <td className="p-3 font-black text-emerald-700 bg-emerald-50/40">
                      {item.statutoryOfficialFee}
                    </td>
                    <td className="p-3 font-black text-rose-700 bg-rose-50/40">
                      {item.cyberCafeExtortionRate}
                    </td>
                    <td className="p-3 text-slate-500 font-mono text-[11px]">{item.legalNote}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Grievance Helplines */}
          <div className="pt-6 border-t border-slate-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B1B4F] mb-4 flex items-center gap-1.5">
              <PhoneForwarded className="w-4 h-4 text-amber-600" />
              <span>24x7 Anti-Corruption &amp; Grievance Helplines</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {CIVIC_HELPLINES.map((h, i) => (
                <div key={i} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                  <div className="text-[10px] text-slate-500 uppercase font-bold">{h.scope}</div>
                  <div className="text-sm font-black text-[#0B1B4F] my-0.5">{h.number}</div>
                  <div className="text-[11px] text-slate-600">{h.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Searchable CSC & e-Seva Center Directory */}
      {activeTab === 'centers' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#0B1B4F] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-600" />
                <span>Accredited Government e-Seva, MeeSeva &amp; CSC Directory</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Visit accredited government centers to receive computerized receipts and guaranteed statutory fees.
              </p>
            </div>

            {/* Filter Controls */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <select
                value={selectedState}
                onChange={(e) => {
                  setSelectedState(e.target.value);
                  setSelectedDistrict('All');
                }}
                className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 font-bold text-slate-800"
              >
                {availableStates.map(s => <option key={s} value={s}>{s}</option>)}
              </select>

              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 font-bold text-slate-800"
              >
                {availableDistricts.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by center name, street, taluk, or district..."
              className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0B1B4F]"
            />
          </div>

          {/* Center Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCenters.map((center) => (
              <div 
                key={center.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-amber-300 transition-all shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#0B1B4F] text-white">
                      {center.type}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Govt Verified</span>
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-[#0B1B4F] mb-1">
                    {center.name}
                  </h4>
                  <p className="text-xs text-slate-600 mb-2">
                    {center.address} • Pincode: {center.pincode}
                  </p>

                  <div className="space-y-1 text-xs text-slate-600 mb-3">
                    <div className="flex items-center gap-1.5">
                      <PhoneCall className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      <span className="font-mono">{center.phone}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span>{center.timing}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-bold">
                    {center.district}, {center.state}
                  </span>
                  <a
                    href={center.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white hover:bg-amber-50 text-[#0B1B4F] border border-slate-300 font-bold text-xs transition-colors"
                  >
                    <Navigation className="w-3 h-3 text-amber-700" />
                    <span>Get Directions</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Interactive *99*99# USSD Dialpad Simulator */}
      {activeTab === 'ussd' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Instructions */}
            <div className="space-y-4">
              <h3 className="text-xl font-black text-[#0B1B4F] font-serif">
                How to check Aadhaar-Bank Linkage without Internet:
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                The National Payments Corporation of India (NPCI) provides an offline USSD service. Dialing <strong className="text-slate-900 font-bold">*99*99#</strong> or <strong className="text-slate-900 font-bold">*99*99*1#</strong> works on any basic feature phone without mobile data or internet.
              </p>

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                  <strong className="text-amber-950 block font-bold">Step 1: Open Phone Keypad</strong>
                  <span>Type *99*99# and press the Call button from your Aadhaar-registered mobile number.</span>
                </div>
                <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                  <strong className="text-amber-950 block font-bold">Step 2: Enter 12-digit Aadhaar Number</strong>
                  <span>The NPCI gateway will prompt for your Aadhaar digits.</span>
                </div>
                <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                  <strong className="text-amber-950 block font-bold">Step 3: Instant Verification Display</strong>
                  <span>The screen immediately shows which bank account is actively seeded for DBT.</span>
                </div>
              </div>
            </div>

            {/* Right Virtual Phone */}
            <div className="flex justify-center">
              <div className="w-72 bg-slate-900 rounded-3xl p-5 shadow-2xl border-4 border-slate-800 text-white flex flex-col items-center">
                {/* Simulated Screen */}
                <div className="w-full h-36 bg-emerald-950 border border-emerald-500/40 rounded-xl p-3 text-emerald-300 font-mono text-[11px] overflow-y-auto mb-4 flex flex-col justify-between">
                  <div className="whitespace-pre-line leading-tight">
                    {simulatedScreen || 'Enter USSD Code & Press Call...\nTry: *99*99# or *99#'}
                  </div>
                  <div className="text-right text-[10px] text-emerald-400 font-bold">
                    {dialString}
                  </div>
                </div>

                {/* Keypad Grid */}
                <div className="grid grid-cols-3 gap-2 w-full mb-4 text-sm font-bold">
                  {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((k) => (
                    <button
                      key={k}
                      onClick={() => handleKeypadPress(k)}
                      className="py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 transition-colors cursor-pointer"
                    >
                      {k}
                    </button>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2 w-full">
                  <button
                    onClick={handleDial}
                    disabled={isDialing || !dialString}
                    className="py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-xs flex items-center justify-center gap-1 cursor-pointer transition-colors"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>{isDialing ? 'Dialing...' : 'Call'}</span>
                  </button>
                  <button
                    onClick={handleKeypadClear}
                    className="py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 font-bold text-xs cursor-pointer transition-colors"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
