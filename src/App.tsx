import React, { useState, useEffect } from 'react';
import { CitizenProfile, DEFAULT_PROFILE } from './types/profile';
import { CertificateInventory, CertificateKey, DEFAULT_INVENTORY } from './types/certificate';
import { SchemeDefinition, EvaluationResult } from './types/scheme';
import { Language } from './types/language';
import { EligibilityEngine } from './engine/eligibilityEngine';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LoginPage } from './pages/LoginPage';
import { InventoryPage } from './pages/InventoryPage';
import { DashboardPage } from './pages/DashboardPage';
import { CertificateRoadmapPage } from './pages/CertificateRoadmapPage';
import { SchemeCockpitPage } from './pages/SchemeCockpitPage';
import { PreFlightAuditPage } from './pages/PreFlightAuditPage';
import { AntiExtortionPage } from './pages/AntiExtortionPage';
import confetti from 'canvas-confetti';

export function App() {
  // 1. Language State
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('jansetu_lang');
    return (saved as Language) || 'en';
  });

  // 2. Citizen Profile State
  const [profile, setProfile] = useState<CitizenProfile>(() => {
    const saved = localStorage.getItem('jansetu_profile');
    return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
  });

  // 3. Document Inventory State
  const [inventory, setInventory] = useState<CertificateInventory>(() => {
    const saved = localStorage.getItem('jansetu_inventory');
    return saved ? JSON.parse(saved) : DEFAULT_INVENTORY;
  });

  // 4. Current Dedicated Page Navigation State
  const [currentPage, setCurrentPage] = useState<string>('login');

  // 5. Selected Sub-Items for Dedicated Pages
  const [selectedRoadmapCert, setSelectedRoadmapCert] = useState<CertificateKey>('firstGraduateCertificate');
  const [selectedCockpitScheme, setSelectedCockpitScheme] = useState<SchemeDefinition | null>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('jansetu_lang', currentLanguage);
  }, [currentLanguage]);

  useEffect(() => {
    localStorage.setItem('jansetu_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('jansetu_inventory', JSON.stringify(inventory));
  }, [inventory]);

  // Run Deterministic Eligibility Calculation
  const results: EvaluationResult[] = EligibilityEngine.evaluateAllSchemes(profile, inventory);

  // Document Readiness Calculation
  const certKeys = Object.keys(inventory) as CertificateKey[];
  const heldCount = certKeys.filter(k => inventory[k]).length;
  const readinessPercentage = Math.round((heldCount / certKeys.length) * 100);

  // Handlers
  const handleLanguageChange = (lang: Language) => {
    setCurrentLanguage(lang);
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenRoadmap = (certKey: CertificateKey) => {
    setSelectedRoadmapCert(certKey);
    setCurrentPage('certificate-roadmap');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCockpit = (scheme: SchemeDefinition) => {
    setSelectedCockpitScheme(scheme);
    setCurrentPage('scheme-cockpit');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCalculateFromInventory = () => {
    setCurrentPage('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans">
      {/* Sovereign Header */}
      <Header
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
        currentPage={currentPage}
        onNavigate={handleNavigate}
        readinessPercentage={readinessPercentage}
      />

      {/* Main Dedicated Page Viewport */}
      <main className="flex-grow">
        {currentPage === 'login' && (
          <LoginPage
            profile={profile}
            onUpdateProfile={setProfile}
            onUpdateInventory={setInventory}
            onNext={() => handleNavigate('inventory')}
            currentLanguage={currentLanguage}
          />
        )}

        {currentPage === 'inventory' && (
          <InventoryPage
            inventory={inventory}
            onUpdateInventory={setInventory}
            onCalculate={handleCalculateFromInventory}
            onBack={() => handleNavigate('login')}
            currentLanguage={currentLanguage}
            onViewRoadmap={handleOpenRoadmap}
          />
        )}

        {currentPage === 'dashboard' && (
          <DashboardPage
            profile={profile}
            inventory={inventory}
            results={results}
            currentLanguage={currentLanguage}
            onOpenCockpit={handleOpenCockpit}
            onViewRoadmap={handleOpenRoadmap}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'certificate-roadmap' && (
          <CertificateRoadmapPage
            certKey={selectedRoadmapCert}
            currentLanguage={currentLanguage}
            onBack={() => handleNavigate('dashboard')}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'scheme-cockpit' && selectedCockpitScheme && (
          <SchemeCockpitPage
            scheme={selectedCockpitScheme}
            inventory={inventory}
            currentLanguage={currentLanguage}
            onBack={() => handleNavigate('dashboard')}
            onViewRoadmap={handleOpenRoadmap}
          />
        )}

        {currentPage === 'audit' && (
          <PreFlightAuditPage
            profile={profile}
            currentLanguage={currentLanguage}
            onBack={() => handleNavigate('dashboard')}
          />
        )}

        {currentPage === 'anti-extortion' && (
          <AntiExtortionPage
            currentLanguage={currentLanguage}
            onBack={() => handleNavigate('dashboard')}
          />
        )}
      </main>

      {/* Official Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
