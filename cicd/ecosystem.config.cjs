const { execSync } = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");

function resolveNodeInterpreter() {
  // Prefer nvm Node 20+ (common when system apt Node is still v18)
  const nvmDir = path.join(os.homedir(), ".nvm/versions/node");
  if (fs.existsSync(nvmDir)) {
    const versions = fs
      .readdirSync(nvmDir)
      .filter((v) => /^v20\./.test(v))
      .sort()
      .reverse();
    if (versions[0]) {
      return path.join(nvmDir, versions[0], "bin/node");
    }
  }

  // Fall back to whatever `node` is on PATH (must be 20.9+ for Next.js 16)
  try {
    return execSync("command -v node", { encoding: "utf8" }).trim();
  } catch {
    return "node";
  }
}

module.exports = {
  apps: [
    {
      name: "idar-landing",
      cwd: "/var/www/idar-landing",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      interpreter: resolveNodeInterpreter(),
      exec_mode: "fork",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};
