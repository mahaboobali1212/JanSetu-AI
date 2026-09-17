import { CertificateDefinition, CertificateKey } from '../types/certificate';

export const MASTER_CERTIFICATES: Record<CertificateKey, CertificateDefinition> = {
  firstGraduateCertificate: {
    key: 'firstGraduateCertificate',
    id: 'REV-104',
    title: 'First Graduate Certificate (முதல் பட்டதாரி சான்றிதழ்)',
    titleTranslations: {
      en: 'First Graduate Certificate (REV-104)',
      hi: 'प्रथम स्नातक प्रमाणपत्र (REV-104)',
      te: 'మొదటి పట్టభద్రుడి ధ్రువీకరణ పత్రం (REV-104)',
      ta: 'முதல் பட்டதாரி சான்றிதழ் (REV-104)',
      ml: 'കുടുംബത്തിലെ ആദ്യ ബിരുദധാരി സർട്ടിഫിക്കറ്റ് (REV-104)'
    },
    issuingAuthority: 'Tahsildar / Revenue Department',
    department: 'Revenue & Disaster Management Department',
    whereToApply: {
      onlinePortalName: 'TNeGA e-Sevai / State e-District Portal',
      onlinePortalUrl: 'https://www.tnesevai.tn.gov.in',
      offlineOffice: 'Taluk Office / Village Administrative Officer (VAO)'
    },
    statutorySlaDays: 15,
    statutoryFeeInr: 60,
    cyberCafeExtortionRate: '₹300 - ₹500',
    precursorDocuments: [
      'Self-Declaration / Non-Graduate Affidavit on ₹20 Stamp Paper',
      'Parents\' School Transfer Certificate (TC) or No-Education Declaration',
      'Elder Siblings\' School Transfer Certificates or TC showing non-degree status',
      'Smart Ration Card / Food Security Card',
      'Applicant 10th & 12th Marksheets + Transfer Certificate',
      'Aadhaar Cards of Applicant and Parents'
    ],
    stepByStepRoadmap: [
      'Step 1: Obtain a Self-Declaration Affidavit signed before a Notary or VAO confirming neither parents nor elder siblings have completed any undergraduate degree.',
      'Step 2: Collect parent\'s Transfer Certificates or formal Village Administrative Officer (VAO) inquiry certificate.',
      'Step 3: Visit your nearest authorized e-Sevai / MeeSeva center OR login to the official state e-District portal directly.',
      'Step 4: Submit service request code REV-104 and pay the statutory fee of ₹60 (Do not pay more).',
      'Step 5: File undergoes scrutiny by VAO, Revenue Inspector (RI), and approval by Tahsildar within the 15-day statutory SLA.',
      'Step 6: Download digitally signed QR-coded certificate from the portal.'
    ],
    samplePreviewDescription: 'Official Green-bordered certificate featuring State Emblem, Unique Certificate No. (e.g. TN-720240102104), Tahsildar Digital Signature, and Verification QR Code at top-right.',
    isHighRiskTrap: true
  },
  
  incomeCertificate: {
    key: 'incomeCertificate',
    id: 'REV-101',
    title: 'Income Certificate (வருமானச் சான்றிதழ் / आय प्रमाण पत्र)',
    titleTranslations: {
      en: 'Annual Family Income Certificate (REV-101)',
      hi: 'वार्षिक पारिवारिक आय प्रमाण पत्र (REV-101)',
      te: 'కుటుంబ వార్షిక ఆదాయ ధ్రువీకరణ పత్రం (REV-101)',
      ta: 'குடும்ப ஆண்டு வருமானச் சான்றிதழ் (REV-101)',
      ml: 'കുടുംബ വാർഷിക വരുമാന സർട്ടിഫിക്കറ്റ് (REV-101)'
    },
    issuingAuthority: 'Tahsildar / Zonal Revenue Officer',
    department: 'Revenue & Disaster Management Department',
    whereToApply: {
      onlinePortalName: 'State e-District / e-Sevai / MeeSeva / Akshaya Portal',
      onlinePortalUrl: 'https://edistrict.gov.in',
      offlineOffice: 'Taluk Office / Zonal Deputy Tahsildar'
    },
    statutorySlaDays: 8,
    statutoryFeeInr: 60,
    cyberCafeExtortionRate: '₹200 - ₹350',
    precursorDocuments: [
      'Salary Slip / Form 16 / Agricultural Land Record (Patta/Chitta) / Income Affidavit',
      'Smart Ration Card / Family Card',
      'Applicant & Parent Aadhaar Cards',
      'Electricity Bill / Rental Agreement for address verification'
    ],
    stepByStepRoadmap: [
      'Step 1: Collate salary slip, agricultural revenue slip, or self-employment declaration.',
      'Step 2: Submit application on State e-District portal or nearest CSC/e-Sevai kiosk.',
      'Step 3: VAO conducts local field inquiry regarding agricultural yield or occupation.',
      'Step 4: Tahsildar issues digital certificate with 1-year statutory validity under 8 days SLA.'
    ],
    samplePreviewDescription: 'Standard state revenue document displaying Father\'s Name, Total Assessed Annual Income in Figures & Words, Financial Year, and 2D Barcode.',
    isHighRiskTrap: true
  },

  communityCertificate: {
    key: 'communityCertificate',
    id: 'REV-103',
    title: 'Community / Caste Certificate (சாதிச் சான்றிதழ் / जाति प्रमाण पत्र)',
    titleTranslations: {
      en: 'Community / Caste Validity Certificate (REV-103)',
      hi: 'जाति / सामाजिक श्रेणी प्रमाण पत्र (REV-103)',
      te: 'కులం / సామాజిక వర్గ ధ్రువీకరణ పత్రం (REV-103)',
      ta: 'சாதி / சமூகப் பிரிவு சான்றிதழ் (REV-103)',
      ml: 'ജാതി / കമ്മ്യൂണിറ്റി സർട്ടിഫിക്കറ്റ് (REV-103)'
    },
    issuingAuthority: 'Zonal Deputy Tahsildar / Revenue Divisional Officer (RDO)',
    department: 'Backward Classes & Adi Dravidar Welfare Dept',
    whereToApply: {
      onlinePortalName: 'State e-District / e-Sevai / MeeSeva / Akshaya',
      onlinePortalUrl: 'https://www.tnesevai.tn.gov.in',
      offlineOffice: 'Taluk Office / VAO Office'
    },
    statutorySlaDays: 15,
    statutoryFeeInr: 60,
    cyberCafeExtortionRate: '₹250 - ₹400',
    precursorDocuments: [
      'Father / Mother / Sibling Community Certificate (Crucial Anchor Document)',
      'Applicant School Transfer Certificate showing caste/religion',
      'Ration Card & Aadhaar Card'
    ],
    stepByStepRoadmap: [
      'Step 1: Attach blood relative\'s verified community certificate as primary proof.',
      'Step 2: Apply via e-Sevai / CSC center with fee of ₹60.',
      'Step 3: VAO and Revenue Inspector verify lineage and issue permanent digital community certificate.'
    ],
    samplePreviewDescription: 'Permanent validity certificate stating exact sub-caste, Government Order (G.O.) notification number, and digital signature.',
    isHighRiskTrap: false
  },

  nativityCertificate: {
    key: 'nativityCertificate',
    id: 'REV-102',
    title: 'Nativity / Domicile Certificate (இருப்பிடச் சான்றிதழ் / मूल निवास प्रमाण पत्र)',
    titleTranslations: {
      en: 'Nativity / Residence Certificate (REV-102)',
      hi: 'मूल निवास / अधिवास प्रमाण पत्र (REV-102)',
      te: 'స్థానికత / నివాస ధ్రువీకరణ పత్రం (REV-102)',
      ta: 'இருப்பிடச் / பூர்வீகச் சான்றிதழ் (REV-102)',
      ml: 'സ്ഥിരതാമസ സർട്ടിഫിക്കറ്റ് (REV-102)'
    },
    issuingAuthority: 'Tahsildar',
    department: 'Revenue Department',
    whereToApply: {
      onlinePortalName: 'State e-District / e-Sevai',
      onlinePortalUrl: 'https://edistrict.gov.in',
      offlineOffice: 'Taluk Office'
    },
    statutorySlaDays: 7,
    statutoryFeeInr: 60,
    cyberCafeExtortionRate: '₹200 - ₹300',
    precursorDocuments: [
      'Continuous 5-Year School Study Certificates (Class 6-12) or Birth Certificate in State',
      'Parent Ration Card / Voter ID / Aadhaar Card',
      'House Tax Receipt or Rental Agreement'
    ],
    stepByStepRoadmap: [
      'Step 1: Compile proof of continuous residence in state for minimum 5 years.',
      'Step 2: Apply through e-Sevai / CSC kiosk with ₹60 fee.',
      'Step 3: Verification completed within 7 days SLA.'
    ],
    samplePreviewDescription: 'State emblem document confirming candidate is a native citizen of the specified village/taluk/district.',
    isHighRiskTrap: false
  },

  govtSchool7_5Certificate: {
    key: 'govtSchool7_5Certificate',
    id: 'SCH-7.5',
    title: '7.5% Govt School Continuous Study Certificate (Annexure-III)',
    titleTranslations: {
      en: '7.5% Govt School Study Certificate (Annexure-III)',
      hi: '7.5% सरकारी स्कूल सतत अध्ययन प्रमाणपत्र',
      te: '7.5% ప్రభుత్వ పాఠశాల నిరంతర విద్య ధ్రువీకరణ పత్రం',
      ta: '7.5% அரசுப் பள்ளி தொடர் படிப்பு சான்றிதழ் (இணைப்பு-3)',
      ml: '7.5% ഗവ. സ്കൂൾ പഠന സർട്ടിഫിക്കറ്റ്'
    },
    issuingAuthority: 'Headmaster & Block Educational Officer (BEO) / Chief Educational Officer (CEO)',
    department: 'School Education Department',
    whereToApply: {
      onlinePortalName: 'EMIS Portal / High School Headmaster',
      onlinePortalUrl: 'https://emis.tnschools.gov.in',
      offlineOffice: 'Concerned Government School Headmaster / BEO Office'
    },
    statutorySlaDays: 3,
    statutoryFeeInr: 0,
    cyberCafeExtortionRate: '₹150 - ₹300 (Statutorily FREE)',
    precursorDocuments: [
      'Transfer Certificates from Class 6 to 12 showing 100% Government School education',
      'EMIS Student ID Number',
      '10th and 12th Marksheet copies'
    ],
    stepByStepRoadmap: [
      'Step 1: Approach the Headmaster of the Government Higher Secondary School where you passed Class 12.',
      'Step 2: Headmaster fills Annexure-III verifying continuous study from Class 6 to 12 in Govt Schools (Corporation / Adi Dravidar / Municipal / Forest schools).',
      'Step 3: Certificate is counter-signed by Block Educational Officer (BEO) or CEO.',
      'Step 4: Official fee is ₹0 (Completely Free). Never pay any agent.'
    ],
    samplePreviewDescription: 'Official Annexure-III proforma signed by School HM with School Seal and counter-signed by BEO/CEO with EMIS ID.',
    isHighRiskTrap: true
  },

  bonafideCertificate: {
    key: 'bonafideCertificate',
    id: 'INS-BON',
    title: 'Current College Bonafide Certificate',
    titleTranslations: {
      en: 'College Bonafide Student Certificate',
      hi: 'कॉलेज वास्तविक छात्र प्रमाण पत्र (Bonafide)',
      te: 'కళాశాల బోనఫైడ్ విద్యార్థి ధ్రువీకరణ పత్రం',
      ta: 'கல்லூரி மாணவர் உண்மைத்தன்மை சான்றிதழ் (Bonafide)',
      ml: 'കോളേജ് ബോണഫൈഡ് സർട്ടിഫിക്കറ്റ്'
    },
    issuingAuthority: 'College Principal / Registrar / Dean',
    department: 'Higher Education Institution',
    whereToApply: {
      onlinePortalName: 'College Student ERP Portal',
      onlinePortalUrl: 'https://scholarships.gov.in',
      offlineOffice: 'College Academic / Scholarship Section'
    },
    statutorySlaDays: 2,
    statutoryFeeInr: 0,
    cyberCafeExtortionRate: '₹50 - ₹100',
    precursorDocuments: [
      'College ID Card & Admission Allotment Order',
      'Current Semester Fee Receipt'
    ],
    stepByStepRoadmap: [
      'Step 1: Submit written request to College Scholarship Nodal Officer / Dean.',
      'Step 2: Verify Roll No, AISHE College Code, and Course Year.',
      'Step 3: Collect signed certificate on official college letterhead with Institute Seal.'
    ],
    samplePreviewDescription: 'College letterhead document stating student is currently pursuing regular full-time course with AISHE Code.',
    isHighRiskTrap: false
  },

  bankPassbookNPCI: {
    key: 'bankPassbookNPCI',
    id: 'NPCI-DBT',
    title: 'NPCI DBT Seeded Bank Passbook & Aadhaar Mandate',
    titleTranslations: {
      en: 'NPCI DBT Seeded Bank Account (Active DBT Mapper)',
      hi: 'NPCI DBT मैप किया हुआ बैंक खाता (सक्रिय DBT)',
      te: 'NPCI DBT అనుసంధాన బ్యాంక్ ఖాతా (యాక్టివ్ మ్యాపర్)',
      ta: 'NPCI DBT இணைக்கப்பட்ட வங்கி கணக்கு புத்தகம்',
      ml: 'NPCI DBT ലിങ്ക് ചെയ്ത ബാങ്ക് അക്കൗണ്ട്'
    },
    issuingAuthority: 'Bank Branch Manager / NPCI National Gateway',
    department: 'National Payments Corporation of India (NPCI) / PFMS',
    whereToApply: {
      onlinePortalName: 'm-Aadhaar Portal / Bank Mobile Banking',
      onlinePortalUrl: 'https://myaadhaar.uidai.gov.in',
      offlineOffice: 'Home Bank Branch (Submit Annexure-I Mandate Form)'
    },
    statutorySlaDays: 2,
    statutoryFeeInr: 0,
    cyberCafeExtortionRate: '₹100 - ₹250 (Statutorily FREE)',
    precursorDocuments: [
      'Bank Passbook First Page with Account Number and IFSC',
      'Aadhaar Card Copy (Self-Attested)',
      'Official Annexure-I Bank Mandate Application Form'
    ],
    stepByStepRoadmap: [
      'Step 1: Crucial distinction: Basic ATM KYC Linking is NOT equal to NPCI DBT Seeding.',
      'Step 2: Generate and print the pre-filled Annexure-I DBT Mandate Form from JanSetu AI.',
      'Step 3: Submit signed mandate with self-attested Aadhaar copy to your Bank Branch Manager.',
      'Step 4: Request teller to enable Option 1: "Aadhaar Seeding on NPCI DBT Mapper for Direct Benefit Transfer".',
      'Step 5: Verify status after 48 hours by dialing *99*99# or on myaadhaar.uidai.gov.in.'
    ],
    samplePreviewDescription: 'Bank Passbook showing Customer Name matching Aadhaar, CBS Account Number, IFSC, and Bank Seal.',
    isHighRiskTrap: true
  },

  aadhaarCard: {
    key: 'aadhaarCard',
    id: 'UIDAI-01',
    title: 'Aadhaar Card with Linked Mobile Number',
    titleTranslations: {
      en: 'Aadhaar Card (Linked with Active Mobile)',
      hi: 'आधार कार्ड (सक्रिय मोबाइल से लिंक)',
      te: 'ఆధార్ కార్డు (యాక్టివ్ మొబైల్‌తో లింక్)',
      ta: 'ஆதார் அட்டை (செயலில் உள்ள மொபைல் எண் இணைப்புடன்)',
      ml: 'ആധാർ കാർഡ് (മൊബൈൽ നമ്പർ ലിങ്ക് ചെയ്തത്)'
    },
    issuingAuthority: 'Unique Identification Authority of India (UIDAI)',
    department: 'Ministry of Electronics and IT (MeitY)',
    whereToApply: {
      onlinePortalName: 'myAadhaar UIDAI Portal',
      onlinePortalUrl: 'https://myaadhaar.uidai.gov.in',
      offlineOffice: 'Aadhaar Seva Kendra / Post Office'
    },
    statutorySlaDays: 5,
    statutoryFeeInr: 50,
    cyberCafeExtortionRate: '₹150 - ₹300',
    precursorDocuments: [
      'Proof of Identity & Proof of Date of Birth (10th Marksheet)'
    ],
    stepByStepRoadmap: [
      'Step 1: Verify that the spelling of your name in Aadhaar matches your 10th marksheet exactly.',
      'Step 2: If misspelled, update demographic details via myAadhaar portal or nearest Post Office Aadhaar counter.'
    ],
    samplePreviewDescription: 'Standard 12-digit UIDAI card with QR code and active linked mobile for OTP reception.',
    isHighRiskTrap: false
  },

  marksheet10th12th: {
    key: 'marksheet10th12th',
    id: 'EDU-MARK',
    title: '10th & 12th Standard Original Marksheets',
    titleTranslations: {
      en: '10th & 12th Standard Marksheets',
      hi: '10वीं एवं 12वीं अंकतालिका',
      te: '10వ మరియు 12వ తరగతి మార్కుల జాబితా',
      ta: '10 மற்றும் 12-ஆம் வகுப்பு மதிப்பெண் சான்றிதழ்கள்',
      ml: '10, 12 ക്ലാസ് മാർക്ക് ഷീറ്റുകൾ'
    },
    issuingAuthority: 'State Board of School Examinations / CBSE / CISCE',
    department: 'Department of Government Examinations',
    whereToApply: {
      onlinePortalName: 'DigiLocker Portal',
      onlinePortalUrl: 'https://www.digilocker.gov.in',
      offlineOffice: 'School of Last Study / DGE Office'
    },
    statutorySlaDays: 1,
    statutoryFeeInr: 0,
    cyberCafeExtortionRate: '₹50 - ₹100',
    precursorDocuments: ['Exam Roll Number and Hall Ticket'],
    stepByStepRoadmap: [
      'Step 1: Download verified digital copy from DigiLocker or use school original.',
      'Step 2: Ensure student name and father name match other documents.'
    ],
    samplePreviewDescription: 'Official board marksheet showing subject marks, total marks, percentage, and permanent register number.',
    isHighRiskTrap: false
  },

  rationCard: {
    key: 'rationCard',
    id: 'PDS-SMART',
    title: 'Smart Ration Card / Food Security Card',
    titleTranslations: {
      en: 'Smart Family Ration Card / Food Security Card',
      hi: 'स्मार्ट राशन कार्ड / खाद्य सुरक्षा कार्ड',
      te: 'స్మార్ట్ రేషన్ కార్డు / ఆహార భద్రతా కార్డు',
      ta: 'ஸ்மார்ட் குடும்ப அட்டை (Ration Card)',
      ml: 'സ്മാർട്ട് റേഷൻ കാർഡ്'
    },
    issuingAuthority: 'Civil Supplies & Consumer Protection Dept',
    department: 'Civil Supplies Department',
    whereToApply: {
      onlinePortalName: 'State PDS / TNEPDS Portal',
      onlinePortalUrl: 'https://www.tnpds.gov.in',
      offlineOffice: 'Taluk Supply Office (TSO)'
    },
    statutorySlaDays: 15,
    statutoryFeeInr: 20,
    cyberCafeExtortionRate: '₹150 - ₹300',
    precursorDocuments: ['Aadhaar Cards of all family members', 'Gas connection cylinder receipt'],
    stepByStepRoadmap: [
      'Step 1: Check that applicant name is listed as a family member under the card.',
      'Step 2: Use TNEPDS / State PDS app for instant verification.'
    ],
    samplePreviewDescription: 'Smart card containing family photo, family head name, cylinder count, and listed beneficiaries.',
    isHighRiskTrap: false
  },

  disabilityCertificate: {
    key: 'disabilityCertificate',
    id: 'UDID-PWD',
    title: 'Unique Disability ID (UDID) / Disability Certificate',
    titleTranslations: {
      en: 'Unique Disability ID (UDID) / 40%+ PwD Certificate',
      hi: 'विशिष्ट दिव्यांगता पहचान पत्र (UDID Card)',
      te: 'దివ్యాంగుల ధ్రువీకరణ పత్రం (UDID Card)',
      ta: 'மாற்றுத்திறனாளி தனித்துவ அடையாள அட்டை (UDID)',
      ml: 'ഭിന്നശേഷി സർട്ടിഫിക്കറ്റ് (UDID Card)'
    },
    issuingAuthority: 'District Medical Board / Dept of Empowerment of Persons with Disabilities',
    department: 'Ministry of Social Justice and Empowerment',
    whereToApply: {
      onlinePortalName: 'Swavlamban Card Portal',
      onlinePortalUrl: 'https://www.swavlambancard.gov.in',
      offlineOffice: 'District Government Headquarters Hospital'
    },
    statutorySlaDays: 30,
    statutoryFeeInr: 0,
    cyberCafeExtortionRate: '₹200 - ₹500',
    precursorDocuments: ['Medical Assessment Report', 'Aadhaar Card', 'Passport size photo'],
    stepByStepRoadmap: [
      'Step 1: Register on swavlambancard.gov.in.',
      'Step 2: Attend assessment by District Medical Board.',
      'Step 3: Receive permanent digital UDID card with disability percentage.'
    ],
    samplePreviewDescription: 'National blue UDID card stating percentage of permanent disability, medical board authorization, and QR code.',
    isHighRiskTrap: false
  }
};
