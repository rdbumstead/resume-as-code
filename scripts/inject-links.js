const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, '../resume.config.json');
let config;

try {
    config = require(configPath);
} catch (e) {
    console.error("Error: Could not find resume.config.json in root directory.");
    process.exit(1);
}

const LINKS = config.links || {};
const TARGET_DIR = process.argv[2];

if (!TARGET_DIR) {
    console.error("Error: No target directory provided.");
    process.exit(1);
}

console.log(`\n--- SMART LINK AUDIT ---`);

if (Object.keys(LINKS).length === 0) {
    console.log("ℹ️  No links configured in resume.config.json.");
    console.log("   Skipping link injection.");
    process.exit(0);
}

fs.readdir(TARGET_DIR, (err, files) => {
    if (err) return console.error("Could not list files:", err);

    files.forEach(file => {
        if (path.extname(file) === '.md') {
            processFile(path.join(TARGET_DIR, file), file);
        }
    });
    console.log(`---------------------------\n`);
});

function processFile(filePath, fileName) {
    let content = fs.readFileSync(filePath, 'utf8');
    let logs = [];
    
    content = content.replace(/\[([\s\S]*?)\]\(([\s\S]*?)\)/g, (match, text, currentUrl) => {
        const cleanText = text.replace(/[*_]/g, '').trim();
        if (!cleanText) return match; 

        const matchedKey = Object.keys(LINKS).find(key => key.toLowerCase() === cleanText.toLowerCase());

        if (matchedKey) {
            const targetUrl = LINKS[matchedKey];
            if (currentUrl.trim() !== targetUrl) {
                logs.push(`   [UPDATED]    "${cleanText}"\n                -> ${targetUrl}`);
                return `[${text}](${targetUrl})`;
            } else {
                logs.push(`   [VERIFIED]   "${cleanText}"\n                -> ${targetUrl}`);
                return match; 
            }
        } else {
            logs.push(`   [UNMANAGED] "${cleanText}"\n                -> ${currentUrl}`);
            return match;
        }
    });

    const linkSplitRegex = /(\[[^\]]+\]\([^)]+\))/g;
    const parts = content.split(linkSplitRegex);

    const processedParts = parts.map((part) => {
        if (part.match(/^\[.*\]\(.*\)$/)) return part;

        let textBlock = part;
        const sortedKeys = Object.keys(LINKS).sort((a, b) => b.length - a.length);

        sortedKeys.forEach(keyword => {
            const keywordRegex = new RegExp(`\\b(${escapeRegExp(keyword)})\\b`, 'gi');
            
            textBlock = textBlock.replace(keywordRegex, (match, p1, offset, fullString) => {
                let start = offset;
                while (start > 0 && !/\s/.test(fullString[start - 1])) start--;
                let end = offset + match.length;
                while (end < fullString.length && !/\s/.test(fullString[end])) end++;
                const surroundingWord = fullString.substring(start, end);

                if (surroundingWord.includes('://') || 
                    surroundingWord.startsWith('http') || 
                    surroundingWord.includes('.com/') ||
                    surroundingWord.includes('github.com')) {
                    return match;
                }

                if (keyword === 'Portfolio') {
                    const lookback = fullString.substring(Math.max(0, offset - 20), offset);
                    if (/Architect\s*[*_]*\s*$/i.test(lookback)) return match;
                    const lineStart = fullString.lastIndexOf('\n', offset) + 1;
                    const linePrefix = fullString.substring(lineStart, offset);
                    if (/^\s*#/.test(linePrefix)) return match;
                }

                logs.push(`   [INJECTED]   "${match}"\n                -> ${LINKS[keyword]}`);
                return `[${match}](${LINKS[keyword]})`;
            });
        });
        return textBlock;
    });

    const finalContent = processedParts.join('');
    console.log(`Document: ${fileName}`);
    if (logs.length > 0) logs.forEach(log => console.log(log));
    else console.log(`   [INFO] All clean.`);

    if (content !== finalContent) fs.writeFileSync(filePath, finalContent, 'utf8');
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}