---
title: Salesforce Platform Architect
---

## Professional Summary

Salesforce Platform Architect with nearly a decade on the platform, focused on higher education. At TELUS Digital, leads Education Cloud implementations from recruitment and admissions through student success, spanning OmniStudio application flows, Experience Cloud portals, SIS integration, and security and sharing design. Previously ran Service Cloud for 400+ staff and Experience Cloud for 10,000+ external users at Creighton University, led DevOps and CI/CD across two orgs, and designed applications supporting multimillion-dollar fund management.

Work includes greenfield platform builds, multi-org DevOps modernization, and architecture-first delivery in regulated, audit-sensitive, and stakeholder-driven environments.

---

## Core Expertise

### Salesforce Platform Architecture

- Apex, LWC, Flow, Experience Cloud (LWR), Service Cloud, Data Cloud, Marketing Cloud, Agentforce
- Multi-org Salesforce architecture and domain-aligned platform design
- Security architecture: Profiles, Permission Sets, Role Hierarchies, Shield, least-privilege models
- Data modeling, lifecycle governance, and metadata strategy

### DevOps & Platform Engineering

- GitHub Actions, SFDX CLI, JWT authentication
- CI/CD architecture, automated validation, and quality gates
- Branching strategies, release orchestration, and environment promotion models
- Deterministic deployment pipelines across multiple Salesforce orgs

### Integration & Systems Architecture

- API-first design, REST, OpenAPI 3.0
- Event-driven architecture and integration patterns
- MuleSoft integration patterns
- Identity and access architecture across platforms

### Languages & Tooling

- JavaScript (ES6+), TypeScript, SQL, HTML/CSS
- Go, Python, YAML
- Docker containerization
- Pandoc, XeLaTeX, Mermaid.js

---

## Professional Experience

### Senior Solution Consultant

**TELUS Digital | Apr 2026 – Present**

- Delivers implementation and optimization of Salesforce solutions for higher education institutions across the student lifecycle.
- Guides discovery, architecture, and implementation for Education Cloud engagements, with a focus on admissions and student success.
- Brings a practitioner perspective built across nearly a decade of hands-on Salesforce experience at higher education institutions, including administration, development, architecture, and platform rollout.

### Salesforce Application Architect (Independent Consultant)

**Oct 2021 – Present**

- Principal architect for Salesforce implementations across nonprofit and higher education organizations.
- Delivered Salesforce-based grant and workforce platforms supporting government-funded programs and compliance-driven workflows.
- Led architecture assessments and proofs of concept to inform executive-level platform decisions.
- Delivered a custom workforce development application at Metropolitan Community College from requirements through production.
- Established platform standards for data modeling, security, automation, and deployment practices across client environments.

### CRM Developer / Salesforce Technical Lead

**Creighton University | Aug 2025 – Apr 2026**  
_Official title: CRM Developer | Functional role: Platform architecture and DevOps leadership_

- Architected and implemented DevOps capabilities supporting two Salesforce orgs with distinct domains: student success, EDA, internal digital platforms, and advancement/donor systems.
- Designed a governance-driven DevOps model to support multiple teams with different operational priorities and release cadences.
- Engineered CI/CD pipelines using GitHub Actions, SFDX CLI, JWT authentication, LWC/Jest testing, and automated validation gates.
- Defined platform standards for Apex, LWC, asynchronous processing, and integration design.
- Designed training plan for two CRM Developers including Trailhead, Udemy, and curated certification paths.
- Prepared for the MuleSoft transition from Talend.
- Acted as technical lead for complex development beyond declarative capabilities.

_Note: The DevOps model was in its first phase at the time of transition, not a fully mature enterprise-scale implementation._

### Application Administrator

**Creighton University | Jun 2021 – Aug 2025**

- Administered Service Cloud for 400+ internal users and Experience Cloud sites for 10,000+ external users.
- Designed automation for onboarding and identity workflows, reducing provisioning time by ~90%.
- Implemented Flow automations and custom Apex solutions to improve operations.
- Supported Service Cloud for Financial Aid, Registrar, and Student Accounts using email-to-case.
- Managed Marketing Cloud including synchronized data sources, SQL, AMPscript, and customer journeys.
- Led Talend runtime administration and upgrade to version 8.0, including Change Data Capture operations.
- Integrated GatherContent with Salesforce Experience Cloud to streamline content workflows.
- Maintained SSRS reporting, Power BI dashboards, and automated operational workflows using Power Automate.

### CAET Services Specialist II

**Metropolitan Community College | Jul 2017 – Jun 2021**

- Implemented Salesforce CRM from greenfield, including platform configuration, custom development, and user training.
- Served as Salesforce administrator, developer, and trainer for workforce and continuing education programs.
- Built automation workflows using Microsoft Forms, Teams, and Power Automate, including scholarship intake processing.
- Administered Canvas LMS and managed digital content for non-credit programs.
- Managed operations of the Center for Advanced and Emerging Technology.
- Served as Content Manager for Workforce Innovation Division website utilizing HTML5, CSS3, jQuery, and JavaScript.

### Earlier Career

- Developed and delivered curriculum in Prototype Design and Industrial Manufacturing at Metropolitan Community College (2017–2021).
- Technical and operational roles in IT support, GIS analysis, POS systems, and operations management (2012–2017).

---

## Architecture & Platform Highlights

- Designed multi-org Salesforce platform architectures aligned to organizational domains and team structures.
- Built governance-first DevOps models balancing developer velocity with platform stability.
- Defined enterprise documentation standards including ADRs and Systems Architecture Specification.
- Designed integration architectures spanning Salesforce and MuleSoft.

---

## Technical Projects

### GlassOps (Open Source)

**Status: Rebuilding as a CLI, not yet released**

- Rebuilding a governance-first Salesforce DevOps tool as a CI-agnostic command line tool.
- Developing a Go runtime that checks freeze windows, runs static analysis, authenticates with JWT, and writes a deployment contract for the deploy step that follows.
- Keeping governance logic separate from the tools that run the deploy.

_Note: GlassOps is early work, with nothing released yet._

### Education Cloud Reference Architecture

- Designed a K-12 admissions platform on Salesforce Education Cloud using OmniStudio orchestration (7 OmniScripts, 14 DataRaptors, 2 Integration Procedures), Flow automation, and a custom Lightning Console advisor app.
- Implemented a canonical student lifecycle model (Inquiry → Enrolled) with deterministic applicant identity and idempotent application submission design.
- Established least-privileged access architecture using Permission Set Groups and a persona-based advisor workspace.
- Produced 17 Architecture Decision Records documenting design choices, trade-offs, and superseded decisions; published as a MkDocs GitHub Pages site with Mermaid diagrams.
- Automated Salesforce metadata documentation generation using GlassOps Knowledge Module.

### Setup Salesforce CLI (GitHub Marketplace)

- Built enterprise-grade GitHub Action for strictly version-pinned Salesforce CLI environments.
- Implemented intelligent caching and fault-tolerant execution, cutting setup from 1.5 to 3 minutes cold to 20 to 60 seconds cached.

### Salesforce Platform Architect Portfolio

- Launched ryanbumstead.com in October 2026, an Experience Cloud (LWR) site that runs on the platform it describes.
- Authored 34 Architectural Decision Records and six enterprise guides, including a Systems Architecture Specification.
- Built contract-first System and Process APIs in OpenAPI 3.0, served by Apex REST behind OAuth 2.0 client credentials.
- Shipped a governed AI dispatch with Gemini grounded on portfolio records and a deterministic local template fallback.
- Automated delivery with pull request validation against production, delta deploys, and a daily live smoke test.

### Resume as Code

- Engineered a custom Node.js assembly engine that dynamically injects job titles ("Golden Headers") and PII at runtime.
- Implemented secure secret injection using GitHub Secrets to separate public source code from private contact information in compiled artifacts.
- Orchestrated high-fidelity PDF compilation using Pandoc and XeLaTeX.

---

## Education & Certifications

**Associate's Degree in General Studies** — Metropolitan Community College, Completed 2025

**Salesforce Certifications:** Education Cloud Consultant, Data 360 Consultant, Agentforce Specialist, Marketing Cloud Engagement Foundations, Platform App Builder, Platform Administrator I & II

**MuleSoft Training:** DEX-401: Essentials of Anypoint Platform Development (Completed)
