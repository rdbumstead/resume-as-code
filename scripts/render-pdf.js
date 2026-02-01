const { execSync } = require('child_process');
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

const MAIN_FONT = "Liberation Serif";
const SANS_FONT = "Liberation Sans";
const HEAD_INCLUDES = "-V \"header-includes=\\usepackage{enumitem} \\usepackage[none]{hyphenat} \\raggedright \\setlist{nosep,leftmargin=*}\"";

const filesToRender = [
    { md: 'Resume_Recruiter.md', pdf: `${namePrefix}_Resume_Recruiter.pdf` },
    { md: 'Resume.md', pdf: `${namePrefix}_Resume.pdf` },
    { md: 'Resume_Comprehensive.md', pdf: `${namePrefix}_Resume_Comprehensive.pdf` },
    { md: 'Resume_UX.md', pdf: `${namePrefix}_Resume_UX.pdf` },
    { md: 'PlatformEngineer.md', pdf: `${namePrefix}_PlatformEngineer.pdf` }
];

console.log('Rendering PDFs with Pandoc...');

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
        '--pdf-engine=xelatex',
        `-o "${outputPath}"`
    ].join(' ');

    try {
        execSync(command, { stdio: 'inherit' });
        console.log(`Success: ${file.pdf}`);
    } catch (e) {
        console.error(`Failed to render ${file.pdf}`);
    }
});
