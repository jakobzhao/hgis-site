#!/usr/bin/env bash
# publish.sh — rebuild dist/, commit, and push to origin/main.
#
# How it works:
#   - Astro is a static site, so dist/ is committed and the server's
#     deploy/pull.sh just `git pull`s every minute. That means anything
#     that should go live has to be in main, with dist/ rebuilt against
#     the current src/. This script wraps that rhythm.
#   - Loads PUBLIC_GA_ID from .env automatically via Astro; if the file
#     is missing the GA snippet is silently stripped from the build,
#     so the script warns up front instead of letting analytics drop.
#   - Runs `astro build`, then stages every modified/untracked file,
#     commits with the supplied message, and pushes to origin/main.
#   - Server picks up the new commit within ~60 seconds.
#
# Usage:
#   scripts/publish.sh "Add new FH entry: …"
#   npm run deploy -- "Add new FH entry: …"
#
# Flags:
#   -n, --no-build   Skip `astro build` (commit + push existing dist/).
#   -d, --dry-run    Show what would be staged without committing.
#   -h, --help       Show this header.

set -euo pipefail

REPO_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." &>/dev/null && pwd)"
cd "$REPO_DIR"

SKIP_BUILD=0
DRY_RUN=0
while [[ $# -gt 0 ]]; do
  case "$1" in
    -n|--no-build) SKIP_BUILD=1; shift ;;
    -d|--dry-run)  DRY_RUN=1;    shift ;;
    -h|--help)     sed -n '2,24p' "$0"; exit 0 ;;
    --)            shift; break ;;
    -*)            echo "Unknown flag: $1" >&2; exit 2 ;;
    *)             break ;;
  esac
done

if [[ $DRY_RUN -eq 0 && $# -lt 1 ]]; then
  echo "Usage: scripts/publish.sh [-n|--no-build] \"Commit message\"" >&2
  exit 2
fi
MSG="${1:-}"

# .env / GA-ID sanity check. The build will succeed without it, but the
# resulting dist/ will have no gtag tags — silent analytics loss is
# worse than a noisy build, so flag it before we go any further.
if [[ ! -f .env ]] || ! grep -q '^PUBLIC_GA_ID=G-' .env 2>/dev/null; then
  echo "⚠  .env missing or PUBLIC_GA_ID not set — build will omit GA tracking." >&2
  echo "   Add PUBLIC_GA_ID=G-XXXXXXXXXX to .env, or pass --no-build to skip rebuild." >&2
  if [[ $SKIP_BUILD -eq 0 ]]; then
    read -r -p "   Continue anyway? [y/N] " yn
    [[ "$yn" =~ ^[Yy]$ ]] || { echo "aborted."; exit 1; }
  fi
fi

# Refuse to push if there are upstream commits we haven't pulled — this
# would otherwise reject on push and leave a half-finished commit on the
# local branch.
git fetch --quiet origin main
LOCAL="$(git rev-parse @)"
REMOTE="$(git rev-parse @{u} 2>/dev/null || echo "$LOCAL")"
BASE="$(git merge-base @ @{u} 2>/dev/null || echo "$LOCAL")"
if [[ "$LOCAL" != "$REMOTE" && "$REMOTE" != "$BASE" ]]; then
  echo "⚠  origin/main has commits we don't have. Run 'git pull --ff-only' first." >&2
  exit 1
fi

if [[ $SKIP_BUILD -eq 0 ]]; then
  echo "→ astro build"
  npx astro build
fi

if [[ -z "$(git status --porcelain)" ]]; then
  echo "✓ Nothing to commit — dist/ already matches src/ on origin/main."
  exit 0
fi

echo
echo "→ Working tree:"
git status --short
echo

if [[ $DRY_RUN -eq 1 ]]; then
  echo "(dry-run — nothing committed)"
  exit 0
fi

git add -A
git commit -m "$MSG

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
git push

echo
echo "✓ Pushed to origin/main. hgis.uw.edu updates within ~60s."
