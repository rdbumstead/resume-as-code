const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Determine correct path separators for the current OS
const SEP = path.sep;

const FONTS_DIR = path.join(__dirname, `..${SEP}fonts`);
const TEMP_DIR = path.join(__dirname, `..${SEP}temp_fonts`);
const LIBERATION_DIR = path.join(FONTS_DIR, 'liberation');

// Ensure directories exist
if (!fs.existsSync(FONTS_DIR)) fs.mkdirSync(FONTS_DIR);
// Ensure clean temp directory
if (fs.existsSync(TEMP_DIR)) fs.rmSync(TEMP_DIR, { recursive: true, force: true });
fs.mkdirSync(TEMP_DIR);

/**
 * Check if Liberation fonts are already installed in our local folder.
 * Heuristic: Check for LICENSE and at least one known TTF.
 */
const areFontsInstalled = () => {
    if (!fs.existsSync(LIBERATION_DIR)) return false;
    const required = ['LICENSE', 'LiberationSerif-Regular.ttf', 'LiberationSans-Regular.ttf'];
    for (const file of required) {
        if (!fs.existsSync(path.join(LIBERATION_DIR, file))) return false;
    }
    return true;
};

const downloadFile = (url, dest) => {
    console.log(`Downloading ${url}...`);
    try {
        // -L follows redirects, -o output
        execSync(`curl -L -o "${dest}" "${url}"`, { stdio: 'inherit' });
    } catch (e) {
        console.error(`Failed to download ${url}`);
        throw e;
    }
};

const extract = (archivePath, extractTo) => {
    console.log(`Extracting ${path.basename(archivePath)}...`);
    if (!fs.existsSync(extractTo)) fs.mkdirSync(extractTo, { recursive: true });
    try {
        // tar -xf works on most modern systems including Windows (bsdtar)
        execSync(`tar -xf "${archivePath}" -C "${extractTo}"`, { stdio: 'inherit' });
    } catch (e) {
        console.error("Extraction failed.");
        throw e;
    }
};

const main = () => {
    try {
        // 1. Check if already exists
        if (areFontsInstalled()) {
            console.log("Liberation fonts are already present in /fonts/liberation.");
            console.log("Skipping download.");
        } else {
            console.log("Downloading Liberation Fonts...");

            // Hardcoded strict version for deterministic builds
            const url = 'https://github.com/liberationfonts/liberation-fonts/files/7261482/liberation-fonts-ttf-2.1.5.tar.gz';
            const archive = path.join(TEMP_DIR, 'liberation.tar.gz');
            
            downloadFile(url, archive);
            extract(archive, TEMP_DIR);

            // The specific folder name inside the tarball
            const sourceDir = path.join(TEMP_DIR, 'liberation-fonts-ttf-2.1.5');
            
            if (!fs.existsSync(LIBERATION_DIR)) fs.mkdirSync(LIBERATION_DIR, { recursive: true });

            console.log(`Installing to ${LIBERATION_DIR}...`);
            
            if (fs.existsSync(sourceDir)) {
                 const items = fs.readdirSync(sourceDir);
                 items.forEach(item => {
                     // Filter for TTF and License files
                     const lower = item.toLowerCase();
                     if (item.endsWith('.ttf') || lower.includes('license') || lower.includes('copying') || lower.includes('authors')) {
                         console.log(`Copying ${item}...`);
                         fs.copyFileSync(path.join(sourceDir, item), path.join(LIBERATION_DIR, item));
                     }
                 });
            } else {
                 console.error(`Could not find extracted folder: ${sourceDir}`);
                 console.log("Contents of temp:", fs.readdirSync(TEMP_DIR));
                 throw new Error("Extraction structure mismatch");
            }

            console.log("Cleaning up...");
            fs.rmSync(TEMP_DIR, { recursive: true, force: true });
            
            console.log(`Liberation fonts downloaded successfully to ${LIBERATION_DIR}`);
        }

        // 2. Instructions (Always show this to be helpful)
        console.log("\nNEXT STEPS: Install the fonts to fix your local build:\n");
        
        switch (process.platform) {
            case 'win32':
                console.log("   [WINDOWS]");
                console.log(`   1. Open the '${path.join('fonts', 'liberation')}' folder.`);
                console.log("   2. Select all .ttf files (Ctrl+A).");
                console.log("   3. Right-click and choose 'Install'.");
                break;
            case 'darwin':
                console.log("   [MACOS]");
                console.log("   1. Open 'Font Book'.");
                console.log(`   2. Drag the .ttf files from '${path.join('fonts', 'liberation')}' into Font Book.`);
                console.log("   OR copy them to ~/Library/Fonts/");
                break;
            case 'linux':
                console.log("   [LINUX]");
                console.log("   1. Create directory: mkdir -p ~/.local/share/fonts");
                console.log(`   2. Copy fonts: cp ${path.join('fonts', 'liberation', '*.ttf')} ~/.local/share/fonts/`);
                console.log("   3. Refresh cache: fc-cache -f -v");
                break;
            default:
                console.log("   [UNKNOWN OS]");
                console.log(`   Please install the .ttf files in '${LIBERATION_DIR}' according to your OS instructions.`);
        }
        console.log("\n");

    } catch (e) {
        console.error("Error:", e);
        // Ensure cleanup on failure
        if (fs.existsSync(TEMP_DIR)) {
             try { fs.rmSync(TEMP_DIR, { recursive: true, force: true }); } catch (ignore) {}
        }
        process.exit(1);
    }
};

main();
