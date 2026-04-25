#!/usr/bin/env bash
# pull.sh — pull latest commits and let Apache serve the new dist/.
#
# Designed to be run from cron every minute. Uses flock to prevent
# concurrent runs (slow networks → overlapping pulls). Logs to
# deploy/pull.log next to itself.
#
# Install (on the server):
#   crontab -e
#   * * * * * /home/USER/hgis-site/deploy/pull.sh

set -euo pipefail

# Resolve the repo root regardless of where cron invokes the script from.
SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &>/dev/null && pwd)"
REPO_DIR="$(dirname -- "$SCRIPT_DIR")"
LOG="$SCRIPT_DIR/pull.log"
LOCK="$SCRIPT_DIR/.pull.lock"

# Single-instance via flock — exit silently if a previous run is still going.
exec 9>"$LOCK"
flock -n 9 || exit 0

cd "$REPO_DIR"

before="$(git rev-parse HEAD 2>/dev/null || echo none)"
git fetch --quiet origin main
after="$(git rev-parse origin/main)"

if [[ "$before" == "$after" ]]; then
  exit 0
fi

# Fast-forward only — refuses to clobber local edits.
if git merge --ff-only --quiet origin/main; then
  printf '[%s] %s -> %s\n' "$(date -u +%FT%TZ)" "${before:0:7}" "${after:0:7}" >> "$LOG"
else
  printf '[%s] FF failed; manual fix needed (HEAD=%s, origin=%s)\n' \
    "$(date -u +%FT%TZ)" "${before:0:7}" "${after:0:7}" >> "$LOG"
  exit 1
fi
