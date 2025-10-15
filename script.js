// script.js
// Spinnergy Project Verifier & Bootstrapper

import fs from "fs";
import path from "path";
import { execSync } from "child_process";

console.log("🌀 Spinnergy Project Bootstrapper");
console.log("Checking folder structure...\n");

const dirs = ["client", "server"];
const missing = dirs.filter(d => !fs.existsSync(d));

if (missing.length) {
  console.error("❌ Missing folders:", missing.join(", "));
  process.exit(1);
}

console.log("✅ Folder structure looks good!");
console.log("Verifying essential files...\n");

const essentials = [
  "client/package.json",
  "client/src",
  "server/package.json",
  "server/server.js"
];

essentials.forEach(file => {
  if (!fs.existsSync(file)) {
    console.warn(`⚠️  Missing file: ${file}`);
  } else {
    console.log(`✅ Found: ${file}`);
  }
});

console.log("\n🔧 Installing dependencies...");
try {
  execSync("npm install", { stdio: "inherit" });
  execSync("cd server && npm install", { stdio: "inherit" });
  execSync("cd client && npm install", { stdio: "inherit" });
  console.log("\n✅ All dependencies installed successfully!");
} catch (err) {
  console.error("❌ Dependency installation failed:", err);
  process.exit(1);
}

console.log("\n🚀 To start development:");
console.log("   npm run dev   # run backend + frontend together");
console.log("   npm run build # build frontend for deployment");
console.log("\n✨ Ready for Render deployment!");
