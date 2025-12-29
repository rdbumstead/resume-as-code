const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, '../resume.config.json');
let config;

try {
    config = require(configPath);
} catch (e) {
    console.error("Error: Could not find resume.config.json.");
    process.exit(1);
}

const TARGET_DIR = process.argv[2];
const SOURCE_FILE = process.argv[3];
const OUTPUT_FILE = process.argv[4];

if (!TARGET_DIR || !SOURCE_FILE || !OUTPUT_FILE) {
    console.error("Usage: node assemble.js <TARGET_DIR> <SOURCE_FILE> <OUTPUT_FILE>");
    process.exit(1);
}

const h = config.header;
const m = config.meta;
const l = config.links;

const nameLine = `# ${m.firstName.toUpperCase()} ${m.lastName.toUpperCase()}\n`;

const titleLine = `**${h.title}**\n`;

const linkedIn = l.LinkedIn ? `[LinkedIn](${l.LinkedIn})` : "";
const portfolio = l.Portfolio ? `[Portfolio](${l.Portfolio})` : "";

const contactItems = [
    h.location,
    h.phone,
    h.email,
    linkedIn,
    portfolio
].filter(Boolean);

const contactLine = contactItems.join(" | ");

const fullHeader = `${nameLine}${titleLine}${contactLine}\n\n---\n\n`;

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
console.log(`Assembled: ${OUTPUT_FILE}`);