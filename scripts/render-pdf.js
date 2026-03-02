const { execSync, spawnSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const DIST_DIR = path.join(__dirname, '../dist');
const PDF_DIR = DIST_DIR;
const SCRIPTS_DIR = __dirname;

// Ensure PDF directory exists
if (!fs.existsSync(PDF_DIR)) {
    fs.mkdirSync(PDF_DIR);
}

// Get the name prefix
let namePrefix = 'Resume';
try {
    namePrefix = execSync(`node "${path.join(SCRIPTS_DIR, 'get-name.js')}"`).toString().trim() || 'Resume';
} catch (e) {
    console.warn('Could not determine name prefix, using default "Resume"');
}

const MAIN_FONT = process.env.RESUME_MAIN_FONT || "Times New Roman";
const SANS_FONT = process.env.RESUME_SANS_FONT || "Arial";
const HEAD_INCLUDES = "-V \"header-includes=\\usepackage{enumitem} \\usepackage[none]{hyphenat} \\usepackage{titlesec} \\raggedright \\setlist{nosep,leftmargin=*} \\titlespacing*{\\section}{0pt}{*0.8}{*0.4} \\titlespacing*{\\subsection}{0pt}{*0.7}{*0.35} \\titlespacing*{\\subsubsection}{0pt}{*0.6}{*0.3}\"";

function hasCommand(command) {
    const lookup = process.platform === 'win32' ? 'where' : 'which';
    const result = spawnSync(lookup, [command], { stdio: 'ignore' });
    return result.status === 0;
}

function resolvePdfEngine() {
    const engines = ['xelatex', 'lualatex'];
    const engineOnPath = engines.find(hasCommand);

    if (engineOnPath) {
        return engineOnPath;
    }

    if (process.platform === 'win32') {
        const localAppData = process.env.LOCALAPPDATA || '';
        const candidates = [
            path.join(localAppData, 'Programs', 'MiKTeX', 'miktex', 'bin', 'x64', 'xelatex.exe'),
            path.join(localAppData, 'Programs', 'MiKTeX', 'miktex', 'bin', 'x64', 'lualatex.exe'),
            'C:\\Program Files\\MiKTeX\\miktex\\bin\\x64\\xelatex.exe',
            'C:\\Program Files\\MiKTeX\\miktex\\bin\\x64\\lualatex.exe'
        ];

        const installedEngine = candidates.find(fs.existsSync);
        if (installedEngine) {
            return installedEngine;
        }
    }

    console.error('No LaTeX PDF engine found. Install TeX Live or MiKTeX and ensure xelatex or lualatex is available.');
    process.exit(1);
}

const filesToRender = [
    { md: 'Resume_Recruiter.md', pdf: `${namePrefix}_Resume_Recruiter.pdf` },
    { md: 'Resume.md', pdf: `${namePrefix}_Resume.pdf` },
    { md: 'Resume_Comprehensive.md', pdf: `${namePrefix}_Resume_Comprehensive.pdf` },
    { md: 'Resume_UX.md', pdf: `${namePrefix}_Resume_UX.pdf` },
    { md: 'PlatformEngineer.md', pdf: `${namePrefix}_PlatformEngineer.pdf` }
];

console.log('Rendering PDFs with Pandoc...');
const pdfEngine = resolvePdfEngine();
console.log(`Using PDF engine: ${pdfEngine}`);
let failures = 0;

filesToRender.forEach(file => {
    const inputPath = path.join(DIST_DIR, file.md);
    const outputPath = path.join(PDF_DIR, file.pdf);

    if (!fs.existsSync(inputPath)) {
        console.warn(`Skipping ${file.md}: Source file not found in dist/`);
        return;
    }

    console.log(`Building ${file.pdf}...`);

    const command = [
        'pandoc',
        `"${inputPath}"`,
        '-V geometry:margin=0.5in',
        `-V mainfont="${MAIN_FONT}"`,
        `-V sansfont="${SANS_FONT}"`,
        '-V fontsize=10pt',
        '-V linestretch=1.15',
        HEAD_INCLUDES,
        `--resource-path="${DIST_DIR}"`,
        '-V linkcolor=blue -V urlcolor=blue',
        `--pdf-engine="${pdfEngine}"`,
        `-o "${outputPath}"`
    ].join(' ');

    try {
        execSync(command, { stdio: 'inherit' });
        console.log(`Success: ${file.pdf}`);
    } catch (e) {
        failures += 1;
        console.error(`Failed to render ${file.pdf}`);
    }
});

if (failures > 0) {
    console.error(`PDF rendering failed for ${failures} file(s).`);
    process.exit(1);
}
