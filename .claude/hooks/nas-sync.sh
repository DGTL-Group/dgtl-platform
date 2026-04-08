#!/usr/bin/env bash
# nas-sync.sh — PostToolUse hook for Bash tool calls.
#
# Watches for `git push` commands and, when one is detected, immediately
# pulls the TrueNAS mirror clone so it stays in lockstep with main.
#
# Claude Code passes the tool call as a JSON object on stdin. We don't have
# jq on this machine, so we use Python (always available) to extract the
# command field and a couple of other useful fields.
#
# Exits 0 on success or skip; never blocks the tool call.

set -u

NAS_PATH="//Truenas/raid/Storage/DGTL Group/DGTL Development/DGTL/Website Rebuild"

# Read JSON from stdin and pull out the bash command + tool name.
INPUT="$(cat || true)"

if [ -z "$INPUT" ]; then
  exit 0
fi

read -r TOOL_NAME CMD <<< "$(
  python -c '
import json, sys
try:
    data = json.loads(sys.stdin.read() or "{}")
except Exception:
    print(""); sys.exit(0)
tool = data.get("tool_name", "")
cmd = (data.get("tool_input", {}) or {}).get("command", "") or ""
# Collapse the command onto a single line for the read above.
cmd = cmd.replace("\n", " ").replace("\r", " ")
print(f"{tool}\t{cmd}")
' <<< "$INPUT" | tr '\t' ' '
)"

# Only act on Bash tool calls.
if [ "${TOOL_NAME:-}" != "Bash" ]; then
  exit 0
fi

# Match `git push` (with or without args) anywhere in the command.
# Matches: `git push`, `git push origin main`, `cd foo && git push`, etc.
if ! echo "$CMD" | grep -Eq '(^|[[:space:]&;|(])git[[:space:]]+push([[:space:]]|$)'; then
  exit 0
fi

if [ ! -d "$NAS_PATH/.git" ]; then
  echo "[nas-sync] WARNING: NAS mirror not found at $NAS_PATH — skipping" >&2
  exit 0
fi

echo "[nas-sync] git push detected — pulling NAS mirror" >&2
git -C "$NAS_PATH" pull --ff-only origin main 2>&1 | sed 's/^/[nas-sync] /' >&2 || {
  echo "[nas-sync] WARNING: pull failed — NAS mirror may be out of sync" >&2
}

exit 0
