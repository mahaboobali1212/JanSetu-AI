import jsPDF from 'jspdf';
import { CitizenProfile } from '../types/profile';

export class MandateGenerator {
  /**
   * Generates and triggers download of the official standard RBI/NPCI Annexure-I
   * Application for Linking/Seeding Aadhaar with Bank Account for DBT Benefits
   */
  public static generateMandatePdf(profile: CitizenProfile): void {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const primaryColor = '#0B1B4F'; // Deep Regal Navy
    const margin = 20;
    let y = 25;

    // Header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(primaryColor);
    doc.text('ANNEXURE - I', 105, y, { align: 'center' });
    y += 6;

    doc.setFontSize(10.5);
    doc.setTextColor(0, 0, 0);
    doc.text('APPLICATION FOR LINKING / SEEDING AADHAAR NUMBER AND RECEIVING DBT BENEFITS', 105, y, { align: 'center' });
    y += 5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.text('(As prescribed under National Payments Corporation of India & RBI Guidelines)', 105, y, { align: 'center' });
    y += 10;

    // Date & Branch Details
    const today = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    doc.setFont('helvetica', 'bold');
    doc.text(`Date: ${today}`, 190 - margin, y, { align: 'right' });
    y += 5;

    doc.setFont('helvetica', 'normal');
    doc.text('To,', margin, y);
    y += 5;
    doc.text('The Branch Manager,', margin, y);
    y += 5;
    doc.setFont('helvetica', 'bold');
    doc.text(`Bank Name: ${profile.bankName || 'State Bank of India'}`, margin, y);
    y += 5;
    doc.text(`Branch / IFSC: ${profile.bankIfsc || 'Branch Code: 001234'}`, margin, y);
    y += 10;

    // Subject
    doc.setFont('helvetica', 'bold');
    doc.text('Subject: Mandate for Seeding Aadhaar Number to Bank Account for Direct Benefit Transfer (DBT)', margin, y);
    y += 8;

    // Body
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.text(`Dear Sir / Madam,`, margin, y);
    y += 6;

    const aadhaarDisplay = `XXXX-XXXX-${profile.aadhaarLast4 || 'XXXX'}`;
    const bodyText1 = `I, ${profile.fullName.toUpperCase()}, holding Bank Savings Account Number ${profile.bankAccountNumber || '___________________'} at your branch, wish to link my Aadhaar Number ${aadhaarDisplay} with my account.`;
    const splitText1 = doc.splitTextToSize(bodyText1, 170);
    doc.text(splitText1, margin, y);
    y += splitText1.length * 5 + 4;

    doc.setFont('helvetica', 'bold');
    doc.text('Option Ticked by Account Holder (Mandatory Selection):', margin, y);
    y += 6;

    // Option 1 (Checked Box)
    doc.rect(margin, y - 3.5, 4, 4);
    doc.setFont('helvetica', 'bold');
    doc.text('X', margin + 1, y - 0.5);
    
    doc.setFont('helvetica', 'bold');
    const opt1 = 'OPTION 1 (Mandatory for Scholarships): I wish to seed my Aadhaar in NPCI Mapper to receive DBT Benefits in this account.';
    doc.text(doc.splitTextToSize(opt1, 160), margin + 8, y);
    y += 10;

    doc.setFont('helvetica', 'normal');
    const opt1Desc = 'I confirm that I have authorized the Ministry / State Welfare Board and NPCI to use my Aadhaar details for authenticating and depositing government scholarships / welfare entitlements directly to this account.';
    const splitOpt1 = doc.splitTextToSize(opt1Desc, 160);
    doc.text(splitOpt1, margin + 8, y);
    y += splitOpt1.length * 5 + 6;

    // Citizen Info Table
    doc.setDrawColor(200, 200, 200);
    doc.setFillColor(245, 247, 255);
    doc.rect(margin, y, 170, 45, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.text('CITIZEN / APPLICANT PARTICULARS', margin + 5, y + 6);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    
    doc.text(`* Full Name of Account Holder: ${profile.fullName.toUpperCase()}`, margin + 5, y + 13);
    doc.text(`* Masked Aadhaar Number: ${aadhaarDisplay}`, margin + 5, y + 19);
    doc.text(`* Bank Name & Branch: ${profile.bankName} (${profile.bankIfsc})`, margin + 5, y + 25);
    doc.text(`* Bank Account Number: ${profile.bankAccountNumber}`, margin + 5, y + 31);
    doc.text(`* Domicile State & District: ${profile.stateOfDomicile}, ${profile.district || 'District Verified'}`, margin + 5, y + 37);
    y += 52;

    // Signature Area
    doc.setFont('helvetica', 'normal');
    doc.text('Yours faithfully,', margin, y);
    y += 16;
    doc.setFont('helvetica', 'bold');
    doc.text(`(${profile.fullName.toUpperCase()})`, margin, y);
    doc.setFont('helvetica', 'normal');
    doc.text('Signature / Thumb Impression of Customer', margin, y + 5);

    doc.setFont('helvetica', 'normal');
    doc.text('Enclosure: Self-Attested Copy of Aadhaar Card', 190 - margin, y + 5, { align: 'right' });
    y += 16;

    // Official Bank Acknowledgement Slip
    doc.setLineDashPattern([2, 2], 0);
    doc.line(margin, y, 190, y);
    doc.setLineDashPattern([], 0);
    y += 6;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('FOR BANK BRANCH OFFICIAL USE ONLY (ACKNOWLEDGEMENT SLIP)', 105, y, { align: 'center' });
    y += 6;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.text(`Received Application for Aadhaar Seeding on NPCI Mapper for Account No. ${profile.bankAccountNumber} held by ${profile.fullName}.`, margin, y);
    y += 5;
    doc.text('The account has been marked on CBS and submitted to NPCI Central Mapper for DBT processing.', margin, y);
    y += 12;

    doc.text('Date: _______________', margin, y);
    doc.text('Bank Officer Seal & Signature: _______________________', 190 - margin, y, { align: 'right' });

    // Save PDF
    const filename = `NPCI_DBT_Mandate_${profile.fullName.replace(/\s+/g, '_')}.pdf`;
    doc.save(filename);
  }
}
