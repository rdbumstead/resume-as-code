# Resume as Code

![Build Status](https://github.com/rdbumstead/resume-as-code/actions/workflows/resume-pipeline.yml/badge.svg)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

**This repository treats my professional career documentation as a software product.** Instead of manually editing Word documents, this project uses a **Zero-Touch CI/CD pipeline** to compile my resume from clean Markdown source, inject real-time data from my projects, and enforce strict governance on hyperlinks and formatting.

## 📐 Architecture & Pipeline

Every commit to `src/` triggers a GitHub Actions workflow that executes the following "Source to Distribution" pipeline:

```mermaid
graph TD
    subgraph Input ["Source Layer (Human Edited)"]
        Src["src/*.md<br/>(Clean Source)"]
        Conf["resume.config.json"]
        Sec["GitHub Secrets (PII)"]
    end

    subgraph Process ["Build Layer (Node.js)"]
        Temp["Temp Directory"]
        Fetch["update-stats.js<br/>(Fetch GitHub API Data)"]
        Audit["inject-links.js<br/>(Link Governance & Audit)"]
        Assemble["assemble.js<br/>(Inject Header & Secrets)"]
        Render["mermaid-render.js<br/>(Render Diagrams to PNG)"]
    end

    subgraph Output ["Distribution Layer (Machine Generated)"]
        DistMD["markdown/<br/>(Web-Ready View with Links)"]
        Pandoc["Pandoc / XeLaTeX"]
        PDF["pdf/*.pdf<br/>(Downloadable Artifacts)"]
    end

    Src --> Temp
    Conf --> Fetch
    Temp --> Fetch
    Fetch --> Audit
    Audit --> DistMD
    Audit --> Assemble
    Sec --> Assemble
    Assemble --> Render
    Render --> Pandoc
    Pandoc --> PDF
```

### Pipeline Stages

1.  **Source Separation:** The pipeline separates **Source Code** (`src/`) from **Distribution Artifacts** (`markdown/` and `pdf/`).
2.  **Data Fetching (`update-stats.js`):** Queries the GitHub API to fetch live statistics (e.g., number of Architectural Decision Records) and injects them into the build.
3.  **Governance & Link Injection (`inject-links.js`):**
    - **Audits** existing links against a "Source of Truth" configuration.
    - **Injects** missing links for governed keywords (e.g., "SAS", "Program Charter").
    - **Publishes** the fully linked version to the `markdown/` folder for immediate viewing on GitHub.
4.  **Assembly (`assemble.js`):** Dynamically stitches together your specific contact details (from Secrets) with the generic Markdown body content for the PDF build.
5.  **Diagram Rendering (`mermaid-render.js`):** Compiles MermaidJS code blocks into high-resolution, transparent PNGs for embedding in PDFs.
6.  **Compilation (Pandoc):** Converts the processed Markdown and assets into print-ready PDFs with embedded metadata using XeLaTeX.

## 🎯 Key Features

### Security-First Architecture

- **PII Decoupling:** Personal contact information stored in GitHub Secrets, decoupled from source Markdown.
- **Bot-Resistant:** Contact details only appear in compiled PDFs, not in plain-text source files that are easily scraped by bots.
- **Controlled Exposure:** PII exists only in final artifacts, making automated harvesting significantly more difficult.

### Automated Governance

- **Real-time Statistics:** GitHub API integration fetches current portfolio metrics (ADR count, documentation status).
- **Link Validation:** Ensures all hyperlinks resolve correctly and follow naming conventions.
- **Idempotency:** The pipeline guarantees consistent output regardless of how many times it is run.

### Professional Output

- **PDF Metadata:** Embedded author, title, and keywords for professional document properties.
- **Multi-Version Strategy:** Generates three targeted resume versions from single source:
  - **Recruiter:** ATS-optimized, scannable format.
  - **Standard:** Balanced detail for general applications.
  - **Comprehensive:** Architecture-heavy with diagrams for senior roles.

## 🛠 Tech Stack

- **Core:** Markdown, Pandoc, XeLaTeX
- **Scripting:** Node.js (Automation & API interaction)
- **Diagrams:** Mermaid.js (via Puppeteer)
- **CI/CD:** GitHub Actions
- **Fonts:** Liberation Serif & Sans (cross-platform compatibility)

## 📂 Project Structure

```
resume-as-code/
├── markdown/              # <--- DO NOT EDIT: Auto-generated distribution (Web View)
├── src/                   # <--- EDIT HERE: Clean source content
│   ├── Resume.md
│   ├── Resume_Recruiter.md
│   └── Resume_Comprehensive.md
├── scripts/               # Node.js automation logic
│   ├── assemble.js        # PII injection and header assembly
│   ├── update-stats.js    # GitHub API data fetching
│   ├── inject-links.js    # Link governance and validation
│   ├── mermaid-render.js  # Diagram rendering
│   └── get-name.js        # Name formatting utility
├── pdf/                   # Final compiled artifacts
├── resume.config.json     # Single Source of Truth for links and metadata
└── .github/workflows/     # CI/CD pipeline definition
```

## 🚀 Quick Start

### 1. Fork & Clone

Fork this repository to your own GitHub account, then clone it locally:

```bash
git clone https://github.com/YOUR_USERNAME/resume-as-code.git
cd resume-as-code
```

### 2. Configure Secrets (The Secure Way)

Go to **Settings > Secrets and variables > Actions** in your forked repo and add the following repository secrets:

| Secret Name          | Value Example    | Description                         |
| -------------------- | ---------------- | ----------------------------------- |
| `RESUME_FIRST_NAME`  | Jane             | Your first name                     |
| `RESUME_LAST_NAME`   | Doe              | Your last name                      |
| `RESUME_TITLE`       | Senior Architect | Your professional title             |
| `RESUME_PHONE`       | 555-0100         | Contact phone number                |
| `RESUME_EMAIL`       | jane@example.com | Contact email address               |
| `RESUME_LOCATION`    | New York, NY     | City, State                         |
| `RESUME_GITHUB_USER` | janedoe          | GitHub username for API integration |

### 3. Update Content (Src Directory)

Edit the Markdown files in the **`src/`** directory. Do not edit `markdown/` directly, as it is overwritten by the pipeline.

### 4. Commit & Push

```bash
git add src/
git commit -m "feat: update experience section"
git push
```

The GitHub Actions workflow will automatically build and commit the updated PDFs.

### 5. Local Development (Optional)

If running locally, create a `.env` file in the root directory (this file is ignored by git):

```ini
RESUME_FIRST_NAME=Jane
RESUME_LAST_NAME=Doe
RESUME_TITLE=Senior Architect
RESUME_PHONE=555-0100
RESUME_EMAIL=jane@example.com
RESUME_LOCATION=New York, NY
RESUME_GITHUB_USER=janedoe
```

Then install dependencies and run the build:

```bash
npm install
# Run individual scripts or the full pipeline locally
mkdir -p temp_processed
cp src/*.md temp_processed/
node scripts/inject-links.js temp_processed
node scripts/assemble.js temp_processed "temp_processed/Resume.md" "Resume.md"
```

## 🔒 Why This Approach?

### Traditional Resume Management

- Manual Word document updates
- Version control via "Resume_v3_final_FINAL.docx"
- Contact info in plain-text files (easily scraped by bots)
- Inconsistent formatting across versions

### Resume as Code

- **Single Source of Truth:** One set of Markdown files, multiple output formats
- **Automated Governance:** Links, stats, and formatting enforced programmatically
- **Bot-Resistant PII:** Contact details only in compiled PDFs, not easily harvested by automated scrapers
- **Verifiable Architecture:** The pipeline itself demonstrates DevOps and automation skills

## 📄 License

MIT License - Feel free to fork and adapt for your own use.

## 🤝 Contributing

This is a personal project, but if you find bugs or have suggestions for improving the pipeline architecture, feel free to open an issue.
