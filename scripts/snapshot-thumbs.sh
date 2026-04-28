#!/usr/bin/env bash
# Generate per-entry thumbnails for the Friday Harbor index.
#
# How it works:
#   - The dev server (or any local preview) must be running on $DEV_URL.
#   - Each entry is loaded with ?thumb=1, which triggers a thumb-mode
#     CSS rule in FridayHarborLayout that hides everything except the
#     figure stage and sizes it to fill the viewport.
#   - Headless Chrome captures a 1400 × (840+87) PNG. The +87 is the
#     reserved-but-invisible chrome that --headless=new still steals
#     from window.innerHeight.
#   - scripts/crop-png-top.py crops to the top 1400 × 840 (5:3 aspect,
#     matching the index card thumbnail box). We use Python here, not
#     `sips`, because sips fills out-of-bounds areas with black —
#     which looks like a tar bar at the top of every thumbnail.
#
# Usage:
#   npm run snapshots                            # all entries
#   scripts/snapshot-thumbs.sh                   # all entries
#   scripts/snapshot-thumbs.sh <slug>            # one entry
#   DEV_URL=http://localhost:4322 npm run snapshots   # custom dev port
#
# Requirements:
#   - macOS Google Chrome at /Applications/Google Chrome.app
#   - Python 3 (ships with macOS)
#   - The dev server must already be running (`npm run dev`).

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
DEV_URL="${DEV_URL:-http://localhost:4324}"
OUT_DIR="public/data/thumbs"
WIDTH=1400
HEIGHT=840
# Headless Chrome reserves ~87px of vertical chrome even in --headless=new
# (the URL bar shows up as zero-height but still steals from innerHeight).
# Capture taller, then crop the top WIDTH×HEIGHT region with sips.
CAPTURE_HEIGHT=$((HEIGHT + 87))
WAIT_MS=14000  # virtual-time-budget — D3 + jsdelivr + simple-icons fetches

if [ ! -x "$CHROME" ]; then
  echo "Chrome not found at: $CHROME" >&2
  exit 1
fi

mkdir -p "$OUT_DIR"

# Source the slug list from the registry. Keep this small enough to
# parse with grep — the registry is hand-edited and append-only, so
# no JSON parser is needed.
ALL_SLUGS=$(grep -oE 'slug:[[:space:]]*"[^"]+"' src/data/friday-harbor.ts | sed -E 's/.*"([^"]+)".*/\1/')

if [ $# -gt 0 ]; then
  SLUGS="$1"
else
  SLUGS="$ALL_SLUGS"
fi

for slug in $SLUGS; do
  url="$DEV_URL/friday-harbor/$slug/?thumb=1"
  out="$OUT_DIR/$slug.png"
  tmp="$(mktemp -t fh-thumb).png"
  echo "→ $slug"
  "$CHROME" \
    --headless=new \
    --disable-gpu \
    --hide-scrollbars \
    --no-default-browser-check \
    --no-first-run \
    --disable-extensions \
    --virtual-time-budget=$WAIT_MS \
    --window-size=$WIDTH,$CAPTURE_HEIGHT \
    --screenshot="$tmp" \
    "$url" \
    >/dev/null 2>&1
  if [ ! -f "$tmp" ]; then
    echo "   FAILED" >&2
    continue
  fi
  # Crop the top WIDTH×HEIGHT slice. We don't use sips here because
  # sips fills out-of-bounds regions with black, which leaves a black
  # band at the top of the thumbnail. The pure-stdlib Python helper
  # below reads the source PNG and emits only the top N rows — no
  # padding, no fill.
  python3 "$SCRIPT_DIR/crop-png-top.py" "$tmp" "$out" $WIDTH $HEIGHT
  rm -f "$tmp"
  if [ -f "$out" ]; then
    echo "   wrote $out ($(du -h "$out" | cut -f1))"
  else
    echo "   FAILED (crop)" >&2
  fi
done
