const path = require('path');

// Safe Config Load
const configPath = path.join(__dirname, '../resume.config.json');
let config;

try {
    config = require(configPath);
} catch (e) {
    // Fallback if config is missing (safety net)
    console.log("Resume"); 
    process.exit(0);
}

// Construct "FirstNameLastName" (e.g., RyanBumstead)
const first = config.meta?.firstName || "My";
const last = config.meta?.lastName || "Resume";

// Output clean string for Batch file to read
console.log(`${first}${last}`);