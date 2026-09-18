# JanSetu AI (जनसेतु • జనసేతు • ஜனசேது • ജനസേതു)

<p align="center">
  <strong>AI-Powered Government Application Pre-Flight Platform & Sovereign Civic Access Flight Deck</strong>
  <br />
  <em>Zero-Hallucination AWS Cedar Policy Audits • Cross-Document Textract Consistency • 1-Click Statutory Rejection Prevention</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Pre--Flight_Platform-AI_Powered-10B981?style=for-the-badge&logo=shieldcheck&logoColor=white" alt="Pre-Flight Platform" />
  <img src="https://img.shields.io/badge/AWS_Cedar-Deterministic_Policy_Engine-152864?style=for-the-badge" alt="AWS Cedar" />
  <img src="https://img.shields.io/badge/Amazon_Bedrock-Claude_3.5_Sonnet_RAG-7B2CBF?style=for-the-badge" alt="Amazon Bedrock" />
  <img src="https://img.shields.io/badge/Amazon_Textract-Document_AI_Extraction-00A8E8?style=for-the-badge" alt="Amazon Textract" />
  <img src="https://img.shields.io/badge/AWS_Step_Functions-30--Day_RTI_SLA_State_Machine-E63946?style=for-the-badge" alt="AWS Step Functions" />
  <img src="https://img.shields.io/badge/AWS_SAM-LocalStack_Zero_Bill_Execution-2A9D8F?style=for-the-badge" alt="AWS SAM" />
  <img src="https://img.shields.io/badge/Amplify_Hosting-Live_Global_CDN-FF9900?style=for-the-badge" alt="AWS Amplify" />
</p>

---

## 📖 Table of Contents
1. [Overview & Civic Problem Statement](#-overview--civic-problem-statement)
2. [The Core Pre-Flight Platform Workflow](#-the-core-pre-flight-platform-workflow)
3. [Full AWS Technical Architecture](#-full-aws-technical-architecture)
4. [Key Platform Features & Innovations](#-key-platform-features--innovations)
5. [AWS Cedar Deterministic Rules vs LLM Hallucination](#-aws-cedar-deterministic-rules-vs-llm-hallucination)
6. [Supported Central & State Schemes (All 28 States & UTs)](#-supported-central--state-schemes)
7. [Installation & Local Execution Guide (Vite + LocalStack)](#-installation--local-execution-guide)
8. [3-Minute Hackathon Demo Script](#-3-minute-hackathon-demo-script)
9. [Privacy & Security Guarantee](#-privacy--security-guarantee)
10. [Legal Citations & Gazette References](#-legal-citations--gazette-references)

---

## 🎯 Overview & Civic Problem Statement

Over **30% of Indian scholarship and government benefit applications fail silently** at the scrutiny and treasury disbursement stages due to preventable clerical mismatches, missing prerequisite certificates, or inactive NPCI DBT bank bridge mapping. Furthermore, citizens waste ₹500–₹2,000 at predatory cyber cafés for services that are legally free under government service charters.

**JanSetu AI** is an end-to-end **AI-Powered Government Application Pre-Flight Platform** that acts as an intelligent pre-flight check before a citizen submits their application to any government portal (NSP, SSP, MahaDBT, e-Kalyan, TNeGA, MeeSeva).

```
User Profile ➔ Select Scheme ➔ Upload Documents ➔ Analyze ➔ Eligibility Check ➔ Document Consistency Check ➔ Readiness Score (82%) ➔ Problems/Risks ➔ Fix Action Plan ➔ Ready to Apply
```

---

## 🛫 The Core Pre-Flight Platform Workflow

JanSetu AI guides citizens through an 8-stage verification pipeline to ensure 100% acceptance before portal submission:

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│ 1. Profile      │ ──> │ 2. Select       │ ──> │ 3. Upload       │ ──> │ 4. OCR          │
│    Setup        │     │    Scheme       │     │    Documents    │     │    Analysis     │
└─────────────────┘     └─────────────────┘     └─────────────────┘     └─────────────────┘
                                                                                 │
                                                                                 v
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│ 8. Ready to     │ <── │ 7. Fix Action   │ <── │ 6. Readiness    │ <── │ 5. Cross-Doc    │
│    Apply (100%) │     │    Plan         │     │    Score (82%)  │     │    Consistency  │
└─────────────────┘     └─────────────────┘     └─────────────────┘     └─────────────────┘
```

1. **User Profile**: Demographic details, academic level, schooling type, annual family income, category, and masked banking credentials.
2. **Select Scheme**: Choose from Central schemes (e.g., Post-Matric, PM-YASASVI) or 28 State schemes (e.g., Pudhumai Penn, JVD, SSP).
3. **Upload Documents**: Upload certificates (PDF/PNG/JPG) or manage inventory in the Unified Document Vault.
4. **OCR & Key-Value Extraction**: Amazon Textract extracts Names, DOB, Guardian Name, Income Numeric, Certificate Number, Issue & Expiry Dates with confidence metrics.
5. **Deterministic Eligibility Check**: Evaluated with **AWS Cedar** policy engine for caste, income ceiling, and domicile (Zero Hallucination).
6. **Cross-Document Consistency Check**: Multi-field matrix compares exact spellings, initials, DOB, and addresses across Aadhaar, 10th/12th Marks Board, and Bank Passbook.
7. **Application Readiness Score (e.g. 82%)**: 5-part sub-score breakdown with Tri-State Verdict (`READY`, `NOT READY`, `NEEDS HUMAN REVIEW`).
8. **Identified Risks & "Why Am I Not Ready?" Explainer**: Root-cause diagnostic powered by Amazon Bedrock plain-language synthesis grounded in official Gazettes.
9. **"Fix My Application" Action Plan**: 1-click step-by-step remedies with pre-filled RBI Annexure-I NPCI Bank Seeding Mandates and Notary Self-Declaration Affidavits.
10. **Application Dependency Graph**: Visual statutory path (`Aadhaar ➔ Bank Account ➔ NPCI DBT ➔ Certificate ➔ Portal OTR ➔ Treasury Disbursement`).

---

## 🏛️ Full AWS Technical Architecture

```
                                  +-------------------------------------------------------------+
                                  |                    CITIZEN FLIGHT DECK                      |
                                  |   (React 18 + TypeScript + Vite SPA on AWS Amplify CDN)     |
                                  |   - 5 Indian Languages (Hindi, Telugu, Tamil, Malayalam, EN)|
                                  |   - Interactive Pre-Flight Dependency Graph & Vault         |
                                  +------------------------------+------------------------------+
                                                                 |
                                                                 v
                                  +-------------------------------------------------------------+
                                  |                     AMAZON API GATEWAY                      |
                                  |                (REST API with HTTPS & CORS)                 |
                                  +-------+----------------------+----------------------+-------+
                                          |                      |                      |
                    +---------------------+                      |                      +---------------------+
                    |                                            |                                            |
                    v                                            v                                            v
+---------------------------------------+  +---------------------------------------+  +---------------------------------------+
|        AWS CEDAR POLICY ENGINE        |  |            AMAZON BEDROCK             |  |        AMAZON TEXTRACT & POLLY        |
| (Deterministic AST Scheme Evaluation) |  |   (Claude 3.5 Sonnet + Grounded RAG)  |  | (Document Key-Value AI & Indian TTS)  |
| - Zero-Hallucination Policy Rules     |  | - Multilingual Conversational Copilot |  | - Structured Name & Income Extraction |
| - Strict Income Ceiling & Domicile    |  | - Grounded in Official Govt Gazettes  |  | - Neural Indian Speech (Aditi/Kajal)  |
+-------------------+-------------------+  +-------------------+-------------------+  +-------------------+-------------------+
                    |                                          |                                          |
                    +---------------------+                    |                    +---------------------+
                                          |                    |                    |
                                          v                    v                    v
                                  +-------------------------------------------------------------+
                                  |           AWS SERVERLESS CORE (AWS LAMBDA & SAM)            |
                                  |  - PreFlightEngineFunction  - BedrockExplainerFunction      |
                                  |  - ClericalAuditFunction    - TextractOcrFunction           |
                                  |  - MandateGeneratorFunction - RtiEscalationStateMachine     |
                                  +------------------------------+------------------------------+
                                                                 |
                                                                 v
                                  +-------------------------------------------------------------+
                                  |              DATA PERSISTENCE & MESSAGING                   |
                                  +------------------------------+------------------------------+
                                  |  AMAZON DYNAMODB             |  AMAZON S3                   |
                                  |  - JanSetuSchemes Table      |  - Official Gazette Archive  |
                                  |  - JanSetuPreFlightReports   |  - NPCI Mandate Templates    |
                                  |  (Pay-Per-Request Billing)   |  (AES-256 Server Encryption) |
                                  +------------------------------+------------------------------+
                                  |  AWS STEP FUNCTIONS          |  AMAZON SNS / SES            |
                                  |  - 30-Day RTI State Machine  |  - Deadline Alert Reminders  |
                                  |  - Rs 250/day Penalty Timer  |  - WhatsApp & SMS Webhooks   |
                                  +-------------------------------------------------------------+
```

---

## 💎 Key Platform Features & Innovations

### 1. Application Readiness Score (5-Part Sub-Score Breakdown)
- **Overall Score (e.g. 82%)**: Calculated mathematically from 5 weighted pillars:
  - **Scheme Eligibility (30%)**: Deterministic criteria match under AWS Cedar.
  - **Mandatory Documents (25%)**: Percentage of scheme-mandated certificates verified in Vault.
  - **Identity Consistency (20%)**: Multi-field matching score across Aadhaar, Board, and Bank.
  - **Prerequisites (15%)**: Active NPCI DBT bank seeding and portal OTR verification.
  - **Policy Confidence (10%)**: Degree of official Gazette Order verification.
- **Tri-State Verdict**:
  - `READY ✓` (Green): Zero critical blockers.
  - `NOT READY ✗` (Rose): Critical blocker present (e.g., unseeded NPCI bank account).
  - `NEEDS HUMAN REVIEW ?` (Amber): Minor name/initial variance requiring supporting affidavit.

### 2. Interactive Cross-Document Consistency Matrix & Manual Clerical Inspector
- **Dual-Mode Inspection**:
  - **Manual Write-In Mode**: Direct interactive input boxes allowing citizens and kiosk operators to type/edit values manually without uploading files to test clerical variances instantly.
  - **Auto-Scan Mode**: Powered by **Amazon Textract Document AI** to extract structured fields automatically from uploaded files.
- **Dynamic Multi-Document Pair Auditing**:
  - Compare any document baseline against Aadhaar: *10th/12th Marksheet*, *Bank Passbook (NPCI DBT)*, *Income Certificate (REV-101)*, *Community / Caste Certificate (REV-103)*, *Smart Ration Card (NFSA)*, *State Domicile / Nativity*, *First Graduate (REV-104)*, *College Bonafide*, *EWS*, and *UDID Disability*.
- **Intelligent Variance Algorithms**:
  - **Levenshtein Distance Phonetic Matcher**: Identifies minor spelling variances (e.g., `Mahaboob` vs `Mehaboob`, `Shaik` vs `Shaikh`).
  - **Initials & Sequence Permutation Matcher**: Identifies inverted surnames and initial expansions (e.g., `Ali S` vs `Shaik Mahaboob Ali`).
  - **Numeric & Date Normalizer**: Equates statutory values across diverse representations (e.g., `₹1,20,000` vs `120000`, `15/08/2004` vs `15-Aug-2004`).
- **Interactive Sandbox & Testing Tools**:
  - `+ Add Field`: Add custom fields (e.g., Ration Card No, Student ID).
  - `Test 100% Match`: One-click instant match simulation with celebratory confetti.
  - `Test Discrepancy`: One-click simulation of real-world clerical mismatches.
  - `Reset`: One-click restore to baseline profile attributes.

### 3. Deep Multilingual Localization (5 Indian Languages)
- Full native UI translations across **English**, **Telugu (తెలుగు)**, **Hindi (हिन्दी)**, **Tamil (தமிழ்)**, and **Malayalam (മലയാളം)**.
- **Bilingual Ergonomics**: Citizens can type English text into the document input boxes (as names on Indian ID cards are printed in Roman script), while all surrounding instructions, labels, table headers, document options, status notices, and questions render in their chosen regional language.
- Covers the 8-Stage Sovereign Timeline, 5 Breakdown Sub-Bars, Action Modals, and Status Badges.

### 4. Application Dependency Graph
- Interactive visual node graph representing the statutory dependency tree:
  `Aadhaar (UIDAI) ➔ Active Bank Account ➔ NPCI DBT Seeding ➔ State Certificates ➔ Portal OTR ➔ College Scrutiny ➔ State Treasury Disbursement`.
- Interactive blocker inspection with direct 1-click remediation trigger.

### 5. "Why Am I Not Ready?" Diagnostic Explainer
- 4-part root-cause breakdown combining AWS Cedar rules with Amazon Bedrock plain-language explanation.
- Verified Government Gazette citations with G.O. numbers and direct government portal links.
- Official disclaimer if policy sources cannot be independently verified.

### 6. "Fix My Application" 1-Click Action Plan
- Provides 4-box problem diagnostics: *What is Wrong*, *Why It Matters*, *Action to Take*, and *Next Check Step*.
- Direct 1-click generation of printable **RBI / NPCI Annexure-I Bank Application Form (PDF)**.
- Direct 1-click generation of **JanSetu Pre-Flight Remediation Plan (PDF)**.
- Real-time resolution progress tracking with interactive status updates and confetti feedback.

### 7. Unified Document Vault Dashboard
- Live certificate status badges: `Valid ✓`, `Warning ⚠`, `Missing ✗`, `Needs Review ?`.
- Extracted Amazon Textract metadata (Ref No, Issuing Authority, Expiry, OCR Confidence %).
- Filter by status and live search.
- Masked sensitive citizen identifiers (`XXXX-XXXX-4829`).

---

## ⚖️ AWS Cedar Deterministic Rules vs LLM Hallucination

| Dimension | Standard Generative AI (Chatbot) | JanSetu AI with AWS Cedar + Bedrock |
| :--- | :--- | :--- |
| **Eligibility Decision** | Probabilistic token prediction (frequently invents fake income ceilings) | **100% Deterministic Cedar AST Policy Engine** |
| **Source Grounding** | Generic training data memory | **Official State Gazettes & Government Orders (G.O.)** |
| **Document Verification** | None | **Amazon Textract Key-Value Extraction & Expiry Checks** |
| **Banking Seeding** | Mentions generic "link account" | **Pre-filled RBI Annexure-I NPCI DBT Mandate PDF** |
| **Clerical Auditing** | Ignores initial/spelling variations | **Multi-field Cross-Document Levenshtein Variance Matrix** |
| **Citizen Recourse** | None | **Statutory 30-Day RTI Form-A & Section 20 Penalty Generator** |

---

## 🇮🇳 Supported Central & State Schemes

JanSetu AI covers schemes across **all 28 Indian States and Union Territories**, including:

- **Central Schemes**: PM Post-Matric SC/ST/OBC, PM-YASASVI, Central Sector Scholarship (CSSS), Pragati & Saksham (AICTE), Ishan Uday (NER).
- **Tamil Nadu**: Pudhumai Penn, 7.5% Govt School Tuition Waiver, REV-104 First Graduate Certificate.
- **Telangana & Andhra Pradesh**: Jagananna Vidya Deevena (JVD), Vasathi Deevena, TS ePASS Fee Reimbursement, Telangana Ambedkar Overseas Vidya Nidhi.
- **Karnataka**: State Scholarship Portal (SSP) Post-Matric, Vidyasiri, Raitha Vidya Nidhi.
- **Maharashtra**: MahaDBT Rajarshi Chhatrapati Shahu Maharaj Shikshan Shulkh Shishyavrutti, Post-Matric SC/VJNT.
- **Uttar Pradesh, Bihar, West Bengal, Kerala, Rajasthan, and more**.

---

## 💻 Installation & Local Execution Guide

### Prerequisites
- Node.js 18+ and npm
- Python 3.10+ (for backend engine testing)
- Optional: AWS CLI or LocalStack for local serverless emulation

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/mahaboobali1212/JanSetu-AI.git
cd JanSetu-AI
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build Production Bundle
```bash
npm run build
```

---

## 🎬 3-Minute Hackathon Demo Script

1. **Step 1: Citizen Onboarding (0:00 - 0:45)**
   - Open JanSetu AI. Select a persona (e.g. *Priya Sundaram*, MBC Category, Tamil Nadu).
   - Switch language to **Tamil** or **Hindi** to show 5-language multilingual audio reader.
2. **Step 2: Pre-Flight Audit Launch (0:45 - 1:30)**
   - Click **"Launch Pre-Flight Application Flight Deck"**.
   - Show the **82% Application Readiness Score** and the 5 breakdown sub-bars.
   - Show the **Tri-State Verdict** (`NEEDS HUMAN REVIEW`).
3. **Step 3: Cross-Document Consistency Matrix (1:30 - 2:00)**
   - Show how Textract OCR identified that the bank passbook has initials (`Priya S`) while Aadhaar has full name (`Priya Sundaram`).
   - Click **"Why Am I Not Ready?"** to reveal the Amazon Bedrock plain-language explanation and official Gazette citation.
4. **Step 4: 1-Click Action Remediation (2:00 - 2:45)**
   - Click **"Fix My Application"**.
   - Click **"Download RBI Annexure-I Bank Form (PDF)"** to download the pre-filled NPCI mandate.
   - Click **"Download Action Plan (PDF)"** to generate the step-by-step statutory checklist.
5. **Step 5: Dependency Graph & Document Vault (2:45 - 3:00)**
   - Switch tabs to the interactive **Application Dependency Graph** and **Unified Document Vault**.
   - Conclude with the **Zero-Hallucination AWS Cedar Architecture**.

---

## 🔒 Privacy & Security Guarantee

- **Zero PII Exposure**: Aadhaar numbers are permanently masked to `XXXX-XXXX-1234`.
- **Client-Side First**: OCR preview and initial consistency checks execute in browser memory.
- **AWS Serverless Encryption**: All transit data is protected under TLS 1.3 with AES-256 server-side encryption on Amazon S3 and DynamoDB.
- **Zero Hallucination Clause**: If official gazette rules cannot be verified from government portals, the engine marks the clause as "Needs Review" rather than inventing eligibility.

---

## ⚖️ Legal Citations & Gazette References

- **Unique Identification Authority of India (UIDAI)**: The Aadhaar (Targeted Delivery of Financial and Other Subsidies, Benefits and Services) Act, 2016.
- **National Payments Corporation of India (NPCI)**: APBS Circular No. 2021/DBT/048 on Aadhaar Payment Bridge System.
- **Right to Information Act, 2005**: Section 4(1)(b) Proactive Disclosure & Section 20(1) Statutory Penalties.
- **State Right to Services Acts**: Statutory SLA mandates across Tamil Nadu, Telangana, Karnataka, and Maharashtra.

---

<p align="center">
  <strong>Built with ❤️ for 1.4 Billion Indian Citizens • JanSetu AI</strong>
</p>

## 🗺️ The 6 Dedicated Citizen Workflow Stages

JanSetu AI features a streamlined, clutter-free navigation ribbon dividing the citizen journey into 6 dedicated stages:

```
+----------------------------------------------------------------------------------------------------------+
|  1. PROFILE      2. INVENTORY     3. SCHEMES        4. CLERICAL AUDIT   5. RTI & GRIEVANCE  6. ANTI-EXTORTION |
|  Caste/Quotas -> Smart Scanner -> Cedar Deadlines -> Soundex Mismatch -> 30-Day RTS SLA -> CSC Rate Defense |
+----------------------------------------------------------------------------------------------------------+
```

### 1. Citizen Profile & State Sub-Caste Engine (`/login`)
* **All 28 States & UTs Coverage**: Tailored state categories (BC-A/B/C/D/E in Telangana/AP, Cat 1/2A/2B/3A/3B in Karnataka, MBC/DNC in Tamil Nadu, VJ/NT in Maharashtra, EZ/MU in Kerala).
* **Convenor Quotas**: Direct evaluation for state entrance admission bodies (TG/AP EAPCET, TNEA, KCET, MHT-CET) with **100% Tuition Fee Reimbursement**.
* **Special Sub-Quotas**: Tamil Nadu 7.5% Government School Quota, First Graduate Waiver, Single Girl Child, Minority, and Specially-Abled categories.

### 2. Smart Certificate Inventory & Amazon Textract Scanner (`/inventory`)
* **Document Readiness Meter**: Real-time progress percentage based on statutory prerequisites.
* **Optional AI Document Scanner**: Powered by **Amazon Textract Document AI** to extract key-value fields (Name, Income, Certificate Number, Issuing Authority) and check seal/signature authenticity.
* **Step-by-Step Resolution Roadmaps**: Exact issuing authority, designated officer, supporting documents, and statutory turnaround time for obtaining missing certificates.

### 3. Qualified Schemes, AWS Cedar Rules, Deadlines & Stacking (`/dashboard`)
* **AWS Cedar Policy Inspector**: Direct AST rule viewer on scheme cards showing formal boolean policy proofs.
* **Live Deadline Tracker**: Dynamic countdown badges, Google Calendar one-click synchronization, and WhatsApp deadline alerts.
* **Eligible-Only Multi-Scheme Stacking Comparator**: Restricted strictly to schemes the student qualifies for, evaluating dual-benefit concurrent eligibility (e.g., Central Maintenance Allowance + State 100% Tuition Fee Reimbursement).

### 4. Pre-Flight Clerical Discrepancy & NPCI DBT Bank Audit (`/audit`)
* **Soundex & Levenshtein Phonetic Name Matcher**: Detects initials expansions and spelling mismatches across Aadhaar, 10th/12th Marksheets, and Bank Passbooks.
* **NPCI Aadhaar Payment Bridge Seeding Verifier**: Verifies if the bank account has active DBT mapping.
* **Printable Legal Remedies**: Instantly generates official **RBI/NPCI Annexure-I Bank Mandate Seeding Forms** and **Notarized Identity Self-Declaration Affidavits**.

### 5. 1-Click Citizen Grievance & Statutory RTI Generator (`/grievance`)
* **State Right to Services (RTS) Acts**: Grounded in official state public service guarantee legislation (Telangana Prajavani, Andhra Pradesh Spandana 1902, Tamil Nadu CM Cell 1100, Karnataka Sakala, Uttar Pradesh Jansunwai 1076, Maharashtra Aaple Sarkar).
* **Automated Delay & Penalty Calculator**: Computes exact overdue days and statutory officer penalties (**₹250/day up to ₹25,000 under Section 20**).
* **1-Click Formats**: Ready-to-print **Citizen Charter Default Notices**, **RTI 2005 Form-A Applications**, and **CM Helpline Telephonic Scripts**.
* **AWS Step Functions SLA Pipeline**: Visualizes the 30-day statutory timeline (Day 0 Filing -> Day 15 Intermediate Notice -> Day 30 First Appellate Escalation).

### 6. Anti-Extortion CSC Defense & Offline USSD Dialpad (`/anti-extortion`)
* **Statutory Rate Cards**: Displays legal government fees (₹0 for Central NSP, ₹60 max for State CSC MeeSeva/e-Sevai) versus unauthorized cyber café overcharging.
* **National Anti-Corruption Toll-Free Directory**: Direct access to 1905, 1064, and State Vigilance helplines.
* **Interactive `*99*99#` USSD Dialpad Simulator**: Allows citizens without internet access to simulate verifying NPCI bank mandate status via GSM phone codes.

---

## ⚡ Key Functionalities & Differentiators

| Feature | JanSetu AI Implementation | Technical Advantage |
| :--- | :--- | :--- |
| **Policy Engine** | AWS Cedar Declarative AST (`cedar/policies/`) | 100% Deterministic, mathematically provable, zero hallucination |
| **Conversational AI** | Amazon Bedrock (Claude 3.5 Sonnet) | Grounded in official Central/State Gazettes via RAG |
| **Document OCR** | Amazon Textract (Forms & Tables API) | Extracts structured key-value data with confidence metrics |
| **Voice Accessibility** | Amazon Polly Neural TTS (Aditi & Kajal) | Native audio reader across 5 Indian languages |
| **SLA Escalation** | AWS Step Functions State Machine | 30-day statutory timer with Section 20 RTI penalty trigger |
| **Serverless Backend** | AWS SAM & LocalStack | 100% free local execution with zero cloud billing for testing |
| **Hosting & CI/CD** | AWS Amplify (`amplify.yml`) | Global CDN edge caching with instant cache invalidation |
| **Printable Dossier** | PDF Action Plan & Statutory Dossier | QR-verified comprehensive physical dossier for CSC submission |

---

## 🛡️ AWS Cedar Deterministic Rules vs LLM Hallucination

In public governance and civic access, allowing an ungrounded LLM to decide a student's eligibility is dangerous. If an AI hallucinates an income ceiling or misinterprets an educational stage, an eligible underprivileged student is wrongly denied financial aid.

In **JanSetu AI**, policy decisions are decoupled from conversational generation:

```cedar
// Post-Matric Scholarship for ST Students (Ministry of Tribal Affairs)
permit(
    principal,
    action == Action::"ApplyScheme",
    resource == Scheme::"PostMatric_ST"
)
when {
    principal.category == "ST" &&
    principal.annualFamilyIncome <= 250000 &&
    (principal.educationLevel in ["11th", "12th", "UG", "PG", "PhD", "Diploma", "Professional"])
};
```

* **AWS Cedar** executes deterministic boolean AST logic in < 1 millisecond.
* **Amazon Bedrock** provides empathetic, vernacular conversational explanations and step-by-step guidance.

---

## 📚 Supported Central & State Schemes

* **Central Government / National Scholarship Portal (NSP)**:
  * Post-Matric Scholarship for Scheduled Tribe (ST) Students (Ministry of Tribal Affairs)
  * Pre-Matric Scholarship for ST Students (Classes IX & X)
  * National Fellowship and Scholarship for Higher Education of ST Students (MPhil / PhD)
  * Top Class Education Scheme for ST Students (UG / PG)
  * Post-Matric Scholarship for Scheduled Caste (SC) Students (Ministry of Social Justice)
  * PM YASASVI Post-Matric Scholarship for OBC, EBC & DNT Students
  * Begum Hazrat Mahal National Scholarship for Meritorious Minority Girls
  * AICTE Pragati Scholarship for Girls in Technical Education (₹50,000/yr)
  * Central Sector Scheme of Scholarships for College and University Students (Merit-cum-Means)
* **State Government Entitlements & Fee Waivers**:
  * Telangana / Andhra Pradesh Post-Matric RTF & MTF (100% Tuition Fee Reimbursement via EAPCET)
  * Tamil Nadu Moovalur Ramamirtham Ammaiyar Pudhumai Penn Scheme (₹1,000/month)
  * Tamil Nadu 7.5% Preferential Government School Professional Course Quota
  * Tamil Nadu First Graduate Tuition Fee Concession (REV-104)
  * Karnataka Post-Matric SSP (State Scholarship Portal) Fee Concessions
  * Maharashtra MahaDBT Post-Matric Scholarship & Rajarshi Shahu Maharaj Tuition Fee Waiver

---

## 💻 Installation & Local Execution Guide

### Prerequisites
* **Node.js**: v18.0.0 or higher
* **npm**: v9.0.0 or higher
* **AWS SAM CLI** (Optional, for serverless local testing)
* **Docker / LocalStack** (Optional, for local AWS emulation)

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/mahaboobali1212/JanSetu-AI.git
cd JanSetu-AI
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
```

### 4. Run Serverless Backend with AWS SAM & LocalStack (Free / Zero Cloud Bill)
```bash
# 1. Validate SAM infrastructure template
sam validate --lint

# 2. Run entire serverless stack locally with LocalStack
sam local start-api --port 3001

# 3. Deploy to AWS Cloud Production
sam build
sam deploy --guided
```

---

## 📁 Project Directory Structure

```
JanSetu-AI/
├── amplify.yml                               # AWS Amplify CI/CD hosting pipeline
├── template.yaml                             # AWS SAM Infrastructure-as-Code (Lambda, DynamoDB, S3, SNS, Step Functions)
├── cedar/                                    # AWS Cedar Policy Engine
│   ├── schema.json                           # Cedar entity and action schema definitions
│   └── policies/
│       ├── scholarships.cedar                # Deterministic central & state scholarship rules
│       └── certificates.cedar                # Statutory citizen certificate issuance rules
├── src/
│   ├── App.tsx                               # Core navigation controller & modal orchestrator
│   ├── components/                           # High-fidelity luxury UI components
│   │   ├── Header.tsx                        # Sovereign header, audio reader, AWS stack button
│   │   ├── Footer.tsx                        # Official statutory citations & directory links
│   │   ├── AwsArchitectureModal.tsx          # Interactive AWS Cloud Architecture Flight Deck
│   │   ├── CedarPolicyInspectorModal.tsx     # Live Cedar Policy AST rule inspector
│   │   ├── DocumentScannerModal.tsx          # Smart Scanner with Amazon Textract Document AI
│   │   ├── AiCopilotDrawer.tsx               # Amazon Bedrock (Claude 3.5) conversational drawer
│   │   ├── ApplicationDossierModal.tsx       # 1-Click Printable Statutory Citizen Dossier
│   │   └── PortalNavigatorModal.tsx          # Step-by-step portal application guide
│   ├── pages/                                # The 6 Dedicated Citizen Pages
│   │   ├── LoginPage.tsx                     # Stage 1: Citizen Profile & Demographics Setup
│   │   ├── InventoryPage.tsx                 # Stage 2: Certificate Inventory Audit & Readiness Gauge
│   │   ├── DashboardPage.tsx                 # Stage 3: Calculated Schemes & Entitlement Dashboard
│   │   ├── PreFlightAuditPage.tsx            # Stage 4: Pre-Flight Clerical Matcher & PDF Mandate
│   │   ├── GrievanceEscalationPage.tsx       # Stage 5: Statutory Right to Services & RTI Generator
│   │   ├── AntiExtortionPage.tsx             # Stage 6: Anti-Extortion Hub & *99*99# USSD Dialpad
│   │   ├── CertificateRoadmapPage.tsx        # Missing Certificate Resolution Roadmap
│   │   ├── SchemeCockpitPage.tsx             # Deep-dive scheme overview
│   │   ├── SchemeComparePage.tsx             # Dual-scheme comparison
│   │   └── DeadlineTrackerPage.tsx           # National calendar & portal alerts
│   ├── data/                                 # Statutory data sources
│   │   ├── schemes.ts                        # Master scholarship definitions & gazette clauses
│   │   ├── certificates.ts                   # Master certificate definitions & issuing bodies
│   │   ├── certificateGuides.ts              # State-specific resolution guides
│   │   ├── grievanceActs.ts                  # State Right to Services Acts & SLA rules
│   │   └── translations.ts                   # 5 Indian language translations
│   ├── engine/                               # Zero-hallucination computation engines
│   │   ├── eligibilityEngine.ts              # Mathematical scheme rule evaluator
│   │   ├── clericalAudit.ts                  # Soundex & Levenshtein name matcher
│   │   ├── copilotEngine.ts                  # Context-aware civic RAG assistant
│   │   ├── actionPlanPdfGenerator.ts         # Printable PDF report generator
│   │   └── speechAssistant.ts                # Multilingual speech synthesis
│   └── types/                                # TypeScript type definitions
└── public/                                   # Static assets, gazette PDFs, and emblems
```

---

## 🔒 Privacy & Security Guarantee

* **Zero Full-Aadhaar Ingestion**: JanSetu AI processes only the last 4 digits of Aadhaar (`XXXX - XXXX - 1234`) in compliance with UIDAI regulations.
* **Client-Side Processing**: Pre-flight clerical discrepancy auditing and document scanning run in the client browser.
* **Cryptographic Cedar Proofs**: Policy evaluations do not expose citizen PII to third-party models.

---

## ⚖️ Legal Citations & Gazette References

1. **Right to Information Act, 2005**: Section 6(1) (Application for Information) and Section 20(1) (Penalties for Malafide Delay up to ₹25,000).
2. **Telangana Right to Public Services Act (2020) & Prajavani Guidelines**.
3. **Andhra Pradesh Right to Public Services Act (2018) & Spandana 1902 Directives**.
4. **Tamil Nadu Right to Services Act (2020) & G.O. Ms No. 58 (BC/MBC Welfare)**.
5. **Karnataka Guarantee of Services to Citizens Act, 2011 (Sakala Act)**.
6. **Ministry of Social Justice & Empowerment Notification No. 11014/01/2021-SCD-V**.
7. **Ministry of Tribal Affairs Post-Matric Guidelines No. 11017/01/2022-Scholarship**.
8. **National Payments Corporation of India (NPCI) Circular No. 2021/DBT/048 on Aadhaar Payment Bridge System (APBS)**.

---

<p align="center">
  <strong>JanSetu AI • Bharat Builds Tour • WeMakeDevs × AWS First Commit</strong>
  <br />
  <em>Empowering Indian Citizens through Open Source & Cloud Innovation.</em>
</p>
