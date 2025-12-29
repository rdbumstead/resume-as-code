require('dotenv').config();

const first = process.env.RESUME_FIRST_NAME || "Resume";
const last = process.env.RESUME_LAST_NAME || "";

console.log(`${first}${last}`);