require('dotenv').config();
const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, '../resume.config.json');
let config;
try {
    config = require(configPath);
} catch (e) {
    console.error("CRITICAL ERROR: Could not load resume.config.json");
    console.error(e.message);
    process.exit(1);
}

const TARGET_DIR = process.argv[2];
const SOURCE_FILE = process.argv[3];
const OUTPUT_FILE = process.argv[4];
const isSafeMode = process.argv.includes('--safe');

if (!TARGET_DIR || !SOURCE_FILE || !OUTPUT_FILE) {
    console.error("Usage Error: Missing arguments");
    process.exit(1);
}

const firstName = process.env.RESUME_FIRST_NAME || "Architect";
const lastName = process.env.RESUME_LAST_NAME || "Candidate";
const title = process.env.RESUME_TITLE || "Solution Architect";
const location = process.env.RESUME_LOCATION || "Remote";
const phone = process.env.RESUME_PHONE || "555-0100";
const email = process.env.RESUME_EMAIL || "email@example.com";

const l = config.links || {};
const github = l.GitHub ? `[GitHub](${l.GitHub})` : "";
const linkedIn = l.LinkedIn ? `[LinkedIn](${l.LinkedIn})` : "";
const portfolio = l.Portfolio ? `[Portfolio](${l.Portfolio})` : "";

const nameLine = `# ${firstName.toUpperCase()} ${lastName.toUpperCase()}\n`;

const rawHeaderItems = [
    title,
    location,
    !isSafeMode && email, 
    github,
    portfolio,
    linkedIn,
    !isSafeMode && phone 
];

const headerItems = rawHeaderItems
    .filter(Boolean)
    .map(item => `**${item}**`);

const infoLine = headerItems.join(" | ");
const fullHeader = `${nameLine}${infoLine}\n\n---\n\n`;

const bodyPath = path.resolve(SOURCE_FILE);
let bodyContent = "";
try {
    bodyContent = fs.readFileSync(bodyPath, 'utf8');
} catch (e) {
    console.error(`Error reading source file: ${bodyPath}`);
    process.exit(1);
}

const finalContent = fullHeader + bodyContent;
const outputPath = path.join(TARGET_DIR, OUTPUT_FILE);

fs.writeFileSync(outputPath, finalContent, 'utf8');
console.log(`Assembled (${isSafeMode ? 'SAFE MODE' : 'FULL PII'}): ${OUTPUT_FILE}`);