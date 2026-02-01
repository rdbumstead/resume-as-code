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
    content = content.replace(frontmatterRegex, '');
}

const filename = path.basename(SOURCE_FILE);
const variantConfig = config.variants?.[filename] || {};
const finalTitle = fileTitle || variantConfig.title || process.env.RESUME_TITLE || "Salesforce Architect";

// 4. PREPARE HEADER (The "Mega-Line" Strategy)
const headerItems = [];

// A. Professional Identity
headerItems.push(`**${finalTitle}**`);
headerItems.push(`**${process.env.RESUME_LOCATION || "Omaha, NE"}**`);

// B. PII (Only if not in Safe Mode)
if (!isSafeMode) {
    const phone = process.env.RESUME_PHONE || "555-555-5555";
    const email = process.env.RESUME_EMAIL || "email@example.com";
    headerItems.push(`**${phone}**`);
    headerItems.push(`**${email}**`);
}

// C. Links (Always Present)
const githubUser = process.env.RESUME_GITHUB_USER || "rdbumstead";
const linkedinUser = process.env.RESUME_LINKEDIN || "ryanbumstead";

headerItems.push(`**[GitHub](https://github.com/${githubUser})**`);
headerItems.push(`**[Portfolio](https://ryanbumstead.com)**`);
headerItems.push(`**[LinkedIn](https://linkedin.com/in/${linkedinUser})**`);

// JOIN ALL INTO ONE LINE
const megaLine = headerItems.join(" | ");

// 5. INJECT GOLDEN HEADER
if (!content.includes('{{ RESUME_FIRST_NAME }}')) {
    console.log(`   ✨ Injecting Mega-Header...`);
    
    // Only one variable to inject now: ${megaLine}
    const headerTemplate = `# {{ RESUME_FIRST_NAME }} {{ RESUME_LAST_NAME }}
${megaLine}

---

`;
    content = headerTemplate + content.trimStart();
}

// 6. Define Context
const context = {
    "{{ RESUME_FIRST_NAME }}": process.env.RESUME_FIRST_NAME || "Ryan",
    "{{ RESUME_LAST_NAME }}": process.env.RESUME_LAST_NAME || "Bumstead"
};

// 7. Execute Replacement
Object.keys(context).forEach(placeholder => {
    const value = context[placeholder];
    const regex = new RegExp(placeholder, 'g');
    content = content.replace(regex, value);
});

// 8. Cleanup
if (isSafeMode) {
    content = content.replace(/^\s*\|\s*$/gm, ''); 
}
content = content.replace(/\n{3,}/g, '\n\n'); 

// 9. Write Output
const outputPath = path.join(TARGET_DIR, OUTPUT_FILE);
fs.writeFileSync(outputPath, content, 'utf8');

console.log(`Assembled: ${OUTPUT_FILE}`);