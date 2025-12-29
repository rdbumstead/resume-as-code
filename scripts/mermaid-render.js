const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const mdFile = process.argv[2];
if (!mdFile || !fs.existsSync(mdFile)) {
    console.error('Error: Markdown file not found');
    process.exit(1);
}

const mdText = fs.readFileSync(mdFile, 'utf8');
const mdDir = path.dirname(mdFile);
const mdBasename = path.basename(mdFile, '.md');

let count = 0;
let newText = mdText.replace(/```mermaid([\s\S]*?)```/g, (match, mermaidCode) => {
    count++;
    const pngName = `${mdBasename}_mermaid_${count}.png`;
    const pngPath = path.join(mdDir, pngName);
    
    try {
        execSync(`mmdc -i - -o "${pngPath}" -b transparent -s 4`, { 
            input: mermaidCode,
            stdio: ['pipe', 'pipe', 'pipe']
        });
        
        console.log(`   [Mermaid] Generated: ${pngName}`);
        
        return `![](${pngName})`;
    } catch (e) {
        console.error(`   [Mermaid] Failed to render diagram ${count}: ${e.message}`);
        return match;
    }
});

if (count > 0) {
    fs.writeFileSync(mdFile, newText, 'utf8');
    console.log(`   [Mermaid] Processed ${count} diagram(s) in ${path.basename(mdFile)}`);
} else {
    console.log(`   [Mermaid] No diagrams found in ${path.basename(mdFile)}`);
}