import { Language } from './language';
import { CertificateKey } from './certificate';
import { Category, CourseLevel, Gender, SchoolingType } from './profile';

export type SchemeScope = 'central' | 'state';

export interface SchemeCriteria {
  maxAnnualIncome?: number;
  minMarksPercentage?: number;
  allowedGenders?: Gender[];
  allowedCategories?: Category[];
  allowedCourseLevels?: CourseLevel[];
  requiresGovtSchool?: boolean;
  requiresFirstGraduate?: boolean;
  requiresSpeciallyAbled?: boolean;
  requiresSingleGirlChild?: boolean;
  requiresConvenorQuota?: boolean;
  applicableStates?: string[]; // Empty or ['All-India Central'] for pan-India
}

export interface SchemeWorkflowStage {
  stageNumber: number;
  title: string;
  department: string;
  description: string;
  estimatedDays: string;
  warningAlert?: string;
}

export type ApplicationMode = 
  | 'citizen_otr_portal'      // Citizen applies online via Aadhaar OTR (e.g. NSP, MahaDBT, SSP)
  | 'college_nodal_officer'   // Applied via College EMIS / Scholarship Desk (e.g. Pudhumai Penn)
  | 'counseling_single_window'; // Uploaded during Admission Counseling (e.g. TN 7.5%, First Graduate)

export interface UploadSpec {
  documentName: string;
  allowedFormats: string;
  maxFileSize: string;
}

export interface PortalNavigationGuide {
  applicationMode: ApplicationMode;
  otrRegistrationUrl?: string;
  applicantLoginUrl?: string;
  searchKeyword: string;
  portalMenuHierarchy: string[];
  requiredUploadSpecs: UploadSpec[];
  postSubmissionAction: string;
}

export interface SchemeDefinition {
  id: string;
  code: string;
  name: string;
  nameTranslations: Record<Language, string>;
  shortDescription: string;
  authority: string;
  level: SchemeScope;
  state?: string;
  benefitAmount: string;
  benefitAmountAnnualNumeric: number;
  benefitType: 'cash_dbt' | 'fee_waiver' | 'stipend' | 'fellowship';
  officialPortalUrl: string;
  portalName: string;
  applicationClosingDate: string; // ISO date format YYYY-MM-DD
  requiredCertificates: CertificateKey[];
  criteria: SchemeCriteria;
  legalGazetteClause: string;
  workflowStages: SchemeWorkflowStage[];
  navigationGuide?: PortalNavigationGuide;
}

export type EvaluationStatus = 'READY_TO_APPLY' | 'CONDITIONALLY_ELIGIBLE' | 'INELIGIBLE';

export interface EvaluationResult {
  scheme: SchemeDefinition;
  status: EvaluationStatus;
  matchedClauses: string[];
  failedClauses: string[];
  missingCertificates: CertificateKey[];
  missingCertCount: number;
}
