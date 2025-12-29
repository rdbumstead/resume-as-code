const https = require('https');
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

const GITHUB_USER = config.meta?.githubUser;
const REPO_NAME = config.meta?.repoName;
const ADR_PATH = config.meta?.adrPath;
const TARGET_DIR = process.argv[2] || '.';

if (!GITHUB_USER || !REPO_NAME || !ADR_PATH) {
    console.log(`\n--- GITHUB STATS UPDATE ---`);
    console.log("ℹ️  Missing GitHub/ADR config in resume.config.json.");
    console.log("   Skipping dynamic stats update.");
    process.exit(0);
}

const options = {
    hostname: 'api.github.com',
    path: `/repos/${GITHUB_USER}/${REPO_NAME}/contents/${ADR_PATH}`,
    method: 'GET',
    headers: {
        'User-Agent': 'Resume-Builder-Script',
        'Accept': 'application/vnd.github.v3+json'
    }
};

console.log(`\n--- GITHUB STATS UPDATE ---`);
console.log(`Fetching ADR count from: ${GITHUB_USER}/${REPO_NAME}/${ADR_PATH}...`);

const req = https.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        if (res.statusCode === 200) {
            try {
                const files = JSON.parse(data);
                const adrCount = files.filter(item => item.type === 'file').length;
                console.log(`✅ GitHub API Success: Found ${adrCount} ADRs.`);
                updateResumes(adrCount);
            } catch (error) {
                console.error("Error parsing GitHub response:", error.message);
            }
        } else {
            console.error(`GitHub API Error: ${res.statusCode} - ${res.statusMessage}`);
        }
    });
});

req.on('error', (error) => { console.error("Network error:", error.message); });
req.end();

function updateResumes(count) {
    console.log(`Scanning files in: ${path.resolve(TARGET_DIR)}`);
    fs.readdir(TARGET_DIR, (err, files) => {
        if (err) return console.error("Could not list files:", err);

        files.forEach(file => {
            if (path.extname(file) === '.md') {
                const filePath = path.join(TARGET_DIR, file);
                let content = fs.readFileSync(filePath, 'utf8');
                const regex = /(\d+)(\s*\[?Architectural Decision Records)/gi;

                if (content.match(regex)) {
                    const newContent = content.replace(regex, `${count}$2`);
                    if (content !== newContent) {
                        fs.writeFileSync(filePath, newContent, 'utf8');
                        console.log(`UPDATED: ${file} (Count set to ${count})`);
                    } else {
                        console.log(`SKIPPED: ${file} (Count was already ${count})`);
                    }
                }
            }
        });
        console.log(`---------------------------\n`);
    });
}