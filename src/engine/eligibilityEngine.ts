import { CitizenProfile } from '../types/profile';
import { CertificateInventory, CertificateKey } from '../types/certificate';
import { SchemeDefinition, EvaluationResult, EvaluationStatus } from '../types/scheme';
import { CENTRAL_SCHEMES } from '../data/schemesCentral';
import { STATE_SCHEMES } from '../data/schemesStates';

export class EligibilityEngine {
  /**
   * Evaluates all schemes (Central + Domicile State) against citizen profile and certificate inventory
   */
  public static evaluateAllSchemes(
    profile: CitizenProfile,
    inventory: CertificateInventory
  ): EvaluationResult[] {
    const allSchemes: SchemeDefinition[] = [...CENTRAL_SCHEMES, ...STATE_SCHEMES];
    
    return allSchemes.map(scheme => this.evaluateScheme(scheme, profile, inventory));
  }

  /**
   * Deterministic evaluation of a single scheme
   */
  public static evaluateScheme(
    scheme: SchemeDefinition,
    profile: CitizenProfile,
    inventory: CertificateInventory
  ): EvaluationResult {
    const matchedClauses: string[] = [];
    const failedClauses: string[] = [];

    // 1. Domicile / State Check
    if (scheme.level === 'state' && scheme.state) {
      if (profile.stateOfDomicile.toLowerCase() !== scheme.state.toLowerCase()) {
        failedClauses.push(`State Mismatch: Requires domicile of ${scheme.state} (Citizen is from ${profile.stateOfDomicile}).`);
      } else {
        matchedClauses.push(`Domicile verified: Resident of ${scheme.state}.`);
      }
    } else {
      matchedClauses.push(`All-India Central Scheme: Open to residents of all States & UTs.`);
    }

    // 2. Gender Check
    if (scheme.criteria.allowedGenders && scheme.criteria.allowedGenders.length > 0) {
      if (!scheme.criteria.allowedGenders.includes(profile.gender)) {
        failedClauses.push(`Gender Requirement: Scheme is exclusively for ${scheme.criteria.allowedGenders.join(', ')} applicants.`);
      } else {
        matchedClauses.push(`Gender matched: ${profile.gender.toUpperCase()}.`);
      }
    }

    // 3. Category / Caste Check
    if (scheme.criteria.allowedCategories && scheme.criteria.allowedCategories.length > 0) {
      if (!scheme.criteria.allowedCategories.includes(profile.category)) {
        failedClauses.push(`Social Category: Applicable for ${scheme.criteria.allowedCategories.join(', ')} categories (Applicant is ${profile.category}).`);
      } else {
        matchedClauses.push(`Category matched: Qualified under ${profile.category} category.`);
      }
    }

    // 4. Annual Family Income Ceiling Check
    if (scheme.criteria.maxAnnualIncome !== undefined) {
      if (profile.annualIncome > scheme.criteria.maxAnnualIncome) {
        const incomeFormatted = (profile.annualIncome / 100000).toFixed(2);
        const limitFormatted = (scheme.criteria.maxAnnualIncome / 100000).toFixed(2);
        failedClauses.push(`Income Ceiling Exceeded: Family income of ₹${incomeFormatted} Lakhs exceeds statutory limit of ₹${limitFormatted} Lakhs.`);
      } else {
        const limitFormatted = (scheme.criteria.maxAnnualIncome / 100000).toFixed(2);
        matchedClauses.push(`Income qualified: ₹${profile.annualIncome.toLocaleString('en-IN')} is within ₹${limitFormatted} Lakhs limit.`);
      }
    }

    // 5. Course Level Check
    if (scheme.criteria.allowedCourseLevels && scheme.criteria.allowedCourseLevels.length > 0) {
      if (!scheme.criteria.allowedCourseLevels.includes(profile.courseLevel)) {
        failedClauses.push(`Course Level: Scheme covers ${scheme.criteria.allowedCourseLevels.join(', ')} courses.`);
      } else {
        matchedClauses.push(`Course Level matched: Enrolled in eligible ${profile.courseLevel} level program.`);
      }
    }

    // 6. Academic Marks Cutoff Check
    if (scheme.criteria.minMarksPercentage !== undefined) {
      if (profile.marksPercentage < scheme.criteria.minMarksPercentage) {
        failedClauses.push(`Academic Merit Cutoff: Score of ${profile.marksPercentage}% is below minimum required ${scheme.criteria.minMarksPercentage}%.`);
      } else {
        matchedClauses.push(`Merit threshold matched: ${profile.marksPercentage}% exceeds ${scheme.criteria.minMarksPercentage}% cutoff.`);
      }
    }

    // 7. Continuous Government Schooling Check
    if (scheme.criteria.requiresGovtSchool) {
      if (profile.schoolingType !== 'govt_school') {
        failedClauses.push(`Schooling Clause: Requires continuous study in Government School from Class 6 to 12 (Applicant attended ${profile.schoolingType.replace('_', ' ')}).`);
      } else {
        matchedClauses.push(`Schooling verified: Continuous Class 6-12 Government School student.`);
      }
    }

    // 8. First Graduate Status Check
    if (scheme.criteria.requiresFirstGraduate) {
      if (!profile.isFirstGraduate) {
        failedClauses.push(`First Graduate Clause: Requires candidate to be the first person in entire family to enter higher education.`);
      } else {
        matchedClauses.push(`First Graduate status verified.`);
      }
    }

    // 9. Specially Abled / PwD Check
    if (scheme.criteria.requiresSpeciallyAbled) {
      if (!profile.isSpeciallyAbled) {
        failedClauses.push(`Disability Clause: Requires verified 40%+ permanent disability.`);
      } else {
        matchedClauses.push(`PwD criteria qualified.`);
      }
    }

    // Check Missing Certificates
    const missingCertificates: CertificateKey[] = scheme.requiredCertificates.filter(
      certKey => !inventory[certKey]
    );

    let status: EvaluationStatus = 'READY_TO_APPLY';

    if (failedClauses.length > 0) {
      status = 'INELIGIBLE';
    } else if (missingCertificates.length > 0) {
      status = 'CONDITIONALLY_ELIGIBLE';
    } else {
      status = 'READY_TO_APPLY';
    }

    return {
      scheme,
      status,
      matchedClauses,
      failedClauses,
      missingCertificates,
      missingCertCount: missingCertificates.length
    };
  }
}
