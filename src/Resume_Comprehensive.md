---
title: Salesforce Platform Architect
---

_Extended Technical Portfolio. This profile represents a comprehensive technical and architectural record, including experimental projects and evolving platform initiatives. This document is intentionally detailed. It is designed to demonstrate how architectural decisions are made, not just what technologies are used._

## Professional Identity

Salesforce Platform Architect with nearly a decade on the platform, focused on higher education. At TELUS Digital, leads Education Cloud implementations from recruitment and admissions through student success, spanning OmniStudio application flows, Experience Cloud portals, SIS integration, and security and sharing design. Previously ran Service Cloud for 400+ staff and Experience Cloud for 10,000+ external users at Creighton University, led DevOps and CI/CD across two orgs, and designed applications supporting multimillion-dollar fund management.

Focuses on architecture-first delivery, governance-driven DevOps, and sustainable platform operating models that balance developer velocity with system integrity.

---

## Architectural Scope of Work

- Multi-org Salesforce platform architecture
- Platform governance and standards definition
- DevOps and CI/CD architecture for Salesforce ecosystems
- Integration and API architecture across SaaS and cloud services
- Organizational domain modeling and platform segmentation
- Technical leadership and platform enablement

---

## Core Technical Capabilities

### Salesforce Platform

- Apex, LWC, Flow, Experience Cloud (LWR), Service Cloud, Data Cloud, Marketing Cloud, Agentforce
- Multi-org architecture and metadata governance
- Security architecture and least-privilege access models
- Data lifecycle and platform governance

### DevOps & Platform Engineering

- GitHub Actions, SFDX CLI, JWT authentication
- CI/CD orchestration, automated validation, quality gates
- Branching strategies and release management
- Governance-first deployment models

### Systems Architecture, Languages & Data

- REST APIs, OpenAPI 3.0, event-driven patterns
- JavaScript, TypeScript, SQL, HTML/CSS
- Go, Python, YAML
- Docker containerization

---

## Platform Architecture Diagrams

The following diagrams illustrate multi-org architecture, platform portfolios, and automated resume generation pipelines. Each diagram is provided as a separate `.mermaid` file for clarity and maintainability.

### University Salesforce Multi‐Org Platform Architecture

```mermaid
flowchart LR
    %% ========= BRAND STYLES =========
    classDef studentOrg fill:#00A1E0,stroke:#005FB2,stroke-width:2px,color:#ffffff,font-weight:bold;
    classDef advancementOrg fill:#8E24AA,stroke:#4A148C,stroke-width:2px,color:#ffffff,font-weight:bold;
    classDef devops fill:#424242,stroke:#000000,stroke-width:2px,color:#ffffff,font-weight:bold;
    classDef users fill:#24292E,stroke:#000000,stroke-width:2px,color:#ffffff,font-weight:bold;

    subgraph OrgA["Salesforce Org A - Student Success Domain"]
        EDA[EDA / Student Systems]
        INTRANET[Custom Intranet Applications]
    end

    subgraph OrgB["Salesforce Org B - Advancement Domain"]
        DONOR[Donor Relations]
        FUNDRAISING[Advancement Systems]
    end

    subgraph DevOps["DevOps Control Layer"]
        GIT[GitHub]
        CI[GitHub Actions CI/CD]
        GOV[Governance Rules & Validation Gates]
    end

    USERS[Support Teams & Developers]

    USERS --> GIT
    GIT --> CI
    CI --> GOV
    GOV --> OrgA
    GOV --> OrgB

    %% ========= APPLY STYLES =========
    class EDA,INTRANET studentOrg;
    class DONOR,FUNDRAISING advancementOrg;
    class GIT,CI,GOV devops;
    class USERS users;
```

### Salesforce Platform Architect Portfolio Architecture

```mermaid
graph LR
    %%{init: {'flowchart': {'nodeSpacing': 50, 'rankSpacing': 50}}}%%
    %% ========= BRAND STYLES =========
    classDef user fill:#424242,stroke:#000000,stroke-width:2px,color:#ffffff,font-weight:bold;
    classDef sfdc fill:#00A1E0,stroke:#005FB2,stroke-width:2px,color:#ffffff,font-weight:bold;
    classDef jira fill:#0052CC,stroke:#003A8F,stroke-width:2px,color:#ffffff,font-weight:bold;
    classDef github fill:#24292E,stroke:#000000,stroke-width:2px,color:#ffffff,font-weight:bold;
    classDef data fill:#8E24AA,stroke:#4A148C,stroke-width:2px,color:#ffffff,font-weight:bold;

    %% ========= NODES =========
    User((User))
    LWR[Experience Cloud<br/>LWR]
    GQL[Salesforce<br/>GraphQL]
    Apex[Apex Runtime<br/>with the Local Template]
    DB[(Custom Objects)]
    AI[Gemini API]
    Jira[Jira Cloud API]
    GitHub[GitHub API]

    %% ========= FLOWS =========
    User --> LWR
    LWR --> GQL
    GQL --> DB
    LWR --> Apex
    Apex <--> AI
    Apex --> Jira
    Apex --> GitHub

    %% ========= APPLY STYLES =========
    class User user;
    class LWR,GQL,Apex,AI sfdc;
    class DB data;
    class Jira jira;
    class GitHub github;

    %% ========= CRITICAL PATH =========
    linkStyle 0,1,2 stroke:#2ECC71,stroke-width:3px;
```

### Resume as Code Architecture

```mermaid
flowchart LR
    %% ========= STYLES =========
    classDef source fill:#00A1E0,stroke:#005FB2,stroke-width:2px,color:#ffffff,font-weight:bold;
    classDef engine fill:#2ECC71,stroke:#27AE60,stroke-width:2px,color:#ffffff,font-weight:bold;
    classDef secure fill:#FB8C00,stroke:#E65100,stroke-width:2px,color:#ffffff,font-weight:bold;
    classDef artifact fill:#8E24AA,stroke:#4A148C,stroke-width:2px,color:#ffffff,font-weight:bold;

    subgraph Inputs ["Source Control"]
        direction TB
        MD["Source Markdown<br/>(No PII / Redacted)"]
        Config["resume.config.json"]
    end

    subgraph Security ["Security Layer"]
        Secrets[("GitHub Secrets<br/>(Phone, Email)")]
    end

    subgraph Build ["Governance Engine"]
        Assemble["assemble.js<br/>(Inject 'Golden Header' & PII)"]
        Pandoc["Pandoc / XeLaTeX<br/>(PDF Compilation)"]
    end

    subgraph Output ["Artifacts"]
        direction TB
        PDF["Release Artifact<br/>(Enriched with PII)"]
        Safe["Safe Mode MD<br/>(Public Web View)"]
    end

    %% ========= FLOWS =========
    MD --> Assemble
    Config --> Assemble
    Secrets -.->|Runtime Injection| Assemble

    Assemble --> Pandoc
    Pandoc --> PDF
    Assemble -->|Redacted| Safe

    %% ========= APPLY STYLES =========
    class MD,Config source;
    class Secrets secure;
    class Assemble,Pandoc engine;
    class PDF,Safe artifact;
```

## Professional Experience

### Senior Solution Consultant

**TELUS Digital | Apr 2026 – Present**

- Delivers implementation and optimization of Salesforce solutions for higher education institutions across the student lifecycle.
- Guides discovery, architecture, and implementation for Education Cloud engagements, with a focus on admissions and student success.
- Brings a practitioner perspective built across nearly a decade of hands-on Salesforce experience at higher education institutions, including administration, development, architecture, and platform rollout.

---

### Salesforce Application Architect (Independent Consultant)

**Oct 2021 – Present**

- Designed Salesforce platforms for nonprofit and higher education organizations.
- Built grant and workforce systems supporting government-funded programs and compliance-driven workflows.
- Led architecture assessments and proofs of concept.
- Delivered custom Salesforce applications managing full lifecycle from requirements to production.
- Defined platform standards for security, data modeling, automation, and deployment practices.

**Key Project — Metropolitan Community College Career Skills Application:**

- Architected and developed a custom workforce development application using Contacts as Students.
- Designed and implemented custom objects: Employments, Training Programs, Training Courses, Tuition Assistance, Certifications, Supportive Programs, Supportive Services, Training Course Members, and Funding.
- Created Flow automations and Apex triggers with handler patterns to meet complex business requirements.
- Managed complete application lifecycle from planning through implementation and ongoing enhancements.

---

### CRM Developer / Technical Leadership Responsibilities

**Creighton University | Aug 2025 – Apr 2026**

_Official title: CRM Developer_  
_Functional role: Platform architecture and DevOps leadership_

- Architected DevOps capabilities supporting two Salesforce orgs with distinct organizational domains:
  - Student success, EDA, and internal digital platforms
  - Advancement and donor relations systems
- Designed governance-driven DevOps models for multiple teams with different release cadences and priorities.
- Engineered CI/CD pipelines using GitHub Actions, SFDX CLI, JWT authentication, LWC/Jest testing, and automated validation gates.
- Defined architectural standards for Apex, LWC, asynchronous processing, and integration design.
- Designed comprehensive training plan for two new CRM Developers including Trailhead, Udemy, and curated certification paths.
- Trained team members on ETL processes and Salesforce architecture dependencies.
- Prepared for the MuleSoft transition from Talend, completing DEX-401 training.
- Acted as Salesforce technical lead for complex development beyond declarative capabilities.
- Advised IT and interdepartmental leadership on Salesforce-focused projects, incidents, and enhancements.

_Note: The DevOps model was in its first phase at the time of transition, not yet fully mature at enterprise scale._

---

### Application Administrator

**Creighton University | Jun 2021 – Aug 2025**

**Salesforce CRM and Marketing Cloud:**

- Administered Service Cloud for 400+ internal users and Experience Cloud for 10,000+ external users.
- Implemented Flow automations and developed custom Apex solutions to improve operations.
- Supported Service Cloud for Financial Aid, Registrar, and Student Accounts using email-to-case.
- Worked with Salesforce EDA and Student Success Hub to enhance student engagement.
- Managed Marketing Cloud including synchronized data sources, SQL, AMPscript, and customer journeys.

**System Administration and Integrations:**

- Administered Talend runtime and remote engines, leading upgrade to Talend 8.0 and overseeing Change Data Capture operations.
- Integrated GatherContent with Salesforce Experience Cloud to streamline content workflows.
- Managed Ellucian Advance and SFTP operations for secure file transfers.

**Data Analytics and Reporting:**

- Developed and maintained SSRS reports for institutional stakeholders.
- Administered Power BI, managing user access, real-time dashboards, and troubleshooting.
- Automated processes using Power Automate, including SSL renewals and SFTP communications.

**Other Responsibilities:**

- Provided admin support for Team Dynamix, Tableau, and RabbitMQ.
- Collaborated with teams to design scalable, cross-platform solutions.
- Used Jira for project tracking and management of system upgrades and custom developments.
- Created documentation and delivered training to ensure adoption of new tools and processes.

---

### CAET Services Specialist II

**Metropolitan Community College | Jul 2017 – Jun 2021**

- Implemented Salesforce CRM from greenfield into active working environment, responsible for setup, development, and training.
- Served as Salesforce administrator, developer, and trainer for workforce and continuing education programs.
- Managed operations of the Center for Advanced and Emerging Technology.
- Administered Canvas LMS and Catalog by Instructure, supporting creation of non-credit courses and providing content development and maintenance.
- Served as Content Manager for Workforce Innovation Division website utilizing HTML5, CSS3, jQuery, and JavaScript.
- Developed automation workflows using Microsoft Forms, Teams, Outlook, Planner, and Power Automate, including creating an effective CARES scholarship intake system.
- Created ticket-based support system to streamline support services, increasing transparency, accountability, and communication.
- Served as Workforce Innovation Division Cost Center Delegate for all purchases via purchase card or requisition.
- Provided technical support to troubleshoot and maintain technology in the Center for Advanced and Emerging Technology.

---

### Non-Credit Instructor

**Metropolitan Community College | Dec 2017 – Jun 2021**

- Created and delivered non-credit curriculum focused on Prototype Design and Industrial Manufacturing.
- Instructed students in curriculum developed by Workforce Innovation Division and self-developed content.
- Developed safe and competent practices for students.

---

### IT Project Assistant

**Metropolitan Community College | Jan 2017 – Jul 2017**

- Assisted in all facets of prototyping: concept development, design, and fabrication.
- Provided troubleshooting for Fabrication Laboratory machines and equipment.
- Taught students, faculty, and clientele operation procedures for machine use.
- Facilitated regular tours for individuals and groups interested in the fabrication process.

---

### Earlier Career

- **First Data Corporation (now Fiserv)**, POS Technician (Jan 2016 – Oct 2016)
- **Max Pest Control**, IT/Network/Social Media Consultant (Oct 2014 – Mar 2016)
- **Insight Global**, GIS Analyst contracted to Microsoft Bing Maps, continuing with Uber after it acquired Bing's mapping assets (Mar 2015 – Nov 2015)
- **Walmart**, Customer Service Manager (Mar 2012 – Jun 2014)

---

## Technical Projects

### GlassOps (Open Source)

**Status: Rebuilding as a CLI, not yet released**

- Rebuilding a governance-first Salesforce DevOps tool as a CI-agnostic command line tool that acts as the CI/CD layer for Salesforce delivery.
- Defining control-plane architecture independent of CI/CD tooling.
- Developing a Go runtime, packaged as a Docker container action, that checks freeze windows, runs static analysis, authenticates with JWT, and writes a permit and a deployment contract for the deploy step that follows.
- Archived the first TypeScript runtime and carried its design into the rebuild.

_Note: GlassOps is early work, with nothing released yet. The permit and contract are not yet signed records._

---

### Salesforce Platform Architect Portfolio

- Launched ryanbumstead.com in October 2026, an Experience Cloud (LWR) site that runs on the platform it describes.
- Authored 34 Architectural Decision Records, a Systems Architecture Specification, and five other enterprise guides.
- Designed API-first integration architectures using OpenAPI 3.0, with a System API and a Process API served by Apex REST behind OAuth 2.0 client credentials.
- Built token vending so any reviewer can call the live APIs with a short-lived token.
- Built the Experience Cloud LWR frontend with GraphQL data access and governed customization boundaries.
- Built a governed AI dispatch with Gemini grounded on portfolio records and a deterministic local template fallback.
- Built live observability of governor limits, org quotas, and circuit breakers, plus an outage simulation that shows the cached fallback.
- Automated delivery with pull request validation against production, delta deploys, and a read only live smoke test after each deploy and once a day.

---

### Education Cloud Reference Architecture

- Designed a K-12 admissions platform on Salesforce Education Cloud using OmniStudio orchestration (7 OmniScripts, 14 DataRaptors, 2 Integration Procedures), Flow automation, and a custom Lightning Console advisor application.
- Implemented a canonical applicant lifecycle (`Inquiry -> Enrolled`) with deterministic student identity handling and idempotent application submission patterns.
- Established least-privilege security architecture using Permission Set Groups and persona-based workspace controls.
- Authored 17 Architecture Decision Records documenting trade-offs, superseded decisions, and implementation rationale in a published MkDocs site with Mermaid diagrams.
- Automated Salesforce metadata documentation generation using GlassOps Knowledge Module patterns.

---

### Resume as Code

**Status: Released (v2.1.0)**

- Built an event-driven pipeline converting Markdown into immutable PDF artifacts.
- Decoupled PII using GitHub Secrets for safe public repository visibility.
- Implemented automated formatting and link validation.
- Engineered multi-stage assembly process with source layer, build layer, and distribution layer.

---

### Setup Salesforce CLI (GitHub Marketplace)

**Status: Released (v3.0.0)**

- Engineered an enterprise-grade composite GitHub Action for initializing deterministic Salesforce CI/CD environments.
- Implemented exponential backoff strategies and robust error handling.
- Designed intelligent caching engine generating SHA-256 hash keys based on tooling inputs, cutting setup from 1.5 to 3 minutes cold to 20 to 60 seconds cached.
- Built invariant validation logic to ensure “fail-fast” behavior.
- Validated cross-platform compatibility across Ubuntu, macOS, and Windows runners.

---

## Education & Certifications

**Associate's Degree in General Studies** — Metropolitan Community College (Completed 2025)

**Salesforce Certifications:**

- Education Cloud Consultant (Mar 2025)
- Data 360 Consultant (Mar 2025)
- Agentforce Specialist (Jan 2025)
- Marketing Cloud Engagement Foundations (Jan 2025)
- Platform App Builder (Sep 2024)
- Platform Administrator II (Jul 2024)
- Platform Administrator (Jun 2024)
- AI Associate (Jul 2024, retired)

**MuleSoft Training:**

- DEX-401: Essentials of Anypoint Platform Development (Completed)

**Trailhead:**

- 3x Ranger
