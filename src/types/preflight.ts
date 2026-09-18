import { CertificateKey } from './certificate';
import { Language } from './language';

export type DocumentValidationStatus = 'VALID' | 'WARNING' | 'MISSING' | 'NEEDS_REVIEW';

export interface ExtractedDocumentFields {
  applicantName?: string;
  dateOfBirth?: string;
  parentOrGuardianName?: string;
  residentialAddress?: string;
  certificateNumber?: string;
  issueDate?: string;
  expiryDate?: string;
  issuingAuthority?: string;
  annualIncomeNumeric?: number;
  casteCategory?: string;
  extractionConfidence: number; // 0 to 100
}

export interface PreFlightDocument {
  key: CertificateKey;
  id: string; // e.g. "REV-101"
  title: string;
  titleTranslations: Record<Language, string>;
  category: 'IDENTITY' | 'INCOME' | 'COMMUNITY' | 'ACADEMIC' | 'BANKING' | 'RESIDENCE';
  status: DocumentValidationStatus;
  isUploadedOrHeld: boolean;
  extractedFields?: ExtractedDocumentFields;
  isExpired: boolean;
  daysUntilExpiry?: number;
  validityDescription: string;
  whereUsedInSchemes: string[]; // List of scheme names requiring this document
  potentialProblems: string[];
  lastAuditedTimestamp: string;
}

export interface CrossDocConsistencyField {
  fieldName: string;
  fieldLabel: string;
  valuesByDocument: {
    docTitle: string;
    docKey: CertificateKey;
    value: string;
    normalizedValue: string;
    confidence: number;
  }[];
  isConsistent: boolean;
  matchScore: number; // 0 to 100
  exactMismatchReason?: string;
  affectingDocuments: string[];
}

export type PreFlightOverallStatus = 'READY' | 'NOT_READY' | 'NEEDS_HUMAN_REVIEW';

export interface ReadinessScoreBreakdown {
  overallScore: number; // 0 to 100, e.g. 82%
  eligibilityScore: number; // 0 to 100
  documentsScore: number; // 0 to 100
  identityScore: number; // 0 to 100
  prerequisitesScore: number; // 0 to 100
  policyConfidenceScore: number; // 0 to 100
  status: PreFlightOverallStatus;
  statusBadge: {
    label: string;
    color: string;
    description: string;
  };
  summaryExplanation: string;
  unverifiedWarningCount: number;
}

export interface PreFlightRiskItem {
  id: string;
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
  category: 'ELIGIBILITY' | 'DOCUMENT' | 'IDENTITY' | 'PREREQUISITE' | 'POLICY';
  title: string;
  problemDescription: string;
  requiredAction: string;
  targetDocOrStep: string;
  nextCheckStep: string;
  directActionUrl?: string;
  directActionLabel?: string;
  remedyActionType: 'GENERATE_MANDATE' | 'GENERATE_AFFIDAVIT' | 'RESOLVE_CERTIFICATE' | 'CORRECT_AADHAAR' | 'OPEN_GRIEVANCE';
}

export type DependencyStatus = 'COMPLETED' | 'IN_PROGRESS' | 'BLOCKED' | 'NOT_STARTED';

export interface DependencyNode {
  id: string;
  stageNumber: number;
  label: string;
  subLabel: string;
  iconName: string;
  status: DependencyStatus;
  isCriticalPath: boolean;
  details: string;
  blockerReason?: string;
  prerequisiteNodeIds: string[];
  statutoryAuthority: string;
  estimatedTurnaround: string;
}

export interface OfficialSourceCitation {
  schemeId: string;
  schemeName: string;
  authority: string;
  policyName: string;
  gazetteClause: string;
  sectionOrPage: string;
  verified: boolean;
  officialPortalUrl: string;
  unverifiedDisclaimer?: string;
}

export interface PreFlightAnalysisReport {
  selectedSchemeId: string;
  selectedSchemeName: string;
  generatedTimestamp: string;
  readiness: ReadinessScoreBreakdown;
  documents: PreFlightDocument[];
  consistencyFields: CrossDocConsistencyField[];
  risks: PreFlightRiskItem[];
  dependencyGraph: DependencyNode[];
  citations: OfficialSourceCitation[];
  bedrockPlainLanguageSummary: string;
}