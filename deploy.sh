#!/usr/bin/env bash
# Build + deploy vinhomes.space (Worker assets) and vinhomes-space.pages.dev. Needs wrangler login (done 2026-09-28).
set -euo pipefail
cd /workspace/vinhomes-space
cp /workspace/game-bds/index.html /workspace/game-bds/engine.js public/game/ && cp /workspace/game-bds/data/game-data.json public/game/data/
mkdir -p public/game/img && cp /workspace/game-bds/img/*.svg public/game/img/
npm run build
npx -y wrangler@3 pages deploy out --project-name vinhomes-space --branch main --commit-dirty=true
# Worker vinhomes-space: assets + /api/ev, /api/stats (D1 vinhomes-game-stats); source in worker/
npx -y wrangler@3 deploy --config worker/wrangler.toml
