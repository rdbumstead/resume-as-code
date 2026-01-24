require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// CONFIGURATION
const INPUT_DIR = 'imports';
const OUTPUT_DIR = 'src';

// Titles to ignore if found (e.g. section headers)
const IGNORE_TITLES = [
    'WORK EXPERIENCE', 'PROFESSIONAL SUMMARY', 'SUMMARY', 
    'EDUCATION', 'CERTIFICATIONS', 'SKILLS', 'TECHNICAL SKILLS',
    'CORE SKILLS', 'PROFESSIONAL EXPERIENCE', 'CONTACT', 'PROJECTS'
];

// Get User Identity to prevent "My Name is my Job Title" bugs
const MY_FIRST = (process.env.RESUME_FIRST_NAME || "Ryan").toUpperCase();
const MY_LAST = (process.env.RESUME_LAST_NAME || "Bumstead").toUpperCase();

// Ensure directories exist
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR);

const inputFile = process.argv[2];

if (!inputFile) {
    console.error("❌ Usage: node scripts/import-local.js <filename.docx>");
    process.exit(1);
}

const inputPath = path.join(INPUT_DIR, inputFile);
const baseName = path.basename(inputFile, path.extname(inputFile));
const outputPath = path.join(OUTPUT_DIR, `${baseName}.md`);

if (!fs.existsSync(inputPath)) {
    console.error(`❌ File not found: ${inputPath}`);
    process.exit(1);
}

console.log(`\n🔄 Converting ${inputFile} to Markdown...`);

try {
    // 1. Run Pandoc
    execSync(`pandoc "${inputPath}" -f docx -t gfm -o "${outputPath}"`);

    // 2. Read content
    let content = fs.readFileSync(outputPath, 'utf8');
    let extractedTitle = null;

    // 3. INTELLIGENT EXTRACTION (Title)
    
    // Strategy A: Header Check
    const headerMatch = content.match(/^##\s+(.*)$/m);
    if (headerMatch) {
        const potentialTitle = headerMatch[1].trim();
        const upperTitle = potentialTitle.toUpperCase();
        
        if (!IGNORE_TITLES.includes(upperTitle) && 
            !upperTitle.includes(MY_LAST)) { 
            extractedTitle = toTitleCase(potentialTitle);
            console.log(`   🎯 Strategy A (Header): Found "${extractedTitle}"`);
        }
    }

    // Strategy B: All Caps Line Check
    if (!extractedTitle) {
        const lines = content.split('\n').slice(0, 10);
        for (const line of lines) {
            const cleanLine = line.replace(/[*_#]/g, '').trim(); 
            const upperLine = cleanLine.toUpperCase();

            if (cleanLine.length > 5 && 
                cleanLine === upperLine && 
                /[A-Z]/.test(cleanLine) && 
                !IGNORE_TITLES.includes(upperLine)) {
                
                if (upperLine.includes(MY_FIRST) || upperLine.includes(MY_LAST)) {
                    continue; 
                }

                extractedTitle = toTitleCase(cleanLine);
                console.log(`   🎯 Strategy B (All Caps): Found "${extractedTitle}"`);
                break;
            }
        }
    }

    if (!extractedTitle) extractedTitle = "Salesforce Platform Architect";

    // 4. SANITIZE PII (Do this EARLY to make cleanup easier)
    console.log("   🛡️  Sanitizing Data...");
    content = content.replace(/\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g, "{{ RESUME_PHONE }}");
    content = content.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, "{{ RESUME_EMAIL }}");
    content = content.replace(/linkedin\.com\/in\/[a-zA-Z0-9-]+/g, "{{ RESUME_LINKEDIN }}");
    content = content.replace(/www\.{{ RESUME_LINKEDIN }}/g, "{{ RESUME_LINKEDIN }}");

    // 5. INTELLIGENT CLEANUP
    // We scan for the start of the body. The body starts at:
    // A) The first "##" Header
    // OR
    // B) The first "Long Paragraph" (>60 chars) which implies a summary without a header.
    
    const lines = content.split('\n');
    let startIndex = -1;
    let injectSummaryHeader = false;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        // Check for Header (Standard Section)
        if (line.startsWith('## ')) {
            // Check if this header IS the title we extracted (don't start body there)
            if (line.toUpperCase().includes(extractedTitle.toUpperCase())) continue;

            startIndex = i;
            break;
        }

        // Check for Long Paragraph (The Summary)
        // Heuristic: > 60 chars, and not a variable line
        if (line.length > 60 && !line.includes('{{ RESUME_')) {
            console.log("   📝 Detected Summary Paragraph (No Header)");
            startIndex = i;
            injectSummaryHeader = true;
            break;
        }
    }

    // Reconstruct Body
    if (startIndex !== -1) {
        let bodyLines = lines.slice(startIndex);
        if (injectSummaryHeader) {
            bodyLines.unshift("## Professional Summary\n");
        }
        content = bodyLines.join('\n');
    }

    // 6. INJECT: Frontmatter
    console.log("   ✨ Injecting Frontmatter...");
    const fileContent = `---
title: ${extractedTitle}
---

${content}`;

    content = fileContent;

    // 7. FINAL CLEANUP
    console.log("   🧹 Cleaning up artifacts...");
    content = content.replace(/^Omaha, NE$/gm, ''); 
    content = content.replace(/\n{3,}/g, '\n\n');

    fs.writeFileSync(outputPath, content);

    try {
        execSync(`npx prettier --write "${outputPath}"`);
    } catch (e) {
        console.warn("   ⚠️  Prettier failed, but file is saved.");
    }

    console.log(`\n✅ Success! Saved to: ${outputPath}`);

} catch (error) {
    console.error("❌ Conversion Failed:", error.message);
    process.exit(1);
}

function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}