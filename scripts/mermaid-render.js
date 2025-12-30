const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const mdFile = process.argv[2];
if (!mdFile || !fs.existsSync(mdFile)) {
    console.error('Error: Markdown file not found');
    process.exit(1);
}

console.log(`\n[Mermaid] Processing: ${mdFile}`);
const mdText = fs.readFileSync(mdFile, 'utf8');
const mdDir = path.dirname(mdFile);
const mdBasename = path.basename(mdFile, '.md');

console.log(`[Mermaid] Directory: ${mdDir}`);
console.log(`[Mermaid] Basename: ${mdBasename}`);

if (mdText.includes('mermaid')) {
    console.log('[Mermaid] ✓ Found "mermaid" keyword in file');
    
    if (mdText.includes('```mermaid')) {
        console.log('[Mermaid] ✓ Found ```mermaid block starter');
    } else {
        console.log('[Mermaid] ✗ Did not find ```mermaid (looking for alternatives)');
        if (mdText.match(/`{3,}mermaid/)) {
            console.log('[Mermaid] Found backticks with mermaid, but spacing might be off');
        }
    }
} else {
    console.log('[Mermaid] ✗ No "mermaid" keyword found anywhere in file');
}

console.log('[Mermaid] File preview (first 500 chars):');
console.log(mdText.substring(0, 500));
console.log('[Mermaid] ---');

let count = 0;
let newText = mdText.replace(/```mermaid([\s\S]*?)```/g, (match, mermaidCode) => {
    count++;
    console.log(`\n[Mermaid] Found diagram #${count}`);
    console.log(`[Mermaid] Code length: ${mermaidCode.length} characters`);
    
    const pngName = `${mdBasename}_mermaid_${count}.png`;
    const pngPath = path.join(mdDir, pngName);
    
    console.log(`[Mermaid] Will create: ${pngPath}`);
    
    try {
        try {
            execSync('mmdc --version', { stdio: 'pipe' });
            console.log('[Mermaid] ✓ mmdc command is available');
        } catch (e) {
            console.error('[Mermaid] ✗ mmdc command not found!');
            throw new Error('mmdc not installed');
        }
        
        execSync(`mmdc -i - -o "${pngPath}" -b transparent -s 4 --puppeteerConfigFile /dev/null`, { 
            input: mermaidCode,
            stdio: ['pipe', 'pipe', 'pipe'],
            env: {
                ...process.env,
                PUPPETEER_ARGS: '--no-sandbox --disable-setuid-sandbox'
            }
        });
        
        if (fs.existsSync(pngPath)) {
            const stats = fs.statSync(pngPath);
            console.log(`[Mermaid] ✓ Generated: ${pngName} (${stats.size} bytes)`);
        } else {
            console.error(`[Mermaid] ✗ PNG file not found after generation!`);
        }
        
        return `![](${pngName})`;
    } catch (e) {
        console.error(`[Mermaid] ✗ Failed to render diagram ${count}:`);
        console.error(`[Mermaid]   Error: ${e.message}`);
        if (e.stderr) {
            console.error(`[Mermaid]   stderr: ${e.stderr.toString()}`);
        }
        return match;
    }
});

if (count > 0) {
    fs.writeFileSync(mdFile, newText, 'utf8');
    console.log(`\n[Mermaid] ✓ Processed ${count} diagram(s) in ${path.basename(mdFile)}`);
    console.log(`[Mermaid] ✓ Updated markdown file with image references`);
    
    console.log('[Mermaid] Files in output directory:');
    const files = fs.readdirSync(mdDir);
    files.forEach(f => {
        if (f.includes('mermaid') || f.includes('.png')) {
            console.log(`  - ${f}`);
        }
    });
} else {
    console.log(`\n[Mermaid] ✗ No diagrams found in ${path.basename(mdFile)}`);
    console.log('[Mermaid] Regex used: /```mermaid([\\s\\S]*?)```/g');
}