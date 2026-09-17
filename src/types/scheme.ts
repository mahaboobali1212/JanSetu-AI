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
