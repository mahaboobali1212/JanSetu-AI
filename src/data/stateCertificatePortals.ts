import { CertificateKey } from '../types/certificate';

export interface StateAwareCertificateInfo {
  friendlyName: string;
  nativeTitle: string;
  whatItIs: string;
  whyNeeded: string;
  issuingAuthority: string;
  department: string;
  onlinePortalName: string;
  onlinePortalUrl: string;
  offlineOffice: string;
  statutoryFeeInr: number;
  statutorySlaDays: number;
  cyberCafeExtortionRate: string;
  precursorDocuments: string[];
  stepByStepRoadmap: string[];
  samplePreviewDescription: string;
  icon: string;
  badgeCode: string;
  isHighPriority: boolean;
}

export function getStateAwareCertificateInfo(
  key: CertificateKey,
  state: string = 'Tamil Nadu',
  language: string = 'en'
): StateAwareCertificateInfo {
  const normState = (state || '').trim();

  const isTN = normState === 'Tamil Nadu';
  const isAP = normState === 'Andhra Pradesh';
  const isTG = normState === 'Telangana';
  const isKA = normState === 'Karnataka';
  const isMH = normState === 'Maharashtra';
  const isUP = normState === 'Uttar Pradesh';
  const isKL = normState === 'Kerala';
  const isDL = normState === 'Delhi';

  // 1. Annual Family Income Certificate
  if (key === 'incomeCertificate') {
    if (isTG) {
      return {
        friendlyName: 'Annual Family Income Certificate',
        nativeTitle: 'కుటుంబ వార్షిక ఆదాయ ధ్రువీకరణ పత్రం (MeeSeva)',
        whatItIs: 'Official certificate issued by the Revenue Department confirming total annual household income.',
        whyNeeded: 'Mandatory proof for Telangana ePASS fee reimbursement and post-matric scholarships (< ₹2 Lakh for rural / ₹2.5 Lakh for urban).',
        issuingAuthority: 'Tahsildar / Mandal Revenue Officer (MRO)',
        department: 'Revenue Department, Government of Telangana',
        onlinePortalName: 'Telangana MeeSeva 2.0 Portal',
        onlinePortalUrl: 'https://meeseva.telangana.gov.in',
        offlineOffice: 'MeeSeva Citizen Center / Tahsildar Office',
        statutoryFeeInr: 45,
        statutorySlaDays: 7,
        cyberCafeExtortionRate: '₹200 - ₹400 (Statutory Fee: ₹45)',
        precursorDocuments: [
          'Food Security Rice Card / Family Ration Card',
          'Aadhaar Cards of Student and Parents',
          'Salary Slip / Self-Declaration Affidavit',
          'Electricity Bill of Residence'
        ],
        stepByStepRoadmap: [
          'Step 1: Visit nearest Telangana MeeSeva Center with Food Security Rice Card and Aadhaar.',
          'Step 2: Submit application under Service Code REV-02 and pay statutory MeeSeva user charge of ₹45.',
          'Step 3: Village Revenue Officer (VRO) and Revenue Inspector (RI) complete field inquiry within 4 days.',
          'Step 4: Tahsildar digitally approves certificate. Download barcoded copy from meeseva.telangana.gov.in.'
        ],
        samplePreviewDescription: 'Official barcoded Telangana MeeSeva Certificate bearing Government of Telangana Emblem, Application No., and Tahsildar Digital Signature.',
        icon: '💰',
        badgeCode: 'TG-MeeSeva REV-02',
        isHighPriority: true
      };
    }

    if (isAP) {
      return {
        friendlyName: 'Annual Family Income Certificate',
        nativeTitle: 'కుటుంబ వార్షిక ఆదాయ ధ్రువీకరణ పత్రం (MeeSeva / Sachivalayam)',
        whatItIs: 'Official certificate determining annual family earnings under the Navasakam welfare benchmarks.',
        whyNeeded: 'Mandatory prerequisite for Jagananna Vidya Deevena and Vasathi Deevena fee reimbursement on Jnanabhumi.',
        issuingAuthority: 'Tahsildar / Mandal Revenue Officer (MRO)',
        department: 'Revenue Department, Government of Andhra Pradesh',
        onlinePortalName: 'AP MeeSeva / Spandana Portal',
        onlinePortalUrl: 'https://onlineap.meeseva.gov.in',
        offlineOffice: 'Grama / Ward Sachivalayam (FREE) or MeeSeva Center (₹45)',
        statutoryFeeInr: 45,
        statutorySlaDays: 8,
        cyberCafeExtortionRate: '₹250 - ₹400 (Statutory Fee: ₹45)',
        precursorDocuments: [
          'AP White Rice Card / BPL Household Card',
          'Aadhaar Card of Student and Mother',
          'Electricity Consumption Record (< 300 units/month)',
          'VRO Livelihood Assessment Form'
        ],
        stepByStepRoadmap: [
          'Step 1: Approach the Welfare & Education Assistant (WEA) at your Grama/Ward Sachivalayam or MeeSeva Center.',
          'Step 2: Complete biometric e-KYC fingerprint scan and submit application under Code REV-02.',
          'Step 3: VRO and Mandal Revenue Inspector inspect land and residential records in Spandana.',
          'Step 4: Tahsildar signs digitally. Download barcoded certificate from onlineap.meeseva.gov.in.'
        ],
        samplePreviewDescription: 'Official AP MeeSeva Certificate with Government of AP Crest, QR code, and Tahsildar Digital Signature.',
        icon: '💰',
        badgeCode: 'AP-MeeSeva REV-02',
        isHighPriority: true
      };
    }

    if (isKA) {
      return {
        friendlyName: 'Annual Family Income Certificate',
        nativeTitle: 'ಕುಟುಂಬದ ಆದಾಯ ಪ್ರಮಾಣ ಪತ್ರ (Nadakacheri / Seva Sindhu)',
        whatItIs: 'Official certificate determining gross annual family income across all earning members in Karnataka.',
        whyNeeded: 'Mandatory prerequisite for Karnataka SSP Post-Matric and Vidyasiri scholarships.',
        issuingAuthority: 'Tahsildar / Nadakacheri Deputy Tahsildar',
        department: 'Revenue Department, Government of Karnataka',
        onlinePortalName: 'Karnataka Nadakacheri (Atalji Janasnehi Kendra)',
        onlinePortalUrl: 'https://nadakacheri.karnataka.gov.in',
        offlineOffice: 'Nadakacheri / Grama One / Bangalore One Center',
        statutoryFeeInr: 40,
        statutorySlaDays: 7,
        cyberCafeExtortionRate: '₹200 - ₹350 (Statutory Fee: ₹40)',
        precursorDocuments: [
          'Karnataka Ration Card (BPL / APL)',
          'Aadhaar Card of Applicant & Family Head',
          'Salary Certificate / Land Revenue RTC (Pahani)'
        ],
        stepByStepRoadmap: [
          'Step 1: Apply online on Nadakacheri portal (nadakacheri.karnataka.gov.in) or visit nearest Grama One kiosk.',
          'Step 2: Pay official government user fee of ₹40.',
          'Step 3: Village Accountant (VA) and Revenue Inspector submit field report.',
          'Step 4: Download 15-digit RD Number digitally signed certificate within 7 working days.'
        ],
        samplePreviewDescription: 'Karnataka Government Nadakacheri document featuring 15-digit RD Certificate Number (e.g. RD0038291048123) and Barcode.',
        icon: '💰',
        badgeCode: 'KA-Nadakacheri RD',
        isHighPriority: true
      };
    }

    if (isMH) {
      return {
        friendlyName: 'Annual Family Income Certificate',
        nativeTitle: 'वार्षिक उत्पन्न प्रमाणपत्र (Aaple Sarkar)',
        whatItIs: 'Revenue certificate verifying 1-year or 3-year gross annual household income in Maharashtra.',
        whyNeeded: 'Required for MahaDBT Rajarshi Shahu Maharaj Tuition Fee Waiver and Post-Matric scholarships.',
        issuingAuthority: 'Tahsildar / Sub-Divisional Officer (SDO)',
        department: 'Revenue Department, Government of Maharashtra',
        onlinePortalName: 'Aaple Sarkar Maharashtra Portal',
        onlinePortalUrl: 'https://aaplesarkar.mahaonline.gov.in',
        offlineOffice: 'Setu Suvidha Kendra / Citizen Facilitation Center (CFC)',
        statutoryFeeInr: 33,
        statutorySlaDays: 15,
        cyberCafeExtortionRate: '₹250 - ₹500 (Statutory Fee: ₹33)',
        precursorDocuments: [
          'Ration Card / Food Security Card',
          'Income Affidavit on ₹100 Stamp Paper / Form 16 / Talathi Report',
          'Aadhaar Card of Applicant & Parents'
        ],
        stepByStepRoadmap: [
          'Step 1: Create Citizen Login on aaplesarkar.mahaonline.gov.in.',
          'Step 2: Submit Revenue Department Form 16 with Talathi inquiry report. Pay ₹33.',
          'Step 3: Circle Officer verifies residential and farm income records.',
          'Step 4: Download QR-coded digitally signed certificate.'
        ],
        samplePreviewDescription: 'Aaple Sarkar barcoded certificate with Maharashtra State Emblem and Digital Signature of Tahsildar.',
        icon: '💰',
        badgeCode: 'MH-Aaple Sarkar',
        isHighPriority: true
      };
    }

    if (isUP) {
      return {
        friendlyName: 'Annual Family Income Certificate',
        nativeTitle: 'पारिवारिक आय प्रमाण पत्र (e-District UP)',
        whatItIs: 'Official certificate certifying annual family earnings under Uttar Pradesh e-District services.',
        whyNeeded: 'Mandatory proof for UP Scholarship & Fee Reimbursement Scheme (< ₹2.5L for SC/ST, < ₹2L for General/OBC).',
        issuingAuthority: 'Tehsildar / Sub-Divisional Magistrate (SDM)',
        department: 'Board of Revenue, Government of Uttar Pradesh',
        onlinePortalName: 'UP e-District Portal',
        onlinePortalUrl: 'https://edistrict.up.gov.in',
        offlineOffice: 'Jan Seva Kendra (CSC) / Tehsil Lokvani Center',
        statutoryFeeInr: 30,
        statutorySlaDays: 10,
        cyberCafeExtortionRate: '₹150 - ₹300 (Statutory Fee: ₹30)',
        precursorDocuments: [
          'Ration Card / Parivar Register Nakal',
          'Self-Declaration Income Affidavit',
          'Aadhaar Card of Student and Guardian'
        ],
        stepByStepRoadmap: [
          'Step 1: Apply online at edistrict.up.gov.in or visit authorized Jan Seva Kendra.',
          'Step 2: Pay statutory user fee of ₹30.',
          'Step 3: Lekhpal conducts village verification of family occupation and crops.',
          'Step 4: Tehsildar approves digital certificate with unique Application & Certificate Number.'
        ],
        samplePreviewDescription: 'UP e-District certificate featuring 12-digit Application ID, 12-digit Certificate Number, and Lekhpal Report ID.',
        icon: '💰',
        badgeCode: 'UP-eDistrict',
        isHighPriority: true
      };
    }

    if (isKL) {
      return {
        friendlyName: 'Annual Family Income Certificate',
        nativeTitle: 'കുടുംബ വാർഷിക വരുമാന സർട്ടിഫിക്കറ്റ് (e-District Kerala)',
        whatItIs: 'Revenue certificate stating annual family income across agricultural, salary, and business heads in Kerala.',
        whyNeeded: 'Mandatory proof for Kerala E-Grants 3.0 and Post-Matric fee concessions.',
        issuingAuthority: 'Village Officer / Tahsildar',
        department: 'Revenue Department, Government of Kerala',
        onlinePortalName: 'Kerala e-District Portal',
        onlinePortalUrl: 'https://edistrict.kerala.gov.in',
        offlineOffice: 'Village Office / Akshaya e-Centre',
        statutoryFeeInr: 25,
        statutorySlaDays: 5,
        cyberCafeExtortionRate: '₹150 - ₹250 (Statutory Fee: ₹25)',
        precursorDocuments: [
          'Ration Card (Civil Supplies Kerala)',
          'Salary Certificate / Land Tax Receipt',
          'Aadhaar Card'
        ],
        stepByStepRoadmap: [
          'Step 1: Login to edistrict.kerala.gov.in or visit Akshaya e-Centre.',
          'Step 2: Submit application and pay fee of ₹25.',
          'Step 3: Village Officer completes verification.',
          'Step 4: Download digitally signed income certificate with 1-year validity.'
        ],
        samplePreviewDescription: 'Kerala Government document with State Emblem, Akshaya Security Code, and Village Officer Digital Signature.',
        icon: '💰',
        badgeCode: 'KL-eDistrict',
        isHighPriority: true
      };
    }

    // Default: Tamil Nadu & National e-District
    return {
      friendlyName: 'Annual Family Income Certificate',
      nativeTitle: isTN ? 'குடும்ப ஆண்டு வருமானச் சான்றிதழ் (REV-101)' : 'Family Income Certificate (Revenue Department)',
      whatItIs: 'An official government certificate confirming the total annual earnings of all family members combined.',
      whyNeeded: 'Mandatory proof to qualify for scholarships with family income ceilings (< ₹2.5 Lakh or ₹8 Lakh/yr).',
      issuingAuthority: 'Tahsildar / Zonal Deputy Tahsildar',
      department: isTN ? 'Revenue Department, Government of Tamil Nadu' : 'Revenue Department, State Government',
      onlinePortalName: isTN ? 'TNeGA e-Sevai Portal' : 'National Government Services Portal',
      onlinePortalUrl: isTN ? 'https://www.tnesevai.tn.gov.in' : 'https://services.india.gov.in',
      offlineOffice: isTN ? 'TNeGA e-Sevai Kiosk / Taluk Office' : 'Tehsil Revenue Office / Common Service Center (CSC)',
      statutoryFeeInr: 60,
      statutorySlaDays: 8,
      cyberCafeExtortionRate: '₹200 - ₹350 (Statutory Fee: ₹60)',
      precursorDocuments: [
        'Family Smart Ration Card / Food Security Card',
        'Salary Slip / Form 16 / Agricultural Land Record (Patta/Chitta)',
        'Aadhaar Cards of Applicant and Parents'
      ],
      stepByStepRoadmap: [
        'Step 1: Collate salary slip, agricultural revenue slip, or self-employment declaration.',
        'Step 2: Submit application on State e-District portal or nearest CSC/e-Sevai kiosk. Pay ₹60.',
        'Step 3: VAO conducts local field inquiry regarding agricultural yield or occupation.',
        'Step 4: Tahsildar issues digital certificate with 1-year statutory validity under 8 days SLA.'
      ],
      samplePreviewDescription: 'Standard state revenue document displaying Father\'s Name, Total Assessed Annual Income in Figures & Words, and 2D Barcode.',
      icon: '💰',
      badgeCode: isTN ? 'TNeGA REV-101' : 'e-District REV-101',
      isHighPriority: true
    };
  }

  // 2. Community / Caste Validity Certificate
  if (key === 'communityCertificate') {
    if (isTG) {
      return {
        friendlyName: 'Community / Caste Certificate',
        nativeTitle: 'కులం / సామాజిక వర్గ ధ్రువీకరణ పత్రం (MeeSeva)',
        whatItIs: 'Permanent statutory certificate validating SC, ST, BC-A/B/C/D/E, and EWS category in Telangana.',
        whyNeeded: 'Required for Telangana ePASS post-matric fee reimbursement and convenor quota admissions.',
        issuingAuthority: 'Tahsildar / Mandal Revenue Officer (MRO)',
        department: 'Scheduled Castes / BC Welfare Department, Government of Telangana',
        onlinePortalName: 'Telangana MeeSeva Portal',
        onlinePortalUrl: 'https://meeseva.telangana.gov.in',
        offlineOffice: 'MeeSeva Center / Tahsildar Office',
        statutoryFeeInr: 45,
        statutorySlaDays: 15,
        cyberCafeExtortionRate: '₹250 - ₹450 (Statutory Fee: ₹45)',
        precursorDocuments: [
          'Father / Mother MeeSeva Caste Certificate or Sibling Record',
          'Applicant 10th Marks Memo / School Bonafide',
          'Family Ration Card / Rice Card',
          'Aadhaar Card'
        ],
        stepByStepRoadmap: [
          'Step 1: Collect parent\'s caste certificate or revenue lineage document.',
          'Step 2: Apply at MeeSeva Center under Integrated Certificate (Code REV-01). Pay ₹45.',
          'Step 3: VRO and Revenue Inspector verify lineage in Mandal registry.',
          'Step 4: Download permanent digitally signed barcoded certificate.'
        ],
        samplePreviewDescription: 'Permanent barcoded certificate stating sub-caste, G.O. notification, and Tahsildar digital signature.',
        icon: '🏛️',
        badgeCode: 'TG-MeeSeva REV-01',
        isHighPriority: true
      };
    }

    if (isAP) {
      return {
        friendlyName: 'Integrated Caste, Nativity & DOB Certificate',
        nativeTitle: 'కుల, నివాస మరియు జన్మదిన ధ్రువీకరణ పత్రం (MeeSeva / Sachivalayam)',
        whatItIs: 'Permanent 3-in-1 statutory certificate validating Community, State Nativity, and Date of Birth in Andhra Pradesh.',
        whyNeeded: 'Mandatory prerequisite for Jagananna Vidya Deevena and college convenor counseling on Jnanabhumi.',
        issuingAuthority: 'Tahsildar / Mandal Revenue Officer (MRO)',
        department: 'Social Welfare / BC Welfare Dept, Government of Andhra Pradesh',
        onlinePortalName: 'AP MeeSeva Portal',
        onlinePortalUrl: 'https://onlineap.meeseva.gov.in',
        offlineOffice: 'Grama / Ward Sachivalayam (FREE) or MeeSeva Center (₹45)',
        statutoryFeeInr: 45,
        statutorySlaDays: 15,
        cyberCafeExtortionRate: '₹250 - ₹400 (Statutory Fee: ₹45)',
        precursorDocuments: [
          'Parents\' Caste Record or Paternal Land Document',
          'Applicant SSC Marks Memo (10th Class)',
          'Aadhaar Card & White Rice Card'
        ],
        stepByStepRoadmap: [
          'Step 1: Compile parent caste certificate and 10th marks memo.',
          'Step 2: Submit application at Grama Sachivalayam or MeeSeva under Code REV-01.',
          'Step 3: VRO checks village lineage register and records statements.',
          'Step 4: Download permanent 3-in-1 QR-coded certificate from onlineap.meeseva.gov.in.'
        ],
        samplePreviewDescription: 'Official AP 3-in-1 Integrated Certificate with Barcode, Sub-caste, and Tahsildar Digital Signature.',
        icon: '🏛️',
        badgeCode: 'AP-MeeSeva REV-01',
        isHighPriority: true
      };
    }

    if (isKA) {
      return {
        friendlyName: 'Caste / Category Certificate (SC/ST/Cat-1/2A/2B/3A/3B)',
        nativeTitle: 'ಜಾತಿ ಪ್ರಮಾಣ ಪತ್ರ (Nadakacheri / Seva Sindhu)',
        whatItIs: 'Statutory certificate certifying constitutional reservation category in Karnataka.',
        whyNeeded: 'Required for Karnataka SSP fee waiver, Post-Matric grant, and KEA engineering/medical counseling.',
        issuingAuthority: 'Tahsildar / Nadakacheri Deputy Tahsildar',
        department: 'Social Welfare & Backward Classes Dept, Government of Karnataka',
        onlinePortalName: 'Karnataka Nadakacheri Portal',
        onlinePortalUrl: 'https://nadakacheri.karnataka.gov.in',
        offlineOffice: 'Nadakacheri / Grama One / Bangalore One',
        statutoryFeeInr: 40,
        statutorySlaDays: 15,
        cyberCafeExtortionRate: '₹200 - ₹350 (Statutory Fee: ₹40)',
        precursorDocuments: [
          'Parents\' School Leaving TC or Caste Certificate',
          'Applicant School TC / Marks Card',
          'Ration Card and Aadhaar Card'
        ],
        stepByStepRoadmap: [
          'Step 1: Submit online application on nadakacheri.karnataka.gov.in or at Grama One.',
          'Step 2: Pay statutory user charge of ₹40.',
          'Step 3: Revenue Inspector verifies family caste history.',
          'Step 4: Download certificate with 15-digit RD Reference Number.'
        ],
        samplePreviewDescription: 'Karnataka Nadakacheri certificate with State Crest and RD Reference Number (e.g. RD0038491029381).',
        icon: '🏛️',
        badgeCode: 'KA-Nadakacheri RD',
        isHighPriority: true
      };
    }

    // Default: Tamil Nadu & National e-District
    return {
      friendlyName: 'Community / Caste Certificate',
      nativeTitle: isTN ? 'சாதி / சமூகப் பிரிவு சான்றிதழ் (REV-103)' : 'Community / Caste Validity Certificate',
      whatItIs: 'A permanent statutory document validating your social category (SC, ST, OBC, MBC, BC, or EWS).',
      whyNeeded: 'Required to claim fee reimbursements, post-matric grants, and reserved scholarship quotas.',
      issuingAuthority: 'Zonal Deputy Tahsildar / Revenue Divisional Officer (RDO)',
      department: isTN ? 'BC, MBC & Minorities Welfare / Adi Dravidar Welfare Dept' : 'Social Welfare Department',
      onlinePortalName: isTN ? 'TNeGA e-Sevai Portal' : 'National Government Services Portal',
      onlinePortalUrl: isTN ? 'https://www.tnesevai.tn.gov.in' : 'https://services.india.gov.in',
      offlineOffice: isTN ? 'TNeGA e-Sevai Center / Taluk Office' : 'Tehsil Revenue Office / Common Service Center (CSC)',
      statutoryFeeInr: 60,
      statutorySlaDays: 15,
      cyberCafeExtortionRate: '₹250 - ₹400 (Statutory Fee: ₹60)',
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
      icon: '🏛️',
      badgeCode: isTN ? 'TNeGA REV-103' : 'e-District REV-103',
      isHighPriority: true
    };
  }

  // 3. Smart Family Ration Card / Rice Card (CRITICAL USER CONCERN: State-specific EPDS)
  if (key === 'rationCard') {
    if (isTG) {
      return {
        friendlyName: 'Telangana Food Security Rice Card / Ration Card',
        nativeTitle: 'తెలంగాణ ఆహార భద్రతా కార్డు (EPDS)',
        whatItIs: 'Official civil supplies card issued by Civil Supplies Department of Telangana reflecting household head and dependent members.',
        whyNeeded: 'Used by Telangana ePASS and MeeSeva to verify rural/urban BPL poverty status and family unit hierarchy.',
        issuingAuthority: 'Chief Rationing Officer (CRO) / District Civil Supplies Officer',
        department: 'Consumer Affairs, Food & Civil Supplies Dept, Govt of Telangana',
        onlinePortalName: 'Telangana EPDS Portal',
        onlinePortalUrl: 'https://epds.telangana.gov.in',
        offlineOffice: 'Tahsildar / MeeSeva Center / Civil Supplies Counter',
        statutoryFeeInr: 35,
        statutorySlaDays: 15,
        cyberCafeExtortionRate: '₹150 - ₹300 (Statutory Fee: ₹35)',
        precursorDocuments: [
          'Aadhaar Cards of all family members',
          'Electricity Bill or Gas Connection Receipt',
          'Photograph of Family Head (Female Head of Household)'
        ],
        stepByStepRoadmap: [
          'Step 1: Check your FSC Search status or apply for new member inclusion on epds.telangana.gov.in.',
          'Step 2: Submit application at MeeSeva with family Aadhaar details. Pay ₹35.',
          'Step 3: Assistant Civil Supplies Officer (ACSO) conducts field verification.',
          'Step 4: Download approved Food Security Card (FSC) document.'
        ],
        samplePreviewDescription: 'Telangana Food Security Card featuring FSC Reference Number, Head of Family details, and listed beneficiaries.',
        icon: '🌾',
        badgeCode: 'TG-EPDS FSC',
        isHighPriority: false
      };
    }

    if (isAP) {
      return {
        friendlyName: 'Andhra Pradesh White Rice Card / Ration Card',
        nativeTitle: 'ఆంధ్రప్రదేశ్ వైట్ రైస్ కార్డు / బియ్యం కార్డు (EPDS / Navasakam)',
        whatItIs: 'Smart welfare civil supplies card identifying households eligible for Navasakam welfare schemes and fee reimbursements.',
        whyNeeded: 'Primary anchor document for AP Jagananna Vidya Deevena & Vasathi Deevena eligibility.',
        issuingAuthority: 'Joint Collector / District Civil Supplies Officer',
        department: 'Consumer Affairs, Food & Civil Supplies Dept, Govt of Andhra Pradesh',
        onlinePortalName: 'AP Civil Supplies EPDS Portal',
        onlinePortalUrl: 'https://onlineap.meeseva.gov.in',
        offlineOffice: 'Grama / Ward Sachivalayam (Digital Assistant / VRO Counter)',
        statutoryFeeInr: 0,
        statutorySlaDays: 10,
        cyberCafeExtortionRate: '₹150 - ₹300 (Statutorily FREE at Sachivalayam)',
        precursorDocuments: [
          'Aadhaar Cards of all family members with active biometric mapping',
          'Electricity Bill (< 300 units/mo)',
          'No 4-Wheeler & Municipal Property Tax Records'
        ],
        stepByStepRoadmap: [
          'Step 1: Approach the Welfare & Education Assistant at your local Grama/Ward Sachivalayam.',
          'Step 2: Verify family members in the Navasakam household database (100% FREE).',
          'Step 3: Complete biometric e-KYC for all earning and dependent members.',
          'Step 4: Download official Rice Card from onlineap.meeseva.gov.in or Sachivalayam portal.'
        ],
        samplePreviewDescription: 'AP Navasakam White Rice Card with Household ID, family photograph, and QR-verification code.',
        icon: '🌾',
        badgeCode: 'AP-Navasakam Rice Card',
        isHighPriority: false
      };
    }

    if (isKA) {
      return {
        friendlyName: 'Karnataka Ration Card (BPL / Anthyodaya / APL)',
        nativeTitle: 'ಕರ್ನಾಟಕ ಪಡಿತರ ಚೀಟಿ (Ahara Food & Civil Supplies)',
        whatItIs: 'Digital ration card issued by Food, Civil Supplies and Consumer Affairs Department of Karnataka.',
        whyNeeded: 'Required for Kutumba Family ID synchronization and Karnataka SSP scholarship income benchmarking.',
        issuingAuthority: 'Tahsildar / Food Shirastedar',
        department: 'Food, Civil Supplies & Consumer Affairs Dept, Govt of Karnataka',
        onlinePortalName: 'Karnataka Ahara Portal',
        onlinePortalUrl: 'https://ahara.karnataka.gov.in',
        offlineOffice: 'Grama One / Bangalore One / Taluk Food Office',
        statutoryFeeInr: 50,
        statutorySlaDays: 15,
        cyberCafeExtortionRate: '₹200 - ₹400 (Statutory Fee: ₹50)',
        precursorDocuments: [
          'Aadhaar Cards of all family members',
          'Electricity Bill / Address Proof in Karnataka',
          'Income Proof of Family Head'
        ],
        stepByStepRoadmap: [
          'Step 1: Access Karnataka Ahara portal (ahara.karnataka.gov.in) or visit Grama One.',
          'Step 2: Submit family details with OTP authentication. Pay ₹50.',
          'Step 3: Food Inspector validates address and gas cylinder count.',
          'Step 4: Download approved e-Ration card.'
        ],
        samplePreviewDescription: 'Karnataka Ahara e-Ration card with RC Number, family member table, and biometric authentication status.',
        icon: '🌾',
        badgeCode: 'KA-Ahara RC',
        isHighPriority: false
      };
    }

    if (isMH) {
      return {
        friendlyName: 'Maharashtra Ration Card (RCMS NFSA)',
        nativeTitle: 'महाराष्ट्र शिधापत्रिका / राशन कार्ड (MahaFood)',
        whatItIs: 'State Food Civil Supplies card categorizing yellow, saffron, or white card holders under NFSA in Maharashtra.',
        whyNeeded: 'Validates family income slab and domicile status on MahaDBT scholarship applications.',
        issuingAuthority: 'Food Distribution Officer (FDO) / Tahsildar',
        department: 'Food, Civil Supplies & Consumer Protection Dept, Govt of Maharashtra',
        onlinePortalName: 'Maharashtra MahaFood RCMS Portal',
        onlinePortalUrl: 'https://rcms.mahafood.gov.in',
        offlineOffice: 'Rationing Office / Tehsil Food Counter / Setu Kendra',
        statutoryFeeInr: 50,
        statutorySlaDays: 15,
        cyberCafeExtortionRate: '₹200 - ₹400 (Statutory Fee: ₹50)',
        precursorDocuments: ['Aadhaar Cards of all members', 'Residential Gas Receipt', 'Income Proof'],
        stepByStepRoadmap: [
          'Step 1: Apply on rcms.mahafood.gov.in or at nearest Setu Kendra.',
          'Step 2: Pay statutory user fee of ₹50.',
          'Step 3: Supply Inspector completes spot verification.',
          'Step 4: Collect digitally stamped 12-digit Ration Card.'
        ],
        samplePreviewDescription: 'MahaFood digital ration card with 12-digit SRC number and barcode.',
        icon: '🌾',
        badgeCode: 'MH-MahaFood RC',
        isHighPriority: false
      };
    }

    if (isUP) {
      return {
        friendlyName: 'Uttar Pradesh Ration Card (FCS Portal)',
        nativeTitle: 'उत्तर प्रदेश राशन कार्ड / खाद्य सुरक्षा कार्ड (FCS UP)',
        whatItIs: 'Civil supplies ration card issued by Food and Civil Supplies Department of Uttar Pradesh.',
        whyNeeded: 'Mandatory anchor document for UP Scholarship portal family authentication.',
        issuingAuthority: 'District Supply Officer (DSO) / Supply Inspector',
        department: 'Food and Civil Supplies Department, Government of Uttar Pradesh',
        onlinePortalName: 'UP Food & Civil Supplies (FCS) Portal',
        onlinePortalUrl: 'https://fcs.up.gov.in',
        offlineOffice: 'Tehsil Supply Office / Jan Seva Kendra (CSC)',
        statutoryFeeInr: 20,
        statutorySlaDays: 15,
        cyberCafeExtortionRate: '₹150 - ₹300 (Statutory Fee: ₹20)',
        precursorDocuments: ['Family Aadhaar Cards', 'Bank Account details of Female Head of Family', 'Gas Connection Passbook'],
        stepByStepRoadmap: [
          'Step 1: File application at fcs.up.gov.in or through Jan Seva Kendra. Pay ₹20.',
          'Step 2: Supply Inspector conducts field scrutiny of eligible household members.',
          'Step 3: Download digitized ration card from FCS portal.'
        ],
        samplePreviewDescription: 'UP FCS barcoded ration card with 12-digit Ration Card Number and Head of Family photo.',
        icon: '🌾',
        badgeCode: 'UP-FCS Ration Card',
        isHighPriority: false
      };
    }

    if (isKL) {
      return {
        friendlyName: 'Kerala Smart Ration Card (Civil Supplies Kerala)',
        nativeTitle: 'കേരള സ്മാർട്ട് റേഷൻ കാർഡ് (Civil Supplies)',
        whatItIs: 'Electronic smart ration card issued by Civil Supplies Department of Kerala (Priority / Non-Priority).',
        whyNeeded: 'Required for Kerala E-Grants scholarship household mapping and BPL eligibility.',
        issuingAuthority: 'Taluk Supply Officer (TSO)',
        department: 'Civil Supplies Department, Government of Kerala',
        onlinePortalName: 'Civil Supplies Kerala Citizen Portal',
        onlinePortalUrl: 'https://ecitizen.civilsupplieskerala.gov.in',
        offlineOffice: 'Taluk Supply Office / Akshaya e-Centre',
        statutoryFeeInr: 25,
        statutorySlaDays: 15,
        cyberCafeExtortionRate: '₹150 - ₹250 (Statutory Fee: ₹25)',
        precursorDocuments: ['Aadhaar Cards of family members', 'Electricity Bill / House Tax Receipt'],
        stepByStepRoadmap: [
          'Step 1: Access ecitizen.civilsupplieskerala.gov.in or Akshaya Centre.',
          'Step 2: Submit family particulars with Aadhaar authentication. Pay ₹25.',
          'Step 3: TSO approves digital smart ration card within 15 days.'
        ],
        samplePreviewDescription: 'Kerala e-Ration card showing 10-digit Ration Card Number, Category Color, and Family Tree.',
        icon: '🌾',
        badgeCode: 'KL-Civil Supplies',
        isHighPriority: false
      };
    }

    if (isDL) {
      return {
        friendlyName: 'Delhi e-Ration Card (NFS Delhi)',
        nativeTitle: 'दिल्ली ई-राशन कार्ड (Food & Supplies Dept)',
        whatItIs: 'Digital e-ration card issued under National Food Security Scheme by Government of NCT of Delhi.',
        whyNeeded: 'Verifies resident family status and poverty slab for Delhi state scholarship schemes.',
        issuingAuthority: 'Food and Supplies Officer (FSO) / Circle Office',
        department: 'Department of Food Supplies and Consumer Affairs, GNCTD',
        onlinePortalName: 'Delhi NFS Portal',
        onlinePortalUrl: 'https://edistrict.delhigovt.nic.in',
        offlineOffice: 'Circle FSO Office / Delhi e-District Citizen Counter',
        statutoryFeeInr: 0,
        statutorySlaDays: 15,
        cyberCafeExtortionRate: '₹150 - ₹300 (Statutorily FREE)',
        precursorDocuments: ['Aadhaar Cards of all members', 'Electricity Bill in Delhi', 'Bank Passbook of Family Head'],
        stepByStepRoadmap: [
          'Step 1: Apply online on edistrict.delhigovt.nic.in with Aadhaar details (FREE).',
          'Step 2: Circle FSO verifies residence and electricity meter load.',
          'Step 3: Download digital e-Ration card directly.'
        ],
        samplePreviewDescription: 'Delhi NFS digitally signed e-Ration card with QR code and Circle code.',
        icon: '🌾',
        badgeCode: 'DL-NFS e-Ration',
        isHighPriority: false
      };
    }

    // Default: Tamil Nadu & National Food Security
    return {
      friendlyName: 'Smart Family Ration Card / Food Security Card',
      nativeTitle: isTN ? 'ஸ்மார்ட் குடும்ப அட்டை (TNEPDS)' : 'Family Ration Card / Food Security Card',
      whatItIs: 'Civil supplies card showing household head, all dependent family members, and BPL categorization.',
      whyNeeded: 'Proves family relationships, sibling count, and BPL/AAY poverty classification.',
      issuingAuthority: isTN ? 'Civil Supplies & Consumer Protection Dept' : 'District Civil Supplies Office',
      department: isTN ? 'Civil Supplies Department, Government of Tamil Nadu' : 'Food and Civil Supplies Department',
      onlinePortalName: isTN ? 'Tamil Nadu TNEPDS Portal' : 'National Food Security Portal',
      onlinePortalUrl: isTN ? 'https://www.tnpds.gov.in' : 'https://nfsa.gov.in',
      offlineOffice: isTN ? 'Taluk Supply Office (TSO) / e-Sevai Kiosk' : 'District Food & Civil Supplies Office / CSC',
      statutoryFeeInr: 20,
      statutorySlaDays: 15,
      cyberCafeExtortionRate: '₹150 - ₹300 (Statutory Fee: ₹20)',
      precursorDocuments: ['Aadhaar Cards of all family members', 'Gas connection cylinder receipt'],
      stepByStepRoadmap: [
        'Step 1: Check that applicant name is listed as a family member under the card.',
        'Step 2: Use TNEPDS / State PDS app for instant verification.'
      ],
      samplePreviewDescription: 'Smart card containing family photo, family head name, cylinder count, and listed beneficiaries.',
      icon: '🌾',
      badgeCode: isTN ? 'TNEPDS SMART' : 'PDS-SMART',
      isHighPriority: false
    };
  }

  // 4. Nativity / Domicile Certificate
  if (key === 'nativityCertificate') {
    if (isTG) {
      return {
        friendlyName: 'Telangana Residence / Nativity Certificate',
        nativeTitle: 'స్థానికత / నివాస ధ్రువీకరణ పత్రం (MeeSeva REV-03)',
        whatItIs: 'Proof of continuous residence in Telangana established through local school study or property records.',
        whyNeeded: 'Mandatory for Telangana convenor seats and state welfare schemes.',
        issuingAuthority: 'Tahsildar / Mandal Revenue Officer',
        department: 'Revenue Department, Government of Telangana',
        onlinePortalName: 'Telangana MeeSeva Portal',
        onlinePortalUrl: 'https://meeseva.telangana.gov.in',
        offlineOffice: 'MeeSeva Center / Tahsildar Office',
        statutoryFeeInr: 45,
        statutorySlaDays: 7,
        cyberCafeExtortionRate: '₹200 - ₹350 (Statutory Fee: ₹45)',
        precursorDocuments: ['Continuous Study Bonafides (4 to 7 years)', 'Aadhaar Card & Food Security Card'],
        stepByStepRoadmap: [
          'Step 1: Collect school study bonafides from Class 6 to 12.',
          'Step 2: Submit application at MeeSeva under Code REV-03. Pay ₹45.',
          'Step 3: Tahsildar digitally approves residence certificate within 7 days.'
        ],
        samplePreviewDescription: 'Telangana MeeSeva barcoded residence certificate signed by Tahsildar.',
        icon: '📍',
        badgeCode: 'TG-MeeSeva REV-03',
        isHighPriority: false
      };
    }

    if (isAP) {
      return {
        friendlyName: 'Andhra Pradesh Residence / Nativity Certificate',
        nativeTitle: 'స్థానికత / నివాస ధ్రువీకరణ పత్రం (MeeSeva REV-03)',
        whatItIs: 'Proof of continuous residence within Andhra Pradesh to claim local state counseling and welfare benefits.',
        whyNeeded: 'Required for AP convenor admissions and local reservation eligibility on Jnanabhumi.',
        issuingAuthority: 'Tahsildar / Mandal Revenue Officer (MRO)',
        department: 'Revenue Department, Government of Andhra Pradesh',
        onlinePortalName: 'AP MeeSeva Portal',
        onlinePortalUrl: 'https://onlineap.meeseva.gov.in',
        offlineOffice: 'Grama / Ward Sachivalayam (FREE) or MeeSeva Center (₹45)',
        statutoryFeeInr: 45,
        statutorySlaDays: 7,
        cyberCafeExtortionRate: '₹200 - ₹350 (Statutory Fee: ₹45)',
        precursorDocuments: ['Continuous Study Certificates (4 to 7 Years)', 'Family Ration Card / Rice Card', 'Aadhaar Card'],
        stepByStepRoadmap: [
          'Step 1: Collect study certificates from local schools in Andhra Pradesh.',
          'Step 2: Submit application at Sachivalayam / MeeSeva under Code REV-03.',
          'Step 3: Tahsildar verifies and signs digitally within 7 days.'
        ],
        samplePreviewDescription: 'AP MeeSeva residence certificate with QR code and Tahsildar digital signature.',
        icon: '📍',
        badgeCode: 'AP-MeeSeva REV-03',
        isHighPriority: false
      };
    }

    // Default: Tamil Nadu & National
    return {
      friendlyName: 'Nativity / Residence Certificate',
      nativeTitle: isTN ? 'இருப்பிடச் / பூர்வீகச் சான்றிதழ் (REV-102)' : 'Nativity / Domicile Certificate',
      whatItIs: 'Proof of continuous residence within the state (minimum 5 years) established through school study or property records.',
      whyNeeded: 'Mandatory for state government scholarship schemes and state quota college counseling.',
      issuingAuthority: 'Tahsildar / Taluk Office',
      department: isTN ? 'Revenue Department, Government of Tamil Nadu' : 'Revenue Department',
      onlinePortalName: isTN ? 'TNeGA e-Sevai Portal' : 'National Government Services Portal',
      onlinePortalUrl: isTN ? 'https://www.tnesevai.tn.gov.in' : 'https://services.india.gov.in',
      offlineOffice: isTN ? 'Taluk Office / e-Sevai Kiosk' : 'Tehsil Revenue Office / CSC',
      statutoryFeeInr: 60,
      statutorySlaDays: 7,
      cyberCafeExtortionRate: '₹200 - ₹300 (Statutory Fee: ₹60)',
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
      icon: '📍',
      badgeCode: isTN ? 'TNeGA REV-102' : 'e-District REV-102',
      isHighPriority: false
    };
  }

  // 5. First Graduate Certificate
  if (key === 'firstGraduateCertificate') {
    return {
      friendlyName: 'First Graduate Certificate (No Degree in Family)',
      nativeTitle: isTN ? 'முதல் பட்டதாரி சான்றிதழ் (REV-104)' : 'First Graduate Certificate (First-Generation Learner)',
      whatItIs: 'Certifies that you are the very first person in your entire family (parents and siblings) to pursue higher education.',
      whyNeeded: 'Waives 100% of college tuition fees for professional & degree programs under state welfare acts.',
      issuingAuthority: 'Tahsildar / Zonal Deputy Tahsildar',
      department: isTN ? 'Revenue & Disaster Management Department, Govt of Tamil Nadu' : 'Revenue & Higher Education Department',
      onlinePortalName: isTN ? 'TNeGA e-Sevai Portal' : 'National Government Services Portal',
      onlinePortalUrl: isTN ? 'https://www.tnesevai.tn.gov.in' : 'https://services.india.gov.in',
      offlineOffice: isTN ? 'Taluk Office / Village Administrative Officer (VAO)' : 'Tehsil Office / Revenue Counter',
      statutoryFeeInr: 60,
      statutorySlaDays: 15,
      cyberCafeExtortionRate: '₹300 - ₹500 (Statutory Fee: ₹60)',
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
      samplePreviewDescription: 'Official Green-bordered certificate featuring State Emblem, Unique Certificate No., Tahsildar Digital Signature, and Verification QR Code.',
      icon: '🎓',
      badgeCode: isTN ? 'TNeGA REV-104' : 'REV-104',
      isHighPriority: true
    };
  }

  // 6. 7.5% Govt School Continuous Study Certificate
  if (key === 'govtSchool7_5Certificate') {
    return {
      friendlyName: '7.5% Govt School Continuous Study Certificate',
      nativeTitle: isTN ? '7.5% அரசுப் பள்ளி தொடர் படிப்பு சான்றிதழ் (இணைப்பு-3)' : '7.5% Govt School Study Certificate (Annexure-III)',
      whatItIs: 'Annexure-III document proving 100% continuous education from Class 6 to 12 in Government schools.',
      whyNeeded: 'Unlocks 7.5% preferential college seats & Pudhumai Penn / Moovalur monthly stipends.',
      issuingAuthority: 'Headmaster & Block Educational Officer (BEO) / Chief Educational Officer (CEO)',
      department: 'School Education Department',
      onlinePortalName: isTN ? 'Tamil Nadu EMIS Portal' : 'State School Education Portal',
      onlinePortalUrl: isTN ? 'https://emis.tnschools.gov.in' : 'https://services.india.gov.in',
      offlineOffice: 'Concerned Government School Headmaster / BEO Office',
      statutoryFeeInr: 0,
      statutorySlaDays: 3,
      cyberCafeExtortionRate: '₹150 - ₹300 (Statutorily FREE)',
      precursorDocuments: [
        'Transfer Certificates from Class 6 to 12 showing 100% Government School education',
        'EMIS Student ID Number',
        '10th and 12th Marksheet copies'
      ],
      stepByStepRoadmap: [
        'Step 1: Approach the Headmaster of the Government Higher Secondary School where you passed Class 12.',
        'Step 2: Headmaster fills Annexure-III verifying continuous study from Class 6 to 12 in Govt Schools (Corporation / Municipal / Adi Dravidar / Forest schools).',
        'Step 3: Certificate is counter-signed by Block Educational Officer (BEO) or CEO.',
        'Step 4: Official fee is ₹0 (Completely Free). Never pay any agent.'
      ],
      samplePreviewDescription: 'Official Annexure-III proforma signed by School HM with School Seal and counter-signed by BEO/CEO with EMIS ID.',
      icon: '🏫',
      badgeCode: 'SCH-7.5 (Annexure-III)',
      isHighPriority: true
    };
  }

  // 7. Bank Passbook NPCI DBT
  if (key === 'bankPassbookNPCI') {
    return {
      friendlyName: 'Aadhaar-Seeded Bank Passbook (NPCI DBT Account)',
      nativeTitle: 'NPCI DBT மேப் செய்யப்பட்ட வங்கி கணக்கு (Direct Benefit Transfer)',
      whatItIs: 'A bank account specifically enabled on the NPCI Aadhaar Payment Bridge for direct government fund transfers.',
      whyNeeded: 'Critical: Over 30% of scholarship grants fail at the treasury stage if NPCI DBT mapping is inactive.',
      issuingAuthority: 'Bank Branch Manager / NPCI National Gateway',
      department: 'National Payments Corporation of India (NPCI) / PFMS',
      onlinePortalName: 'UIDAI myAadhaar Bank Seeding Status',
      onlinePortalUrl: 'https://myaadhaar.uidai.gov.in',
      offlineOffice: 'Home Bank Branch (Submit Annexure-I Mandate Form)',
      statutoryFeeInr: 0,
      statutorySlaDays: 2,
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
      icon: '🏦',
      badgeCode: 'NPCI-DBT (Annexure-I)',
      isHighPriority: true
    };
  }

  // 8. Aadhaar Card
  if (key === 'aadhaarCard') {
    return {
      friendlyName: 'Aadhaar Card (With Active Mobile OTP)',
      nativeTitle: 'ஆதார் அட்டை (செயலில் உள்ள மொபைல் எண் இணைப்புடன்)',
      whatItIs: 'National 12-digit biometric identity card with your active mobile number linked for OTP logins.',
      whyNeeded: 'Required for National Scholarship Portal (NSP) One-Time Registration (OTR) and e-KYC.',
      issuingAuthority: 'Unique Identification Authority of India (UIDAI)',
      department: 'Ministry of Electronics and IT (MeitY)',
      onlinePortalName: 'myAadhaar UIDAI Portal',
      onlinePortalUrl: 'https://myaadhaar.uidai.gov.in',
      offlineOffice: 'Aadhaar Seva Kendra / Post Office',
      statutoryFeeInr: 50,
      statutorySlaDays: 5,
      cyberCafeExtortionRate: '₹150 - ₹300 (Statutory Fee: ₹50 for updates)',
      precursorDocuments: ['Proof of Identity & Proof of Date of Birth (10th Marksheet)'],
      stepByStepRoadmap: [
        'Step 1: Verify that the spelling of your name in Aadhaar matches your 10th marksheet exactly.',
        'Step 2: If misspelled, update demographic details via myAadhaar portal or nearest Post Office Aadhaar counter.'
      ],
      samplePreviewDescription: 'Standard 12-digit UIDAI card with QR code and active linked mobile for OTP reception.',
      icon: '🪪',
      badgeCode: 'UIDAI-01',
      isHighPriority: false
    };
  }

  // 9. 10th & 12th Marksheet
  if (key === 'marksheet10th12th') {
    return {
      friendlyName: '10th & 12th Standard Board Marksheet',
      nativeTitle: '10 மற்றும் 12-ஆம் வகுப்பு மதிப்பெண் சான்றிதழ்கள்',
      whatItIs: 'Official examination certificate showing subject-wise marks, total percentage, and roll number.',
      whyNeeded: 'Verifies merit cutoffs (e.g., ≥50%, ≥60%, ≥80%) required for central & state scholarships.',
      issuingAuthority: 'State Board of School Examinations / CBSE / CISCE',
      department: 'Department of Government Examinations',
      onlinePortalName: 'DigiLocker Portal',
      onlinePortalUrl: 'https://www.digilocker.gov.in',
      offlineOffice: 'School of Last Study / DGE Office',
      statutoryFeeInr: 0,
      statutorySlaDays: 1,
      cyberCafeExtortionRate: '₹50 - ₹100 (Instant Free Download on DigiLocker)',
      precursorDocuments: ['Exam Roll Number and Hall Ticket'],
      stepByStepRoadmap: [
        'Step 1: Download verified digital copy from DigiLocker or use school original.',
        'Step 2: Ensure student name and father name match other documents.'
      ],
      samplePreviewDescription: 'Official board marksheet showing subject marks, total marks, percentage, and permanent register number.',
      icon: '📜',
      badgeCode: 'EDU-MARK (DigiLocker)',
      isHighPriority: false
    };
  }

  // 10. Disability Certificate UDID
  if (key === 'disabilityCertificate') {
    return {
      friendlyName: 'Disability Certificate / UDID Card (40%+ PwD)',
      nativeTitle: 'மாற்றுத்திறனாளி தனித்துவ அடையாள அட்டை (UDID)',
      whatItIs: 'Unique Disability Identity Card issued by the District Medical Board certifying 40%+ permanent disability.',
      whyNeeded: 'Unlocks AICTE Saksham grant (₹50,000/yr), PwD fee waivers, and escort allowances.',
      issuingAuthority: 'District Medical Board / Dept of Empowerment of Persons with Disabilities',
      department: 'Ministry of Social Justice and Empowerment',
      onlinePortalName: 'Swavlamban Card Portal',
      onlinePortalUrl: 'https://www.swavlambancard.gov.in',
      offlineOffice: 'District Government Headquarters Hospital',
      statutoryFeeInr: 0,
      statutorySlaDays: 30,
      cyberCafeExtortionRate: '₹200 - ₹500 (Statutorily FREE)',
      precursorDocuments: ['Medical Assessment Report', 'Aadhaar Card', 'Passport size photo'],
      stepByStepRoadmap: [
        'Step 1: Register on swavlambancard.gov.in.',
        'Step 2: Attend assessment by District Medical Board.',
        'Step 3: Receive permanent digital UDID card with disability percentage.'
      ],
      samplePreviewDescription: 'National blue UDID card stating percentage of permanent disability, medical board authorization, and QR code.',
      icon: '♿',
      badgeCode: 'UDID-PWD',
      isHighPriority: false
    };
  }

  // 11. EWS Certificate
  if (key === 'ewsCertificate') {
    return {
      friendlyName: 'EWS Certificate (Economically Weaker Section - General)',
      nativeTitle: 'பொருளாதாரத்தில் நலிவடைந்த பிரிவு (EWS) சான்றிதழ்',
      whatItIs: 'Income and asset certificate for General category students with family gross income < ₹8 Lakh and land limits.',
      whyNeeded: 'Grants access to 10% EWS reservation in central institutions and need-based fee remissions.',
      issuingAuthority: 'Tahsildar / Sub-Divisional Officer (SDO)',
      department: 'Revenue & Social Justice Department',
      onlinePortalName: isTN ? 'TNeGA e-Sevai' : 'State e-District / CSC Center',
      onlinePortalUrl: isTN ? 'https://www.tnesevai.tn.gov.in' : 'https://services.india.gov.in',
      offlineOffice: 'Taluk / Tehsil Office',
      statutoryFeeInr: 60,
      statutorySlaDays: 15,
      cyberCafeExtortionRate: '₹300 - ₹600 (Statutory Fee: ₹60)',
      precursorDocuments: ['Income Proof (< ₹8 Lakh)', 'Land / Property Holding Records (< 5 Acres agricultural land)', 'Aadhaar & Ration Card'],
      stepByStepRoadmap: [
        'Step 1: Obtain land and family gross annual income certificate.',
        'Step 2: Submit application Form Annexure-I on e-District / CSC.',
        'Step 3: Revenue Inspector field inspection of residential flat / agricultural assets.',
        'Step 4: Tahsildar issues digital EWS certificate valid for 1 Financial Year.'
      ],
      samplePreviewDescription: 'Central / State format income & asset certificate for reservation under 103rd Constitutional Amendment.',
      icon: '🛡️',
      badgeCode: 'EWS-CENTRAL',
      isHighPriority: false
    };
  }

  // 12. College Bonafide Certificate
  return {
    friendlyName: 'Current College Bonafide Student Certificate',
    nativeTitle: 'கல்லூரி மாணவர் உண்மைத்தன்மை சான்றிதழ் (Bonafide)',
    whatItIs: 'Official certificate on college letterhead confirming you are currently enrolled in a full-time regular course.',
    whyNeeded: 'Mandatory proof of college admission, AISHE institutional code, and current semester enrollment.',
    issuingAuthority: 'College Principal / Registrar / Dean',
    department: 'Higher Education Institution',
    onlinePortalName: 'College Student ERP Portal',
    onlinePortalUrl: 'https://services.india.gov.in',
    offlineOffice: 'College Academic / Scholarship Section',
    statutoryFeeInr: 0,
    statutorySlaDays: 2,
    cyberCafeExtortionRate: '₹50 - ₹100 (Issued Free by Institute)',
    precursorDocuments: ['College ID Card & Admission Allotment Order', 'Current Semester Fee Receipt'],
    stepByStepRoadmap: [
      'Step 1: Submit written request to College Scholarship Nodal Officer / Dean.',
      'Step 2: Verify Roll No, AISHE College Code, and Course Year.',
      'Step 3: Collect signed certificate on official college letterhead with Institute Seal.'
    ],
    samplePreviewDescription: 'College letterhead document stating student is currently pursuing regular full-time course with AISHE Code.',
    icon: '🏛️',
    badgeCode: 'INS-BON',
    isHighPriority: false
  };
}
