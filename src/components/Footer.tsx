import React from 'react';
import { ShieldCheck, PhoneCall, ExternalLink, Heart } from 'lucide-react';
import { CIVIC_HELPLINES } from '../data/antiExtortion';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const governmentLogos = [
    { name: 'National Portal of India', sub: 'india.gov.in', icon: '🏛️' },
    { name: 'Digital India', sub: 'Power To Empower', icon: '🇮🇳' },
    { name: 'Make In India', sub: 'National Initiative', icon: '⚙️' },
    { name: 'DigiLocker', sub: 'Document Gateway', icon: '📄' },
    { name: 'PFMS Gateway', sub: 'Public Financial System', icon: '💳' },
    { name: 'NPCI DBT Mapper', sub: 'National Payments', icon: '🏦' },
    { name: 'Incredible India', sub: 'Govt of India', icon: '✨' },
  ];

  return (
    <footer className="mt-20 border-t border-slate-200">
      {/* 1. National Initiatives & Government Logos Marquee (Image 3 Style) */}
      <div className="bg-white py-6 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 text-center mb-4">
            Official Government of India Digital Initiatives & Portals
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {governmentLogos.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-center hover:bg-slate-100 transition-colors shadow-sm"
              >
                <div className="text-xl mb-1">{item.icon}</div>
                <div className="text-[11px] font-bold text-[#0B1B4F] leading-tight line-clamp-1">{item.name}</div>
                <div className="text-[9px] text-slate-500 font-medium">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Multi-tier Deep Navy Government Footer */}
      <div className="bg-[#0B1B4F] text-slate-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Col 1: Emblem & About */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🏛️</span>
                <span className="font-extrabold text-white text-lg tracking-tight font-serif">JanSetu AI</span>
              </div>
              <p className="text-xs leading-relaxed text-slate-300 mb-4">
                National Civic Access Flight Deck & Pre-Flight Audit System. Built for students and citizens to eliminate last-minute administrative rejections.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#142A6F] border border-[#20409A] text-amber-300 text-xs">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100% Client-Side Privacy</span>
              </div>
            </div>

            {/* Col 2: Civic Flight Deck Navigation */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">Portal Navigation</h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <button onClick={() => onNavigate('login')} className="hover:text-white transition-colors">
                    1. Citizen Login & Profile Setup
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('inventory')} className="hover:text-white transition-colors">
                    2. Certificate Inventory Audit
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('dashboard')} className="hover:text-white transition-colors">
                    3. Calculated Scholarships Dashboard
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('grievance')} className="hover:text-white transition-colors text-amber-200">
                    4. 1-Click RTI & Grievance Generator
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('compare')} className="hover:text-white transition-colors text-amber-200">
                    5. Scheme Stacking & Comparison
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('deadlines')} className="hover:text-white transition-colors text-amber-200">
                    6. Live Deadlines Calendar & Alerts
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('audit')} className="hover:text-white transition-colors">
                    7. Pre-Flight Clerical & Banking Audit
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('anti-extortion')} className="hover:text-white transition-colors">
                    8. Anti-Extortion & *99*99# USSD
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Official Portals */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">Verified Gateways</h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <a href="https://scholarships.gov.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-white transition-colors">
                    <span>National Scholarship Portal (NSP)</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                </li>
                <li>
                  <a href="https://www.tnesevai.tn.gov.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-white transition-colors">
                    <span>Tamil Nadu TNeGA e-Sevai</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                </li>
                <li>
                  <a href="https://telanganaepass.cgg.gov.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-white transition-colors">
                    <span>Telangana ePASS Portal</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                </li>
                <li>
                  <a href="https://egrantz.kerala.gov.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-white transition-colors">
                    <span>Kerala E-Grants 3.0</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                </li>
                <li>
                  <a href="https://myaadhaar.uidai.gov.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-white transition-colors">
                    <span>UIDAI myAadhaar Portal</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 4: Grievance Helplines */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">Grievance Helplines</h4>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-lg bg-[#142A6F]/80 border border-[#20409A]">
                  <div className="flex items-center gap-1.5 text-amber-300 font-bold mb-0.5">
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>CM Helpline: 1100</span>
                  </div>
                  <p className="text-[11px] text-slate-300">Report cyber café overcharging & certificate delays.</p>
                </div>
                <div className="p-2.5 rounded-lg bg-[#142A6F]/80 border border-[#20409A]">
                  <div className="flex items-center gap-1.5 text-emerald-300 font-bold mb-0.5">
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>NSP Helpdesk: 0120-6619540</span>
                  </div>
                  <p className="text-[11px] text-slate-300">Technical OTR & PFMS verification support.</p>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Bottom Legal Bar */}
          <div className="border-t border-[#142A6F] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
            <p>
              Website Designed and Maintained for the Citizens of India • Non-Commercial Public Good Civic Technology.
            </p>
            <div className="flex items-center gap-4 text-[11px]">
              <span>Terms of Service</span>
              <span>•</span>
              <span>Privacy Policy</span>
              <span>•</span>
              <span>Right to Information (RTI)</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
