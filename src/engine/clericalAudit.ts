export interface ClericalAuditInput {
  aadhaarName: string;
  marksheetName: string;
  bankPassbookName: string;
  communityCertName?: string;
}

export interface ClericalMismatchIssue {
  severity: 'CRITICAL' | 'WARNING' | 'PASS';
  title: string;
  description: string;
  detectedDiscrepancy: string;
  statutoryRemedy: string;
  directActionUrl?: string;
  directActionLabel?: string;
}

export interface ClericalAuditReport {
  overallScore: number; // 0 to 100
  status: 'GREEN_CLEARED' | 'YELLOW_WARNING' | 'RED_HIGH_RISK';
  issues: ClericalMismatchIssue[];
  normalizedNames: {
    aadhaar: string;
    marksheet: string;
    bank: string;
  };
}

export class ClericalAuditEngine {
  /**
   * Normalizes an Indian name by stripping common titles and extra whitespace
   */
  public static normalizeIndianName(name: string): string {
    return name
      .trim()
      .toUpperCase()
      .replace(/\s+/g, ' ')
      .replace(/\./g, ' ')
      .replace(/\b(MR|MS|MISS|MRS|KUMAR|KUMARI|SELVAN|SELVI|SHREE|SHRI|SMT)\b/g, '')
      .trim();
  }

  /**
   * Levenshtein Distance for string similarity
   */
  public static calculateSimilarity(s1: string, s2: string): number {
    const a = this.normalizeIndianName(s1);
    const b = this.normalizeIndianName(s2);
    if (a === b) return 1.0;
    if (a.length === 0 || b.length === 0) return 0.0;

    const matrix: number[][] = [];

    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // substitution
            matrix[i][j - 1] + 1,     // insertion
            matrix[i - 1][j] + 1      // deletion
          );
        }
      }
    }

    const distance = matrix[b.length][a.length];
    const maxLength = Math.max(a.length, b.length);
    return Math.max(0, 1 - distance / maxLength);
  }

  /**
   * Evaluates name matching and Indian initial placement
   */
  public static runAudit(input: ClericalAuditInput): ClericalAuditReport {
    const issues: ClericalMismatchIssue[] = [];
    let score = 100;

    const nAadhaar = this.normalizeIndianName(input.aadhaarName);
    const nMarksheet = this.normalizeIndianName(input.marksheetName);
    const nBank = this.normalizeIndianName(input.bankPassbookName);

    // 1. Aadhaar vs 10th Marksheet Check
    const aadhaarMarksheetSim = this.calculateSimilarity(input.aadhaarName, input.marksheetName);

    if (aadhaarMarksheetSim === 1.0) {
      issues.push({
        severity: 'PASS',
        title: 'Aadhaar vs Marksheet Name Match: Perfect',
        description: 'Name string and initial configuration match 100% across Aadhaar and Class 10/12 Marksheets.',
        detectedDiscrepancy: `Aadhaar: "${input.aadhaarName}" | Marksheet: "${input.marksheetName}"`,
        statutoryRemedy: 'Zero action required. Name will pass automated UIDAI verification.'
      });
    } else if (aadhaarMarksheetSim >= 0.70) {
      score -= 25;
      issues.push({
        severity: 'WARNING',
        title: 'Initial Expansion / Word Order Discrepancy Detected',
        description: 'Common clerical difference where initial is expanded on one document and abbreviated on another (e.g. "K. Ramesh" vs "Ramesh Kumar").',
        detectedDiscrepancy: `Aadhaar: "${input.aadhaarName}" vs Marksheet: "${input.marksheetName}" (Similarity: ${(aadhaarMarksheetSim * 100).toFixed(0)}%)`,
        statutoryRemedy: 'Update Aadhaar demographic name via UIDAI portal to match 10th Marksheet verbatim (takes 3-5 days for ₹50).',
        directActionUrl: 'https://myaadhaar.uidai.gov.in',
        directActionLabel: 'Open UIDAI myAadhaar Portal →'
      });
    } else {
      score -= 50;
      issues.push({
        severity: 'CRITICAL',
        title: 'High-Risk Name Mismatch (Silent Portal Rejection Risk)',
        description: 'Significant phonetic or spelling difference that will cause automated rejection at NSP or State e-Sevai portals.',
        detectedDiscrepancy: `Aadhaar: "${input.aadhaarName}" vs Marksheet: "${input.marksheetName}" (Similarity: ${(aadhaarMarksheetSim * 100).toFixed(0)}%)`,
        statutoryRemedy: 'Submit 10th Marksheet as Proof of Identity (PoI) at the nearest Post Office Aadhaar Kendra to rectify name before applying.',
        directActionUrl: 'https://appointments.uidai.gov.in',
        directActionLabel: 'Locate Nearest Aadhaar Center →'
      });
    }

    // 2. Aadhaar vs Bank Passbook Name Check
    const aadhaarBankSim = this.calculateSimilarity(input.aadhaarName, input.bankPassbookName);

    if (aadhaarBankSim < 0.75) {
      score -= 30;
      issues.push({
        severity: 'CRITICAL',
        title: 'Bank Account Holder Name Discrepancy (PFMS Failure Risk)',
        description: 'PFMS (Public Financial Management System) automatically rejects treasury payments if bank account title diverges from Aadhaar demographic record.',
        detectedDiscrepancy: `Aadhaar: "${input.aadhaarName}" vs Bank Passbook: "${input.bankPassbookName}"`,
        statutoryRemedy: 'Submit Annexure-I Bank Mandate Form along with self-attested Aadhaar copy to Bank Manager to update CBS account holder record.',
        directActionUrl: '#generate-mandate',
        directActionLabel: 'Generate Printable Annexure-I Mandate Form →'
      });
    } else {
      issues.push({
        severity: 'PASS',
        title: 'Bank Passbook vs Aadhaar Match: Verified',
        description: 'Bank account name conforms with Aadhaar DBT mapper standards.',
        detectedDiscrepancy: `Aadhaar: "${input.aadhaarName}" | Bank: "${input.bankPassbookName}"`,
        statutoryRemedy: 'Ensure NPCI DBT mapper flag is active on the account.'
      });
    }

    const finalScore = Math.max(0, score);
    let status: 'GREEN_CLEARED' | 'YELLOW_WARNING' | 'RED_HIGH_RISK' = 'GREEN_CLEARED';

    if (finalScore < 60) {
      status = 'RED_HIGH_RISK';
    } else if (finalScore < 90) {
      status = 'YELLOW_WARNING';
    }

    return {
      overallScore: finalScore,
      status,
      issues,
      normalizedNames: {
        aadhaar: nAadhaar,
        marksheet: nMarksheet,
        bank: nBank
      }
    };
  }
}
