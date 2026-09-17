import { CitizenProfile } from '../types/profile';
import { CertificateInventory } from '../types/certificate';

export interface PersonaPreset {
  id: string;
  name: string;
  badge: string;
  tagline: string;
  state: string;
  profile: CitizenProfile;
  inventory: CertificateInventory;
  expectedOutcome: string;
}

export const PERSONA_PRESETS: PersonaPreset[] = [
  {
    id: 'priya-tn',
    name: 'Priya Sundaram',
    badge: 'Tamil Nadu • Govt School Girl • 1st Gen Engg',
    tagline: 'Qualifies for Pudhumai Penn (₹1,000/mo), 7.5% Quota (100% Free), & First Graduate; missing First Graduate (REV-104) cert.',
    state: 'Tamil Nadu',
    profile: {
      fullName: 'Priya Sundaram',
      aadhaarLast4: '4829',
      stateOfDomicile: 'Tamil Nadu',
      district: 'Madurai',
      gender: 'female',
      category: 'MBC',
      annualIncome: 180000,
      courseLevel: 'ug_engg',
      courseName: 'B.E. Computer Science',
      marksPercentage: 88.5,
      schoolingType: 'govt_school',
      isFirstGraduate: true,
      isSpeciallyAbled: false,
      isSingleGirlChild: true,
      isOrphan: false,
      bankName: 'State Bank of India',
      bankAccountNumber: '39485729104',
      bankIfsc: 'SBIN0001234'
    },
    inventory: {
      aadhaarCard: true,
      marksheet10th12th: true,
      incomeCertificate: true,
      communityCertificate: true,
      nativityCertificate: true,
      firstGraduateCertificate: false, // MISSING - TRAP!
      govtSchool7_5Certificate: true,
      bonafideCertificate: true,
      bankPassbookNPCI: true,
      rationCard: true,
      disabilityCertificate: false
    },
    expectedOutcome: 'Eligible for ₹1,12,000 total benefits. Missing First Graduate Certificate (REV-104) triggers amber roadmap.'
  },

  {
    id: 'ravi-ts',
    name: 'Ravi Teja Varma',
    badge: 'Telangana • OBC B.Tech • ePASS & Central Sector',
    tagline: 'Qualifies for Telangana ePASS RTF + Central Sector Scholarship (CSSS); all documents ready!',
    state: 'Telangana',
    profile: {
      fullName: 'Ravi Teja Varma',
      aadhaarLast4: '7721',
      stateOfDomicile: 'Telangana',
      district: 'Warangal',
      gender: 'male',
      category: 'OBC',
      annualIncome: 140000,
      courseLevel: 'ug_engg',
      courseName: 'B.Tech Mechanical Engg',
      marksPercentage: 86.0,
      schoolingType: 'govt_aided',
      isFirstGraduate: false,
      isSpeciallyAbled: false,
      isSingleGirlChild: false,
      isOrphan: false,
      bankName: 'Union Bank of India',
      bankAccountNumber: '49583726194',
      bankIfsc: 'UBIN0543210'
    },
    inventory: {
      aadhaarCard: true,
      marksheet10th12th: true,
      incomeCertificate: true,
      communityCertificate: true,
      nativityCertificate: true,
      firstGraduateCertificate: false,
      govtSchool7_5Certificate: false,
      bonafideCertificate: true,
      bankPassbookNPCI: true,
      rationCard: true,
      disabilityCertificate: false
    },
    expectedOutcome: '100% Ready to Apply for Telangana ePASS & Central Sector PM-USP.'
  },

  {
    id: 'arjun-kl',
    name: 'Arjun K. Nair',
    badge: 'Kerala • SC Medical Student • E-Grants 3.0',
    tagline: 'Qualifies for Kerala E-Grants 3.0 (Full Tuition + Pocket Money) & Central SC Post-Matric.',
    state: 'Kerala',
    profile: {
      fullName: 'Arjun K. Nair',
      aadhaarLast4: '9102',
      stateOfDomicile: 'Kerala',
      district: 'Kozhikode',
      gender: 'male',
      category: 'SC',
      annualIncome: 120000,
      courseLevel: 'ug_med',
      courseName: 'MBBS - Govt Medical College',
      marksPercentage: 92.4,
      schoolingType: 'govt_school',
      isFirstGraduate: true,
      isSpeciallyAbled: false,
      isSingleGirlChild: false,
      isOrphan: false,
      bankName: 'Canara Bank',
      bankAccountNumber: '10293847561',
      bankIfsc: 'CNRB0002345'
    },
    inventory: {
      aadhaarCard: true,
      marksheet10th12th: true,
      incomeCertificate: true,
      communityCertificate: true,
      nativityCertificate: true,
      firstGraduateCertificate: false,
      govtSchool7_5Certificate: true,
      bonafideCertificate: true,
      bankPassbookNPCI: true,
      rationCard: true,
      disabilityCertificate: false
    },
    expectedOutcome: 'Eligible for Kerala E-Grants 3.0 & Central Post-Matric SC with full fee waiver.'
  },

  {
    id: 'pooja-up',
    name: 'Pooja Kumari',
    badge: 'Uttar Pradesh • Rural Student • Missing Income Cert & Name Mismatch',
    tagline: 'Income cert missing + Aadhaar has "Pooja Devi" vs Marksheet "Pooja Kumari". Pre-Flight audit flags silent rejection!',
    state: 'Uttar Pradesh',
    profile: {
      fullName: 'Pooja Kumari',
      aadhaarLast4: '3349',
      stateOfDomicile: 'Uttar Pradesh',
      district: 'Varanasi',
      gender: 'female',
      category: 'OBC',
      annualIncome: 160000,
      courseLevel: 'ug_arts_sci',
      courseName: 'B.Sc Physics',
      marksPercentage: 74.0,
      schoolingType: 'govt_school',
      isFirstGraduate: true,
      isSpeciallyAbled: false,
      isSingleGirlChild: false,
      isOrphan: false,
      bankName: 'Bank of Baroda',
      bankAccountNumber: '98765432101',
      bankIfsc: 'BARB0VARANA'
    },
    inventory: {
      aadhaarCard: true,
      marksheet10th12th: true,
      incomeCertificate: false, // MISSING
      communityCertificate: true,
      nativityCertificate: true,
      firstGraduateCertificate: false,
      govtSchool7_5Certificate: true,
      bonafideCertificate: true,
      bankPassbookNPCI: false, // MISSING DBT SEEDING
      rationCard: true,
      disabilityCertificate: false
    },
    expectedOutcome: 'Conditionally eligible for UP Scholarship & PM-YASASVI. Flags clerical discrepancy & missing income cert.'
  }
];
