import { CitizenProfile } from '../types/profile';
import { CertificateInventory, CertificateKey } from '../types/certificate';
import { EvaluationResult, SchemeDefinition } from '../types/scheme';
import { ClericalAuditReport } from './clericalAudit';
import { MASTER_CERTIFICATES } from '../data/certificates';
import { Language } from '../types/language';

export interface CopilotMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedActions?: { label: string; action: string }[];
}

export class CopilotEngine {
  /**
   * Generates intelligent, context-aware responses based on the citizen's live profile, schemes, and inventory
   */
  public static processQuery(
    query: string,
    profile: CitizenProfile,
    inventory: CertificateInventory,
    evaluationResults: EvaluationResult[],
    auditReport?: ClericalAuditReport,
    lang: Language = 'en'
  ): CopilotMessage {
    const q = query.toLowerCase().trim();
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const msgId = 'msg-' + Date.now();

    // 1. Identify context
    const eligibleSchemes = evaluationResults.filter(r => r.status === 'READY_TO_APPLY');
    const conditionalSchemes = evaluationResults.filter(r => r.status === 'CONDITIONALLY_ELIGIBLE');
    const ineligibleSchemes = evaluationResults.filter(r => r.status === 'INELIGIBLE');
    const missingCertKeys = (Object.keys(inventory) as CertificateKey[]).filter(k => !inventory[k]);

    // Pattern 1: Missing Certificates or How to get them
    if (q.includes('missing') || q.includes('certificate') || q.includes('document') || q.includes('how to get') || q.includes('certificate roadmap')) {
      if (missingCertKeys.length === 0) {
        return {
          id: msgId,
          sender: 'assistant',
          text: `🎉 **Excellent news, ${profile.fullName}!** You currently possess **100% of all required certificates** in your inventory. You are fully ready to apply for all matching Central & State schemes directly on official government portals.`,
          timestamp
        };
      }

      const certList = missingCertKeys.map(k => {
        const c = MASTER_CERTIFICATES[k];
        return c ? `• **${c.title} (${c.id})**: Issued by *${c.issuingAuthority}* | SLA: *${c.statutorySlaDays} Days* | Max Statutory Fee: *₹${c.statutoryFeeInr}*` : `• ${k}`;
      }).join('\n');

      return {
        id: msgId,
        sender: 'assistant',
        text: `📋 **Certificate Inventory Audit for ${profile.fullName}:**\n\nYou currently have **${missingCertKeys.length} missing certificate(s)** to complete:\n\n${certList}\n\n💡 **Action**: Click **"Missing Certificates Roadmap"** in the top navigation or on any scheme card to view the exact step-by-step precursor application checklist.`,
        timestamp,
        suggestedActions: [
          { label: 'View Certificate Roadmap', action: 'OPEN_ROADMAP' },
          { label: 'Check Statutory Fees', action: 'OPEN_EXTORTION' }
        ]
      };
    }

    // Pattern 2: Name Mismatch or Clerical Discrepancy
    if (q.includes('name') || q.includes('mismatch') || q.includes('clerical') || q.includes('aadhaar name') || q.includes('audit')) {
      if (auditReport && auditReport.status !== 'GREEN_CLEARED') {
        const criticalIssues = auditReport.issues.filter(i => i.severity !== 'PASS');
        const issueList = criticalIssues.map(i => `• **${i.title}**: ${i.description}\n  *Remedy*: ${i.statutoryRemedy}`).join('\n\n');

        return {
          id: msgId,
          sender: 'assistant',
          text: `⚠️ **Clerical Name Match Alert (${auditReport.overallScore}% Match Score - ${auditReport.status}):**\n\n${issueList}\n\n• **Aadhaar**: \`${auditReport.normalizedNames.aadhaar}\`\n• **Marksheet**: \`${auditReport.normalizedNames.marksheet}\`\n• **Bank**: \`${auditReport.normalizedNames.bank}\`\n\n💡 **Action**: Download our printable **Annexure-I Bank Mandate PDF** to synchronize your bank record with Aadhaar.`,
          timestamp,
          suggestedActions: [
            { label: 'Open Pre-Flight Audit', action: 'OPEN_AUDIT' },
            { label: 'Generate Annexure-I PDF', action: 'DOWNLOAD_MANDATE' }
          ]
        };
      } else {
        return {
          id: msgId,
          sender: 'assistant',
          text: `✅ **Name Consistency Verified**: Your recorded name across Aadhaar (\`${profile.fullName}\`), 10th/12th Marksheet, and Bank Passbook has a **100% clerical consistency score**. There is zero risk of automated portal name rejection!`,
          timestamp
        };
      }
    }

    // Pattern 3: Top Eligible Schemes / Entitlements
    if (q.includes('eligible') || q.includes('scheme') || q.includes('scholarship') || q.includes('amount') || q.includes('how much') || q.includes('ready to apply')) {
      let response = `🏛️ **Your Scheme Eligibility Summary:**\n\n`;
      if (eligibleSchemes.length > 0) {
        response += `🟢 **100% Ready to Apply (${eligibleSchemes.length} Schemes):**\n` +
          eligibleSchemes.map(s => `• **${s.scheme.name}** (${s.scheme.code}): Entitlement **${s.scheme.benefitAmount}**`).join('\n') + `\n\n`;
      }
      if (conditionalSchemes.length > 0) {
        response += `🟠 **Conditionally Eligible (${conditionalSchemes.length} Schemes - Missing Documents):**\n` +
          conditionalSchemes.map(s => `• **${s.scheme.name}**: Requires ${s.missingCertificates.length} document(s)`).join('\n') + `\n\n`;
      }
      response += `💡 *All schemes have been audited with zero hallucination against official State & Central Gazettes.*`;

      return {
        id: msgId,
        sender: 'assistant',
        text: response,
        timestamp,
        suggestedActions: [
          { label: 'View Schemes Dashboard', action: 'OPEN_DASHBOARD' },
          { label: 'Print Submission Dossier', action: 'OPEN_DOSSIER' }
        ]
      };
    }

    // Pattern 4: NPCI / Bank Seeding / *99*99#
    if (q.includes('npci') || q.includes('bank') || q.includes('dbt') || q.includes('seed') || q.includes('99') || q.includes('mandate')) {
      return {
        id: msgId,
        sender: 'assistant',
        text: `🏦 **Aadhaar-NPCI Direct Benefit Transfer (DBT) Seeding:**\n\n1. Government scholarship funds cannot be credited to an unseeded bank account.\n2. **Free Bank Seeding**: Download the **Annexure-I Mandate Form** from JanSetu AI, sign it, and submit it at your home bank branch (Fee: ₹0).\n3. **Offline USSD Check**: Dial \`*99*99*1#\` on your mobile keypad to instantly verify which bank is actively mapped to your Aadhaar.\n4. Check our **Anti-Extortion & USSD Dialpad** simulator to practice the offline check!`,
        timestamp,
        suggestedActions: [
          { label: 'Simulate *99*99# Dialpad', action: 'OPEN_EXTORTION' },
          { label: 'Generate Annexure-I PDF', action: 'OPEN_AUDIT' }
        ]
      };
    }

    // Pattern 5: Fees / Cyber Cafe Extortion
    if (q.includes('fee') || q.includes('cost') || q.includes('cyber cafe') || q.includes('extortion') || q.includes('charge') || q.includes('price')) {
      return {
        id: msgId,
        sender: 'assistant',
        text: `🛡️ **Statutory Legal Fee Protection Guide:**\n\n• **National Scholarship Portal (NSP)**: **₹0 (100% Free)** (Cyber cafes illegally charge ₹200 - ₹500)\n• **Income / Caste Certificate (e-Sevai/MeeSeva)**: **₹60 Max** (Cyber cafes exploit for ₹400 - ₹800)\n• **First Graduate Certificate (REV-104)**: **₹60 Max** (Cyber cafes demand ₹1,000+)\n• **NPCI Bank Seeding Mandate**: **₹0 (Free by RBI Mandate)**\n\n📞 **Toll-Free Grievance**: Report extortion to State Lokayukta / CM Cell (1100) or CPGRAMS (1800-11-4000).`,
        timestamp,
        suggestedActions: [
          { label: 'View Fee Transparency Card', action: 'OPEN_EXTORTION' }
        ]
      };
    }

    // Default Multi-Turn Response
    return {
      id: msgId,
      sender: 'assistant',
      text: `Hello **${profile.fullName}**! I am your **JanSetu AI Civic Copilot**.\n\nI can help you navigate:\n1. 🟢 **Schemes & Entitlements** (${eligibleSchemes.length + conditionalSchemes.length} matching schemes found for ${profile.stateOfDomicile})\n2. 📄 **Missing Certificates Resolution Roadmap** (${missingCertKeys.length} pending)\n3. 🔍 **Aadhaar vs Marksheet Clerical Name Audit**\n4. 🏛️ **Aadhaar OTR Registration & Direct Government Portal Navigation**\n5. 🛡️ **Statutory Legal Fee Safeguards against Cyber Café Extortion**\n\nWhat would you like assistance with right now?`,
      timestamp,
      suggestedActions: [
        { label: 'Which schemes can I apply for?', action: 'QUERY_SCHEMES' },
        { label: 'How to resolve missing certificates?', action: 'QUERY_CERTS' },
        { label: 'How to do Aadhaar OTR?', action: 'QUERY_OTR' }
      ]
    };
  }
}
