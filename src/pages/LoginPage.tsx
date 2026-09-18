import React from 'react';
import { CitizenProfile, INDIAN_STATES, Gender, Category, CourseLevel, SchoolingType } from '../types/profile';
import { CertificateInventory } from '../types/certificate';
import { Language } from '../types/language';
import { TRANSLATIONS } from '../data/translations';
import { PERSONA_PRESETS } from '../data/personas';
import { getDistrictsForState } from '../data/districts';
import { getCoursesForLevel } from '../data/courses';
import { getStateStructure, StateCategoryDefinition, StateQuotaDefinition } from '../data/stateCategories';
import { 
  User, 
  MapPin, 
  IndianRupee, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Building2, 
  Percent, 
  Award,
  CreditCard,
  FileCheck,
  CheckCircle2,
  GraduationCap,
  BookOpen,
  Globe,
  Tag,
  Layers,
  AlertCircle
} from 'lucide-react';

interface LoginPageProps {
  profile: CitizenProfile;
  onUpdateProfile: (profile: CitizenProfile) => void;
  onUpdateInventory: (inventory: CertificateInventory) => void;
  onNext: () => void;
  currentLanguage: Language;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  profile,
  onUpdateProfile,
  onUpdateInventory,
  onNext,
  currentLanguage
}) => {
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  // Available districts for selected state
  const availableDistricts = getDistrictsForState(profile.stateOfDomicile);

  // Available courses for selected education level
  const availableCourses = getCoursesForLevel(profile.courseLevel);

  // State-specific categories and admission quotas
  const stateStructure = getStateStructure(profile.stateOfDomicile);
  const activeCategories = stateStructure.categories;
  const activeQuotas = stateStructure.admissionQuotas;

  const currentCategoryCode = profile.stateCategoryCode || stateStructure.defaultCategoryCode;
  const selectedCategoryObj = activeCategories.find(c => c.code === currentCategoryCode) || activeCategories[0];

  const currentQuotaId = profile.admissionQuota || activeQuotas[0]?.id || 'convenor_quota';
  const selectedQuotaObj = activeQuotas.find(q => q.id === currentQuotaId) || activeQuotas[0];

  const handleStateChange = (newState: string) => {
    const districts = getDistrictsForState(newState);
    const newStructure = getStateStructure(newState);
    const defaultCat = newStructure.categories.find(c => c.code === newStructure.defaultCategoryCode) || newStructure.categories[0];
    const defaultQuota = newStructure.admissionQuotas[0];

    onUpdateProfile({
      ...profile,
      stateOfDomicile: newState,
      district: districts[0] || 'Headquarters District',
      category: defaultCat.baseCategory,
      stateCategoryCode: defaultCat.code,
      admissionQuota: defaultQuota.id
    });
  };

  const handleStateCategoryChange = (code: string) => {
    const cat = activeCategories.find(c => c.code === code);
    if (cat) {
      onUpdateProfile({
        ...profile,
        stateCategoryCode: cat.code,
        category: cat.baseCategory
      });
    }
  };

  const handleAdmissionQuotaChange = (quotaId: string) => {
    onUpdateProfile({
      ...profile,
      admissionQuota: quotaId
    });
  };

  const handleCourseLevelChange = (newLevel: CourseLevel) => {
    const courses = getCoursesForLevel(newLevel);
    onUpdateProfile({
      ...profile,
      courseLevel: newLevel,
      courseName: courses[0] || 'General Program'
    });
  };

  const handleAadhaarLast4Change = (val: string) => {
    const numeric = val.replace(/\D/g, '').slice(0, 4);
    onUpdateProfile({
      ...profile,
      aadhaarLast4: numeric
    });
  };

  const handleTextChange = (field: keyof CitizenProfile, value: any) => {
    onUpdateProfile({
      ...profile,
      [field]: value
    });
  };

  const handlePersonaSelect = (personaId: string) => {
    const selected = PERSONA_PRESETS.find(p => p.id === personaId);
    if (selected) {
      onUpdateProfile(selected.profile);
      onUpdateInventory(selected.inventory);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in space-y-8">
      {/* 1. Luxury Editorial Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden shadow-luxury border border-[#E7DDCE] luxury-hero-gradient">
        <div className="p-8 sm:p-12 flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative">
          <div className="max-w-2xl z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF0E1] border border-[#DFC8A5] text-[#854D0E] text-xs font-bold uppercase tracking-widest mb-4 font-display">
              <span>🏛️ Sovereign Civic Access Gateway</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-[#0B1B4F] tracking-tight leading-[1.15] font-serif mb-4">
              Access What is <span className="font-cormorant italic font-normal text-amber-700">Rightfully Yours.</span>
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 max-w-xl">
              Eliminate administrative rejection bottlenecks across 50+ central & state welfare boards through deterministic policy verification, prerequisite certificate roadmaps, and anti-extortion protections.
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-[#0B1B4F]">
              <span className="flex items-center gap-1.5 bg-white/90 px-3.5 py-1.5 rounded-full border border-[#E2D5C3] shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Zero AI Hallucination</span>
              </span>
              <span className="flex items-center gap-1.5 bg-white/90 px-3.5 py-1.5 rounded-full border border-[#E2D5C3] shadow-sm">
                <ShieldCheck className="w-4 h-4 text-[#0B1B4F]" />
                <span>Statutory Fee Capped (₹0 - ₹60)</span>
              </span>
            </div>
          </div>

          {/* Right Image: Scholarship Cap & Coins Motif with Gold Frame */}
          <div className="shrink-0 w-full sm:w-80 rounded-2xl overflow-hidden shadow-luxury-lg border-2 border-white z-10 bg-white p-2">
            <div className="rounded-xl overflow-hidden border border-[#EAE2D5]">
              <img 
                src="/assets/scholarship_hero.png" 
                alt="National Scholarships" 
                className="w-full h-48 object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="p-3 bg-[#FAF7F2] text-center border-t border-[#EAE2D5]">
                <div className="text-xs font-bold text-[#0B1B4F] font-serif">National Entitlements Flight Deck</div>
                <div className="text-[10px] text-slate-500">Official Ministry & Welfare Gateway</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Fast Demo Personas (1-Click Pre-fill) */}
      <div className="luxury-card rounded-3xl p-6 sm:p-8">
        <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-[#EDE6DD]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-700" />
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#0B1B4F] font-display">
              {t.persona_quick_title}
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-medium hidden sm:inline">
            Select a verified student profile to simulate state rules & certificate chains
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {PERSONA_PRESETS.map((p) => {
            const isSelected = profile.fullName === p.profile.fullName;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => handlePersonaSelect(p.id)}
                className={`text-left p-4 rounded-2xl border transition-all ${
                  isSelected
                    ? 'bg-[#FAF2E6] border-[#CA8A04] shadow-sm ring-1 ring-[#CA8A04]'
                    : 'bg-[#FAF7F2] hover:bg-[#F5ECE0] border-[#E8DFCFA0]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-sm text-[#0B1B4F] font-serif">{p.name}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-slate-700 border border-[#DACBB8]">
                    {p.state}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed font-sans">
                  {p.tagline}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Official Citizen Registration Form Card */}
      <div className="luxury-card rounded-3xl p-6 sm:p-10">
        <div className="border-b border-[#EDE6DD] pb-5 mb-8 flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-widest font-display mb-1">
              <span>Step 1 of 3</span>
            </div>
            <h3 className="text-2xl font-bold text-[#0B1B4F] font-serif">
              Citizen Identity & Academic Profile
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Select your Education Level to load all accredited degree and course specializations.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Row 1: Full Name & Masked Aadhaar (Last 4 Digits Only) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5 font-display tracking-wide">
                <User className="w-3.5 h-3.5 text-slate-500" />
                <span>{t.full_name_label}</span>
              </label>
              <input
                type="text"
                value={profile.fullName}
                onChange={(e) => handleTextChange('fullName', e.target.value)}
                placeholder="e.g. Priya Sundaram"
                className="w-full bg-[#FAF7F2] border border-[#DDD0C0] rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0B1B4F] focus:bg-white transition-all shadow-inner font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center justify-between gap-1.5 font-display tracking-wide">
                <div className="flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Aadhaar Number (Last 4 Digits Only)</span>
                </div>
                <span className="text-[10px] font-normal text-slate-500 font-sans">
                  Type 4 digits
                </span>
              </label>
              
              <div className="flex items-center bg-[#FAF7F2] border border-[#DDD0C0] rounded-xl px-3 py-1.5 shadow-inner focus-within:ring-2 focus-within:ring-[#0B1B4F] focus-within:bg-white transition-all">
                <span className="text-xs font-mono font-bold text-slate-500 tracking-wider select-none pr-2 border-r border-[#DDD0C0]">
                  XXXX - XXXX -
                </span>
                <input
                  type="text"
                  maxLength={4}
                  value={profile.aadhaarLast4 || ''}
                  onChange={(e) => handleAadhaarLast4Change(e.target.value)}
                  placeholder="4829"
                  className="w-full bg-transparent pl-3 py-1.5 text-sm font-mono font-bold text-slate-900 focus:outline-none tracking-widest"
                />
              </div>
              <span className="text-[10px] text-slate-500 mt-1 block">
                Zero full Aadhaar storage • 100% private client-side verification
              </span>
            </div>
          </div>

          {/* Row 2: State of Domicile & Dynamic District Dropdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5 font-display tracking-wide">
                <MapPin className="w-3.5 h-3.5 text-rose-600" />
                <span>{t.state_label}</span>
              </label>
              <select
                value={profile.stateOfDomicile}
                onChange={(e) => handleStateChange(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#DDD0C0] rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0B1B4F] focus:bg-white transition-all shadow-inner font-semibold"
              >
                {INDIAN_STATES.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center justify-between gap-1.5 font-display tracking-wide">
                <div className="flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-sky-600" />
                  <span>District / Revenue Taluk</span>
                </div>
                <span className="text-[10px] font-normal text-slate-500 font-sans">
                  ({availableDistricts.length} Districts in {profile.stateOfDomicile})
                </span>
              </label>
              <select
                value={profile.district}
                onChange={(e) => handleTextChange('district', e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#DDD0C0] rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0B1B4F] focus:bg-white transition-all shadow-inner font-semibold"
              >
                {availableDistricts.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 3: Gender, State-Specific Category, Annual Income */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2 font-display tracking-wide">
                {t.gender_label}
              </label>
              <select
                value={profile.gender}
                onChange={(e) => handleTextChange('gender', e.target.value as Gender)}
                className="w-full bg-[#FAF7F2] border border-[#DDD0C0] rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0B1B4F] focus:bg-white font-semibold"
              >
                <option value="female">Female (பெண் / महिला / స్త్రీ)</option>
                <option value="male">Male (ஆண் / पुरुष / పురుషుడు)</option>
                <option value="transgender">Transgender (திருநங்கை / उभयलिंगी / ఇతరులు)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center justify-between gap-1.5 font-display tracking-wide">
                <div className="flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-amber-700" />
                  <span>Category ({profile.stateOfDomicile})</span>
                </div>
                {selectedCategoryObj?.reservationPercentage && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#FAF0E1] text-[#854D0E] border border-[#DFC8A5]">
                    {selectedCategoryObj.reservationPercentage} Quota
                  </span>
                )}
              </label>
              <select
                value={currentCategoryCode}
                onChange={(e) => handleStateCategoryChange(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#DDD0C0] rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0B1B4F] focus:bg-white font-semibold"
              >
                {activeCategories.map((cat) => (
                  <option key={cat.code} value={cat.code}>
                    {cat.name} {cat.nativeName ? `(${cat.nativeName})` : ''}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5 font-display tracking-wide">
                <IndianRupee className="w-3.5 h-3.5 text-amber-700" />
                <span>{t.income_label}</span>
              </label>
              <input
                type="number"
                value={profile.annualIncome}
                onChange={(e) => handleTextChange('annualIncome', Number(e.target.value))}
                placeholder="180000"
                className="w-full bg-[#FAF7F2] border border-[#DDD0C0] rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0B1B4F] focus:bg-white font-semibold"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                ₹{(profile.annualIncome / 100000).toFixed(2)} Lakhs per annum
              </span>
            </div>
          </div>

          {/* Category Description & Reservation Context Banner */}
          {selectedCategoryObj && (
            <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#EDE4D8] flex items-start gap-3">
              <div className="w-6 h-6 rounded-lg bg-[#0B1B4F] text-amber-300 flex items-center justify-center font-bold text-xs shrink-0 font-mono mt-0.5">
                {selectedCategoryObj.code}
              </div>
              <div className="text-xs">
                <span className="font-bold text-[#0B1B4F]">
                  {selectedCategoryObj.name} {selectedCategoryObj.nativeName ? `(${selectedCategoryObj.nativeName})` : ''}:
                </span>{' '}
                <span className="text-slate-600 leading-relaxed">
                  {selectedCategoryObj.description}
                </span>
                <span className="ml-2 font-mono text-[10px] text-slate-400">
                  [Mapped Base Category: {selectedCategoryObj.baseCategory}]
                </span>
              </div>
            </div>
          )}

          {/* State Admission & Counselling Quota Selector */}
          <div className="pt-2">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-widest font-display flex items-center gap-2">
                  <Layers className="w-4 h-4 text-amber-700" />
                  <span>Admission &amp; Counselling Quota ({profile.stateOfDomicile})</span>
                </label>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  State welfare policies mandate admission under <strong>Government Counselling (Convenor Quota)</strong> for 100% Tuition Fee Reimbursement.
                </p>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                {activeQuotas.length} Available Quotas
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {activeQuotas.map((quota) => {
                const isSelected = (profile.admissionQuota || activeQuotas[0].id) === quota.id;
                return (
                  <button
                    key={quota.id}
                    type="button"
                    onClick={() => handleAdmissionQuotaChange(quota.id)}
                    className={`text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? quota.feeReimbursementEligible
                          ? 'bg-emerald-50/70 border-emerald-400 ring-2 ring-emerald-500/20 shadow-sm'
                          : 'bg-amber-50/70 border-amber-400 ring-2 ring-amber-500/20 shadow-sm'
                        : 'bg-[#FAF7F2] border-[#EDE6DD] hover:border-[#DFC8A5]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div className="font-bold text-xs text-[#0B1B4F] font-serif leading-snug">
                        {quota.name}
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md shrink-0 ${
                        quota.feeReimbursementEligible
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : 'bg-rose-100 text-rose-800 border border-rose-200'
                      }`}>
                        {quota.badge}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 mb-1">
                      <strong>Authority:</strong> {quota.counsellingBody}
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      {quota.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Row 4: Education Level, Dynamic Course/Degree Dropdown, Marks % */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5 font-display tracking-wide">
                <GraduationCap className="w-3.5 h-3.5 text-[#0B1B4F]" />
                <span>{t.course_level_label}</span>
              </label>
              <select
                value={profile.courseLevel}
                onChange={(e) => handleCourseLevelChange(e.target.value as CourseLevel)}
                className="w-full bg-[#FAF7F2] border border-[#DDD0C0] rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0B1B4F] focus:bg-white font-semibold"
              >
                <option value="ug_engg">UG Engineering & Tech (B.E. / B.Tech / B.Arch)</option>
                <option value="ug_med">UG Medical & Health (MBBS / BDS / AYUSH / Nursing / B.Pharm)</option>
                <option value="ug_arts_sci">UG Arts, Science & Commerce (B.Sc / B.Com / B.A. / BBA / BCA)</option>
                <option value="diploma">Polytechnic / Diploma / ITI</option>
                <option value="school_11_12">Higher Secondary (Class 11 - 12)</option>
                <option value="school_9_10">Secondary School (Class 9 - 10)</option>
                <option value="pg">Postgraduate (M.E. / M.Tech / M.Sc / M.Com / MBA / MCA / MD)</option>
                <option value="phd">Doctorate & Research (Ph.D. / Post-Doc)</option>
                <option value="ug_other">Other Specialized UG Degree (B.Des / B.Ed / Law)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center justify-between gap-1.5 font-display tracking-wide">
                <div className="flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                  <span>Course / Degree Specialization</span>
                </div>
                <span className="text-[10px] font-normal text-slate-500 font-sans">
                  ({availableCourses.length} Programs)
                </span>
              </label>
              <select
                value={profile.courseName}
                onChange={(e) => handleTextChange('courseName', e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#DDD0C0] rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0B1B4F] focus:bg-white font-semibold"
              >
                {availableCourses.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5 font-display tracking-wide">
                <Percent className="w-3.5 h-3.5 text-indigo-600" />
                <span>{t.marks_label}</span>
              </label>
              <input
                type="number"
                step="0.1"
                value={profile.marksPercentage}
                onChange={(e) => handleTextChange('marksPercentage', Number(e.target.value))}
                placeholder="88.5"
                className="w-full bg-[#FAF7F2] border border-[#DDD0C0] rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0B1B4F] focus:bg-white"
              />
            </div>
          </div>

          {/* Row 5: Schooling Background */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2 font-display tracking-wide">
              {t.schooling_label}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {[
                { key: 'govt_school', label: '100% Government School (Class 6 - 12)', sub: 'Qualifies for 7.5% Quota & Pudhumai Penn' },
                { key: 'govt_aided', label: 'Government-Aided School', sub: 'Eligible for Central & State Post-Matric' },
                { key: 'private', label: 'Private / Matric / CBSE School', sub: 'Eligible for Central Sector & Merit Schemes' },
              ].map((item) => {
                const isSelected = profile.schoolingType === item.key;
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => handleTextChange('schoolingType', item.key as SchoolingType)}
                    className={`text-left p-4 rounded-2xl border transition-all ${
                      isSelected
                        ? 'bg-[#FAF2E6] border-[#CA8A04] ring-1 ring-[#CA8A04] shadow-sm'
                        : 'bg-[#FAF7F2] border-[#EDE6DD] hover:border-[#DFC8A5]'
                    }`}
                  >
                    <div className="font-bold text-xs text-[#0B1B4F] mb-1 font-serif">{item.label}</div>
                    <div className="text-[11px] text-slate-500">{item.sub}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Special Statutory Criteria */}
          <div className="pt-6 border-t border-[#EDE6DD]">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#0B1B4F] mb-3.5 flex items-center gap-1.5 font-display">
              <Award className="w-4 h-4 text-amber-700" />
              <span>{t.special_attributes}</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <label className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#FAF7F2] border border-[#EDE6DD] cursor-pointer hover:bg-[#F5ECE0] transition-colors">
                <input
                  type="checkbox"
                  checked={profile.isFirstGraduate}
                  onChange={(e) => handleTextChange('isFirstGraduate', e.target.checked)}
                  className="mt-0.5 rounded text-amber-700 focus:ring-amber-600 h-4 w-4 border-[#DDD0C0]"
                />
                <div>
                  <span className="text-xs font-bold text-slate-900 block font-serif">
                    {t.is_first_graduate}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Required for TN First Graduate Concession (REV-104)
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#FAF7F2] border border-[#EDE6DD] cursor-pointer hover:bg-[#F5ECE0] transition-colors">
                <input
                  type="checkbox"
                  checked={profile.isSpeciallyAbled}
                  onChange={(e) => handleTextChange('isSpeciallyAbled', e.target.checked)}
                  className="mt-0.5 rounded text-amber-700 focus:ring-amber-600 h-4 w-4 border-[#DDD0C0]"
                />
                <div>
                  <span className="text-xs font-bold text-slate-900 block font-serif">
                    {t.is_specially_abled}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Unlocks AICTE Saksham & Divyangjan special quotas
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#FAF7F2] border border-[#EDE6DD] cursor-pointer hover:bg-[#F5ECE0] transition-colors">
                <input
                  type="checkbox"
                  checked={profile.isSingleGirlChild}
                  onChange={(e) => handleTextChange('isSingleGirlChild', e.target.checked)}
                  className="mt-0.5 rounded text-amber-700 focus:ring-amber-600 h-4 w-4 border-[#DDD0C0]"
                />
                <div>
                  <span className="text-xs font-bold text-slate-900 block font-serif">
                    {t.is_single_girl}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Unlocks UGC Single Girl Child Fellowship & Pragati Priority
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#FAF7F2] border border-[#EDE6DD] cursor-pointer hover:bg-[#F5ECE0] transition-colors">
                <input
                  type="checkbox"
                  checked={profile.isOrphan}
                  onChange={(e) => handleTextChange('isOrphan', e.target.checked)}
                  className="mt-0.5 rounded text-amber-700 focus:ring-amber-600 h-4 w-4 border-[#DDD0C0]"
                />
                <div>
                  <span className="text-xs font-bold text-slate-900 block font-serif">
                    {t.is_orphan}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Eligible for special zero-income ceiling welfare concessions
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-10 pt-6 border-t border-[#EDE6DD] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Encrypted in local browser storage under National Privacy Framework</span>
          </div>

          <button
            onClick={onNext}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#0B1B4F] hover:bg-[#142A6F] text-white font-bold text-sm shadow-luxury flex items-center justify-center gap-2.5 transition-all hover:shadow-luxury-lg hover:-translate-y-0.5 cursor-pointer"
          >
            <span className="font-display tracking-wide">{t.save_and_next_inventory}</span>
            <ArrowRight className="w-4 h-4 text-[#F5E29F]" />
          </button>
        </div>
      </div>
    </div>
  );
};
