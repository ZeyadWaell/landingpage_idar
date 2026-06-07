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
5. Deploy directory: `/var/www/idar-landing` (override via workflow `DEPLOY_PATH` if needed).

## Upgrade Node.js on the server (required)

If `node -v` shows v18.x, upgrade before starting the app:

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v   # must be v20.9.0 or higher
sudo npm install -g pm2
```

## First-time server setup

```bash
sudo mkdir -p /var/www/idar-landing
sudo chown -R $USER:$USER /var/www/idar-landing

# Create production env (not overwritten by deploy)
cat > /var/www/idar-landing/.env <<'EOF'
NODE_ENV=production
PORT=3000
EOF
```

Point your reverse proxy (nginx/Caddy) at `http://127.0.0.1:3000`.

## Deploy flow

1. Merge changes into the `production` branch.
2. Workflow checks out code on the self-hosted runner.
3. Files are synced with `rsync` (`.env`, `node_modules`, `.next` are excluded).
4. `npm ci --include=dev` and `npm run build` run on the server (dev deps are required for Tailwind/TypeScript at build time).
5. PM2 reloads the `idar-landing` process via `cicd/ecosystem.config.cjs`.

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
- `DEPLOY_PATH` — server install path (default: `/var/www/idar-landing`)
- `NODE_VERSION` — Node runtime (default: `20.x`)

Edit `cicd/ecosystem.config.cjs` if you change port, memory limits, or instance count.

## Notes

- Server `.env` is preserved across deploys (excluded from rsync).
- API rewrites in `next.config.ts` proxy `/api/nahla/*` to `https://swagger.nahlare.com/*` at runtime — no extra env vars required for that proxy unless you change the target URL.
