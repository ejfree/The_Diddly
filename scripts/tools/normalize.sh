#!/usr/bin/env bash
set -euo pipefail

# kebab-case filenames, add YAML frontmatter if missing
shopt -s nullglob globstar
for f in docs/**/*.md docs/*.md; do
  dir=$(dirname "$f")
  base=$(basename "$f" .md)
  kebab=$(echo "$base" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9]+/-/g; s/^-+|-+$//g')
  new="$dir/$kebab.md"
  if [ "$f" != "$new" ]; then
    if command -v git >/dev/null 2>&1; then
      git mv -k "$f" "$new" 2>/dev/null || mv "$f" "$new"
    else
      mv "$f" "$new"
    fi
  fi

  if ! head -n1 "$new" | grep -q '^---$'; then
    title=$(echo "$kebab" | sed -E 's/-/ /g' | awk '{for(i=1;i<=NF;i++){$i=toupper(substr($i,1,1)) substr($i,2)}}1')
    {
      printf -- "---\n"
      printf "title: %s\n" "$title"
      printf "updated: %s\n" "$(date -u +"%Y-%m-%d")"
      printf "tags: []\n"
      printf -- "---\n\n"
      cat "$new"
    } > "$new.tmp" && mv "$new.tmp" "$new"
  fi
done
echo "Normalize complete."
