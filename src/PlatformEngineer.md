---
title: Platform Engineer
---

## Professional Summary

Platform Engineer with nearly a decade designing governed Salesforce platforms for higher education and nonprofit organizations, currently delivering Education Cloud implementations at TELUS Digital. Specializes in governance-first architecture, deterministic CI/CD systems, and policy-driven delivery models. Applies proven platform patterns to internal developer platforms and emerging control-plane architectures.

---

## Core Platform & Engineering Skills

### Platform Engineering & Architecture

- Control plane and data plane separation
- Governance-as-Code and policy enforcement
- Deterministic CI/CD pipelines
- Contract-first APIs and validation
- Event-driven architecture
- Multi-environment promotion strategies
- Architectural Decision Records
- Systems Architecture Specification

### DevOps & Delivery

- GitHub Actions, reusable workflows, composite actions
- Salesforce DX, JWT authentication, org introspection
- CI/CD governance and quality gates
- Automated testing and static analysis

### Languages & Tooling

- TypeScript, JavaScript, Apex, SQL
- Go, Python, YAML
- JSON Schema, SARIF
- Infrastructure as Code and container orchestration tooling
- Pandoc, XeLaTeX, Mermaid.js

### Platforms

- Salesforce Platform, Service Cloud, Experience Cloud, LWR

---

## Professional Experience

### Senior Solution Consultant

**TELUS Digital** | Apr 2026 – Present

- Delivers implementation and optimization of Salesforce solutions for higher education institutions across the student lifecycle.
- Brings a practitioner perspective built across nearly a decade of hands-on Salesforce experience at higher education institutions, including administration, development, architecture, and platform rollout.

### CRM Developer (Salesforce)

**Creighton University** | Aug 2025 – Apr 2026

- Led DevOps modernization and governance for a multi-team Salesforce environment.
- Defined and implemented the organization's first formal Salesforce DevOps governance model with deterministic validation and controlled promotion paths.
- Engineered CI/CD pipelines using GitHub Actions, SFDX CLI, JWT authentication, automated testing, and quality gates.
- Designed training plan for two new CRM Developers and trained team on ETL processes and Salesforce architecture dependencies.
- Acted as technical lead for Apex, asynchronous processing, and LWC development beyond declarative platform limits.

### Salesforce Application Architect

**Independent Consultant** | Oct 2021 – Present

- Principal architect for Salesforce implementations across nonprofit and higher education organizations.
- Architected grant management platforms with auditability, least-privilege access, and compliance-driven design.
- Led platform evaluations, proofs of concept, and architectural tradeoff analyses for executive decision-making.
- Designed scalable Experience Cloud solutions supporting thousands of external users.
- Developed custom workforce development application managing complete lifecycle from requirements to production.

### Application Administrator

**Creighton University** | Jun 2021 – Aug 2025

- Administered Service Cloud for 400+ internal users and Experience Cloud sites for 10,000+ external users.
- Automated identity, onboarding, and provisioning workflows, reducing setup time by ~90%.
- Implemented Flow automations and custom Apex solutions.
- Led Talend upgrade to version 8.0 and managed Change Data Capture operations.

### CAET Services Specialist II

**Metropolitan Community College** | Jul 2017 – Jun 2021

- Implemented Salesforce CRM from greenfield into active working environment.
- Served as Salesforce administrator, developer, and trainer for workforce and continuing education programs.
- Built automation workflows using Microsoft Forms, Teams, and Power Automate.
- Administered Canvas LMS and managed digital content for non-credit programs.

---

## Selected Platform & Engineering Projects

### GlassOps (Open Source)

**Status: Rebuilding as a CLI, not yet released**

- Rebuilding GlassOps as a CI-agnostic command line tool that acts as the CI/CD layer for Salesforce delivery.
- Designed a governance control plane decoupled from execution tooling.
- Developing a Go runtime, packaged as a Docker container action, that checks freeze windows, runs static analysis, authenticates with JWT, and writes a permit and a deployment contract.
- Archived the first TypeScript runtime and carried its design into the rebuild.

_Note: GlassOps is early work, with nothing released yet._

### Setup Salesforce CLI

**GitHub Marketplace | Jan 2026 – Present**

- Built enterprise-grade GitHub Action for strictly version-pinned Salesforce CLI environments.
- Cut setup from 1.5 to 3 minutes cold to 20 to 60 seconds cached through intelligent caching and fault-tolerant execution.

### Salesforce Platform Architect Portfolio

- Live reference implementation of enterprise Salesforce architecture patterns at ryanbumstead.com since October 2026.
- Contract-first APIs using OpenAPI 3.0 with Apex orchestration.
- Experience Cloud LWR frontend with GraphQL data access and governed customization boundaries.
- CI/CD with check only validation against production, delta deploys, a daily live smoke test, and deploy evidence published as platform events.

### Education Cloud Reference Architecture

- Designed a K-12 admissions reference implementation on Salesforce Education Cloud with OmniStudio orchestration, Flow automation, and a role-optimized advisor console.
- Modeled an end-to-end applicant lifecycle (`Inquiry -> Enrolled`) with deterministic identity handling and idempotent submission behavior.
- Authored architecture decisions and trade-off records in a published documentation site to demonstrate governance-first implementation patterns.

### Resume as Code

- Engineered custom Node.js assembly engine injecting job titles ("Golden Headers") and PII at runtime.
- Security-first pipeline ensures sensitive data exists only in compiled release artifacts.
- High-fidelity PDF compilation using Pandoc and XeLaTeX.

---

## Education & Certifications

**Associate's Degree, General Studies** — Metropolitan Community College, Completed 2025

**Salesforce Certifications:** Education Cloud Consultant, Data 360 Consultant, Agentforce Specialist, Marketing Cloud Engagement Foundations, Platform App Builder, Platform Administrator I & II

**MuleSoft Training:** DEX-401: Essentials of Anypoint Platform Development (Completed)
