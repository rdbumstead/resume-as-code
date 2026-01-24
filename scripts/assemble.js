require('dotenv').config();
const fs = require('fs');
const path = require('path');

// 1. Load Config
const configPath = path.join(__dirname, '../resume.config.json');
let config;
try {
    config = require(configPath);
} catch (e) {
    console.error("CRITICAL ERROR: Could not load resume.config.json");
    process.exit(1);
}

// ARGS: [node, script, TARGET_DIR, SOURCE_FILE, OUTPUT_FILE, --safe?]
const TARGET_DIR = process.argv[2];
const SOURCE_FILE = process.argv[3];
const OUTPUT_FILE = process.argv[4];
const isSafeMode = process.argv.includes('--safe');

if (!TARGET_DIR || !SOURCE_FILE || !OUTPUT_FILE) {
    console.error("Usage Error: Missing arguments");
    process.exit(1);
}

// 2. Read Source File
const sourcePath = path.resolve(SOURCE_FILE);
let content = "";
try {
    content = fs.readFileSync(sourcePath, 'utf8');
} catch (e) {
    console.error(`Error reading source file: ${sourcePath}`);
    process.exit(1);
}

// 3. Parse Frontmatter & Determine Title
let fileTitle = null;
const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\s*/;
const match = content.match(frontmatterRegex);

if (match) {
    const rawYaml = match[1];
    const titleMatch = rawYaml.match(/^title:\s*(.*)$/m);
    if (titleMatch) {
        fileTitle = titleMatch[1].trim().replace(/^['"](.*)['"]$/, '$1');
    }
    // STRIP Frontmatter from body
    content = content.replace(frontmatterRegex, '');
}

// Check Config for Title override if Frontmatter didn't have one
const filename = path.basename(SOURCE_FILE);
const variantConfig = config.variants?.[filename] || {};
const finalTitle = fileTitle || variantConfig.title || process.env.RESUME_TITLE || "Salesforce Architect";

// 4. INJECT GOLDEN HEADER (The "Composition" Step)
// We only inject if the file doesn't already start with the Name Variable
if (!content.includes('{{ RESUME_FIRST_NAME }}')) {
    console.log(`   ✨ Injecting Layout Header...`);
    
    // FIX: Template starts immediately on the backtick line to prevent Line 1 gap
    const headerTemplate = `# {{ RESUME_FIRST_NAME }} {{ RESUME_LAST_NAME }}
**{{ RESUME_TITLE }}** | **{{ RESUME_LOCATION }}** | **[GitHub](https://github.com/{{ RESUME_GITHUB_USER }})** | **[Portfolio](https://ryanbumstead.com)** | **[LinkedIn](https://linkedin.com/in/{{ RESUME_LINKEDIN }})**

---

`;
    // FIX: Trim leading whitespace from body so we don't have a huge gap after the header
    content = headerTemplate + content.trimStart();
}

// 5. Define Context
const context = {
    "{{ RESUME_FIRST_NAME }}": process.env.RESUME_FIRST_NAME || "Ryan",
    "{{ RESUME_LAST_NAME }}": process.env.RESUME_LAST_NAME || "Bumstead",
    "{{ RESUME_TITLE }}": finalTitle, 
    "{{ RESUME_LOCATION }}": process.env.RESUME_LOCATION || "Omaha, NE",
    "{{ RESUME_GITHUB_USER }}": process.env.RESUME_GITHUB_USER || "rdbumstead",
    "{{ RESUME_LINKEDIN }}": process.env.RESUME_LINKEDIN || "ryanbumstead" 
};

// 6. Handle PII (Safe Mode)
if (isSafeMode) {
    console.log(`   🛡️  Safe Mode: Removing PII from ${OUTPUT_FILE}`);
    context["{{ RESUME_PHONE }}"] = ""; 
    context["{{ RESUME_EMAIL }}"] = "";
} else {
    context["{{ RESUME_PHONE }}"] = process.env.RESUME_PHONE || "555-555-5555";
    context["{{ RESUME_EMAIL }}"] = process.env.RESUME_EMAIL || "email@example.com";
}

// 7. Execute Replacement
Object.keys(context).forEach(placeholder => {
    const value = context[placeholder];
    const regex = new RegExp(placeholder, 'g');
    content = content.replace(regex, value);
});

// 8. Cleanup Artifacts
if (isSafeMode) {
    content = content.replace(/^\s*\|\s*$/gm, ''); 
    content = content.replace(/\n{3,}/g, '\n\n'); 
}

// 9. Write Output
const outputPath = path.join(TARGET_DIR, OUTPUT_FILE);
fs.writeFileSync(outputPath, content, 'utf8');

console.log(`✅ Assembled: ${OUTPUT_FILE} (Title: ${finalTitle})`);