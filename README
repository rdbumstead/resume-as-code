# Resume as Code

![Build Status](https://github.com/rdbumstead/resume-as-code/actions/workflows/resume-pipeline.yml/badge.svg)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

**This repository treats my professional career documentation as a software product.** Instead of manually editing Word documents, this project uses a **Zero-Touch CI/CD pipeline** to compile my resume from Markdown source, inject real-time data from my projects, and enforce strict governance on hyperlinks and formatting.

## 🏗 Architecture & Pipeline

Every commit to `main` triggers a GitHub Actions workflow that executes the following pipeline:

1.  **Cleanup:** Removes previous build artifacts and temporary files to ensure a clean slate.
2.  **Data Fetching (`update-stats.js`):** Queries the GitHub API to fetch live statistics (e.g., number of Architectural Decision Records) and updates the source files dynamically.
3.  **Assembly (`assemble.js`):** Dynamically stitches together your specific contact details (from `resume.config.json`) with the generic Markdown body content.
4.  **Diagram Rendering (`mermaid-render.js`):** Compiles MermaidJS code blocks into high-resolution, transparent PNGs for embedding in PDFs.
5.  **Governance & Link Injection (`inject-links.js`):** \* **Audits** existing links against a "Source of Truth" configuration.
    - **Injects** missing links for governed keywords (e.g., "SAS", "Program Charter").
    - **Sanitizes** inputs to prevent broken URLs or over-linking.
6.  **Compilation (Pandoc):** Converts the processed Markdown and assets into print-ready PDFs using XeLaTeX and custom typography settings.

## 🛠 Tech Stack

- **Core:** Markdown, Pandoc, XeLaTeX
- **Scripting:** Node.js (Automation & API interaction)
- **Diagrams:** Mermaid.js (via Puppeteer)
- **CI/CD:** GitHub Actions

## 📂 Project Structure

- `markdown/`: Generic source content (Experience, Skills, Summary).
- `scripts/`: Node.js logic for fetching stats, rendering diagrams, and assembling the final document.
- `pdf/`: Final compiled artifacts (ignored by git in local, tracked in release).
- `resume.config.json`: **Single Source of Truth** for contact info and links (not committed).

## 🚀 Quick Start

### 1. Fork & Clone

Fork this repository to your own GitHub account, then clone it locally.

### 2. Configure Your Data

This project uses a configuration file to keep your personal data (phone, email) separate from the logic.

```bash
# Create your config from the template
cp resume.config.sample.json resume.config.json
```
