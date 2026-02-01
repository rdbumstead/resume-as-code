const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const SOURCE_DIR = path.join(__dirname, '../src');
const DIST_DIR = path.join(__dirname, '../dist');

console.log('Starting Local Build...');

// 1. Prepare Directory
if (fs.existsSync(DIST_DIR)) {
    console.log('Cleaning dist directory...');
    fs.rmSync(DIST_DIR, { recursive: true, force: true });
}
fs.mkdirSync(DIST_DIR);

// 2. Copy Source Files
console.log('Copying source files...');
const files = fs.readdirSync(SOURCE_DIR);
files.forEach(file => {
    if (path.extname(file) === '.md') {
        fs.copyFileSync(path.join(SOURCE_DIR, file), path.join(DIST_DIR, file));
    }
});

// Helper to run scripts
const run = (script, args = []) => {
    const cmd = `node ${path.join(__dirname, script)} ${args.join(' ')}`;
    console.log(`Running ${script}...`);
    try {
        execSync(cmd, { stdio: 'inherit' });
    } catch (e) {
        console.error(`Failed Node Script: ${script}`);
        process.exit(1);
    }
};

// 3. Process Files (In-Place in DIST)
run('update-stats.js', [`"${DIST_DIR}"`]);
run('inject-links.js', [`"${DIST_DIR}"`]);

// 4. Assemble Headers
// Note: assemble.js takes (TARGET_DIR, SOURCE_FILE, OUTPUT_FILE)
// We are reading from DIST and writing back to DIST (overwriting)
console.log('Assembling resumes...');
files.forEach(file => {
    if (path.extname(file) === '.md') {
        // assemble.js: TARGET_DIR SOURCE_FILE OUTPUT_FILE
        const sourcePath = path.join(DIST_DIR, file);
        run('assemble.js', [`"${DIST_DIR}"`, `"${sourcePath}"`, `"${file}"`]);
    }
});

// 5. Render Diagrams
console.log('Rendering diagrams...');
files.forEach(file => {
    if (path.extname(file) === '.md') {
        const filePath = path.join(DIST_DIR, file);
        run('mermaid-render.js', [`"${filePath}"`]);
    }
});

// 6. Final PDF Render
run('render-pdf.js');

console.log('\nBuild Complete! Artifacts are in /dist and /pdf');
