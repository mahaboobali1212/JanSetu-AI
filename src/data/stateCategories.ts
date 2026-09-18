import { Category } from '../types/profile';

export interface StateCategoryDefinition {
  code: string;
  name: string;
  nativeName?: string;
  baseCategory: Category;
  reservationPercentage?: string;
  description: string;
}

export interface StateQuotaDefinition {
  id: string;
  name: string;
  counsellingBody: string;
  feeReimbursementEligible: boolean;
  description: string;
  badge: string;
}

export interface StateStructure {
  categories: StateCategoryDefinition[];
  admissionQuotas: StateQuotaDefinition[];
  defaultCategoryCode: string;
}

export const STATE_CATEGORY_REGISTRY: Record<string, StateStructure> = {
  // TELANGANA
  'Telangana': {
    categories: [
      {
        code: 'OC',
        name: 'OC (Open Category / General)',
        nativeName: 'ఓపెన్ కేటగిరీ (జనరల్)',
        baseCategory: 'General',
        description: 'Unreserved merit category for state and central counseling.'
      },
      {
        code: 'EWS',
        name: 'EWS (Economically Weaker Section - General)',
        nativeName: 'ఆర్థికంగా వెనుకబడిన వర్గాలు (EWS)',
        baseCategory: 'EWS',
        reservationPercentage: '10%',
        description: 'Gross annual family income < ₹8 Lakh and land ceiling eligibility.'
      },
      {
        code: 'BC-A',
        name: 'BC-A (Aboriginal Tribes, Vimuktha Jathis & Nomadic)',
        nativeName: 'బీసీ-ఏ (సంచార జాతులు / కులవృత్తులు)',
        baseCategory: 'OBC',
        reservationPercentage: '7%',
        description: '7% reservation under Telangana Backward Classes Category A.'
      },
      {
        code: 'BC-B',
        name: 'BC-B (Vocational Communities - Padmashali, Gowda, etc.)',
        nativeName: 'బీసీ-బీ (పద్మశాలి, గౌడ, మొదలైనవి)',
        baseCategory: 'OBC',
        reservationPercentage: '10%',
        description: '10% reservation under Telangana Backward Classes Category B.'
      },
      {
        code: 'BC-C',
        name: 'BC-C (Scheduled Caste Converts to Christianity)',
        nativeName: 'బీసీ-సీ (క్రైస్తవ మతంలోకి మారిన ఎస్సీలు)',
        baseCategory: 'Minority',
        reservationPercentage: '1%',
        description: '1% reservation for SC converts to Christianity.'
      },
      {
        code: 'BC-D',
        name: 'BC-D (Other Backward Classes - Yadava, Munnuru Kapu, etc.)',
        nativeName: 'బీసీ-డీ (యాదవ, మున్నూరు కాపు, మొదలైనవి)',
        baseCategory: 'OBC',
        reservationPercentage: '7%',
        description: '7% reservation under Telangana Backward Classes Category D.'
      },
      {
        code: 'BC-E',
        name: 'BC-E (Socially & Educationally Backward Muslims)',
        nativeName: 'బీసీ-ఈ (వెనుకబడిన ముస్లిం వర్గాలు - దూదేకుల, షేక్)',
        baseCategory: 'Minority',
        reservationPercentage: '4%',
        description: '4% statutory reservation & ePASS fee reimbursement for backward Muslims.'
      },
      {
        code: 'SC',
        name: 'SC (Scheduled Caste)',
        nativeName: 'ఎస్సీ (షెడ్యూల్డ్ కులాలు - మాల, మాదిగ)',
        baseCategory: 'SC',
        reservationPercentage: '15%',
        description: '15% reservation & 100% full tuition fee reimbursement on ePASS.'
      },
      {
        code: 'ST',
        name: 'ST (Scheduled Tribe)',
        nativeName: 'ఎస్టీ (షెడ్యూల్డ్ తెగలు - లంబాడా, కోయ, గోండ్)',
        baseCategory: 'ST',
        reservationPercentage: '10%',
        description: '10% reservation under Telangana State ST Welfare Act.'
      }
    ],
    admissionQuotas: [
      {
        id: 'convenor_quota',
        name: 'TG EAPCET / TS EAMCET / TG ECET (Convenor Quota)',
        counsellingBody: 'Telangana State Council of Higher Education (TSCHE)',
        feeReimbursementEligible: true,
        description: 'Merit seat allotted through official government state counselling. Unlocks 100% RTF (Reimbursement of Tuition Fee).',
        badge: '100% Fee Reimbursement Eligible'
      },
      {
        id: 'ou_local_quota',
        name: 'Osmania University (OU) Local Area Quota (85%)',
        counsellingBody: 'TSCHE / OU Region Allotment',
        feeReimbursementEligible: true,
        description: '85% local candidate reservation for students having studied in Telangana for at least 4 consecutive years.',
        badge: 'State Local Quota'
      },
      {
        id: 'sports_pwd_quota',
        name: 'Special Category (NCC / Sports / CAP / PwD Quota)',
        counsellingBody: 'TSCHE Special Counselling Board',
        feeReimbursementEligible: true,
        description: 'Preferential horizontal quota for differently-abled, armed forces children, and athletes.',
        badge: 'Special Quota'
      },
      {
        id: 'management_quota',
        name: 'Management / NRI Quota (Direct College Seat)',
        counsellingBody: 'Private College Management / NRI Association',
        feeReimbursementEligible: false,
        description: 'Direct institutional admission. Statutorily ineligible for state tuition fee reimbursement under ePASS.',
        badge: 'Fee Reimbursement Ineligible'
      }
    ],
    defaultCategoryCode: 'BC-B'
  },

  // ANDHRA PRADESH
  'Andhra Pradesh': {
    categories: [
      {
        code: 'OC',
        name: 'OC (Open Category / General)',
        nativeName: 'ఓపెన్ కేటగిరీ (జనరల్)',
        baseCategory: 'General',
        description: 'Unreserved general merit category.'
      },
      {
        code: 'EWS',
        name: 'EWS (Economically Weaker Section - General)',
        nativeName: 'ఆర్థికంగా వెనుకబడిన వర్గాలు (EWS)',
        baseCategory: 'EWS',
        reservationPercentage: '10%',
        description: '10% reservation under AP State EWS quota for non-reserved poor.'
      },
      {
        code: 'BC-A',
        name: 'BC-A (Aboriginal Tribes, Vimuktha Jathis & Nomadic)',
        nativeName: 'బీసీ-ఏ (సంచార జాతులు / వృత్తి పనులు)',
        baseCategory: 'OBC',
        reservationPercentage: '7%',
        description: '7% quota under AP Navasakam welfare scheme.'
      },
      {
        code: 'BC-B',
        name: 'BC-B (Vocational Communities - Padmashali, Gowda, Setti Balija)',
        nativeName: 'బీసీ-బీ (పద్మశాలి, గౌడ, శెట్టిబలిజ)',
        baseCategory: 'OBC',
        reservationPercentage: '10%',
        description: '10% quota & full fee reimbursement under Jagananna Vidya Deevena.'
      },
      {
        code: 'BC-C',
        name: 'BC-C (Scheduled Caste Converts to Christianity)',
        nativeName: 'బీసీ-సీ (క్రైస్తవ మతంలోకి మారిన ఎస్సీలు)',
        baseCategory: 'Minority',
        reservationPercentage: '1%',
        description: '1% quota for SC Christian converts.'
      },
      {
        code: 'BC-D',
        name: 'BC-D (Other Backward Classes - Yadava, Kapu, Turpu Kapu)',
        nativeName: 'బీసీ-డీ (యాదవ, తూర్పు కాపు, మొదలైనవి)',
        baseCategory: 'OBC',
        reservationPercentage: '7%',
        description: '7% quota under AP Backward Classes Welfare.'
      },
      {
        code: 'BC-E',
        name: 'BC-E (Socially & Educationally Backward Muslims)',
        nativeName: 'బీసీ-ఈ (వెనుకబడిన ముస్లిం వర్గాలు - దూదేకుల, షేక్)',
        baseCategory: 'Minority',
        reservationPercentage: '4%',
        description: '4% reservation and full fee reimbursement for eligible Muslim groups.'
      },
      {
        code: 'SC',
        name: 'SC (Scheduled Caste)',
        nativeName: 'ఎస్సీ (షెడ్యూల్డ్ కులాలు - మాల, మాదిగ)',
        baseCategory: 'SC',
        reservationPercentage: '15%',
        description: '15% reservation & complete Jagananna Vidya & Vasathi Deevena grant.'
      },
      {
        code: 'ST',
        name: 'ST (Scheduled Tribe)',
        nativeName: 'ఎస్టీ (షెడ్యూల్డ్ తెగలు - యానాది, చెంచు, సుగాలి)',
        baseCategory: 'ST',
        reservationPercentage: '6%',
        description: '6% reservation under AP Tribal Welfare Department.'
      }
    ],
    admissionQuotas: [
      {
        id: 'convenor_quota',
        name: 'AP EAPCET / AP ICET / AP ECET (Convenor Quota)',
        counsellingBody: 'Andhra Pradesh State Council of Higher Education (APSCHE)',
        feeReimbursementEligible: true,
        description: 'Government web counselling merit seat. Mandatory condition to unlock Jagananna Vidya Deevena & Vasathi Deevena.',
        badge: '100% Fee Reimbursement Eligible'
      },
      {
        id: 'au_svu_local_quota',
        name: 'AU / SVU Local University Region Quota (85%)',
        counsellingBody: 'APSCHE (Andhra University / Sri Venkateswara University)',
        feeReimbursementEligible: true,
        description: '85% statutory local reservation based on 4-year continuous study in AP.',
        badge: 'Local Area Quota'
      },
      {
        id: 'sports_pwd_quota',
        name: 'Special Category (NCC / Sports / CAP / PwD Quota)',
        counsellingBody: 'APSCHE Special Counselling Committee',
        feeReimbursementEligible: true,
        description: 'Horizontal reservation for sports champions and differently-abled students.',
        badge: 'Special Quota'
      },
      {
        id: 'management_quota',
        name: 'Management / Category-B Quota (Direct Seat)',
        counsellingBody: 'Private Unaided College Management',
        feeReimbursementEligible: false,
        description: 'Institutional quota. Ineligible for government tuition fee reimbursement under Navasakam.',
        badge: 'Fee Reimbursement Ineligible'
      }
    ],
    defaultCategoryCode: 'BC-B'
  },

  // TAMIL NADU
  'Tamil Nadu': {
    categories: [
      {
        code: 'OC',
        name: 'OC (Open Competition / General Merit)',
        nativeName: 'பொதுப் பிரிவு (Open Competition)',
        baseCategory: 'General',
        reservationPercentage: '31%',
        description: '31% unreserved merit quota open to all candidates.'
      },
      {
        code: 'BC',
        name: 'BC (Backward Class Non-Muslim)',
        nativeName: 'பிற்படுத்தப்பட்டோர் (BC)',
        baseCategory: 'OBC',
        reservationPercentage: '26.5%',
        description: '26.5% statutory reservation under Tamil Nadu Backward Classes quota.'
      },
      {
        code: 'BCM',
        name: 'BCM (Backward Class Muslim)',
        nativeName: 'பிற்படுத்தப்பட்ட முஸ்லிம் (BCM)',
        baseCategory: 'Minority',
        reservationPercentage: '3.5%',
        description: '3.5% exclusive reservation for Muslim backward communities.'
      },
      {
        code: 'MBC',
        name: 'MBC (Most Backward Class - Vanniyar & Others)',
        nativeName: 'மிகவும் பிற்படுத்தப்பட்டோர் (MBC)',
        baseCategory: 'MBC',
        reservationPercentage: '13%',
        description: 'Most Backward Class community reservation.'
      },
      {
        code: 'DNC',
        name: 'DNC (Denotified Communities)',
        nativeName: 'சீர்மரபினர் (DNC)',
        baseCategory: 'MBC',
        reservationPercentage: '7%',
        description: '7% reservation for denotified communities across Tamil Nadu.'
      },
      {
        code: 'SC',
        name: 'SC (Scheduled Caste General)',
        nativeName: 'ஆதிதிராவிடர் (SC)',
        baseCategory: 'SC',
        reservationPercentage: '15%',
        description: '15% Adi Dravidar welfare quota with complete post-matric scholarship.'
      },
      {
        code: 'SC(A)',
        name: 'SC(A) (Scheduled Caste Arunthathiyar)',
        nativeName: 'அருந்ததியர் (SC-A)',
        baseCategory: 'SC',
        reservationPercentage: '3%',
        description: '3% preferential sub-reservation for Arunthathiyar community within SC.'
      },
      {
        code: 'ST',
        name: 'ST (Scheduled Tribe)',
        nativeName: 'பழங்குடியினர் (ST)',
        baseCategory: 'ST',
        reservationPercentage: '1%',
        description: '1% tribal welfare reservation with 100% full fee waiver.'
      }
    ],
    admissionQuotas: [
      {
        id: 'convenor_quota',
        name: 'TNEA / DOTE / DME Single Window Counselling (Govt Quota)',
        counsellingBody: 'Directorate of Technical Education (DOTE) / Anna University',
        feeReimbursementEligible: true,
        description: 'Single Window Government Counselling seat. Unlocks First Graduate concession (REV-104) and Post-Matric fee reimbursement.',
        badge: '100% Fee Reimbursement Eligible'
      },
      {
        id: 'govt_school_7_5',
        name: '7.5% Government School Preferential Quota (Annexure-III)',
        counsellingBody: 'Government of Tamil Nadu Special Single Window',
        feeReimbursementEligible: true,
        description: '100% FREE Tuition, Hostel, and Exam Fee paid by TN Govt for Class 6-12 Govt school students in Engineering/Medical.',
        badge: '100% Free Seat + Hostel'
      },
      {
        id: 'sports_pwd_quota',
        name: 'Special Reservation (Eminent Sports / Ex-Servicemen / Differently-Abled)',
        counsellingBody: 'TNEA Special Reservation Cell',
        feeReimbursementEligible: true,
        description: 'Reserved seats for state/national sports achievers and PwD candidates.',
        badge: 'Special Quota'
      },
      {
        id: 'management_quota',
        name: 'Management Quota / Consortium Seat (Direct Admission)',
        counsellingBody: 'Consortium of Self-Financing Professional Colleges',
        feeReimbursementEligible: false,
        description: 'Direct institutional admission. Ineligible for First Graduate fee waiver and government tuition reimbursement.',
        badge: 'Fee Reimbursement Ineligible'
      }
    ],
    defaultCategoryCode: 'MBC'
  },

  // KARNATAKA
  'Karnataka': {
    categories: [
      {
        code: 'GM',
        name: 'GM (General Merit)',
        nativeName: 'ಸಾಮಾನ್ಯ ಮೆರಿಟ್ (GM)',
        baseCategory: 'General',
        reservationPercentage: '50%',
        description: 'Unreserved open competition category in Karnataka.'
      },
      {
        code: 'Cat-1',
        name: 'Category-1 (Most Backward Communities)',
        nativeName: 'ವರ್ಗ-೧ (ಅತ್ಯಂತ ಹಿಂದುಳಿದ ವರ್ಗಗಳು)',
        baseCategory: 'OBC',
        reservationPercentage: '4%',
        description: '4% reservation with relaxed family income ceiling (< ₹2.5 Lakh) for SSP.'
      },
      {
        code: '2A',
        name: 'Category-2A (Backward Classes - Kuruba, Idiga, Vishwakarma, etc.)',
        nativeName: 'ವರ್ಗ-೨ಎ (ಕುರುಬ, ಈಡಿಗ, ವಿಶ್ವಕರ್ಮ)',
        baseCategory: 'OBC',
        reservationPercentage: '15%',
        description: '15% reservation under Karnataka Backward Classes.'
      },
      {
        code: '2B',
        name: 'Category-2B (Backward Muslims)',
        nativeName: 'ವರ್ಗ-೨ಬಿ (ಮುಸ್ಲಿಂ ಹಿಂದುಳಿದ ವರ್ಗಗಳು)',
        baseCategory: 'Minority',
        reservationPercentage: '4%',
        description: '4% reservation & Vidyasiri / Fee concession for Karnataka Muslims.'
      },
      {
        code: '3A',
        name: 'Category-3A (Vokkaliga, Reddy, Kunchitiga, etc.)',
        nativeName: 'ವರ್ಗ-೩ಎ (ಒಕ್ಕಲಿಗ, ರೆಡ್ಡಿ)',
        baseCategory: 'OBC',
        reservationPercentage: '4%',
        description: '4% reservation under Category 3A.'
      },
      {
        code: '3B',
        name: 'Category-3B (Lingayat, Maratha, Veerashaiva, etc.)',
        nativeName: 'ವರ್ಗ-೩ಬಿ (ವೀರಶೈವ ಲಿಂಗಾಯತ, ಮರಾಠ)',
        baseCategory: 'OBC',
        reservationPercentage: '5%',
        description: '5% reservation under Category 3B.'
      },
      {
        code: 'SC',
        name: 'SC (Scheduled Caste)',
        nativeName: 'ಪರಿಶಿಷ್ಟ ಜಾತಿ (SC - ಬಲಗೈ, ಎಡಗೈ)',
        baseCategory: 'SC',
        reservationPercentage: '17%',
        description: '17% reservation with 100% full tuition & maintenance reimbursement on SSP.'
      },
      {
        code: 'ST',
        name: 'ST (Scheduled Tribe)',
        nativeName: 'ಪರಿಶಿಷ್ಟ ಪಂಗಡ (ST - ವಾಲ್ಮೀಕಿ, ನಾಯಕ)',
        baseCategory: 'ST',
        reservationPercentage: '7%',
        description: '7% reservation under Karnataka Tribal Welfare Department.'
      }
    ],
    admissionQuotas: [
      {
        id: 'convenor_quota',
        name: 'KCET / KEA / PGCET (Government Quota Seat)',
        counsellingBody: 'Karnataka Examinations Authority (KEA)',
        feeReimbursementEligible: true,
        description: 'Government merit quota seat. Mandatory requirement to claim SSP post-matric fee reimbursement & Vidyasiri.',
        badge: '100% Fee Reimbursement Eligible'
      },
      {
        id: 'rural_kannada_quota',
        name: 'Rural & Kannada Medium Quota (15% + 5%)',
        counsellingBody: 'KEA Special Category Allotment',
        feeReimbursementEligible: true,
        description: 'Reserved quota for students who studied 10 years in rural Karnataka and 10 years in Kannada medium.',
        badge: 'Rural / Medium Quota'
      },
      {
        id: 'hkr_quota',
        name: 'Kalyana Karnataka (Article 371-J Quota - 8% Statewide / 75% Local)',
        counsellingBody: 'KEA / Kalyana Karnataka Development Board',
        feeReimbursementEligible: true,
        description: 'Special constitutional reservation for Hyderabad-Karnataka region candidates.',
        badge: 'Article 371(J) Quota'
      },
      {
        id: 'management_quota',
        name: 'COMED-K / Institutional Management Quota',
        counsellingBody: 'COMED-K / Private Unaided Institutions',
        feeReimbursementEligible: false,
        description: 'Private quota admission. Ineligible for government fee reimbursement under SSP.',
        badge: 'Fee Reimbursement Ineligible'
      }
    ],
    defaultCategoryCode: '2A'
  },

  // MAHARASHTRA
  'Maharashtra': {
    categories: [
      {
        code: 'Open',
        name: 'Open / General (General Merit)',
        nativeName: 'खुला प्रवर्ग (Open / General)',
        baseCategory: 'General',
        description: 'Unreserved general merit category.'
      },
      {
        code: 'EWS',
        name: 'EWS (Economically Weaker Section - General)',
        nativeName: 'आर्थिकदृष्ट्या दुर्बल घटक (EWS)',
        baseCategory: 'EWS',
        reservationPercentage: '10%',
        description: '10% EWS quota with 50% tuition fee waiver under Rajarshi Shahu Maharaj Scheme.'
      },
      {
        code: 'OBC',
        name: 'OBC (Other Backward Class - Mali, Teli, Kunbi, etc.)',
        nativeName: 'इतर मागास प्रवर्ग (OBC)',
        baseCategory: 'OBC',
        reservationPercentage: '19%',
        description: '19% reservation with 50% fee concession on MahaDBT portal.'
      },
      {
        code: 'SBC',
        name: 'SBC (Special Backward Class)',
        nativeName: 'विशेष मागास प्रवर्ग (SBC)',
        baseCategory: 'OBC',
        reservationPercentage: '2%',
        description: '2% quota for Koshti, Koli, and special artisan communities.'
      },
      {
        code: 'VJ/DT-A',
        name: 'VJ / DT-A (Vimukta Jati - Denotified Tribes A)',
        nativeName: 'विमुक्त जाती (VJ / DT-A)',
        baseCategory: 'MBC',
        reservationPercentage: '3%',
        description: '3% statutory reservation on MahaDBT.'
      },
      {
        code: 'NT-B',
        name: 'NT-B (Nomadic Tribes B)',
        nativeName: 'भटक्या जमाती - ब (NT-B)',
        baseCategory: 'MBC',
        reservationPercentage: '2.5%',
        description: '2.5% reservation for Nomadic Tribe B groups.'
      },
      {
        code: 'NT-C',
        name: 'NT-C (Nomadic Tribes C - Dhangar)',
        nativeName: 'भटक्या जमाती - क (NT-C - धनगर)',
        baseCategory: 'MBC',
        reservationPercentage: '3.5%',
        description: '3.5% reservation for Dhangar and allied nomadic pastoralists.'
      },
      {
        code: 'NT-D',
        name: 'NT-D (Nomadic Tribes D - Vanjari)',
        nativeName: 'भटक्या जमाती - ड (NT-D - वंजारी)',
        baseCategory: 'MBC',
        reservationPercentage: '2%',
        description: '2% reservation for Vanjari communities.'
      },
      {
        code: 'SC',
        name: 'SC (Scheduled Caste / Navabuddha)',
        nativeName: 'अनुसूचित जाती (SC / नवबौद्ध)',
        baseCategory: 'SC',
        reservationPercentage: '13%',
        description: '13% reservation with 100% full fee waiver on MahaDBT.'
      },
      {
        code: 'ST',
        name: 'ST (Scheduled Tribe)',
        nativeName: 'अनुसूचित जमाती (ST - भिल्ल, गोंड, कोरकू)',
        baseCategory: 'ST',
        reservationPercentage: '7%',
        description: '7% tribal welfare reservation with full government financial support.'
      }
    ],
    admissionQuotas: [
      {
        id: 'convenor_quota',
        name: 'MHT-CET / CAP Centralized Admission Process (Govt Merit Seat)',
        counsellingBody: 'State Common Entrance Test Cell (CET Cell), Maharashtra',
        feeReimbursementEligible: true,
        description: 'CAP round government seat allotment. Required condition for MahaDBT tuition fee reimbursement (EBC/OBC/SC/ST).',
        badge: '100% Fee Reimbursement Eligible'
      },
      {
        id: 'defence_pwd_quota',
        name: 'Defence (DEF-1,2,3) & Differently-Abled (PwD) Quota',
        counsellingBody: 'CET Cell Maharashtra Special Quota',
        feeReimbursementEligible: true,
        description: '5% horizontal quota for armed forces dependents and differently abled candidates.',
        badge: 'Special Quota'
      },
      {
        id: 'management_quota',
        name: 'Institutional / Management Level Seat',
        counsellingBody: 'Private Unaided College Management',
        feeReimbursementEligible: false,
        description: 'Direct college-level admission without CAP merit allotment. Ineligible for MahaDBT fee concessions.',
        badge: 'Fee Reimbursement Ineligible'
      }
    ],
    defaultCategoryCode: 'OBC'
  },

  // KERALA
  'Kerala': {
    categories: [
      {
        code: 'General',
        name: 'General (Open Competition)',
        nativeName: 'ജനറൽ വിഭാഗം (General Merit)',
        baseCategory: 'General',
        description: 'State open merit category.'
      },
      {
        code: 'EWS',
        name: 'EWS (Economically Weaker Section - General)',
        nativeName: 'സാമ്പത്തികമായി പിന്നാക്കം നിൽക്കുന്നവർ (EWS)',
        baseCategory: 'EWS',
        reservationPercentage: '10%',
        description: '10% quota for economically weaker forward community students.'
      },
      {
        code: 'EZ',
        name: 'EZ (Ezhava / Thiyya / Billava)',
        nativeName: 'ഈഴവ / തീയ്യ / ബില്ലവ (EZ)',
        baseCategory: 'OBC',
        reservationPercentage: '9%',
        description: '9% statutory reservation in professional admissions & e-Grantz.'
      },
      {
        code: 'MU',
        name: 'MU (Muslim Community)',
        nativeName: 'മുസ്ലിം വിഭാഗം (MU)',
        baseCategory: 'Minority',
        reservationPercentage: '8%',
        description: '8% state reservation & CH Muhammed Koya scholarship eligibility.'
      },
      {
        code: 'BH',
        name: 'BH (Other Backward Hindu - Kudumbi, Dheevara, Viswakarma)',
        nativeName: 'മറ്റു പിന്നാക്ക ഹിന്ദു വിഭാഗങ്ങൾ (OBH)',
        baseCategory: 'OBC',
        reservationPercentage: '3%',
        description: 'Backward Hindu artisan and livelihood groups.'
      },
      {
        code: 'LC',
        name: 'LC / AI (Latin Catholic & Anglo Indian)',
        nativeName: 'ലാറ്റിൻ കത്തോലിക്കർ / ആംഗ്ലോ ഇന്ത്യൻ (LC)',
        baseCategory: 'Minority',
        reservationPercentage: '3%',
        description: '3% reservation for Latin Catholic and Anglo Indian candidates.'
      },
      {
        code: 'SC',
        name: 'SC (Scheduled Caste)',
        nativeName: 'പട്ടികജാതി (SC - പുലയ, പറയ, ചേരമർ)',
        baseCategory: 'SC',
        reservationPercentage: '8%',
        description: '8% reservation with 100% full fee waiver & stipend on e-Grantz 3.0.'
      },
      {
        code: 'ST',
        name: 'ST (Scheduled Tribe)',
        nativeName: 'പട്ടികവർഗ്ഗം (ST - കുറിച്യ, പണിയ, കാടർ)',
        baseCategory: 'ST',
        reservationPercentage: '2%',
        description: '2% tribal quota with complete education and hostel expenses covered.'
      },
      {
        code: 'OEC',
        name: 'OEC (Other Eligible Communities)',
        nativeName: 'മറ്റു അർഹതയുള്ള വിഭാഗങ്ങൾ (OEC)',
        baseCategory: 'OBC',
        description: 'Eligible for complete fee concession on par with SC/ST under e-Grantz.'
      }
    ],
    admissionQuotas: [
      {
        id: 'convenor_quota',
        name: 'KEAM / CEE Kerala Centralized Allotment Process (CAP Seat)',
        counsellingBody: 'Commissioner for Entrance Examinations (CEE), Kerala',
        feeReimbursementEligible: true,
        description: 'Merit seat allotted through KEAM CAP counselling. Mandatory to claim e-Grantz fee concession.',
        badge: '100% Fee Reimbursement Eligible'
      },
      {
        id: 'special_sports_quota',
        name: 'Special Reservation (Sports / Cultural / Ex-Servicemen Quota)',
        counsellingBody: 'CEE Kerala Special Allotment',
        feeReimbursementEligible: true,
        description: 'Preferential sports and defence reservation seats.',
        badge: 'Special Quota'
      },
      {
        id: 'management_quota',
        name: 'Management / NRI Quota (Self-Financed Direct Seat)',
        counsellingBody: 'Private Self-Financing College Consortium',
        feeReimbursementEligible: false,
        description: 'Direct institutional admission. Ineligible for government tuition fee subsidies.',
        badge: 'Fee Reimbursement Ineligible'
      }
    ],
    defaultCategoryCode: 'EZ'
  },

  // UTTAR PRADESH
  'Uttar Pradesh': {
    categories: [
      {
        code: 'UR',
        name: 'General / Unreserved (UR)',
        nativeName: 'सामान्य वर्ग (General / UR)',
        baseCategory: 'General',
        description: 'Unreserved merit category in Uttar Pradesh.'
      },
      {
        code: 'EWS',
        name: 'EWS (Economically Weaker Section - General)',
        nativeName: 'आर्थिक रूप से कमजोर वर्ग (EWS)',
        baseCategory: 'EWS',
        reservationPercentage: '10%',
        description: '10% EWS quota under UP Government guidelines (< ₹8 Lakh/year).'
      },
      {
        code: 'OBC',
        name: 'OBC (Other Backward Class - Non-Creamy Layer)',
        nativeName: 'अन्य पिछड़ा वर्ग (OBC - नॉन क्रीमी लेयर)',
        baseCategory: 'OBC',
        reservationPercentage: '27%',
        description: '27% statutory reservation & UP Scholarship fee reimbursement eligibility.'
      },
      {
        code: 'SC',
        name: 'SC (Scheduled Caste)',
        nativeName: 'अनुसूचित जाति (SC)',
        baseCategory: 'SC',
        reservationPercentage: '21%',
        description: '21% reservation & complete Post-Matric fee reimbursement under UP Saksham.'
      },
      {
        code: 'ST',
        name: 'ST (Scheduled Tribe)',
        nativeName: 'अनुसूचित जनजाति (ST)',
        baseCategory: 'ST',
        reservationPercentage: '2%',
        description: '2% tribal reservation under UP Social Welfare Department.'
      },
      {
        code: 'Minority',
        name: 'Minority (Muslim, Christian, Sikh, Buddhist, Jain)',
        nativeName: 'अल्पसंख्यक वर्ग (Minority)',
        baseCategory: 'Minority',
        description: 'Eligible for UP Minority Welfare Post-Matric Scholarship Scheme.'
      }
    ],
    admissionQuotas: [
      {
        id: 'convenor_quota',
        name: 'UPTAC / AKTU / JEECUP Counselling (Govt Merit Seat)',
        counsellingBody: 'Uttar Pradesh Technical Admission Counselling (UPTAC)',
        feeReimbursementEligible: true,
        description: 'Government centralized counselling merit seat. Unlocks UP Dashmottar Scholarship and Fee Reimbursement.',
        badge: '100% Fee Reimbursement Eligible'
      },
      {
        id: 'special_pwd_quota',
        name: 'Horizontal Reservation (FFD / Armed Forces / PwD)',
        counsellingBody: 'UP State Counselling Cell',
        feeReimbursementEligible: true,
        description: 'Reserved seats for Freedom Fighter Dependents, Defense personnel, and PwD.',
        badge: 'Special Quota'
      },
      {
        id: 'management_quota',
        name: 'Direct Admission / Management Seat',
        counsellingBody: 'Private Unaided College Administration',
        feeReimbursementEligible: false,
        description: 'Direct institutional admission. Subject to strict eligibility screening on UP Scholarship portal.',
        badge: 'Fee Reimbursement Ineligible'
      }
    ],
    defaultCategoryCode: 'OBC'
  },

  // ALL-INDIA / DEFAULT FALLBACK FOR OTHER STATES
  'DEFAULT': {
    categories: [
      {
        code: 'General',
        name: 'General / Unreserved (UR)',
        nativeName: 'सामान्य वर्ग (General)',
        baseCategory: 'General',
        description: 'National unreserved merit category.'
      },
      {
        code: 'EWS',
        name: 'EWS (Economically Weaker Section)',
        nativeName: 'आर्थिक रूप से कमजोर वर्ग (EWS)',
        baseCategory: 'EWS',
        reservationPercentage: '10%',
        description: '10% Central reservation for candidates with family income < ₹8 Lakh.'
      },
      {
        code: 'OBC',
        name: 'OBC-NCL (Other Backward Class - Non-Creamy Layer)',
        nativeName: 'अन्य पिछड़ा वर्ग (OBC-NCL)',
        baseCategory: 'OBC',
        reservationPercentage: '27%',
        description: '27% Central reservation for non-creamy layer OBC candidates.'
      },
      {
        code: 'SC',
        name: 'SC (Scheduled Caste)',
        nativeName: 'अनुसूचित जाति (SC)',
        baseCategory: 'SC',
        reservationPercentage: '15%',
        description: '15% national reservation & Top Class Education scholarship eligibility.'
      },
      {
        code: 'ST',
        name: 'ST (Scheduled Tribe)',
        nativeName: 'अनुसूचित जनजाति (ST)',
        baseCategory: 'ST',
        reservationPercentage: '7.5%',
        description: '7.5% national tribal reservation with 100% full fee waiver.'
      },
      {
        code: 'Minority',
        name: 'Minority (Muslim, Christian, Sikh, Buddhist, Jain, Parsi)',
        nativeName: 'अल्पसंख्यक वर्ग (Minority)',
        baseCategory: 'Minority',
        description: 'Eligible for MoMA Merit-cum-Means and Post-Matric scholarships on NSP.'
      }
    ],
    admissionQuotas: [
      {
        id: 'convenor_quota',
        name: 'Centralized Government Counselling Seat (JoSAA / CSAB / NEET / CUET / State Merit)',
        counsellingBody: 'Central / State Government Counselling Authority',
        feeReimbursementEligible: true,
        description: 'Merit seat allotted through government counselling. Qualifies for central & state fee waiver schemes.',
        badge: 'Fee Reimbursement Eligible'
      },
      {
        id: 'special_quota',
        name: 'Special Category Reservation (Sports / PwD / Defence Quota)',
        counsellingBody: 'Central / State Counselling Board',
        feeReimbursementEligible: true,
        description: 'Horizontal reservation for differently-abled, sports achievers, and defence personnel.',
        badge: 'Special Quota'
      },
      {
        id: 'management_quota',
        name: 'Management / Direct Institutional Seat',
        counsellingBody: 'Private College Administration',
        feeReimbursementEligible: false,
        description: 'Direct institutional admission without government merit quota allotment.',
        badge: 'Fee Reimbursement Ineligible'
      }
    ],
    defaultCategoryCode: 'OBC'
  }
};

export function getStateStructure(stateName: string): StateStructure {
  const norm = (stateName || '').trim();
  return STATE_CATEGORY_REGISTRY[norm] || STATE_CATEGORY_REGISTRY['DEFAULT'];
}
