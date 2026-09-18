import { SchemeDefinition } from '../types/scheme';

export const STATE_SCHEMES: SchemeDefinition[] = [
  // TAMIL NADU SCHEMES
  {
    id: 'tn-pudhumai-penn',
    code: 'TN-PUDHUMAI-PENN',
    name: 'Moovalur Ramamirtham Ammaiyar Higher Education Assurance Scheme (Pudhumai Penn)',
    nameTranslations: {
      en: 'Pudhumai Penn Scheme (₹1,000/month for Govt School Girls)',
      hi: 'पुधुमई पेन योजना (सरकारी स्कूल की छात्राओं के लिए ₹1,000/माह)',
      te: 'పుదుమై పెన్ పథకం (ప్రభుత్వ పాఠశాల విద్యార్థినులకు నెలకు ₹1,000)',
      ta: 'புதுமைப் பெண் திட்டம் (அரசுப் பள்ளி மாணவிகளுக்கு மாதம் ₹1,000)',
      ml: 'പുതുമൈ പെൺ പദ്ധതി (ഗവ. സ്കൂൾ വിദ്യാർത്ഥിനികൾക്ക് പ്രതിമാസം ₹1,000)'
    },
    shortDescription: '₹1,000 monthly financial deposit directly into bank accounts of girl students who studied Classes 6 to 12 in Tamil Nadu Government Schools pursuing UG degrees.',
    authority: 'Social Welfare and Women Empowerment Department, Govt of Tamil Nadu',
    level: 'state',
    state: 'Tamil Nadu',
    benefitAmount: '₹1,000 / month (₹12,000 per year DBT)',
    benefitAmountAnnualNumeric: 12000,
    benefitType: 'cash_dbt',
    officialPortalUrl: 'https://penkalvi.tn.gov.in',
    portalName: 'Pudhumai Penn Official Portal',
    applicationClosingDate: '2026-10-31',
    requiredCertificates: [
      'aadhaarCard',
      'marksheet10th12th',
      'govtSchool7_5Certificate',
      'bonafideCertificate',
      'bankPassbookNPCI',
      'rationCard'
    ],
    criteria: {
      allowedGenders: ['female'],
      requiresGovtSchool: true,
      allowedCourseLevels: ['diploma', 'ug_engg', 'ug_med', 'ug_arts_sci', 'ug_other'],
      applicableStates: ['Tamil Nadu']
    },
    legalGazetteClause: 'G.O. (Ms) No. 37, Social Welfare Dept: Girl students who studied Classes 6 to 12 in Tamil Nadu Government Schools (including Corporation, Municipal, Adi Dravidar, Tribal, Forest & Kallar Reclamation schools) and enrolled in higher education.',
    workflowStages: [
      {
        stageNumber: 1,
        title: 'College EMIS Portal Student Entry',
        department: 'College EMIS Coordinator',
        description: 'College uploads student Class 12 EMIS ID and Aadhaar number to verify continuous Govt School education from Class 6 to 12.',
        estimatedDays: '3 Days'
      },
      {
        stageNumber: 2,
        title: 'School Education Dept Automated EMIS Cross-Verification',
        department: 'TNeGA & School Education EMIS Gateway',
        description: 'Automated digital verification of school study records without needing physical running around.',
        estimatedDays: '5 Days'
      },
      {
        stageNumber: 3,
        title: 'District Social Welfare Officer (DSWO) Sanction',
        department: 'District Collectorate / DSWO',
        description: 'Official grant approval and inclusion into monthly treasury payroll.',
        estimatedDays: '7 Days'
      },
      {
        stageNumber: 4,
        title: 'Monthly DBT Credit to Bank Account (7th of every month)',
        department: 'Indian Bank / Canara Bank Nodal DBT',
        description: 'Monthly ₹1,000 credit until completion of undergraduate course.',
        estimatedDays: 'Monthly'
      }
    ],
    navigationGuide: {
      applicationMode: 'college_nodal_officer',
      otrRegistrationUrl: 'https://penkalvi.tn.gov.in',
      applicantLoginUrl: 'https://penkalvi.tn.gov.in',
      searchKeyword: 'Moovalur Ramamirtham Ammaiyar Pudhumai Penn Scheme',
      portalMenuHierarchy: ['Pudhumai Penn Home', 'Institution Login (By College)', 'Upload Student EMIS ID & Aadhaar'],
      requiredUploadSpecs: [
        { documentName: 'Class 6-12 Govt School Study Certificate (Annexure-III)', allowedFormats: 'PDF', maxFileSize: '< 200 KB' },
        { documentName: 'Student Aadhaar & Bank Passbook Front Page', allowedFormats: 'PDF, JPEG', maxFileSize: '< 200 KB' }
      ],
      postSubmissionAction: 'Hand over your School TC & Annexure-III Certificate to your College Pudhumai Penn Nodal Staff. Students do NOT need to apply independently at cyber cafes.'
    }
  },

  {
    id: 'tn-first-graduate',
    code: 'TN-FIRST-GRAD',
    name: 'Tamil Nadu First Graduate Tuition Fee Concession Scheme (REV-104)',
    nameTranslations: {
      en: 'First Graduate Tuition Fee Concession (REV-104)',
      hi: 'प्रथम स्नातक शिक्षण शुल्क छूट योजना (REV-104)',
      te: 'తమిళనాడు మొదటి గ్రాడ్యుయేట్ ఫీజు రాయితీ పథకం',
      ta: 'முதல் பட்டதாரி கல்விக் கட்டணச் சலுகைத் திட்டம் (REV-104)',
      ml: 'തമിഴ്നാട് ഫസ്റ്റ് ഗ്രാജ്വേറ്റ് ട്യൂഷൻ ഫീസ് ഇളവ് പദ്ധതി'
    },
    shortDescription: 'Full waiver of statutory tuition fee for students who are the first in their entire family to enter higher education in Tamil Nadu.',
    authority: 'Directorate of Technical Education (DOTE) / Directorate of Medical Education (DME)',
    level: 'state',
    state: 'Tamil Nadu',
    benefitAmount: 'Full Tuition Fee Waiver (₹25,000 - ₹50,000 / year)',
    benefitAmountAnnualNumeric: 35000,
    benefitType: 'fee_waiver',
    officialPortalUrl: 'https://www.tnesevai.tn.gov.in',
    portalName: 'TNeGA e-Sevai / TNEA Single Window Portal',
    applicationClosingDate: '2026-09-30',
    requiredCertificates: [
      'aadhaarCard',
      'marksheet10th12th',
      'firstGraduateCertificate',
      'bonafideCertificate',
      'rationCard'
    ],
    criteria: {
      requiresFirstGraduate: true,
      allowedCourseLevels: ['ug_engg', 'ug_med', 'ug_arts_sci', 'ug_other'],
      applicableStates: ['Tamil Nadu']
    },
    legalGazetteClause: 'G.O. (Ms) No. 85, Higher Education (J2) Dept: No person in the family (parents or siblings) should be a graduate. Applicable for students admitted through single window centralized counseling.',
    workflowStages: [
      {
        stageNumber: 1,
        title: 'Apply for REV-104 Certificate at e-Sevai',
        department: 'Revenue Dept (Tahsildar)',
        description: 'Submit non-graduate affidavit and parent TCs to obtain REV-104 First Graduate Certificate (Fee ₹60, SLA 15 days).',
        estimatedDays: '15 Days',
        warningAlert: 'Must obtain REV-104 BEFORE single-window counseling seat allotment.'
      },
      {
        stageNumber: 2,
        title: 'Single Window Counseling Verification (TNEA/TN Medical)',
        department: 'Counseling Authority',
        description: 'Upload REV-104 certificate during certificate verification.',
        estimatedDays: '2 Days'
      },
      {
        stageNumber: 3,
        title: 'College Fee Waiver Allotment Order',
        department: 'DOTE / College Administration',
        description: 'Allotment letter printed with Tuition Fee = ₹0 (Zero). DOTE directly reimburses the college.',
        estimatedDays: 'Instant at Allotment'
      }
    ],
    navigationGuide: {
      applicationMode: 'counseling_single_window',
      otrRegistrationUrl: 'https://www.tnesevai.tn.gov.in',
      applicantLoginUrl: 'https://www.tneaonline.org',
      searchKeyword: 'REV-104 First Graduate Certificate TNeGA & TNEA Counseling',
      portalMenuHierarchy: ['TNeGA e-Sevai', 'Revenue Department', 'REV-104 First Graduate Certificate'],
      requiredUploadSpecs: [
        { documentName: 'REV-104 First Graduate Certificate', allowedFormats: 'PDF', maxFileSize: '< 200 KB' },
        { documentName: 'Parents Non-Graduate Joint Declaration Affidavit', allowedFormats: 'PDF', maxFileSize: '< 200 KB' }
      ],
      postSubmissionAction: 'Upload REV-104 during TNEA/Medical online counseling. College tuition fee becomes ZERO automatically.'
    }
  },

  {
    id: 'tn-7point5-quota',
    code: 'TN-7.5-QUOTA',
    name: 'Tamil Nadu 7.5% Preferential Quota Full Fee & Hostel Accommodation Scheme',
    nameTranslations: {
      en: '7.5% Govt School Quota Full Fee & Hostel Waiver',
      hi: '7.5% सरकारी स्कूल कोटा पूर्ण शुल्क एवं छात्रावास छूट योजना',
      te: '7.5% ప్రభుత్వ పాఠశాల కోటా పూర్తి ఫీజు & హాస్టల్ మినహాయింపు',
      ta: '7.5% அரசுப் பள்ளி முன்னுரிமை இட ஒதுக்கீடு முழு கட்டண விலக்கு திட்டம்',
      ml: '7.5% ഗവ. സ്കൂൾ ക്വോട്ട മുഴുവൻ ഫീസ് & ഹോസ്റ്റൽ ഇളവ്'
    },
    shortDescription: '100% Free Higher Education: Covers complete tuition, development, and hostel/mess fees for Government School students admitted under the 7.5% quota in Engineering, Medical, Agriculture, and Law.',
    authority: 'Higher Education & Health and Family Welfare Dept, Govt of Tamil Nadu',
    level: 'state',
    state: 'Tamil Nadu',
    benefitAmount: '100% Complete Free Education (Tuition + Hostel + Mess up to ₹1.5L/yr)',
    benefitAmountAnnualNumeric: 100000,
    benefitType: 'fee_waiver',
    officialPortalUrl: 'https://www.tneaonline.org',
    portalName: 'TNEA / TN Medical Selection Portal',
    applicationClosingDate: '2026-09-25',
    requiredCertificates: [
      'aadhaarCard',
      'marksheet10th12th',
      'govtSchool7_5Certificate',
      'bonafideCertificate',
      'communityCertificate'
    ],
    criteria: {
      requiresGovtSchool: true,
      allowedCourseLevels: ['ug_engg', 'ug_med', 'ug_arts_sci'],
      applicableStates: ['Tamil Nadu']
    },
    legalGazetteClause: 'Tamil Nadu Act No. 14 of 2021 & Act No. 34 of 2020: 7.5% seats in all professional courses set apart on preferential basis for students who studied in Govt schools from Class 6 to 12, with entire financial liability borne by State Govt.',
    workflowStages: [
      {
        stageNumber: 1,
        title: 'School Headmaster Annexure-III Certification',
        department: 'School Education Dept',
        description: 'Get continuous Govt School study certificate counter-signed by BEO/CEO.',
        estimatedDays: '3 Days'
      },
      {
        stageNumber: 2,
        title: 'Counseling Verification & 7.5% Rank List',
        department: 'TNEA / DME Selection Committee',
        description: 'Inclusion in separate 7.5% Government School Quota Merit List.',
        estimatedDays: '5 Days'
      },
      {
        stageNumber: 3,
        title: 'Zero-Fee Direct College Admission',
        department: 'Allotted Professional College',
        description: 'College cannot charge even ₹1 for tuition, books, or hostel.',
        estimatedDays: 'Instant'
      }
    ],
    navigationGuide: {
      applicationMode: 'counseling_single_window',
      otrRegistrationUrl: 'https://www.tneaonline.org',
      applicantLoginUrl: 'https://www.tneaonline.org',
      searchKeyword: 'Tamil Nadu 7.5% Government School Preferential Quota Annexure-III',
      portalMenuHierarchy: ['TNEA Home', 'Registration', 'Special Reservation - 7.5% Govt School Quota'],
      requiredUploadSpecs: [
        { documentName: 'Annexure-III Study Certificate (Signed by HM & BEO/CEO)', allowedFormats: 'PDF', maxFileSize: '< 300 KB' }
      ],
      postSubmissionAction: 'Ensure HM countersigns Annexure-III. Seat allotment letter carries 100% Free Hostel & Tuition endorsement.'
    }
  },

  // TELANGANA SCHEMES
  {
    id: 'ts-epass-postmatric',
    code: 'TS-EPASS-PMS',
    name: 'Telangana ePASS Post-Matric Scholarship & Vidyodaya (RTF & MTF)',
    nameTranslations: {
      en: 'Telangana ePASS Post-Matric Scholarship (RTF & MTF)',
      hi: 'तेलंगाना ईपास पोस्ट-मैट्रिक छात्रवृत्ति (फीस प्रतिपूर्ति)',
      te: 'తెలంగాణ ఈపాస్ పోస్ట్-మెట్రిక్ స్కాలర్‌షిప్ & ఫీజు రీయింబర్స్‌మెంట్',
      ta: 'தெலுங்கானா இ-பாஸ் போஸ்ட்-மெட்ரிக் கல்வி உதவித்தொகை',
      ml: 'തെലങ്കാന ഇ-പാസ്സ് പോസ്റ്റ്-മെട്രിക് സ്കോളർഷിപ്പ്'
    },
    shortDescription: 'Reimbursement of Tuition Fee (RTF) and Maintenance Fee (MTF) for SC, ST, BC, EBC, Minority, and PwD students of Telangana.',
    authority: 'Scheduled Castes & Backward Classes Development Dept, Govt of Telangana',
    level: 'state',
    state: 'Telangana',
    benefitAmount: '100% Tuition Fee Reimbursement + ₹20,000/yr Hostel MTF',
    benefitAmountAnnualNumeric: 40000,
    benefitType: 'cash_dbt',
    officialPortalUrl: 'https://telanganaepass.cgg.gov.in',
    portalName: 'Telangana ePASS Portal',
    applicationClosingDate: '2026-11-20',
    requiredCertificates: [
      'aadhaarCard',
      'marksheet10th12th',
      'incomeCertificate',
      'communityCertificate',
      'nativityCertificate',
      'bonafideCertificate',
      'bankPassbookNPCI',
      'rationCard'
    ],
    criteria: {
      maxAnnualIncome: 200000,
      allowedCategories: ['SC', 'ST', 'OBC', 'EWS', 'Minority'],
      allowedCourseLevels: ['diploma', 'ug_engg', 'ug_med', 'ug_arts_sci', 'ug_other', 'pg', 'phd'],
      applicableStates: ['Telangana']
    },
    legalGazetteClause: 'Telangana ePASS Guidelines: Domicile of Telangana, family income <= ₹2,00,000 (SC/ST) and <= ₹1,50,000 (BC/EBC Rural). Must maintain 75% college attendance.',
    workflowStages: [
      {
        stageNumber: 1,
        title: 'Telangana ePASS Online Registration',
        department: 'ePASS Portal CGG',
        description: 'Submit SSC Hall Ticket number, MeeSeva Caste & Income Certificate application IDs.',
        estimatedDays: '1 Day'
      },
      {
        stageNumber: 2,
        title: 'College Biometric Authentication',
        department: 'Principal / Nodal Officer',
        description: 'Biometric verification of student attendance and admission.',
        estimatedDays: '10 Days'
      },
      {
        stageNumber: 3,
        title: 'District Officer Inspection & RTF/MTF Sanction',
        department: 'District BC/SC Development Office',
        description: 'Release of sanction token to State Treasury.',
        estimatedDays: '20 Days'
      },
      {
        stageNumber: 4,
        title: 'Treasury Direct Fund Transfer',
        department: 'Telangana State Treasury',
        description: 'RTF transferred to College, MTF credited to student bank account.',
        estimatedDays: '15 Days'
      }
    ],
    navigationGuide: {
      applicationMode: 'citizen_otr_portal',
      otrRegistrationUrl: 'https://telanganaepass.cgg.gov.in',
      applicantLoginUrl: 'https://telanganaepass.cgg.gov.in',
      searchKeyword: 'Telangana ePASS Post Matric Fresh Application (RTF & MTF)',
      portalMenuHierarchy: ['ePASS Home', 'Postmatric Service', 'Fresh Registration', 'Enter SSC Hallticket & MeeSeva IDs'],
      requiredUploadSpecs: [
        { documentName: 'MeeSeva Caste Certificate ID', allowedFormats: 'Digital ID / PDF', maxFileSize: '< 150 KB' },
        { documentName: 'MeeSeva Income Certificate ID', allowedFormats: 'Digital ID / PDF', maxFileSize: '< 150 KB' },
        { documentName: 'Bank Passbook Front Page (NPCI Seeded)', allowedFormats: 'JPEG, PDF', maxFileSize: '< 100 KB' }
      ],
      postSubmissionAction: 'Print the ePASS application acknowledgment and submit with original Bonafide to College Scholarship Clerk.'
    }
  },

  // ANDHRA PRADESH SCHEMES
  {
    id: 'ap-jagananna-vidya-deevena',
    code: 'AP-JVD',
    name: 'Andhra Pradesh Jagananna Vidya Deevena (RTF) & Vasathi Deevena (MTF)',
    nameTranslations: {
      en: 'AP Jagananna Vidya Deevena (Full Fee Reimbursement)',
      hi: 'आंध्र प्रदेश जगनन्ना विद्या दीवेना (पूर्ण शुल्क प्रतिपूर्ति)',
      te: 'ఆంధ్రప్రదేశ్ జగనన్న విద్యా దీవెన & వసతి దీవెన',
      ta: 'ஆந்திரப் பிரதேசம் ஜெகனன்னா வித்யா தீவெனா திட்டம்',
      ml: 'ആന്ധ്രാപ്രദേശ് ജഗനണ്ണ വിദ്യാ ദീവേന പദ്ധതി'
    },
    shortDescription: 'Full fee reimbursement credited quarterly to mothers\' accounts and ₹20,000 annual boarding allowance for ITI, Polytechnic, Degree, and Engineering courses in AP.',
    authority: 'Higher Education & Social Welfare Dept, Govt of Andhra Pradesh',
    level: 'state',
    state: 'Andhra Pradesh',
    benefitAmount: '100% Full Fee Reimbursement + ₹20,000/yr Vasathi Deevena',
    benefitAmountAnnualNumeric: 50000,
    benefitType: 'cash_dbt',
    officialPortalUrl: 'https://jnanabhumi.ap.gov.in',
    portalName: 'JnanaBhumi & Navasakam Portal',
    applicationClosingDate: '2026-11-10',
    requiredCertificates: [
      'aadhaarCard',
      'marksheet10th12th',
      'incomeCertificate',
      'communityCertificate',
      'nativityCertificate',
      'bonafideCertificate',
      'bankPassbookNPCI',
      'rationCard'
    ],
    criteria: {
      maxAnnualIncome: 250000,
      allowedCourseLevels: ['diploma', 'ug_engg', 'ug_med', 'ug_arts_sci', 'ug_other', 'pg'],
      applicableStates: ['Andhra Pradesh']
    },
    legalGazetteClause: 'AP G.O. Ms. No. 115: Family income <= ₹2.5 Lakhs, wetland <= 10 acres, no 4-wheeler ownership in family, minimum 75% student attendance.',
    workflowStages: [
      {
        stageNumber: 1,
        title: 'Gram/Ward Secretariat Social Audit',
        department: 'Village / Ward Volunteer',
        description: 'Doorstep verification of household criteria and biometric consent.',
        estimatedDays: '7 Days'
      },
      {
        stageNumber: 2,
        title: 'JnanaBhumi College Digital Sign-off',
        department: 'College Principal',
        description: 'Verification of course enrollment and fee structure.',
        estimatedDays: '5 Days'
      },
      {
        stageNumber: 3,
        title: 'Quarterly DBT Installment to Mother’s Account',
        department: 'AP State Finance Dept',
        description: 'Funds deposited in 4 quarterly tranches directly into mother\'s bank account.',
        estimatedDays: 'Quarterly'
      }
    ],
    navigationGuide: {
      applicationMode: 'citizen_otr_portal',
      otrRegistrationUrl: 'https://jnanabhumi.ap.gov.in',
      applicantLoginUrl: 'https://jnanabhumi.ap.gov.in',
      searchKeyword: 'Jagananna Vidya Deevena & Vasathi Deevena (JVD)',
      portalMenuHierarchy: ['JnanaBhumi Home', 'Student Service', 'Jagananna Vidya Deevena Registration'],
      requiredUploadSpecs: [
        { documentName: 'Mother Aadhaar & Bank Passbook', allowedFormats: 'PDF, JPEG', maxFileSize: '< 200 KB' },
        { documentName: 'MeeSeva Integrated Caste & Income ID', allowedFormats: 'Digital ID', maxFileSize: '< 100 KB' }
      ],
      postSubmissionAction: 'Complete biometric e-KYC with your local Village/Ward Secretariat (Sachivalayam) Volunteer.'
    }
  },

  // KERALA SCHEMES
  {
    id: 'kl-egrantz-postmatric',
    code: 'KL-EGRANTZ-3',
    name: 'Kerala E-Grants 3.0 Post-Matric Educational Assistance (SC/ST/OEC/OBC)',
    nameTranslations: {
      en: 'Kerala E-Grants 3.0 Post-Matric Scholarship',
      hi: 'केरल ई-ग्रांट्स 3.0 पोस्ट-मैट्रिक छात्रवृत्ति',
      te: 'కేరళ ఈ-గ్రాంట్స్ 3.0 పోస్ట్-మెట్రిక్ స్కాలర్‌షిప్',
      ta: 'கேரளா இ-கிராண்ட்ஸ் 3.0 கல்வி உதவித்தொகை',
      ml: 'കേരള ഇ-ഗ്രാൻ്റ്സ് 3.0 പോസ്റ്റ്-മെട്രിക് സ്കോളർഷിപ്പ്'
    },
    shortDescription: 'Disbursement of tuition fees, exam fees, special fees, and monthly pocket money allowance for SC, ST, OEC, and OBC students in Kerala.',
    authority: 'Scheduled Castes Development Dept, Govt of Kerala',
    level: 'state',
    state: 'Kerala',
    benefitAmount: '100% Tuition & Exam Fees + Monthly Stipend',
    benefitAmountAnnualNumeric: 30000,
    benefitType: 'cash_dbt',
    officialPortalUrl: 'https://egrantz.kerala.gov.in',
    portalName: 'E-Grants 3.0 Portal Kerala',
    applicationClosingDate: '2026-10-31',
    requiredCertificates: [
      'aadhaarCard',
      'marksheet10th12th',
      'incomeCertificate',
      'communityCertificate',
      'nativityCertificate',
      'bonafideCertificate',
      'bankPassbookNPCI',
      'rationCard'
    ],
    criteria: {
      maxAnnualIncome: 250000,
      allowedCategories: ['SC', 'ST', 'OBC', 'MBC'],
      allowedCourseLevels: ['diploma', 'ug_engg', 'ug_med', 'ug_arts_sci', 'ug_other', 'pg', 'phd'],
      applicableStates: ['Kerala']
    },
    legalGazetteClause: 'Kerala SC/ST Development Dept Rules: SC/ST students have NO income ceiling. For OEC/OBC students, income ceiling is ₹2.50 lakh per annum.',
    workflowStages: [
      {
        stageNumber: 1,
        title: 'Akshaya / E-Grants 3.0 Portal Application',
        department: 'Akshaya Centre / E-Grants Portal',
        description: 'Online submission through Akshaya Kendra with verified certificates.',
        estimatedDays: '1 Day'
      },
      {
        stageNumber: 2,
        title: 'College Verification & District SC Officer Approval',
        department: 'District Scheduled Caste Development Office',
        description: 'Audit of college bills and student eligibility.',
        estimatedDays: '14 Days'
      },
      {
        stageNumber: 3,
        title: 'Kerala State Treasury DBT Push',
        department: 'State Treasury Department',
        description: 'Electronic payment order deposited to student bank account.',
        estimatedDays: '10 Days'
      }
    ],
    navigationGuide: {
      applicationMode: 'citizen_otr_portal',
      otrRegistrationUrl: 'https://egrantz.kerala.gov.in',
      applicantLoginUrl: 'https://egrantz.kerala.gov.in',
      searchKeyword: 'E-Grants 3.0 Post-Matric Scholarship Scheme',
      portalMenuHierarchy: ['E-Grants Home', 'Student One-Time Registration', 'Apply for Scheme'],
      requiredUploadSpecs: [
        { documentName: 'e-District Caste & Income Certificates', allowedFormats: 'PDF', maxFileSize: '< 200 KB' },
        { documentName: 'College Admission Fee Receipt', allowedFormats: 'PDF', maxFileSize: '< 200 KB' }
      ],
      postSubmissionAction: 'Take the online printout to Akshaya Centre or College SC/ST Development Cell.'
    }
  },

  // KARNATAKA SCHEMES
  {
    id: 'ka-ssp-postmatric',
    code: 'KA-SSP-PMS',
    name: 'Karnataka State Scholarship Portal (SSP) Post-Matric Scholarship',
    nameTranslations: {
      en: 'Karnataka SSP Post-Matric Scholarship & Vidyasiri',
      hi: 'कर्नाटक एसएसपी पोस्ट-मैट्रिक छात्रवृत्ति एवं विद्यासिरी',
      te: 'కర్ణాటక SSP పోస్ట్-మెట్రిక్ స్కాలర్‌షిప్ & విద్యాసిరి',
      ta: 'கர்நாடகா எஸ்.எஸ்.பி கல்வி உதவித்தொகை & வித்யாசிரி',
      ml: 'കർണ്ണാടക എസ്.എസ്.പി പോസ്റ്റ്-മെട്രിക് സ്കോളർഷിപ്പ്'
    },
    shortDescription: 'Unified scholarship portal covering Fee Reimbursement and Vidyasiri Food & Accommodation for Backward Classes & Minorities in Karnataka.',
    authority: 'Social Welfare & Backward Classes Dept, Govt of Karnataka',
    level: 'state',
    state: 'Karnataka',
    benefitAmount: '100% Tuition Fee Reimbursement + ₹15,000 Vidyasiri',
    benefitAmountAnnualNumeric: 35000,
    benefitType: 'cash_dbt',
    officialPortalUrl: 'https://ssp.postmatric.karnataka.gov.in',
    portalName: 'Karnataka SSP Portal',
    applicationClosingDate: '2026-11-30',
    requiredCertificates: [
      'aadhaarCard',
      'marksheet10th12th',
      'incomeCertificate',
      'communityCertificate',
      'nativityCertificate',
      'bonafideCertificate',
      'bankPassbookNPCI',
      'rationCard'
    ],
    criteria: {
      maxAnnualIncome: 250000,
      allowedCourseLevels: ['diploma', 'ug_engg', 'ug_med', 'ug_arts_sci', 'ug_other', 'pg'],
      applicableStates: ['Karnataka']
    },
    legalGazetteClause: 'Karnataka SSP Regulations: Domicile of Karnataka, Kutumba ID integration, family income limit of ₹2,50,000.',
    workflowStages: [
      {
        stageNumber: 1,
        title: 'SSP Portal Kutumba ID Authentication',
        department: 'SSP Portal',
        description: 'Auto-fetches family caste and income via Karnataka Kutumba resident database.',
        estimatedDays: '1 Day'
      },
      {
        stageNumber: 2,
        title: 'E-Attestation by College Officer',
        department: 'College E-Attestation Officer',
        description: 'Digital verification of study certificate and fee details.',
        estimatedDays: '7 Days'
      },
      {
        stageNumber: 3,
        title: 'DBT Payment via Karnataka Aadhaar Bridge',
        department: 'Karnataka State Treasury',
        description: 'Funds credited to Aadhaar-seeded bank account.',
        estimatedDays: '10 Days'
      }
    ],
    navigationGuide: {
      applicationMode: 'citizen_otr_portal',
      otrRegistrationUrl: 'https://ssp.postmatric.karnataka.gov.in',
      applicantLoginUrl: 'https://ssp.postmatric.karnataka.gov.in',
      searchKeyword: 'Karnataka SSP Post Matric Scholarship & Vidyasiri',
      portalMenuHierarchy: ['SSP Home', 'Student Account Login', 'Kutumba ID Verification', 'Scholarship Application'],
      requiredUploadSpecs: [
        { documentName: 'Kutumba Family ID', allowedFormats: 'Digital ID', maxFileSize: '< 50 KB' },
        { documentName: 'RD Caste & Income Number', allowedFormats: 'Text / PDF', maxFileSize: '< 100 KB' }
      ],
      postSubmissionAction: 'Get your Study Certificate e-Attested by your College E-Attestation Officer.'
    }
  },

  // UTTAR PRADESH SCHEMES
  {
    id: 'up-scholarship-pms',
    code: 'UP-SCHOLARSHIP-PMS',
    name: 'Uttar Pradesh Post-Matric Scholarship & Fee Reimbursement Scheme',
    nameTranslations: {
      en: 'UP Post-Matric Scholarship & Fee Reimbursement',
      hi: 'उत्तर प्रदेश पोस्ट-मैट्रिक छात्रवृत्ति एवं शुल्क प्रतिपूर्ति योजना',
      te: 'ఉత్తరప్రదేశ్ పోస్ట్-మెట్రిక్ స్కాలర్‌షిప్ & ఫీజు రీయింబర్స్‌మెంట్',
      ta: 'உத்தரப் பிரதேசம் போஸ்ட்-மெட்ரிக் கல்வி உதவித்தொகை',
      ml: 'ഉത്തർപ്രദേശ് పోസ്റ്റ്-മെട്രിക് സ്കോളർഷിപ്പ്'
    },
    shortDescription: 'Complete fee reimbursement and monthly maintenance for General, OBC, SC, ST, and Minority students studying in UP.',
    authority: 'Social Welfare & Backward Classes Welfare Dept, Govt of Uttar Pradesh',
    level: 'state',
    state: 'Uttar Pradesh',
    benefitAmount: '100% Tuition Fee Reimbursement + Monthly Allowance (Up to ₹50,000)',
    benefitAmountAnnualNumeric: 40000,
    benefitType: 'cash_dbt',
    officialPortalUrl: 'https://scholarship.up.gov.in',
    portalName: 'UP Scholarship Online System',
    applicationClosingDate: '2026-10-31',
    requiredCertificates: [
      'aadhaarCard',
      'marksheet10th12th',
      'incomeCertificate',
      'communityCertificate',
      'nativityCertificate',
      'bonafideCertificate',
      'bankPassbookNPCI',
      'rationCard'
    ],
    criteria: {
      maxAnnualIncome: 200000,
      allowedCourseLevels: ['school_11_12', 'diploma', 'ug_engg', 'ug_med', 'ug_arts_sci', 'ug_other', 'pg'],
      applicableStates: ['Uttar Pradesh']
    },
    legalGazetteClause: 'UP Social Welfare Dept Rules: Annual family income <= ₹2.50 lakh (SC/ST) and <= ₹2.00 lakh (General/OBC/Minority). Aadhaar authentication mandatory.',
    workflowStages: [
      {
        stageNumber: 1,
        title: 'UP Scholarship Online Portal Registration & Lock',
        department: 'UP Scholarship Portal',
        description: 'Fill details, verify DigiLocker documents, and lock final application.',
        estimatedDays: '2 Days'
      },
      {
        stageNumber: 2,
        title: 'College Forwarding to District Welfare Committee (DWC)',
        department: 'College Authority',
        description: 'Physical marksheet inspection and digital forwarding to DWO.',
        estimatedDays: '10 Days'
      },
      {
        stageNumber: 3,
        title: 'District Welfare Officer Approval & PFMS Push',
        department: 'DWO Office / PFMS',
        description: 'District sanction and automated electronic transfer.',
        estimatedDays: '15 Days'
      }
    ],
    navigationGuide: {
      applicationMode: 'citizen_otr_portal',
      otrRegistrationUrl: 'https://scholarship.up.gov.in',
      applicantLoginUrl: 'https://scholarship.up.gov.in',
      searchKeyword: 'UP Scholarship Postmatric Other than Inter Fresh',
      portalMenuHierarchy: ['UP Scholarship Home', 'Student Section', 'Registration', 'DigiLocker Verification'],
      requiredUploadSpecs: [
        { documentName: 'DigiLocker Verified Marksheet', allowedFormats: 'Digital e-KYC', maxFileSize: '< 200 KB' },
        { documentName: 'Caste & Income Certificate ID', allowedFormats: 'e-District Digital ID', maxFileSize: '< 100 KB' }
      ],
      postSubmissionAction: 'Take the final locked printout with all self-attested document photocopies and submit to your college within 3 working days.'
    }
  },

  // MAHARASHTRA SCHEMES
  {
    id: 'mh-mahadbt-postmatric',
    code: 'MH-MAHADBT-PMS',
    name: 'Maharashtra MahaDBT Rajarshi Chhatrapati Shahu Maharaj Shikshan Shulkh Shishyavrutti',
    nameTranslations: {
      en: 'MahaDBT Rajarshi Chhatrapati Shahu Maharaj Scheme',
      hi: 'महाराष्ट्र महाडीबीटी राजर्षि छत्रपति शाहू महाराज शिक्षण शुल्क छात्रवृत्ति',
      te: 'మహారాష్ట్ర మహా-డిబిటి స్కాలర్‌షిప్ పథకం',
      ta: 'மகாராஷ்டிரா மகா-டிபிடி கல்வி உதவித்தொகை திட்டம்',
      ml: 'മഹാരാഷ്ട്ര മഹാഡിബിടി സ്കോളർഷിപ്പ്'
    },
    shortDescription: '50% to 100% Tuition & Exam Fee reimbursement for economically backward and reserved category students in Maharashtra.',
    authority: 'Higher and Technical Education Dept, Govt of Maharashtra',
    level: 'state',
    state: 'Maharashtra',
    benefitAmount: '50% - 100% Tuition & Exam Fee Waiver',
    benefitAmountAnnualNumeric: 45000,
    benefitType: 'fee_waiver',
    officialPortalUrl: 'https://mahadbt.maharashtra.gov.in',
    portalName: 'MahaDBT Portal',
    applicationClosingDate: '2026-11-30',
    requiredCertificates: [
      'aadhaarCard',
      'marksheet10th12th',
      'incomeCertificate',
      'communityCertificate',
      'nativityCertificate',
      'bonafideCertificate',
      'bankPassbookNPCI',
      'rationCard'
    ],
    criteria: {
      maxAnnualIncome: 800000,
      allowedCourseLevels: ['diploma', 'ug_engg', 'ug_med', 'ug_arts_sci', 'ug_other', 'pg'],
      applicableStates: ['Maharashtra']
    },
    legalGazetteClause: 'Maharashtra Higher Education Resolution: Domicile of Maharashtra, admitted through CAP round, family income up to ₹8,00,000 for 50% waiver.',
    workflowStages: [
      {
        stageNumber: 1,
        title: 'MahaDBT Portal Aadhaar Authentication',
        department: 'MahaDBT Portal',
        description: 'Profile completion and CAP allotment letter submission.',
        estimatedDays: '1 Day'
      },
      {
        stageNumber: 2,
        title: 'College Desk 1 & Desk 2 Scrutiny',
        department: 'College Verification Cell',
        description: 'Scrutiny of admission documents and fee receipt.',
        estimatedDays: '14 Days'
      },
      {
        stageNumber: 3,
        title: 'Departmental Approval & Treasury Disbursement',
        department: 'Joint Director of Higher Education',
        description: 'Direct fee voucher to college and maintenance allowance to student.',
        estimatedDays: '15 Days'
      }
    ],
    navigationGuide: {
      applicationMode: 'citizen_otr_portal',
      otrRegistrationUrl: 'https://mahadbt.maharashtra.gov.in',
      applicantLoginUrl: 'https://mahadbt.maharashtra.gov.in',
      searchKeyword: 'Directorate of Higher Education - Rajarshi Chhatrapati Shahu Maharaj Shikshan Shulkh Shishyavrutti Scheme',
      portalMenuHierarchy: ['MahaDBT Home', 'Post Matric Scholarship', 'Directorate of Higher Education (DHE)', 'Select Scheme'],
      requiredUploadSpecs: [
        { documentName: 'CAP Allotment Letter', allowedFormats: 'PDF', maxFileSize: '< 250 KB' },
        { documentName: 'Tahsil Income Certificate (< ₹8L)', allowedFormats: 'PDF', maxFileSize: '< 250 KB' },
        { documentName: 'Domicile / Birth Certificate of Maharashtra', allowedFormats: 'PDF', maxFileSize: '< 250 KB' }
      ],
      postSubmissionAction: 'Check your application status on MahaDBT for College Desk 1 (Clerk) and Desk 2 (Principal) biometric sign-offs.'
    }
  }
];
