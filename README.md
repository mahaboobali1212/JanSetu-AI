# JanSetu AI (जनसेतु • జనసేతు • ஜனசேது • ജനസേതു)

<p align="center">
  <strong>National Civic Access Flight Deck & Deterministic Pre-Flight Audit System for Indian Central & State Scholarships</strong>
  <br />
  <em>Democratizing Government Entitlements • Eliminating Cyber Café Extortion • Zero-Hallucination AWS Cedar Policy Audits</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/AWS_First_Commit-Architecture_Compliant-FF9900?style=for-the-badge&logo=amazon-aws&logoColor=white" alt="AWS First Commit" />
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
2. [Full AWS Technical Architecture](#-full-aws-technical-architecture)
3. [The 6 Dedicated Citizen Workflow Stages](#-the-6-dedicated-citizen-workflow-stages)
4. [Key Functionalities & Differentiators](#-key-functionalities--differentiators)
5. [AWS Cedar Deterministic Rules vs LLM Hallucination](#-aws-cedar-deterministic-rules-vs-llm-hallucination)
6. [Supported Central & State Schemes (All 28 States & UTs)](#-supported-central--state-schemes)
7. [Installation & Local Execution Guide (Vite + LocalStack)](#-installation--local-execution-guide)
8. [Project Directory Structure](#-project-directory-structure)
9. [Privacy & Security Guarantee](#-privacy--security-guarantee)
10. [Legal Citations & Gazette References](#-legal-citations--gazette-references)

---

## 🎯 Overview & Civic Problem Statement

Every year, millions of eligible Indian students miss out on scholarships worth over **₹10,000+ Crores** or fall victim to commercial cyber café extortion (paying ₹500–₹2,000 for free government services) due to:
1. **Clerical Name Mismatches**: Rejections caused by simple format differences (e.g., `R. Suresh` vs. `Suresh Radhakrishnan`) between Aadhaar, 10th/12th Marksheets, and Bank Passbooks.
2. **Mandatory Aadhaar-NPCI DBT Disconnects**: Funds failing to credit because the bank account is not mapped to the NPCI Aadhaar payment bridge (Annexure-I).
3. **Complex State Certificate Hierarchies**: Students not knowing issuing authorities, precursor requirements, statutory SLAs, or legal maximum fees.
4. **LLM Hallucinations in Public Governance**: Generative AI models inventing non-existent income ceilings or fake rules.
5. **Administrative Delays**: Lack of awareness regarding state **Right to Services (RTS) Acts** and statutory **Section 20 RTI penalty provisions (₹250/day)** against non-compliant officials.

**JanSetu AI** solves this by uniting **AWS open-source tools (AWS Cedar, AWS SAM, LocalStack)** and **AWS Cloud services (Amazon Bedrock, Amazon Textract, Amazon Polly, AWS Step Functions, Amazon DynamoDB, Amazon S3, AWS Amplify)** with a pre-flight civic flight deck tailored to all 28 Indian States and Union Territories.

---

## 🏛️ Full AWS Technical Architecture

```
                                  +-------------------------------------------------------------+
                                  |                    CITIZEN USER INTERFACE                   |
                                  |   (React 18 + Vite SPA hosted globally on AWS Amplify)     |
                                  |   - Multilingual Voice (Hindi, Telugu, Tamil, Malayalam)    |
                                  |   - Smart Document Scanner with Client-Side Pre-Flight OCR  |
                                  +------------------------------+------------------------------+
                                                                 |
                                                                 v
                                  +-------------------------------------------------------------+
                                  |                     AMAZON API GATEWAY                      |
                                  |                (REST API with CORS & HTTPS)                 |
                                  +-------+----------------------+----------------------+-------+
                                          |                      |                      |
                    +---------------------+                      |                      +---------------------+
                    |                                            |                                            |
                    v                                            v                                            v
+---------------------------------------+  +---------------------------------------+  +---------------------------------------+
|        AWS CEDAR POLICY ENGINE        |  |            AMAZON BEDROCK             |  |        AMAZON TEXTRACT & POLLY        |
| (Deterministic AST Scheme Evaluation) |  |   (Claude 3.5 Sonnet + Knowledge Base)|  | (Document Key-Value AI & Indian TTS)  |
| - Zero-Hallucination Policy Rules     |  | - Multilingual Conversational Copilot |  | - Structured Name & Income Extraction |
| - Formal verification of Income/Caste |  | - Grounded in Official Govt Gazettes  |  | - Neural Indian Speech (Aditi/Kajal)  |
+-------------------+-------------------+  +-------------------+-------------------+  +-------------------+-------------------+
                    |                                          |                                          |
                    +---------------------+                    |                    +---------------------+
                                          |                    |                    |
                                          v                    v                    v
                                  +-------------------------------------------------------------+
                                  |           AWS SERVERLESS CORE (AWS LAMBDA & SAM)            |
                                  |  - EvaluateFunction   - BedrockChatFunction                 |
                                  |  - AuditFunction      - TextractOcrFunction                 |
                                  |  - PollyVoiceFunction - RtiEscalationStateMachine           |
                                  +------------------------------+------------------------------+
                                                                 |
                                                                 v
                                  +-------------------------------------------------------------+
                                  |              DATA PERSISTENCE & MESSAGING                   |
                                  +------------------------------+------------------------------+
                                  |  AMAZON DYNAMODB             |  AMAZON S3                   |
                                  |  - JanSetuSchemes Table      |  - Official Gazette Archive  |
                                  |  - JanSetuDossiers Table     |  - NPCI Mandate Annexure I   |
                                  |  (Single-Table Pay-Per-Req)  |  (AES-256 Server Encryption) |
                                  +------------------------------+------------------------------+
                                  |  AWS STEP FUNCTIONS          |  AMAZON SNS / SES            |
                                  |  - 30-Day RTI State Machine  |  - Citizen Deadline Alerts   |
                                  |  - Rs 250/day Penalty Timer  |  - Push & SMS Notifications  |
                                  +-------------------------------------------------------------+
```

---

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
