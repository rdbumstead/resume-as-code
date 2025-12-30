require('dotenv').config();
const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, '../resume.config.json');
let config;

try {
    config = require(configPath);
} catch (e) {
    console.error("Error loading config");
    process.exit(1);
}

const LINKS = config.links || {};
const TARGET_DIR = process.argv[2];

if (!TARGET_DIR) process.exit(1);
if (Object.keys(LINKS).length === 0) process.exit(0);

let stats = {
    filesProcessed: 0,
    linksVerified: 0,
    linksInjected: 0
};

console.log("--- SMART LINK AUDIT ---");

fs.readdir(TARGET_DIR, (err, files) => {
    if (err) return;

    files.forEach(file => {
        if (path.extname(file) === '.md') {
            stats.filesProcessed++;
            processFile(path.join(TARGET_DIR, file), file);
        }
    });

    console.log(`\nAudit Complete:`);
    console.log(`   Files:    ${stats.filesProcessed}`);
    console.log(`   Verified: ${stats.linksVerified}`);
    console.log(`   Injected: ${stats.linksInjected}`);
    console.log("------------------------");
});

function processFile(filePath, fileName) {
    console.log(`📄 Document: ${fileName}`);
    let content = fs.readFileSync(filePath, 'utf8');
    let injectedInFile = 0;
    
    content = content.replace(/\[([\s\S]*?)\]\(([\s\S]*?)\)/g, (match, text, currentUrl) => {
        const cleanText = text.replace(/[*_]/g, '').trim();
        if (!cleanText) return match; 

        const matchedKey = Object.keys(LINKS).find(key => key.toLowerCase() === cleanText.toLowerCase());

        if (matchedKey) {
            const targetUrl = LINKS[matchedKey];
            if (currentUrl.trim() !== targetUrl) {
                console.log(`   [FIXED]      "${cleanText}" (Updated URL)`);
                return `[${text}](${targetUrl})`;
            } else {
                stats.linksVerified++;
                console.log(`   [VERIFIED]   "${cleanText}"`);
                return match; 
            }
        }
        return match;
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
                
                if (keyword === 'Portfolio') return match;

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

                injectedInFile++;
                stats.linksInjected++;
                console.log(`   [INJECTED]   "${match}"`);
                return `[${match}](${LINKS[keyword]})`;
            });
        });
        return textBlock;
    });

    const finalContent = processedParts.join('');
    if (content !== finalContent) {
        fs.writeFileSync(filePath, finalContent, 'utf8');
    }
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}