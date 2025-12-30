#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const mdFile = process.argv[2];
if (!mdFile || !fs.existsSync(mdFile)) {
    console.error('Error: Markdown file not found:', mdFile);
    process.exit(1);
}

const mdText = fs.readFileSync(mdFile, 'utf8');
const mdDir = path.dirname(mdFile);
if (!fs.existsSync(mdDir)) fs.mkdirSync(mdDir, { recursive: true });
const mdBasename = path.basename(mdFile, '.md');

console.log(`\n[Mermaid] Processing: ${mdFile}`);
console.log(`[Mermaid] Directory: ${mdDir}`);
console.log(`[Mermaid] Basename: ${mdBasename}`);

let count = 0;

const mermaidRegex = /```mermaid([\s\S]*?)```/g;

const newText = mdText.replace(mermaidRegex, (match, mermaidCode) => {
    count++;
    const pngName = `${mdBasename}_mermaid_${count}.png`;
    const pngPath = path.join(mdDir, pngName);

    console.log(`\n[Mermaid] Diagram #${count}: ${pngName}`);
    console.log(`[Mermaid] Code length: ${mermaidCode.length} chars`);

    try {
        execSync('mmdc --version', { stdio: 'pipe' });
        
        const configPath = path.join(process.cwd(), 'puppeteer-config.json');
        execSync(`mmdc -i - -o "${pngPath}" -b transparent -s 4 -p "${configPath}"`, {
            input: mermaidCode,
            stdio: ['pipe', 'pipe', 'pipe'],
            env: {
                ...process.env,
                PUPPETEER_ARGS: '--no-sandbox --disable-setuid-sandbox'
            }
        });

        if (fs.existsSync(pngPath)) {
            const stats = fs.statSync(pngPath);
            console.log(`[Mermaid] ✓ Generated ${pngName} (${stats.size} bytes)`);
        } else {
            console.warn(`[Mermaid] ✗ PNG not created for diagram #${count}`);
            return match;
        }

        return `![](${pngName})`;

    } catch (err) {
        console.error(`[Mermaid] ✗ Failed to render diagram #${count}: ${err.message}`);
        return match;
    }
});

if (count > 0) {
    fs.writeFileSync(mdFile, newText, 'utf8');
    console.log(`\n[Mermaid] ✓ Processed ${count} diagram(s) in ${mdFile}`);
} else {
    console.log(`\n[Mermaid] ✗ No diagrams found in ${mdFile}`);
}