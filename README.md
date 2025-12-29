# Resume as Code

![Build Status](https://github.com/rdbumstead/resume-as-code/actions/workflows/resume-pipeline.yml/badge.svg)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

**This repository treats my professional career documentation as a software product.** Instead of manually editing Word documents, this project uses a **Zero-Touch CI/CD pipeline** to compile my resume from Markdown source, inject real-time data from my projects, and enforce strict governance on hyperlinks and formatting.

## 📐 Architecture & Pipeline

Every commit to `main` triggers a GitHub Actions workflow that executes the following pipeline:

````mermaid
graph TD
    subgraph Input ["Source Layer"]
        MD[Markdown Content]
        Conf[resume.config.json]
        Sec[GitHub Secrets (PII)]
    end

    subgraph Process ["Build Layer (Node.js)"]
        Fetch[update-stats.js<br/>(Fetch GitHub API Data)]
        Assemble[assemble.js<br/>(Inject Header & Secrets)]
        Render[mermaid-render.js<br/>(Render Diagrams to PNG)]
        Audit[inject-links.js<br/>(Link Governance & Audit)]
    end

    subgraph Output ["Presentation Layer"]
        Pandoc[Pandoc / XeLaTeX]
        PDF1[Recruiter Resume.pdf]
        PDF2[Comprehensive Resume.pdf]
    end

    MD --> Fetch
    Conf --> Fetch
    Fetch --> Assemble
    Sec --> Assemble
    Assemble --> Render
    Render --> Audit
    Audit --> Pandoc
    Pandoc --> PDF1
    Pandoc --> PDF2
    ```

1.  **Cleanup:** Removes previous build artifacts and temporary files to ensure a clean slate.
2.  **Data Fetching (`update-stats.js`):** Queries the GitHub API to fetch live statistics (e.g., number of Architectural Decision Records) and updates the source files dynamically.
3.  **Assembly (`assemble.js`):** Dynamically stitches together your specific contact details (from Secrets) with the generic Markdown body content.
4.  **Diagram Rendering (`mermaid-render.js`):** Compiles MermaidJS code blocks into high-resolution, transparent PNGs for embedding in PDFs.
5.  **Governance & Link Injection (`inject-links.js`):**
    - **Audits** existing links against a "Source of Truth" configuration.
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
- `resume.config.json`: **Single Source of Truth** for architectural meta and links.
- `.env` / **GitHub Secrets**: **Single Source of Truth** for PII (Name, Email, Phone).

## 🚀 Quick Start

### 1. Fork & Clone

Fork this repository to your own GitHub account.

### 2. Configure Secrets (The Secure Way)

Go to **Settings > Secrets and variables > Actions** in your forked repo and add the following repository secrets:

| Secret Name          | Value Example    |
| -------------------- | ---------------- |
| `RESUME_FIRST_NAME`  | Jane             |
| `RESUME_LAST_NAME`   | Doe              |
| `RESUME_TITLE`       | Senior Architect |
| `RESUME_PHONE`       | 555-0100         |
| `RESUME_EMAIL`       | jane@example.com |
| `RESUME_LOCATION`    | New York, NY     |
| `RESUME_GITHUB_USER` | janedoe          |

### 3. Local Development (Optional)

If running locally, create a `.env` file in the root directory (this file is ignored by git):

```ini
RESUME_FIRST_NAME=Jane
RESUME_LAST_NAME=Doe
RESUME_TITLE=Senior Architect
RESUME_PHONE=555-0100
RESUME_EMAIL=jane@example.com
RESUME_LOCATION=New York, NY
RESUME_GITHUB_USER=janedoe
````
