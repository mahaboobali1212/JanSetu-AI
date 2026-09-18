import { Language } from '../types/language';

export interface PreFlightI18n {
  backToDashboard: string;
  auditTargetScheme: string;
  overallReadinessTitle: string;
  readinessTag: string;
  eligibilityBreakdown: string;
  documentsBreakdown: string;
  identityBreakdown: string;
  prerequisitesBreakdown: string;
  policyBreakdown: string;
  timelineHeading: string;
  whyNotReadyBtn: string;
  fixMyApplicationBtn: string;
  askCopilotBtn: string;
  tabFlightDeck: string;
  tabDependencyGraph: string;
  tabVault: string;
  tabClerical: string;
  crossDocTitle: string;
  crossDocSub: string;
  selectTargetDocLabel: string;
  manualActiveNotice: string;
  fieldsMatchingBadge: string;
  addFieldBtn: string;
  testMatchBtn: string;
  testDiscrepancyBtn: string;
  resetBtn: string;
  uploadScanBtn: string;
  thFieldToCompare: string;
  thPrimaryValue: string;
  thSecondaryValue: string;
  thLiveStatus: string;
  thAction: string;
  primaryBaselineLabel: string;
  compareAgainstLabel: string;
  asPrintedOn: string;
  statusConsistent: string;
  statusDiscrepancy: string;
  statusPhonetic: string;
  statusInitials: string;
  statusCritical: string;
  status100MatchNotice: string;
  statusVarianceNotice: string;
  generateAffidavitBtn: string;
  fieldNames: {
    name: string;
    dob: string;
    father: string;
    domicile: string;
    income: string;
    category: string;
  };
  docLabels: Record<string, string>;
  stages: string[];
}

export const PREFLIGHT_TRANSLATIONS: Record<Language, PreFlightI18n> = {
  en: {
    backToDashboard: '← Back to Dashboard',
    auditTargetScheme: 'Audit Target Scheme:',
    overallReadinessTitle: 'Overall Pre-Flight Readiness',
    readinessTag: 'AI Pre-Flight Audit',
    eligibilityBreakdown: '1. Eligibility',
    documentsBreakdown: '2. Documents',
    identityBreakdown: '3. Identity',
    prerequisitesBreakdown: '4. Prerequisites',
    policyBreakdown: '5. Policy Conf.',
    timelineHeading: '8-Stage Sovereign Application Progress Pipeline:',
    whyNotReadyBtn: 'Why Am I Not Ready?',
    fixMyApplicationBtn: 'Fix My Application (Action Plan)',
    askCopilotBtn: 'Ask JanSetu Copilot',
    tabFlightDeck: 'Cross-Doc Matrix & Risk Engine',
    tabDependencyGraph: 'Application Dependency Graph',
    tabVault: 'Document Vault Dashboard',
    tabClerical: 'Clerical Matcher & NPCI Mandate',
    crossDocTitle: 'Cross-Document Field Matching & Manual Clerical Inspector',
    crossDocSub: 'Type or modify values in the boxes below to inspect clerical variances in real-time, or upload documents to auto-populate.',
    selectTargetDocLabel: 'Select Target Document to Audit Against Aadhaar:',
    manualActiveNotice: 'Manual Inspection Active: Choose which documents to compare from the dropdowns, then edit values in the boxes below to check variances instantly!',
    fieldsMatchingBadge: 'Fields Matching',
    addFieldBtn: 'Add Field',
    testMatchBtn: 'Test 100% Match',
    testDiscrepancyBtn: 'Test Discrepancy',
    resetBtn: 'Reset',
    uploadScanBtn: 'Upload & Auto-Scan',
    thFieldToCompare: 'Field to Compare',
    thPrimaryValue: 'Primary Value (Box to Write / Inspect)',
    thSecondaryValue: 'Secondary Value (Box to Write / Inspect)',
    thLiveStatus: 'Live Status',
    thAction: 'Action',
    primaryBaselineLabel: 'Primary Baseline:',
    compareAgainstLabel: 'Compare Against:',
    asPrintedOn: 'As printed on',
    statusConsistent: '✓ CONSISTENT',
    statusDiscrepancy: '⚠ DISCREPANCY',
    statusPhonetic: '⚠ PHONETIC / SPELLING VARIANCE',
    statusInitials: '⚠ INITIALS / SEQUENCE VARIANCE',
    statusCritical: '❌ CRITICAL MISMATCH',
    status100MatchNotice: '100% Cross-Document Identity Consistency Verified: All primary and secondary attributes match identically across all government records. Zero clerical rejection risk!',
    statusVarianceNotice: 'Clerical Variance Intercepted: One or more fields have discrepancies. You can download the Gazette-Compliant Name Discrepancy Affidavit in the Fix My Application action plan to avoid rejection.',
    generateAffidavitBtn: 'Generate Affidavit & Action Plan',
    fieldNames: {
      name: 'Applicant Full Name & Initials',
      dob: 'Date of Birth (DD-MM-YYYY)',
      father: 'Father / Guardian Name',
      domicile: 'State of Domicile & District',
      income: 'Annual Family Gross Income',
      category: 'Social Reservation Category'
    },
    docLabels: {
      aadhaar: '🆔 Aadhaar Card (UIDAI KYC)',
      marksheet: '📝 10th / 12th Board Marksheet',
      bank: '🏦 Bank Passbook (NPCI DBT)',
      income: '💰 Income Certificate (REV-101)',
      caste: '🏛️ Community / Caste (REV-103)',
      ration: '🍚 Smart Ration Card (NFSA)',
      domicile: '📍 State Domicile / Nativity',
      first_grad: '🎓 First Graduate (REV-104)',
      bonafide: '📜 College Bonafide (AISHE)',
      ews: '📑 EWS Certificate',
      disability: '♿ UDID Disability Certificate',
      custom: '📄 Other Government Record'
    },
    stages: [
      '1. Profile Setup',
      '2. Scheme Selected',
      '3. Documents Uploaded',
      '4. OCR Analyzed',
      '5. Eligibility Checked',
      '6. Cross-Doc Checked',
      '7. Pre-Flight Cleared',
      '8. Ready to Apply'
    ]
  },
  te: {
    backToDashboard: '← డాష్‌బోర్డ్‌కు తిరిగి వెళ్లండి',
    auditTargetScheme: 'ఆడిట్ లక్ష్య పథకం:',
    overallReadinessTitle: 'మొత్తం ప్రీ-ఫ్లైట్ సంసిద్ధత సూచిక',
    readinessTag: 'AI ప్రీ-ఫ్లైట్ ఆడిట్',
    eligibilityBreakdown: '1. అర్హత',
    documentsBreakdown: '2. సర్టిఫికెట్లు',
    identityBreakdown: '3. గుర్తింపు సరిపోలిక',
    prerequisitesBreakdown: '4. ముందస్తు అవసరాలు / NPCI',
    policyBreakdown: '5. గెజిట్ విశ్వసనీయత',
    timelineHeading: '8-దశల ప్రభుత్వ దరఖాస్తు ప్రగతి పైప్‌లైన్:',
    whyNotReadyBtn: 'నేను ఎందుకు సిద్ధంగా లేను?',
    fixMyApplicationBtn: 'నా దరఖాస్తును సరిదిద్దండి (కార్యాచరణ)',
    askCopilotBtn: 'జనసేతు కోపైలట్‌ను అడగండి',
    tabFlightDeck: 'క్రాస్-డాక్యుమెంట్ మ్యాట్రిక్స్ & రిస్క్ ఇంజిన్',
    tabDependencyGraph: 'దరఖాస్తు ఆధారిత గ్రాఫ్ (Dependency Graph)',
    tabVault: 'డాక్యుమెంట్ వాల్ట్ డాష్‌బోర్డ్',
    tabClerical: 'క్లెరికల్ సరిపోలిక & NPCI ఆదేశం',
    crossDocTitle: 'క్రాస్-డాక్యుమెంట్ ఫీల్డ్ సరిపోలిక & మాన్యువల్ క్లరికల్ ఇన్‌స్పెక్టర్',
    crossDocSub: 'రియల్-టైమ్‌లో క్లెరికల్ తేడాలను తనిఖీ చేయడానికి క్రింది బాక్స్‌లలో వివరాలను రాయండి లేదా సవరించండి, లేదా పత్రాలను అప్‌లోడ్ చేయండి.',
    selectTargetDocLabel: 'ఆధార్‌తో పోల్చి ఆడిట్ చేయడానికి పత్రాన్ని ఎంచుకోండి:',
    manualActiveNotice: 'మాన్యువల్ తనిఖీ సక్రియంగా ఉంది: డ్రాప్‌డౌన్ల నుండి పోల్చాల్సిన పత్రాలను ఎంచుకోండి, తేడాలను వెంటనే తనిఖీ చేయడానికి క్రింది బాక్స్‌లలో విలువలను సవరించండి!',
    fieldsMatchingBadge: 'ఫీల్డ్స్ సరిపోలాయి',
    addFieldBtn: 'ఫీల్డ్ జోడించండి',
    testMatchBtn: '100% సరిపోలిక పరీక్ష',
    testDiscrepancyBtn: 'తేడాను పరీక్షించండి',
    resetBtn: 'రీసెట్ చేయండి',
    uploadScanBtn: 'అప్‌లోడ్ & ఆటో-స్కాన్',
    thFieldToCompare: 'పోల్చాల్సిన అంశం / ఫీల్డ్',
    thPrimaryValue: 'ప్రాథమిక విలువ (రాయడానికి / తనిఖీకి బాక్స్)',
    thSecondaryValue: 'ద్వితీయ విలువ (రాయడానికి / తనిఖీకి బాక్స్)',
    thLiveStatus: 'ప్రత్యక్ష స్థితి',
    thAction: 'చర్య',
    primaryBaselineLabel: 'ప్రాథమిక ఆధారం:',
    compareAgainstLabel: 'దీనితో పోల్చండి:',
    asPrintedOn: 'ముద్రించిన ప్రకారం',
    statusConsistent: '✓ సరిపోయింది (CONSISTENT)',
    statusDiscrepancy: '⚠ తేడా ఉంది (DISCREPANCY)',
    statusPhonetic: '⚠ అక్షరదోషం / ఉచ్చారణ తేడా',
    statusInitials: '⚠ ఇనిషియల్స్ / పేరు వరుస తేడా',
    statusCritical: '❌ తీవ్రమైన వ్యత్యాసం (CRITICAL)',
    status100MatchNotice: '100% క్రాస్-డాక్యుమెంట్ గుర్తింపు సరిపోలిక ధృవీకరించబడింది: అన్ని ప్రభుత్వ రికార్డులలో ప్రాథమిక మరియు ద్వితీయ వివరాలు కచ్చితంగా సరిపోలాయి. తిరస్కరణ ప్రమాదం సున్నా!',
    statusVarianceNotice: 'క్లెరికల్ వ్యత్యాసం గుర్తించబడింది: ఒకటి లేదా అంతకంటే ఎక్కువ ఫీల్డ్‌లలో తేడాలు ఉన్నాయి. తిరస్కరణను నివారించడానికి "నా దరఖాస్తును సరిదిద్దండి" నుండి పేరు వ్యత్యాస అఫిడవిట్‌ను డౌన్‌లోడ్ చేసుకోండి.',
    generateAffidavitBtn: 'అఫిడవిట్ & ప్రణాళికను రూపొందించండి',
    fieldNames: {
      name: 'దరఖాస్తుదారు పూర్తి పేరు & ఇనిషియల్స్',
      dob: 'పుట్టిన తేదీ (DD-MM-YYYY)',
      father: 'తండ్రి / సంరక్షకుడి పేరు',
      domicile: 'నివాస రాష్ట్రం & జిల్లా',
      income: 'వార్షిక కుటుంబ మొత్తం ఆదాయం',
      category: 'సామాజిక రిజర్వేషన్ వర్గం / కులం'
    },
    docLabels: {
      aadhaar: '🆔 ఆధార్ కార్డు (UIDAI KYC)',
      marksheet: '📝 10/12వ తరగతి మార్కుల జాబితా',
      bank: '🏦 బ్యాంక్ పాస్‌బుక్ & NPCI DBT',
      income: '💰 ఆదాయ ధ్రువీకరణ పత్రం (REV-101)',
      caste: '🏛️ కుల ధ్రువీకరణ పత్రం (REV-103)',
      ration: '🍚 రేషన్ కార్డు / బియ్యం కార్డు (NFSA)',
      domicile: '📍 నివాస / స్థానికత సర్టిఫికెట్',
      first_grad: '🎓 మొదటి పట్టభద్రుడి సర్టిఫికెట్ (REV-104)',
      bonafide: '📜 కళాశాల బోనఫైడ్ సర్టిఫికెట్',
      ews: '📑 EWS ఆదాయ & ఆస్తి సర్టిఫికెట్',
      disability: '♿ UDID దివ్యాంగుల ధ్రువీకరణ పత్రం',
      custom: '📄 ఇతర ప్రభుత్వ పత్రం'
    },
    stages: [
      '1. ప్రొఫైల్ నమోదు',
      '2. పథకం ఎంపిక',
      '3. పత్రాల అప్‌లోడ్',
      '4. OCR విశ్లేషణ',
      '5. అర్హత తనిఖీ',
      '6. క్రాస్-డాక్యుమెంట్ ఆడిట్',
      '7. ప్రీ-ఫ్లైట్ క్లియరెన్స్',
      '8. దరఖాస్తుకు సిద్ధం'
    ]
  },
  hi: {
    backToDashboard: '← डैशबोर्ड पर वापस जाएं',
    auditTargetScheme: 'ऑडिट लक्षित योजना:',
    overallReadinessTitle: 'कुल प्री-फ्लाइट तैयारी सूचकांक',
    readinessTag: 'AI प्री-फ्लाइट ऑडिट',
    eligibilityBreakdown: '1. कानूनी पात्रता',
    documentsBreakdown: '2. दस्तावेज़ / प्रमाणपत्र',
    identityBreakdown: '3. पहचान मिलान',
    prerequisitesBreakdown: '4. पूर्वापेक्षाएं / NPCI',
    policyBreakdown: '5. राजपत्र विश्वसनीयता',
    timelineHeading: '8-चरणीय सरकारी आवेदन प्रगति पाइपलाइन:',
    whyNotReadyBtn: 'मैं तैयार क्यों नहीं हूँ?',
    fixMyApplicationBtn: 'मेरा आवेदन ठीक करें (कार्ययोजना)',
    askCopilotBtn: 'जनसेतु कोपायलट से पूछें',
    tabFlightDeck: 'क्रॉस-डॉक्यूमेंट मैट्रिक्स एवं जोखिम इंजन',
    tabDependencyGraph: 'आवेदन निर्भरता ग्राफ',
    tabVault: 'दस्तावेज़ वॉल्ट डैशबोर्ड',
    tabClerical: 'लिपिकीय मिलान एवं NPCI मैंडेट',
    crossDocTitle: 'क्रॉस-डॉक्यूमेंट फील्ड मिलान एवं लिपिकीय निरीक्षक',
    crossDocSub: 'वास्तविक समय में विसंगतियों की जांच के लिए नीचे दिए गए बक्से में विवरण लिखें या संशोधित करें।',
    selectTargetDocLabel: 'आधार से मिलान के लिए लक्षित दस्तावेज़ चुनें:',
    manualActiveNotice: 'मैन्युअल निरीक्षण सक्रिय: ड्रॉपडाउन से तुलना करने के लिए दस्तावेज़ चुनें, फिर बॉक्स में मान दर्ज करें!',
    fieldsMatchingBadge: 'फील्ड मेल खाते हैं',
    addFieldBtn: 'फील्ड जोड़ें',
    testMatchBtn: '100% मिलान जांचें',
    testDiscrepancyBtn: 'विसंगति जांचें',
    resetBtn: 'रीसेट करें',
    uploadScanBtn: 'अपलोड एवं ऑटो-स्कैन',
    thFieldToCompare: 'तुलना हेतु फील्ड',
    thPrimaryValue: 'प्राथमिक मान (लिखने/जांचने का बॉक्स)',
    thSecondaryValue: 'द्वितीयक मान (लिखने/जांचने का बॉक्स)',
    thLiveStatus: 'वर्तमान स्थिति',
    thAction: 'कार्रवाई',
    primaryBaselineLabel: 'प्राथमिक आधार:',
    compareAgainstLabel: 'तुलना करें:',
    asPrintedOn: 'मुद्रित अनुसार',
    statusConsistent: '✓ सुसंगत (CONSISTENT)',
    statusDiscrepancy: '⚠ विसंगति (DISCREPANCY)',
    statusPhonetic: '⚠ ध्वन्यात्मक / वर्तनी भिन्नता',
    statusInitials: '⚠ संक्षिप्त नाम / अनुक्रम भिन्नता',
    statusCritical: '❌ गंभीर बेमेल (CRITICAL)',
    status100MatchNotice: '100% पहचान सुसंगतता सत्यापित: सभी सरकारी अभिलेखों में प्राथमिक एवं द्वितीयक विवरण पूरी तरह मेल खाते हैं। अस्वीकृति का जोखिम शून्य!',
    statusVarianceNotice: 'लिपिकीय विसंगति पाई गई: एक या अधिक क्षेत्रों में भिन्नता है। अस्वीकृति से बचने हेतु कार्ययोजना से नाम विसंगति शपथपत्र डाउनलोड करें।',
    generateAffidavitBtn: 'शपथपत्र एवं कार्ययोजना बनाएं',
    fieldNames: {
      name: 'आवेदक का पूरा नाम एवं प्रारंभिक अक्षर',
      dob: 'जन्म तिथि (DD-MM-YYYY)',
      father: 'पिता / अभिभावक का नाम',
      domicile: 'मूल निवास राज्य एवं जिला',
      income: 'पारिवारिक कुल वार्षिक आय',
      category: 'सामाजिक आरक्षण श्रेणी / वर्ग'
    },
    docLabels: {
      aadhaar: '🆔 आधार कार्ड (UIDAI KYC)',
      marksheet: '📝 10वीं/12वीं अंकतालिका',
      bank: '🏦 बैंक पासबुक (NPCI DBT)',
      income: '💰 आय प्रमाणपत्र (REV-101)',
      caste: '🏛️ जाति प्रमाणपत्र (REV-103)',
      ration: '🍚 राशन कार्ड (NFSA)',
      domicile: '📍 मूल निवास प्रमाणपत्र',
      first_grad: '🎓 प्रथम स्नातक प्रमाणपत्र (REV-104)',
      bonafide: '📜 कॉलेज बोनाफाइड प्रमाणपत्र',
      ews: '📑 EWS प्रमाणपत्र',
      disability: '♿ UDID दिव्यांगता प्रमाणपत्र',
      custom: '📄 अन्य सरकारी अभिलेख'
    },
    stages: [
      '1. प्रोफ़ाइल पंजीकरण',
      '2. योजना का चयन',
      '3. दस्तावेज़ अपलोड',
      '4. OCR विश्लेषण',
      '5. पात्रता जांच',
      '6. क्रॉस-डॉक्यूमेंट जांच',
      '7. प्री-फ्लाइट क्लीयरेंस',
      '8. आवेदन के लिए तैयार'
    ]
  },
  ta: {
    backToDashboard: '← முதன்மைப் பலகைக்குத் திரும்பு',
    auditTargetScheme: 'தணிக்கை இலக்கு திட்டம்:',
    overallReadinessTitle: 'முழுமையான முன்-தணிக்கை தயார்நிலை',
    readinessTag: 'AI முன்-தணிக்கை',
    eligibilityBreakdown: '1. சட்டப்பூர்வ தகுதி',
    documentsBreakdown: '2. சான்றிதழ்கள்',
    identityBreakdown: '3. அடையாளப் பொருத்தம்',
    prerequisitesBreakdown: '4. முன்நிபந்தனைகள் / NPCI',
    policyBreakdown: '5. அரசாணை நம்பகத்தன்மை',
    timelineHeading: '8-கட்ட அரசு விண்ணப்ப முன்னேற்றப் பாதை:',
    whyNotReadyBtn: 'நான் ஏன் தயாராக இல்லை?',
    fixMyApplicationBtn: 'விண்ணப்பத்தைச் சரிசெய் (செயல் திட்டம்)',
    askCopilotBtn: 'ஜனசேது கோபைலட்டிடம் கேளுங்கள்',
    tabFlightDeck: 'ஆவண ஒப்பீட்டு மேட்ரிக்ஸ் & இடர் எஞ்சின்',
    tabDependencyGraph: 'விண்ணப்ப சார்பு வரைபடம்',
    tabVault: 'ஆவண பாதுகாப்பு பெட்டகம்',
    tabClerical: 'எழுத்துப் பிழை திருத்தம் & NPCI ஆணை',
    crossDocTitle: 'குறுக்கு ஆவண ஒப்பீடு & எழுத்துப் பிழை ஆய்வாளர்',
    crossDocSub: 'எழுத்துப் பிழைகளை உடனுக்குடன் சரிபார்க்க கீழே உள்ள பெட்டிகளில் விவரங்களை உள்ளிடவும் அல்லது மாற்றவும்.',
    selectTargetDocLabel: 'ஆதாருடன் ஒப்பிட வேண்டிய ஆவணத்தைத் தேர்ந்தெடுக்கவும்:',
    manualActiveNotice: 'கையேடு ஆய்வு செயலில் உள்ளது: கீழ்தோன்றும் பட்டியலில் இருந்து ஆவணங்களைத் தேர்ந்தெடுத்து, பெட்டிகளில் மதிப்புகளை உள்ளிடவும்!',
    fieldsMatchingBadge: 'பொருந்திய விவரங்கள்',
    addFieldBtn: 'புலத்தைச் சேர்',
    testMatchBtn: '100% பொருத்தம் சோதனை',
    testDiscrepancyBtn: 'வேறுபாட்டைச் சோதி',
    resetBtn: 'மீட்டமைக்க',
    uploadScanBtn: 'பதிவேற்றம் & தானியங்கி ஸ்கேன்',
    thFieldToCompare: 'ஒப்பிட வேண்டிய விவரம்',
    thPrimaryValue: 'முதன்மை மதிப்பு (எழுத / ஆய்வு செய்ய)',
    thSecondaryValue: 'இரண்டாம் மதிப்பு (எழுத / ஆய்வு செய்ய)',
    thLiveStatus: 'நேரடி நிலை',
    thAction: 'செயல்',
    primaryBaselineLabel: 'முதன்மை அடிப்படை:',
    compareAgainstLabel: 'இதனுடன் ஒப்பிடுக:',
    asPrintedOn: 'அச்சிடப்பட்டுள்ள படி',
    statusConsistent: '✓ பொருந்தியது (CONSISTENT)',
    statusDiscrepancy: '⚠ வேறுபாடு உள்ளது (DISCREPANCY)',
    statusPhonetic: '⚠ உச்சரிப்பு / எழுத்துப்பிழை வேறுபாடு',
    statusInitials: '⚠ முதலெழுத்து / பெயர் வரிசை வேறுபாடு',
    statusCritical: '❌ கடுமையான முரண்பாடு (CRITICAL)',
    status100MatchNotice: '100% அடையாள நிலைத்தன்மை உறுதிப்படுத்தப்பட்டது: அனைத்து அரசு ஆவணங்களிலும் விவரங்கள் சரியாகப் பொருந்துகின்றன. நிராகரிப்பு அபாயம் இல்லை!',
    statusVarianceNotice: 'எழுத்துப் பிழை வேறுபாடு கண்டறியப்பட்டது: ஒன்று அல்லது அதற்கு மேற்பட்ட புலங்களில் வேறுபாடுகள் உள்ளன. நிராகரிப்பைத் தவிர்க்க பெயர் வேறுபாட்டு உறுதிமொழியைப் பதிவிறக்கவும்.',
    generateAffidavitBtn: 'உறுதிமொழிப் பத்திரம் & செயல் திட்டம் உருவாக்கு',
    fieldNames: {
      name: 'விண்ணப்பதாரர் முழுப் பெயர் & முதலெழுத்து',
      dob: 'பிறந்த தேதி (DD-MM-YYYY)',
      father: 'தந்தை / பாதுகாவலர் பெயர்',
      domicile: 'இருப்பிட மாநிலம் & மாவட்டம்',
      income: 'குடும்ப மொத்த ஆண்டு வருமானம்',
      category: 'சமூக இடஒதுக்கீட்டுப் பிரிவு / சாதி'
    },
    docLabels: {
      aadhaar: '🆔 ஆதார் அட்டை (UIDAI KYC)',
      marksheet: '📝 10/12-ஆம் வகுப்பு மதிப்பெண் சான்றிதழ்',
      bank: '🏦 வங்கி கணக்குப் புத்தகம் & NPCI DBT',
      income: '💰 வருமானச் சான்றிதழ் (REV-101)',
      caste: '🏛️ சாதிச் சான்றிதழ் (REV-103)',
      ration: '🍚 ஸ்மார்ட் ரேஷன் அட்டை (NFSA)',
      domicile: '📍 இருப்பிடச் சான்றிதழ்',
      first_grad: '🎓 முதல் பட்டதாரி சான்றிதழ் (REV-104)',
      bonafide: '📜 கல்லூரி போனாஃபைட் சான்றிதழ்',
      ews: '📑 EWS சான்றிதழ்',
      disability: '♿ UDID மாற்றுத்திறனாளி சான்றிதழ்',
      custom: '📄 பிற அரசு ஆவணம்'
    },
    stages: [
      '1. சுயவிவர பதிவு',
      '2. திட்டத் தேர்வு',
      '3. ஆவணப் பதிவேற்றம்',
      '4. OCR பகுப்பாய்வு',
      '5. தகுதி சரிபார்ப்பு',
      '6. குறுக்கு ஆவணத் தணிக்கை',
      '7. முன்-தணிக்கை அனுமதி',
      '8. விண்ணப்பிக்க தயார்'
    ]
  },
  ml: {
    backToDashboard: '← ഡാഷ്‌ബോർഡിലേക്ക് മടങ്ങുക',
    auditTargetScheme: 'ഓഡിറ്റ് ലക്ഷ്യ പദ്ധതി:',
    overallReadinessTitle: 'ആകെ പ്രീ-ഫ്ലൈറ്റ് സന്നദ്ധതാ സൂചിക',
    readinessTag: 'AI പ്രീ-ഫ്ലൈറ്റ് ഓഡിറ്റ്',
    eligibilityBreakdown: '1. യോഗ്യത',
    documentsBreakdown: '2. സർട്ടിഫിക്കറ്റുകൾ',
    identityBreakdown: '3. തിരിച്ചറിയൽ പൊരുത്തം',
    prerequisitesBreakdown: '4. മുൻവ്യവസ്ഥകൾ / NPCI',
    policyBreakdown: '5. ഗസറ്റ് വിശ്വാസ്യത',
    timelineHeading: '8-ഘട്ട സർക്കാർ അപേക്ഷാ പുരോഗതി പൈപ്പ്‌ലൈൻ:',
    whyNotReadyBtn: 'എന്തുകൊണ്ട് ഞാൻ തയ്യാറല്ല?',
    fixMyApplicationBtn: 'എൻ്റെ അപേക്ഷ ശരിയാക്കുക (കർമ്മപദ്ധതി)',
    askCopilotBtn: 'ജനസേതു കോപൈലറ്റിനോട് ചോദിക്കുക',
    tabFlightDeck: 'ക്രോസ്-ഡോക്യുമെൻ്റ് മാട്രിക്സ് & റിസ്ക് എഞ്ചിൻ',
    tabDependencyGraph: 'അപേക്ഷാ ആശ്രിതത്വ ഗ്രാഫ്',
    tabVault: 'ഡോക്യുമെൻ്റ് വോൾട്ട് ഡാഷ്‌ബോർഡ്',
    tabClerical: 'ക്ലറിക്കൽ പൊരുത്തപ്പെടുത്തൽ & NPCI മാൻഡേറ്റ്',
    crossDocTitle: 'ക്രോസ്-ഡോക്യുമെൻ്റ് ഫീൽഡ് പൊരുത്തപ്പെടുത്തലും ക്ലറിക്കൽ ഇൻസ്പെക്ടറും',
    crossDocSub: 'തത്സമയ വ്യത്യാസങ്ങൾ പരിശോധിക്കുന്നതിന് താഴെയുള്ള ബോക്സുകളിൽ വിവരങ്ങൾ എഴുതുകയോ തിരുത്തുകയോ ചെയ്യുക.',
    selectTargetDocLabel: 'ആധാറുമായി താരതമ്യം ചെയ്യാനുള്ള രേഖ തിരഞ്ഞെടുക്കുക:',
    manualActiveNotice: 'മാനുവൽ പരിശോധന സജീവമാണ്: ഡ്രോപ്പ്ഡൗണുകളിൽ നിന്ന് രേഖകൾ തിരഞ്ഞെടുത്ത് ബോക്സുകളിൽ മാറ്റങ്ങൾ വരുത്തുക!',
    fieldsMatchingBadge: 'ഫീൽഡുകൾ പൊരുത്തപ്പെട്ടു',
    addFieldBtn: 'ഫീൽഡ് ചേർക്കുക',
    testMatchBtn: '100% പൊരുത്തം പരിശോധിക്കുക',
    testDiscrepancyBtn: 'വ്യത്യാസം പരിശോധിക്കുക',
    resetBtn: 'റീസെറ്റ് ചെയ്യുക',
    uploadScanBtn: 'അപ്‌ലോഡ് & ഓട്ടോ-സ്കാൻ',
    thFieldToCompare: 'താരതമ്യം ചെയ്യേണ്ട ഫീൽഡ്',
    thPrimaryValue: 'പ്രാഥമിക മൂല്യം (എഴുതാനുള്ള ബോക്സ്)',
    thSecondaryValue: 'ദ്വിതീയ മൂല്യം (എഴുതാനുള്ള ബോക്സ്)',
    thLiveStatus: 'നിലവിലെ അവസ്ഥ',
    thAction: 'നടപടി',
    primaryBaselineLabel: 'പ്രാഥമിക അടിസ്ഥാനം:',
    compareAgainstLabel: 'ഇതുമായി താരതമ്യം ചെയ്യുക:',
    asPrintedOn: 'രേഖപ്പെടുത്തിയിരിക്കുന്ന പ്രകാരം',
    statusConsistent: '✓ പൊരുത്തപ്പെട്ടു (CONSISTENT)',
    statusDiscrepancy: '⚠ വ്യത്യാസമുണ്ട് (DISCREPANCY)',
    statusPhonetic: '⚠ ഉച്ചാരണ / അക്ഷരത്തെറ്റ് വ്യത്യാസം',
    statusInitials: '⚠ ഇനീഷ്യൽ / പേരിൻ്റെ ക്രമ വ്യത്യാസം',
    statusCritical: '❌ ഗുരുതരമായ പൊരുത്തക്കേട് (CRITICAL)',
    status100MatchNotice: '100% തിരിച്ചറിയൽ പൊരുത്തം സ്ഥിരീകരിച്ചു: എല്ലാ സർക്കാർ രേഖകളിലും വിവരങ്ങൾ കൃത്യമായി പൊരുത്തപ്പെടുന്നു. നിരസിക്കൽ സാധ്യത പൂജ്യം!',
    statusVarianceNotice: 'ക്ലറിക്കൽ വ്യത്യാസം കണ്ടെത്തി: ഒന്നോ അതിലധികമോ ഫീൽഡുകളിൽ വ്യത്യാസങ്ങളുണ്ട്. നിരസിക്കൽ ഒഴിവാക്കാൻ കർമ്മപദ്ധതിയിൽ നിന്ന് പേര് വ്യത്യാസ സത്യവാങ്മൂലം ഡൗൺലോഡ് ചെയ്യുക.',
    generateAffidavitBtn: 'സത്യവാങ്മൂലവും കർമ്മപദ്ധതിയും തയ്യാറാക്കുക',
    fieldNames: {
      name: 'അപേക്ഷകൻ്റെ പൂർണ്ണ നാമവും ഇനീഷ്യലും',
      dob: 'ജനന തീയതി (DD-MM-YYYY)',
      father: 'പിതാവിൻ്റെ / രക്ഷാകർത്താവിൻ്റെ പേര്',
      domicile: 'സ്വദേശ സംസ്ഥാനവും ജില്ലയും',
      income: 'കുടുംബ ആകെ വാർഷിക വരുമാനം',
      category: 'സാമൂഹിക സംവരണ വിഭാഗം / ജാതി'
    },
    docLabels: {
      aadhaar: '🆔 ആധാർ കാർഡ് (UIDAI KYC)',
      marksheet: '📝 പത്താം/പന്ത്രണ്ടാം ക്ലാസ് മാർക്ക് ഷീറ്റ്',
      bank: '🏦 ബാങ്ക് പാസ്ബുക്ക് & NPCI DBT',
      income: '💰 വരുമാന സർട്ടിഫിക്കറ്റ് (REV-101)',
      caste: '🏛️ ജാതി സർട്ടിഫിക്കറ്റ് (REV-103)',
      ration: '🍚 റേഷൻ കാർഡ് (NFSA)',
      domicile: '📍 സ്ഥിരതാമസ സർട്ടിഫിക്കറ്റ്',
      first_grad: '🎓 ഒന്നാം ബിരുദധാരി സർട്ടിഫിക്കറ്റ് (REV-104)',
      bonafide: '📜 കോളേജ് ബോണഫൈഡ് സർട്ടിഫിക്കറ്റ്',
      ews: '📑 EWS സർട്ടിഫിക്കറ്റ്',
      disability: '♿ UDID ഭിന്നശേഷി സർട്ടിഫിക്കറ്റ്',
      custom: '📄 മറ്റ് സർക്കാർ രേഖ'
    },
    stages: [
      '1. പ്രൊഫൈൽ രജിസ്ട്രേഷൻ',
      '2. സ്കീം തിരഞ്ഞെടുക്കൽ',
      '3. രേഖകൾ അപ്‌ലോഡ് ചെയ്യൽ',
      '4. OCR വിശകലനം',
      '5. യോഗ്യതാ പരിശോധന',
      '6. ക്രോസ്-ഡോക്യുമെൻ്റ് ഓഡിറ്റ്',
      '7. പ്രീ-ഫ്ലൈറ്റ് അനുമതി',
      '8. അപേക്ഷിക്കാൻ തയ്യാറാണ്'
    ]
  }
};
