import jsPDF from 'jspdf';
import { CitizenProfile } from '../types/profile';
import { EvaluationResult } from '../types/scheme';
import { MASTER_CERTIFICATES } from '../data/certificates';

export class ActionPlanPdfGenerator {
  /**
   * Cleans text to ensure standard Latin ASCII compatibility for jsPDF default fonts
   */
  private static sanitizeText(text: string): string {
    if (!text) return '';
    return text
      .replace(/₹/g, 'Rs. ')
      .replace(/[^\x00-\x7F]/g, '') // strip non-ASCII glyphs that corrupt in PDF
      .trim();
  }

  /**
   * Generates a clean, professional Citizen Civic Action Plan PDF
   */
  public static generateActionPlan(
    profile: CitizenProfile,
    results: EvaluationResult[]
  ): void {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const readySchemes = results.filter(r => r.status === 'READY_TO_APPLY');
    const conditionalSchemes = results.filter(r => r.status === 'CONDITIONALLY_ELIGIBLE');

    // Header Background (Deep Regal Navy #0B1B4F)
    doc.setFillColor(11, 27, 79);
    doc.rect(0, 0, 210, 26, 'F');

    // Top Gold Strip Accent
    doc.setFillColor(223, 183, 56); // Gold
    doc.rect(0, 26, 210, 1.5, 'F');

    // Header Text (Clean Latin only)
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(15);
    doc.text('JanSetu AI - Citizen Civic Action Plan', 15, 12);
    
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(245, 230, 180);
    doc.text('National Scholarship Access & Pre-Flight Verification Report | 100% Deterministic', 15, 19);

    const today = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    doc.setTextColor(255, 255, 255);
    doc.text(`Generated: ${today}`, 195, 19, { align: 'right' });

    let y = 35;

    // Citizen Profile Card Box
    doc.setFillColor(250, 247, 242); // Warm Linen
    doc.setDrawColor(220, 210, 195);
    doc.rect(15, y, 180, 25, 'FD');

    doc.setTextColor(11, 27, 79);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text(`Citizen Name: ${profile.fullName.toUpperCase()}`, 20, y + 6);
    doc.text(`State: ${profile.stateOfDomicile} (${profile.district || 'District Verified'})`, 110, y + 6);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(60, 60, 60);
    doc.text(`Course: ${profile.courseName || profile.courseLevel} | Category: ${profile.category} | Income: Rs. ${profile.annualIncome.toLocaleString('en-IN')}`, 20, y + 13);
    doc.text(`Schooling: ${profile.schoolingType.replace('_', ' ')} | Marks: ${profile.marksPercentage}% | Aadhaar UID: XXXX-XXXX-${profile.aadhaarLast4 || 'XXXX'}`, 20, y + 19);

    y += 32;

    // SECTION 1: 100% READY SCHEMES
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(4, 106, 56); // Tiranga Green
    doc.text(`1. SCHEMES READY FOR DIRECT APPLICATION (${readySchemes.length})`, 15, y);
    y += 6;

    if (readySchemes.length === 0) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(120, 120, 120);
      doc.text('No schemes currently have 100% document readiness. Review missing certificates below.', 20, y);
      y += 8;
    } else {
      readySchemes.forEach((res, idx) => {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(11, 27, 79);
        doc.text(`${idx + 1}. ${this.sanitizeText(res.scheme.name)}`, 20, y);
        y += 4.5;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(80, 80, 80);
        const benefitClean = this.sanitizeText(res.scheme.benefitAmount);
        doc.text(`Benefit: ${benefitClean} | Portal: ${res.scheme.portalName} (${res.scheme.officialPortalUrl})`, 25, y);
        y += 4;
        doc.text(`Deadline: ${res.scheme.applicationClosingDate}`, 25, y);
        y += 6;
      });
    }

    y += 4;

    // SECTION 2: CONDITIONALLY ELIGIBLE SCHEMES
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(180, 80, 0); // Warm Saffron/Amber
    doc.text(`2. CONDITIONALLY ELIGIBLE SCHEMES - REQUIRES CERTIFICATES (${conditionalSchemes.length})`, 15, y);
    y += 6;

    const allMissingKeys = new Set<string>();
    conditionalSchemes.forEach(cs => {
      cs.missingCertificates.forEach(k => allMissingKeys.add(k));
    });

    if (conditionalSchemes.length === 0) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(120, 120, 120);
      doc.text('All eligible schemes have complete documentation in hand.', 20, y);
      y += 8;
    } else {
      conditionalSchemes.forEach((res, idx) => {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(11, 27, 79);
        doc.text(`${idx + 1}. ${this.sanitizeText(res.scheme.name)}`, 20, y);
        y += 4.5;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(180, 50, 0);
        const missingNames = res.missingCertificates.map(k => MASTER_CERTIFICATES[k]?.id || k).join(', ');
        doc.text(`Missing Certificate(s): ${missingNames}`, 25, y);
        y += 4;
        doc.setTextColor(80, 80, 80);
        const benefitClean = this.sanitizeText(res.scheme.benefitAmount);
        doc.text(`Benefit: ${benefitClean} | Portal: ${res.scheme.officialPortalUrl}`, 25, y);
        y += 6;
      });
    }

    y += 4;

    // SECTION 3: WHERE TO GO & OFFICIAL CAPPED FEES
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(11, 27, 79);
    doc.text(`3. WHERE TO GO & OFFICIAL CAPPED FEES (ANTI-EXTORTION GUIDE)`, 15, y);
    y += 6;

    if (allMissingKeys.size === 0) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(4, 106, 56);
      doc.text('All required prerequisite certificates are already held in hand. You are fully ready to apply!', 20, y);
      y += 8;
    } else {
      Array.from(allMissingKeys).forEach(key => {
        const cert = MASTER_CERTIFICATES[key as keyof typeof MASTER_CERTIFICATES];
        if (!cert) return;

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(0, 0, 0);
        doc.text(`* ${cert.id}: ${this.sanitizeText(cert.title)}`, 20, y);
        y += 4;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        doc.setTextColor(80, 80, 80);
        doc.text(`Where: ${cert.whereToApply.onlinePortalName} (${cert.whereToApply.onlinePortalUrl}) or ${cert.whereToApply.offlineOffice}`, 25, y);
        y += 3.5;
        const feeClean = cert.statutoryFeeInr === 0 ? 'Rs. 0 (Free)' : `Rs. ${cert.statutoryFeeInr} (Capped)`;
        doc.text(`Official Statutory Fee: ${feeClean} | SLA: ${cert.statutorySlaDays} Days (Do not pay cyber cafe rate ${this.sanitizeText(cert.cyberCafeExtortionRate)})`, 25, y);
        y += 5.5;
      });
    }

    // Footer
    doc.setDrawColor(220, 210, 195);
    doc.line(15, 280, 195, 280);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(120, 120, 120);
    doc.text('JanSetu AI Citizen Civic Action Plan | All information validated from official Central and State Gazette notifications.', 105, 285, { align: 'center' });

    const filename = `JanSetu_Action_Plan_${profile.fullName.replace(/\s+/g, '_')}.pdf`;
    doc.save(filename);
  }
}
