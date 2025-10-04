#!/usr/bin/env bash
set -euo pipefail

# Path to the index file
INDEX_FILE="docs/00-index.md"

# Start the index file with a header
echo "# Index" > "$INDEX_FILE"
echo "" >> "$INDEX_FILE"

# Find all markdown files in the docs directory, excluding the index file
find docs -type f -name "*.md" ! -name "00-index.md" | while read -r file; do
  # Extract the title from the YAML frontmatter or use the filename as a fallback
  title=$(grep -m 1 '^title:' "$file" | sed 's/^title: //')
  if [ -z "$title" ]; then
    title=$(basename "$file" .md | sed -E 's/-/ /g' | awk '{for(i=1;i<=NF;i++){$i=toupper(substr($i,1,1)) substr($i,2)}}1')
  fi

  # Create a relative link to the file
  relative_path=$(echo "$file" | sed 's|^docs/||')
  echo "- [$title]($relative_path)" >> "$INDEX_FILE"
done

echo "Index updated: $INDEX_FILE"