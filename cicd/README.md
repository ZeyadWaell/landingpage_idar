# Idar Landing Page — CI/CD

Adapted from the Nahla production pipeline (`.github/workflows/main.yml` in NahlarePrivate).

## Overview

| Workflow | Trigger | Runner | Purpose |
|----------|---------|--------|---------|
| `ci.yml` | Push / PR to `master`, `main`, or `production` | GitHub-hosted (`ubuntu-latest`) | Lint + production build |
| `deploy-production.yml` | Push to `production` | Self-hosted | Rsync, build on server, PM2 reload |

## Server prerequisites

1. **Self-hosted GitHub Actions runner** registered on the production server.
2. **Node.js 20.9+** installed **system-wide** (Next.js 16 will not run on Node 18; PM2 uses the system `node`, not only the Actions job Node).
3. **PM2** (`npm i -g pm2`).
4. **rsync** available on the runner host.
5. A PM2 process named `idar-landing` already running from its deploy directory (see first-time setup). The runner needs no sudo: the workflow deploys to that process's working directory.
6. The runner carries the `idar-01` label.

## Upgrade Node.js on the server (required)

Next.js 16 needs **Node 20.9+**. If `node -v` shows v18.x, install Node 20 via **nvm** (works even when apt has repo conflicts):

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

nvm install 20
nvm alias default 20
node -v   # must be v20.9.0 or higher

npm install -g pm2
pm2 update
```

`cicd/ecosystem.config.cjs` auto-picks the nvm Node 20 binary for PM2.

## First-time server setup

```bash
git clone https://github.com/ZeyadWaell/landingpage_idar.git ~/apps/idar-landing
cd ~/apps/idar-landing

# Create production env (not overwritten by deploy)
cat > .env <<'EOF'
NODE_ENV=production
PORT=3000
EOF

npm ci --include=dev
NODE_ENV=production npm run build
pm2 start cicd/ecosystem.config.cjs
pm2 save
```

Point your reverse proxy (Apache/nginx/Caddy) at `http://127.0.0.1:3000`.

## Deploy flow

1. Merge changes into the `production` branch.
2. Workflow checks out code on the self-hosted runner and asks PM2 where `idar-landing` runs. It stops here if the process is missing.
3. Files are synced with `rsync` (`.env`, `node_modules`, `.next` are excluded).
4. `npm ci --include=dev` and `npm run build` run on the server (dev deps are required for Tailwind/TypeScript at build time).
5. PM2 restarts the `idar-landing` process, keeping its port and working directory.

## Branch strategy

- `master` / `main` — development; runs CI only.
- `production` — deploy branch; runs CI (on push) and CD.

Create the production branch when ready:

```bash
git checkout -b production
git push -u origin production
```

## Customization

Edit `.github/workflows/deploy-production.yml`:

- `APP_NAME` — PM2 process name (default: `idar-landing`)
- `NODE_VERSION` — Node runtime (default: `20.x`)

Edit `cicd/ecosystem.config.cjs` if you change port, memory limits, or instance count.

## Notes

- Server `.env` is preserved across deploys (excluded from rsync).
- API rewrites in `next.config.ts` proxy `/api/nahla/*` to `https://swagger.nahlare.com/*` at runtime — no extra env vars required for that proxy unless you change the target URL.
