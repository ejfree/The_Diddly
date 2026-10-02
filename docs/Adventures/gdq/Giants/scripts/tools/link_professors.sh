#!/usr/bin/env bash
set -euo pipefail

# Usage: scripts/tools/link_professors.sh docs/University/Academics/drake-year-classes.md

file="$1"

tmp="$(mktemp)"

# Build a set of available professor slugs to validate links
rg --files docs/University/Faculty | rg '/professor-.*\.md$' | sed 's#.*/##; s/\.md$//' > "$tmp.prof"

normalize() {
  # Lowercase, replace any non-alnum with hyphen, collapse, trim
  printf '%s' "$1" | iconv -f UTF-8 -t ASCII//TRANSLIT 2>/dev/null \
    | tr '[:upper:]' '[:lower:]' \
    | sed -E 's/[^a-z0-9]+/-/g; s/^-+|-+$//g'
}

awk -v PROFS="$tmp.prof" '
  BEGIN {
    # load valid professor slugs
    while ((getline line < PROFS) > 0) { valid[line]=1 }
  }
  {
    line=$0
    # Find patterns like _Professor NAME (Dragon)_ possibly with italics underscores
    if (match(line, /_Professor [^_]*\([^)]*\)_/)) {
      profblock=substr(line, RSTART, RLENGTH)
      # Extract display name (between "Professor " and " (")
      name=profblock
      sub(/^_Professor /, "", name)
      sub(/ \(.*/, "", name)

      # Normalize to slug
      cmd = "printf '%s' '" name "' | iconv -f UTF-8 -t ASCII//TRANSLIT 2>/dev/null | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9]+/-/g; s/^-+|-+$//g'"
      cmd | getline slug_tail
      close(cmd)
      slug = "professor-" slug_tail

      # Validate slug exists; if not, leave line unchanged
      if (slug in valid) {
        # Build markdown link while preserving the trailing (Dragon) and italics
        gsub(/\(/, "\\(", profblock)
        gsub(/\)/, "\\)", profblock)
        # Replace the _Professor NAME (Type)_ with _[Professor NAME (Type)](../Faculty/slug.md)_
        link = "_[Professor " name " ("; 
        # re-extract type
        type=profblock; sub(/^_Professor [^ ]* /, "", type); sub(/^.*\\(/, "", type); sub(/\\).*/, "", type)
        link = link type ")](../Faculty/" slug ".md)"
        sub(/_Professor [^_]*\([^)]*\)_/, link, line)
      }
    }
    print line
  }
' "$file" > "$tmp.out"

mv "$tmp.out" "$file"
rm -f "$tmp" "$tmp.prof"
echo "Linked professors in: $file"

