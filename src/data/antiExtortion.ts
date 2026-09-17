export interface ExtortionRateItem {
  serviceName: string;
  department: string;
  statutoryOfficialFee: string;
  statutorySlaDays: string;
  cyberCafeExtortionRate: string;
  officialPortal: string;
  legalNote: string;
}

export const EXTORTION_RATE_CARD: ExtortionRateItem[] = [
  {
    serviceName: 'NSP Online Scholarship Application Entry',
    department: 'Ministry of Education / MoSJE',
    statutoryOfficialFee: '₹0 (Completely Free)',
    statutorySlaDays: 'Instant',
    cyberCafeExtortionRate: '₹200 - ₹500 per application',
    officialPortal: 'https://scholarships.gov.in',
    legalNote: 'Central government scholarship registration is 100% free under National e-Governance standards.'
  },
  {
    serviceName: 'First Graduate Certificate (REV-104)',
    department: 'Revenue Dept / Tahsildar',
    statutoryOfficialFee: '₹60 (e-Sevai Capped Fee)',
    statutorySlaDays: '15 Working Days',
    cyberCafeExtortionRate: '₹350 - ₹600',
    officialPortal: 'https://www.tnesevai.tn.gov.in',
    legalNote: 'TNeGA statutory service charge is fixed at ₹60 inclusive of GST across all authorized centers.'
  },
  {
    serviceName: 'Annual Income Certificate (REV-101)',
    department: 'Revenue Dept / e-District',
    statutoryOfficialFee: '₹60 (e-Sevai / MeeSeva)',
    statutorySlaDays: '8 Working Days',
    cyberCafeExtortionRate: '₹200 - ₹400',
    officialPortal: 'https://edistrict.gov.in',
    legalNote: 'Issuing officer is mandated under Right to Public Services Act to deliver within SLA or face statutory penalty.'
  },
  {
    serviceName: 'NPCI Aadhaar DBT Seeding at Bank Branch',
    department: 'Reserve Bank of India / NPCI',
    statutoryOfficialFee: '₹0 (Completely Free)',
    statutorySlaDays: '48 Hours (2 Business Days)',
    cyberCafeExtortionRate: '₹150 - ₹300 (Fake online status claims)',
    officialPortal: 'https://myaadhaar.uidai.gov.in',
    legalNote: 'Banks are strictly prohibited by RBI guidelines from charging any fee for Aadhaar Seeding / Mandate registration.'
  },
  {
    serviceName: '7.5% Govt School Continuous Study Certificate',
    department: 'School Education Dept (Headmaster)',
    statutoryOfficialFee: '₹0 (Completely Free)',
    statutorySlaDays: '3 Working Days',
    cyberCafeExtortionRate: '₹100 - ₹250',
    officialPortal: 'https://emis.tnschools.gov.in',
    legalNote: 'Issued directly by the Headmaster of the concerned Government High School with no fee whatsoever.'
  }
];

export interface CivicHelpline {
  title: string;
  number: string;
  scope: string;
  description: string;
  timings: string;
}

export const CIVIC_HELPLINES: CivicHelpline[] = [
  {
    title: 'Chief Minister\'s Citizen Grievance Helpline (CM Helpline)',
    number: '1100',
    scope: 'State Government (Toll-Free)',
    description: 'Report cyber café overcharging, delay in certificate issuance beyond SLA, or corrupt demands.',
    timings: '24x7 All Days'
  },
  {
    title: 'National Scholarship Portal (NSP) Helpdesk',
    number: '0120-6619540',
    scope: 'Central Schemes & Technical Support',
    description: 'Assistance for OTR registration, Institute Biometric Authentication, and PFMS tracking.',
    timings: '8:00 AM to 8:00 PM'
  },
  {
    title: 'School Education Student Helpline',
    number: '14417',
    scope: 'School & Higher Education Access',
    description: 'Guidance on 7.5% Government School Quota, EMIS validation, and Pudhumai Penn verification.',
    timings: '24x7 Toll-Free'
  },
  {
    title: 'Anti-Corruption Bureau (Vigilance & Anti-Corruption)',
    number: '1064 / 1800-425-12345',
    scope: 'Bribery & Illegal Demand Complaints',
    description: 'File immediate complaint if any middleman or official demands bribe for statutory certificates.',
    timings: '24x7 Official'
  },
  {
    title: 'UIDAI Aadhaar Citizen Helpline',
    number: '1947',
    scope: 'Aadhaar Demographic & Mobile Update',
    description: 'Check Aadhaar name correction status, locate nearest official Aadhaar Seva Kendra.',
    timings: '24x7 Toll-Free'
  }
];

export interface UssdOption {
  code: string;
  name: string;
  purpose: string;
  instructions: string;
}

export const USSD_FALLBACK_CODES: UssdOption[] = [
  {
    code: '*99*99#',
    name: 'NPCI National Aadhaar-Bank Seeding Status Check',
    purpose: 'Check which bank account is actively mapped on the NPCI DBT gateway for government welfare.',
    instructions: 'Dial *99*99# on any basic keypad phone from your Aadhaar-linked SIM, enter your 12-digit Aadhaar number, and view your active seeded bank account.'
  },
  {
    code: '*99#',
    name: 'NUUP National Basic Mobile Banking (Offline)',
    purpose: 'Check bank account balance, mini-statement, and fund transfers without internet or smartphone.',
    instructions: 'Dial *99#, select your bank short-code (e.g. SBI, CAN, UBI), and enter your last 4 digits of account number.'
  }
];
