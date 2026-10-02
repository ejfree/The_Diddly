echo "Unusual line terminators removed from all markdown files in docs/"

#!/usr/bin/env bash
set -euo pipefail

find docs -type f -name "*.md" | while read -r file; do
  # Remove U+2028 and U+2029
  perl -CSD -pe 's/\x{2028}|\x{2029}/\n/g' "$file" > "$file.tmp"

  # Add blank lines around headings and lists, remove trailing spaces
  awk '
    # Add blank line before headings
    /^#/ && NR>1 && prev!~/^$/ {print ""; print $0; prev=$0; next}
    # Add blank line before lists
    /^[-*]/ && NR>1 && prev!~/^$/ {print ""; print $0; prev=$0; next}
    # Remove trailing spaces
    {sub(/[ \t]+$/, ""); print; prev=$0}
  ' "$file.tmp" > "$file"
  rm "$file.tmp"
done

echo "Markdown files cleaned and linted in docs/"
