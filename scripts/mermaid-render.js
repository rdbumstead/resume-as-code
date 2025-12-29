const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const mdFile = process.argv[2];
const mdText = fs.readFileSync(mdFile, 'utf8');

let count = 0;

let newText = mdText.replace(/```mermaid([\s\S]*?)```/g, (match, mermaidCode) => {
    count++;

    const pngFile = mdFile.replace('.md', `_mermaid_${count}.png`);
    
    try {
        execSync(`mmdc -i - -o "${pngFile}" -b transparent -s 4`, { input: mermaidCode });
        console.log(`Generated: ${path.basename(pngFile)}`);
        return `![](${path.basename(pngFile)})`;
    } catch (e) {
        console.error("Mermaid generation failed:", e.message);
        return match;
    }
});

fs.writeFileSync(mdFile, newText, 'utf8');
console.log(`Processed ${count} Mermaid diagram(s) in ${mdFile}`);