import { SchemeDefinition } from '../types/scheme';

export const CENTRAL_SCHEMES: SchemeDefinition[] = [
  {
    id: 'nsp-csss',
    code: 'CSSS-PM-USP',
    name: 'Central Sector Scheme of Scholarship for College and University Students (PM-USP)',
    nameTranslations: {
      en: 'Central Sector Scheme of Scholarship (PM-USP)',
      hi: 'कॉलेज और विश्वविद्यालय के छात्रों के लिए केंद्रीय क्षेत्र छात्रवृत्ति योजना (PM-USP)',
      te: 'కాలేజ్ & యూనివర్సిటీ విద్యార్థుల కోసం సెంట్రల్ సెక్టార్ స్కాలర్‌షిప్ (PM-USP)',
      ta: 'கல்லூரி மற்றும் பல்கலைக்கழக மாணவர்களுக்கான மத்திய துறை உதவித்தொகை (PM-USP)',
      ml: 'കോളേജ് വിദ്യാർത്ഥികൾക്കായുള്ള സെൻട്രൽ സെക്ടർ സ്കോളർഷിപ്പ് (PM-USP)'
    },
    shortDescription: 'Merit-cum-means scholarship for top 20th percentile Class 12 board pass-outs pursuing regular graduation / professional degrees.',
    authority: 'Department of Higher Education, Ministry of Education, Govt of India',
    level: 'central',
    benefitAmount: '₹12,000 / year (UG) & ₹20,000 / year (PG)',
    benefitAmountAnnualNumeric: 12000,
    benefitType: 'cash_dbt',
    officialPortalUrl: 'https://scholarships.gov.in',
    portalName: 'National Scholarship Portal (NSP)',
    applicationClosingDate: '2026-11-30',
    requiredCertificates: [
      'aadhaarCard',
      'marksheet10th12th',
      'incomeCertificate',
      'bonafideCertificate',
      'bankPassbookNPCI'
    ],
    criteria: {
      maxAnnualIncome: 450000,
      minMarksPercentage: 80.0,
      allowedCourseLevels: ['ug_engg', 'ug_med', 'ug_arts_sci', 'ug_other', 'pg']
    },
    legalGazetteClause: 'Clause 3.1: Student must have scored above 80th percentile in relevant stream in Class 12 board examination and family annual income must not exceed ₹4,50,000.',
    workflowStages: [
      {
        stageNumber: 1,
        title: 'NSP OTR & Application Submission',
        department: 'NSP Portal',
        description: 'Citizen completes Aadhaar One-Time Registration (OTR) and submits online application with fee receipt.',
        estimatedDays: '1 Day'
      },
      {
        stageNumber: 2,
        title: 'Institute Nodal Officer (INO) Verification',
        department: 'College Authority',
        description: 'College INO logs into NSP portal using biometric credentials and verifies student enrollment and regular attendance.',
        estimatedDays: '7 - 14 Days',
        warningAlert: 'Remind your College Scholarship Nodal Officer before the institutional deadline.'
      },
      {
        stageNumber: 3,
        title: 'State Nodal Officer (SNO) Merit Quota Allocation',
        department: 'State Directorate of Collegiate Education',
        description: 'State Board generates percentile quota merit list based on CBSE/State board results.',
        estimatedDays: '15 - 30 Days'
      },
      {
        stageNumber: 4,
        title: 'PFMS Sanction File Creation',
        department: 'Public Financial Management System (PFMS)',
        description: 'Treasury creates digital payment sanction files and validates bank account mapper.',
        estimatedDays: '10 Days'
      },
      {
        stageNumber: 5,
        title: 'Direct Benefit Transfer (DBT) via NPCI',
        department: 'Reserve Bank of India / Beneficiary Bank',
        description: 'Funds credited directly to Aadhaar-seeded bank account.',
        estimatedDays: '3 - 5 Days'
      }
    ]
  },

  {
    id: 'aicte-pragati',
    code: 'AICTE-PRAGATI',
    name: 'AICTE Pragati Scholarship Scheme for Girl Students (Technical Degree & Diploma)',
    nameTranslations: {
      en: 'AICTE Pragati Scholarship for Girls (Technical UG / Diploma)',
      hi: 'बालिकाओं के लिए एआईसीटीई प्रगति छात्रवृत्ति (तकनीकी यूजी / डिप्लोमा)',
      te: 'బాలికల కోసం AICTE ప్రగతి స్కాలర్‌షిప్ (టెక్నికల్ డిగ్రీ & డిప్లొమా)',
      ta: 'மாணவிகளுக்கான AICTE பிரகதி உதவித்தொகை (பொறியியல் & பட்டயப்படிப்பு)',
      ml: 'പെൺകുട്ടികൾക്കായുള്ള എഐസിടിഇ പ്രഗതി സ്കോളർഷിപ്പ്'
    },
    shortDescription: 'Empowering young women in AICTE-approved technical institutions with ₹50,000 per annum contingency allowance.',
    authority: 'All India Council for Technical Education (AICTE), Ministry of Education',
    level: 'central',
    benefitAmount: '₹50,000 / annum (Throughout 4 years)',
    benefitAmountAnnualNumeric: 50000,
    benefitType: 'cash_dbt',
    officialPortalUrl: 'https://scholarships.gov.in',
    portalName: 'National Scholarship Portal / AICTE Portal',
    applicationClosingDate: '2026-10-31',
    requiredCertificates: [
      'aadhaarCard',
      'marksheet10th12th',
      'incomeCertificate',
      'bonafideCertificate',
      'bankPassbookNPCI',
      'rationCard'
    ],
    criteria: {
      maxAnnualIncome: 800000,
      allowedGenders: ['female'],
      allowedCourseLevels: ['ug_engg', 'diploma']
    },
    legalGazetteClause: 'AICTE Act Section 10(1): Admitted to 1st year of Degree/Diploma course in AICTE approved institution. Maximum 2 girl children per family eligible with family income ceiling of ₹8,00,000.',
    workflowStages: [
      {
        stageNumber: 1,
        title: 'NSP Portal Online Submission',
        department: 'NSP / AICTE',
        description: 'Submit admission allotment letter, AICTE college approval code, and family declaration.',
        estimatedDays: '1 Day'
      },
      {
        stageNumber: 2,
        title: 'AICTE Institute Biometric Verification',
        department: 'Principal of AICTE Approved College',
        description: 'College confirms student is admitted through centralized counseling or legitimate quota.',
        estimatedDays: '10 Days'
      },
      {
        stageNumber: 3,
        title: 'AICTE Headquarters Merit Sanction',
        department: 'AICTE New Delhi',
        description: 'Selection of up to 10,000 girl students across India under State/UT quota.',
        estimatedDays: '20 Days'
      },
      {
        stageNumber: 4,
        title: 'DBT Credit via PFMS',
        department: 'PFMS / Canara Bank Nodal Gateway',
        description: 'Direct credit of ₹50,000 to student’s individual bank account.',
        estimatedDays: '7 Days'
      }
    ]
  },

  {
    id: 'mosje-post-matric-sc',
    code: 'PMS-SC-CENTRAL',
    name: 'Centrally Sponsored Post-Matric Scholarship for SC Students',
    nameTranslations: {
      en: 'Centrally Sponsored Post-Matric Scholarship for SC Students',
      hi: 'अनुसूचित जाति के छात्रों के लिए केंद्र प्रायोजित पोस्ट-मैट्रिक छात्रवृत्ति',
      te: 'SC విద్యార్థుల కోసం కేంద్ర ప్రాయోజిత పోస్ట్-మెట్రిక్ స్కాలర్‌షిప్',
      ta: 'மத்திய அரசின் ஆதிதிராவிடர் மாணவர்களுக்கான போஸ்ட்-மெட்ரிக் உதவித்தொகை',
      ml: 'പട്ടികജാതി വിദ്യാർത്ഥികൾക്കായുള്ള പോസ്റ്റ്-മെട്രിക് സ്കോളർഷിപ്പ്'
    },
    shortDescription: 'Complete non-refundable compulsory fee reimbursement and maintenance allowance for SC students in post-matric courses.',
    authority: 'Ministry of Social Justice and Empowerment (MoSJE), Govt of India',
    level: 'central',
    benefitAmount: '100% Tuition Fee Reimbursement + ₹13,500/yr Maintenance Allowance',
    benefitAmountAnnualNumeric: 45000,
    benefitType: 'cash_dbt',
    officialPortalUrl: 'https://scholarships.gov.in',
    portalName: 'National Scholarship Portal / State Welfare Portals',
    applicationClosingDate: '2026-12-15',
    requiredCertificates: [
      'aadhaarCard',
      'marksheet10th12th',
      'incomeCertificate',
      'communityCertificate',
      'bonafideCertificate',
      'bankPassbookNPCI'
    ],
    criteria: {
      maxAnnualIncome: 250000,
      allowedCategories: ['SC'],
      allowedCourseLevels: ['diploma', 'ug_engg', 'ug_med', 'ug_arts_sci', 'ug_other', 'pg', 'phd']
    },
    legalGazetteClause: 'MoSJE Guidelines 2020-21 to 2025-26: SC students with annual parental income not exceeding ₹2.50 lakh per annum. 60:40 fund sharing between Centre and State.',
    workflowStages: [
      {
        stageNumber: 1,
        title: 'State Portal / NSP Online Entry',
        department: 'Welfare Department',
        description: 'Upload community certificate and fee receipts.',
        estimatedDays: '2 Days'
      },
      {
        stageNumber: 2,
        title: 'College & District Welfare Officer Verification',
        department: 'District Adi Dravidar Welfare Office',
        description: 'Audit of college non-refundable fee structure and physical student presence.',
        estimatedDays: '15 Days'
      },
      {
        stageNumber: 3,
        title: 'Free-ship Card / Sanction Generation',
        department: 'State Treasury',
        description: 'Generation of institutional tuition voucher and student maintenance order.',
        estimatedDays: '15 Days'
      },
      {
        stageNumber: 4,
        title: 'DBT Payment via PFMS',
        department: 'PFMS Treasury Push',
        description: 'Maintenance allowance deposited into bank account.',
        estimatedDays: '7 Days'
      }
    ]
  },

  {
    id: 'dst-inspire-she',
    code: 'INSPIRE-SHE',
    name: 'INSPIRE Scholarship for Higher Education (SHE) - Natural & Basic Sciences',
    nameTranslations: {
      en: 'DST INSPIRE Scholarship for Higher Education (SHE)',
      hi: 'डीएसटी इंस्पायर उच्च शिक्षा छात्रवृत्ति (SHE)',
      te: 'ఉన్నత విద్య కోసం DST ఇన్‌స్పైర్ స్కాలర్‌షిప్ (SHE)',
      ta: 'அறிவியல் மாணவர்களுக்கான DST இன்ஸ்பையர் உதவித்தொகை (SHE)',
      ml: 'ഡിഎസ്ടി ഇൻസ്പയർ സ്കോളർഷിപ്പ് (SHE)'
    },
    shortDescription: 'Generous ₹80,000 per annum scholarship for top 1% Class 12 scorers pursuing B.Sc / B.S. / Int. M.Sc in Natural Sciences.',
    authority: 'Department of Science and Technology (DST), Govt of India',
    level: 'central',
    benefitAmount: '₹80,000 / year (₹60,000 cash + ₹20,000 mentorship)',
    benefitAmountAnnualNumeric: 80000,
    benefitType: 'fellowship',
    officialPortalUrl: 'https://online-inspire.gov.in',
    portalName: 'DST INSPIRE Web Portal',
    applicationClosingDate: '2026-11-15',
    requiredCertificates: [
      'aadhaarCard',
      'marksheet10th12th',
      'bonafideCertificate',
      'bankPassbookNPCI'
    ],
    criteria: {
      minMarksPercentage: 90.0,
      allowedCourseLevels: ['ug_arts_sci']
    },
    legalGazetteClause: 'DST INSPIRE Guidelines: Must fall within top 1% of the respective Class 12 board examination and enrolled in Natural / Basic Sciences at B.Sc level.',
    workflowStages: [
      {
        stageNumber: 1,
        title: 'INSPIRE Portal Registration',
        department: 'DST Portal',
        description: 'Upload advisory/eligibility note issued by Class 12 board.',
        estimatedDays: '2 Days'
      },
      {
        stageNumber: 2,
        title: 'DST Screening Committee Review',
        department: 'DST New Delhi',
        description: 'Evaluation of basic science course eligibility (Maths, Physics, Chem, Bio).',
        estimatedDays: '30 Days'
      },
      {
        stageNumber: 3,
        title: 'Direct Bank Credit of ₹80,000',
        department: 'SBI Main Branch / PFMS',
        description: 'Annual installment transferred through direct treasury gateway.',
        estimatedDays: '15 Days'
      }
    ]
  },

  {
    id: 'pm-yasasvi',
    code: 'PM-YASASVI',
    name: 'PM Young Achievers Scholarship Award Scheme for Vibrant India (PM-YASASVI)',
    nameTranslations: {
      en: 'PM-YASASVI Scholarship for OBC, EBC & DNT Students',
      hi: 'पीएम यशस्वी छात्रवृत्ति योजना (OBC, EBC और DNT)',
      te: 'OBC, EBC & DNT విద్యార్థుల కోసం PM-యశస్వి స్కాలర్‌షిప్',
      ta: 'OBC, EBC & DNT மாணவர்களுக்கான PM-யசஸ்வி உதவித்தொகை',
      ml: 'പിഎം യശസ്വി സ്കോളർഷിപ്പ് പദ്ധതി'
    },
    shortDescription: 'National merit scholarship for Other Backward Classes (OBC), Economically Backward Classes (EBC) and De-Notified Tribes (DNT).',
    authority: 'Ministry of Social Justice and Empowerment / NTA',
    level: 'central',
    benefitAmount: 'Up to ₹1,25,000 / year (School & Top Class College)',
    benefitAmountAnnualNumeric: 75000,
    benefitType: 'cash_dbt',
    officialPortalUrl: 'https://scholarships.gov.in',
    portalName: 'National Scholarship Portal',
    applicationClosingDate: '2026-10-25',
    requiredCertificates: [
      'aadhaarCard',
      'marksheet10th12th',
      'incomeCertificate',
      'communityCertificate',
      'bonafideCertificate',
      'bankPassbookNPCI'
    ],
    criteria: {
      maxAnnualIncome: 250000,
      allowedCategories: ['OBC', 'EWS'],
      allowedCourseLevels: ['school_9_10', 'school_11_12', 'ug_engg', 'ug_med', 'ug_arts_sci', 'ug_other']
    },
    legalGazetteClause: 'PM-YASASVI Scheme Framework: Applicable for OBC/EBC/DNT students with annual family income not exceeding ₹2,50,000 per annum studying in notified Top Class institutions.',
    workflowStages: [
      {
        stageNumber: 1,
        title: 'NSP Online Application Entry',
        department: 'NSP Portal',
        description: 'Complete registration with OTR and submit caste authenticity details.',
        estimatedDays: '1 Day'
      },
      {
        stageNumber: 2,
        title: 'State Welfare Officer Scrutiny',
        department: 'Backward Classes Welfare Dept',
        description: 'Verification against state OBC master list.',
        estimatedDays: '14 Days'
      },
      {
        stageNumber: 3,
        title: 'PFMS DBT Treasury Disbursement',
        department: 'MoSJE / PFMS',
        description: 'Direct payment to student account.',
        estimatedDays: '10 Days'
      }
    ]
  }
];
