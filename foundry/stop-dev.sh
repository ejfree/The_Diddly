#!/usr/bin/env bash
#
# Stop the local Foundry VTT dev instance started by ./dev.sh
#
#   ./stop-dev.sh          # graceful stop, escalating to SIGKILL if needed
#   ./stop-dev.sh --force   # skip straight to SIGKILL
#
# Scoped to THIS repo's instance: the match pattern includes the absolute path
# to ./app, so another Foundry install elsewhere on the machine is left alone.

set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PATTERN="$HERE/app/main"
FORCE=0
[[ "${1:-}" == "--force" || "${1:-}" == "-f" ]] && FORCE=1

# pgrep exits nonzero when nothing matches, which is not an error here.
pids() { pgrep -f "$PATTERN" 2>/dev/null || true; }

FOUND="$(pids)"
if [[ -z "$FOUND" ]]; then
  echo "Not running — no Foundry process matching $PATTERN"
  exit 0
fi

echo "Stopping Foundry:"
# shellcheck disable=SC2086
ps -o pid=,etime=,command= -p $FOUND 2>/dev/null | cut -c1-110 || true
echo

if [[ "$FORCE" -eq 1 ]]; then
  # shellcheck disable=SC2086
  kill -9 $FOUND 2>/dev/null || true
  sleep 1
  [[ -z "$(pids)" ]] && echo "Killed (SIGKILL)." || { echo "error: still running after SIGKILL." >&2; exit 1; }
  exit 0
fi

# SIGTERM first, deliberately: Foundry closes its LevelDB handles on a clean
# shutdown. SIGKILL mid-write can leave a world's database needing recovery,
# so only escalate if it genuinely refuses to exit.
# shellcheck disable=SC2086
kill $FOUND 2>/dev/null || true

for _ in $(seq 1 10); do
  sleep 1
  if [[ -z "$(pids)" ]]; then
    echo "Stopped cleanly (SIGTERM)."
    exit 0
  fi
done

echo "Still alive after 10s — escalating to SIGKILL." >&2
REMAINING="$(pids)"
# shellcheck disable=SC2086
[[ -n "$REMAINING" ]] && kill -9 $REMAINING 2>/dev/null || true
sleep 1

if [[ -z "$(pids)" ]]; then
  echo "Killed (SIGKILL). If a world was open, Foundry may run LevelDB recovery on next start." >&2
  exit 0
fi

echo "error: could not stop $(pids)" >&2
exit 1
