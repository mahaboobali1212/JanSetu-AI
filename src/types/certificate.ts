import { Language } from './language';

export type CertificateKey = 
  | 'aadhaarCard'
  | 'marksheet10th12th'
  | 'incomeCertificate'
  | 'communityCertificate'
  | 'nativityCertificate'
  | 'firstGraduateCertificate'
  | 'govtSchool7_5Certificate'
  | 'bonafideCertificate'
  | 'bankPassbookNPCI'
  | 'rationCard'
  | 'disabilityCertificate'
  | 'ewsCertificate';

export interface CertificateInventory {
  aadhaarCard: boolean;
  marksheet10th12th: boolean;
  incomeCertificate: boolean;
  communityCertificate: boolean;
  nativityCertificate: boolean;
  firstGraduateCertificate: boolean;
  govtSchool7_5Certificate: boolean;
  bonafideCertificate: boolean;
  bankPassbookNPCI: boolean;
  rationCard: boolean;
  disabilityCertificate: boolean;
  ewsCertificate?: boolean;
}

export interface CertificateDefinition {
  key: CertificateKey;
  id: string; // e.g. "REV-104"
  title: string;
  titleTranslations: Record<Language, string>;
  issuingAuthority: string;
  department: string;
  whereToApply: {
    onlinePortalName: string;
    onlinePortalUrl: string;
    offlineOffice: string;
  };
  statutorySlaDays: number;
  statutoryFeeInr: number; // e.g., 60 for CSC, 0 for online
  cyberCafeExtortionRate: string; // e.g., "₹250 - ₹500"
  precursorDocuments: string[];
  stepByStepRoadmap: string[];
  samplePreviewDescription: string;
  isHighRiskTrap: boolean; // Frequently missing at last minute
}

export const DEFAULT_INVENTORY: CertificateInventory = {
  aadhaarCard: true,
  marksheet10th12th: true,
  incomeCertificate: false,
  communityCertificate: true,
  nativityCertificate: false,
  firstGraduateCertificate: false,
  govtSchool7_5Certificate: false,
  bonafideCertificate: true,
  bankPassbookNPCI: false,
  rationCard: true,
  disabilityCertificate: false,
  ewsCertificate: false
};
