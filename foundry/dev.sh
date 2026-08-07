#!/usr/bin/env bash
#
# Launch a local Foundry VTT v14 dev instance from this repo.
#
#   ./dev.sh          # port 30000
#   ./dev.sh 30001    # second instance on another port
#
# App goes in ./app (unzipped Foundry "Node.js" release).
# User data goes in ./data (worlds, systems, modules, Config, Logs).
# Both are gitignored. See README.md.

set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP="$HERE/app"
DATA="$HERE/data"
PORT="${1:-30000}"

# --- Resolve Node 24 ---------------------------------------------------------
# Foundry's install guide: Node 24 is required for v14 and above; v13 and below
# cap at 22. The two are mutually exclusive, so pin the major rather than trust
# whatever `node` happens to mean in the current shell.
#
# The exact floor comes from the release's own package.json ("engines": {"node":
# ">=24.13.1 <25.0.0"} for 14.365), so this tracks whatever build is unzipped
# rather than a number hardcoded here. Major 24 alone is NOT sufficient: 24.11.x
# is below the floor and will fail.
NODE_MIN="24.13.1"
if [[ -f "$APP/package.json" ]]; then
  detected="$(sed -n 's/.*"node"[[:space:]]*:[[:space:]]*">=\([0-9][0-9.]*\).*/\1/p' "$APP/package.json" | head -1)"
  [[ -n "$detected" ]] && NODE_MIN="$detected"
fi

# Accept a candidate only if major is 24 AND version >= NODE_MIN.
version_ok() {
  local v="$1"
  [[ "${v%%.*}" == "24" ]] || return 1
  [[ "$(printf '%s\n%s\n' "$NODE_MIN" "$v" | sort -V | head -1)" == "$NODE_MIN" ]]
}

# Candidates in priority order. Homebrew's node@24 is keg-only (not symlinked
# into /opt/homebrew/bin), so it has to be named explicitly. A bare `node` from
# PATH is checked last and only accepted if it clears the floor — this
# deliberately rejects Homebrew's current `node` (26.x) and editor-bundled
# runtimes that are on PATH here but absent in a plain terminal.
NODE_BIN=""
REJECTED=()
for candidate in \
  "${FOUNDRY_NODE:-}" \
  "/opt/homebrew/opt/node@24/bin/node" \
  "/usr/local/opt/node@24/bin/node" \
  "$HOME/.local/share/fnm/node-versions/v24"*/installation/bin/node \
  "$HOME/.nvm/versions/node/v24"*/bin/node \
  "$(command -v node 2>/dev/null || true)"
do
  [[ -n "$candidate" && -x "$candidate" ]] || continue
  cver="$("$candidate" -p 'process.versions.node' 2>/dev/null || true)"
  [[ -n "$cver" ]] || continue
  if version_ok "$cver"; then
    NODE_BIN="$candidate"
    break
  fi
  REJECTED+=("$candidate ($cver)")
done

if [[ -z "$NODE_BIN" ]]; then
  FVER="$(sed -n 's/.*"version"[[:space:]]*:[[:space:]]*"\([0-9][^"]*\)".*/\1/p' "$APP/package.json" 2>/dev/null | head -1)"
  echo "error: no suitable Node found. Foundry ${FVER:-v14} requires Node >=$NODE_MIN and <25." >&2
  echo "       (v13 and below cap at Node 22 — the two lines are mutually exclusive.)" >&2
  echo >&2
  echo "Install it:" >&2
  echo "  brew install node@24" >&2
  echo >&2
  echo "node@24 is keg-only, so it won't land on your PATH — this script looks for it" >&2
  echo "at /opt/homebrew/opt/node@24/bin/node directly. Override with:" >&2
  echo "  FOUNDRY_NODE=/path/to/node ./dev.sh" >&2
  if [[ ${#REJECTED[@]} -gt 0 ]]; then
    echo >&2
    echo "Rejected as out of range:" >&2
    printf '  %s\n' "${REJECTED[@]}" >&2
  fi
  exit 1
fi

# --- Locate the entry point --------------------------------------------------
# The filename has moved between major versions (main.js / main.mjs) and the
# zip's internal layout varies, so probe instead of hardcoding.
ENTRY=""
for candidate in \
  "$APP/resources/app/main.js" \
  "$APP/resources/app/main.mjs" \
  "$APP/main.js" \
  "$APP/main.mjs"
do
  if [[ -f "$candidate" ]]; then
    ENTRY="$candidate"
    break
  fi
done

if [[ -z "$ENTRY" ]]; then
  echo "error: no Foundry entry point found under $APP" >&2
  echo >&2
  echo "Download the *Node.js* build (not macOS) of Foundry 14.365 from" >&2
  echo "https://foundryvtt.com/me/licenses and unzip it into ./app:" >&2
  echo >&2
  echo "  unzip ~/Downloads/FoundryVTT-Node-14.365.zip -d \"$APP\"" >&2
  echo >&2
  echo "Then re-run this script. Contents of ./app right now:" >&2
  ls -A "$APP" >&2 || true
  exit 1
fi

mkdir -p "$DATA/Config"

# --- Server options ----------------------------------------------------------
# v14.365 parses only these CLI flags: --adminKey, --adminPassword, --dataPath,
# --background, --noupdate. There is NO --port and NO --upnp; both live in
# Config/options.json, and Foundry silently ignores them if passed as flags.
# So patch the file rather than pretending the flags work.
#
#   upnp=false — don't ask the router to port-forward this instance to the
#   internet. Foundry defaults it on, which is right for a real game server and
#   wrong for a local dev box. Set FOUNDRY_UPNP=true if you ever want players in.
OPTIONS="$DATA/Config/options.json"
UPNP="${FOUNDRY_UPNP:-false}" PORT="$PORT" OPTIONS="$OPTIONS" python3 - <<'PY'
import json, os, pathlib
p = pathlib.Path(os.environ["OPTIONS"])
opts = {}
if p.exists():
    try:
        opts = json.loads(p.read_text())
    except json.JSONDecodeError:
        pass  # corrupt or partial; Foundry will re-seed defaults around us
opts["port"] = int(os.environ["PORT"])
opts["upnp"] = os.environ["UPNP"].lower() == "true"
p.parent.mkdir(parents=True, exist_ok=True)
p.write_text(json.dumps(opts, indent=2) + "\n")
PY

echo "Node          : $NODE_BIN ($("$NODE_BIN" -p 'process.versions.node'))"
echo "Foundry entry : $ENTRY"
echo "Data path     : $DATA"
echo "Port / UPnP   : $PORT / ${FOUNDRY_UPNP:-false}  (set in Config/options.json)"
echo "URL           : http://localhost:$PORT"
echo

exec "$NODE_BIN" "$ENTRY" --dataPath="$DATA"
